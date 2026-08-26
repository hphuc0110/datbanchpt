import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Cung Hỷ Phát Tài | Ẩm thực Trung Hoa",
    template: "%s | Cung Hỷ Phát Tài",
  },
  description:
    "Tinh túy ẩm thực Trung Hoa hội tụ tại Cung Hỷ Phát Tài — đặt bàn, thực đơn signature và điểm tâm sáng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${montserrat.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
