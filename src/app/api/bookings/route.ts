import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

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
  const { error } = await supabase.from("bookings").insert({
    full_name: body.full_name,
    phone: body.phone,
    email: body.email || null,
    booking_date: body.booking_date,
    booking_time: body.booking_time,
    guest_count: body.guest_count,
    preferred_area: body.preferred_area || "Bàn thường",
    special_requests: body.special_requests || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
