import { randomUUID } from "crypto";
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

async function markPancakeSync(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bookingId: string,
  args: {
    orderId?: number | null;
    systemId?: number | null;
    status: "pending" | "synced" | "failed" | "skipped";
    error?: string | null;
  },
) {
  const { error } = await supabase.rpc("set_booking_pancake_sync", {
    p_booking_id: bookingId,
    p_order_id: args.orderId ?? null,
    p_system_id: args.systemId ?? null,
    p_sync_status: args.status,
    p_sync_error: args.error ?? null,
  });
  if (error) {
    console.error("[pancake] rpc sync update failed", bookingId, error.message);
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

  // Pre-generate id and skip .select() — anon can INSERT but cannot SELECT
  // (RLS), so insert().select() fails with "violates row-level security".
  const bookingId = randomUUID();
  const bookingRow = {
    id: bookingId,
    full_name: body.full_name as string,
    phone: body.phone as string,
    email: (body.email as string) || null,
    booking_date: body.booking_date as string,
    booking_time: body.booking_time as string,
    guest_count: body.guest_count as string,
    preferred_area: (body.preferred_area as string) || "Bàn thường",
    special_requests: (body.special_requests as string) || null,
  };

  const { error } = await supabase.from("bookings").insert(bookingRow);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let pancake: {
    synced: boolean;
    order_id?: number;
    error?: string;
  } = { synced: false };

  const bookingForSync = bookingRow as Booking;

  if (hasPancakeConfig()) {
    const sync = await createPancakeOrderFromBooking(bookingForSync);
    if (sync.ok) {
      pancake = { synced: true, order_id: sync.orderId };
      await markPancakeSync(supabase, bookingId, {
        orderId: sync.orderId,
        systemId: sync.systemId ?? null,
        status: "synced",
        error: null,
      });
    } else {
      pancake = { synced: false, error: sync.error };
      await markPancakeSync(supabase, bookingId, {
        status: "failed",
        error: sync.error.slice(0, 1000),
      });
      console.error("[pancake] sync booking failed", bookingId, sync.error);
    }
  } else {
    pancake = { synced: false, error: "Pancake chưa cấu hình trên Vercel" };
    await markPancakeSync(supabase, bookingId, { status: "skipped" });
  }

  return NextResponse.json(
    {
      ok: true,
      data: { id: bookingId },
      pancake,
    },
    { status: 201 },
  );
}
