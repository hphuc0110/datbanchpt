import type { Booking } from "@/lib/supabase/types";
import { getPancakeConfig } from "./config";
import {
  PANCAKE_STATUS_CANCELED,
  PANCAKE_STATUS_CONFIRMED,
  PANCAKE_STATUS_NEW,
  createOrder,
  updateOrderStatus,
  type PancakeOrderItem,
} from "./client";

export type BookingForPancake = Pick<
  Booking,
  | "id"
  | "full_name"
  | "phone"
  | "email"
  | "booking_date"
  | "booking_time"
  | "guest_count"
  | "preferred_area"
  | "special_requests"
>;

function formatBookingNote(booking: BookingForPancake) {
  const time = booking.booking_time?.slice(0, 5) ?? booking.booking_time;
  const lines = [
    "Đặt bàn website Cung Hỷ Phát Tài",
    `Ngày: ${booking.booking_date}`,
    `Giờ: ${time}`,
    `Số khách: ${booking.guest_count}`,
    `Khu vực: ${booking.preferred_area || "Bàn thường"}`,
  ];
  if (booking.special_requests) {
    lines.push(`Yêu cầu: ${booking.special_requests}`);
  }
  lines.push(`Mã đặt bàn: ${booking.id}`);
  return lines.join("\n");
}

function buildBookingItems(): PancakeOrderItem[] {
  const config = getPancakeConfig();
  if (!config) {
    throw new Error("Pancake chưa cấu hình");
  }

  if (config.bookingVariationId) {
    return [
      {
        variation_id: config.bookingVariationId,
        product_id: config.bookingProductId,
        quantity: 1,
        discount_each_product: 0,
        is_bonus_product: false,
        is_discount_percent: false,
        is_wholesale: false,
        one_time_product: false,
        note: "Đặt bàn",
        variation_info: {
          name: "Đặt bàn",
          retail_price: 0,
        },
      },
    ];
  }

  // Pancake requires at least one line item; use a 0đ one-time "Đặt bàn" placeholder
  // so the order only carries booking info (no real menu products).
  return [
    {
      variation_id: "",
      quantity: 1,
      one_time_product: true,
      discount_each_product: 0,
      is_bonus_product: false,
      is_discount_percent: false,
      is_wholesale: false,
      note: "Đặt bàn",
      variation_info: {
        name: "Đặt bàn (website)",
        retail_price: 0,
        detail: "Thông tin đặt bàn từ website — không phải món ăn",
      },
    },
  ];
}

export type PancakeSyncSuccess = {
  ok: true;
  orderId: number;
  systemId?: number;
};

export type PancakeSyncFailure = {
  ok: false;
  error: string;
};

export async function createPancakeOrderFromBooking(
  booking: BookingForPancake,
): Promise<PancakeSyncSuccess | PancakeSyncFailure> {
  const config = getPancakeConfig();
  if (!config) {
    return { ok: false, error: "Pancake chưa cấu hình" };
  }

  try {
    const note = formatBookingNote(booking);
    const result = await createOrder({
      bill_full_name: booking.full_name,
      bill_phone_number: booking.phone,
      bill_email: booking.email,
      note,
      note_print: note,
      custom_id: undefined,
      received_at_shop: true,
      status: PANCAKE_STATUS_NEW,
      items: buildBookingItems(),
    });

    return {
      ok: true,
      orderId: result.id,
      systemId: result.system_id,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return { ok: false, error: message };
  }
}

export async function syncPancakeOrderStatusFromBooking(input: {
  pancakeOrderId: number | null | undefined;
  status: Booking["status"];
}): Promise<PancakeSyncSuccess | PancakeSyncFailure | { ok: true; skipped: true }> {
  if (!getPancakeConfig()) {
    return { ok: true, skipped: true };
  }
  if (!input.pancakeOrderId) {
    return { ok: true, skipped: true };
  }

  const pancakeStatus =
    input.status === "cancelled"
      ? PANCAKE_STATUS_CANCELED
      : input.status === "confirmed" || input.status === "completed"
        ? PANCAKE_STATUS_CONFIRMED
        : PANCAKE_STATUS_NEW;

  try {
    await updateOrderStatus(input.pancakeOrderId, pancakeStatus);
    return { ok: true, orderId: input.pancakeOrderId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return { ok: false, error: message };
  }
}
