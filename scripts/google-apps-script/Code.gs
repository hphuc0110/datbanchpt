/**
 * Google Apps Script — nhận booking/contact từ website → ghi vào Sheet.
 *
 * Cài đặt (làm đúng từng bước):
 * 1. Sheet → Extensions → Apps Script → dán file này, Save
 * 2. Deploy → Manage deployments → bánh răng ✏️
 *    - Version: New version
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    → Deploy
 * 3. Copy URL mới (.../exec) vào .env.local → GOOGLE_SHEETS_WEBAPP_URL
 * 4. GOOGLE_SHEETS_SECRET phải khớp SECRET bên dưới (hoặc để SECRET="" để tắt auth khi test)
 *
 * Tab "Bookings" / "Contacts" sẽ tự tạo nếu chưa có.
 */

// Khớp với GOOGLE_SHEETS_SECRET trong .env.local
// Để "" tạm thời nếu đang debug Unauthorized
var SECRET = "cunghy-sheet-2026";
var BOOKINGS_SHEET = "Bookings";
var CONTACTS_SHEET = "Contacts";

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) || "{}";
    var data = JSON.parse(raw);

    if (SECRET) {
      var got = data.secret == null ? "" : String(data.secret);
      if (got !== String(SECRET)) {
        return json_({
          ok: false,
          error: "Unauthorized",
          hint: "SECRET trong Apps Script ≠ GOOGLE_SHEETS_SECRET. Save + Deploy New version, rồi copy URL /exec mới.",
        });
      }
    }

    if (data.type === "booking") {
      appendBooking_(data);
      return json_({ ok: true, sheet: BOOKINGS_SHEET });
    }

    if (data.type === "contact") {
      appendContact_(data);
      return json_({ ok: true, sheet: CONTACTS_SHEET });
    }

    return json_({ ok: false, error: "Unknown type", gotType: data.type || null });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  // Mở URL /exec trên trình duyệt để kiểm tra deploy còn sống
  return json_({
    ok: true,
    message: "Cung Hỷ Phát Tài Sheets webhook sẵn sàng",
    authRequired: Boolean(SECRET),
  });
}

function appendBooking_(d) {
  var sheet = ensureSheet_(BOOKINGS_SHEET, [
    "Thời gian nhận",
    "Mã",
    "Họ tên",
    "SĐT",
    "Email",
    "Ngày đặt",
    "Giờ",
    "Số khách",
    "Khu vực",
    "Yêu cầu",
  ]);

  sheet.appendRow([
    d.created_at || new Date().toISOString(),
    d.id || "",
    d.full_name || "",
    d.phone || "",
    d.email || "",
    d.booking_date || "",
    d.booking_time || "",
    d.guest_count || "",
    d.preferred_area || "",
    d.special_requests || "",
  ]);
}

function appendContact_(d) {
  var sheet = ensureSheet_(CONTACTS_SHEET, [
    "Thời gian nhận",
    "Họ tên",
    "Liên hệ",
    "Chủ đề",
    "Nội dung",
  ]);

  sheet.appendRow([
    d.created_at || new Date().toISOString(),
    d.full_name || "",
    d.contact || "",
    d.subject || "",
    d.message || "",
  ]);
}

function ensureSheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
