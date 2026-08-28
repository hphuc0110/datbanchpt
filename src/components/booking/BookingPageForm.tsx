"use client";

import { FormEvent, useState } from "react";
import { MapPin, Phone, Shield } from "lucide-react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";
import {
  type BookingFieldErrors,
  hasBookingErrors,
  validateBookingForm,
} from "@/lib/booking-validation";
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
  const [fieldErrors, setFieldErrors] = useState<BookingFieldErrors>({});
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const today = new Date().toISOString().split("T")[0];

  const updateField = <K extends keyof typeof initial>(
    key: K,
    value: typeof initial[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (message?.type === "err") {
      setMessage(null);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const errors = validateBookingForm(form);
    if (hasBookingErrors(errors)) {
      setFieldErrors(errors);
      setMessage({
        type: "err",
        text: "Vui lòng kiểm tra và sửa các thông tin được đánh dấu bên dưới.",
      });
      return;
    }

    setFieldErrors({});
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
      setFieldErrors({});
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
        noValidate
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
          <Field label="Họ và tên *" error={fieldErrors.full_name}>
            <input
              className="form-input mt-2"
              value={form.full_name}
              onChange={(e) => updateField("full_name", e.target.value)}
              placeholder="Nguyễn Văn A"
              aria-invalid={fieldErrors.full_name ? true : undefined}
            />
          </Field>
          <Field label="Số điện thoại *" error={fieldErrors.phone}>
            <input
              className="form-input mt-2"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="09xx xxx xxx"
              aria-invalid={fieldErrors.phone ? true : undefined}
            />
          </Field>
        </div>

        <Field
          className="mt-4"
          label="Email (Không bắt buộc)"
          error={fieldErrors.email}
        >
          <input
            type="email"
            className="form-input mt-2"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="email@example.com"
            aria-invalid={fieldErrors.email ? true : undefined}
          />
        </Field>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Ngày *" error={fieldErrors.booking_date}>
            <input
              type="date"
              min={today}
              className="form-input mt-2"
              value={form.booking_date}
              onChange={(e) => updateField("booking_date", e.target.value)}
              aria-invalid={fieldErrors.booking_date ? true : undefined}
            />
          </Field>
          <Field label="Giờ *" error={fieldErrors.booking_time}>
            <input
              type="time"
              className="form-input mt-2"
              value={form.booking_time}
              onChange={(e) => updateField("booking_time", e.target.value)}
              aria-invalid={fieldErrors.booking_time ? true : undefined}
            />
          </Field>
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
                  onClick={() => updateField("guest_count", opt)}
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
                  onClick={() => updateField("preferred_area", type.label)}
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

        <Field
          className="mt-6"
          label="Ghi chú (Không bắt buộc)"
        >
          <textarea
            className="form-input mt-2 resize-none"
            rows={4}
            value={form.special_requests}
            onChange={(e) => updateField("special_requests", e.target.value)}
            placeholder="Yêu cầu đặc biệt..."
          />
        </Field>

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

function Field({
  label,
  children,
  error,
  className,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <label className={`block text-xs font-semibold uppercase tracking-wide ${className ?? ""}`}>
      {label}
      {children}
      {error && (
        <span className="mt-1 block text-xs font-normal normal-case text-yellow-200">
          {error}
        </span>
      )}
    </label>
  );
}
