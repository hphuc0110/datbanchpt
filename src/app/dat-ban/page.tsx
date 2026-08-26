import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { BookingPageForm } from "@/components/booking/BookingPageForm";
import { SITE } from "@/data/content";

export const metadata: Metadata = {
  title: "Đặt bàn",
};

export default function DatBanPage() {
  return (
    <SiteLayout navVariant="light">
      <section className="bg-brand-dark pt-28 pb-12 text-center text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">
          Phục vụ chu đáo & đẳng cấp
        </p>
        <h1 className="mt-3 text-3xl font-bold uppercase md:text-4xl lg:text-5xl">
          Đặt bàn tại Cung Hỷ Phát Tài
        </h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-white/80">
          {SITE.addressFull}
        </p>
      </section>
      <section className="bg-[#f7f7f7]">
        <BookingPageForm />
      </section>
    </SiteLayout>
  );
}
