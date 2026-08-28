import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.full_name || !body.contact || !body.message) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
  }

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ data: { id: "demo", ...body }, demo: true });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    full_name: body.full_name,
    contact: body.contact,
    subject: body.subject || "Câu hỏi / Góp ý chung",
    message: body.message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
