import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DANCES, TRADITIONAL_SONGS, type Dance, type TraditionalSong } from "@/data/content";
import { Button, Icon, useLockScroll, useEscape } from "@/components/ui";
import { buildClickTrackWav, downloadBlob, startMetronome, type MetronomeHandle } from "@/lib/audio";
import { cn } from "@/utils/cn";

function toSeconds(d: string) {
  const [m, s] = d.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
}

export type MediaItem =
  | { type: "dance"; data: Dance }
  | { type: "song"; data: TraditionalSong };

interface DanceVaultModalProps {
  open: boolean;
  onClose: () => void;
  initialId?: string | null;
  onToast: (msg: string) => void;
}

export default function DanceVaultModal({
  open,
  onClose,
  initialId,
  onToast,
}: DanceVaultModalProps) {
  const [activeMedia, setActiveMedia] = useState<{ type: "dance" | "song"; id: string }>({
    type: "dance",
    id: DANCES[0].id,
  });
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState<"all" | "flashmob" | "dan-vu" | "song">("all");
  const [mirror, setMirror] = useState(false);
  const [viewMode, setViewMode] = useState<"video" | "metronome">("video");
  const [mobileTab, setMobileTab] = useState<"player" | "playlist">("player");
  const [playingMetro, setPlayingMetro] = useState(false);
  const [beat, setBeat] = useState(0);
  const [progress, setProgress] = useState(0);

  const metro = useRef<MetronomeHandle | null>(null);

  useLockScroll(open);
  useEscape(open, onClose);

  // Set initial item if provided when opening
  useEffect(() => {
    if (open && initialId) {
      const isSong = TRADITIONAL_SONGS.some((s) => s.id === initialId);
      if (isSong) {
        setActiveMedia({ type: "song", id: initialId });
      } else {
        const isDance = DANCES.some((d) => d.id === initialId);
        if (isDance) {
          setActiveMedia({ type: "dance", id: initialId });
        }
      }
    }
  }, [open, initialId]);

  // Combined list of all media
  const allMediaItems: MediaItem[] = useMemo(() => {
    const list: MediaItem[] = [];
    DANCES.forEach((d) => list.push({ type: "dance", data: d }));
    TRADITIONAL_SONGS.forEach((s) => list.push({ type: "song", data: s }));
    return list;
  }, []);

  // Filtered media items
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allMediaItems.filter((item) => {
      // Category filter
      if (filterCat === "flashmob" && (item.type !== "dance" || item.data.style !== "Flashmob")) return false;
      if (filterCat === "dan-vu" && (item.type !== "dance" || item.data.style !== "Dân vũ truyền thống")) return false;
      if (filterCat === "song" && item.type !== "song") return false;

      // Text query
      if (!q) return true;
      if (item.type === "dance") {
        return (
          item.data.title.toLowerCase().includes(q) ||
          item.data.style.toLowerCase().includes(q) ||
          item.data.vibe.toLowerCase().includes(q)
        );
      } else {
        return (
          item.data.title.toLowerCase().includes(q) ||
          (item.data.author && item.data.author.toLowerCase().includes(q)) ||
          item.data.note.toLowerCase().includes(q)
        );
      }
    });
  }, [allMediaItems, filterCat, query]);

  // Current active dance or song
  const currentDance = useMemo(() => {
    if (activeMedia.type === "dance") {
      return DANCES.find((d) => d.id === activeMedia.id) ?? DANCES[0];
    }
    return null;
  }, [activeMedia]);

  const currentSong = useMemo(() => {
    if (activeMedia.type === "song") {
      return TRADITIONAL_SONGS.find((s) => s.id === activeMedia.id) ?? TRADITIONAL_SONGS[0];
    }
    return null;
  }, [activeMedia]);

  const currentYoutubeId = currentSong ? currentSong.youtubeId : (currentDance?.youtubeId ?? DANCES[0].youtubeId);
  const currentTitle = currentSong ? currentSong.title : (currentDance?.title ?? DANCES[0].title);
  const currentDuration = currentDance ? currentDance.duration : "04:00";
  const total = toSeconds(currentDuration);

  const stopMetro = () => {
    metro.current?.stop();
    metro.current = null;
  };

  useEffect(() => {
    if (!playingMetro || viewMode !== "metronome" || !currentDance) {
      stopMetro();
      return;
    }
    metro.current = startMetronome(currentDance.bpm, (b) => setBeat(b));
    const started = Date.now() - progress * total * 1000;
    const timer = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - started) / (total * 1000));
      setProgress(p);
      if (p >= 1) {
        setPlayingMetro(false);
        setProgress(0);
        setBeat(0);
      }
    }, 120);
    return () => {
      window.clearInterval(timer);
      stopMetro();
    };
  }, [playingMetro, currentDance, total, progress, viewMode]);

  useEffect(() => stopMetro, []);

  if (!open) return null;

  const selectMedia = (type: "dance" | "song", id: string) => {
    stopMetro();
    setPlayingMetro(false);
    setProgress(0);
    setActiveMedia({ type, id });
    setViewMode("video");
    setMobileTab("player");
  };

  const toggleMirror = () => {
    setMirror((m) => {
      const next = !m;
      onToast(next ? "Đã bật chế độ lật gương (Mirror Mode) 🪞" : "Đã tắt chế độ lật gương");
      return next;
    });
  };

  const copyLyrics = (song: TraditionalSong) => {
    const text =
      `${song.title}\n${song.author ? song.author + "\n" : ""}\n` +
      song.lyrics.map((sec) => `[${sec.section}]\n${sec.lines.join("\n")}`).join("\n\n");
    navigator.clipboard?.writeText(text);
    onToast(`Đã sao chép toàn bộ lời bài hát "${song.title}"! 📋`);
  };

  const downloadMusic = (d: Dance) => {
    try {
      const blob = buildClickTrackWav(d.bpm, 8);
      downloadBlob(blob, `Nhac-dem-nhip-${d.id}-${d.bpm}bpm-BLLSVTH-TMU.wav`);
      onToast(`Đang tải nhạc đếm nhịp ${d.bpm} BPM (${d.music.title}) 🎵`);
    } catch {
      onToast("Trình duyệt chưa hỗ trợ xuất file nhạc, bạn hãy thử lại trên Chrome nhé!");
    }
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vault-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-cobalt-950/85 backdrop-blur-md transition-opacity animate-[fadeIn_.2s_ease-out]"
      />

      {/* Main Modal Window */}
      <div className="relative z-10 flex h-full w-full max-w-[1460px] flex-col overflow-hidden bg-cobalt-950 text-white shadow-lift sm:h-[94vh] sm:rounded-3xl sm:border sm:border-cobalt-700/60 animate-[popIn_.25s_cubic-bezier(.22,1,.36,1)]">
        {/* ===== TOP BAR ===== */}
        <header className="flex shrink-0 items-center justify-between border-b border-cobalt-800 bg-cobalt-900/90 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-flame-500 text-lg shadow-soft">
              🎬
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="vault-modal-title" className="font-display text-base font-bold text-white sm:text-lg">
                  Kho Bài Nhảy &amp; Giai Điệu 36
                </h2>
                <a
                  href="https://www.youtube.com/@THVcuMedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1.5 rounded-full border border-red-500/40 bg-red-950/60 px-2.5 py-0.5 text-[11px] font-bold text-red-300 transition hover:bg-red-900 sm:inline-flex"
                >
                  <span>▶</span> TH VCU Media (@THVcuMedia) ↗
                </a>
              </div>
              <p className="text-[11.5px] text-cobalt-300">
                Xem trực tiếp không chuyển trang · {DANCES.length} điệu nhảy &amp; {TRADITIONAL_SONGS.length} bài hát
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentSong ? currentSong.url : currentDance?.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              title="Mở video này trên YouTube"
              className="hidden rounded-xl border border-cobalt-700 bg-cobalt-800/80 px-3 py-1.5 text-xs font-semibold text-cobalt-200 transition hover:border-red-500 hover:text-white sm:inline-flex sm:items-center sm:gap-1.5"
            >
              <span>▶</span> Mở YouTube ↗
            </a>
            <button
              onClick={onClose}
              aria-label="Đóng cửa sổ kho tư liệu"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-flame-500 active:scale-95 sm:h-10 sm:w-10"
            >
              ✕
            </button>
          </div>
        </header>

        {/* ===== BỘ LỌC VÀ TÌM KIẾM ===== */}
        <div className="flex shrink-0 flex-col gap-2.5 border-b border-cobalt-800 bg-cobalt-900/40 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          {/* Category Tabs */}
          <div className="scrollbar-none flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: `Tất cả (${allMediaItems.length})` },
              { id: "flashmob", label: `Flashmob & Hiện đại (${DANCES.filter((d) => d.style === "Flashmob").length})` },
              { id: "dan-vu", label: `Dân vũ truyền thống (${DANCES.filter((d) => d.style === "Dân vũ truyền thống").length})` },
              { id: "song", label: `Giai điệu & Ca khúc (${TRADITIONAL_SONGS.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCat(tab.id as typeof filterCat)}
                className={cn(
                  "shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition",
                  filterCat === tab.id
                    ? "bg-flame-500 text-white shadow-soft"
                    : "bg-cobalt-800/60 text-cobalt-300 hover:bg-cobalt-800 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-cobalt-400">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm bài nhảy, ca khúc..."
              className="w-full rounded-xl border border-cobalt-700 bg-cobalt-950/80 py-1.5 pr-3 pl-8 text-xs text-white placeholder-cobalt-400 focus:border-flame-400 focus:ring-1 focus:ring-flame-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-2.5 flex items-center text-xs text-cobalt-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Segmented Tab Switcher (Hiển thị riêng trên mobile) */}
        <div className="flex lg:hidden border-b border-cobalt-800 bg-cobalt-900/80 p-1.5 shrink-0">
          <button
            onClick={() => setMobileTab("player")}
            className={cn(
              "flex-1 rounded-xl py-2 text-xs font-bold transition flex items-center justify-center gap-1.5",
              mobileTab === "player" ? "bg-flame-500 text-white shadow-soft" : "text-cobalt-300 hover:text-white"
            )}
          >
            <span>🎬</span> Video &amp; Chi tiết
          </button>
          <button
            onClick={() => setMobileTab("playlist")}
            className={cn(
              "flex-1 rounded-xl py-2 text-xs font-bold transition flex items-center justify-center gap-1.5",
              mobileTab === "playlist" ? "bg-flame-500 text-white shadow-soft" : "text-cobalt-300 hover:text-white"
            )}
          >
            <span>📋</span> Danh sách ({filteredItems.length})
          </button>
        </div>

        {/* ===== BODY CONTENT: 2 CỘT (PLAYER & CHOREO / PLAYLIST) ===== */}
        <div className="grid flex-1 overflow-y-auto lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.65fr_1fr]">
          {/* CỘT TRÁI: YOUTUBE CINEMA PLAYER & HƯỚNG DẪN ĐỘNG TÁC / LỜI BÀI HÁT */}
          <div
            className={cn(
              "flex flex-col border-b border-cobalt-800/80 p-3 sm:p-6 lg:border-r lg:border-b-0",
              mobileTab === "playlist" && "hidden lg:flex"
            )}
          >
            {/* Thanh điều khiển phụ của player */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/20 px-2.5 py-1 text-[11px] font-bold text-red-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  Đang phát trực tiếp
                </span>
                <span className="rounded-lg bg-cobalt-800/80 px-2.5 py-1 text-[11px] font-semibold text-cobalt-300">
                  {currentSong ? "🎶 Bài Hát" : currentDance?.style}
                </span>
              </div>

              {currentDance && (
                <div className="flex items-center gap-1 rounded-xl border border-cobalt-700 bg-cobalt-900 p-0.5 text-xs">
                  <button
                    onClick={() => {
                      setViewMode("video");
                      setPlayingMetro(false);
                    }}
                    className={cn(
                      "rounded-lg px-2.5 py-1 font-bold transition",
                      viewMode === "video" ? "bg-flame-500 text-white" : "text-cobalt-300 hover:text-white"
                    )}
                  >
                    🎬 Video
                  </button>
                  <button
                    onClick={() => setViewMode("metronome")}
                    className={cn(
                      "rounded-lg px-2.5 py-1 font-bold transition",
                      viewMode === "metronome" ? "bg-flame-500 text-white" : "text-cobalt-300 hover:text-white"
                    )}
                  >
                    🥁 Đếm nhịp
                  </button>
                </div>
              )}
            </div>

            {/* KHUNG VIDEO 16:9 */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-cobalt-700/80 bg-black shadow-lift">
              {viewMode === "video" ? (
                <iframe
                  key={`${currentYoutubeId}-${mirror}`}
                  src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}?autoplay=1&enablejsapi=1&rel=0`}
                  title={`Video ${currentTitle}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className={cn(
                    "h-full w-full border-0 transition-transform duration-300",
                    mirror && "scale-x-[-1]"
                  )}
                />
              ) : (
                /* Metronome UI View */
                <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-cobalt-950 via-cobalt-900 to-tmu-950 p-6 text-center">
                  <p className="text-xs font-bold tracking-widest text-flame-400 uppercase">
                    CHẾ ĐỘ ĐẾM NHỊP KHỚP ĐỘI HÌNH
                  </p>
                  <h3 className="mt-1 font-display text-xl font-black text-white sm:text-2xl">
                    {currentDance?.title}
                  </h3>
                  <p className="mt-1 text-xs text-cobalt-300">
                    {currentDance?.bpm} BPM · Nhịp 4/4 tiêu chuẩn
                  </p>

                  {/* Vòng tròn đếm nhịp */}
                  <div className="my-5 flex items-center gap-3 sm:gap-5">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className={cn(
                          "flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-black transition-all sm:h-16 sm:w-16 sm:text-2xl",
                          beat === n
                            ? "scale-110 bg-flame-500 text-white shadow-soft ring-4 ring-flame-400/40"
                            : "bg-cobalt-800/80 text-cobalt-400"
                        )}
                      >
                        {n}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setPlayingMetro((p) => !p)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-flame-500 to-flame-600 px-6 py-2.5 text-sm font-bold text-white shadow-soft hover:brightness-110 active:scale-95"
                  >
                    <span>{playingMetro ? "⏸ Tạm Dừng" : "▶ Bắt Đầu Đếm Nhịp"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Hàng nút chức năng bên dưới video */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-base font-bold text-white sm:text-lg">
                  {currentTitle}
                </h3>
                <p className="text-xs text-cobalt-300">
                  {currentSong
                    ? `${currentSong.author || "BLLSV TMU"} · ${currentSong.note}`
                    : `${currentDance?.style} · ${currentDance?.bpm} BPM · ${currentDance?.duration}`}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {currentDance && (
                  <>
                    <button
                      onClick={toggleMirror}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition shadow-xs",
                        mirror
                          ? "border-flame-400 bg-flame-500/20 text-flame-300"
                          : "border-cobalt-700 bg-cobalt-900 text-cobalt-200 hover:border-cobalt-500"
                      )}
                    >
                      <Icon.mirror className="h-3.5 w-3.5" />
                      Lật gương 🪞
                    </button>
                    <button
                      onClick={() => downloadMusic(currentDance)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-cobalt-700 bg-cobalt-900 px-3 py-1.5 text-xs font-bold text-cobalt-200 transition hover:border-cobalt-500 hover:text-white"
                    >
                      <Icon.download className="h-3.5 w-3.5" />
                      Tải beat nhịp
                    </button>
                  </>
                )}

                {currentSong && (
                  <>
                    <button
                      onClick={() => copyLyrics(currentSong)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-cobalt-700 bg-cobalt-900 px-3 py-1.5 text-xs font-bold text-cobalt-200 transition hover:border-flame-400 hover:text-flame-300"
                    >
                      <Icon.copy className="h-3.5 w-3.5" />
                      Chép lời bài hát
                    </button>
                    {currentSong.zingUrl && (
                      <a
                        href={currentSong.zingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-600/40 bg-emerald-950/60 px-3 py-1.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900"
                      >
                        <span>🎧</span> Zing MP3
                      </a>
                    )}
                  </>
                )}

                <a
                  href={currentSong ? currentSong.url : currentDance?.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-600/40 bg-red-950/60 px-3 py-1.5 text-xs font-bold text-red-300 transition hover:bg-red-900"
                >
                  <span>▶</span> Mở YouTube ↗
                </a>
              </div>
            </div>

            {/* BẢNG CHI TIẾT ĐỘNG TÁC HOẶC LỜI BÀI HÁT */}
            <div className="mt-4 flex-1 rounded-2xl border border-cobalt-800 bg-cobalt-900/60 p-4">
              {currentSong ? (
                <div>
                  <div className="flex items-center justify-between border-b border-cobalt-800 pb-2.5">
                    <span className="text-xs font-bold tracking-wider text-flame-400 uppercase">
                      Lời bài hát chính thức
                    </span>
                    <button
                      onClick={() => copyLyrics(currentSong)}
                      className="text-xs text-cobalt-400 transition hover:text-white"
                    >
                      Sao chép tất cả 📋
                    </button>
                  </div>
                  <div className="mt-3 max-h-56 space-y-3.5 overflow-y-auto pr-1 text-xs scrollbar-thin">
                    {currentSong.lyrics.map((sec, idx) => (
                      <div key={idx} className="rounded-xl border border-cobalt-800 bg-cobalt-950/60 p-3">
                        <p className="font-bold text-flame-300">{sec.section}</p>
                        <div className="mt-1.5 space-y-1 text-cobalt-200">
                          {sec.lines.map((l, lIdx) => (
                            <p key={lIdx}>{l}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : currentDance ? (
                <div>
                  <div className="flex items-center justify-between border-b border-cobalt-800 pb-2.5">
                    <span className="text-xs font-bold tracking-wider text-flame-400 uppercase">
                      Hướng dẫn động tác ({currentDance.steps.length} nhịp chính)
                    </span>
                    <span className="text-[11px] text-cobalt-400">
                      Bản chuẩn Ban Văn hóa TMU
                    </span>
                  </div>
                  <div className="mt-3 max-h-56 space-y-2.5 overflow-y-auto pr-1 text-xs scrollbar-thin">
                    {currentDance.steps.map((st, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "rounded-xl border p-2.5 transition",
                          beat === idx + 1 && playingMetro
                            ? "border-flame-400 bg-flame-950/60 text-white"
                            : "border-cobalt-800 bg-cobalt-950/60 text-cobalt-200"
                        )}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>
                            Nhịp {st.count}: {st.name}
                          </span>
                          {beat === idx + 1 && playingMetro && (
                            <span className="text-[10px] text-flame-400 animate-pulse">Đang đếm</span>
                          )}
                        </div>
                        <p className="mt-1 text-[11.5px] text-cobalt-300 leading-relaxed">{st.how}</p>
                        {st.tip && <p className="mt-0.5 text-[10.5px] text-amber-300/80 italic">💡 {st.tip}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Quick switch to playlist button for mobile */}
              <div className="lg:hidden mt-5 pt-3 border-t border-cobalt-800/80">
                <button
                  type="button"
                  onClick={() => setMobileTab("playlist")}
                  className="w-full flex items-center justify-between rounded-2xl border border-flame-500/40 bg-flame-950/40 p-3.5 text-xs font-bold text-flame-300 hover:bg-flame-900/50 active:scale-95 transition"
                >
                  <span className="flex items-center gap-2">
                    <span>📋</span>
                    <span>Chọn bài khác trong danh sách ({filteredItems.length})</span>
                  </span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: TOÀN BỘ DANH SÁCH TIẾT MỤC (PLAYLIST GALLERY) */}
          <div
            className={cn(
              "flex flex-col p-3 sm:p-6 bg-cobalt-950/60",
              mobileTab === "player" && "hidden lg:flex"
            )}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-cobalt-300 uppercase">
                Danh Sách Tiết Mục ({filteredItems.length})
              </span>
              <span className="text-[11px] text-cobalt-400">
                Nhấp để phát ngay lập tức
              </span>
            </div>

            {/* List items */}
            <div className="space-y-2 overflow-y-auto pr-1 scrollbar-thin">
              {filteredItems.map((item) => {
                const isSelected =
                  item.type === activeMedia.type && item.data.id === activeMedia.id;
                const title = item.data.title;
                const thumb = item.data.thumbnail;
                const sub =
                  item.type === "dance"
                    ? `${item.data.style} · ${item.data.duration} · ${item.data.bpm} BPM`
                    : `${item.data.author || "BLLSV TMU"} · Ca khúc`;
                const isFlashmob = item.type === "dance" && item.data.style === "Flashmob";

                return (
                  <button
                    key={`${item.type}-${item.data.id}`}
                    onClick={() => selectMedia(item.type, item.data.id)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-200",
                      isSelected
                        ? "border-flame-500 bg-flame-950/60 ring-1 ring-flame-400 text-white shadow-soft"
                        : "border-cobalt-800/80 bg-cobalt-900/40 text-cobalt-200 hover:border-cobalt-600 hover:bg-cobalt-900/80"
                    )}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-cobalt-700 bg-black">
                      <img src={thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white transition group-hover:scale-110">
                        {isSelected ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-flame-500 text-xs">
                            ▶
                          </span>
                        ) : (
                          <span className="text-xs opacity-75 group-hover:opacity-100">▶</span>
                        )}
                      </span>
                      {/* Thẻ thời lượng */}
                      {item.type === "dance" && (
                        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[9px] font-semibold text-white">
                          {item.data.duration}
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 text-[9.5px] font-bold uppercase",
                            item.type === "song"
                              ? "bg-purple-900/80 text-purple-300"
                              : isFlashmob
                              ? "bg-red-900/80 text-red-300"
                              : "bg-blue-900/80 text-blue-300"
                          )}
                        >
                          {item.type === "song" ? "Bài Hát" : isFlashmob ? "Flashmob" : "Dân Vũ"}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-flame-400 animate-pulse">
                            ● Đang xem
                          </span>
                        )}
                      </div>
                      <p className="mt-1 truncate font-display text-xs font-bold text-white group-hover:text-flame-300">
                        {title}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-cobalt-400">{sub}</p>
                    </div>
                  </button>
                );
              })}

              {filteredItems.length === 0 && (
                <div className="py-12 text-center text-xs text-cobalt-400">
                  <p>Không tìm thấy tiết mục nào khớp với từ khóa "{query}"</p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setFilterCat("all");
                    }}
                    className="mt-2 text-flame-400 underline hover:text-flame-300"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== FOOTER MODAL ===== */}
        <footer className="flex shrink-0 items-center justify-between border-t border-cobalt-800 bg-cobalt-900/90 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-cobalt-400">
            <span>© TH VCU Media · BLLSV Thanh Hóa TMU</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10">
              Đóng cửa sổ [ESC]
            </Button>
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}
