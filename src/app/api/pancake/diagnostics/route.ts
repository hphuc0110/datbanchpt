import { NextResponse } from "next/server";
import {
  getPancakeApiKey,
  getPancakeConfig,
  hasPancakeConfig,
} from "@/lib/pancake/config";
import { listShops, listWarehouses } from "@/lib/pancake/client";

/**
 * Setup helper: lists Pancake shops / warehouses for filling env vars.
 * Only works when PANCAKE_API_KEY (+ optional shop id) is set server-side.
 */
export async function GET() {
  if (!getPancakeApiKey()) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Thiếu PANCAKE_API_KEY (và ideally PANCAKE_SHOP_ID) trong .env.local",
      },
      { status: 400 },
    );
  }

  try {
    const shops = await listShops();
    const config = getPancakeConfig();
    let warehouses: unknown = null;
    if (hasPancakeConfig() && config?.shopId) {
      warehouses = await listWarehouses(config.shopId);
    }

    return NextResponse.json({
      configured: Boolean(config),
      shop_id_env: config?.shopId ?? null,
      has_warehouse_env: Boolean(config?.warehouseId),
      has_booking_variation: Boolean(config?.bookingVariationId),
      use_one_time_product: config?.useOneTimeProduct ?? false,
      shops: shops.shops?.map((s) => ({ id: s.id, name: s.name })) ?? shops,
      warehouses,
      hint: {
        next: [
          "Chọn shop id → điền PANCAKE_SHOP_ID",
          "Chọn warehouse id → điền PANCAKE_WAREHOUSE_ID",
          "Tạo sản phẩm \"Đặt bàn\" (giá 0) trên Pancake → điền PANCAKE_BOOKING_PRODUCT_ID + PANCAKE_BOOKING_VARIATION_ID",
          "Chạy migration supabase/migrations/002_pancake_booking.sql trên Supabase",
        ],
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        configured: false,
        error: err instanceof Error ? err.message : "Không gọi được Pancake API",
      },
      { status: 502 },
    );
  }
}
