"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import type {
  Booking,
  BookingStatus,
  PancakeSyncStatus,
} from "@/lib/supabase/types";

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  cancelled: "Đã hủy",
  completed: "Hoàn thành",
};

const STATUS_COLOR: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-slate-100 text-slate-700",
};

const PANCAKE_LABEL: Record<PancakeSyncStatus, string> = {
  pending: "Chờ sync",
  synced: "Đã lên POS",
  failed: "Lỗi POS",
  skipped: "Chưa cấu hình",
};

const DEMO_BOOKINGS: Booking[] = [
  {
    id: "demo-1",
    full_name: "Nguyễn Văn A",
    phone: "0912345678",
    email: "a@email.com",
    booking_date: "2026-08-28",
    booking_time: "19:00:00",
    guest_count: "2-5 người",
    preferred_area: "Bàn thường (Đại Sảnh)",
    special_requests: "Sinh nhật",
    status: "pending",
    pancake_order_id: null,
    pancake_system_id: null,
    pancake_sync_status: "skipped",
    pancake_sync_error: null,
    pancake_synced_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    full_name: "Trần Thị B",
    phone: "0987654321",
    email: null,
    booking_date: "2026-08-29",
    booking_time: "12:00:00",
    guest_count: "6-10 người",
    preferred_area: "Phòng riêng (VIP Room)",
    special_requests: null,
    status: "confirmed",
    pancake_order_id: 12345,
    pancake_system_id: 1,
    pancake_sync_status: "synced",
    pancake_sync_error: null,
    pancake_synced_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [demo, setDemo] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      if (!hasSupabaseConfig()) {
        setDemo(true);
        setBookings(DEMO_BOOKINGS);
        return;
      }
      const supabase = createClient();
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setDemo(false);
      setBookings((data as Booking[]) ?? []);
    } catch {
      setDemo(true);
      setBookings(DEMO_BOOKINGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
    if (demo || !hasSupabaseConfig()) return;
    // Go through API so Pancake order status stays in sync
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const remove = async (id: string) => {
    if (!confirm("Xóa đơn đặt bàn này?")) return;
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (demo || !hasSupabaseConfig()) return;
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
  };

  const filtered =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-brand-charcoal">Đơn đặt bàn</h2>
          {demo && (
            <p className="mt-1 text-xs text-amber-700">
              Đang hiển thị dữ liệu demo — cấu hình Supabase để quản lý đơn thật.
            </p>
          )}
        </div>
        <select
          className="form-input w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tất cả</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="cancelled">Đã hủy</option>
          <option value="completed">Hoàn thành</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-brand-muted">
            <tr>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Điện thoại</th>
              <th className="px-4 py-3">Ngày / Giờ</th>
              <th className="px-4 py-3">Số khách</th>
              <th className="px-4 py-3">Khu vực</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Pancake</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-brand-muted">
                  Đang tải...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-brand-muted">
                  Chưa có đơn đặt bàn.
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-brand-charcoal">
                      {b.full_name}
                    </p>
                    {b.email && (
                      <p className="text-xs text-brand-muted">{b.email}</p>
                    )}
                    {b.special_requests && (
                      <p className="mt-1 text-xs text-brand-muted">
                        Ghi chú: {b.special_requests}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">{b.phone}</td>
                  <td className="px-4 py-3">
                    {b.booking_date}
                    <br />
                    <span className="text-brand-muted">
                      {b.booking_time?.slice(0, 5)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{b.guest_count}</td>
                  <td className="px-4 py-3">{b.preferred_area}</td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) =>
                        updateStatus(b.id, e.target.value as BookingStatus)
                      }
                      className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_COLOR[b.status]}`}
                    >
                      {(Object.keys(STATUS_LABEL) as BookingStatus[]).map(
                        (s) => (
                          <option key={s} value={s}>
                            {STATUS_LABEL[s]}
                          </option>
                        ),
                      )}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <p
                      className={`text-xs font-medium ${
                        b.pancake_sync_status === "synced"
                          ? "text-green-700"
                          : b.pancake_sync_status === "failed"
                            ? "text-red-700"
                            : "text-brand-muted"
                      }`}
                      title={b.pancake_sync_error ?? undefined}
                    >
                      {PANCAKE_LABEL[b.pancake_sync_status ?? "skipped"]}
                    </p>
                    {b.pancake_order_id != null && (
                      <p className="text-[10px] text-brand-muted">
                        #{b.pancake_order_id}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => remove(b.id)}
                      className="rounded p-2 text-red-600 hover:bg-red-50"
                      aria-label="Xóa"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <p className="mt-1 text-[10px] text-brand-muted">
                      {format(new Date(b.created_at), "dd/MM/yyyy HH:mm")}
                    </p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
