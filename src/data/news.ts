export type NewsCategory =
  | "nguon-goc"
  | "thuong-thuc"
  | "mon-ngon"
  | "bang-gia";

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  imageClassName: string;
  category: NewsCategory;
};

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "cua-long-thuong-hai-la-gi",
    title:
      "Cua lông Thượng Hải là gì? Đặc điểm, mùa cua và cách thưởng thức",
    excerpt:
      "Mỗi độ thu về, cua lông lại trở thành một trong những nguyên liệu được nhắc đến nhiều trong đời sống ẩm thực Trung Hoa. Cùng tìm hiểu nguồn gốc, đặc điểm và mùa nào là thời điểm thích hợp để thưởng thức.",
    date: "30/09/2026",
    image: "/cua-long/hero-cua-long.png",
    imageAlt: "Cua lông hấp trong xửng tre",
    imageClassName: "scale-[1.7] object-cover object-[82%_center]",
    category: "nguon-goc",
  },
  {
    slug: "nguon-goc-cua-long-ho-duong-trung",
    title:
      "Cua lông có nguồn gốc từ đâu? Khám phá cua lông hồ Dương Trừng và tiêu chuẩn “Tứ đại đặc trưng”",
    excerpt:
      "Khám phá cái nôi sản sinh ra loài cua được nhắc đến nhiều nhất trong mùa thu Trung Hoa, và cách giới sành ăn nhận biết cua chuẩn gốc Dương Trừng.",
    date: "28/09/2026",
    image: "/cua-long/cua-nguyen-con.png",
    imageAlt: "Cua lông nguyên con",
    imageClassName: "object-contain bg-black p-4",
    category: "nguon-goc",
  },
  {
    slug: "mua-cua-long-cuu-thu-thap-hung",
    title:
      "Mùa cua lông vào tháng mấy? Quy tắc “Cửu thư thập hùng” mà người sành ăn nên biết",
    excerpt:
      "Mùa cua lông gắn liền với tiết trời mùa thu. Tìm hiểu thời điểm thưởng cua cái, cua đực ngon nhất và cách phân biệt hai loại cua này.",
    date: "26/09/2026",
    image: "/cua-long/crab-claws.png",
    imageAlt: "Càng và chân cua lông",
    imageClassName: "object-cover",
    category: "thuong-thuc",
  },
  {
    slug: "mi-cua-long-thuong-hai-la-gi",
    title:
      "Mì cua lông Thượng Hải là gì? Khám phá món mì đặc trưng mùa cua",
    excerpt:
      "Mì cua lông Thượng Hải tập trung vào thịt, gạch và phần cua được chế biến cô đọng, phủ lên những sợi mì dai mềm — món ăn được nhắc đến nhiều mỗi khi mùa cua trở lại.",
    date: "24/09/2026",
    image: "/cua-long/crab-set-duc.png",
    imageAlt: "Set mì và xốt cua lông",
    imageClassName: "object-cover",
    category: "mon-ngon",
  },
  {
    slug: "mi-cua-long-khac-mi-cua-thuong",
    title:
      "Mì cua lông khác gì so với mì cua thông thường? 4 điểm khác biệt đáng chú ý",
    excerpt:
      "Hai món đều kết hợp cua và mì, nhưng khác nhau ở loại cua, cách xử lý phần cua, hương vị và tính mùa vụ. Mì cua lông gắn với văn hóa thưởng cua mùa thu của Thượng Hải và vùng Giang Nam.",
    date: "22/09/2026",
    image: "/cua.png",
    imageAlt: "Set xốt cua Thượng Hải",
    imageClassName: "object-cover",
    category: "mon-ngon",
  },
];

export const FEATURED_SLUG = "cua-long-thuong-hai-la-gi";

export const SPOTLIGHT = {
  slug: "mi-cua-long-thuong-hai-la-gi",
  banner:
    "Mì cua lông Thượng Hải — món mì đặc trưng mỗi khi mùa cua trở lại",
};

export function getNewsPost(slug: string) {
  return NEWS_POSTS.find((post) => post.slug === slug);
}
