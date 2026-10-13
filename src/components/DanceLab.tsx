import { useEffect, useMemo, useRef, useState } from "react";
import { DANCES, type Dance } from "@/data/content";
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
    if (!playing) {
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
  }, [playing, dance.id, rate]);

  useEffect(() => stopMetro, []);

  const changeDance = (id: string) => {
    setPlaying(false);
    setProgress(0);
    setBeat(0);
    setActiveId(id);
  };

  const toggleMirror = () => {
    setMirror((m) => {
      onToast(m ? "Đã tắt chế độ xem gương" : "Đã bật chế độ xem gương – nhìn như soi gương, dễ tập hơn nè!");
      return !m;
    });
  };

  const downloadMusic = (d: Dance) => {
    try {
      const blob = buildClickTrackWav(d.bpm, 16);
      downloadBlob(blob, `Nhac-dem-nhip-${d.id}-${d.bpm}bpm-BLLSVTH-TMU.wav`);
      onToast(`Đang tải nhạc đếm nhịp ${d.bpm} BPM (${d.music.title}) 🎵`);
    } catch {
      onToast("Trình duyệt chưa hỗ trợ xuất file nhạc, bạn thử lại trên Chrome nhé!");
    }
  };

  const activeStep = playing ? Math.max(0, beat - 1) : -1;

  return (
    <section id="dance" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-cobalt-900 via-cobalt-800 to-cobalt-900" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] bg-dots" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-glow-400/15 px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] text-glow-300 uppercase ring-1 ring-glow-400/30">
            🕺 Đặc sắc nhà chung
          </span>
          <h2 className="mt-4 text-balance-vn font-display text-2xl leading-tight font-extrabold text-white sm:text-3xl lg:text-[2.9rem]">
            Vũ Điệu Áo Xanh – <span className="text-flame-400">Giai Điệu Nhà Chung</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
            Kho bài nhảy Flashmob &amp; dân vũ truyền thống TMU của tụi mình. Chọn bài, bật chế độ xem gương,
            đếm nhịp 1-2-3-4 và tập cùng nhau. Mỗi tối thứ Ba tại sân 79 Hồ Tùng Mậu đều có anh chị đứng dạy lại từ đầu!
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:mt-12 lg:grid-cols-[300px_1fr] lg:gap-7" data-reveal>
          {/* ===== Danh sách bài nhảy ===== */}
          <div>
            <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase lg:mb-4">
              Chọn bài nhảy ({DANCES.length})
            </p>

            {/* Mobile: snap chips */}
            <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 lg:hidden">
              {DANCES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => changeDance(d.id)}
                  className={cn(
                    "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-left text-[12.5px] font-bold transition active:scale-95",
                    d.id === activeId
                      ? "border-flame-400 bg-flame-500 text-white"
                      : "border-white/15 bg-white/10 text-white/80",
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
                      "group flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300",
                      d.id === activeId
                        ? "border-flame-400/60 bg-white/12 shadow-soft"
                        : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10",
                    )}
                  >
                    <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl">
                      <img src={d.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover" />
                      <span className="absolute inset-0 flex items-center justify-center bg-cobalt-950/35 text-white">
                        <Icon.play className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[14px] font-bold text-white">{d.title}</span>
                      <span className="mt-0.5 block text-[11px] text-white/60">
                        {d.style} · {d.bpm} BPM · {d.duration}
                      </span>
                    </span>
                    {d.id === activeId && <span className="h-2 w-2 shrink-0 rounded-full bg-flame-400" />}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 hidden rounded-2xl border border-white/10 bg-white/5 p-4 lg:block">
              <p className="text-[11px] font-bold tracking-[0.16em] text-glow-300 uppercase">Lịch tập tuần này</p>
              <ul className="mt-2 space-y-1.5 text-[12.5px] text-white/75">
                <li className="flex justify-between gap-2"><span>Tối thứ Ba</span><span className="text-white">19:00 – 21:00</span></li>
                <li className="flex justify-between gap-2"><span>Chiều thứ Bảy</span><span className="text-white">15:30 – 17:00</span></li>
                <li className="flex justify-between gap-2"><span>Sân tập</span><span className="text-white">Sân 79 Hồ Tùng Mậu</span></li>
              </ul>
            </div>
          </div>

          {/* ===== Khung video + breakdown ===== */}
          <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr] xl:gap-6">
            {/* Player 16:9 */}
            <div>
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/15 bg-cobalt-950 shadow-lift">
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

                {/* Nhịp hiển thị */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-2xl bg-cobalt-950/60 px-2.5 py-2 backdrop-blur">
                  {[1, 2, 3, 4].map((n) => (
                    <span
                      key={n}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-xl font-display text-sm font-extrabold transition-all duration-150",
                        beat === n ? "animate-beat bg-flame-500 text-white shadow-soft" : "bg-white/10 text-white/60",
                      )}
                    >
                      {n}
                    </span>
                  ))}
                </div>

                {/* Play / Pause */}
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? "Tạm dừng" : "Phát video"}
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
                      <span className="rounded-lg bg-white/15 px-2 py-1 text-[10.5px] font-semibold text-white backdrop-blur">
                        {Math.floor(progress * total / 60)}:{String(Math.floor((progress * total) % 60)).padStart(2, "0")} / {dance.duration}
                      </span>
                      <button
                        onClick={() => setFullscreen(true)}
                        aria-label="Bung video toàn màn hình"
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur transition hover:bg-flame-500 active:scale-95"
                      >
                        <Icon.expand className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hàng nút tính năng */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                <button
                  onClick={toggleMirror}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2 text-[11.5px] font-bold transition-all active:scale-95 sm:flex-row sm:gap-2 sm:text-xs",
                    mirror
                      ? "border-flame-400 bg-flame-500 text-white shadow-soft"
                      : "border-white/15 bg-white/10 text-white hover:bg-white/20",
                  )}
                >
                  <Icon.mirror className="h-5 w-5" />
                  Xem gương {mirror ? "ON" : "OFF"}
                </button>

                <button
                  onClick={() => setRate((r) => (r === 1 ? 0.75 : r === 0.75 ? 1.25 : 1))}
                  className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border border-white/15 bg-white/10 px-2 py-2 text-[11.5px] font-bold text-white transition-all hover:bg-white/20 active:scale-95 sm:flex-row sm:gap-2 sm:text-xs"
                >
                  <span className="text-base leading-none">⏱</span>
                  Tốc độ {rate}x
                </button>

                <button
                  onClick={() => downloadMusic(dance)}
                  className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl border border-glow-400/40 bg-glow-400/15 px-2 py-2 text-[11.5px] font-bold text-glow-300 transition-all hover:bg-glow-400/25 active:scale-95 sm:flex-row sm:gap-2 sm:text-xs"
                >
                  <Icon.download className="h-5 w-5" />
                  Tải nhạc bài nhảy
                </button>

                <Button
                  as="a"
                  href="#contact"
                  variant="flame"
                  className="min-h-12 flex-col gap-1 px-2 py-2 text-[11.5px] sm:flex-row sm:gap-2 sm:text-xs"
                >
                  <Icon.heart className="h-5 w-5" />
                  Xin vào Ban Văn thể mỹ
                </Button>
              </div>

              {/* Thông tin bài nhảy */}
              <div className="mt-4 grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
                <div className="space-y-1.5 text-[12.5px] text-white/75">
                  <p><span className="font-bold text-white">Thể loại:</span> {dance.style}</p>
                  <p><span className="font-bold text-white">Nhịp:</span> {dance.bpm} BPM · Thời lượng {dance.duration}</p>
                  <p><span className="font-bold text-white">Biên đạo:</span> {dance.taughtBy}</p>
                  <p><span className="font-bold text-white">Xuất xứ:</span> {dance.since}</p>
                </div>
                <p className="text-[13px] leading-relaxed text-white/70 italic">“{dance.vibe}”</p>
              </div>
            </div>

            {/* Breakdown 4 bước đếm nhịp */}
            <div className="rounded-3xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base font-extrabold text-white sm:text-lg">Phân tích động tác</h3>
                <span className="rounded-xl bg-flame-500/20 px-2.5 py-1 text-[11px] font-bold text-glow-300 ring-1 ring-glow-400/30">
                  4 nhịp · 1-2-3-4
                </span>
              </div>
              <p className="mt-1.5 text-[12.5px] text-white/60">
                Đếm to từng nhịp theo mình nhé — bấm <strong className="text-white">Phát</strong> để nhịp tự chạy.
              </p>

              <ol className="mt-4 space-y-2.5">
                {dance.steps.map((s, i) => {
                  const isActive = activeStep === i;
                  return (
                    <li
                      key={s.count}
                      className={cn(
                        "rounded-2xl border p-3 transition-all duration-300",
                        isActive
                          ? "border-flame-400 bg-flame-500/20 shadow-soft"
                          : "border-white/10 bg-white/[0.04] hover:border-white/25",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-lg font-extrabold transition-colors",
                            isActive ? "bg-flame-500 text-white" : "bg-white/12 text-white/80",
                          )}
                        >
                          {s.count}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-bold text-white">{s.name}</p>
                          <p className="mt-0.5 text-[12.5px] leading-snug text-white/70">{s.how}</p>
                        </div>
                      </div>
                      <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-cobalt-950/40 px-2.5 py-1.5 text-[11.5px] leading-snug text-glow-300">
                        <span>💡</span>
                        <span>{s.tip}</span>
                      </p>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-4 rounded-2xl border border-white/10 bg-cobalt-950/40 p-3.5">
                <p className="text-[11px] font-bold tracking-[0.16em] text-white/50 uppercase">File nhạc</p>
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  <p className="truncate text-[12.5px] font-semibold text-white">{dance.music.title}</p>
                  <span className="shrink-0 rounded-lg bg-white/10 px-2 py-1 text-[11px] text-white/70">{dance.music.size}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Full-screen video sheet ===== */}
      {fullscreen && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-cobalt-950">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-white sm:text-base">{dance.title}</p>
              <p className="text-[11px] text-white/60">
                {dance.style} · {dance.bpm} BPM · chế độ xem gương {mirror ? "đang bật" : "đang tắt"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={toggleMirror}
                className={cn(
                  "flex h-11 items-center gap-2 rounded-xl px-3 text-xs font-bold transition",
                  mirror ? "bg-flame-500 text-white" : "bg-white/10 text-white hover:bg-white/20",
                )}
              >
                <Icon.mirror className="h-4 w-4" /> Gương
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
            <img
              src={dance.thumbnail}
              alt={dance.title}
              className={cn("h-full w-full object-cover transition-transform duration-700", mirror && "-scale-x-100", playing && "scale-105")}
            />
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Tạm dừng" : "Phát"}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className={cn("flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lift", playing ? "bg-white/15 backdrop-blur" : "bg-flame-500/95")}>
                {playing ? <Icon.pause className="h-8 w-8" /> : <Icon.play className="ml-1 h-9 w-9" />}
              </span>
            </button>
            <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-cobalt-950 to-transparent p-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-gradient-to-r from-glow-400 to-flame-500" style={{ width: `${progress * 100}%` }} />
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl font-display text-sm font-extrabold transition",
                      beat === n ? "bg-flame-500 text-white" : "bg-white/10 text-white/60",
                    )}
                  >
                    {n}
                  </span>
                ))}
                <p className="ml-auto text-[11px] text-white/70">Nhịp đang chạy</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
