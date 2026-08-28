import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IMAGES } from "@/data/content";

export function GallerySection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <Image
        src={IMAGES.exterior}
        alt="Mặt tiền nhà hàng"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 " />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div className="relative w-full">
          <Image
            src={IMAGES.galleryFrame}
            alt="Không gian nhà hàng Cung Hỷ Phát Tài"
            width={1200}
            height={900}
            className="h-auto w-full object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="text-white">
          <SectionLabel light>Morning</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold uppercase leading-tight md:text-4xl">
            Một không gian để cuộc trò chuyện được trọn vẹn
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-white/90 md:text-base">
            Phục vụ điểm tâm từ 08:00 – 11:00. Ánh sáng dịu, bàn ghế bố trí tinh
            tế — nơi lý tưởng để gặp gỡ, chuyện trò và thưởng thức ẩm thực sáng
            chuẩn Trung Hoa.
          </p>
          <div className="mt-8">
            <Button href="/menu#sang" variant="cream">
              Xem thực đơn sáng
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
