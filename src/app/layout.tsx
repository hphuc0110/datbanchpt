import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const goldener = localFont({
  src: "./fonts/1FTV-VIP-Goldener.ttf",
  variable: "--font-goldener",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Cung Hỷ Phát Tài | Ẩm thực Trung Hoa",
    template: "%s | Cung Hỷ Phát Tài",
  },
  description:
    "Tinh túy ẩm thực Trung Hoa hội tụ tại Cung Hỷ Phát Tài — đặt bàn, thực đơn signature và điểm tâm sáng.",
  icons: {
    icon: "/logo1.svg",
    shortcut: "/logo1.svg",
    apple: "/logo1.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${goldener.variable} h-full`}>
      <body className={`${beVietnamPro.className} min-h-full flex flex-col antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
