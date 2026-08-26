import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { SITE } from "@/data/content";

function SocialIcon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a href="#" aria-label={label} className="hover:text-white">
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        {children}
      </svg>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-red text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white">
              <Image
                src="/logo.svg"
                alt={SITE.name}
                fill
                className="object-cover p-1"
              />
            </div>
            <span className="text-sm font-bold uppercase tracking-wide">
              {SITE.nameUpper}
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/85">
            Tinh túy ẩm thực Trung Hoa hội tụ tại Cung Hỷ Phát Tài — nơi hương
            vị truyền thống được chế biến bằng kỹ thuật tinh tế và nguyên liệu
            chọn lọc.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Liên kết</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/90">
            <Link href="/" className="hover:underline">
              Trang chủ
            </Link>
            <Link href="/dat-ban" className="hover:underline">
              Đặt bàn
            </Link>
            <Link href="/menu" className="hover:underline">
              Menu
            </Link>
            <Link href="/lien-he" className="hover:underline">
              Liên hệ
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold">Địa chỉ</h3>
          <div className="space-y-3 text-sm text-white/90">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {SITE.addressFull}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              {SITE.hotline}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 text-xs text-white/80 sm:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} CUNG HY PHAT TAI RESTAURANT. DEVELOPED
            BY DONG LAO FOOD.
          </p>
          <div className="flex items-center gap-4">
            <SocialIcon label="Instagram">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
            </SocialIcon>
            <SocialIcon label="LinkedIn">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-3.92V8.5z" />
            </SocialIcon>
            <SocialIcon label="X">
              <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.5l-5.1-6.66L5.2 22H1.94l8.02-9.16L1.5 2h6.66l4.6 6.1L18.244 2zm-1.14 18h1.8L7.02 3.9H5.1L17.1 20z" />
            </SocialIcon>
            <SocialIcon label="Facebook">
              <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
