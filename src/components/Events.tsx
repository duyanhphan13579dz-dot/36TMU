import { useMemo, useState } from "react";
import { EVENT_FILTERS, PROGRAMS, YEARLY_TIMELINE, type Program } from "@/data/content";
import { Button, Icon, Kicker, SectionHeading, Sheet } from "@/components/ui";
import { getStoredAdminPosts } from "@/components/AdminPanel";
import { cn } from "@/utils/cn";

const STATUS_STYLE: Record<string, string> = {
  "Mới đăng": "bg-red-600 text-white animate-pulse",
  "Đang mở đăng ký": "bg-flame-500 text-white",
  "Sắp diễn ra": "bg-tmu-500 text-white",
  "Đã kết thúc": "bg-cobalt-200 text-cobalt-700",
};

export default function Events({ onToast }: { onToast: (msg: string) => void }) {
  const [filter, setFilter] = useState<string>("Tất cả");
  const [current, setCurrent] = useState<Program | null>(null);

  const adminPosts = useMemo(() => getStoredAdminPosts(), []);

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
    return [...adminPrograms, ...PROGRAMS];
  }, [adminPosts]);

  const list = useMemo(
    () => (filter === "Tất cả" ? allPrograms : allPrograms.filter((p) => p.category === filter)),
    [filter, allPrograms],
  );

  return (
    <section id="events" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
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

        {/* ===== Bộ lọc chuyên mục ===== */}
        <div className="scrollbar-none -mx-4 mt-7 flex snap-x gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
          {EVENT_FILTERS.map((f) => {
            const count = f === "Tất cả" ? PROGRAMS.length : PROGRAMS.filter((p) => p.category === f).length;
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

        {/* ===== Danh sách: mobile snap carousel / desktop grid 3 cột ===== */}
        <div
          className="scrollbar-none -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-3 xl:gap-6"
          data-reveal
        >
          {list.map((p, i) => (
            <article
              key={p.id}
              className={cn(
                "group relative flex min-w-[85%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-cobalt-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-tmu-200 hover:shadow-lift md:min-w-0",
                i % 3 === 1 && "xl:translate-y-4",
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/80 via-cobalt-900/10 to-transparent" />
                <span
                  className={cn(
                    "absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold shadow-sm",
                    STATUS_STYLE[p.status],
                  )}
                >
                  {p.status}
                </span>
                <span className="absolute top-3 right-3 rounded-xl bg-white/90 px-2.5 py-1 text-[11px] font-bold text-cobalt-800 backdrop-blur">
                  {p.category}
                </span>
                {/* Tag ngày tháng */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-soft backdrop-blur">
                  <span className="flex h-10 w-10 flex-col items-center justify-center rounded-xl bg-flame-500 leading-none text-white">
                    <span className="font-display text-lg font-extrabold">{p.day}</span>
                    <span className="text-[9px] font-bold">TH {p.month}</span>
                  </span>
                  <span className="text-[11.5px] leading-tight font-semibold text-cobalt-800">{p.dateLabel}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-balance-vn font-display text-lg leading-snug font-extrabold text-cobalt-900 transition-colors group-hover:text-tmu-700">
                  {p.title}
                </h3>
                <p className="mt-2 flex items-start gap-1.5 text-[12.5px] text-cobalt-600/80">
                  <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-flame-500" />
                  <span className="line-clamp-2">{p.location}</span>
                </p>
                <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-cobalt-700/80">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-cobalt-100 pt-4">
                  <div className="flex -space-x-2">
                    {p.gallery.slice(0, 3).map((g) => (
                      <img
                        key={g}
                        src={g}
                        alt=""
                        loading="lazy"
                        className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-cobalt-800 text-[10px] font-bold text-white">
                      +{p.gallery.length - 3}
                    </span>
                  </div>
                  <Button variant="soft" onClick={() => setCurrent(p)}>
                    Xem chi tiết
                    <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="md:hidden text-center text-xs text-cobalt-500">👆 Vuốt ngang để xem thêm chương trình</p>

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
  return (
    <div className="flex max-h-[94dvh] flex-col md:max-h-[88vh]">
      {/* Ảnh bìa */}
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-cobalt-900 md:aspect-[21/9]">
        <img src={hero} alt={p.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/90 via-cobalt-950/25 to-cobalt-950/40" />
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
        <h4 className="mt-7 flex items-center gap-2 font-display text-base font-extrabold text-cobalt-900 sm:text-lg">
          <Icon.camera className="h-5 w-5 text-tmu-600" />
          Ảnh các mùa trước
        </h4>
        <div className="scrollbar-none -mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
          {p.gallery.map((g, idx) => (
            <button
              key={g}
              onClick={() => setHero(g)}
              className={cn(
                "relative aspect-[4/3] min-w-[45%] shrink-0 snap-start overflow-hidden rounded-2xl border-2 transition-all active:scale-95 sm:min-w-0",
                hero === g ? "border-flame-500 shadow-soft" : "border-transparent hover:border-tmu-300",
              )}
            >
              <img src={g} alt={`${p.title} - ảnh ${idx + 1}`} loading="lazy" className="h-full w-full object-cover" />
              {hero === g && (
                <span className="absolute inset-0 ring-2 ring-flame-500 ring-inset" />
              )}
            </button>
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
    </div>
  );
}

export function EventKicker() {
  return <Kicker>Chương trình</Kicker>;
}
