import {
  getPancakeApiKey,
  getPancakeConfig,
  pancakeBaseUrl,
  type PancakeConfig,
} from "./config";

export type PancakeOrderItem = {
  variation_id: string;
  quantity: number;
  product_id?: string;
  one_time_product?: boolean;
  discount_each_product?: number;
  is_bonus_product?: boolean;
  is_discount_percent?: boolean;
  is_wholesale?: boolean;
  note?: string;
  variation_info?: {
    name?: string;
    retail_price?: number;
    detail?: string | null;
  };
};

export type CreatePancakeOrderInput = {
  bill_full_name: string;
  bill_phone_number: string;
  bill_email?: string | null;
  note?: string;
  note_print?: string;
  custom_id?: string;
  received_at_shop?: boolean;
  status?: number;
  warehouse_id?: string;
  order_sources?: string;
  items: PancakeOrderItem[];
  shipping_fee?: number;
  total_discount?: number;
  cash?: number;
};

export type PancakeOrderResult = {
  id: number;
  system_id?: number;
  status?: number;
  raw: unknown;
};

export class PancakeApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "PancakeApiError";
    this.status = status;
    this.body = body;
  }
}

function requireConfig(): PancakeConfig {
  const config = getPancakeConfig();
  if (!config) {
    throw new Error("Pancake POS chưa được cấu hình (thiếu API key / shop id)");
  }
  return config;
}

function requireApiKey(): string {
  const apiKey = getPancakeApiKey();
  if (!apiKey) {
    throw new Error("Thiếu PANCAKE_API_KEY");
  }
  return apiKey;
}

async function pancakeFetch<T>(
  path: string,
  init?: RequestInit & {
    query?: Record<string, string | number | undefined>;
    /** When true, only API key is required (e.g. list shops). */
    apiKeyOnly?: boolean;
  },
): Promise<T> {
  const apiKey = init?.apiKeyOnly ? requireApiKey() : requireConfig().apiKey;
  const url = new URL(`${pancakeBaseUrl()}${path}`);
  url.searchParams.set("api_key", apiKey);
  if (init?.query) {
    for (const [key, value] of Object.entries(init.query)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const { query: _query, apiKeyOnly: _apiKeyOnly, ...requestInit } = init ?? {};
  const res = await fetch(url.toString(), {
    ...requestInit,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(requestInit.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message: unknown }).message === "string"
        ? (body as { message: string }).message
        : `Pancake API lỗi HTTP ${res.status}`;
    throw new PancakeApiError(message, res.status, body);
  }

  return body as T;
}

export async function listShops() {
  return pancakeFetch<{ shops: Array<{ id: number; name: string }> }>("/shops", {
    apiKeyOnly: true,
  });
}

export async function listWarehouses(shopId?: number) {
  const config = requireConfig();
  const id = shopId ?? config.shopId;
  return pancakeFetch<{ data?: unknown[]; warehouses?: unknown[] }>(
    `/shops/${id}/warehouses`,
  );
}

export async function createOrder(
  input: CreatePancakeOrderInput,
): Promise<PancakeOrderResult> {
  const config = requireConfig();
  const payload = {
    shop_id: config.shopId,
    bill_full_name: input.bill_full_name,
    bill_phone_number: input.bill_phone_number,
    bill_email: input.bill_email || undefined,
    note: input.note ?? "",
    note_print: input.note_print ?? null,
    custom_id: input.custom_id,
    received_at_shop: input.received_at_shop ?? true,
    status: input.status ?? 0,
    warehouse_id: input.warehouse_id ?? config.warehouseId,
    order_sources: input.order_sources ?? config.orderSourceId,
    shipping_fee: input.shipping_fee ?? 0,
    total_discount: input.total_discount ?? 0,
    cash: input.cash ?? 0,
    is_free_shipping: true,
    items: input.items,
  };

  const raw = await pancakeFetch<Record<string, unknown>>(
    `/shops/${config.shopId}/orders`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );

  // Some responses wrap the order under `data` / `order`
  const order =
    (raw?.data as Record<string, unknown> | undefined) ??
    (raw?.order as Record<string, unknown> | undefined) ??
    raw;

  // When custom_id is set, Pancake may return it as `id` (string). Prefer a
  // numeric display/system id (works with update API), then order_link id.
  const link =
    typeof order.order_link === "string" ? order.order_link : "";
  const linkMatch = link.match(/order_id=(\d+)/);
  const fromLink = linkMatch ? Number(linkMatch[1]) : NaN;
  const fromSystem =
    order.system_id !== undefined ? Number(order.system_id) : NaN;
  const fromId = Number(order.id);

  const id = [fromId, fromSystem, fromLink].find((n) => Number.isFinite(n));
  if (id === undefined) {
    throw new PancakeApiError(
      "Pancake trả về đơn nhưng thiếu order id",
      200,
      raw,
    );
  }

  return {
    id,
    system_id: Number.isFinite(fromSystem) ? fromSystem : undefined,
    status: order.status !== undefined ? Number(order.status) : undefined,
    raw,
  };
}

export async function updateOrderStatus(orderId: number, status: number) {
  const config = requireConfig();
  return pancakeFetch<unknown>(`/shops/${config.shopId}/orders/${orderId}`, {
    method: "PUT",
    body: JSON.stringify({
      shop_id: config.shopId,
      status,
    }),
  });
}

/** Pancake status: 6 = Canceled */
export const PANCAKE_STATUS_CANCELED = 6;
/** Pancake status: 0 = New */
export const PANCAKE_STATUS_NEW = 0;
/** Pancake status: 1 = Confirmed */
export const PANCAKE_STATUS_CONFIRMED = 1;
