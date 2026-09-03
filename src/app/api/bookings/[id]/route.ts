import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { syncPancakeOrderStatusFromBooking } from "@/lib/pancake/sync-booking";
import type { Booking, BookingStatus } from "@/lib/supabase/types";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ data: { id, ...body }, demo: true });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const booking = data as Booking;
  if (typeof body.status === "string" && booking.pancake_order_id) {
    const sync = await syncPancakeOrderStatusFromBooking({
      pancakeOrderId: booking.pancake_order_id,
      status: body.status as BookingStatus,
    });
    if (!sync.ok) {
      console.error("[pancake] status sync failed", id, sync.error);
    }
  }

  return NextResponse.json({ data });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("bookings")
    .select("pancake_order_id")
    .eq("id", id)
    .maybeSingle();

  if (existing?.pancake_order_id) {
    await syncPancakeOrderStatusFromBooking({
      pancakeOrderId: existing.pancake_order_id,
      status: "cancelled",
    });
  }

  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
