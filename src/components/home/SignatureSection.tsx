import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SIGNATURE_DISHES } from "@/data/content";

export function SignatureSection() {
  const featured = SIGNATURE_DISHES.find((d) => d.featured)!;
  const list = SIGNATURE_DISHES.filter((d) => !d.featured);

  return (
    <section className="bg-brand-red-deep py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <SectionLabel light>Tuyển Tập Tinh Hoa</SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl lg:text-5xl">
            Những hương vị làm nên Cung Hỷ
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <article>
            <div className="relative mb-4 aspect-[16/11] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <span className="mb-3 inline-block bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">
              Signature
            </span>
            <h3 className="font-display text-xl font-bold uppercase md:text-2xl">
              {featured.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              {featured.description}
            </p>
          </article>

          <div className="flex flex-col justify-between gap-6">
            {list.map((dish) => (
              <article key={dish.id} className="flex gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden sm:h-28 sm:w-28">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div>
                  <span className="mb-1 inline-block bg-brand-cream px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">
                    Signature
                  </span>
                  <h3 className="font-display text-base font-bold uppercase sm:text-lg">
                    {dish.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-sm">
                    {dish.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button href="/menu#signature" variant="cream">
            Xem Menu Signature
          </Button>
        </div>
      </div>
    </section>
  );
}
