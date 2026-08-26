export const SITE = {
  name: "Cung Hỷ Phát Tài",
  nameUpper: "CUNG HỶ PHÁT TÀI",
  phone: "+123 456 789",
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

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&q=80",
  dining: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80",
  signatureMain:
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&q=80",
  signature1:
    "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&q=80",
  signature2:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
  signature3:
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
  menuBg:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
  morning:
    "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=1920&q=80",
  exterior:
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2cdb01ffa?w=600&q=80",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80",
    "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=600&q=80",
  ],
  bookingBg:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80",
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
