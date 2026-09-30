"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { NEWS_POSTS, type NewsCategory } from "@/data/news";

const CATEGORIES: { id: NewsCategory; label: string; kicker: string }[] = [
  { id: "nguon-goc", label: "Nguồn gốc văn hóa", kicker: "Nguồn gốc & văn hóa" },
  { id: "thuong-thuc", label: "Cách thưởng thức", kicker: "Cách thưởng thức" },
  { id: "mon-ngon", label: "Món ngon cua lông", kicker: "Món ngon cua lông" },
  { id: "bang-gia", label: "Bảng giá & kinh nghiệm", kicker: "Bảng giá & kinh nghiệm" },
];

function formatDate(date: string) {
  const [day, month, year] = date.split("/");
  if (!day || !month || !year) return date;
  return `${day} . ${month} . ${year}`;
}

export function ArticleCatalog() {
  const [active, setActive] = useState<NewsCategory>("nguon-goc");

  const visible = useMemo(
    () => NEWS_POSTS.filter((article) => article.category === active),
    [active],
  );

  const [featured, ...rest] = visible;
  const featuredCategory = CATEGORIES.find((category) => category.id === active);

  return (
    <section id="danh-muc" className="scroll-mt-24 bg-brand-red text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
          Danh mục bài viết
        </p>
        <h2 className="mt-3 max-w-xl text-xl font-bold uppercase leading-tight md:text-5xl">
          Danh mục bài viết chuyên sâu
        </h2>

        <div className="mt-8 flex flex-col gap-4 border-b border-white/20 pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {CATEGORIES.map((category) => {
              const selected = active === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActive(category.id)}
                  className={`pb-1 text-sm transition-colors ${
                    selected
                      ? "border-b-2 border-[#f3d27a] font-semibold text-[#f3d27a]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
          <Link
            href="/tin-tuc"
            className="text-sm text-white/90 underline-offset-4 hover:underline"
          >
            Xem tất cả tin tức
          </Link>
        </div>

        {featured ? (
          <div
            className={`mt-10 grid items-start gap-10 ${
              rest.length > 0
                ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                : "max-w-xl"
            }`}
          >
            <article className="bg-[#f6f3ee] p-4 text-brand-charcoal sm:p-5">
              <div className="relative mb-5 aspect-16/10 overflow-hidden bg-[#d9d9d9]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  className={featured.imageClassName}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
                {featuredCategory?.kicker}
                <span className="mx-3 text-brand-charcoal/40">
                  {formatDate(featured.date)}
                </span>
              </p>
              <h3 className="mt-3 text-xl font-bold uppercase leading-snug md:text-2xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                {featured.excerpt}
              </p>
              <Link
                href={`/tin-tuc/${featured.slug}`}
                className="mt-6 inline-flex bg-brand-cream px-5 py-3 text-xs font-semibold uppercase tracking-wide text-brand-red hover:bg-brand-cream-warm"
              >
                Đọc bài chi tiết
              </Link>
            </article>

            {rest.length > 0 && (
            <div className="divide-y divide-white/25">
              {rest.map((article) => (
                <article key={article.slug} className="py-5 first:pt-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                    {featuredCategory?.kicker}
                    <span className="mx-3">{formatDate(article.date)}</span>
                  </p>
                  <Link
                    href={`/tin-tuc/${article.slug}`}
                    className="mt-2 block text-lg font-bold uppercase leading-snug hover:text-[#f3d27a] md:text-xl"
                  >
                    {article.title}
                  </Link>
                </article>
              ))}
            </div>
            )}
          </div>
        ) : (
          <p className="mt-10 text-sm text-white/80">
            Chưa có bài viết trong mục này.
          </p>
        )}
      </div>
    </section>
  );
}
