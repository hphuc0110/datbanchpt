export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type PancakeSyncStatus = "pending" | "synced" | "failed" | "skipped";

export type Booking = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  booking_date: string;
  booking_time: string;
  guest_count: string;
  preferred_area: string | null;
  special_requests: string | null;
  status: BookingStatus;
  pancake_order_id: number | null;
  pancake_system_id: number | null;
  pancake_sync_status: PancakeSyncStatus;
  pancake_sync_error: string | null;
  pancake_synced_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BookingInsert = {
  full_name: string;
  phone: string;
  email?: string | null;
  booking_date: string;
  booking_time: string;
  guest_count: string;
  preferred_area?: string;
  special_requests?: string | null;
  status?: BookingStatus;
};

export type ContactMessage = {
  id: string;
  full_name: string;
  contact: string;
  subject: string | null;
  message: string;
  status: "new" | "read" | "resolved";
  created_at: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  category: "mon-chinh" | "dimsum" | "signature" | "sang";
  image_url: string | null;
  is_signature: boolean | null;
  is_featured: boolean | null;
  sort_order: number | null;
  is_active: boolean | null;
};
