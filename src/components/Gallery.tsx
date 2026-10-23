import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { CONFESSIONS, MEMORIES, type Confession } from "@/data/content";
import { Button, Icon } from "@/components/ui";
import { getAllLeaders } from "@/data/adminStore";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

const MemoriesVaultModal = lazy(() => import("@/components/MemoriesVaultModal"));

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

interface GalleryProps {
  onToast: (msg: string) => void;
}

export default function Gallery({ onToast }: GalleryProps) {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [vaultTab, setVaultTab] = useState<"memories" | "leaders" | "confessions">("memories");
  const [vaultMemoryIndex, setVaultMemoryIndex] = useState<number | null>(null);
  const [vaultLeaderSearch, setVaultLeaderSearch] = useState<string>("");
  const [leadersDataVersion, setLeadersDataVersion] = useState(0);

  // Lắng nghe cập nhật BCH
  useEffect(() => {
    const handleUpdate = () => setLeadersDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  // Lắng nghe sự kiện mở kho từ QuickSearch hoặc các nút điều hướng
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const ce = e as CustomEvent<{
        tab?: "memories" | "leaders" | "confessions";
        memoryIndex?: number;
        index?: number;
        leaderSearch?: string;
      }>;
      if (ce.detail?.tab) setVaultTab(ce.detail.tab);
      if (typeof ce.detail?.memoryIndex === "number") setVaultMemoryIndex(ce.detail.memoryIndex);
      if (typeof ce.detail?.index === "number") {
        setVaultTab("memories");
        setVaultMemoryIndex(ce.detail.index);
      }
      if (ce.detail?.leaderSearch) setVaultLeaderSearch(ce.detail.leaderSearch);
      setVaultOpen(true);
    };
    window.addEventListener("bllsv_open_memories_vault", handleOpen);
    window.addEventListener("bllsv_open_memory_lightbox", handleOpen);
    return () => {
      window.removeEventListener("bllsv_open_memories_vault", handleOpen);
      window.removeEventListener("bllsv_open_memory_lightbox", handleOpen);
    };
  }, []);

  const allLeaders = useMemo(() => getAllLeaders(), [leadersDataVersion]);
  const notes = useMemo(() => getStoredConfessions(), []);

  // 4 khung hình tiêu biểu đại diện cho các chiến dịch
  const spotlightMemories = useMemo(() => {
    return MEMORIES.slice(0, 4);
  }, []);

  const openVault = (tab: "memories" | "leaders" | "confessions", memoryIndex?: number) => {
    setVaultTab(tab);
    if (typeof memoryIndex === "number") {
      setVaultMemoryIndex(memoryIndex);
    } else {
      setVaultMemoryIndex(null);
    }
    setVaultLeaderSearch("");
    setVaultOpen(true);
    if (tab === "memories") onToast("Đang mở Kho Ảnh & Khoảnh Khắc... 📸");
    else if (tab === "leaders") onToast("Đang mở Thế Hệ Giữ Lửa Ban Chấp Hành... ⭐");
    else onToast("Đang mở Hòm Thư Confessions... 💌");
  };

  return (
    <section id="memories" className="relative overflow-hidden py-14 sm:py-18 lg:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white" />
      <div className="pointer-events-none absolute top-1/4 -right-24 -z-10 h-72 w-72 rounded-full bg-tmu-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -left-24 -z-10 h-80 w-80 rounded-full bg-flame-200/30 blur-3xl" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        {/* ===== BLOCK SHOWCASE KHO KỶ NIỆM & TÂM SỰ 36 GỌN GÀNG & ĐẲNG CẤP ===== */}
        <div className="relative overflow-hidden rounded-3xl border border-cobalt-800/80 bg-gradient-to-br from-cobalt-950 via-cobalt-900 to-tmu-950 p-6 text-white shadow-lift sm:p-10 lg:p-12">
          {/* Background decorative glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-tmu-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-flame-500/20 blur-3xl" />

          <div className="relative z-10">
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-tmu-400/40 bg-tmu-950/70 px-3 py-1 text-[11px] font-bold tracking-wider text-tmu-300 uppercase shadow-xs">
                🏛️ Kho Kỷ Niệm &amp; Tâm Sự 36
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur shadow-xs">
                16 Khóa BCH ({allLeaders.length} anh chị) • {MEMORIES.length} Khoảnh Khắc • {notes.length} Confessions
              </span>
            </div>

            {/* Title & Desc */}
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div>
                <h2 className="text-balance-vn font-display text-2xl leading-tight font-black sm:text-3xl lg:text-4xl text-white">
                  Những khung hình làm nên{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-tmu-400 to-sky-300">
                    “nhà chung”
                  </span>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-cobalt-200 sm:text-base">
                  Mỗi mùa đi tình nguyện, mỗi đêm lửa trại, lời chúc của 16 thế hệ Ban Chấp Hành và từng mẩu giấy confession
                  đong đầy yêu thương của con em xứ Thanh tại ĐH Thương Mại.
                </p>
              </div>

              {/* Thống kê nhanh kho (Vault Metrics Strip) */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-tmu-300">{MEMORIES.length}+</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Khung hình gốc</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-flame-400">16 Khóa</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Thế hệ giữ lửa</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-amber-300">{notes.length}+</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Lời nhắn dán tường</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-white">100%</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Tình xứ Thanh</div>
                </div>
              </div>
            </div>

            {/* Showcase 4 khung hình tiêu biểu: Vuốt mượt trên mobile / Grid 4 cột trên desktop */}
            <div className="mt-8">
              <div className="flex items-center justify-between pb-3">
                <p className="text-xs font-bold tracking-wider text-cobalt-300 uppercase">
                  📸 Khoảnh khắc tiêu biểu được chọn lọc
                </p>
                <button
                  type="button"
                  onClick={() => openVault("memories")}
                  className="hidden text-xs font-bold text-tmu-400 hover:text-tmu-300 sm:inline-flex items-center gap-1 transition"
                >
                  Mở toàn bộ kho ảnh ({MEMORIES.length}) <span>➔</span>
                </button>
              </div>

              <div className="scrollbar-none -mx-2 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-2 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
                {spotlightMemories.map((m, idx) => (
                  <div
                    key={m.id}
                    onClick={() => openVault("memories", idx)}
                    className="group relative flex min-w-[78%] sm:min-w-0 shrink-0 snap-center cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tmu-400/50 hover:bg-white/15"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cobalt-950">
                      <ShimmerImage
                        src={m.src}
                        alt={m.title}
                        containerClassName="h-full w-full"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                        {m.tag}
                      </span>
                      <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon.expand className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    <div className="mt-3 flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="line-clamp-1 text-sm font-bold text-white group-hover:text-tmu-300 transition-colors">
                          {m.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-cobalt-300">
                          {m.caption}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] font-bold text-tmu-300">
                        <span>Phóng to &amp; Xem thêm</span>
                        <span className="transition-transform group-hover:translate-x-1">➔</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="sm:hidden text-center text-[11px] text-cobalt-400 mt-2">
                👆 Vuốt ngang để xem thêm khung hình
              </p>
            </div>

            {/* ===== CTA CHÍNH ĐỂ MỞ KHO KỶ NIỆM ===== */}
            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/15 bg-gradient-to-r from-tmu-500/20 via-white/5 to-flame-500/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-tmu-500 to-cobalt-600 text-2xl shadow-soft">
                  🏛️
                </span>
                <div>
                  <h4 className="text-base font-bold text-white sm:text-lg">
                    Khám phá Kho Kỷ Niệm &amp; Tâm Sự 36
                  </h4>
                  <p className="text-xs text-cobalt-300 sm:text-[13px]">
                    Toàn bộ kho ảnh tình nguyện, danh sách 16 thế hệ BCH (K44-K60) và hòm thư Confessions tương tác.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 sm:flex-initial shadow-soft bg-tmu-500 hover:bg-tmu-600 text-white border-none"
                  onClick={() => openVault("memories")}
                >
                  <Icon.camera className="h-4 w-4" />
                  Kho Ảnh Kỷ Niệm
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => openVault("leaders")}
                >
                  ⭐ 16 Khóa BCH
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => openVault("confessions")}
                >
                  💌 Confessions ({notes.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL KHO KỶ NIỆM TOÀN MÀN HÌNH (MEMORIES VAULT MODAL) ===== */}
      <Suspense fallback={null}>
        <MemoriesVaultModal
          open={vaultOpen}
          onClose={() => {
            setVaultOpen(false);
            setVaultMemoryIndex(null);
            setVaultLeaderSearch("");
          }}
          initialTab={vaultTab}
          initialMemoryIndex={vaultMemoryIndex}
          initialLeaderSearch={vaultLeaderSearch}
          onToast={onToast}
        />
      </Suspense>
    </section>
  );
}
