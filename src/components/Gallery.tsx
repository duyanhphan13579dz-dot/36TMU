import { useRef, useState } from "react";
import { CONFESSIONS, MEMORIES, type Confession } from "@/data/content";
import { Button, Icon, Kicker, SectionHeading, Sheet } from "@/components/ui";
import { cn } from "@/utils/cn";

const TONES: Record<Confession["tone"], string> = {
  blue: "bg-tmu-100 border-tmu-200 text-cobalt-900",
  orange: "bg-flame-100 border-flame-200 text-cobalt-900",
  paper: "bg-amber-50 border-amber-200 text-cobalt-900",
  mint: "bg-emerald-50 border-emerald-200 text-cobalt-900",
};

export default function Gallery({ onToast }: { onToast: (msg: string) => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState<Confession[]>(CONFESSIONS);
  const [draft, setDraft] = useState("");
  const [author, setAuthor] = useState("");

  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>("[data-slide]");
    if (!slide) return;
    const step = slide.offsetWidth + 16;
    setSliderIndex(Math.round(el.scrollLeft / step));
  };

  const addNote = () => {
    if (draft.trim().length < 5) {
      onToast("Bạn viết thêm chút nữa để mọi người đọc nhé 🙂");
      return;
    }
    const tones: Confession["tone"][] = ["blue", "orange", "paper", "mint"];
    const rotates = ["-2deg", "1.6deg", "-1.2deg", "2.2deg"];
    setNotes((n) => [
      {
        id: `me-${Date.now()}`,
        text: draft.trim(),
        author: author.trim() || "Bạn ẩn danh",
        role: "Tân thành viên K17",
        tone: tones[Math.floor(Math.random() * tones.length)],
        rotate: rotates[Math.floor(Math.random() * rotates.length)],
      },
      ...n,
    ]);
    setDraft("");
    setAuthor("");
    onToast("Lời nhắn của bạn đã được dán lên tường nhà chung 💙");
  };

  return (
    <section id="memories" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-flame-50/40 to-white" />
      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-tmu-200/40 blur-3xl" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          kicker="Góc kỷ niệm"
          title={
            <>
              Những khung hình làm nên <span className="text-tmu-600">“nhà chung”</span>
            </>
          }
          desc="Mỗi mùa đi tình nguyện, mỗi đêm lửa trại, mỗi buổi tập flashmob đổ mồ hôi… đều nằm ở đây. Bấm vào ảnh để xem to nhé!"
        />

        {/* ============ MOBILE: slider snap ============ */}
        <div className="mt-8 lg:hidden">
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3"
          >
            {MEMORIES.map((m, i) => (
              <button
                key={m.id}
                data-slide
                onClick={() => setLightbox(i)}
                className="group relative w-[82%] shrink-0 snap-center overflow-hidden rounded-3xl border-4 border-white bg-cobalt-900 shadow-lift"
              >
                <img src={m.src} alt={m.title} loading="lazy" className="h-64 w-full object-cover sm:h-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/90 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-cobalt-800">
                  {m.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="font-display text-base font-extrabold text-white">{m.title}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-white/80">{m.caption}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {MEMORIES.map((m, i) => (
              <span
                key={m.id}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  sliderIndex === i ? "w-6 bg-flame-500" : "w-1.5 bg-cobalt-300",
                )}
              />
            ))}
          </div>
        </div>

        {/* ============ DESKTOP: masonry ============ */}
        <div className="masonry mt-10 hidden lg:block" data-reveal>
          {MEMORIES.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setLightbox(i)}
              className={cn(
                "group relative block w-full overflow-hidden rounded-3xl border border-cobalt-100 bg-white text-left shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-tmu-200 hover:shadow-lift",
                m.height,
              )}
            >
              <img
                src={m.src}
                alt={m.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/90 via-cobalt-900/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-flame-500 px-2.5 py-1 text-[11px] font-bold text-white">{m.tag}</span>
                <p className="mt-2 font-display text-lg font-extrabold text-white">{m.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-white/80">{m.caption}</p>
              </div>
              <span className="absolute top-4 right-4 flex h-10 w-10 scale-75 items-center justify-center rounded-xl bg-white/90 text-cobalt-800 opacity-0 shadow-soft transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <Icon.expand className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>

        {/* ============ CONFESSIONS ============ */}
        <div className="mt-16 lg:mt-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <Kicker className="bg-white/70">Confessions của nhà chung</Kicker>
              <h3 className="text-balance-vn font-display text-2xl leading-tight font-extrabold text-cobalt-900 sm:text-3xl">
                Mẩu giấy nhỏ, tình thương to 💛
              </h3>
              <p className="text-sm leading-relaxed text-cobalt-700/80">
                Những dòng nhắn từ anh chị cựu thành viên và các bạn tân sinh viên K17. Bạn cũng có thể dán thêm một
                mẩu giấy lên tường ngay dưới đây!
              </p>
            </div>
            <div className="rounded-2xl border border-cobalt-100 bg-white/80 px-4 py-3 text-[12.5px] font-semibold text-cobalt-700 shadow-sm">
              📌 {notes.length} mẩu giấy đã được dán
            </div>
          </div>

          {/* Mobile: carousel / Desktop: grid */}
          <div className="scrollbar-none -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:px-0 md:overflow-visible xl:grid-cols-3">
            {notes.map((c) => (
              <article
                key={c.id}
                style={{ rotate: c.rotate }}
                className={cn(
                  "flex min-w-[80%] shrink-0 snap-center flex-col justify-between gap-4 rounded-2xl border-2 p-5 shadow-soft transition-all duration-300 hover:rotate-0 hover:shadow-lift md:min-w-0",
                  TONES[c.tone],
                )}
              >
                <div>
                  <span className="font-display text-3xl leading-none text-flame-500/50">“</span>
                  <p className="-mt-2 text-[13.5px] leading-relaxed">{c.text}</p>
                </div>
                <footer className="flex items-center gap-3 border-t border-black/5 pt-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/80 font-display text-sm font-extrabold text-cobalt-800 shadow-sm">
                    {c.author.slice(0, 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold">{c.author}</p>
                    <p className="truncate text-[11.5px] opacity-70">{c.role}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>

          {/* Form dán giấy */}
          <div className="mt-8 rounded-3xl border border-cobalt-100 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-6">
            <p className="font-display text-base font-extrabold text-cobalt-900">Dán một mẩu giấy của bạn</p>
            <p className="mt-1 text-[13px] text-cobalt-600/80">Cảm nhận của bạn về nhà chung, hoặc lời động viên gửi tân sinh viên K17.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Tên của bạn (VD: Minh Trí – K17)"
                className="min-h-12 w-full rounded-2xl border border-cobalt-200 bg-white px-4 text-[14px] text-cobalt-900 outline-none transition placeholder:text-cobalt-400 focus:border-tmu-400 focus:ring-4 focus:ring-tmu-100"
              />
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={1}
                placeholder="Lời nhắn của bạn..."
                className="min-h-12 w-full resize-none rounded-2xl border border-cobalt-200 bg-white px-4 py-3 text-[14px] text-cobalt-900 outline-none transition placeholder:text-cobalt-400 focus:border-tmu-400 focus:ring-4 focus:ring-tmu-100 sm:col-span-2"
              />
              <Button variant="flame" onClick={addNote} className="sm:col-span-3 md:col-span-1">
                Dán lên tường
                <Icon.heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Lightbox ===== */}
      <Sheet open={lightbox !== null} onClose={() => setLightbox(null)}>
        {lightbox !== null && (
          <div className="relative">
            <img src={MEMORIES[lightbox].src} alt={MEMORIES[lightbox].title} className="max-h-[62vh] w-full object-cover" />
            <div className="space-y-1 p-5">
              <span className="inline-flex rounded-full bg-flame-100 px-2.5 py-1 text-[11px] font-bold text-flame-700">
                {MEMORIES[lightbox].tag}
              </span>
              <h4 className="font-display text-lg font-extrabold text-cobalt-900">{MEMORIES[lightbox].title}</h4>
              <p className="text-[13.5px] leading-relaxed text-cobalt-700/85">{MEMORIES[lightbox].caption}</p>
              <div className="flex gap-2 pt-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setLightbox((i) => ((i ?? 0) - 1 + MEMORIES.length) % MEMORIES.length)}
                >
                  ← Ảnh trước
                </Button>
                <Button
                  variant="soft"
                  className="flex-1"
                  onClick={() => setLightbox((i) => ((i ?? 0) + 1) % MEMORIES.length)}
                >
                  Ảnh sau →
                </Button>
              </div>
            </div>
          </div>
        )}
      </Sheet>
    </section>
  );
}
