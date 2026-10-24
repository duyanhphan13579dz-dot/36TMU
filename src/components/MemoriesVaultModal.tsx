import { useEffect, useMemo, useState } from "react";
import { MEMORIES, type Confession } from "@/data/content";
import { Button, Icon, useEscape, useLockScroll } from "@/components/ui";
import { getAllLeaders, getStoredConfessions, saveStoredConfessions } from "@/data/adminStore";
import { cn } from "@/utils/cn";
import { LightboxModal } from "@/components/LightboxModal";
import { ShimmerImage } from "@/components/ui/ShimmerImage";

const TONES: Record<
  Confession["tone"],
  {
    card: string;
    border: string;
    badge: string;
    tape: string;
    initialBg: string;
    quoteColor: string;
  }
> = {
  paper: {
    card: "bg-[#fffdf5] text-amber-950",
    border: "border-amber-200/90 hover:border-amber-400",
    badge: "bg-amber-100 text-amber-800 border-amber-300/80",
    tape: "bg-amber-200/60 border-amber-300/40",
    initialBg: "bg-amber-500 text-white",
    quoteColor: "text-amber-400/50",
  },
  orange: {
    card: "bg-[#fffaf5] text-orange-950",
    border: "border-orange-200/90 hover:border-orange-400",
    badge: "bg-orange-100 text-orange-800 border-orange-300/80",
    tape: "bg-orange-200/60 border-orange-300/40",
    initialBg: "bg-flame-500 text-white",
    quoteColor: "text-orange-400/50",
  },
  blue: {
    card: "bg-[#f5faff] text-sky-950",
    border: "border-sky-200/90 hover:border-sky-400",
    badge: "bg-sky-100 text-sky-800 border-sky-300/80",
    tape: "bg-sky-200/60 border-sky-300/40",
    initialBg: "bg-tmu-600 text-white",
    quoteColor: "text-sky-400/50",
  },
  mint: {
    card: "bg-[#f5fbf7] text-emerald-950",
    border: "border-emerald-200/90 hover:border-emerald-400",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-300/80",
    tape: "bg-emerald-200/60 border-emerald-300/40",
    initialBg: "bg-emerald-600 text-white",
    quoteColor: "text-emerald-400/50",
  },
};



const MEMORY_CATEGORIES = [
  { id: "all", label: "Tất cả khoảnh khắc" },
  { id: "mua-he-xanh", label: "🌻 Mùa Hè Xanh" },
  { id: "dong-am", label: "❄️ Đông Ấm" },
  { id: "sinh-nhat", label: "🎂 Sinh Nhật 18" },
  { id: "am-vang", label: "🏆 Âm Vang Xứ Thanh" },
];

export interface MemoriesVaultModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: "memories" | "leaders" | "confessions";
  initialMemoryIndex?: number | null;
  initialLeaderSearch?: string;
  onToast: (msg: string) => void;
}

export default function MemoriesVaultModal({
  open,
  onClose,
  initialTab = "memories",
  initialMemoryIndex = null,
  initialLeaderSearch = "",
  onToast,
}: MemoriesVaultModalProps) {
  const [activeTab, setActiveTab] = useState<"memories" | "leaders" | "confessions">(initialTab);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Tab 1: Memories state
  const [memoryFilter, setMemoryFilter] = useState<string>("all");
  const [memorySearch, setMemorySearch] = useState<string>("");

  // Tab 2: Leaders state
  const [leaderSearch, setLeaderSearch] = useState(initialLeaderSearch);
  const [selectedKhoa, setSelectedKhoa] = useState<string>("all");
  const [leadersDataVersion, setLeadersDataVersion] = useState(0);

  // Tab 3: Confessions state
  const [notes, setNotes] = useState<Confession[]>(() => getStoredConfessions());
  const [confessionSearch, setConfessionSearch] = useState("");
  const [confessionToneFilter, setConfessionToneFilter] = useState<"all" | Confession["tone"]>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [author, setAuthor] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [selectedTone, setSelectedTone] = useState<Confession["tone"]>("paper");

  useLockScroll(open);
  useEscape(open, () => {
    if (lightbox !== null) {
      setLightbox(null);
    } else {
      onClose();
    }
  });

  // Khi modal mở, cập nhật tab & memory index nếu có
  useEffect(() => {
    if (open) {
      if (initialTab) setActiveTab(initialTab);
      if (typeof initialMemoryIndex === "number") setLightbox(initialMemoryIndex);
      if (initialLeaderSearch) setLeaderSearch(initialLeaderSearch);
    }
  }, [open, initialTab, initialMemoryIndex, initialLeaderSearch]);

  // Đồng bộ BCH và Confessions khi có cập nhật
  useEffect(() => {
    const handleUpdate = () => {
      setLeadersDataVersion((v) => v + 1);
      setNotes(getStoredConfessions());
    };
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
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
      const q = leaderSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.hometown.toLowerCase().includes(q) ||
        l.role.toLowerCase().includes(q) ||
        l.term.toLowerCase().includes(q);
      return matchKhoa && matchSearch;
    });
  }, [allLeaders, selectedKhoa, leaderSearch]);

  const filteredMemories = useMemo(() => {
    const q = memorySearch.trim().toLowerCase();
    return MEMORIES.filter((m) => {
      const matchCat = memoryFilter === "all" || m.category === memoryFilter;
      const matchQ =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.caption.toLowerCase().includes(q) ||
        m.tag.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [memoryFilter, memorySearch]);

  const toneCounts = useMemo(() => {
    return {
      all: notes.length,
      paper: notes.filter((n) => n.tone === "paper").length,
      orange: notes.filter((n) => n.tone === "orange").length,
      blue: notes.filter((n) => n.tone === "blue").length,
      mint: notes.filter((n) => n.tone === "mint").length,
    };
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const q = confessionSearch.trim().toLowerCase();
    return notes.filter((n) => {
      const matchTone = confessionToneFilter === "all" || n.tone === confessionToneFilter;
      const matchSearch =
        !q ||
        n.text.toLowerCase().includes(q) ||
        n.author.toLowerCase().includes(q) ||
        (n.role && n.role.toLowerCase().includes(q));
      return matchTone && matchSearch;
    });
  }, [notes, confessionSearch, confessionToneFilter]);

  const addNote = () => {
    if (draft.trim().length < 5) {
      onToast("Bạn viết thêm chút nữa để mọi người đọc nhé 🙂");
      return;
    }
    const newNote: Confession = {
      id: `me-${Date.now()}`,
      text: draft.trim(),
      author: author.trim() || "Bạn ẩn danh (Sinh viên 36)",
      role: roleInput.trim() || "Thành viên Nhà Chung 36",
      tone: selectedTone,
      rotate: "0deg",
    };
    const next = [newNote, ...notes];
    setNotes(next);
    saveStoredConfessions(next);
    setDraft("");
    setAuthor("");
    setRoleInput("");
    setIsFormOpen(false);
    onToast("Lời nhắn của bạn đã được dán lên tường nhà chung 💙");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-cobalt-950/80 backdrop-blur-md animate-[fadeIn_.2s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      {/* Header Modal Kho */}
      <header className="sticky top-0 z-30 flex shrink-0 items-center justify-between border-b border-white/10 bg-cobalt-950/95 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-tmu-500 to-cobalt-700 text-lg shadow-soft text-white">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base sm:text-lg font-black text-white">
                Kho Kỷ Niệm &amp; Tâm Sự 36
              </h2>
              <span className="hidden sm:inline-flex rounded-full bg-tmu-500/20 border border-tmu-400/30 px-2 py-0.5 text-[10.5px] font-bold text-tmu-300">
                Memories &amp; Confessions Vault
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-cobalt-300">
              16 thế hệ giữ lửa • Kho ảnh lịch sử • Tường tâm sự nhà chung
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-9 w-9 rounded-full p-0 text-white/80 hover:bg-white/10 hover:text-white"
            title="Đóng (Esc)"
          >
            ✕
          </Button>
        </div>
      </header>

      {/* Thanh điều hướng 3 Tab Kho */}
      <div className="shrink-0 flex items-center justify-between border-b border-white/10 bg-cobalt-900/95 px-3 py-2 sm:px-6 backdrop-blur">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab("memories")}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-[13px] font-bold transition-all shrink-0 active:scale-95",
              activeTab === "memories"
                ? "bg-tmu-500 text-white shadow-soft"
                : "bg-white/5 text-cobalt-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon.camera className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Kho Ảnh</span>
            <span className="rounded-md bg-black/20 px-1.5 py-0.2 text-[10px]">
              {MEMORIES.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("leaders")}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-[13px] font-bold transition-all shrink-0 active:scale-95",
              activeTab === "leaders"
                ? "bg-flame-500 text-white shadow-soft"
                : "bg-white/5 text-cobalt-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <span>⭐</span>
            <span>BCH ({allLeaders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("confessions")}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-[13px] font-bold transition-all shrink-0 active:scale-95",
              activeTab === "confessions"
                ? "bg-amber-400 text-cobalt-950 shadow-soft"
                : "bg-white/5 text-cobalt-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <span>💌</span>
            <span>Confessions ({notes.length})</span>
          </button>
        </div>
      </div>

      {/* Nội dung chính cuộn theo Tab */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-sky-paper p-3 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* ================= TAB 1: KHO ẢNH & KHOẢNH KHẮC ================= */}
          {activeTab === "memories" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Thanh tìm kiếm & bộ lọc */}
              <div className="flex flex-col gap-3 rounded-2xl border border-cobalt-100 bg-white p-3.5 sm:p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-md">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-cobalt-400">🔍</span>
                  <input
                    type="text"
                    value={memorySearch}
                    onChange={(e) => setMemorySearch(e.target.value)}
                    placeholder="Tìm theo tiêu đề, chương trình, chú thích ảnh..."
                    className="w-full rounded-xl border border-cobalt-200 bg-white py-2 pl-9 pr-8 text-xs sm:text-sm text-cobalt-900 outline-none placeholder:text-cobalt-400 focus:border-tmu-400 focus:ring-2 focus:ring-tmu-100"
                  />
                  {memorySearch && (
                    <button
                      onClick={() => setMemorySearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-cobalt-400 hover:text-cobalt-700"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
                  {MEMORY_CATEGORIES.map((cat) => {
                    const count = cat.id === "all" ? MEMORIES.length : MEMORIES.filter((m) => m.category === cat.id).length;
                    const active = memoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setMemoryFilter(cat.id)}
                        className={cn(
                          "flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition active:scale-95",
                          active
                            ? "bg-cobalt-800 text-white shadow-xs"
                            : "border border-cobalt-200 bg-white text-cobalt-700 hover:border-tmu-400",
                        )}
                      >
                        {cat.label}
                        <span className={cn("rounded-md px-1.5 py-0.2 text-[10px]", active ? "bg-white/20 text-white" : "bg-cobalt-100 text-cobalt-600")}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lưới ảnh khoảnh khắc: 2 cột trên mobile */}
              {filteredMemories.length === 0 ? (
                <div className="rounded-3xl border border-cobalt-100 bg-white p-8 sm:p-12 text-center shadow-sm">
                  <div className="text-4xl">📸</div>
                  <h3 className="mt-2 font-display text-base font-bold text-cobalt-950">
                    Không tìm thấy khung hình phù hợp
                  </h3>
                  <p className="mt-1 text-xs text-cobalt-600">
                    Thử đổi từ khóa tìm kiếm hoặc chọn chuyên mục khác.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
                  {filteredMemories.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setLightbox(MEMORIES.findIndex((item) => item.id === m.id))}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-cobalt-100 bg-white text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-tmu-300 hover:shadow-soft"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cobalt-950">
                        <ShimmerImage
                          src={m.src}
                          alt={m.title}
                          containerClassName="h-full w-full"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cobalt-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute top-2 left-2 rounded-full bg-white/95 px-2 py-0.5 text-[9.5px] sm:text-[10.5px] font-bold text-cobalt-800 shadow-2xs backdrop-blur">
                          {m.tag}
                        </span>
                        <span className="absolute bottom-2 right-2 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon.expand className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </span>
                      </div>
                      <div className="p-2 sm:p-3.5 flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="font-display text-xs sm:text-sm font-extrabold text-cobalt-950 group-hover:text-tmu-700 transition-colors line-clamp-1">
                            {m.title}
                          </h4>
                          <p className="mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-cobalt-600">
                            {m.caption}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-3 flex items-center justify-between border-t border-cobalt-100 pt-1.5 text-[10.5px] sm:text-[11px] font-semibold text-tmu-600">
                          <span>Xem ảnh</span>
                          <span>🔍</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: THẾ HỆ GIỮ LỬA (BAN CHẤP HÀNH) ================= */}
          {activeTab === "leaders" && (
            <div className="space-y-6">
              {/* Header Tab BCH */}
              <div className="rounded-3xl border border-cobalt-100 bg-white p-5 sm:p-7 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-flame-50 px-3 py-1 text-[11px] font-bold text-flame-600 ring-1 ring-flame-200 uppercase tracking-wider">
                      ⭐ 16 Thế hệ giữ lửa
                    </span>
                    <h3 className="mt-2 font-display text-xl sm:text-2xl font-black text-cobalt-950">
                      Ban Chấp Hành Các Khóa ({khoasList[0] || "K60"} – {khoasList[khoasList.length - 1] || "K44"})
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-cobalt-600">
                      Hơn 15 năm cống hiến, kết nối và giữ lửa cho triệu trái tim sinh viên Thanh Hóa tại TMU.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex rounded-2xl bg-cobalt-50 px-3.5 py-2 text-xs font-bold text-cobalt-800">
                      Tổng cộng {allLeaders.length} anh chị BCH
                    </span>
                  </div>
                </div>

                {/* Công cụ tìm kiếm & lọc khóa */}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-cobalt-100 pt-4">
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
              </div>

              {/* Danh sách thẻ anh chị BCH */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLeaders.map((lead, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-cobalt-100 bg-white p-4 shadow-xs transition hover:border-tmu-300 hover:shadow-soft"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {lead.avatarUrl ? (
                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-cobalt-200 shadow-xs">
                          <img src={lead.avatarUrl} alt={lead.name} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-cobalt-800 to-tmu-600 text-xs font-bold text-white shadow-xs">
                          {lead.name.split(" ").pop()?.charAt(0) || "BCH"}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm sm:text-base font-black text-cobalt-950">
                            {lead.name}
                          </span>
                          <span className="rounded-md bg-flame-100 px-1.5 py-0.5 text-[10px] font-bold text-flame-700">
                            {lead.khoa}
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-[13px] font-semibold text-tmu-700">{lead.role}</p>
                        <p className="mt-1 text-xs text-cobalt-600">
                          📍 {lead.hometown} {lead.dob ? `· Sinh: ${lead.dob}` : ""}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-lg bg-cobalt-50 px-2.5 py-1 text-[10.5px] font-bold text-cobalt-700 border border-cobalt-100 shadow-2xs">
                      {lead.term}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: HÒM THƯ CONFESSIONS ================= */}
          {activeTab === "confessions" && (
            <div className="space-y-6">
              {/* THANH HEADER TIÊU ĐỀ & NÚT GỬI LỜI NHẮN */}
              <div className="rounded-3xl border border-cobalt-100 bg-gradient-to-br from-white via-cobalt-50/30 to-amber-50/20 p-5 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-flame-100 text-lg shadow-2xs border border-flame-200">
                        💌
                      </span>
                      <h3 className="font-display text-lg sm:text-2xl font-black text-cobalt-950">
                        Hòm Thư Confession &amp; Kỷ Niệm 36
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-cobalt-600 max-w-2xl leading-relaxed">
                      Mỗi mẩu giấy là một ký ức thanh xuân, lời nhắn gửi tân sinh viên hay tâm sự chân thành của các thế hệ người con xứ Thanh tại TMU.
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen((prev) => !prev)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-flame-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-soft hover:bg-flame-600 transition hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{isFormOpen ? "✕ Thu gọn form" : "✍️ Viết lời nhắn mới"}</span>
                    </button>
                  </div>
                </div>

                {/* FORM GỬI LỜI NHẮN (COLLAPSIBLE / ANIMATED) */}
                {isFormOpen && (
                  <div className="mt-5 rounded-2xl border border-flame-200/90 bg-white p-4 sm:p-5 shadow-soft transition-all duration-300">
                    <div className="flex items-center justify-between border-b border-cobalt-100 pb-3 mb-4">
                      <span className="font-display text-xs sm:text-sm font-bold text-cobalt-900 flex items-center gap-1.5">
                        <span>📝</span> Dán một mẩu giấy gửi tới Nhà Chung
                      </span>
                      {/* Chọn màu giấy */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-cobalt-500">Màu giấy:</span>
                        {[
                          { id: "paper" as const, bg: "bg-[#fffdf5] border-amber-300", label: "Vàng ngà" },
                          { id: "orange" as const, bg: "bg-[#fffaf5] border-orange-300", label: "Cam lửa" },
                          { id: "blue" as const, bg: "bg-[#f5faff] border-sky-300", label: "Xanh hy vọng" },
                          { id: "mint" as const, bg: "bg-[#f5fbf7] border-emerald-300", label: "Bạc hà" },
                        ].map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedTone(c.id)}
                            aria-label={`Chọn màu giấy ${c.label}`}
                            className={cn(
                              "h-6 w-6 rounded-full border-2 transition-transform shadow-2xs",
                              c.bg,
                              selectedTone === c.id ? "scale-115 ring-2 ring-cobalt-800" : "opacity-80 hover:scale-105"
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          placeholder="Tên hoặc biệt danh (VD: Minh Trí – K60, Bạn K61 ẩn danh...)"
                          className="min-h-10 w-full rounded-xl border border-cobalt-200 bg-white px-3.5 text-xs text-cobalt-900 outline-none transition placeholder:text-cobalt-400 focus:border-flame-400 focus:ring-2 focus:ring-flame-100 font-semibold"
                        />
                        <input
                          value={roleInput}
                          onChange={(e) => setRoleInput(e.target.value)}
                          placeholder="Khóa / Chức danh (VD: Ban Truyền thông K61, TNV Mùa Hè Xanh...)"
                          className="min-h-10 w-full rounded-xl border border-cobalt-200 bg-white px-3.5 text-xs text-cobalt-900 outline-none transition placeholder:text-cobalt-400 focus:border-flame-400 focus:ring-2 focus:ring-flame-100"
                        />
                      </div>

                      <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={3}
                        placeholder="Hãy chia sẻ kỷ niệm, lời nhắn gửi hay những điều muốn nói cùng đồng đội nhà chung 36..."
                        className="w-full resize-none rounded-xl border border-cobalt-200 bg-white p-3.5 text-xs sm:text-sm text-cobalt-900 outline-none transition placeholder:text-cobalt-400 focus:border-flame-400 focus:ring-2 focus:ring-flame-100"
                      />

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-cobalt-500">
                          💡 Mẩu giấy sẽ hiển thị công khai trên bức tường kỷ niệm nhà chung.
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsFormOpen(false)}
                            className="rounded-xl border border-cobalt-200 px-3 py-1.5 text-xs font-bold text-cobalt-600 hover:bg-cobalt-50"
                          >
                            Đóng
                          </button>
                          <Button variant="flame" onClick={addNote} className="h-9 px-4 text-xs font-bold">
                            Dán lên tường ngay
                            <Icon.heart className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* BỘ LỌC TONE MÀU & THANH TÌM KIẾM */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-cobalt-100 pb-3">
                {/* Tone filter tabs */}
                <div className="scrollbar-none -mx-2 flex snap-x gap-1.5 overflow-x-auto px-2 pb-1 sm:mx-0 sm:px-0">
                  <button
                    type="button"
                    onClick={() => setConfessionToneFilter("all")}
                    className={cn(
                      "shrink-0 snap-start rounded-xl px-3 py-1.5 text-xs font-bold transition",
                      confessionToneFilter === "all"
                        ? "bg-cobalt-900 text-white shadow-2xs"
                        : "bg-cobalt-50 text-cobalt-700 hover:bg-cobalt-100"
                    )}
                  >
                    Tất cả ({toneCounts.all})
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfessionToneFilter("paper")}
                    className={cn(
                      "shrink-0 snap-start rounded-xl px-3 py-1.5 text-xs font-bold transition border",
                      confessionToneFilter === "paper"
                        ? "bg-amber-400 text-amber-950 border-amber-500 shadow-2xs"
                        : "bg-amber-50/80 text-amber-900 border-amber-200/80 hover:bg-amber-100"
                    )}
                  >
                    📜 Vintage ({toneCounts.paper})
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfessionToneFilter("orange")}
                    className={cn(
                      "shrink-0 snap-start rounded-xl px-3 py-1.5 text-xs font-bold transition border",
                      confessionToneFilter === "orange"
                        ? "bg-flame-500 text-white border-flame-600 shadow-2xs"
                        : "bg-orange-50/80 text-orange-900 border-orange-200/80 hover:bg-orange-100"
                    )}
                  >
                    🔥 Nhiệt huyết ({toneCounts.orange})
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfessionToneFilter("blue")}
                    className={cn(
                      "shrink-0 snap-start rounded-xl px-3 py-1.5 text-xs font-bold transition border",
                      confessionToneFilter === "blue"
                        ? "bg-tmu-600 text-white border-tmu-700 shadow-2xs"
                        : "bg-sky-50/80 text-sky-900 border-sky-200/80 hover:bg-sky-100"
                    )}
                  >
                    💙 Hy vọng ({toneCounts.blue})
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfessionToneFilter("mint")}
                    className={cn(
                      "shrink-0 snap-start rounded-xl px-3 py-1.5 text-xs font-bold transition border",
                      confessionToneFilter === "mint"
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-2xs"
                        : "bg-emerald-50/80 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100"
                    )}
                  >
                    🍃 Thanh xuân ({toneCounts.mint})
                  </button>
                </div>

                {/* Ô tìm kiếm */}
                <div className="w-full sm:w-64">
                  <input
                    type="text"
                    value={confessionSearch}
                    onChange={(e) => setConfessionSearch(e.target.value)}
                    placeholder="🔍 Tìm lời nhắn, tác giả..."
                    className="w-full rounded-xl border border-cobalt-200 bg-white px-3.5 py-1.5 text-xs text-cobalt-950 outline-none placeholder:text-cobalt-400 focus:border-flame-400 focus:ring-2 focus:ring-flame-100"
                  />
                </div>
              </div>

              {/* TƯỜNG LỜI NHẮN MASONRY WALL CĂN CHỈNH ĐẲNG CẤP */}
              {filteredNotes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-cobalt-200 p-8 text-center text-xs text-cobalt-500 space-y-2">
                  <p className="text-sm font-semibold text-cobalt-700">Không tìm thấy mẩu giấy nào phù hợp.</p>
                  <p>Hãy thử tìm kiếm với từ khóa khác hoặc nhấn "Viết lời nhắn mới" để gửi lời nhắn đầu tiên!</p>
                  <button
                    type="button"
                    onClick={() => {
                      setConfessionSearch("");
                      setConfessionToneFilter("all");
                    }}
                    className="inline-flex rounded-xl bg-cobalt-100 px-3 py-1.5 text-xs font-bold text-cobalt-800 hover:bg-cobalt-200 transition"
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4.5 [column-fill:_balance]">
                  {filteredNotes.map((c) => {
                    const style = TONES[c.tone] || TONES.paper;
                    return (
                      <article
                        key={c.id}
                        className={cn(
                          "break-inside-avoid mb-4.5 group relative flex flex-col justify-between rounded-2xl border p-4.5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-soft",
                          style.card,
                          style.border
                        )}
                      >
                        {/* Washi tape mờ trang trí phía trên */}
                        <div
                          className={cn(
                            "absolute -top-1.5 left-1/2 -translate-x-1/2 h-3.5 w-16 rounded-xs border backdrop-blur-xs shadow-2xs pointer-events-none",
                            style.tape
                          )}
                        />

                        {/* Top bar của mẩu giấy */}
                        <div className="flex items-center justify-between pb-2 mb-1 border-b border-black/5">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold border",
                              style.badge
                            )}
                          >
                            <span>📌</span> Kỷ niệm 36
                          </span>
                          <span className="text-[10px] text-cobalt-500/70 font-mono font-medium">#NC36</span>
                        </div>

                        {/* Nội dung lời nhắn với dấu ngoặc kép */}
                        <div className="relative py-1">
                          <span
                            className={cn(
                              "font-display text-2xl leading-none select-none block -mb-2",
                              style.quoteColor
                            )}
                          >
                            “
                          </span>
                          <p className="text-xs sm:text-[13.5px] leading-relaxed font-medium text-cobalt-950 whitespace-pre-line">
                            {c.text}
                          </p>
                        </div>

                        {/* Footer mẩu giấy */}
                        <footer className="flex items-center justify-between border-t border-black/5 pt-3 mt-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-black shadow-xs border border-white/40",
                                style.initialBg
                              )}
                            >
                              {c.author.trim().slice(0, 1).toUpperCase() || "3"}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-cobalt-950">{c.author}</p>
                              <p className="truncate text-[10.5px] font-medium text-cobalt-600/80">
                                {c.role || "Thành viên Nhà Chung 36"}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10.5px] font-bold text-flame-600 shrink-0 ml-1">
                            💙 36 TMU
                          </span>
                        </footer>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* LightboxModal khi phóng to ảnh */}
      {lightbox !== null && (
        <LightboxModal
          open={lightbox !== null}
          currentIndex={lightbox}
          items={MEMORIES}
          onClose={() => setLightbox(null)}
          onNavigate={(idx) => setLightbox(idx)}
        />
      )}
    </div>
  );
}
