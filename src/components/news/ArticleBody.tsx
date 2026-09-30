import { MapPin, Phone } from "lucide-react";
import { SITE } from "@/data/content";
import type { NewsBlock } from "@/data/news-articles";

const sans = {
  fontFamily: "var(--font-be-vietnam-pro), sans-serif",
} as const;

export function ArticleBody({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div className="space-y-5 text-[15px] leading-relaxed text-brand-charcoal/90">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="pt-4 text-xl font-bold leading-snug text-brand-red md:text-2xl"
              style={sans}
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "p") {
          return <p key={index}>{block.text}</p>;
        }

        if (block.type === "ul") {
          return (
            <ul key={index} className="space-y-2">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "table") {
          return (
            <div key={index} className="overflow-x-auto border border-brand-red/30">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-brand-red text-white">
                  <tr>
                    {block.headers.map((header) => (
                      <th key={header} className="px-4 py-3 font-semibold" style={sans}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.join("-")} className="border-t border-brand-red/20">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-3 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "features") {
          return (
            <div key={index} className="grid gap-4 sm:grid-cols-2">
              {block.items.map((item) => (
                <article key={item.title} className="border-2 border-brand-red px-4 py-4">
                  <h3 className="font-bold text-brand-red" style={sans}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          );
        }

        if (block.type === "columns") {
          return (
            <div key={index} className="grid gap-4 sm:grid-cols-2">
              {block.items.map((item) => (
                <article key={item.title} className="border-2 border-brand-red px-4 py-4">
                  <h3 className="font-bold text-brand-charcoal" style={sans}>
                    {item.title}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          );
        }

        if (block.type === "faq") {
          return (
            <div key={index} className="divide-y divide-black/10 border-y border-black/10">
              {block.items.map((item) => (
                <div key={item.question} className="py-4">
                  <h3 className="font-bold text-brand-charcoal" style={sans}>
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div
            key={index}
            className="border-2 border-brand-red bg-[#fff8f8] px-5 py-5 text-sm"
          >
            <p className="flex items-start gap-2 font-semibold text-brand-charcoal">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              {SITE.name} — {SITE.addressFull}
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand-red" />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-brand-red">
                {SITE.hotline}
              </a>
            </p>
          </div>
        );
      })}
    </div>
  );
}
