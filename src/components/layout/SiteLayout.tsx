import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type Props = {
  children: React.ReactNode;
  navVariant?: "overlay" | "solid" | "light";
};

export function SiteLayout({ children, navVariant = "overlay" }: Props) {
  return (
    <>
      <Navbar variant={navVariant} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
