"use client";

import { FormEvent, useState } from "react";
import { MapPin, Phone, Send } from "lucide-react";
import { SITE } from "@/data/content";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [form, setForm] = useState({
    full_name: "",
    contact: "",
    subject: "Câu hỏi / Góp ý chung",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gửi thất bại.");

      setMessage({
        type: "ok",
        text: json.demo
          ? "Đã gửi (demo). Cấu hình Supabase trên Vercel để lưu tin nhắn thật."
          : "Cảm ơn bạn! Chúng tôi đã nhận được góp ý.",
      });
      setForm({
        full_name: "",
        contact: "",
        subject: "Câu hỏi / Góp ý chung",
        message: "",
      });
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
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-2 lg:px-8">
      <div className="rounded-xl bg-brand-red p-6 text-white md:p-8">
        <h2 className="text-xl font-bold uppercase">{SITE.nameUpper}</h2>
        <p className="mt-1 text-sm text-white/85">{SITE.addressFull}</p>

        <div className="mt-8 space-y-4 text-sm">
          <p className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              <span className="block font-semibold">Địa chỉ nhà hàng:</span>
              {SITE.addressFull}
            </span>
          </p>
          <p className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0" />
            <span>
              <span className="block font-semibold">Hotline chính:</span>
              <span className="text-lg font-bold text-brand-gold">
                {SITE.hotline}
              </span>
            </span>
          </p>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6">
          <h3 className="font-semibold">Khung giờ mở cửa phục vụ:</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li>Sáng: {SITE.hours.morning}</li>
            <li>Trưa: {SITE.hours.lunch}</li>
            <li>Chiều / Tối: {SITE.hours.dinner}</li>
          </ul>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-xl bg-brand-cream-warm p-6 md:p-8"
      >
        <h2 className="text-xl font-bold uppercase text-brand-red">
          Gửi thư / ý kiến đóng góp
        </h2>
        <p className="mt-2 text-sm text-brand-muted">
          Chúng tôi luôn trân trọng mọi ý kiến và sẵn sàng giải đáp thắc mắc của
          quý thực khách.
        </p>

        <label className="mt-6 block text-xs font-bold uppercase tracking-wide text-brand-charcoal">
          Họ và tên quý khách *
          <input
            required
            className="form-input mt-2"
            placeholder=""
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </label>

        <label className="mt-4 block text-xs font-bold uppercase tracking-wide text-brand-charcoal">
          Email hoặc số điện thoại liên hệ *
          <input
            required
            className="form-input mt-2"
            placeholder=""
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </label>

        <label className="mt-4 block text-xs font-bold uppercase tracking-wide text-brand-charcoal">
          Chủ đề
          <select
            className="form-input mt-2"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            <option>Câu hỏi / Góp ý chung</option>
            <option>Đặt bàn / Sự kiện</option>
            <option>Khiếu nại dịch vụ</option>
            <option>Hợp tác</option>
          </select>
        </label>

        <label className="mt-4 block text-xs font-bold uppercase tracking-wide text-brand-charcoal">
          Nội dung tin nhắn *
          <textarea
            required
            rows={5}
            className="form-input mt-2 resize-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </label>

        {message && (
          <p
            className={`mt-3 text-sm ${
              message.type === "ok" ? "text-green-700" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="mt-6 gap-2"
        >
          <Send className="h-4 w-4" />
          {loading ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
      </form>
    </div>
  );
}
