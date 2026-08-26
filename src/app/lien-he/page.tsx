import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ",
};

export default function LienHePage() {
  return (
    <SiteLayout navVariant="solid">
      <section className="bg-[#888888] pt-28 pb-12 text-center text-white">
        <p className="text-xs uppercase tracking-[0.2em]">Kết nối & lắng nghe</p>
        <h1 className="mt-3 text-3xl font-bold uppercase md:text-4xl">
          Liên hệ Cung Hỷ Phát Tài
        </h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-sm text-white/90">
          Chúng tôi luôn trân trọng mọi ý kiến đóng góp và sẵn sàng giải đáp mọi
          câu hỏi của quý thực khách.
        </p>
      </section>
      <section className="bg-white">
        <ContactForm />
      </section>
    </SiteLayout>
  );
}
