import { SITE } from "@/data/content";

export type BookingFormData = {
  full_name: string;
  phone: string;
  email: string;
  booking_date: string;
  booking_time: string;
  guest_count: string;
  preferred_area: string;
  special_requests: string;
};

export type BookingFieldErrors = Partial<
  Record<keyof BookingFormData, string>
>;

const SERVICE_WINDOWS = [
  { start: "06:00", end: "11:00" },
  { start: "10:30", end: "14:00" },
  { start: "17:30", end: "21:15" },
] as const;

function normalizePhone(phone: string): string {
  return phone.replace(/[\s.\-]/g, "");
}

function isValidVietnamesePhone(phone: string): boolean {
  const p = normalizePhone(phone);
  return /^0[35789]\d{8}$/.test(p) || /^\+84[35789]\d{8}$/.test(p);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseTimeMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function isWithinServiceHours(time: string): boolean {
  const minutes = parseTimeMinutes(time);
  return SERVICE_WINDOWS.some(
    (window) =>
      minutes >= parseTimeMinutes(window.start) &&
      minutes <= parseTimeMinutes(window.end),
  );
}

function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function validateBookingForm(form: BookingFormData): BookingFieldErrors {
  const errors: BookingFieldErrors = {};

  const name = form.full_name.trim();
  if (!name) {
    errors.full_name = "Vui lòng nhập họ và tên.";
  } else if (name.length < 2) {
    errors.full_name = "Họ và tên phải có ít nhất 2 ký tự.";
  }

  const phone = form.phone.trim();
  if (!phone) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!isValidVietnamesePhone(phone)) {
    errors.phone =
      "Số điện thoại không hợp lệ. Ví dụ: 0915885888 hoặc +84915885888.";
  }

  const email = form.email.trim();
  if (email && !isValidEmail(email)) {
    errors.email = "Email không đúng định dạng. Ví dụ: email@example.com.";
  }

  if (!form.booking_date) {
    errors.booking_date = "Vui lòng chọn ngày đặt bàn.";
  } else {
    const selected = new Date(`${form.booking_date}T00:00:00`);
    if (selected < startOfToday()) {
      errors.booking_date = "Ngày đặt bàn không thể là ngày trong quá khứ.";
    }
  }

  if (!form.booking_time) {
    errors.booking_time = "Vui lòng chọn giờ đặt bàn.";
  } else if (!isWithinServiceHours(form.booking_time)) {
    errors.booking_time = `Giờ đặt bàn ngoài khung giờ phục vụ (${SITE.hours.morning}, ${SITE.hours.lunch}, ${SITE.hours.dinner}).`;
  } else if (form.booking_date) {
    const booking = new Date(`${form.booking_date}T${form.booking_time}`);
    if (booking < new Date()) {
      errors.booking_time =
        "Giờ đặt bàn không thể là thời điểm trong quá khứ.";
    }
  }

  return errors;
}

export function hasBookingErrors(
  errors: BookingFieldErrors,
): boolean {
  return Object.keys(errors).length > 0;
}
