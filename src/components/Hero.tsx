import { HERO_BADGES, HERO_STATS } from "@/data/content";
import { Button, Icon, Kicker } from "@/components/ui";
import { LogoBadge } from "@/components/Logo";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

const MARQUEE = [
  "TINH THẦN 36",
  "MÁU CHẢY TRONG TIM",
  "SỐNG ĐỂ YÊU THƯƠNG",
  "SỐNG ĐỂ CỐNG HIẾN",
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-10 sm:pt-28 lg:pt-32 lg:pb-16">
      {/* Nền trang trí */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-tmu-300/35 blur-3xl" />
        <div className="absolute top-10 -right-20 h-96 w-96 rounded-full bg-flame-300/30 blur-3xl" />
        <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* ---------- Cột trái ---------- */}
        <div className="order-2 lg:order-1" data-reveal>
          <Kicker className="border border-cobalt-200/80 bg-white/95 font-bold text-cobalt-950 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-flame-500" />
            BLLSV Thanh Hóa · Đại học Thương Mại · Thành lập 12/04/2008
          </Kicker>

          <h1 className="mt-4 text-balance-vn font-display text-[2.1rem] leading-[1.08] font-black tracking-tight text-cobalt-950 sm:text-5xl lg:text-[3.65rem]">
            Xa nhà 300 cây số,
            <span className="relative mx-1 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-flame-500 via-flame-600 to-flame-400 bg-clip-text text-transparent">
                vẫn còn
              </span>
              <svg viewBox="0 0 200 14" className="absolute -bottom-1 left-0 h-3 w-full text-flame-300" preserveAspectRatio="none">
                <path d="M2 10c40-8 90-9 196-4" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            một mái nhà mang tên <span className="text-tmu-600">xứ Thanh</span>.
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-cobalt-800 sm:text-lg">
            Chào bạn! Chúng mình là <strong className="font-semibold text-cobalt-900">Ban Liên Lạc Sinh Viên Thanh Hóa Đại Học Thương Mại</strong> (trực thuộc Hội đồng hương Sinh viên Thanh Hóa tại Hà Nội).
            Nơi những người con sông Mã gặp nhau tại 79 Hồ Tùng Mậu, cùng đi tình nguyện, cùng tập các bài nhảy truyền thống
            và cùng gọi nhau bằng hai chữ thân thương: <em className="text-flame-600 not-italic font-semibold">người nhà</em>.
          </p>

          {/* Nút CTA – to bản cho mobile */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button as="a" href="#contact" variant="flame" size="lg" className="w-full sm:w-auto">
              Góc TNV & Lời nhắn
              <Icon.arrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button as="a" href="#dance" variant="outline" size="lg" className="w-full sm:w-auto">
              <Icon.music className="h-5 w-5 text-tmu-600" />
              Học bài nhảy truyền thống
            </Button>
          </div>

          {/* Slogan – dải chữ chạy (desktop) / wrap (mobile) */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-cobalt-100 bg-white/70 py-3 backdrop-blur">
            <div className="flex w-max animate-marquee gap-8 pr-8 sm:hidden">
              {[...MARQUEE, ...MARQUEE].map((t, i) => (
                <span key={i} className="flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-cobalt-700 uppercase">
                  <span className="text-flame-500">✦</span>
                  {t}
                </span>
              ))}
            </div>
            <div className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:flex">
              {MARQUEE.map((t) => (
                <span key={t} className="flex items-center gap-2 text-[13px] font-bold tracking-[0.16em] text-cobalt-700 uppercase">
                  <span className="text-flame-500">✦</span>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Cột phải: khung video + badge nổi ---------- */}
        <div className="relative order-1 lg:order-2">
          <VideoFeature />
        </div>
      </div>

      {/* Badge số liệu: mobile trượt ngang, desktop grid */}
      <div className="mx-auto mt-10 w-full max-w-[1400px] px-4 sm:px-6 lg:mt-14">
        <div className="scrollbar-none fade-x -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:[mask-image:none] sm:[-webkit-mask-image:none] lg:grid-cols-4">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className="group relative min-w-[62%] shrink-0 snap-center rounded-3xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:min-w-0 lg:p-5"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex items-start justify-between">
                <p className="font-display text-3xl font-extrabold text-cobalt-900 lg:text-4xl">
                  {s.value}
                  <span className="ml-0.5 text-flame-500">.</span>
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tmu-50 text-lg transition group-hover:scale-110">
                  {s.icon}
                </span>
              </div>
              <p className="mt-1 text-sm font-bold text-cobalt-800">{s.label}</p>
              <p className="mt-0.5 text-xs text-cobalt-600/70">{s.sub}</p>
              <span className="absolute inset-x-4 bottom-0 h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-tmu-400 to-flame-500 transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Khung "video" hoạt động nổi bật – mock player 16:9, bung full màn hình */
function VideoFeature() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Khung video */}
      <div className="group relative aspect-video w-full overflow-hidden rounded-3xl border-4 border-white bg-cobalt-900 shadow-lift">
        <ShimmerImage
          src="https://images.pexels.com/photos/17589607/pexels-photo-17589607.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt="Đêm diễn flashmob của BLLSV Thanh Hóa TMU"
          containerClassName="h-full w-full"
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/85 via-cobalt-900/10 to-transparent" />

        {/* Play button */}
        <button
          onClick={() => document.getElementById("dance")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Xem video flashmob Tinh thần 36"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
        >
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-flame-500/95 shadow-lift transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-flame-400/70" />
            <Icon.play className="relative ml-1 h-7 w-7 sm:h-8 sm:w-8" />
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase backdrop-blur sm:text-xs">
            Aftermovie Mùa Hè Xanh 2025 · 03:24
          </span>
        </button>

        {/* Chú thích dưới */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold text-white sm:text-lg">Tinh Thần 36 – Flashmob nhà chung</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/75 sm:text-xs">
              <Icon.pin className="h-3.5 w-3.5" /> Hội trường A · 79 Hồ Tùng Mậu
            </p>
          </div>
          <LogoBadge className="hidden h-12 w-12 shrink-0 rounded-full bg-white/90 p-1 sm:block" />
        </div>
      </div>

      {/* Badge nổi – desktop & tablet */}
      <div className="absolute -top-5 -left-4 hidden animate-float-slow items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-soft backdrop-blur sm:flex lg:-left-10">
        <span className="font-display text-2xl font-extrabold text-flame-600">15+</span>
        <span className="text-xs leading-tight font-semibold text-cobalt-800">
          Năm giữ lửa
          <span className="block text-[11px] font-medium text-cobalt-600/70">2011 → 2026</span>
        </span>
      </div>

      <div
        className="absolute -right-3 -bottom-6 hidden items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-soft backdrop-blur sm:flex lg:-right-8"
        style={{ animation: "float-slow 7s ease-in-out infinite .8s" }}
      >
        <span className="font-display text-2xl font-extrabold text-tmu-600">1000+</span>
        <span className="text-xs leading-tight font-semibold text-cobalt-800">
          Thành viên
          <span className="block text-[11px] font-medium text-cobalt-600/70">từ K44 đến K60</span>
        </span>
      </div>

      {/* Badge trượt ngang – mobile */}
      <div className="scrollbar-none -mx-4 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 sm:hidden">
        {HERO_BADGES.map((b) => (
          <span
            key={b}
            className="min-w-[72%] shrink-0 snap-center rounded-2xl border border-cobalt-100 bg-white/90 px-4 py-3 text-[13px] font-semibold text-cobalt-800 shadow-sm"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
