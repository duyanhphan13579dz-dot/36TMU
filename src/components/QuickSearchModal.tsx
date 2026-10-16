import { useEffect, useMemo, useRef, useState } from "react";
import { useLockScroll, useEscape } from "@/components/ui";
import { NAV_ITEMS, DANCES, MEMORIES, TRADITIONAL_SONGS } from "@/data/content";
import { getAllLeaders, getAllPrograms, getStoredAdminPosts } from "@/data/adminStore";
import { cn } from "@/utils/cn";

export interface SearchResult {
  id: string;
  category: "section" | "event" | "leader" | "dance" | "memory";
  categoryLabel: string;
  title: string;
  subtitle: string;
  badge?: string;
  actionId?: string;
}

interface QuickSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectMemory?: (index: number) => void;
}

export function QuickSearchModal({ open, onClose, onSelectMemory }: QuickSearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useLockScroll(open);
  useEscape(open, onClose);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("bllsv_toggle_search"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Build searchable index
  const allItems = useMemo(() => {
    const items: SearchResult[] = [];

    // 1. Navigation sections
    NAV_ITEMS.forEach((nav) => {
      items.push({
        id: `nav-${nav.id}`,
        category: "section",
        categoryLabel: "Trang mục",
        title: nav.label,
        subtitle: `Chuyển nhanh tới phần #${nav.id}`,
        badge: "Điều hướng",
        actionId: nav.id,
      });
    });

    // 2. Programs & Events (Base + Admin posts)
    const basePrograms = getAllPrograms();
    const adminPosts = getStoredAdminPosts();

    adminPosts.forEach((post) => {
      items.push({
        id: `admin-post-${post.id}`,
        category: "event",
        categoryLabel: "Tin tức & Sự kiện",
        title: post.title,
        subtitle: `${post.category} • Người đăng: ${post.author}`,
        badge: "Mới đăng",
        actionId: "events",
      });
    });

    basePrograms.forEach((prog) => {
      items.push({
        id: `prog-${prog.id}`,
        category: "event",
        categoryLabel: "Tin tức & Sự kiện",
        title: prog.title,
        subtitle: `${prog.category} • ${prog.location}`,
        badge: prog.status,
        actionId: "events",
      });
    });

    // 3. Leaders & Ban Chấp Hành
    const leaders = getAllLeaders();
    leaders.forEach((l, idx) => {
      items.push({
        id: `leader-${l.id || `${l.khoa}-${idx}`}`,
        category: "leader",
        categoryLabel: "Ban Chấp Hành",
        title: l.name,
        subtitle: `${l.role} • Khóa ${l.khoa} (${l.term}) • Quê quán: ${l.hometown}`,
        badge: l.khoa,
        actionId: "memories",
      });
    });

    // 4. Flashmob & Songs
    DANCES.forEach((d) => {
      items.push({
        id: `dance-${d.id}`,
        category: "dance",
        categoryLabel: "Bài nhảy & Hát",
        title: `Bài nhảy: ${d.title}`,
        subtitle: `${d.style} • Nhịp ${d.bpm} BPM • ${d.duration}`,
        badge: "Flashmob",
        actionId: "dance",
      });
    });

    TRADITIONAL_SONGS.forEach((s) => {
      items.push({
        id: `song-${s.id}`,
        category: "dance",
        categoryLabel: "Bài nhảy & Hát",
        title: `Bài hát: ${s.title}`,
        subtitle: `${s.author} • ${s.note}`,
        badge: "Âm nhạc",
        actionId: "dance",
      });
    });

    // 5. Memories
    MEMORIES.forEach((m, idx) => {
      items.push({
        id: `memory-${m.id}`,
        category: "memory",
        categoryLabel: "Kỷ niệm",
        title: m.title,
        subtitle: m.caption,
        badge: m.tag,
        actionId: `${idx}`,
      });
    });

    return items;
  }, [open]);

  // Filter items
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    });
  }, [allItems, query, selectedCategory]);

  const handleSelect = (item: SearchResult) => {
    onClose();
    if (item.category === "memory" && onSelectMemory && item.actionId) {
      const idx = parseInt(item.actionId, 10);
      if (!isNaN(idx)) {
        onSelectMemory(idx);
        return;
      }
    }

    if (item.actionId) {
      setTimeout(() => {
        const el = document.getElementById(item.actionId!);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  // Keyboard navigation within list
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selectedIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[220] flex items-start justify-center p-3 pt-14 sm:p-6 sm:pt-20" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button
        aria-label="Đóng tìm kiếm"
        onClick={onClose}
        className="absolute inset-0 bg-cobalt-950/75 backdrop-blur-md animate-[fadeIn_.2s_ease-out]"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl animate-[popIn_.25s_cubic-bezier(.22,1,.36,1)]">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-cobalt-100 px-4 py-3 sm:px-5">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-cobalt-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Tìm chương trình, anh chị BCH, bài nhảy, kỷ niệm..."
            className="ml-3 flex-1 bg-transparent text-sm sm:text-base font-semibold text-cobalt-950 placeholder:text-cobalt-400 outline-none"
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="mr-2 rounded-lg p-1 text-xs font-bold text-cobalt-400 hover:bg-cobalt-100 hover:text-cobalt-700"
            >
              Xóa
            </button>
          )}

          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-cobalt-200 bg-cobalt-50 px-2 py-0.5 text-[11px] font-semibold text-cobalt-600">
            ESC để đóng
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-cobalt-100/80 bg-cobalt-50/50 px-4 py-2 scrollbar-none sm:px-5">
          {[
            { id: "all", label: "Tất cả" },
            { id: "event", label: "Chương trình & Sự kiện" },
            { id: "leader", label: "Ban Chấp Hành" },
            { id: "dance", label: "Bài nhảy & Hát" },
            { id: "memory", label: "Kỷ niệm" },
            { id: "section", label: "Trang mục" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={cn(
                "shrink-0 rounded-xl px-3 py-1 text-xs font-bold transition",
                selectedCategory === cat.id
                  ? "bg-cobalt-800 text-white shadow-xs"
                  : "bg-white text-cobalt-700 border border-cobalt-200 hover:bg-cobalt-100",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <span className="text-3xl">🔍</span>
              <p className="mt-2 text-sm font-bold text-cobalt-800">Không tìm thấy nội dung phù hợp</p>
              <p className="mt-1 text-xs text-cobalt-500">
                Thử tìm từ khóa ngắn hơn như "Hè Xanh", "K58", "Flashmob", hoặc "Đông Ấm"
              </p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-2xl p-3 cursor-pointer transition-all duration-150",
                    isSelected
                      ? "bg-tmu-50 border border-tmu-200 shadow-xs"
                      : "hover:bg-cobalt-50/80",
                  )}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base shadow-xs",
                        item.category === "event" && "bg-flame-100 text-flame-600",
                        item.category === "leader" && "bg-glow-300/30 text-cobalt-900",
                        item.category === "dance" && "bg-emerald-100 text-emerald-600",
                        item.category === "memory" && "bg-tmu-100 text-tmu-700",
                        item.category === "section" && "bg-cobalt-100 text-cobalt-800",
                      )}
                    >
                      {item.category === "event" && "🎪"}
                      {item.category === "leader" && "👤"}
                      {item.category === "dance" && "💃"}
                      {item.category === "memory" && "📸"}
                      {item.category === "section" && "📌"}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-cobalt-950">{item.title}</p>
                        {item.badge && (
                          <span className="shrink-0 rounded-md bg-cobalt-100 px-1.5 py-0.5 text-[10px] font-bold text-cobalt-700">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-cobalt-600">{item.subtitle}</p>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs font-semibold text-tmu-600">
                    {isSelected ? "Enter ↵" : ""}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-cobalt-100 bg-cobalt-50/70 px-4 py-2.5 text-[11px] text-cobalt-600">
          <span>Tìm thấy <b>{filtered.length}</b> kết quả</span>
          <div className="flex items-center gap-3">
            <span>↑↓ di chuyển</span>
            <span>↵ chọn</span>
            <span>esc đóng</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickSearchModal;
