import Image from "next/image";
import { BookingForm } from "@/components/booking/BookingForm";
import { IMAGES } from "@/data/content";

export function BookingCtaSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <Image
        src={IMAGES.bookingBg}
        alt="Không gian đặt bàn"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8">
        <div className="rounded-sm bg-brand-red/95 px-6 py-10 text-white shadow-2xl md:px-12 md:py-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-wide md:text-4xl">
              Đặt bàn ngay
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/85">
              We love hearing from you! Điền thông tin bên dưới để đặt bàn tại
              Cung Hỷ Phát Tài — chúng tôi sẽ xác nhận trong thời gian sớm nhất.
            </p>
          </div>
          <BookingForm variant="overlay" />
        </div>
      </div>
    </section>
  );
}
