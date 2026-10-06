import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { hasSheetsConfig } from "@/lib/sheets/config";
import { appendContactToSheet } from "@/lib/sheets/append";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.full_name || !body.contact || !body.message) {
    return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
  }

  const row = {
    full_name: body.full_name as string,
    contact: body.contact as string,
    subject: (body.subject as string) || "Câu hỏi / Góp ý chung",
    message: body.message as string,
  };

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ data: { id: "demo", ...row }, demo: true });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert(row);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Luồng riêng: web → Google Sheet (timeout ngắn; lỗi Sheet không làm fail liên hệ)
  let sheet: { synced: boolean; error?: string } = { synced: false };
  if (hasSheetsConfig()) {
    try {
      const sheetResult = await appendContactToSheet(row);
      if (sheetResult.ok) {
        sheet = { synced: true };
      } else {
        sheet = { synced: false, error: sheetResult.error };
        console.error("[sheets] append contact failed", sheetResult.error);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      sheet = { synced: false, error: message };
      console.error("[sheets] append contact threw", message);
    }
  }

  return NextResponse.json({ ok: true, sheet }, { status: 201 });
}
