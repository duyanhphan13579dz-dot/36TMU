import React, { useEffect } from "react";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ *
 *  Khóa scroll nền khi Drawer / Modal mở (cả mobile & desktop)
 * ------------------------------------------------------------------ */
export function useLockScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}

/* ------------------------------------------------------------------ *
 *  Lắng nghe phím Escape
 * ------------------------------------------------------------------ */
export function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, onClose]);
}

/* ------------------------------------------------------------------ *
 *  Nhãn chương trình (kicker)
 * ------------------------------------------------------------------ */
export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cobalt-900 shadow-xs ring-1 ring-cobalt-200 sm:text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  desc,
  align = "left",
  action,
}: {
  kicker: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl space-y-3", align === "center" && "flex flex-col items-center")}>
        <Kicker>{kicker}</Kicker>
        <h2 className="text-balance-vn text-2xl leading-tight font-black text-cobalt-950 sm:text-3xl lg:text-[2.6rem]">
          {title}
        </h2>
        {desc ? <p className="text-sm leading-relaxed font-medium text-cobalt-800 sm:text-base">{desc}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Nút chuẩn – target cảm ứng tối thiểu 44px
 * ------------------------------------------------------------------ */
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "ghost" | "flame" | "outline" | "soft";
    size?: "md" | "lg";
    as?: "button" | "a";
    href?: string;
  };

export function Button({
  variant = "primary",
  size = "md",
  as = "button",
  className,
  children,
  ...rest
}: BtnProps) {
  const base =
    "group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tmu-500 active:scale-[0.97] sm:min-h-12";
  const sizes = {
    md: "px-5",
    lg: "px-6 text-base sm:px-7 sm:min-h-14",
  };
  const variants = {
    primary:
      "bg-cobalt-800 text-white shadow-soft hover:bg-cobalt-700 hover:shadow-lift hover:-translate-y-0.5",
    flame:
      "bg-gradient-to-r from-flame-500 to-flame-400 text-white shadow-soft hover:shadow-lift hover:-translate-y-0.5",
    outline:
      "border-2 border-cobalt-200 bg-white/70 text-cobalt-800 hover:border-tmu-400 hover:bg-white hover:-translate-y-0.5",
    soft: "bg-tmu-100 text-cobalt-800 hover:bg-tmu-200",
    ghost: "text-cobalt-700 hover:bg-cobalt-800/5",
  };
  const cls = cn(base, sizes[size], variants[variant], className);
  if (as === "a") {
    const { type: _t, ...anchorRest } = rest as Record<string, unknown>;
    return (
      <a className={cls} {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  const { href: _h, target: _tg, rel: _r, ...btnRest } = rest as Record<string, unknown>;
  return (
    <button className={cls} {...(btnRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 *  Modal / Full-screen sheet
 *  - Mobile (<md): bottom sheet bung trọn màn hình, kéo lên mượt
 *  - Desktop: dialog căn giữa, max-w & scroll riêng
 * ------------------------------------------------------------------ */
export function Sheet({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  useLockScroll(open);
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <button
        aria-label="Đóng"
        onClick={onClose}
        className="absolute inset-0 animate-[fadeIn_.25s_ease-out] bg-cobalt-950/70 backdrop-blur-sm"
      />
      <div className="relative z-10 flex max-h-[94dvh] w-full animate-[sheetUp_.36s_cubic-bezier(.22,1,.36,1)] flex-col overflow-hidden rounded-t-3xl bg-white shadow-lift md:max-h-[88vh] md:max-w-4xl md:rounded-3xl md:animate-[popIn_.3s_cubic-bezier(.22,1,.36,1)]">
        <button
          onClick={onClose}
          aria-label="Đóng hộp thoại"
          className="absolute top-3 right-3 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-cobalt-800 shadow-soft backdrop-blur transition hover:bg-flame-500 hover:text-white active:scale-95 md:top-4 md:right-4"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {children}
      </div>
      <style>{`
        @keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes popIn { from { transform: scale(.94); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Toast thông báo nhẹ nhàng
 * ------------------------------------------------------------------ */
export function Toast({ message }: { message: string | null }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-24 z-[200] flex justify-center transition-all duration-300 md:bottom-8",
        message ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      role="status"
      aria-live="polite"
    >
      {message ? (
        <div className="flex max-w-md items-center gap-3 rounded-2xl bg-cobalt-900/95 px-4 py-3 text-sm font-medium text-white shadow-lift backdrop-blur">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-flame-500 text-base">✓</span>
          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Icon set nhỏ (SVG stroke) – không cần thêm dependency
 * ------------------------------------------------------------------ */
export const Icon = {
  home: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  ),
  users: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20c.6-3.6 3.1-5.6 6.2-5.6S15.6 16.4 16.2 20" />
      <path d="M16.5 5.4a3 3 0 0 1 0 5.6M18.4 14.6c2 .8 3.2 2.6 3.5 5" />
    </svg>
  ),
  calendar: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path d="M8 14h3M8 17.5h6" />
    </svg>
  ),
  music: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="18" r="2.6" />
      <circle cx="18" cy="16" r="2.6" />
      <path d="M9.6 18V7l11-2v11" />
    </svg>
  ),
  camera: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.9l1.2-2h6.8l1.2 2h1.9A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  ),
  chat: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.5c0 4-4 7-9 7-1.1 0-2.2-.15-3.2-.43L4 21l1.1-3.4C3.8 16.3 3 14.5 3 12.5c0-4 4-7 9-7s9 3 9 7z" />
      <path d="M8.5 11.5h7M8.5 14.5h4" />
    </svg>
  ),
  play: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
      <path d="M8 5.2v13.6c0 .9 1 1.4 1.7.9l10-6.8c.6-.4.6-1.4 0-1.8l-10-6.8C9 3.8 8 4.3 8 5.2z" />
    </svg>
  ),
  pause: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
      <rect x="6" y="4.5" width="4" height="15" rx="1.4" />
      <rect x="14" y="4.5" width="4" height="15" rx="1.4" />
    </svg>
  ),
  mirror: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" strokeDasharray="3 3" />
      <path d="M8.5 7.5 4 12l4.5 4.5" />
      <path d="M15.5 7.5 20 12l-4.5 4.5" />
    </svg>
  ),
  download: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5v11" />
      <path d="M7.5 10.5 12 15l4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  ),
  expand: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
    </svg>
  ),
  copy: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  pin: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  arrowRight: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  ),
  chevron: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
  facebook: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.25-1.5 1.5-1.5h1.6V4.4A21 21 0 0 0 14.4 4c-2.3 0-3.9 1.4-3.9 4v2.5H8v3h2.5V21z" />
    </svg>
  ),
  tiktok: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
      <path d="M16.6 3h-2.9v11.2a2.3 2.3 0 1 1-1.9-2.26V9a5.2 5.2 0 1 0 4.8 5.18V8.6a5.4 5.4 0 0 0 3.2 1.05V6.7a3.4 3.4 0 0 1-3.2-3.2z" />
    </svg>
  ),
  mail: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 5.5L20 7" />
    </svg>
  ),
  heart: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="currentColor">
      <path d="M12 20.5S3.5 15 3.5 9.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.4c0 5.6-8.5 11.1-8.5 11.1z" />
    </svg>
  ),
};
