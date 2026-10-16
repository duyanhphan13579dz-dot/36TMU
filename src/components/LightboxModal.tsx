import { useEffect, useState } from "react";
import { useLockScroll, useEscape } from "@/components/ui";
import { useSwipe } from "@/hooks/useSwipe";
import { cn } from "@/utils/cn";

export interface LightboxItem {
  id: string;
  src: string;
  title: string;
  tag: string;
  caption: string;
}

interface LightboxModalProps {
  open: boolean;
  currentIndex: number;
  items: LightboxItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function LightboxModal({
  open,
  currentIndex,
  items,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useLockScroll(open);
  useEscape(open, () => {
    if (isZoomed) {
      setIsZoomed(false);
    } else {
      onClose();
    }
  });

  const currentItem = items[currentIndex];

  // Reset zoom & loading when switching images
  useEffect(() => {
    setIsZoomed(false);
    setIsImageLoading(true);
  }, [currentIndex]);

  const handlePrev = () => {
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % items.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "z" || e.key === "Z") setIsZoomed((z) => !z);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, currentIndex, items.length]);

  // Touch gestures for mobile
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (!isZoomed) handleNext();
    },
    onSwipeRight: () => {
      if (!isZoomed) handlePrev();
    },
    onSwipeDown: () => {
      if (!isZoomed) onClose();
    },
  });

  const handleDownload = async () => {
    if (!currentItem) return;
    try {
      // Create temporary anchor to download
      const response = await fetch(currentItem.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `BLLSV_TMU_${currentItem.tag}_${currentItem.title.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      // Fallback: open in new tab
      window.open(currentItem.src, "_blank");
    }
  };

  if (!open || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-[250] flex flex-col bg-cobalt-950/95 backdrop-blur-xl animate-[fadeIn_.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      {...swipeHandlers}
    >
      {/* ===== TOP BAR ===== */}
      <div className="relative z-20 flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-flame-500/20 px-3 py-1 text-xs font-bold text-flame-400 ring-1 ring-flame-500/40">
            {currentItem.tag}
          </span>
          <span className="text-xs font-semibold text-white/70">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom toggle button */}
          <button
            onClick={() => setIsZoomed((z) => !z)}
            title={isZoomed ? "Thu nhỏ (Z)" : "Phóng to (Z)"}
            className={cn(
              "flex h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-bold transition",
              isZoomed
                ? "bg-flame-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20",
            )}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              {isZoomed ? (
                <>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </>
              ) : (
                <>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </>
              )}
            </svg>
            <span className="hidden sm:inline">{isZoomed ? "Thu nhỏ" : "Phóng to"}</span>
          </button>

          {/* Download button */}
          <button
            onClick={handleDownload}
            title="Tải ảnh gốc"
            className="flex h-10 items-center gap-1.5 rounded-xl bg-white/10 px-3 text-xs font-bold text-white transition hover:bg-white/20 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="hidden sm:inline">Tải ảnh</span>
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            title="Đóng (Esc)"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-red-600 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== MAIN IMAGE VIEWER ===== */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6 select-none">
        {/* Loading Spinner */}
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-flame-500" />
          </div>
        )}

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Ảnh trước"
          className="absolute left-3 sm:left-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-cobalt-900/80 text-white shadow-lift backdrop-blur transition hover:scale-110 hover:bg-flame-500 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Ảnh sau"
          className="absolute right-3 sm:right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-cobalt-900/80 text-white shadow-lift backdrop-blur transition hover:scale-110 hover:bg-flame-500 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Image */}
        <div
          className={cn(
            "relative max-h-full max-w-full transition-transform duration-300 ease-out",
            isZoomed ? "scale-150 cursor-zoom-out sm:scale-[1.8]" : "cursor-zoom-in",
          )}
          onClick={() => setIsZoomed((z) => !z)}
        >
          <img
            src={currentItem.src}
            alt={currentItem.title}
            onLoad={() => setIsImageLoading(false)}
            className="max-h-[68vh] max-w-full rounded-2xl object-contain shadow-2xl transition-opacity duration-300"
            style={{ opacity: isImageLoading ? 0.3 : 1 }}
          />
        </div>
      </div>

      {/* ===== BOTTOM DETAILS & THUMBNAIL STRIP ===== */}
      <div className="relative z-20 border-t border-white/10 bg-cobalt-950/80 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="font-display text-base font-extrabold text-white sm:text-lg">
            {currentItem.title}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-sm">
            {currentItem.caption}
          </p>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setIsZoomed(false);
                onNavigate(idx);
              }}
              className={cn(
                "relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200",
                currentIndex === idx
                  ? "border-flame-500 scale-105 shadow-glow"
                  : "border-white/20 opacity-50 hover:opacity-100",
              )}
            >
              <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <p className="mt-1 text-center text-[10px] text-white/40 hidden sm:block">
          Dùng phím mũi tên ← → để chuyển ảnh • Phím Z để phóng to • Phím ESC hoặc vuốt xuống để đóng
        </p>
      </div>
    </div>
  );
}

export default LightboxModal;
