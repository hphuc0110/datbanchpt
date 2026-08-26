import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/home/Hero";
import { InfoSection } from "@/components/home/InfoSection";
import { SignatureSection } from "@/components/home/SignatureSection";
import { MenuNavSection } from "@/components/home/MenuNavSection";
import { MorningSection } from "@/components/home/MorningSection";
import { GallerySection } from "@/components/home/GallerySection";
import { BookingCtaSection } from "@/components/home/BookingCtaSection";
import { IMAGES } from "@/data/content";

export default function HomePage() {
  return (
    <SiteLayout navVariant="overlay">
      <Hero />
      <InfoSection
        overline="Tuyên Ngôn Ẩm Thực"
        title="Muôn vị Trung Hoa"
        description="Từ vị cay nồng Tứ Xuyên, thanh tao Quảng Đông đến đậm đà Thượng Hải — Cung Hỷ Phát Tài mang đến hành trình hương vị đa dạng, cân bằng giữa truyền thống và sự tinh tế đương đại."
        imageSrc={IMAGES.dining}
        imageAlt="Bàn tiệc Trung Hoa"
        imageSide="left"
      />
      <InfoSection
        overline="Triết Lý Ẩm Thực"
        title="Tinh hoa không nằm ở sự cầu kỳ Tinh hoa nằm ở cách làm"
        description="Chúng tôi tin rằng nguyên liệu tốt và kỹ thuật chuẩn mực quan trọng hơn sự phô trương. Mỗi món ăn được chăm chút từ khâu chọn lựa đến hoàn thiện trên bàn tiệc."
        imageSrc={IMAGES.chef}
        imageAlt="Bếp trưởng Lê Đình Mạnh"
        imageSide="right"
        chefOverlay={{
          name: "Bếp trưởng LÊ ĐÌNH MẠNH",
          bio: "Hơn 15 năm gắn bó với ẩm thực Trung Hoa, mang phong cách chế biến tinh tế và tiêu chuẩn nhà hàng cao cấp vào từng món ăn tại Cung Hỷ Phát Tài.",
        }}
      />
      <SignatureSection />
      <MenuNavSection />
      <MorningSection />
      <GallerySection />
      <BookingCtaSection />
    </SiteLayout>
  );
}
