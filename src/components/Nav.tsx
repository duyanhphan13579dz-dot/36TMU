import { useEffect, useState } from "react";
import { NAV_ITEMS, ORG, type NavId } from "@/data/content";
import { LogoLockup } from "@/components/Logo";
import { Button, Icon, useEscape, useLockScroll } from "@/components/ui";
import { cn } from "@/utils/cn";

export function useActiveSection<T extends string>(ids: readonly T[]): T {
  const [active, setActive] = useState<T>(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  return active;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { progress, scrolled };
}

const MOBILE_TABS = [
  { id: "home", label: "Trang chủ", icon: Icon.home },
  { id: "events", label: "Hoạt động", icon: Icon.calendar },
  { id: "dance", label: "Bài nhảy", icon: Icon.music },
  { id: "memories", label: "Kỷ niệm", icon: Icon.camera },
] as const;

export default function Nav({
  active,
}: {
  active: NavId;
  isAdmin?: boolean;
  onLoginAdmin?: () => void;
  onLogoutAdmin?: () => void;
  onToast?: (msg: string) => void;
  onPostCreated?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { progress, scrolled } = useScrollProgress();
  useLockScroll(open);
  useEscape(open, () => setOpen(false));

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  };

  return (
    <>
      {/* ===== Thanh tiến trình đọc ===== */}
      <div className={cn("fixed inset-x-0 z-[100] h-[3px] bg-transparent transition-all duration-300", isAdmin ? "top-10 sm:top-9" : "top-0")}>
        <div
          className="h-full bg-gradient-to-r from-tmu-400 via-flame-500 to-glow-400 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* ===== Navbar (glassmorphism) ===== */}
      <header
        className={cn(
          "fixed inset-x-0 z-[95] transition-all duration-300",
          isAdmin ? "top-10 sm:top-9" : "top-[3px]",
          scrolled ? "py-1.5" : "py-3",
        )}
      >
        <div className="mx-auto w-full max-w-[1400px] px-3 sm:px-5">
          <nav
            className={cn(
              "flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 transition-all duration-300 sm:px-4",
              scrolled
                ? "border-cobalt-100 bg-white/95 shadow-soft backdrop-blur-xl"
                : "border-white/80 bg-white/90 shadow-soft backdrop-blur-lg",
            )}
          >
            <LogoLockup />

            {/* Menu desktop */}
            <ul className="hidden items-center gap-0.5 xl:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.id)}
                      className={cn(
                        "group relative flex min-h-11 items-center gap-1.5 rounded-xl px-3.5 text-sm font-semibold transition-colors",
                        isActive ? "text-cobalt-950 font-bold" : "text-cobalt-800 hover:text-flame-600",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-all duration-300",
                          isActive ? "scale-100 bg-flame-500" : "scale-0 bg-tmu-400 group-hover:scale-100",
                        )}
                      />
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-[3px] origin-left rounded-full bg-gradient-to-r from-tmu-500 to-flame-500 transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                      <span className="pointer-events-none absolute -bottom-9 left-1/2 z-20 -translate-x-1/2 scale-90 rounded-lg bg-cobalt-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-soft transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                        #{item.id}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              {/* Nút tìm kiếm nhanh */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("bllsv_toggle_search"))}
                title="Tìm kiếm nhanh (Ctrl + K)"
                className="flex h-11 items-center gap-2 rounded-xl border border-cobalt-200 bg-white/80 px-3 text-xs font-bold text-cobalt-700 shadow-xs backdrop-blur transition hover:border-tmu-400 hover:bg-white hover:text-cobalt-950 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-cobalt-500" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="hidden sm:inline">Tìm kiếm</span>
                <kbd className="hidden lg:inline-flex items-center rounded-md border border-cobalt-200 bg-cobalt-50 px-1.5 py-0.5 text-[10px] font-semibold text-cobalt-500">
                  Ctrl K
                </kbd>
              </button>

              <Button
                as="a"
                href="#contact"
                variant="flame"
                className="hidden lg:inline-flex"
              >
                Góc TNV
                <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(true)}
                aria-label="Mở menu điều hướng"
                aria-expanded={open}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-cobalt-200 bg-white text-cobalt-800 shadow-sm transition hover:border-tmu-400 hover:bg-tmu-50 active:scale-95 xl:hidden"
              >
                <span className="flex flex-col gap-[5px]">
                  <span className="block h-[2.5px] w-5 rounded-full bg-current" />
                  <span className="block h-[2.5px] w-5 rounded-full bg-current" />
                  <span className="block h-[2.5px] w-3.5 rounded-full bg-flame-500" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ===== Drawer toàn màn hình (mobile) ===== */}
      <div className={cn("fixed inset-0 z-[130] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-cobalt-950/60 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={cn(
            "absolute inset-0 flex flex-col overflow-y-auto bg-gradient-to-b from-white via-tmu-50 to-cobalt-50 transition-transform duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] sm:inset-y-0 sm:left-auto sm:w-[88%] sm:max-w-sm sm:rounded-l-3xl sm:shadow-lift",
            open ? "translate-x-0" : "translate-x-full",
          )}
          aria-hidden={!open}
        >
          <div className="flex items-center justify-between border-b border-cobalt-100 px-5 py-4">
            <LogoLockup compact />
            <button
              onClick={() => setOpen(false)}
              aria-label="Đóng menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-cobalt-800/5 text-cobalt-800 transition hover:bg-flame-500 hover:text-white active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-4 py-5">
            {/* Quick Search trong drawer mobile */}
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => window.dispatchEvent(new CustomEvent("bllsv_toggle_search")), 200);
              }}
              className="mb-4 flex w-full items-center gap-3 rounded-2xl border border-cobalt-200 bg-white px-3.5 py-2.5 text-left shadow-xs transition hover:border-tmu-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cobalt-100 text-cobalt-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-cobalt-950">Tìm kiếm nhanh...</p>
                <p className="text-[10px] text-cobalt-500 truncate">Chương trình, BCH, bài nhảy...</p>
              </div>
              <span className="rounded-lg bg-cobalt-50 px-2 py-1 text-[10px] font-bold text-cobalt-600">
                Tìm ↵
              </span>
            </button>

            <p className="px-2 pb-3 text-[11px] font-bold tracking-[0.2em] text-tmu-600 uppercase">Điều hướng</p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item, i) => {
                const ItemIcon = Icon[item.icon];
                const isActive = active === item.id;
                return (
                  <li
                    key={item.id}
                    style={{ transitionDelay: `${90 + i * 45}ms` }}
                    className={cn(
                      "transition-all duration-500",
                      open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                    )}
                  >
                    <button
                      onClick={() => go(item.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all active:scale-[0.98]",
                        isActive
                          ? "border-flame-300 bg-gradient-to-r from-flame-50 to-white shadow-soft"
                          : "border-white bg-white/70 hover:border-tmu-200 hover:bg-white",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition",
                          isActive ? "bg-gradient-to-br from-flame-500 to-flame-600" : "bg-gradient-to-br from-tmu-400 to-cobalt-600",
                        )}
                      >
                        <ItemIcon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-base font-bold text-cobalt-900">{item.label}</span>
                        <span className="block truncate text-xs text-cobalt-600/70">Phần #{i + 1} của trang</span>
                      </span>
                      <Icon.chevron className="h-4 w-4 text-cobalt-400" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 rounded-2xl border border-cobalt-100 bg-white/80 p-4">
              <p className="font-display text-sm font-bold text-cobalt-900">Slogan nhà chung</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-cobalt-700/80 italic">“{ORG.slogan}”</p>
            </div>
          </nav>

          <div className="sticky bottom-0 space-y-3 border-t border-cobalt-100 bg-white/90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
            <Button as="a" href="#contact" onClick={() => setOpen(false)} variant="flame" size="lg" className="w-full">
              Góc TNV & Lời nhắn
              <Icon.arrowRight className="h-4 w-4" />
            </Button>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Fanpage", href: ORG.fanpage },
                { label: "Group", href: ORG.group },
                { label: "TikTok", href: ORG.tiktok },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center justify-center rounded-xl bg-cobalt-800/5 text-xs font-semibold text-cobalt-800 transition hover:bg-cobalt-800 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ===== Bottom navigation (mobile, tiện ngón tay cái) ===== */}
      <div className="fixed inset-x-0 bottom-0 z-[90] pb-[env(safe-area-inset-bottom)] xl:hidden">
        <div className="mx-3 mb-3 flex items-end justify-between gap-1 rounded-3xl border border-white/70 bg-white/90 px-2 py-2 shadow-lift backdrop-blur-xl">
          {MOBILE_TABS.slice(0, 2).map((tab) => (
            <BottomTab key={tab.id} {...tab} active={active === tab.id} onClick={() => go(tab.id)} />
          ))}

          <button
            onClick={() => go("contact")}
            className="relative -mt-7 flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full bg-gradient-to-br from-flame-400 to-flame-600 text-white shadow-lift transition active:scale-95"
            aria-label="Góc TNV & Lời nhắn"
          >
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-flame-400/60" />
            <Icon.heart className="relative h-6 w-6" />
            <span className="relative mt-0.5 text-[9px] font-bold tracking-wide">GÓC TNV</span>
          </button>

          {MOBILE_TABS.slice(2).map((tab) => (
            <BottomTab key={tab.id} {...tab} active={active === tab.id} onClick={() => go(tab.id)} />
          ))}
        </div>
      </div>
    </>
  );
}

function BottomTab({
  label,
  icon: TabIcon,
  active,
  onClick,
}: {
  label: string;
  icon: (p: { className?: string }) => React.ReactElement;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex min-h-[52px] min-w-[52px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 transition-colors",
        active ? "text-cobalt-800" : "text-cobalt-500",
      )}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
          active ? "bg-cobalt-800 text-white shadow-soft" : "bg-transparent",
        )}
      >
        <TabIcon className="h-[18px] w-[18px]" />
      </span>
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}
