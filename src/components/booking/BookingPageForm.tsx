"use client";

import { FormEvent, useState } from "react";
import { MapPin, Phone, Shield } from "lucide-react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import { GUEST_OPTIONS, SITE, TABLE_TYPES } from "@/data/content";
import { Button } from "@/components/ui/Button";

const initial = {
  full_name: "",
  phone: "",
  email: "",
  booking_date: "",
  booking_time: "",
  guest_count: GUEST_OPTIONS[1] as string,
  preferred_area: TABLE_TYPES[0].label as string,
  special_requests: "",
};

export function BookingPageForm() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (!hasSupabaseConfig()) {
        await new Promise((r) => setTimeout(r, 600));
        setMessage({
          type: "ok",
          text: "Đã ghi nhận yêu cầu (demo). Cấu hình Supabase để lưu đơn thật.",
        });
        setForm(initial);
        return;
      }

      const supabase = createClient();
      const { error } = await supabase.from("bookings").insert({
        full_name: form.full_name,
        phone: form.phone,
        email: form.email || null,
        booking_date: form.booking_date,
        booking_time: form.booking_time,
        guest_count: form.guest_count,
        preferred_area: form.preferred_area,
        special_requests: form.special_requests || null,
      });

      if (error) throw error;
      setMessage({
        type: "ok",
        text: "Gửi yêu cầu đặt bàn thành công! Chúng tôi sẽ gọi xác nhận sớm.",
      });
      setForm(initial);
    } catch (err) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "Gửi thất bại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[1fr_320px] lg:px-8">
      <form
        onSubmit={onSubmit}
        className="rounded-xl bg-brand-red p-6 text-white shadow-lg md:p-8"
      >
        <h2 className="text-xl font-bold uppercase md:text-2xl">
          Thông tin đặt bàn
        </h2>
        <p className="mt-2 text-sm text-white/85">
          Vui lòng điền thông tin bên dưới. Nhà hàng sẽ liên hệ xác nhận trong
          thời gian sớm nhất.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-xs font-semibold uppercase tracking-wide">
            Họ và tên *
            <input
              required
              className="form-input mt-2"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              placeholder="Nguyễn Văn A"
            />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide">
            Số điện thoại *
            <input
              required
              className="form-input mt-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="09xx xxx xxx"
            />
          </label>
        </div>

        <label className="mt-4 block text-xs font-semibold uppercase tracking-wide">
          Email (Không bắt buộc)
          <input
            type="email"
            className="form-input mt-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="email@example.com"
          />
        </label>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block text-xs font-semibold uppercase tracking-wide">
            Ngày *
            <input
              required
              type="date"
              className="form-input mt-2"
              value={form.booking_date}
              onChange={(e) =>
                setForm({ ...form, booking_date: e.target.value })
              }
            />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wide">
            Giờ *
            <input
              required
              type="time"
              className="form-input mt-2"
              value={form.booking_time}
              onChange={(e) =>
                setForm({ ...form, booking_time: e.target.value })
              }
            />
          </label>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide">
            Số khách *
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {GUEST_OPTIONS.map((opt) => {
              const selected = form.guest_count === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm({ ...form, guest_count: opt })}
                  className={`rounded-md border px-3 py-3 text-sm font-medium transition-colors ${
                    selected
                      ? "border-brand-gold bg-brand-gold text-brand-red"
                      : "border-white/40 bg-white text-brand-charcoal hover:border-brand-gold"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide">
            Loại bàn
          </p>
          <div className="space-y-3">
            {TABLE_TYPES.map((type) => {
              const selected = form.preferred_area === type.label;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setForm({ ...form, preferred_area: type.label })
                  }
                  className={`flex w-full items-start gap-3 rounded-lg border bg-white p-4 text-left transition-colors ${
                    selected
                      ? "border-brand-red"
                      : "border-transparent hover:border-brand-red/40"
                  }`}
                >
                  <span
                    className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      selected ? "border-brand-red" : "border-gray-300"
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-brand-red" />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-brand-charcoal">
                      {type.label}
                    </span>
                    <span className="mt-1 block text-xs text-brand-muted">
                      {type.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-wide">
          Ghi chú (Không bắt buộc)
          <textarea
            className="form-input mt-2 resize-none"
            rows={4}
            value={form.special_requests}
            onChange={(e) =>
              setForm({ ...form, special_requests: e.target.value })
            }
            placeholder="Yêu cầu đặc biệt..."
          />
        </label>

        {message && (
          <p
            className={`mt-4 text-sm ${
              message.type === "ok" ? "text-brand-cream" : "text-yellow-200"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            className="!bg-white !text-brand-red hover:!bg-brand-cream"
          >
            {loading ? "Đang gửi..." : "Gửi yêu cầu đặt bàn"}
          </Button>
        </div>
      </form>

      <aside className="space-y-4">
        <div className="rounded-xl bg-brand-red p-5 text-white">
          <h3 className="font-bold uppercase">{SITE.nameUpper}</h3>
          <p className="mt-3 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {SITE.addressFull}
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 shrink-0" />
            Hotline:{" "}
            <span className="font-bold text-brand-gold">{SITE.hotline}</span>
          </p>
          <p className="mt-4 flex items-start gap-2 text-xs text-white/85">
            <Shield className="mt-0.5 h-4 w-4 shrink-0" />
            Có chỗ để xe ô tô / xe máy, bảo vệ hỗ trợ 24/7.
          </p>
        </div>

        <div className="rounded-xl bg-brand-gold p-5 text-brand-charcoal">
          <h3 className="font-bold uppercase">Chính sách giữ bàn</h3>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm">
            <li>Giữ bàn 15 phút kể từ giờ đặt.</li>
            <li>Chi tiêu trung bình khoảng 500k – 1M VND/người.</li>
            <li>Phòng VIP nên đặt trước tối thiểu 1 ngày.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
