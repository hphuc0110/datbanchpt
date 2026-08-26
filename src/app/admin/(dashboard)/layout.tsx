import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f4f4f5]">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">{children}</div>
    </div>
  );
}
