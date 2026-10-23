import { useEffect, useMemo, useState } from "react";
import { CONFESSIONS, MEMORIES, type Confession } from "@/data/content";
import { Button, Icon, useEscape, useLockScroll } from "@/components/ui";
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
  const [draft, setDraft] = useState("");
  const [author, setAuthor] = useState("");
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

  // Đồng bộ BCH khi có cập nhật
  useEffect(() => {
    const handleUpdate = () => setLeadersDataVersion((v) => v + 1);
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

  const filteredNotes = useMemo(() => {
    const q = confessionSearch.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => n.text.toLowerCase().includes(q) || n.author.toLowerCase().includes(q));
  }, [notes, confessionSearch]);

  const addNote = () => {
    if (draft.trim().length < 5) {
      onToast("Bạn viết thêm chút nữa để mọi người đọc nhé 🙂");
      return;
    }
    const rotates = ["-1.5deg", "1.2deg", "-1deg", "1.8deg"];
    const newNote: Confession = {
      id: `me-${Date.now()}`,
      text: draft.trim(),
      author: author.trim() || "Bạn ẩn danh",
      role: "Thành viên BLLSV",
      tone: selectedTone,
      rotate: rotates[Math.floor(Math.random() * rotates.length)],
    };
    const next = [newNote, ...notes];
    setNotes(next);
    saveStoredConfessions(next);
    setDraft("");
    setAuthor("");
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
                    <div>
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
              {/* Form dán giấy mới */}
              <div className="rounded-3xl border border-cobalt-100 bg-white p-5 sm:p-7 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-cobalt-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💌</span>
                      <h3 className="font-display text-lg sm:text-xl font-black text-cobalt-950">
                        Dán Một Mẩu Giấy Gửi Tới Nhà Chung 36
                      </h3>
                    </div>
                    <p className="mt-1 text-xs sm:text-[13px] text-cobalt-600">
                      Chia sẻ kỷ niệm, lời nhắn gửi tân sinh viên hoặc cảm xúc của bạn với quê hương Thanh Hóa.
                    </p>
                  </div>

                  {/* Lựa chọn màu giấy */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="text-xs font-bold text-cobalt-500 mr-1">Màu giấy:</span>
                    {[
                      { id: "paper" as const, bg: "bg-amber-100 border-amber-300", label: "Vàng" },
                      { id: "orange" as const, bg: "bg-flame-100 border-flame-300", label: "Cam" },
                      { id: "blue" as const, bg: "bg-tmu-100 border-tmu-300", label: "Xanh" },
                      { id: "mint" as const, bg: "bg-emerald-100 border-emerald-300", label: "Bạc hà" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedTone(c.id)}
                        aria-label={`Chọn màu giấy ${c.label}`}
                        className={cn(
                          "h-6 w-6 rounded-full border-2 transition-transform",
                          c.bg,
                          selectedTone === c.id ? "scale-110 ring-2 ring-cobalt-800" : "opacity-80 hover:scale-105"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Tên của bạn (VD: Minh Trí – K60, Bạn K61 ẩn danh...)"
                    className="min-h-11 w-full rounded-2xl border border-cobalt-200 bg-white px-3.5 sm:px-4 text-xs sm:text-sm text-cobalt-900 outline-none transition placeholder:text-cobalt-400 focus:border-tmu-400 focus:ring-4 focus:ring-tmu-100"
                  />
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={3}
                    placeholder="Lời nhắn nhủ, tâm sự hoặc kỷ niệm của bạn..."
                    className="w-full resize-none rounded-2xl border border-cobalt-200 bg-white p-3.5 sm:p-4 text-xs sm:text-sm text-cobalt-900 outline-none transition placeholder:text-cobalt-400 focus:border-tmu-400 focus:ring-4 focus:ring-tmu-100"
                  />
                  <div className="flex justify-end pt-1">
                    <Button variant="flame" onClick={addNote} className="w-full sm:w-auto">
                      Dán lên tường ngay
                      <Icon.heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tường mẩu giấy note */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h4 className="font-display text-base font-extrabold text-cobalt-950 flex items-center gap-2">
                    <span>📌</span> Tường Lời Nhắn ({filteredNotes.length} mẩu giấy)
                  </h4>
                  <div className="w-full sm:w-64">
                    <input
                      type="text"
                      value={confessionSearch}
                      onChange={(e) => setConfessionSearch(e.target.value)}
                      placeholder="Tìm lời nhắn hoặc tác giả..."
                      className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-900 outline-none placeholder:text-cobalt-400 focus:border-tmu-400 focus:ring-2 focus:ring-tmu-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredNotes.map((c) => (
                    <article
                      key={c.id}
                      style={{ rotate: c.rotate }}
                      className={cn(
                        "group relative flex flex-col justify-between gap-3.5 rounded-3xl border-2 p-5 shadow-soft transition-all duration-300 hover:rotate-0 hover:shadow-lift",
                        TONES[c.tone],
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] font-bold text-cobalt-700">
                          <span>📌</span> Lời nhắn
                        </span>
                        <span className="h-2 w-10 rounded-full bg-black/5" />
                      </div>

                      <div className="relative">
                        <span className="font-display text-2xl leading-none text-flame-500/40">“</span>
                        <p className="-mt-1 text-xs sm:text-[13.5px] leading-relaxed font-medium text-cobalt-950">
                          {c.text}
                        </p>
                      </div>

                      <footer className="flex items-center justify-between border-t border-black/10 pt-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 font-display text-xs font-black text-cobalt-900 shadow-xs border border-black/5">
                            {c.author.slice(0, 1)}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-cobalt-950">{c.author}</p>
                            <p className="truncate text-[10.5px] font-semibold text-cobalt-600/80">{c.role}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-flame-600 shrink-0">💙 36 TMU</span>
                      </footer>
                    </article>
                  ))}
                </div>
              </div>
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
