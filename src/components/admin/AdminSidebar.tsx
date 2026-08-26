"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  UtensilsCrossed,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Đơn đặt bàn", icon: ClipboardList },
  { href: "/admin/messages", label: "Liên hệ", icon: MessageSquare },
  { href: "/admin/menu", label: "Thực đơn", icon: UtensilsCrossed },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore if supabase not configured
    }
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-brand-charcoal text-white">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-xs uppercase tracking-widest text-white/60">Admin</p>
        <h1 className="mt-1 text-lg font-bold">Cung Hỷ Phát Tài</h1>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-brand-red text-white"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
