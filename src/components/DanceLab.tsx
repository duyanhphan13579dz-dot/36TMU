import { useEffect, useMemo, useRef, useState } from "react";
import { DANCES, TRADITIONAL_SONGS, type Dance } from "@/data/content";
import { Button, Icon, useLockScroll } from "@/components/ui";
import { buildClickTrackWav, downloadBlob, startMetronome, type MetronomeHandle } from "@/lib/audio";
import { cn } from "@/utils/cn";

function toSeconds(d: string) {
  const [m, s] = d.split(":").map(Number);
  return m * 60 + s;
}

export default function DanceLab({ onToast }: { onToast: (msg: string) => void }) {
  const [activeId, setActiveId] = useState(DANCES[0].id);
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mirror, setMirror] = useState(false);
  const [rate, setRate] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"video" | "metronome">("video");
  const [activeSongVideo, setActiveSongVideo] = useState<{ id: string; title: string; youtubeId: string } | null>(null);

  const metro = useRef<MetronomeHandle | null>(null);

  const dance = useMemo(() => DANCES.find((d) => d.id === activeId) ?? DANCES[0], [activeId]);
  const total = toSeconds(dance.duration);

  useLockScroll(fullscreen);

  const stopMetro = () => {
    metro.current?.stop();
    metro.current = null;
  };

  /* Điều khiển metronome + thanh tiến trình giả lập */
  useEffect(() => {
    if (!playing || viewMode !== "metronome") {
      stopMetro();
      return;
    }
    metro.current = startMetronome(dance.bpm * rate, (b) => setBeat(b));
    const started = Date.now() - progress * total * 1000;
    const timer = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - started) / (total * 1000));
      setProgress(p);
      if (p >= 1) {
        setPlaying(false);
        setProgress(0);
        setBeat(0);
      }
    }, 120);
    return () => {
      window.clearInterval(timer);
      stopMetro();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, dance.id, rate, viewMode]);

  useEffect(() => stopMetro, []);

  const changeDance = (id: string) => {
    setPlaying(false);
    setProgress(0);
    setActiveId(id);
    setActiveSongVideo(null); // Trở về video bài nhảy
  };

  const toggleMirror = () => {
    setMirror((m) => {
      const next = !m;
      onToast(next ? "Đã bật chế độ lật gương (Mirror Mode) 🪞" : "Đã tắt chế độ xem gương");
      return next;
    });
  };

  const playSongVideo = (song: (typeof TRADITIONAL_SONGS)[0]) => {
    if (song.youtubeId) {
      setActiveSongVideo({ id: song.id, title: song.title, youtubeId: song.youtubeId });
      setViewMode("video");
      setPlaying(false);
      onToast(`Đang phát video bài hát "${song.title}" 🎶`);
    }
  };

  const downloadMusic = (d: Dance) => {
    try {
      const blob = buildClickTrackWav(d.bpm, 8);
      downloadBlob(blob, `Nhac-dem-nhip-${d.id}-${d.bpm}bpm-BLLSVTH-TMU.wav`);
      onToast(`Đang tải nhạc đếm nhịp ${d.bpm} BPM (${d.music.title}) 🎵`);
    } catch {
      onToast("Trình duyệt chưa hỗ trợ xuất file nhạc, bạn thử lại trên Chrome nhé!");
    }
  };

  const currentYoutubeId = activeSongVideo ? activeSongVideo.youtubeId : dance.youtubeId;
  const currentTitle = activeSongVideo ? activeSongVideo.title : dance.title;

  return (
    <section id="dance" className="relative overflow-hidden bg-gradient-to-b from-sky-paper via-white to-sky-paper py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cobalt-200 bg-white/95 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-cobalt-900 shadow-xs uppercase">
            🕺 Video chính thức &amp; Giai điệu nhà chung
          </span>
          <h2 className="mt-4 text-balance-vn font-display text-2xl leading-tight font-black text-cobalt-950 sm:text-3xl lg:text-[2.9rem]">
            Vũ Điệu Áo Xanh – <span className="text-flame-600">4 Bài Nhảy &amp; 4 Bài Hát</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed font-medium text-cobalt-800 sm:text-base">
            Toàn bộ video hướng dẫn chính thống từ Ban Liên Lạc. Bạn có thể xem video YouTube trực tiếp trên web,
            bật chế độ lật gương để tập theo, hoặc chuyển sang chế độ đếm nhịp 1-2-3-4 để khớp nhịp cùng đội hình!
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:mt-12 lg:grid-cols-[320px_1fr] lg:gap-7" data-reveal>
          {/* ===== Cột trái: 4 Bài Nhảy & 4 Bài Hát ===== */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-bold tracking-[0.18em] text-cobalt-800 uppercase">
                4 Bài nhảy truyền thống ({DANCES.length})
              </p>
            </div>

            {/* Mobile: snap chips */}
            <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 lg:hidden">
              {DANCES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => changeDance(d.id)}
                  className={cn(
                    "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-left text-[12.5px] font-bold transition active:scale-95 shadow-xs",
                    d.id === activeId && !activeSongVideo
                      ? "border-flame-500 bg-flame-500 text-white shadow-soft"
                      : "border-cobalt-200 bg-white text-cobalt-800 hover:border-tmu-300",
                  )}
                >
                  <span>{d.style === "Flashmob" ? "🔥" : "💃"}</span>
                  {d.title}
                </button>
              ))}
            </div>

            {/* Desktop: danh sách dọc */}
            <ul className="hidden space-y-2 lg:block">
              {DANCES.map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => changeDance(d.id)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300 shadow-xs",
                      d.id === activeId && !activeSongVideo
                        ? "border-flame-500 bg-flame-50/90 ring-2 ring-flame-400 text-cobalt-950 shadow-soft"
                        : "border-cobalt-100 bg-white hover:border-tmu-300 hover:bg-cobalt-50/50 text-cobalt-900",
                    )}
                  >
                    <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-cobalt-200">
                      <img src={d.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center bg-cobalt-950/30 text-white">
                        <Icon.play className="h-4 w-4" />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold text-cobalt-950 group-hover:text-flame-600">
                        {d.title}
                      </p>
                      <span className="mt-0.5 block text-[11px] font-medium text-cobalt-600">
                        {d.style} · {d.bpm} BPM · {d.duration}
                      </span>
                    </span>
                    {d.id === activeId && !activeSongVideo && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-flame-500" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* 4 Bài hát truyền thống */}
            <div className="mt-4 rounded-2xl border border-cobalt-100 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold tracking-[0.16em] text-flame-700 uppercase">
                4 Bài hát truyền thống
              </p>
              <ul className="mt-2.5 space-y-2 text-[12.5px]">
                {TRADITIONAL_SONGS.map((song) => (
                  <li
                    key={song.id}
                    className={cn(
                      "rounded-xl border p-2.5 transition",
                      activeSongVideo?.id === song.id
                        ? "border-flame-400 bg-flame-50 text-cobalt-950"
                        : "border-cobalt-100 bg-cobalt-50/60 text-cobalt-900 hover:bg-cobalt-50",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-cobalt-950">🎵 {song.title}</p>
                        <p className="mt-0.5 text-[11px] text-cobalt-700 leading-tight">{song.note}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      {song.type === "youtube" ? (
                        <button
                          onClick={() => playSongVideo(song)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold transition",
                            activeSongVideo?.id === song.id
                              ? "bg-flame-500 text-white"
                              : "bg-red-600 text-white hover:bg-red-700",
                          )}
                        >
                          <Icon.play className="h-3 w-3" />
                          Xem Video
                        </button>
                      ) : (
                        <a
                          href={song.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-emerald-700"
                        >
                          <span>🎧</span>
                          Nghe MP3
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 hidden rounded-2xl border border-cobalt-100 bg-white p-4 shadow-sm lg:block">
              <p className="text-[11px] font-bold tracking-[0.16em] text-cobalt-800 uppercase">Lịch tập tuần này</p>
              <ul className="mt-2 space-y-1.5 text-[12.5px] text-cobalt-700">
                <li className="flex justify-between gap-2"><span>Tối thứ Ba</span><span className="font-bold text-cobalt-950">19:00 – 21:00</span></li>
                <li className="flex justify-between gap-2"><span>Chiều thứ Bảy</span><span className="font-bold text-cobalt-950">15:30 – 17:00</span></li>
                <li className="flex justify-between gap-2"><span>Sân tập</span><span className="font-bold text-cobalt-950">Sân 79 Hồ Tùng Mậu</span></li>
              </ul>
            </div>
          </div>

          {/* ===== Khung Video Player & Bộ Điều Khiển ===== */}
          <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr] xl:gap-6">
            <div>
              {/* Tab chuyển đổi chế độ xem */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 rounded-2xl border border-cobalt-200 bg-white p-1 shadow-xs">
                  <button
                    onClick={() => {
                      setViewMode("video");
                      setPlaying(false);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition",
                      viewMode === "video" ? "bg-cobalt-900 text-white shadow-xs" : "text-cobalt-700 hover:text-cobalt-950",
                    )}
                  >
                    🎬 Xem Video
                  </button>
                  {!activeSongVideo && (
                    <button
                      onClick={() => setViewMode("metronome")}
                      className={cn(
                        "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition",
                        viewMode === "metronome" ? "bg-cobalt-900 text-white shadow-xs" : "text-cobalt-700 hover:text-cobalt-950",
                      )}
                    >
                      🥁 Đếm nhịp (Metronome)
                    </button>
                  )}
                </div>

                <a
                  href={activeSongVideo ? `https://www.youtube.com/watch?v=${activeSongVideo.youtubeId}` : dance.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 shadow-xs transition hover:bg-red-50"
                >
                  <span>▶</span> Mở YouTube
                </a>
              </div>

              {/* KHUNG VIDEO 16:9 */}
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-2 border-cobalt-200 bg-cobalt-950 shadow-lift">
                {viewMode === "video" ? (
                  /* YouTube Embed Player thực tế */
                  <iframe
                    key={`${currentYoutubeId}-${mirror}`}
                    src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}?rel=0&autoplay=0&enablejsapi=1`}
                    title={`Video hướng dẫn ${currentTitle}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className={cn(
                      "h-full w-full border-0 transition-transform duration-500",
                      mirror && "-scale-x-100",
                    )}
                  />
                ) : (
                  /* Metronome mode */
                  <>
                    <img
                      src={dance.thumbnail}
                      alt={`Video hướng dẫn bài nhảy ${dance.title}`}
                      loading="lazy"
                      className={cn(
                        "h-full w-full object-cover transition-all duration-700",
                        mirror && "-scale-x-100",
                        playing ? "scale-105 opacity-90" : "opacity-80",
                      )}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cobalt-950/90 via-transparent to-cobalt-950/40" />

                    {/* Nhịp hiển thị 1-2-3-4 */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-2xl bg-cobalt-950/70 px-2.5 py-2 backdrop-blur">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-xl font-display text-sm font-extrabold transition-all duration-150",
                            beat === n ? "animate-beat bg-flame-500 text-white shadow-soft" : "bg-white/15 text-white/70",
                          )}
                        >
                          {n}
                        </span>
                      ))}
                    </div>

                    {/* Play / Pause button */}
                    <button
                      onClick={() => setPlaying((p) => !p)}
                      aria-label={playing ? "Tạm dừng" : "Phát đếm nhịp"}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lift transition-all duration-300 sm:h-20 sm:w-20",
                          playing ? "bg-white/15 backdrop-blur" : "bg-flame-500/95",
                        )}
                      >
                        {playing ? <Icon.pause className="h-7 w-7" /> : <Icon.play className="ml-1 h-8 w-8" />}
                      </span>
                    </button>

                    {/* Điều khiển dưới */}
                    <div className="absolute inset-x-0 bottom-0 space-y-2 p-3 sm:p-4">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-glow-400 to-flame-500 transition-[width] duration-150"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-display text-[13px] font-bold text-white sm:text-sm">{dance.title}</p>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <span className="rounded-lg bg-white/20 px-2 py-1 text-[10.5px] font-semibold text-white backdrop-blur">
                            {Math.floor(progress * total / 60)}:{String(Math.floor((progress * total) % 60)).padStart(2, "0")} / {dance.duration}
                          </span>
                          <button
                            onClick={() => setFullscreen(true)}
                            aria-label="Bung toàn màn hình"
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur transition hover:bg-flame-500 active:scale-95"
                          >
                            <Icon.expand className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Hàng nút tính năng */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                <button
                  onClick={toggleMirror}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2 text-[11.5px] font-bold transition-all active:scale-95 sm:flex-row sm:gap-2 sm:text-xs shadow-xs",
                    mirror
                      ? "border-flame-500 bg-flame-500 text-white shadow-soft"
                      : "border-cobalt-200 bg-white text-cobalt-800 hover:bg-cobalt-50",
                  )}
                >
                  <Icon.mirror className="h-5 w-5" />
                  Xem gương {mirror ? "BẬT" : "TẮT"}
                </button>

                <button
                  onClick={() => setRate((r) => (r === 1 ? 0.75 : r === 0.75 ? 1.25 : 1))}
                  className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border border-cobalt-200 bg-white px-2 py-2 text-[11.5px] font-bold text-cobalt-800 shadow-xs transition-all hover:bg-cobalt-50 active:scale-95 sm:flex-row sm:gap-2 sm:text-xs"
                >
                  <span className="text-base leading-none">⏱</span>
                  Nhịp {rate}x
                </button>

                <button
                  onClick={() => downloadMusic(dance)}
                  className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border border-amber-300 bg-amber-50 px-2 py-2 text-[11.5px] font-bold text-amber-900 shadow-xs transition-all hover:bg-amber-100 active:scale-95 sm:flex-row sm:gap-2 sm:text-xs"
                >
                  <Icon.download className="h-5 w-5" />
                  Tải nhạc bài
                </button>

                <Button
                  as="a"
                  href="#contact"
                  variant="flame"
                  className="min-h-12 flex-col gap-1 px-2 py-2 text-[11.5px] sm:flex-row sm:gap-2 sm:text-xs shadow-xs"
                >
                  <Icon.heart className="h-5 w-5" />
                  Gia nhập Ban Văn hóa
                </Button>
              </div>

              {/* Thông tin bài nhảy đang chọn */}
              <div className="mt-4 grid gap-3 rounded-3xl border border-cobalt-100 bg-white p-4 sm:grid-cols-2 shadow-sm">
                <div className="space-y-1.5 text-[12.5px] text-cobalt-700">
                  <p><span className="font-bold text-cobalt-950">Tác phẩm:</span> {currentTitle}</p>
                  <p><span className="font-bold text-cobalt-950">Thể loại:</span> {activeSongVideo ? "Bài hát truyền thống" : dance.style}</p>
                  <p><span className="font-bold text-cobalt-950">Đơn vị:</span> {dance.taughtBy}</p>
                  <p><span className="font-bold text-cobalt-950">Nguồn:</span> Kênh chính thức BLLSV Thanh Hóa TMU</p>
                </div>
                <p className="text-[13px] leading-relaxed text-cobalt-800 font-medium italic">
                  “{activeSongVideo ? "Khúc ca tự hào của những người con xứ Thanh tại giảng đường Thương Mại." : dance.vibe}”
                </p>
              </div>
            </div>

            {/* Cột phải: Breakdown các bước đếm nhịp */}
            <div>
              <div className="rounded-3xl border border-cobalt-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-cobalt-800 uppercase">
                    Hướng dẫn động tác ({dance.steps.length} nhịp chính)
                  </p>
                  <span className="rounded-full bg-tmu-50 px-2.5 py-0.5 text-[10.5px] font-bold text-tmu-700">
                    Bản chuẩn Ban Văn hóa
                  </span>
                </div>

                <ol className="mt-4 space-y-3">
                  {dance.steps.map((s, i) => (
                    <li
                      key={s.count}
                      className={cn(
                        "rounded-2xl border p-3.5 transition-all duration-200",
                        playing && beat === i + 1
                          ? "border-flame-400 bg-flame-50 shadow-soft ring-1 ring-flame-300"
                          : "border-cobalt-100 bg-cobalt-50/50 hover:border-cobalt-200 hover:bg-white",
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-cobalt-950">
                          Nhịp {s.count}: {s.name}
                        </span>
                        {playing && beat === i + 1 && (
                          <span className="animate-pulse text-[11px] font-bold text-flame-600">Đang chạy</span>
                        )}
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-cobalt-800">{s.how}</p>
                      <p className="mt-2 flex items-start gap-1.5 rounded-xl border border-amber-200 bg-amber-50 p-2 text-[11.5px] text-amber-900">
                        <span>💡</span>
                        <span>{s.tip}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Fullscreen Modal khi cần phóng to Metronome ===== */}
      {fullscreen && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-cobalt-950 p-4 sm:p-6">
          <div className="flex items-center justify-between pb-4">
            <p className="font-display text-lg font-bold text-white">{dance.title}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMirror}
                className={cn("rounded-xl border px-3 py-1.5 text-xs font-bold text-white", mirror ? "bg-flame-500 border-flame-400" : "bg-white/10 border-white/20")}
              >
                Gương {mirror ? "BẬT" : "TẮT"}
              </button>
              <button
                onClick={() => setFullscreen(false)}
                aria-label="Thoát toàn màn hình"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-flame-500 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}?rel=0&autoplay=1`}
              title={currentTitle}
              allowFullScreen
              className={cn("h-full w-full border-0", mirror && "-scale-x-100")}
            />
          </div>
        </div>
      )}
    </section>
  );
}
