import { useEffect, useMemo, useState } from "react";
import { EVENT_FILTERS, YEARLY_TIMELINE, type Program } from "@/data/content";
import { Button, Icon, Kicker, SectionHeading, Sheet } from "@/components/ui";
import { getStoredAdminPosts, getAllPrograms } from "@/data/adminStore";
import { cn } from "@/utils/cn";
import { ShimmerImage } from "@/components/ui/ShimmerImage";
import { LightboxModal } from "@/components/LightboxModal";

const STATUS_STYLE: Record<string, string> = {
  "Mới đăng": "bg-red-600 text-white animate-pulse",
  "Đang mở đăng ký": "bg-flame-500 text-white",
  "Sắp diễn ra": "bg-tmu-500 text-white",
  "Đã kết thúc": "bg-cobalt-200 text-cobalt-700",
};

const YEARS = ["Tất cả", "2026", "2025", "2024"] as const;

export default function Events({ onToast }: { onToast: (msg: string) => void }) {
  const [filter, setFilter] = useState<string>("Tất cả");
  const [yearFilter, setYearFilter] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [current, setCurrent] = useState<Program | null>(null);
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  const adminPosts = useMemo(() => getStoredAdminPosts(), [dataVersion]);
  const basePrograms = useMemo(() => getAllPrograms(), [dataVersion]);

  const allPrograms = useMemo(() => {
    const adminPrograms: Program[] = adminPosts.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category as any,
      status: "Mới đăng" as any,
      month: "MỚI",
      day: "HOT",
      dateLabel: p.createdAt,
      location: p.author,
      excerpt: p.summary,
      cover: p.imageUrl || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
      gallery: [
        p.imageUrl || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
      ],
      schedule: [{ time: "Thông báo", title: p.title, note: p.summary }],
      fact: [
        { label: "Người đăng", value: p.author },
        { label: "Chuyên mục", value: p.category },
      ],
    }));
    return [...adminPrograms, ...basePrograms];
  }, [adminPosts, basePrograms]);

  const matchCategory = (cat: string, f: string) => {
    if (f === "Tất cả") return true;
    if (cat === f) return true;
    if (f === "Tình nguyện" && (cat === "Chiến dịch Mùa Hè Xanh" || cat === "Chiến dịch Đông Ấm" || cat === "Đào tạo & Gắn kết")) return true;
    if (f === "Hội đồng hương" && (cat === "Âm Vang Xứ Thanh" || cat === "Truyền thông & Đời sống")) return true;
    return false;
  };

  const list = useMemo(
    () =>
      allPrograms.filter((p) => {
        const matchesCategory = matchCategory(p.category, filter);
        const matchesYear = yearFilter === "Tất cả" || (p.year && p.year.toString() === yearFilter);
        const q = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        return matchesCategory && matchesYear && matchesQuery;
      }),
    [filter, yearFilter, searchQuery, allPrograms],
  );

  return (
    <section id="events" className="relative overflow-hidden py-16 sm:py-20 lg:py-28 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white" />
      <div className="pointer-events-none absolute top-1/4 -left-24 -z-10 h-72 w-72 rounded-full bg-flame-200/40 blur-3xl" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          kicker="Chương trình & sự kiện"
          title={
            <>
              Chuyến xe nào của nhà chung <span className="text-flame-600">sắp lăn bánh?</span>
            </>
          }
          desc="Từ Mùa Hè Xanh tới Xứ Thanh TMU Cup – bấm vào từng thẻ để xem lịch trình chi tiết, chi phí và hình ảnh của các mùa trước nhé."
        />

        {/* ===== Tìm kiếm & Bộ lọc chuyên mục ===== */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <svg
              viewBox="0 0 24 24"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cobalt-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên chiến dịch, địa điểm, từ khóa..."
              className="w-full rounded-2xl border border-cobalt-200 bg-white py-2.5 pl-10 pr-9 text-xs sm:text-sm font-semibold text-cobalt-950 placeholder:text-cobalt-400 outline-none transition focus:border-tmu-400 focus:ring-4 focus:ring-tmu-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-xs text-cobalt-400 hover:text-cobalt-700"
              >
                ✕
              </button>
            )}
          </div>
          <p className="text-xs font-bold text-cobalt-600">
            Hiển thị <span className="text-flame-600 font-black">{list.length}</span> / {allPrograms.length} chương trình
          </p>
        </div>

        {/* Bộ lọc chuyên mục */}
        <div className="scrollbar-none -mx-4 mt-3 flex snap-x gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
          {EVENT_FILTERS.map((f) => {
            const count = allPrograms.filter((p) => matchCategory(p.category, f)).length;
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-2xl border px-4 text-[13px] font-bold transition-all duration-300 active:scale-95",
                  active
                    ? "border-transparent bg-cobalt-800 text-white shadow-soft"
                    : "border-cobalt-200 bg-white text-cobalt-700 hover:border-tmu-400 hover:text-cobalt-900",
                )}
              >
                {f}
                <span
                  className={cn(
                    "rounded-lg px-1.5 py-0.5 text-[11px]",
                    active ? "bg-white/20 text-white" : "bg-cobalt-800/5 text-cobalt-600",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bộ lọc Năm tổ chức (2024, 2025, 2026) */}
        <div className="mt-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <span className="text-xs font-black uppercase tracking-wider text-cobalt-500 shrink-0">Năm:</span>
          {YEARS.map((y) => {
            const active = yearFilter === y;
            const count = allPrograms.filter((p) => {
              const matchCat = matchCategory(p.category, filter);
              const matchY = y === "Tất cả" || (p.year && p.year.toString() === y);
              return matchCat && matchY;
            }).length;
            return (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className={cn(
                  "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95",
                  active
                    ? "border-flame-500 bg-flame-500 text-white shadow-sm"
                    : "border-cobalt-200 bg-white text-cobalt-700 hover:border-flame-300 hover:bg-flame-50/50",
                )}
              >
                {y === "Tất cả" ? "Tất cả các năm" : `Năm ${y}`}
                <span
                  className={cn(
                    "rounded-md px-1 py-0.2 text-[10px]",
                    active ? "bg-white/25 text-white" : "bg-cobalt-100 text-cobalt-600",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===== Danh sách: mobile snap carousel / desktop grid 3 cột ===== */}
        {/* ===== Danh sách: Khung hình mobile tỷ lệ 9:16 (Story/Mockup layout) ===== */}
        <div
          className="scrollbar-none -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible sm:px-0 sm:gap-6"
          data-reveal
        >
          {list.map((p) => (
            <article
              key={p.id}
              onClick={() => setCurrent(p)}
              className="group relative flex w-[285px] xs:w-[300px] sm:w-auto shrink-0 snap-center cursor-pointer flex-col overflow-hidden rounded-[2.5rem] border-[4px] border-slate-900/10 bg-slate-950 text-white shadow-lift ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:border-tmu-400/80 hover:shadow-2xl aspect-[9/16] select-none"
            >
              {/* Dynamic Island / Tai thỏ mobile mock */}
              <div className="pointer-events-none absolute top-2.5 inset-x-0 z-30 flex justify-center">
                <div className="flex h-3.5 w-20 items-center justify-end px-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Ảnh nền Full-bleed theo tỷ lệ 9:16 */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <ShimmerImage
                  src={p.cover}
                  alt={p.title}
                  containerClassName="h-full w-full"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                {/* Lớp phủ gradient tạo chiều sâu và độ tương phản cao */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Thanh trạng thái phía trên (Top Bar bên trong mobile frame) */}
              <div className="relative z-10 flex items-start justify-between p-4 pt-7 gap-2">
                <div className="flex flex-wrap items-center gap-1.5 max-w-[70%]">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-xs backdrop-blur",
                      STATUS_STYLE[p.status],
                    )}
                  >
                    {p.status}
                  </span>
                  {p.year && (
                    <span className="rounded-full bg-black/50 backdrop-blur px-2 py-0.5 text-[10px] font-black text-white border border-white/20">
                      '{p.year.toString().slice(-2)}
                    </span>
                  )}
                </div>
                <span className="rounded-xl bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/15">
                  {p.category}
                </span>
              </div>

              {/* Tag ngày tháng nổi bật ở giữa */}
              <div className="relative z-10 px-4 mt-auto">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-1.5 shadow-lift backdrop-blur text-cobalt-950">
                  <span className="flex h-8 w-8 flex-col items-center justify-center rounded-xl bg-flame-500 leading-none text-white">
                    <span className="font-display text-sm font-extrabold">{p.day}</span>
                    <span className="text-[8px] font-bold uppercase">TH {p.month}</span>
                  </span>
                  <span className="text-[11.5px] leading-tight font-bold text-cobalt-900">{p.dateLabel}</span>
                </div>
              </div>

              {/* Phần thông tin dưới đáy màn hình điện thoại */}
              <div className="relative z-10 flex flex-col p-4 pt-2.5">
                <h3 className="font-display text-base sm:text-lg leading-snug font-extrabold text-white transition-colors group-hover:text-glow-300 line-clamp-2">
                  {p.title}
                </h3>
                
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-white/80">
                  <Icon.pin className="h-3.5 w-3.5 shrink-0 text-flame-400" />
                  <span className="truncate">{p.location}</span>
                </p>

                <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-white/70 font-medium">
                  {p.excerpt}
                </p>

                {/* Footer card trong khung mobile */}
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/15 pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1.5">
                      {p.gallery.slice(0, 3).map((g, gIdx) => (
                        <img
                          key={gIdx}
                          src={g}
                          alt=""
                          loading="lazy"
                          className="h-6 w-6 rounded-full border border-white/80 object-cover"
                        />
                      ))}
                    </div>
                    {p.driveLink && (
                      <a
                        href={p.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Xem toàn bộ ảnh trên Google Drive"
                        className="rounded-full bg-white/15 hover:bg-white/25 border border-white/20 px-2 py-0.5 text-[10px] font-extrabold text-glow-300 transition"
                      >
                        📂 Drive
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrent(p);
                    }}
                    className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-flame-500 to-flame-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-soft transition hover:from-flame-600 hover:to-flame-700 active:scale-95"
                  >
                    Chi tiết
                    <Icon.arrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="sm:hidden text-center text-xs font-semibold text-cobalt-500 mt-2">
          👆 Vuốt ngang để lướt qua các khung hình chương trình
        </p>

        {/* ===== VÒNG QUAY 12 THÁNG: HOẠT ĐỘNG THƯỜNG NIÊN CHUẨN XÁC ===== */}
        <div className="mt-16 rounded-3xl border border-cobalt-100 bg-gradient-to-br from-white via-tmu-50/40 to-white p-6 shadow-soft sm:p-8 lg:p-10" data-reveal>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-flame-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-flame-600 ring-1 ring-flame-200">
              📅 Vòng quay 12 tháng
            </span>
            <h3 className="mt-3 font-display text-xl font-black text-cobalt-950 sm:text-2xl lg:text-3xl">
              Chuỗi Hoạt Động Thường Niên Của Ban Liên Lạc
            </h3>
            <p className="mt-2 text-sm text-cobalt-700">
              Toàn bộ các chiến dịch và chương trình lớn diễn ra đều đặn qua từng tháng trong năm, gắn kết triệu trái tim sinh viên xứ Thanh tại TMU.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {YEARLY_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-cobalt-100 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-tmu-300 hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-base font-black text-flame-600">{item.month}</span>
                    <span className="rounded-full bg-tmu-50 px-2.5 py-0.5 text-[10.5px] font-bold text-tmu-700">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="mt-2.5 text-base font-bold text-cobalt-950 transition-colors group-hover:text-tmu-700">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-cobalt-700/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Modal chi tiết (full-screen sheet trên mobile) ===== */}
      <Sheet open={!!current} onClose={() => setCurrent(null)} labelledBy="program-title">
        {current && <ProgramDetail program={current} onToast={onToast} onClose={() => setCurrent(null)} />}
      </Sheet>
    </section>
  );
}

function ProgramDetail({
  program: p,
  onToast,
  onClose,
}: {
  program: Program;
  onToast: (msg: string) => void;
  onClose: () => void;
}) {
  const [hero, setHero] = useState(p.cover);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="flex max-h-[94dvh] flex-col md:max-h-[88vh]">
      {/* Ảnh bìa */}
      <div className="group relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-cobalt-900 md:aspect-[21/9]">
        <img src={hero} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/90 via-cobalt-950/25 to-cobalt-950/40" />
        
        {/* Nút phóng to ảnh hero */}
        <button
          onClick={() => {
            const found = p.gallery.indexOf(hero);
            setLightboxIndex(found >= 0 ? found : 0);
          }}
          className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-cobalt-950/80 px-3 py-1.5 text-xs font-bold text-white shadow-soft backdrop-blur transition hover:bg-flame-600 hover:scale-105 active:scale-95"
          title="Xem ảnh toàn màn hình"
        >
          <Icon.expand className="h-3.5 w-3.5" />
          Phóng to
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:pr-16">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", STATUS_STYLE[p.status])}>{p.status}</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              {p.category}
            </span>
          </div>
          <h3 id="program-title" className="mt-2 font-display text-xl leading-tight font-extrabold text-white sm:text-2xl md:text-3xl">
            {p.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white/85 sm:text-[13px]">
            <span className="flex items-center gap-1.5">
              <Icon.calendar className="h-4 w-4 text-glow-300" /> {p.dateLabel}
            </span>
            <span className="flex items-start gap-1.5">
              <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-glow-300" /> {p.location}
            </span>
          </div>
        </div>
      </div>

      {/* Nội dung cuộn */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
        <p className="text-[14px] leading-relaxed text-cobalt-700/90 sm:text-[15px]">{p.excerpt}</p>

        {/* Thông tin nhanh */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {p.fact.map((f) => (
            <div key={f.label} className="rounded-2xl border border-cobalt-100 bg-tmu-50/60 p-3.5">
              <p className="text-[10.5px] font-bold tracking-[0.14em] text-tmu-600 uppercase">{f.label}</p>
              <p className="mt-1 text-[13.5px] font-bold text-cobalt-900">{f.value}</p>
            </div>
          ))}
        </div>

        {/* Lịch trình */}
        <h4 className="mt-6 flex items-center gap-2 font-display text-base font-extrabold text-cobalt-900 sm:text-lg">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-flame-500 text-xs text-white">⏱</span>
          Lịch trình dự kiến
        </h4>
        <ol className="mt-4 space-y-3 border-l-2 border-dashed border-tmu-200 pl-5">
          {p.schedule.map((s, i) => (
            <li key={s.time} className="relative">
              <span className="absolute top-1.5 -left-[27px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white ring-[3px] ring-flame-400" />
              <div className="rounded-2xl border border-cobalt-100 bg-white p-3.5 shadow-sm transition hover:border-tmu-200 hover:shadow-soft">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-cobalt-800 px-2 py-0.5 font-display text-xs font-bold text-white">{s.time}</span>
                  <span className="text-[13.5px] font-bold text-cobalt-900 sm:text-sm">{s.title}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-cobalt-700/80">{s.note}</p>
                {i === p.schedule.length - 1 && (
                  <span className="mt-2 inline-block rounded-lg bg-flame-50 px-2 py-1 text-[11px] font-semibold text-flame-600">
                    Kết thúc chương trình – chụp ảnh tập thể rồi về nhé!
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Bộ ảnh */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-2">
          <h4 className="flex items-center gap-2 font-display text-base font-extrabold text-cobalt-900 sm:text-lg">
            <Icon.camera className="h-5 w-5 text-tmu-600" />
            Kho ảnh khoảnh khắc ({p.gallery.length} ảnh)
          </h4>
          {p.driveLink && (
            <a
              href={p.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-flame-500 to-flame-600 px-3.5 py-2 text-xs font-bold text-white shadow-soft transition hover:from-flame-600 hover:to-flame-700 active:scale-95"
            >
              📂 Xem trọn bộ ảnh trên Google Drive
              <Icon.arrowRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        <div className="scrollbar-none -mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
          {p.gallery.map((g, idx) => (
            <div
              key={g}
              className={cn(
                "group/thumb relative aspect-[4/3] min-w-[45%] shrink-0 snap-start overflow-hidden rounded-2xl border-2 transition-all sm:min-w-0",
                hero === g ? "border-flame-500 shadow-soft" : "border-transparent hover:border-tmu-300",
              )}
            >
              <button
                type="button"
                onClick={() => setHero(g)}
                className="h-full w-full"
                title="Bấm để chọn làm ảnh xem chính"
              >
                <img src={g} alt={`${p.title} - ảnh ${idx + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110" />
              </button>
              {hero === g && (
                <span className="pointer-events-none absolute inset-0 ring-2 ring-flame-500 ring-inset" />
              )}
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                title="Phóng to toàn màn hình"
                className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover/thumb:opacity-100 hover:bg-flame-600"
              >
                <Icon.expand className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Thanh hành động đáy */}
      <div className="sticky bottom-0 flex shrink-0 items-center gap-3 border-t border-cobalt-100 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <Button
          variant="flame"
          className="flex-1"
          onClick={() => {
            onToast(`Đã lưu chương trình vào danh sách quan tâm: ${p.title} 💙`);
            onClose();
          }}
        >
          Quan tâm chương trình
          <Icon.arrowRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="shrink-0" onClick={onClose}>
          Đóng
        </Button>
      </div>

      {/* Modal phóng to ảnh Lightbox */}
      <LightboxModal
        open={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        items={p.gallery.map((src, idx) => ({
          id: `${p.id}-lightbox-${idx}`,
          src,
          title: `${p.title} (${idx + 1}/${p.gallery.length})`,
          tag: p.category,
          caption: p.excerpt,
        }))}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}

export function EventKicker() {
  return <Kicker>Chương trình</Kicker>;
}
