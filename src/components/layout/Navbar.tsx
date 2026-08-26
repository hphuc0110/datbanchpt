"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/content";
import { Button } from "@/components/ui/Button";

type Props = {
  variant?: "overlay" | "solid" | "light";
};

export function Navbar({ variant = "overlay" }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = variant === "solid" || scrolled;
  const isLight = variant === "light";

  const barBg = isLight
    ? "bg-[#f5f5f5] text-brand-charcoal shadow-sm"
    : isSolid
      ? "bg-brand-charcoal/95 text-white backdrop-blur-md shadow-lg"
      : "bg-transparent text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${barBg}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/80 bg-white">
            <Image
              src="/logo.svg"
              alt={SITE.name}
              fill
              className="object-cover p-1"
              priority
            />
          </div>
          <span className="hidden text-xs font-bold uppercase tracking-wider sm:block lg:text-sm">
            {SITE.nameUpper}
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-1 rounded-full px-2 py-1 md:flex ${
            isLight ? "bg-white shadow-sm" : "bg-white/10 backdrop-blur-sm"
          }`}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            if (link.hasDropdown) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-brand-red"
                        : isLight
                          ? "text-brand-charcoal hover:text-brand-red"
                          : "text-white hover:text-brand-cream"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  {menuOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-[180px] rounded-lg bg-white py-2 shadow-xl">
                      <Link
                        href="/menu#mon-chinh"
                        className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-cream hover:text-brand-red"
                      >
                        Món chính
                      </Link>
                      <Link
                        href="/menu#dimsum"
                        className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-cream hover:text-brand-red"
                      >
                        Dimsum
                      </Link>
                      <Link
                        href="/menu#signature"
                        className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-cream hover:text-brand-red"
                      >
                        Signature
                      </Link>
                      <Link
                        href="/menu#sang"
                        className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-cream hover:text-brand-red"
                      >
                        Thực đơn sáng
                      </Link>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-red"
                    : isLight
                      ? "text-brand-charcoal hover:text-brand-red"
                      : "text-white hover:text-brand-cream"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className={`flex items-center gap-2 text-sm font-medium ${
              isLight ? "text-brand-charcoal" : "text-white"
            }`}
          >
            <Phone className="h-4 w-4" />
            <span>GỌI {SITE.phone}</span>
          </a>
          <Button href="/dat-ban" className="!py-2.5 !text-xs">
            Đặt bàn ngay
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          className={`border-t px-4 py-4 md:hidden ${
            isLight
              ? "border-black/10 bg-white text-brand-charcoal"
              : "border-white/10 bg-brand-charcoal text-white"
          }`}
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === link.href ? "text-brand-red" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 px-3 py-2 text-sm"
            >
              <Phone className="h-4 w-4" /> GỌI {SITE.phone}
            </a>
            <Button href="/dat-ban" className="mt-2 w-full">
              Đặt bàn ngay
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
