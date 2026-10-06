import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseConfig } from "@/lib/supabase/config";
import { hasPancakeConfig } from "@/lib/pancake/config";
import { createPancakeOrderFromBooking } from "@/lib/pancake/sync-booking";
import { hasSheetsConfig } from "@/lib/sheets/config";
import { appendBookingToSheet } from "@/lib/sheets/append";
import type { Booking } from "@/lib/supabase/types";

function friendlyFetchError(message: string) {
  if (/fetch failed|ENOTFOUND|ECONNREFUSED|ETIMEDOUT|network/i.test(message)) {
    return "Không kết nối được Supabase (kiểm tra NEXT_PUBLIC_SUPABASE_URL trong .env.local — project có thể đã pause/xóa).";
  }
  return message;
}

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      data: [],
      demo: true,
      message: "Supabase chưa được cấu hình",
    });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: friendlyFetchError(error.message) },
        { status: 500 },
      );
    }

    return NextResponse.json({ data });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: friendlyFetchError(message) },
      { status: 500 },
    );
  }
}

async function markPancakeSync(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bookingId: string,
  args: {
    orderId?: number | null;
    systemId?: number | null;
    status: "pending" | "synced" | "failed" | "skipped";
    error?: string | null;
  },
) {
  const { error } = await supabase.rpc("set_booking_pancake_sync", {
    p_booking_id: bookingId,
    p_order_id: args.orderId ?? null,
    p_system_id: args.systemId ?? null,
    p_sync_status: args.status,
    p_sync_error: args.error ?? null,
  });
  if (error) {
    console.error("[pancake] rpc sync update failed", bookingId, error.message);
  }
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

  const bookingId = randomUUID();
  const bookingRow = {
    id: bookingId,
    full_name: body.full_name as string,
    phone: body.phone as string,
    email: (body.email as string) || null,
    booking_date: body.booking_date as string,
    booking_time: body.booking_time as string,
    guest_count: body.guest_count as string,
    preferred_area: (body.preferred_area as string) || "Bàn thường",
    special_requests: (body.special_requests as string) || null,
  };

  // --- Luồng Sheet (độc lập): web → Apps Script → Sheet ---
  let sheet: { synced: boolean; error?: string } = { synced: false };
  if (hasSheetsConfig()) {
    try {
      const sheetResult = await appendBookingToSheet(bookingRow);
      if (sheetResult.ok) {
        sheet = { synced: true };
      } else {
        sheet = { synced: false, error: sheetResult.error };
        console.error("[sheets] append booking failed", bookingId, sheetResult.error);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      sheet = { synced: false, error: message };
      console.error("[sheets] append booking threw", bookingId, message);
    }
  }

  // Demo khi chưa cấu hình Supabase
  if (!hasSupabaseConfig()) {
    return NextResponse.json(
      {
        ok: true,
        data: { id: bookingId, ...bookingRow, status: "pending" },
        demo: true,
        sheet,
      },
      { status: 201 },
    );
  }

  // --- Luồng Supabase + Pancake ---
  let dbSaved = false;
  let dbError: string | undefined;
  let pancake: {
    synced: boolean;
    order_id?: number;
    error?: string;
  } = { synced: false };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("bookings").insert(bookingRow);

    if (error) {
      dbError = friendlyFetchError(error.message);
      console.error("[bookings] insert failed", bookingId, dbError);
    } else {
      dbSaved = true;
      const bookingForSync = bookingRow as Booking;

      if (hasPancakeConfig()) {
        const sync = await createPancakeOrderFromBooking(bookingForSync);
        if (sync.ok) {
          pancake = { synced: true, order_id: sync.orderId };
          await markPancakeSync(supabase, bookingId, {
            orderId: sync.orderId,
            systemId: sync.systemId ?? null,
            status: "synced",
            error: null,
          });
        } else {
          pancake = { synced: false, error: sync.error };
          await markPancakeSync(supabase, bookingId, {
            status: "failed",
            error: sync.error.slice(0, 1000),
          });
          console.error("[pancake] sync booking failed", bookingId, sync.error);
        }
      } else {
        pancake = { synced: false, error: "Pancake chưa cấu hình trên Vercel" };
        await markPancakeSync(supabase, bookingId, { status: "skipped" });
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    dbError = friendlyFetchError(message);
    console.error("[bookings] supabase threw", bookingId, dbError);
  }

  // Thành công nếu đã lưu DB hoặc đã ghi Sheet
  if (dbSaved || sheet.synced) {
    return NextResponse.json(
      {
        ok: true,
        data: { id: bookingId },
        pancake,
        sheet,
        ...(dbError ? { db_warning: dbError } : {}),
      },
      { status: 201 },
    );
  }

  return NextResponse.json(
    {
      error:
        dbError ||
        sheet.error ||
        "Không lưu được đặt bàn (Supabase và Google Sheet đều lỗi).",
      sheet,
    },
    { status: 500 },
  );
}
