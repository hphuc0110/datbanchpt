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

export function InfoSection({
  overline,
  title,
  description,
  imageSrc,
  imageAlt,
  imageSide = "left",
  ctaHref = "/menu",
  ctaLabel = "Tìm hiểu thêm",
  chefOverlay,
}: Props) {
  const imageBlock = (
    <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {chefOverlay && (
        <>
          <div className="absolute right-4 top-6 writing-vertical text-2xl font-bold tracking-widest text-white/80 [writing-mode:vertical-rl]">
            精華廚藝
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-wide">
              {chefOverlay.name}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/85">
              {chefOverlay.bio}
            </p>
          </div>
        </>
      )}
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center px-2 py-8 md:px-10 lg:px-14">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-8 bg-brand-muted/60" />
        <span className="text-xs uppercase tracking-[0.15em] text-brand-muted">
          {overline}
        </span>
      </div>
      <h2 className="max-w-md text-3xl font-bold uppercase leading-tight text-brand-red md:text-4xl">
        {title}
      </h2>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-muted md:text-base">
        {description}
      </p>
      <div className="mt-8">
        <Button href={ctaHref}>{ctaLabel}</Button>
      </div>
    </div>
  );

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl items-stretch md:grid-cols-2">
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
