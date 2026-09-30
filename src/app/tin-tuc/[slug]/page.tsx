import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/news/ArticleBody";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { NEWS_BODIES } from "@/data/news-articles";
import { getNewsPost, NEWS_POSTS } from "@/data/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return NEWS_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return { title: "Tin tức" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  const blocks = NEWS_BODIES[slug];
  if (!post || !blocks) notFound();

  const related = NEWS_POSTS.filter((item) => item.slug !== post.slug);

  return (
    <SiteLayout navVariant="solid">
      <article className="bg-white pb-20 pt-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/tin-tuc"
            className="text-sm font-semibold text-brand-red hover:underline"
          >
            Tin tức
          </Link>
          <p className="mt-6 text-xs text-[#9a9a9a]">{post.date}</p>
          <h1
            className="mt-3 text-3xl font-bold leading-snug text-brand-charcoal md:text-4xl"
            style={{ fontFamily: "var(--font-be-vietnam-pro), sans-serif" }}
          >
            {post.title}
          </h1>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-black">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              className={post.imageClassName}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <div className="mt-8">
            <ArticleBody blocks={blocks} />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl border-t border-black/10 px-4 pt-10 lg:px-8">
          <h2
            className="text-lg font-bold text-brand-red"
            style={{ fontFamily: "var(--font-be-vietnam-pro), sans-serif" }}
          >
            Bài viết khác
          </h2>
          <ul className="mt-4 divide-y divide-black/10">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/tin-tuc/${item.slug}`}
                  className="block py-4 text-sm font-semibold leading-snug text-brand-charcoal hover:text-brand-red"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </SiteLayout>
  );
}
