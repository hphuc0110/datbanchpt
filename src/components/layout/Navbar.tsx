"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, MENU_DROPDOWN, SITE } from "@/data/content";
import { Button } from "@/components/ui/Button";

type Props = {
  variant?: "overlay" | "solid" | "light";
};

export function Navbar({ variant = "overlay" }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const contactColor = isLight ? "text-brand-charcoal" : "text-white";

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-brand-red transition-colors ${
      active ? "text-brand-red" : "hover:text-brand-red-dark"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${barBg}`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="relative z-10 flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={192}
            height={90}
            className="h-11 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-full bg-white px-2 py-1 shadow-[0_4px_24px_rgba(0,0,0,0.12)] md:flex">
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
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                    className={navLinkClass(menuOpen || active)}
                  >
                    {(menuOpen || active) && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                        aria-hidden
                      />
                    )}
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 shrink-0 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {menuOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-[180px] rounded-lg bg-white py-2 shadow-xl">
                      {MENU_DROPDOWN.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-cream hover:text-brand-red"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(active && !menuOpen)}
              >
                {active && !menuOpen && (
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                    aria-hidden
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${contactColor}`}
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span>GỌI {SITE.phone}</span>
          </a>
          <Button
            href="/dat-ban"
            className="!rounded-none !px-5 !py-2.5 !text-xs"
          >
            Đặt bàn ngay
          </Button>
        </div>

        <button
          type="button"
          className="relative z-10 rounded-md p-2 md:hidden"
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
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div key={link.href}>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen((v) => !v)}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                        mobileMenuOpen ? "text-brand-red" : ""
                      }`}
                    >
                      {mobileMenuOpen && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                          aria-hidden
                        />
                      )}
                      {link.label}
                      <ChevronDown
                        className={`ml-auto h-4 w-4 shrink-0 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileMenuOpen && (
                      <div className="mt-1 flex flex-col gap-1 pl-5">
                        {MENU_DROPDOWN.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm text-brand-muted hover:text-brand-red"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    active ? "text-brand-red" : ""
                  }`}
                >
                  {active && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                      aria-hidden
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 px-3 py-2 text-sm"
            >
              <Phone className="h-4 w-4" /> GỌI {SITE.phone}
            </a>
            <Button href="/dat-ban" className="mt-2 w-full !rounded-none">
              Đặt bàn ngay
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
