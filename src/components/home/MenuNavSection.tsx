import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGES, MENUS } from "@/data/content";

export function MenuNavSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Image
        src={IMAGES.menuBg}
        alt="Không gian nhà hàng"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <h2 className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl lg:text-5xl">
          Thực đơn Cung Hỷ Phát Tài
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
          Từ món chính đậm đà, dimsum tinh tế đến các set signature độc quyền —
          thực đơn được biên soạn để mang đến trải nghiệm ẩm thực Trung Hoa
          trọn vẹn cho mọi dịp.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <Button
            href={MENUS.tong}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem Menu Tổng
          </Button>

          <Button
            href={MENUS.dimsum}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem Menu Dimsum
          </Button>
          <Button
            href={MENUS.signature}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem Menu Signature
          </Button>
        </div>
      </div>
    </section>
  );
}
