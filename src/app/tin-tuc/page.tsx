import type { Metadata } from "next";
import Image from "next/image";
import { NewsListing } from "@/components/news/NewsListing";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Tin tức Cung Hỷ Phát Tài: cua lông Thượng Hải là gì, nguồn gốc hồ Dương Trừng, quy tắc Cửu thư thập hùng và mì cua lông.",
};

export default function TinTucPage() {
  return (
    <SiteLayout navVariant="overlay">
      <section className="relative flex h-[340px] items-end overflow-hidden sm:h-[400px] md:h-[460px]">
        <Image
          src="/cua-long/hero-cua-long.png"
          alt="Cua lông hấp"
          fill
          priority
          className="scale-[1.85] object-cover object-[84%_46%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/25 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 lg:px-8 md:pb-14">
          <h1
            className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-be-vietnam-pro), sans-serif" }}
          >
            TIN TỨC
          </h1>
        </div>
      </section>
      <NewsListing />
    </SiteLayout>
  );
}
