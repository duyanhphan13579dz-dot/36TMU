import { useEffect, useMemo, useState } from "react";
import { EVENT_FILTERS, YEARLY_TIMELINE, type Program } from "@/data/content";
import { Button, Icon, useLockScroll, useEscape } from "@/components/ui";
import { getAllPrograms, getStoredAdminPosts } from "@/data/adminStore";
import { cn } from "@/utils/cn";
import { LightboxModal, type LightboxItem } from "@/components/LightboxModal";

const STATUS_STYLE: Record<string, string> = {
  "Mới đăng": "bg-red-600 text-white animate-pulse",
  "Đang mở đăng ký": "bg-flame-500 text-white shadow-soft",
  "Sắp diễn ra": "bg-tmu-500 text-white",
  "Đã kết thúc": "bg-cobalt-200 text-cobalt-800",
};

const YEARS = ["Tất cả", "2026", "2025", "2024"] as const;

interface EventsVaultModalProps {
  open: boolean;
  onClose: () => void;
  initialId?: string | null;
  initialTab?: "programs" | "timeline";
  onToast: (msg: string) => void;
}

export default function EventsVaultModal({
  open,
  onClose,
  initialId,
  initialTab,
  onToast,
}: EventsVaultModalProps) {
  const [activeTab, setActiveTab] = useState<"programs" | "timeline">("programs");
  const [filter, setFilter] = useState<string>("Tất cả");
  const [yearFilter, setYearFilter] = useState<string>("Tất cả");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useLockScroll(open);
  useEscape(open, () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(null);
    } else if (mobileView === "detail") {
      setMobileView("list");
    } else {
      onClose();
    }
  });

  // Nạp dữ liệu đồng bộ từ Database & Local Storage
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

  // Thiết lập chương trình & tab khởi tạo khi mở modal
  useEffect(() => {
    if (open) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      if (initialId) {
        setSelectedId(initialId);
        setMobileView("detail");
      } else if (!selectedId && allPrograms.length > 0) {
        setSelectedId(allPrograms[0].id);
      }
    }
  }, [open, initialId, initialTab, allPrograms]);

  const matchCategory = (cat: string, f: string) => {
    if (f === "Tất cả") return true;
    if (cat === f) return true;
    if (f === "Tình nguyện" && (cat.includes("Tình nguyện") || cat.includes("Hè Xanh") || cat.includes("Đông Ấm"))) return true;
    if (f === "Thể thao" && (cat.includes("Thể thao") || cat.includes("Bóng đá") || cat.includes("Cup"))) return true;
    if (f === "Văn hóa" && (cat.includes("Văn nghệ") || cat.includes("Văn hóa") || cat.includes("Hát") || cat.includes("Nhảy"))) return true;
    if (f === "Kỷ niệm" && (cat.includes("Kỷ niệm") || cat.includes("Sinh nhật") || cat.includes("Hội trại"))) return true;
    return false;
  };

  const filteredPrograms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allPrograms.filter((p) => {
      const matchCat = matchCategory(p.category, filter);
      const matchY = yearFilter === "Tất cả" || (p.year && p.year.toString() === yearFilter);
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchY && matchQ;
    });
  }, [allPrograms, filter, yearFilter, searchQuery]);

  const selectedProgram = useMemo(() => {
    return allPrograms.find((p) => p.id === selectedId) || allPrograms[0] || null;
  }, [allPrograms, selectedId]);

  // Gallery items for lightbox
  const lightboxItems: LightboxItem[] = useMemo(() => {
    if (!selectedProgram) return [];
    return selectedProgram.gallery.map((src, idx) => ({
      id: `${selectedProgram.id}-${idx}`,
      src,
      title: `${selectedProgram.title} (Ảnh ${idx + 1}/${selectedProgram.gallery.length})`,
      tag: selectedProgram.category,
      caption: selectedProgram.excerpt,
    }));
  }, [selectedProgram]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140] flex flex-col bg-cobalt-950/85 backdrop-blur-xl animate-fade-in text-cobalt-900">
      {/* ================= HEADER KHO ================= */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-cobalt-950/90 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-flame-500 to-flame-600 text-lg text-white shadow-soft">
            🚩
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm sm:text-base font-black tracking-wide text-white uppercase">
                Kho Hành Trình &amp; Sự Kiện 36
              </span>
              <span className="hidden sm:inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] font-bold text-glow-300">
                {allPrograms.length} Chiến Dịch
              </span>
            </div>
            <p className="text-[11px] text-cobalt-300 hidden xs:block">
              Tổng hợp toàn bộ tư liệu, lịch trình chi tiết và kho ảnh các mùa chiến dịch
            </p>
          </div>
        </div>

        {/* Chuyển đổi tab & Nút đóng */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-2xl bg-white/10 p-1 border border-white/10">
            <button
              onClick={() => setActiveTab("programs")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                activeTab === "programs" ? "bg-flame-500 text-white shadow-sm" : "text-white/80 hover:text-white"
              )}
            >
              Chương trình ({allPrograms.length})
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                activeTab === "timeline" ? "bg-flame-500 text-white shadow-sm" : "text-white/80 hover:text-white"
              )}
            >
              Vòng quay 12 tháng
            </button>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng kho"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      {/* ================= NỘI DUNG KHO ================= */}
      {activeTab === "timeline" ? (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto w-full">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="rounded-full bg-flame-500/20 text-flame-300 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                📅 Lộ trình thường niên
              </span>
              <h2 className="mt-2 font-display text-2xl font-black text-white sm:text-3xl">
                Chuỗi Hoạt Động 12 Tháng Trong Năm
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("programs")}
              className="text-white border-white/20 hover:bg-white/10"
            >
              ← Xem kho chương trình
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {YEARLY_TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur transition-all duration-300 hover:border-flame-400 hover:bg-white/10 hover:shadow-soft"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-lg font-black text-flame-400">{item.month}</span>
                    <span className="rounded-full bg-tmu-500/20 px-2.5 py-0.5 text-[11px] font-bold text-tmu-300">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white transition-colors group-hover:text-glow-300">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-cobalt-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ================= SPLIT VIEW: DANH SÁCH + CHI TIẾT ================= */
        <div className="flex flex-1 min-h-0">
          {/* CỘT DANH SÁCH (TRÁI) */}
          <div
            className={cn(
              "flex flex-col border-r border-white/10 bg-cobalt-950/70 w-full md:w-[380px] lg:w-[420px] shrink-0",
              mobileView === "detail" ? "hidden md:flex" : "flex"
            )}
          >
            {/* Thanh tìm kiếm & bộ lọc */}
            <div className="p-3.5 sm:p-4 border-b border-white/10 space-y-3 bg-cobalt-950/95">
              <div className="relative">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm chiến dịch, địa điểm..."
                  className="w-full rounded-2xl border border-white/15 bg-white/10 py-2.5 pl-10 pr-8 text-xs sm:text-sm font-semibold text-white placeholder:text-cobalt-400 outline-none transition focus:border-flame-400 focus:bg-white/15"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cobalt-400">🔍</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cobalt-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Lọc chuyên mục */}
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {EVENT_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "rounded-xl px-2.5 py-1 text-[11px] font-bold whitespace-nowrap transition",
                      filter === f ? "bg-flame-500 text-white shadow-xs" : "bg-white/10 text-cobalt-300 hover:bg-white/15 hover:text-white"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Lọc năm */}
              <div className="flex items-center justify-between text-[11px] text-cobalt-400 pt-1">
                <span>Năm tổ chức:</span>
                <div className="flex gap-1.5">
                  {YEARS.map((y) => (
                    <button
                      key={y}
                      onClick={() => setYearFilter(y)}
                      className={cn(
                        "rounded-lg px-2 py-0.5 font-bold transition",
                        yearFilter === y ? "bg-tmu-500 text-white" : "hover:text-white"
                      )}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Danh sách cuộn */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-none">
              {filteredPrograms.length === 0 ? (
                <div className="p-8 text-center text-cobalt-400">
                  <p className="text-3xl">🔍</p>
                  <p className="mt-2 text-xs font-semibold">Không tìm thấy chương trình phù hợp.</p>
                </div>
              ) : (
                filteredPrograms.map((p) => {
                  const isSelected = selectedProgram?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedId(p.id);
                        setMobileView("detail");
                      }}
                      className={cn(
                        "group flex gap-3 rounded-2xl p-2.5 transition-all duration-200 cursor-pointer text-left border",
                        isSelected
                          ? "bg-white/15 border-flame-400 shadow-soft"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-cobalt-900 border border-white/10">
                        <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.2 text-[9px] font-bold text-white">
                          {p.day}/{p.month}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={cn("rounded-md px-1.5 py-0.2 text-[9.5px] font-bold", STATUS_STYLE[p.status])}>
                              {p.status}
                            </span>
                            <span className="text-[10px] text-cobalt-300 font-medium truncate">
                              {p.category} {p.year ? `· '${p.year.toString().slice(-2)}` : ""}
                            </span>
                          </div>
                          <h4 className="mt-1 font-display text-xs sm:text-[13px] font-bold text-white leading-snug line-clamp-2 group-hover:text-glow-300">
                            {p.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-cobalt-300 truncate flex items-center gap-1 mt-1">
                          <Icon.pin className="h-3 w-3 text-flame-400 shrink-0" />
                          <span className="truncate">{p.location}</span>
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* CỘT CHI TIẾT CHƯƠNG TRÌNH (PHẢI) */}
          <div
            className={cn(
              "flex-1 flex-col overflow-y-auto bg-sky-paper min-w-0",
              mobileView === "list" ? "hidden md:flex" : "flex"
            )}
          >
            {selectedProgram ? (
              <div className="max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
                {/* Nút quay lại trên mobile */}
                <div className="md:hidden flex items-center justify-between border-b border-cobalt-100 pb-3">
                  <button
                    onClick={() => setMobileView("list")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cobalt-700 hover:text-cobalt-950 py-1"
                  >
                    ← Quay lại danh sách ({filteredPrograms.length})
                  </button>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[10.5px] font-bold", STATUS_STYLE[selectedProgram.status])}>
                    {selectedProgram.status}
                  </span>
                </div>

                {/* Banner ảnh hero */}
                <div className="group relative aspect-video sm:aspect-[21/9] w-full overflow-hidden rounded-3xl border-4 border-white bg-cobalt-950 shadow-lift">
                  <img
                    src={selectedProgram.cover}
                    alt={selectedProgram.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/90 via-cobalt-950/20 to-transparent" />

                  {/* Nút phóng to ảnh */}
                  <button
                    onClick={() => setLightboxIndex(0)}
                    className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-cobalt-950/80 px-3 py-1.5 text-xs font-bold text-white shadow-soft backdrop-blur transition hover:bg-flame-600 hover:scale-105"
                  >
                    <Icon.expand className="h-3.5 w-3.5" /> Phóng to
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold", STATUS_STYLE[selectedProgram.status])}>
                        {selectedProgram.status}
                      </span>
                      <span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-0.5 text-[11px] font-bold">
                        {selectedProgram.category} {selectedProgram.year ? `· Năm ${selectedProgram.year}` : ""}
                      </span>
                    </div>
                    <h2 className="mt-2 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                      {selectedProgram.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-white/85">
                      <span className="flex items-center gap-1.5">
                        <Icon.calendar className="h-4 w-4 text-glow-300" /> {selectedProgram.dateLabel}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icon.pin className="h-4 w-4 text-glow-300" /> {selectedProgram.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tóm tắt */}
                <div className="rounded-3xl border border-cobalt-100 bg-white p-5 sm:p-6 shadow-sm">
                  <h3 className="font-display text-base font-extrabold text-cobalt-950">Mô tả chương trình</h3>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-cobalt-700/90">
                    {selectedProgram.excerpt}
                  </p>

                  {/* Fact parameters */}
                  {selectedProgram.fact && selectedProgram.fact.length > 0 && (
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedProgram.fact.map((f) => (
                        <div key={f.label} className="rounded-2xl border border-cobalt-100 bg-sky-paper p-3">
                          <p className="text-[10.5px] font-bold text-tmu-600 uppercase tracking-wider">{f.label}</p>
                          <p className="mt-1 text-xs sm:text-sm font-extrabold text-cobalt-900">{f.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Lịch trình dự kiến */}
                {selectedProgram.schedule && selectedProgram.schedule.length > 0 && (
                  <div className="rounded-3xl border border-cobalt-100 bg-white p-5 sm:p-6 shadow-sm">
                    <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-cobalt-950">
                      <span>⏱</span> Lịch trình hoạt động
                    </h3>
                    <ol className="mt-4 space-y-3 border-l-2 border-dashed border-tmu-200 pl-5">
                      {selectedProgram.schedule.map((s, idx) => (
                        <li key={idx} className="relative">
                          <span className="absolute top-1.5 -left-[27px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white ring-[3px] ring-flame-400" />
                          <div className="rounded-2xl border border-cobalt-100 bg-sky-paper/50 p-3.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-lg bg-cobalt-800 px-2 py-0.5 text-xs font-bold text-white">
                                {s.time}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-cobalt-900">{s.title}</span>
                            </div>
                            <p className="mt-1 text-xs sm:text-[13px] text-cobalt-700/80 leading-relaxed">{s.note}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Kho ảnh khoảnh khắc */}
                <div className="rounded-3xl border border-cobalt-100 bg-white p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-cobalt-950">
                      <Icon.camera className="h-4 w-4 text-tmu-600" /> Kho ảnh lưu niệm ({selectedProgram.gallery.length} ảnh)
                    </h3>
                    {selectedProgram.driveLink && (
                      <a
                        href={selectedProgram.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-flame-500 to-flame-600 px-3 py-1.5 text-xs font-bold text-white shadow-soft transition hover:from-flame-600 hover:to-flame-700"
                      >
                        📂 Mở album trên Google Drive ↗
                      </a>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProgram.gallery.map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        className="group relative aspect-video overflow-hidden rounded-2xl border border-cobalt-100 bg-black"
                      >
                        <img
                          src={imgUrl}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="rounded-full bg-white/80 p-1.5 text-cobalt-900">🔍</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA hành động */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-3xl bg-gradient-to-r from-cobalt-800 to-tmu-700 p-5 sm:p-6 text-white shadow-soft">
                  <div>
                    <h4 className="font-display text-base font-extrabold">Cùng hòa nhịp với nhà chung 36</h4>
                    <p className="text-xs text-white/80 mt-0.5">Mọi thông tin hỗ trợ và đăng ký tình nguyện viên luôn rộng mở.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(window.location.origin + "#events");
                        }
                        onToast(`Đã sao chép liên kết chiến dịch: ${selectedProgram.title} 📋`);
                      }}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Chia sẻ
                    </Button>
                    <Button
                      variant="flame"
                      onClick={() => {
                        onToast("Đang mở đơn đăng ký tình nguyện viên... ✍️");
                        onClose();
                        window.dispatchEvent(new CustomEvent("bllsv_open_recruit"));
                      }}
                      className="flex-1 sm:flex-initial"
                    >
                      Đăng ký tham gia ngay
                      <Icon.arrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Lightbox modal khi bấm xem ảnh to */}
      {lightboxIndex !== null && (
        <LightboxModal
          open={lightboxIndex !== null}
          currentIndex={lightboxIndex}
          items={lightboxItems}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </div>
  );
}
