import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGES } from "@/data/content";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt="Bếp trưởng Cung Hỷ Phát Tài"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-black/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 text-center text-white">
        <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          Tinh túy ẩm thực Trung Hoa,
          <br />
          hội tụ trong một bàn tiệc
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
          Từ nguyên liệu tinh tuyển đến kỹ thuật chế biến chuẩn mực, mỗi món ăn
          tại Cung Hỷ Phát Tài là một hành trình khám phá hương vị Trung Hoa
          đích thực — sang trọng, ấm áp và đáng nhớ.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/dat-ban">Đặt bàn ngay</Button>
          <Button href="/menu" variant="outline">
            Khám phá thực đơn
          </Button>
        </div>
      </div>
    </section>
  );
}
