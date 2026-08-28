import Image from "next/image";
import { Button } from "@/components/ui/Button";

type Props = {
  overline: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  ctaHref?: string;
  ctaLabel?: string;
  chefOverlay?: {
    name: string;
    bio: string;
  };
};

const CHEF_CHARS = ["精", "華", "廚", "藝"] as const;

export function InfoSection({
  overline,
  title,
  description,
  imageSrc,
  imageAlt,
  imageSide = "left",
  ctaHref,
  ctaLabel = "Tìm hiểu thêm",
  chefOverlay,
}: Props) {
  const imageBlock = (
    <div
      className={`relative w-full overflow-hidden ${
        chefOverlay ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
      {chefOverlay && (
        <>
          <div className="absolute right-3 top-5 flex flex-col gap-2 sm:right-4 sm:top-6 sm:gap-2.5">
            {CHEF_CHARS.map((char) => (
              <span
                key={char}
                className="flex size-8 items-center justify-center rounded-full border border-white/70 bg-black/25 text-sm font-semibold text-white backdrop-blur-[2px] sm:size-9 sm:text-base"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-red via-brand-red/80 to-transparent px-5 pb-5 pt-16 text-white sm:px-6 sm:pb-6">
            <p className="text-sm font-bold uppercase tracking-wide">
              {chefOverlay.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/90">
              {chefOverlay.bio}
            </p>
          </div>
        </>
      )}
    </div>
  );

  const textBlock = (
    <div
      className={`flex flex-col justify-center py-6 md:py-0 ${
        imageSide === "left" ? "md:pl-4 lg:pl-8" : "md:pr-4 lg:pr-8"
      }`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 shrink-0 bg-brand-muted/50" />
        <span className="border-b border-brand-muted/35 pb-0.5 text-xs uppercase tracking-[0.15em] text-brand-muted">
          {overline}
        </span>
      </div>
      <h2 className="max-w-xl whitespace-pre-line text-3xl font-bold uppercase leading-[1.15] text-brand-red md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-brand-charcoal/80 md:text-base">
        {description}
      </p>
      {ctaHref && (
        <div className="mt-8">
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white">
      <div
        className={`mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:gap-10 md:py-16 lg:gap-14 lg:px-8 ${
          imageSide === "left"
            ? "md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            : "md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        }`}
      >
        {imageSide === "left" ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  );
}
