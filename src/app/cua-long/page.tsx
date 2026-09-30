import type { Metadata } from "next";
import Image from "next/image";
import { ArticleCatalog } from "@/components/cua-long/ArticleCatalog";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { IMAGES } from "@/data/content";

export const metadata: Metadata = {
  title: "Cẩm nang cua lông Thượng Hải",
  description:
    "Cách nhận biết cua lông Hồ Dương Trừng, quy tắc Cửu thư thập hùng và kỹ thuật hấp giữ trọn gạch tại Cung Hỷ Phát Tài.",
};

const STANDARDS = [
  {
    id: "thanh-boi",
    index: "1. Thanh Bối (青背)",
    title: "Mai Xanh Bóng Như Ngọc",
    body: "Mai cua màu xanh ngọc bích bóng mượt, không tỳ vết, gợi cảm giác nổi trên mặt nước hồ kiềm trong suốt.",
    image: "/cua-long/thanh-boi.png",
    position: "object-[72%_center]",
    label: "above" as const,
  },
  {
    id: "bach-do",
    index: "2. Bạch Đỗ (白肚)",
    title: "Bụng Trắng Sáng Tinh Khiết",
    body: "Đáy hồ cát sỏi sáng màu giữ yếm bụng cua trắng ngần. Tuyệt đối không bị đen sẫm hay bám phân bẩn.",
    image: "/cua-long/bach-do.png",
    position: "object-[28%_center]",
    label: "above" as const,
  },
  {
    id: "kim-trao",
    index: "3. Kim Trảo (金爪)",
    title: "Chân Vuốt Vàng Ánh Kim",
    body: "Tám chiếc chân cứng cáp, chắc khỏe. Các khớp móng ngồi màu vàng óng, thể hiện chuẩn trên từng chi tiết.",
    image: "/cua-long/kim-trao.png",
    position: "object-[78%_center]",
    label: "below" as const,
  },
  {
    id: "hoang-mao",
    index: "4. Hoàng Mao (黄毛)",
    title: "Lông Càng Hung Vàng Mượt",
    body: "Lớp lông tơ trên càng và viền chân dày mướt, màu vàng hung óng ánh tự nhiên, ôm mềm mọi đường khớp.",
    image: "/cua-long/hoang-mao.png",
    position: "object-[22%_center]",
    label: "below" as const,
  },
];

const SEASONS = [
  {
    id: "cua-cai",
    month: "Tháng 9 Âm Lịch",
    title: "Cua lông cái (Đoàn Tế – 团脐)",
    image: IMAGES.signatureMain,
    points: [
      {
        label: "Đặc điểm yếm",
        text: "Yếm cái hình bán nguyệt tròn, chiếm trọn diện tích mặt bụng.",
      },
      {
        label: "Chất lượng gạch",
        text: "Gạch son đỏ cam rực rỡ, chắc ruột, bùi béo, tạo tầng vị trong miệng.",
      },
      {
        label: "Món thích hợp",
        text: "Hấp nguyên con chấm gừng tiến hoa, làm sốt gạch cua trộn mì.",
      },
    ],
  },
  {
    id: "cua-duc",
    month: "Tháng 10 Âm Lịch",
    title: "Cua lông đực (Tiêm Tế – 尖脐)",
    image: "/cua-long/crab-set-duc.png",
    points: [
      {
        label: "Đặc điểm yếm",
        text: "Yếm đực thon gọn hình tháp nhọn, càng to hơn và lông càng dày hơn.",
      },
      {
        label: "Chất lượng thịt",
        text: "Thịt trong ngà trắng, dẻo dai, vị ngọt đậm và sạch.",
      },
      {
        label: "Món thích hợp",
        text: "Hấp nguyên con dùng kèm rượu Hoa Điêu nóng, hoặc nấu cháo Triều Châu.",
      },
    ],
  },
];

const RULES = [
  {
    id: "01",
    title: "Giữ Nguyên Dây Cố Buộc Chặt",
    body: "Không tháo dây trước khi hấp. Cua còn vùng sẽ giãy, gãy càng và rách màng yếm, làm khối gạch quý chảy mất trước khi chín.",
  },
  {
    id: "02",
    title: "Bắt Buộc Hấp Ngửa Bụng",
    body: "Đặt mai úp xuống khay, ngửa yếm lên. Lớp mai thành một chiếc thố, giữ trọn khối gạch chảy bên trong, không để thất thoát một giọt.",
  },
  {
    id: "03",
    title: "Lót Lá Tía Tô & Gừng Già",
    body: "Rải lá tía tô tươi dưới đáy vỉ và lát gừng già lên bụng cua. Tinh dầu giải vị tanh hàn, kéo vị béo của gạch bật lên trọn miếng.",
  },
];

function StandardCard({
  item,
}: {
  item: (typeof STANDARDS)[number];
}) {
  const textOnTop = item.label === "above";

  return (
    <article>
      {textOnTop && (
        <p className="mb-2 text-sm font-semibold text-brand-red md:text-[15px]">
          {item.index}
        </p>
      )}
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover ${item.position}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className={`pointer-events-none absolute inset-0 ${
            textOnTop
              ? "bg-linear-to-b from-black/75 via-black/25 to-transparent"
              : "bg-linear-to-t from-black/80 via-black/30 to-transparent"
          }`}
        />
        <div
          className={`absolute inset-x-0 z-40 px-5 py-4 text-white sm:px-6 sm:py-5 ${
            textOnTop ? "top-0" : "bottom-0"
          }`}
        >
          <p className="font-sans text-base font-bold leading-snug text-white md:text-lg">
            {item.title}
          </p>
          <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-white/80">
            {item.body}
          </p>
        </div>
      </div>
      {!textOnTop && (
        <p className="mt-2 text-sm font-semibold text-brand-red md:text-[15px]">
          {item.index}
        </p>
      )}
    </article>
  );
}

export default function CuaLongPage() {
  return (
    <SiteLayout navVariant="overlay">
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <Image
          src="/cua-long/hero-cua-long.png"
          alt="Cua lông hấp trong xửng tre"
          fill
          priority
          className="object-cover object-[70%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 lg:px-8">
          <div className="max-w-xl text-white">
            <SectionLabel light>Cẩm nang cua lông Thượng Hải</SectionLabel>
            <h1 className="mt-5 text-2xl font-bold uppercase leading-[1.15] sm:text-4xl lg:text-5xl">
              <span className="block">Cẩm nang cua lông</span>
              <span className="block">Thượng Hải</span>
              <span className="block">Nguồn gốc, cách ăn</span>
              <span className="block">&amp; mì cua lông trứ danh</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-white/85 sm:text-base">
              Tổng hợp kiến thức từ bếp Cung Hỷ Phát Tài: cua lông ngon ở đâu,
              mì gạch cua lông nhiều gạch, quy tắc mùa vụ “Cửu thư thập hùng”
              và cách hấp giữ trọn phần ngon nhất của con cua.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/dat-ban">Đặt bàn ngay</Button>
              <Button href="/menu" variant="outline">
                Khám phá thực đơn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="tu-dai-tieu-chuan" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <SectionLabel>Cẩm nang nhận biết</SectionLabel>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold uppercase leading-[1.15] text-brand-red md:text-[2.75rem]">
              Tứ đại tiêu chuẩn cua lông
              <br />
              Hồ Dương Trừng chuẩn gốc
            </h2>
          </div>
          <div className="relative mt-8">
            <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-1">
              {STANDARDS.map((item) => (
                <StandardCard key={item.id} item={item} />
              ))}
            </div>
            <img
              src="/cua-long/cua-cutout.png"
              alt=""
              className="pointer-events-none absolute top-1/2 left-1/2 z-30 hidden w-[78%] max-w-none -translate-x-1/2 -translate-y-1/2 md:block"
            />
          </div>
        </div>
      </section>

      <section id="cuu-thu-thap-hung" className="scroll-mt-24 bg-brand-red py-12 text-white lg:py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="border-2 border-dashed border-white/70 px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div className="text-center">
              <SectionLabel light>Bí quyết sành ăn bậc thầy</SectionLabel>
              <h2 className="mx-auto mt-5 max-w-3xl text-2xl font-bold uppercase leading-tight md:text-5xl">
                Giải mã quy tắc <br />“Cửu thư thập hùng”
                <br />
                (tháng 9 cua cái,<br /> tháng 10 cua đực)
              </h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {SEASONS.map((season) => (
                <article key={season.id} className="bg-white text-brand-charcoal">
                  <div className="relative aspect-16/10">
                    <Image
                      src={season.image}
                      alt={season.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <span className="absolute bottom-3 left-3 bg-white/92 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-charcoal">
                      {season.month}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold uppercase text-brand-red md:text-xl">
                      {season.title}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-brand-charcoal/85">
                      {season.points.map((point) => (
                        <li key={point.label} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                          <span>
                            <span className="font-semibold text-brand-charcoal">
                              {point.label}:
                            </span>{" "}
                            {point.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div
              id="bi-mat-ram"
              className="mt-8 bg-[#f3d27a] px-5 py-8 text-center text-brand-red sm:px-10"
            >
              <h3 className="text-lg font-bold uppercase leading-snug md:text-2xl">
                Bí mật dân sành: tuyệt đối tránh ăn cua lông vào ngày trăng tròn
                (rằm 14 – 16 âm lịch)
              </h3>
              <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-brand-red/90">
                Gần ngày trăng tròn, cua lột xác, thịt nhạt và gạch loãng. Cung
                Hỷ Phát Tài không chọn cua vào rằm 14–16 âm lịch. Chúng tôi giữ
                những con tĩnh, chắc thịt, gạch đặc, để mỗi phần ăn đủ béo,
                ngọt và tròn vị.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="ky-thuat-hap" className="scroll-mt-24 border-l-4 border-brand-red bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8">
          <div>
            <SectionLabel>Bí pháp ẩm thực cung đình</SectionLabel>
            <h2 className="mt-5 text-3xl font-bold uppercase leading-tight text-brand-red md:text-4xl lg:text-5xl">
              Kỹ thuật hấp <br />“chết trong tư thế thiền định” &amp; giữ trọn khối
              vàng lỏng Liquid Gold
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
              Cua lông rất hung. Hơi nóng đột ngột làm cua giãy, gãy càng và
              rách màng yếm. Khối gạch — phần tinh hoa đắt nhất — sẽ chảy tràn
              xuống nước hấp nếu cua không được giữ yên đúng tư thế.
            </p>
            <div className="mt-10 space-y-8">
              {RULES.map((rule) => (
                <article key={rule.id}>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">
                    Quy tắc {rule.id}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-brand-red md:text-2xl">
                    {rule.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-muted">
                    {rule.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden bg-brand-charcoal">
            <Image
              src={IMAGES.chef}
              alt="Bếp trưởng Lê Đình Mạnh"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-black/50 to-transparent" />
            <p className="absolute top-8 right-4 text-sm tracking-[0.45em] text-white/90 [writing-mode:vertical-rl]">
              陽澄湖 · 大閘蟹
            </p>
          </div>
        </div>
      </section>

      <ArticleCatalog />
    </SiteLayout>
  );
}
