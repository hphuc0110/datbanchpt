import { getSheetsConfig } from "./config";

export type SheetBookingPayload = {
  type: "booking";
  id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  booking_date: string;
  booking_time: string;
  guest_count: string;
  preferred_area?: string | null;
  special_requests?: string | null;
  created_at?: string;
};

export type SheetContactPayload = {
  type: "contact";
  full_name: string;
  contact: string;
  subject?: string | null;
  message: string;
  created_at?: string;
};

export type SheetAppendResult =
  | { ok: true }
  | { ok: false; error: string; skipped?: boolean };

/** Apps Script cold start có thể >8s; giữ dưới 20s để không treo UX quá lâu. */
const SHEETS_TIMEOUT_MS = 20_000;

async function postToSheet(
  payload: SheetBookingPayload | SheetContactPayload,
): Promise<SheetAppendResult> {
  const config = getSheetsConfig();
  if (!config) {
    return { ok: false, skipped: true, error: "Google Sheets chưa cấu hình" };
  }

  const body = JSON.stringify({
    secret: config.secret,
    ...payload,
    created_at: payload.created_at ?? new Date().toISOString(),
  });

  try {
    // text/plain: tránh preflight; Apps Script vẫn đọc e.postData.contents
    const res = await fetch(config.webAppUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(SHEETS_TIMEOUT_MS),
    });

    const text = await res.text();
    let json: { ok?: boolean; error?: string } | null = null;
    try {
      json = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      // Apps Script đôi khi trả HTML khi deploy sai quyền truy cập
    }

    if (!res.ok || json?.ok === false) {
      const error =
        json?.error || text.slice(0, 300) || `HTTP ${res.status}`;
      return { ok: false, error };
    }

    // Redirect theo sau có thể thành GET → doGet trả {ok:true} nhưng chưa ghi hàng.
    // Vẫn coi là thành công nếu JSON ok; user kiểm tra Sheet.
    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error && err.name === "TimeoutError"
        ? `Timeout sau ${SHEETS_TIMEOUT_MS / 1000}s — kiểm tra Web App URL / quyền Anyone`
        : err instanceof Error
          ? err.message
          : String(err);
    return { ok: false, error: message };
  }
}

/** Ghi dòng đặt bàn lên Sheet. Không throw — caller log lỗi nếu cần. */
export function appendBookingToSheet(
  booking: Omit<SheetBookingPayload, "type">,
): Promise<SheetAppendResult> {
  return postToSheet({ type: "booking", ...booking });
}

/** Ghi dòng liên hệ lên Sheet. Không throw — caller log lỗi nếu cần. */
export function appendContactToSheet(
  message: Omit<SheetContactPayload, "type">,
): Promise<SheetAppendResult> {
  return postToSheet({ type: "contact", ...message });
}
