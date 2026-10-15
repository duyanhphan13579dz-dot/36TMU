import { useEffect, useMemo, useRef, useState } from "react";
import { CONFESSIONS, MEMORIES, type Confession } from "@/data/content";
import { Button, Icon, Kicker, SectionHeading } from "@/components/ui";
import { getAllLeaders } from "@/data/adminStore";
import { cn } from "@/utils/cn";
import { LightboxModal } from "@/components/LightboxModal";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

const TONES: Record<Confession["tone"], string> = {
  blue: "bg-tmu-100 border-tmu-200 text-cobalt-900",
  orange: "bg-flame-100 border-flame-200 text-cobalt-900",
  paper: "bg-amber-50 border-amber-200 text-cobalt-900",
  mint: "bg-emerald-50 border-emerald-200 text-cobalt-900",
};

const CONFESSIONS_STORAGE_KEY = "bllsv_confessions";

function getStoredConfessions(): Confession[] {
  try {
    const raw = localStorage.getItem(CONFESSIONS_STORAGE_KEY);
    if (!raw) return CONFESSIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : CONFESSIONS;
  } catch {
    return CONFESSIONS;
  }
}

function saveStoredConfessions(notes: Confession[]) {
  try {
    localStorage.setItem(CONFESSIONS_STORAGE_KEY, JSON.stringify(notes));
  } catch {}
}

export default function Gallery({ onToast }: { onToast: (msg: string) => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState<Confession[]>(() => getStoredConfessions());
  const [draft, setDraft] = useState("");
  const [author, setAuthor] = useState("");

  const [leaderSearch, setLeaderSearch] = useState("");
  const [selectedKhoa, setSelectedKhoa] = useState<string>("all");
  const [leadersDataVersion, setLeadersDataVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setLeadersDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  useEffect(() => {
    const handleOpenMemory = (e: Event) => {
      const custom = e as CustomEvent<{ index: number }>;
      if (typeof custom.detail?.index === "number") {
        setLightbox(custom.detail.index);
      }
    };
    window.addEventListener("bllsv_open_memory_lightbox", handleOpenMemory);
    return () => window.removeEventListener("bllsv_open_memory_lightbox", handleOpenMemory);
  }, []);

  const allLeaders = useMemo(() => getAllLeaders(), [leadersDataVersion]);

  const khoasList = useMemo(() => {
    const list: string[] = [];
    allLeaders.forEach((l) => {
      if (!list.includes(l.khoa)) list.push(l.khoa);
    });
    return list;
  }, [allLeaders]);

  const filteredLeaders = useMemo(() => {
    return allLeaders.filter((l) => {
      const matchKhoa = selectedKhoa === "all" || l.khoa === selectedKhoa;
      const matchSearch =
        !leaderSearch ||
        l.name.toLowerCase().includes(leaderSearch.toLowerCase()) ||
        l.hometown.toLowerCase().includes(leaderSearch.toLowerCase()) ||
        l.role.toLowerCase().includes(leaderSearch.toLowerCase()) ||
        l.term.includes(leaderSearch);
      return matchKhoa && matchSearch;
    });
  }, [allLeaders, selectedKhoa, leaderSearch]);

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
    const newNote: Confession = {
      id: `me-${Date.now()}`,
      text: draft.trim(),
      author: author.trim() || "Bạn ẩn danh",
      role: "Tân thành viên K60",
      tone: tones[Math.floor(Math.random() * tones.length)],
      rotate: rotates[Math.floor(Math.random() * rotates.length)],
    };
    const next = [newNote, ...notes];
    setNotes(next);
    saveStoredConfessions(next);
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
                <ShimmerImage
                  src={m.src}
                  alt={m.title}
                  containerClassName="h-64 w-full sm:h-80"
                  className="h-full w-full object-cover"
                />
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
              <ShimmerImage
                src={m.src}
                alt={m.title}
                containerClassName="h-full w-full"
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

        {/* ============ BAN CHẤP HÀNH CÁC THẾ HỆ (CHUẨN TỪ K44 ĐẾN K60) ============ */}
        <div className="mt-16 rounded-3xl border border-cobalt-100 bg-white p-6 shadow-soft sm:p-8 lg:mt-24 lg:p-10" data-reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-tmu-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-tmu-700 ring-1 ring-tmu-200">
                ⭐ Thế hệ giữ lửa
              </span>
              <h3 className="font-display text-2xl font-black text-cobalt-950 sm:text-3xl">
                Ban Chấp Hành Các Khóa (K44 – K60)
              </h3>
              <p className="text-sm leading-relaxed text-cobalt-700">
                16 thế hệ anh chị Ban Chấp Hành đã cống hiến, giữ lửa và xây đắp nên mái nhà chung vững mạnh của con em Thanh Hóa tại ĐH Thương Mại từ 2008 đến nay.
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block rounded-2xl bg-cobalt-50 px-4 py-2 text-[12px] font-bold text-cobalt-800">
                Tổng cộng {allLeaders.length} anh chị BCH
              </span>
            </div>
          </div>

          {/* Công cụ tìm kiếm & lọc khóa */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="scrollbar-none -mx-2 flex snap-x gap-1.5 overflow-x-auto px-2 pb-1 sm:mx-0 sm:px-0">
              <button
                onClick={() => setSelectedKhoa("all")}
                className={cn(
                  "shrink-0 snap-start rounded-xl px-3 py-1.5 text-xs font-bold transition",
                  selectedKhoa === "all"
                    ? "bg-cobalt-800 text-white shadow-xs"
                    : "bg-cobalt-50 text-cobalt-700 hover:bg-cobalt-100",
                )}
              >
                Tất cả các khóa
              </button>
              {khoasList.map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedKhoa(k)}
                  className={cn(
                    "shrink-0 snap-start rounded-xl px-3 py-1.5 text-xs font-bold transition",
                    selectedKhoa === k
                      ? "bg-flame-500 text-white shadow-xs"
                      : "bg-cobalt-50 text-cobalt-700 hover:bg-cobalt-100",
                  )}
                >
                  {k}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={leaderSearch}
                onChange={(e) => setLeaderSearch(e.target.value)}
                placeholder="Tìm tên, quê quán, chức vụ..."
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-900 outline-none placeholder:text-cobalt-400 focus:border-tmu-400 focus:ring-2 focus:ring-tmu-100"
              />
            </div>
          </div>

          {/* Danh sách thẻ anh chị BCH */}
          <div className="mt-6 grid max-h-[460px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLeaders.map((lead, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-3 rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-3.5 transition hover:border-tmu-300 hover:bg-white hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-[14px] font-black text-cobalt-950">{lead.name}</span>
                    <span className="rounded-md bg-flame-100 px-1.5 py-0.5 text-[10px] font-bold text-flame-700">
                      {lead.khoa}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] font-semibold text-tmu-700">{lead.role}</p>
                  <p className="mt-1 text-[11.5px] text-cobalt-600">
                    📍 {lead.hometown} {lead.dob ? `· Sinh: ${lead.dob}` : ""}
                  </p>
                </div>
                <span className="shrink-0 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-cobalt-500 shadow-2xs">
                  {lead.term}
                </span>
              </div>
            ))}
          </div>
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
                Những dòng nhắn từ anh chị cựu thành viên và các bạn tân sinh viên K60, K61. Bạn cũng có thể dán thêm một
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
            <p className="mt-1 text-[13px] text-cobalt-600/80">Cảm nhận của bạn về nhà chung, hoặc lời động viên gửi tân sinh viên K60, K61.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Tên của bạn (VD: Minh Trí – K60)"
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

      {/* ===== Lightbox xem ảnh toàn màn hình ===== */}
      <LightboxModal
        open={lightbox !== null}
        currentIndex={lightbox ?? 0}
        items={MEMORIES}
        onClose={() => setLightbox(null)}
        onNavigate={(idx) => setLightbox(idx)}
      />
    </section>
  );
}
