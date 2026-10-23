import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { type Program } from "@/data/content";
import { Button, Icon, Kicker } from "@/components/ui";
import { getAllPrograms, getStoredAdminPosts } from "@/data/adminStore";
import { cn } from "@/utils/cn";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

const EventsVaultModal = lazy(() => import("@/components/EventsVaultModal"));

const STATUS_STYLE: Record<string, string> = {
  "Mới đăng": "bg-red-600 text-white animate-pulse",
  "Đang mở đăng ký": "bg-flame-500 text-white",
  "Sắp diễn ra": "bg-tmu-500 text-white",
  "Đã kết thúc": "bg-cobalt-200 text-cobalt-700",
};

interface EventsProps {
  onToast: (msg: string) => void;
}

export default function Events({ onToast }: EventsProps) {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [selectedInitialId, setSelectedInitialId] = useState<string | null>(null);
  const [initialTab, setInitialTab] = useState<"programs" | "timeline">("programs");
  const [dataVersion, setDataVersion] = useState(0);

  // Lắng nghe sự kiện cập nhật dữ liệu nền
  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  // Lắng nghe sự kiện mở kho từ QuickSearch (Ctrl+K) hoặc các nút điều hướng khác
  useEffect(() => {
    const handleOpenVault = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string; tab?: "programs" | "timeline" }>;
      setSelectedInitialId(customEvent.detail?.id || null);
      if (customEvent.detail?.tab) {
        setInitialTab(customEvent.detail.tab);
      } else {
        setInitialTab("programs");
      }
      setVaultOpen(true);
    };
    window.addEventListener("bllsv_open_events_vault", handleOpenVault);
    return () => window.removeEventListener("bllsv_open_events_vault", handleOpenVault);
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

  // Chọn 4 chương trình tiêu biểu (spotlight) để hiển thị tại Showcase Hub
  const spotlightPrograms = useMemo(() => {
    return allPrograms.slice(0, 4);
  }, [allPrograms]);

  const openVaultWithProgram = (id?: string) => {
    setSelectedInitialId(id || null);
    setInitialTab("programs");
    setVaultOpen(true);
    if (id) {
      onToast("Đang mở chi tiết chiến dịch trong Kho... 🚀");
    }
  };

  const openTimelineVault = () => {
    setSelectedInitialId(null);
    setInitialTab("timeline");
    setVaultOpen(true);
    onToast("Đang mở Chuỗi hoạt động 12 tháng thường niên... 📅");
  };

  return (
    <section id="events" className="relative overflow-hidden py-14 sm:py-18 lg:py-24 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white" />
      <div className="pointer-events-none absolute top-1/4 -left-24 -z-10 h-72 w-72 rounded-full bg-flame-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-24 -z-10 h-80 w-80 rounded-full bg-tmu-200/30 blur-3xl" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        {/* ===== BLOCK SHOWCASE KHO HÀNH TRÌNH & SỰ KIỆN GỌN GÀNG & ĐẲNG CẤP ===== */}
        <div className="relative overflow-hidden rounded-3xl border border-cobalt-800/80 bg-gradient-to-br from-cobalt-950 via-cobalt-900 to-tmu-950 p-6 text-white shadow-lift sm:p-10 lg:p-12">
          {/* Background decorative glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-flame-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-tmu-500/25 blur-3xl" />

          <div className="relative z-10">
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-flame-400/40 bg-flame-950/70 px-3 py-1 text-[11px] font-bold tracking-wider text-flame-300 uppercase shadow-xs">
                🏛️ Kho Hành Trình & Sự Kiện 36
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur shadow-xs">
                Tổng cộng {allPrograms.length} Chiến Dịch & Sự Kiện
              </span>
            </div>

            {/* Title & Desc */}
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div>
                <h2 className="text-balance-vn font-display text-2xl leading-tight font-black sm:text-3xl lg:text-4xl text-white">
                  Chuyến xe nào của nhà chung{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-flame-400 to-flame-300">
                    sắp lăn bánh?
                  </span>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-cobalt-200 sm:text-base">
                  Từ Chiến dịch Tình nguyện Mùa Hè Xanh, Đông Ấm Xứ Thanh đến Hội trại Âm Vang &amp; Xứ Thanh TMU Cup.
                  Mở kho dữ liệu để tìm kiếm, xem lịch trình theo giờ và tải trọn bộ ảnh Google Drive.
                </p>
              </div>

              {/* Thống kê nhanh kho (Vault Metrics Strip) */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-flame-400">12+</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Hoạt động / năm</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-white">5,000+</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Lượt SV kết nối</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-tmu-400">15+ Năm</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Lửa tình nguyện</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-white">100%</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Ảnh Drive gốc</div>
                </div>
              </div>
            </div>

            {/* Showcase 4 thẻ tiêu biểu: vuốt ngang mượt mà trên mobile, grid 2-4 cột trên desktop */}
            <div className="mt-8">
              <div className="flex items-center justify-between pb-3">
                <p className="text-xs font-bold tracking-wider text-cobalt-300 uppercase">
                  ⭐ Tiêu biểu đang diễn ra &amp; gần nhất
                </p>
                <button
                  type="button"
                  onClick={() => openVaultWithProgram()}
                  className="hidden text-xs font-bold text-flame-400 hover:text-flame-300 sm:inline-flex items-center gap-1 transition"
                >
                  Xem toàn bộ kho ({allPrograms.length}) <span>➔</span>
                </button>
              </div>

              <div className="scrollbar-none -mx-2 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-2 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
                {spotlightPrograms.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => openVaultWithProgram(p.id)}
                    className="group relative flex min-w-[78%] sm:min-w-0 shrink-0 snap-center cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-3 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-flame-400/50 hover:bg-white/15"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cobalt-950">
                      <ShimmerImage
                        src={p.cover}
                        alt={p.title}
                        containerClassName="h-full w-full"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold shadow-xs",
                            STATUS_STYLE[p.status] || "bg-cobalt-800 text-white",
                          )}
                        >
                          {p.status}
                        </span>
                        {p.year && (
                          <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-black text-white backdrop-blur">
                            {p.year}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                        <Icon.calendar className="h-3 w-3 text-flame-400" />
                        <span>{p.dateLabel}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-1 flex-col justify-between">
                      <div>
                        <span className="text-[10.5px] font-bold text-flame-400">
                          {p.category}
                        </span>
                        <h3 className="line-clamp-2 text-sm font-bold text-white group-hover:text-flame-300 transition-colors">
                          {p.title}
                        </h3>
                        <p className="mt-1 line-clamp-1 text-[11.5px] text-cobalt-300">
                          📍 {p.location}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] font-bold text-flame-300">
                        <span>Chi tiết &amp; Lịch trình</span>
                        <span className="transition-transform group-hover:translate-x-1">➔</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="sm:hidden text-center text-[11px] text-cobalt-400 mt-2">
                👆 Vuốt ngang để xem thêm chiến dịch
              </p>
            </div>

            {/* ===== CTA CHÍNH ĐỂ MỞ KHO SỰ KIỆN ===== */}
            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/15 bg-gradient-to-r from-flame-500/20 via-white/5 to-tmu-500/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-flame-500 to-flame-600 text-2xl shadow-soft">
                  🚀
                </span>
                <div>
                  <h4 className="text-base font-bold text-white sm:text-lg">
                    Khám phá Kho Hành Trình &amp; Sự Kiện 36
                  </h4>
                  <p className="text-xs text-cobalt-300 sm:text-[13px]">
                    Toàn bộ lịch trình chi tiết, bộ lọc theo năm (2024-2026), kho ảnh Google Drive và vòng quay 12 tháng.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 shrink-0">
                <Button
                  variant="flame"
                  size="md"
                  className="flex-1 sm:flex-initial shadow-soft"
                  onClick={() => openVaultWithProgram()}
                >
                  🚀 Mở Kho Sự Kiện
                  <Icon.arrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={openTimelineVault}
                >
                  📅 Vòng quay 12 tháng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== KHO SỰ KIỆN TOÀN MÀN HÌNH (EVENTS VAULT MODAL) ===== */}
      <Suspense fallback={null}>
        <EventsVaultModal
          open={vaultOpen}
          onClose={() => {
            setVaultOpen(false);
            setSelectedInitialId(null);
          }}
          initialId={selectedInitialId}
          initialTab={initialTab}
          onToast={onToast}
        />
      </Suspense>
    </section>
  );
}

export function EventKicker() {
  return <Kicker>Chương trình</Kicker>;
}
