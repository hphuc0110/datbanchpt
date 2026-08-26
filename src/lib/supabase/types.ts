export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

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
