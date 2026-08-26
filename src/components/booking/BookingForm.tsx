"use client";

import { FormEvent, useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import { GUEST_OPTIONS } from "@/data/content";
import { Button } from "@/components/ui/Button";

type Props = {
  variant?: "overlay" | "page";
};

const initial = {
  full_name: "",
  phone: "",
  email: "",
  booking_date: "",
  booking_time: "",
  guest_count: GUEST_OPTIONS[0],
  preferred_area: "Bàn thường",
  special_requests: "",
};

export function BookingForm({ variant = "overlay" }: Props) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (!hasSupabaseConfig()) {
        await new Promise((r) => setTimeout(r, 600));
        setMessage({
          type: "ok",
          text: "Đã ghi nhận yêu cầu (chế độ demo — hãy cấu hình Supabase để lưu thật).",
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
        text: "Gửi yêu cầu đặt bàn thành công! Nhà hàng sẽ liên hệ xác nhận sớm.",
      });
      setForm(initial);
    } catch (err) {
      setMessage({
        type: "err",
        text:
          err instanceof Error
            ? err.message
            : "Không gửi được yêu cầu. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isOverlay = variant === "overlay";

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={`grid gap-5 ${isOverlay ? "md:grid-cols-2" : "md:grid-cols-2"}`}
      >
        <Field label="Họ và tên *" light={isOverlay}>
          <input
            required
            name="full_name"
            value={form.full_name}
            onChange={onChange}
            className={isOverlay ? "underline-input" : "form-input"}
            placeholder="Nguyễn Văn A"
          />
        </Field>
        <Field label="Số điện thoại *" light={isOverlay}>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={onChange}
            className={isOverlay ? "underline-input" : "form-input"}
            placeholder="09xx xxx xxx"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Email" light={isOverlay}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className={isOverlay ? "underline-input" : "form-input"}
            placeholder="email@example.com"
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Ngày *" light={isOverlay}>
          <input
            required
            type="date"
            name="booking_date"
            value={form.booking_date}
            onChange={onChange}
            className={isOverlay ? "underline-input" : "form-input"}
          />
        </Field>
        <Field label="Giờ *" light={isOverlay}>
          <input
            required
            type="time"
            name="booking_time"
            value={form.booking_time}
            onChange={onChange}
            className={isOverlay ? "underline-input" : "form-input"}
          />
        </Field>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Field label="Số khách *" light={isOverlay}>
          <select
            name="guest_count"
            value={form.guest_count}
            onChange={onChange}
            className={isOverlay ? "underline-input" : "form-input"}
          >
            {GUEST_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="text-brand-charcoal">
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Khu vực mong muốn" light={isOverlay}>
          <select
            name="preferred_area"
            value={form.preferred_area}
            onChange={onChange}
            className={isOverlay ? "underline-input" : "form-input"}
          >
            <option value="Bàn thường" className="text-brand-charcoal">
              Bàn thường
            </option>
            <option value="Phòng riêng (VIP)" className="text-brand-charcoal">
              Phòng riêng (VIP)
            </option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Ghi chú / yêu cầu đặc biệt" light={isOverlay}>
          <textarea
            name="special_requests"
            value={form.special_requests}
            onChange={onChange}
            rows={3}
            className={isOverlay ? "underline-input resize-none" : "form-input resize-none"}
            placeholder="Sinh nhật, dị ứng thực phẩm,..."
          />
        </Field>
      </div>

      {message && (
        <p
          className={`mt-4 text-sm ${
            message.type === "ok"
              ? isOverlay
                ? "text-brand-cream"
                : "text-green-700"
              : isOverlay
                ? "text-yellow-200"
                : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="mt-8 flex justify-center">
        <Button
          type="submit"
          variant={isOverlay ? "white" : "white"}
          disabled={loading}
          className={
            isOverlay
              ? "!bg-white !text-brand-red hover:!bg-brand-cream"
              : "!bg-white !text-brand-red border-white hover:!bg-brand-cream"
          }
        >
          {loading ? "Đang gửi..." : "Gửi yêu cầu đặt bàn"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  light,
}: {
  label: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <label className="block">
      <span
        className={`mb-1 block text-xs font-medium ${
          light ? "text-white/90" : "text-white/90"
        }`}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
