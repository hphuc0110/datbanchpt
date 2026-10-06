import { NextResponse } from "next/server";
import { getSheetsConfig, hasSheetsConfig } from "@/lib/sheets/config";
import { appendBookingToSheet } from "@/lib/sheets/append";

/**
 * GET /api/sheets/diagnostics — kiểm tra cấu hình + thử ghi 1 dòng test lên Sheet.
 * Chỉ dùng lúc dev / debug.
 */
export async function GET() {
  if (!hasSheetsConfig()) {
    return NextResponse.json({
      ok: false,
      error: "Chưa cấu hình GOOGLE_SHEETS_WEBAPP_URL",
    });
  }

  const config = getSheetsConfig()!;
  const probe = await appendBookingToSheet({
    id: `diag-${Date.now()}`,
    full_name: "Diagnostics (xóa được)",
    phone: "0900000000",
    email: null,
    booking_date: new Date().toISOString().slice(0, 10),
    booking_time: "12:00",
    guest_count: "1",
    preferred_area: "Bàn thường",
    special_requests: "Dòng test từ /api/sheets/diagnostics",
  });

  return NextResponse.json({
    ok: probe.ok,
    webAppUrl: config.webAppUrl.replace(/\/macros\/s\/[^/]+/, "/macros/s/…"),
    secretConfigured: Boolean(config.secret),
    result: probe,
  });
}
