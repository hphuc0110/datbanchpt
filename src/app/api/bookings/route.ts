import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { hasPancakeConfig } from "@/lib/pancake/config";
import { createPancakeOrderFromBooking } from "@/lib/pancake/sync-booking";
import type { Booking } from "@/lib/supabase/types";

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      data: [],
      demo: true,
      message: "Supabase chưa được cấu hình",
    });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

async function updatePancakeFields(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bookingId: string,
  fields: Record<string, unknown>,
) {
  const { error } = await supabase
    .from("bookings")
    .update(fields)
    .eq("id", bookingId);
  if (error) {
    console.error("[pancake] update booking fields failed", bookingId, error.message);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["full_name", "phone", "booking_date", "booking_time", "guest_count"];
  for (const key of required) {
    if (!body[key]) {
      return NextResponse.json(
        { error: `Thiếu trường bắt buộc: ${key}` },
        { status: 400 },
      );
    }
  }

  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      data: { id: "demo", ...body, status: "pending" },
      demo: true,
    });
  }

  const supabase = await createClient();

  // Insert only core booking fields so deploy works even if PostgREST schema
  // cache is briefly stale after migration (pancake_* has DB defaults).
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      full_name: body.full_name,
      phone: body.phone,
      email: body.email || null,
      booking_date: body.booking_date,
      booking_time: body.booking_time,
      guest_count: body.guest_count,
      preferred_area: body.preferred_area || "Bàn thường",
      special_requests: body.special_requests || null,
    })
    .select("*")
    .single();

  if (error || !booking) {
    return NextResponse.json(
      { error: error?.message ?? "Không tạo được đặt bàn" },
      { status: 500 },
    );
  }

  let pancake: {
    synced: boolean;
    order_id?: number;
    error?: string;
  } = { synced: false };

  if (hasPancakeConfig()) {
    const sync = await createPancakeOrderFromBooking(booking as Booking);
    if (sync.ok) {
      pancake = { synced: true, order_id: sync.orderId };
      await updatePancakeFields(supabase, booking.id, {
        pancake_order_id: sync.orderId,
        pancake_system_id: sync.systemId ?? null,
        pancake_sync_status: "synced",
        pancake_sync_error: null,
        pancake_synced_at: new Date().toISOString(),
      });
    } else {
      pancake = { synced: false, error: sync.error };
      await updatePancakeFields(supabase, booking.id, {
        pancake_sync_status: "failed",
        pancake_sync_error: sync.error.slice(0, 1000),
        pancake_synced_at: new Date().toISOString(),
      });
      console.error("[pancake] sync booking failed", booking.id, sync.error);
    }
  } else {
    pancake = { synced: false, error: "Pancake chưa cấu hình trên Vercel" };
    await updatePancakeFields(supabase, booking.id, {
      pancake_sync_status: "skipped",
    });
  }

  return NextResponse.json(
    {
      ok: true,
      data: { id: booking.id },
      pancake,
    },
    { status: 201 },
  );
}
