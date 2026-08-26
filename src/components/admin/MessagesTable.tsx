"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import type { ContactMessage } from "@/lib/supabase/types";

export function MessagesTable() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!hasSupabaseConfig()) {
          setItems([
            {
              id: "1",
              full_name: "Lê Minh",
              contact: "0900111222",
              subject: "Câu hỏi / Góp ý chung",
              message: "Nhà hàng có chỗ đậu xe ô tô không ạ?",
              status: "new",
              created_at: new Date().toISOString(),
            },
          ]);
          return;
        }
        const supabase = createClient();
        const { data } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });
        setItems((data as ContactMessage[]) ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const mark = async (id: string, status: ContactMessage["status"]) => {
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    if (!hasSupabaseConfig()) return;
    const supabase = createClient();
    await supabase.from("contact_messages").update({ status }).eq("id", id);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Tin nhắn liên hệ</h2>
      <div className="space-y-3">
        {loading && <p className="text-sm text-brand-muted">Đang tải...</p>}
        {!loading && items.length === 0 && (
          <p className="text-sm text-brand-muted">Chưa có tin nhắn.</p>
        )}
        {items.map((m) => (
          <article
            key={m.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{m.full_name}</h3>
                <p className="text-xs text-brand-muted">
                  {m.contact} · {m.subject} ·{" "}
                  {format(new Date(m.created_at), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
              <select
                value={m.status}
                onChange={(e) =>
                  mark(m.id, e.target.value as ContactMessage["status"])
                }
                className="rounded border px-2 py-1 text-xs"
              >
                <option value="new">Mới</option>
                <option value="read">Đã đọc</option>
                <option value="resolved">Đã xử lý</option>
              </select>
            </div>
            <p className="mt-3 text-sm text-brand-charcoal">{m.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
