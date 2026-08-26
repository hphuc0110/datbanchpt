import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IMAGES } from "@/data/content";

export function MorningSection() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <Image
        src={IMAGES.morning}
        alt="Điểm tâm Trung Hoa"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-red/85 via-brand-red/55 to-transparent" />

      <div className="relative z-10 flex min-h-[70vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 lg:px-8">
          <div className="max-w-xl text-white">
            <SectionLabel light>Morning</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
              Một buổi sáng rất Trung Hoa
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/90 md:text-base">
              Phục vụ điểm tâm từ 08:00 – 11:00 mỗi ngày. Không gian ấm cúng,
              trà thơm và dimsum nóng hổi — khởi đầu ngày mới đúng chất ẩm thực
              Trung Hoa.
            </p>
            <div className="mt-8">
              <Button href="/menu#sang" variant="cream">
                Xem thực đơn sáng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
