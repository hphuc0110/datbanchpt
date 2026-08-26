import Link from "next/link";
import { BookingsTable } from "@/components/admin/BookingsTable";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal">Tổng quan</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Quản lý đơn đặt bàn, tin nhắn liên hệ và thực đơn.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link
            href="/admin/bookings"
            className="rounded-lg bg-brand-red px-4 py-2 text-white"
          >
            Đơn đặt bàn
          </Link>
          <Link
            href="/admin/messages"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
          >
            Liên hệ
          </Link>
          <Link
            href="/admin/menu"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
          >
            Thực đơn
          </Link>
          <Link href="/" className="rounded-lg px-4 py-2 text-brand-red underline">
            Xem website
          </Link>
        </div>
      </div>
      <BookingsTable />
    </div>
  );
}
