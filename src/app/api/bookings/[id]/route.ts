import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

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

  return NextResponse.json({ data });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
