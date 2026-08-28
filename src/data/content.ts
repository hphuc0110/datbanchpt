export const SITE = {
  name: "Cung Hỷ Phát Tài",
  nameUpper: "CUNG HỶ PHÁT TÀI",
  phone: "+84 915 885 888",
  hotline: "0915 885 888",
  address: "47-51 Cửa Bắc, Ba Đình, Hà Nội",
  addressFull: "47-51 Cửa Bắc, Ba Đình, Hà Nội",
  email: "hello@cunghyphattai.vn",
  hours: {
    morning: "06:00 - 11:00 (Phục vụ điểm tâm)",
    lunch: "10:30 - 14:00",
    dinner: "17:30 - 21:30 (Nhận khách cuối 21:15)",
  },
} as const;

export const NAV_LINKS: {
  href: string;
  label: string;
  hasDropdown?: boolean;
}[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/menu", label: "Menu", hasDropdown: true },
  { href: "/dat-ban", label: "Đặt bàn" },
  { href: "/lien-he", label: "Liên hệ" },
];

export const MENUS = {
  dimsum: "/Dimsum.pdf",
  tong: "/Menu-Tổng.pdf",
  signature: "/Menu-Signature.pdf",
} as const;

export const MENU_DROPDOWN = [
  { label: "Menu tổng", href: MENUS.tong },
  { label: "Dimsum", href: MENUS.dimsum },
  { label: "Menu Signature", href: MENUS.signature },
] as const;

export const IMAGES = {
  logo: "/logo.png",
  hero: "/hero.png",
  dining: "/banan.png",
  chef: "/manh.png",
  signatureMain:
    "/cua.png",
  signature1:
    "/chao.png",
  signature2:
    "/vit.png",
  signature3:
    "/ga.png",
  menuBg:
    "/back_1.png",
  morning:
    "/back3.png",
  exterior:
    "/back5.png",
  galleryFrame: "/gallery-frame.png",
  bookingBg:
    "/back6.png",
} as const;

export const SIGNATURE_DISHES = [
  {
    id: "main",
    name: "SET XỐT CUA THƯỢNG HẢI",
    description:
      "Set tinh hoa với súp cua, mì tươi và dimsum — hương vị Thượng Hải đậm đà, cân bằng giữa ngọt thanh của cua và nước sốt đặc trưng của nhà hàng.",
    image: IMAGES.signatureMain,
    featured: true,
  },
  {
    id: "1",
    name: "CHÁO CUA TRIỀU CHÂU",
    description:
      "Cháo cua mềm mịn theo công thức Triều Châu, thơm vị biển và thảo mộc thanh nhẹ.",
    image: IMAGES.signature1,
    featured: false,
  },
  {
    id: "2",
    name: "VỊT PHÚ QUÝ",
    description:
      "Vịt quay da giòn, thịt mềm, nước sốt đậm đà — món ăn tượng trưng cho sự phú quý.",
    image: IMAGES.signature2,
    featured: false,
  },
  {
    id: "3",
    name: "GÀ QUÝ PHI",
    description:
      "Gà theo phong cách cung đình, gia vị cân bằng, hương thơm thanh nhã.",
    image: IMAGES.signature3,
    featured: false,
  },
] as const;

export const GUEST_OPTIONS = [
  "1-2 người",
  "2-5 người",
  "6-10 người",
  "Trên 10 người",
] as const;

export const TABLE_TYPES = [
  {
    id: "normal",
    label: "Bàn thường (Đại Sảnh)",
    description:
      "Không gian đại sảnh rộng rãi, phù hợp gia đình và nhóm bạn bè.",
  },
  {
    id: "vip",
    label: "Phòng riêng (VIP Room)",
    description:
      "Phòng riêng sang trọng, lý tưởng cho tiếp khách và sự kiện trang trọng.",
  },
] as const;
