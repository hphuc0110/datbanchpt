"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURED_SLUG, NEWS_POSTS, SPOTLIGHT } from "@/data/news";

const PAGE_SIZE = 6;

const sans = {
  fontFamily: "var(--font-be-vietnam-pro), sans-serif",
} as const;

export function NewsListing() {
  const [page, setPage] = useState(1);
  const featured = NEWS_POSTS.find((post) => post.slug === FEATURED_SLUG);
  const spotlight = NEWS_POSTS.find((post) => post.slug === SPOTLIGHT.slug);
  const totalPages = Math.ceil(NEWS_POSTS.length / PAGE_SIZE);
  const items = NEWS_POSTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function goTo(next: number) {
    const clamped = Math.min(Math.max(next, 1), totalPages);
    setPage(clamped);
    document
      .getElementById("danh-sach-tin")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="bg-white pb-20 pt-10 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <h2
          className="w-fit border-b-2 border-brand-red pb-1 text-lg font-bold text-brand-red md:text-xl"
          style={sans}
        >
          Tin tức nổi bật
        </h2>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          {featured && (
            <Link href={`/tin-tuc/${featured.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  className={featured.imageClassName}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <h3
                className="mt-4 text-lg font-bold leading-snug text-brand-red group-hover:underline md:text-xl"
                style={sans}
              >
                {featured.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted md:text-[15px]">
                {featured.excerpt}
              </p>
            </Link>
          )}

          {spotlight && (
            <Link
              href={`/tin-tuc/${spotlight.slug}`}
              className="group block border-2 border-brand-red bg-white"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-black">
                <Image
                  src={spotlight.image}
                  alt={spotlight.imageAlt}
                  fill
                  className={spotlight.imageClassName}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <p
                  className="absolute inset-x-0 bottom-0 bg-brand-red px-4 py-3 text-sm font-bold leading-snug text-white md:text-[15px]"
                  style={sans}
                >
                  {SPOTLIGHT.banner}
                </p>
              </div>
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <h3
                  className="text-base font-bold leading-snug text-brand-charcoal group-hover:text-brand-red md:text-lg"
                  style={sans}
                >
                  {spotlight.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {spotlight.excerpt}
                </p>
              </div>
            </Link>
          )}
        </div>

        <div
          id="danh-sach-tin"
          className="mt-8 grid scroll-mt-28 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {items.map((article) => (
            <Link
              key={article.slug}
              href={`/tin-tuc/${article.slug}`}
              className="flex min-h-[210px] flex-col border-2 border-brand-red px-4 py-4 hover:bg-[#fff8f8] sm:px-5 sm:py-5"
            >
              <h3
                className="text-[15px] font-bold leading-snug text-brand-charcoal md:text-base"
                style={sans}
              >
                {article.title}
              </h3>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#8a8a8a]">
                {article.excerpt}
              </p>
              <p className="mt-auto pt-6 text-right text-xs text-[#9a9a9a]">
                {article.date}
              </p>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
        <nav
          className="mt-12 flex items-center justify-center gap-2.5 sm:gap-3"
          aria-label="Phân trang tin tức"
        >
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Trang trước"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-red text-brand-red transition-colors hover:bg-brand-red/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const number = index + 1;
            const active = number === page;
            return (
              <button
                key={number}
                type="button"
                onClick={() => goTo(number)}
                aria-label={`Trang ${number}`}
                aria-current={active ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                  active
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-brand-red bg-white text-brand-red hover:bg-brand-red/5"
                }`}
                style={sans}
              >
                {number}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Trang sau"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-red bg-brand-red text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:border-brand-red/40 disabled:bg-brand-red/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
        )}
      </div>
    </section>
  );
}
