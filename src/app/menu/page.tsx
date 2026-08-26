import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SIGNATURE_DISHES, IMAGES } from "@/data/content";

export const metadata: Metadata = {
  title: "Thực đơn",
};

const SECTIONS = [
  {
    id: "signature",
    title: "Menu Signature",
    items: SIGNATURE_DISHES.map((d) => ({
      name: d.name,
      description: d.description,
      image: d.image,
    })),
  },
  {
    id: "mon-chinh",
    title: "Menu Món chính",
    items: [
      {
        name: "Tôm sốt XO",
        description: "Tôm tươi sốt XO đậm đà, thơm gia vị Hong Kong.",
        image: IMAGES.signature1,
      },
      {
        name: "Bò lúc lắc tiêu đen",
        description: "Thịt bò mềm, tiêu đen thơm nồng, ăn kèm rau củ.",
        image: IMAGES.signature2,
      },
      {
        name: "Cá hấp gừng hành",
        description: "Cá tươi hấp chuẩn vị Quảng Đông, thanh nhẹ.",
        image: IMAGES.signature3,
      },
    ],
  },
  {
    id: "dimsum",
    title: "Menu Dimsum",
    items: [
      {
        name: "Há cảo tôm",
        description: "Há cảo mỏng, nhân tôm ngọt, da trong veo.",
        image: IMAGES.morning,
      },
      {
        name: "Xíu mại",
        description: "Xíu mại thịt thơm, sốt đậm đà.",
        image: IMAGES.signatureMain,
      },
      {
        name: "Bánh bao kim sa",
        description: "Nhân trứng muối chảy, vỏ mềm thơm.",
        image: IMAGES.dining,
      },
    ],
  },
  {
    id: "sang",
    title: "Thực đơn sáng",
    items: [
      {
        name: "Cháo bạch quả",
        description: "Cháo sáng thanh đạm, bổ dưỡng.",
        image: IMAGES.signature1,
      },
      {
        name: "Mì xào Hong Kong",
        description: "Mì xào giòn, topping phong phú.",
        image: IMAGES.signature2,
      },
      {
        name: "Set điểm tâm 2 người",
        description: "Kết hợp dimsum và trà, phục vụ 08:00 – 11:00.",
        image: IMAGES.morning,
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <SiteLayout navVariant="solid">
      <section className="relative overflow-hidden pt-28 pb-16 text-center text-white">
        <Image
          src={IMAGES.menuBg}
          alt="Thực đơn"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 px-4">
          <SectionLabel light>Thực đơn</SectionLabel>
          <h1 className="mt-4 text-3xl font-bold uppercase md:text-5xl">
            Thực đơn Cung Hỷ Phát Tài
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/85">
            Khám phá các bộ menu Signature, món chính, dimsum và điểm tâm sáng.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="#mon-chinh">Món chính</Button>
            <Button href="#dimsum">Dimsum</Button>
            <Button href="#signature" variant="cream">
              Signature
            </Button>
          </div>
        </div>
      </section>

      {SECTIONS.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-24 py-16 ${
            idx % 2 === 0 ? "bg-white" : "bg-brand-cream/40"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-10 text-center text-2xl font-bold uppercase text-brand-red md:text-3xl">
              {section.title}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <article key={item.name} className="group">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-bold uppercase text-brand-charcoal">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-brand-muted">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/dat-ban">Đặt bàn ngay</Button>
            </div>
          </div>
        </section>
      ))}
    </SiteLayout>
  );
}
