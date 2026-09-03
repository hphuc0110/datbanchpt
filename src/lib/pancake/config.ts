const BASE_URL = "https://pos.pages.fm/api/v1";

export type PancakeConfig = {
  apiKey: string;
  shopId: number;
  warehouseId?: string;
  /** Catalog product used as the booking line item (recommended). */
  bookingProductId?: string;
  bookingVariationId?: string;
  /** Optional order source ID from Pancake (Nguồn đơn hàng). */
  orderSourceId?: string;
  /**
   * When true and no catalog variation is set, create a one-time line item
   * named "Đặt bàn" with price 0.
   */
  useOneTimeProduct: boolean;
};

export function getPancakeApiKey(): string | null {
  const apiKey = process.env.PANCAKE_API_KEY?.trim();
  return apiKey || null;
}

export function getPancakeConfig(): PancakeConfig | null {
  const apiKey = getPancakeApiKey();
  const shopIdRaw = process.env.PANCAKE_SHOP_ID?.trim();
  if (!apiKey || !shopIdRaw) return null;

  const shopId = Number(shopIdRaw);
  if (!Number.isFinite(shopId)) return null;

  const disabled = process.env.PANCAKE_SYNC_ENABLED === "false";
  if (disabled) return null;

  return {
    apiKey,
    shopId,
    warehouseId: process.env.PANCAKE_WAREHOUSE_ID?.trim() || undefined,
    bookingProductId: process.env.PANCAKE_BOOKING_PRODUCT_ID?.trim() || undefined,
    bookingVariationId:
      process.env.PANCAKE_BOOKING_VARIATION_ID?.trim() || undefined,
    orderSourceId: process.env.PANCAKE_ORDER_SOURCE_ID?.trim() || undefined,
    // Default: one-time "Đặt bàn" line (no catalog menu) unless explicitly disabled.
    useOneTimeProduct:
      process.env.PANCAKE_USE_ONE_TIME_PRODUCT !== "false",
  };
}

export function hasPancakeConfig() {
  return getPancakeConfig() !== null;
}

export function pancakeBaseUrl() {
  return BASE_URL;
}
