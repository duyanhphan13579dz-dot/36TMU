import { lazy, Suspense, useEffect, useState } from "react";
import { DANCES, TRADITIONAL_SONGS } from "@/data/content";
import { Button, Icon } from "@/components/ui";

const DanceVaultModal = lazy(() => import("@/components/DanceVaultModal"));

interface DanceLabProps {
  onToast: (msg: string) => void;
}

export default function DanceLab({ onToast }: DanceLabProps) {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [selectedInitialId, setSelectedInitialId] = useState<string | null>(null);

  // Lắng nghe sự kiện toàn cục để mở kho từ thanh tìm kiếm Ctrl+K hoặc link khác
  useEffect(() => {
    const handleOpenVault = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string }>;
      setSelectedInitialId(customEvent.detail?.id || null);
      setVaultOpen(true);
    };
    window.addEventListener("bllsv_open_dance_vault", handleOpenVault);
    return () => window.removeEventListener("bllsv_open_dance_vault", handleOpenVault);
  }, []);

  const openVaultWithItem = (id?: string) => {
    setSelectedInitialId(id || null);
    setVaultOpen(true);
    if (id) {
      onToast("Đang mở kho video trực tiếp... 🎬");
    }
  };

  // 4 tiết mục tiêu biểu đại diện các thể loại để hiển thị card xem trước
  const featuredCards = [
    {
      id: "flashmob-lof",
      type: "dance" as const,
      title: "Flashmob LOF IS MY LIFE",
      tag: "Flashmob Sôi Động",
      duration: "04:03",
      thumb: "https://i.ytimg.com/vi/j8exV4jUhNY/hqdefault.jpg",
    },
    {
      id: "chung-song",
      type: "dance" as const,
      title: "Dân Vũ 'Chung Sống'",
      tag: "Dân Vũ Truyền Thống",
      duration: "03:30",
      thumb: "https://img.youtube.com/vi/IaVyFKUeWG4/hqdefault.jpg",
    },
    {
      id: "dance-new-fire",
      type: "dance" as const,
      title: "Nhảy 'Team New Fire' - K59",
      tag: "Nhảy Hiện Đại",
      duration: "03:45",
      thumb: "https://i.ytimg.com/vi/DPz3KshqYCI/hqdefault.jpg",
    },
    {
      id: "s2",
      type: "song" as const,
      title: "Ca Khúc 'Đồng Đội'",
      tag: "Văn Nghệ Nhà Chung",
      duration: "03:54",
      thumb: "https://i.ytimg.com/vi/VCyYsOcKPUk/hqdefault.jpg",
    },
  ];

  return (
    <section id="dance" className="relative overflow-hidden bg-gradient-to-b from-sky-paper via-white to-sky-paper py-14 sm:py-16 lg:py-20 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        {/* ===== BLOCK SHOWCASE KHO TƯ LIỆU GỌN GÀNG & ĐẲNG CẤP ===== */}
        <div className="relative overflow-hidden rounded-3xl border border-cobalt-800/80 bg-gradient-to-br from-cobalt-950 via-cobalt-900 to-tmu-950 p-6 text-white shadow-lift sm:p-10 lg:p-12">
          {/* Background decorative glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-flame-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-tmu-500/25 blur-3xl" />

          <div className="relative z-10">
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-flame-400/40 bg-flame-950/70 px-3 py-1 text-[11px] font-bold tracking-wider text-flame-300 uppercase shadow-xs">
                🔥 Kho Tư Liệu Độc Quyền BLLSV TMU
              </span>
              <a
                href="https://www.youtube.com/@THVcuMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-950/70 px-3 py-1 text-[11px] font-bold text-red-300 transition hover:bg-red-900 shadow-xs"
              >
                <span>▶</span> Kênh YouTube @THVcuMedia ↗
              </a>
            </div>

            {/* Title & Desc */}
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div>
                <h2 className="text-balance-vn font-display text-2xl leading-tight font-black sm:text-3xl lg:text-4xl">
                  Kho Vũ Điệu Áo Xanh &amp; <span className="bg-gradient-to-r from-flame-400 to-glow-300 bg-clip-text text-transparent">Giai Điệu 36</span>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cobalt-200 sm:text-base">
                  Tổng hợp toàn bộ <strong>{DANCES.length} bài nhảy dân vũ, flashmob sôi động</strong> và <strong>{TRADITIONAL_SONGS.length} ca khúc truyền thống</strong> của Ban Liên Lạc kết nối từ kênh YouTube <em>TH VCU Media</em>. Tích hợp player phát trực tiếp không chuyển trang, chế độ lật gương tập nhảy và đếm nhịp BPM chuẩn xác!
                </p>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-cobalt-700/60 bg-cobalt-900/60 p-3 text-center backdrop-blur-sm">
                  <p className="font-display text-2xl font-black text-flame-400 sm:text-3xl">{DANCES.length}</p>
                  <p className="text-[11px] font-medium text-cobalt-300">Điệu Nhảy &amp; Flashmob</p>
                </div>
                <div className="rounded-2xl border border-cobalt-700/60 bg-cobalt-900/60 p-3 text-center backdrop-blur-sm">
                  <p className="font-display text-2xl font-black text-glow-300 sm:text-3xl">{TRADITIONAL_SONGS.length}</p>
                  <p className="text-[11px] font-medium text-cobalt-300">Giai Điệu &amp; Bài Ca</p>
                </div>
                <div className="rounded-2xl border border-cobalt-700/60 bg-cobalt-900/60 p-3 text-center backdrop-blur-sm">
                  <p className="font-display text-2xl font-black text-emerald-400 sm:text-3xl">HD</p>
                  <p className="text-[11px] font-medium text-cobalt-300">Xem Trực Tiếp Trên Web</p>
                </div>
                <div className="rounded-2xl border border-cobalt-700/60 bg-cobalt-900/60 p-3 text-center backdrop-blur-sm">
                  <p className="font-display text-2xl font-black text-sky-400 sm:text-3xl">🪞</p>
                  <p className="text-[11px] font-medium text-cobalt-300">Lật Gương &amp; Đếm Nhịp</p>
                </div>
              </div>
            </div>

            {/* ===== 4 CARDS XEM TRƯỚC TIÊU BIỂU ===== */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold tracking-wider text-cobalt-300 uppercase">
                  Tiết Mục Nổi Bật · Nhấp để xem trực tiếp
                </p>
                <button
                  onClick={() => openVaultWithItem()}
                  className="text-xs font-bold text-flame-400 transition hover:text-flame-300 hover:underline"
                >
                  Xem tất cả {DANCES.length + TRADITIONAL_SONGS.length} video →
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {featuredCards.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openVaultWithItem(item.id)}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-cobalt-700/70 bg-cobalt-900/50 p-2.5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-flame-400 hover:shadow-soft active:scale-98"
                  >
                    {/* Thumbnail with play badge */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-cobalt-700/80 bg-black">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-flame-500 text-white shadow-soft transition-transform duration-300 group-hover:scale-110">
                          <Icon.play className="h-4 w-4 fill-white" />
                        </span>
                      </div>
                      <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {item.duration}
                      </span>
                    </div>

                    <div className="mt-2.5 flex-1">
                      <span className="text-[10px] font-bold text-flame-300 uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <p className="truncate font-display text-xs font-bold text-white transition-colors group-hover:text-flame-300">
                        {item.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons CTA */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                variant="flame"
                onClick={() => openVaultWithItem()}
                className="w-full gap-2 text-sm sm:w-auto shadow-soft"
              >
                <span>🎬</span> Mở Kho Tư Liệu Âm Nhạc &amp; Vũ Điệu ({DANCES.length + TRADITIONAL_SONGS.length} Video)
              </Button>

              <a
                href="https://www.youtube.com/@THVcuMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-cobalt-600 bg-cobalt-900/80 px-5 text-xs font-bold text-white transition hover:border-red-500 hover:bg-red-950/60 sm:w-auto"
              >
                <span className="text-red-400">▶</span> Ghé Thăm Kênh YouTube TH VCU Media ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== LANDING PAGE NỔI (MODAL TOÀN MÀN HÌNH CHỨA TẤT CẢ TIẾT MỤC) ===== */}
      {vaultOpen && (
        <Suspense fallback={null}>
          <DanceVaultModal
            open={vaultOpen}
            onClose={() => setVaultOpen(false)}
            initialId={selectedInitialId}
            onToast={onToast}
          />
        </Suspense>
      )}
    </section>
  );
}
