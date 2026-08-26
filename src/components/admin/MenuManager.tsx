"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import { SIGNATURE_DISHES } from "@/data/content";
import type { MenuItem } from "@/lib/supabase/types";

export function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (!hasSupabaseConfig()) {
          setItems(
            SIGNATURE_DISHES.map((d, i) => ({
              id: d.id,
              name: d.name,
              description: d.description,
              price: null,
              category: "signature" as const,
              image_url: d.image,
              is_signature: true,
              is_featured: d.featured,
              sort_order: i,
              is_active: true,
            })),
          );
          return;
        }
        const supabase = createClient();
        const { data } = await supabase
          .from("menu_items")
          .select("*")
          .order("sort_order");
        setItems((data as MenuItem[]) ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleActive = async (id: string, is_active: boolean) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_active } : item)),
    );
    if (!hasSupabaseConfig()) return;
    const supabase = createClient();
    await supabase.from("menu_items").update({ is_active }).eq("id", id);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Quản lý thực đơn</h2>
      {loading ? (
        <p className="text-sm text-brand-muted">Đang tải...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              {item.image_url && (
                <div className="relative aspect-video">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              )}
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand-red">
                  {item.category}
                </p>
                <h3 className="mt-1 font-semibold">{item.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-brand-muted">
                  {item.description}
                </p>
                <label className="mt-3 flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={item.is_active ?? true}
                    onChange={(e) => toggleActive(item.id, e.target.checked)}
                  />
                  Hiển thị trên website
                </label>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
