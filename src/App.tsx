import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import Nav, { useActiveSection } from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import DanceLab from "@/components/DanceLab";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toast } from "@/components/ui";
import BroadcastBanner from "@/components/BroadcastBanner";
import { NAV_ITEMS, type NavId } from "@/data/content";
import { getStoredAdminMotto, hydrateSiteDataFromDb } from "@/data/adminStore";

const AdminPanel = lazy(() => import("@/components/AdminPanel"));
const QuickSearchModal = lazy(() =>
  import("@/components/QuickSearchModal").then((m) => ({ default: m.QuickSearchModal }))
);
const VolunteerRecruitmentModal = lazy(() => import("@/components/VolunteerRecruitmentModal"));

const SECTION_IDS: NavId[] = NAV_ITEMS.map((n) => n.id);

export default function App() {
  const active = useActiveSection(SECTION_IDS);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const pushToast = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 3800);
  }, []);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  // Lắng nghe thông báo toast từ các module nền / storage guard
  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const custom = e as CustomEvent<{ message: string }>;
      if (custom.detail?.message) pushToast(custom.detail.message);
    };
    window.addEventListener("bllsv_toast", handleToastEvent);
    return () => window.removeEventListener("bllsv_toast", handleToastEvent);
  }, [pushToast]);

  const [isAdmin, setIsAdmin] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRecruitOpen, setIsRecruitOpen] = useState(false);

  // Tự động kết nối và nạp dữ liệu Ban Chấp Hành mới nhất từ Neon PostgreSQL Database
  useEffect(() => {
    hydrateSiteDataFromDb();
  }, []);

  // Lắng nghe sự kiện bật/tắt tìm kiếm nhanh (Ctrl+K)
  useEffect(() => {
    const handleToggleSearch = () => setIsSearchOpen((prev) => !prev);
    window.addEventListener("bllsv_toggle_search", handleToggleSearch);
    return () => window.removeEventListener("bllsv_toggle_search", handleToggleSearch);
  }, []);

  // Lắng nghe sự kiện mở modal tuyển tình nguyện viên
  useEffect(() => {
    const handleOpenRecruit = () => setIsRecruitOpen(true);
    window.addEventListener("bllsv_open_recruit", handleOpenRecruit);
    return () => window.removeEventListener("bllsv_open_recruit", handleOpenRecruit);
  }, []);

  // Lắng nghe sự kiện đồng bộ dữ liệu admin trên toàn website
  useEffect(() => {
    const handleDataUpdated = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleDataUpdated);
    return () => window.removeEventListener("bllsv_data_updated", handleDataUpdated);
  }, []);

  /* Micro-interaction: các khối [data-reveal] hiện mượt mà khi cuộn tới */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" },
    );

    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 3, 2) * 45}ms`;
      io.observe(el);
    });

    return () => {
      io.disconnect();
    };
  }, [dataVersion]);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-sky-paper">
      {/* Banner thông báo chế độ Quản trị viên */}
      {isAdmin && (
        <div className="sticky top-0 z-[120] flex items-center justify-between gap-2 bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lift sm:px-4 sm:py-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="animate-pulse text-sm sm:text-base shrink-0">⚙️</span>
            <span className="hidden sm:inline truncate">
              PHIÊN BAN CHẤP HÀNH (ADMIN MODE): Bạn có quyền đăng thông báo mới, cập nhật chương trình, đội ngũ BCH, châm ngôn và nội quy mới.
            </span>
            <span className="sm:hidden text-[11px] font-bold truncate">
              ADMIN MODE: Ban Chấp Hành
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("bllsv_open_admin"))}
              className="rounded-lg bg-white px-2 py-1 text-[10.5px] font-bold text-red-700 shadow-xs transition hover:bg-white/90 sm:px-2.5 sm:text-[11px]"
            >
              <span className="hidden sm:inline">Mở Bảng Điều Khiển</span>
              <span className="sm:hidden">Bảng Quản Trị</span>
            </button>
            <button
              onClick={() => {
                setIsAdmin(false);
                pushToast("Đã thoát phiên làm việc Ban Chấp Hành");
              }}
              className="rounded-lg bg-white/20 px-2 py-1 text-[10.5px] font-bold text-white transition hover:bg-white/30 sm:px-2.5 sm:text-[11px]"
            >
              Thoát
            </button>
          </div>
        </div>
      )}

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-xl focus:bg-cobalt-900 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Bỏ qua tới nội dung chính
      </a>

      <BroadcastBanner />

      <Nav active={active} isAdmin={isAdmin} />

      <main>
        <Hero />

        {/* Dải ranh giới trang trí với Slogan / Châm ngôn cập nhật mới nhất của BCH */}
        <Divider />

        <About />
        <Events onToast={pushToast} />
        <DanceLab onToast={pushToast} />
        <Gallery onToast={pushToast} />
        <Contact isAdmin={isAdmin} onToast={pushToast} />
      </main>

      <Footer isAdmin={isAdmin} />
      
      {/* Cổng Quản Trị Viên & các Modal lazy-loaded */}
      <Suspense fallback={null}>
        <AdminPanel
          isAdmin={isAdmin}
          onLogin={() => setIsAdmin(true)}
          onLogout={() => setIsAdmin(false)}
          onToast={pushToast}
          onPostCreated={() => setDataVersion((v) => v + 1)}
        />

        {/* Modal ứng tuyển tình nguyện viên 3 Ban trực thuộc Đội SVTN */}
        {isRecruitOpen && (
          <VolunteerRecruitmentModal
            open={isRecruitOpen}
            onClose={() => setIsRecruitOpen(false)}
            onToast={pushToast}
          />
        )}

        {/* Modal tìm kiếm nhanh toàn diện (Spotlight / Ctrl+K) */}
        {isSearchOpen && (
          <QuickSearchModal
            open={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectMemory={(index) => {
              window.dispatchEvent(new CustomEvent("bllsv_open_memory_lightbox", { detail: { index } }));
              const el = document.getElementById("memories");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        )}
      </Suspense>

      <Toast message={toast} />
    </div>
  );
}

function Divider() {
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  const motto = getStoredAdminMotto();
  return (
    <div key={dataVersion} className="relative border-y border-cobalt-100 bg-white/60 py-3">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-tmu-200 sm:block" />
        <p className="text-center text-[11px] font-bold tracking-[0.2em] text-tmu-700 uppercase sm:text-[12.5px]">
          {motto.slogan}
        </p>
        <span className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-tmu-200 sm:block" />
      </div>
    </div>
  );
}
