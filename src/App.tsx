import { useCallback, useEffect, useRef, useState } from "react";
import Nav, { useActiveSection } from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import DanceLab from "@/components/DanceLab";
import Gallery from "@/components/Gallery";
import Contact, { Footer } from "@/components/Contact";
import AdminPanel from "@/components/AdminPanel";
import { Toast } from "@/components/ui";
import { NAV_ITEMS, type NavId } from "@/data/content";
import { getStoredAdminMotto } from "@/data/adminStore";

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

  // Lắng nghe sự kiện đồng bộ dữ liệu admin trên toàn website
  useEffect(() => {
    const handleDataUpdated = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleDataUpdated);
    return () => window.removeEventListener("bllsv_data_updated", handleDataUpdated);
  }, []);

  /* Micro-interaction: các khối [data-reveal] hiện dần khi cuộn tới */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
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
      { threshold: 0.01, rootMargin: "60px 0px 60px 0px" },
    );
    els.forEach((el, i) => {
      if (!el.classList.contains("is-visible")) {
        el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
        io.observe(el);
      }
    });

    // Fallback: đảm bảo các element hiển thị sau khi load trang
    const timerId = window.setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add("is-visible");
        }
      });
    }, 500);

    return () => {
      io.disconnect();
      window.clearTimeout(timerId);
    };
  }, [dataVersion]);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-sky-paper">
      {/* Banner thông báo chế độ Quản trị viên */}
      {isAdmin && (
        <div className="sticky top-0 z-[120] flex items-center justify-between gap-3 bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lift">
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-base">⚙️</span>
            <span>
              BẢN QUẢN TRỊ VIÊN (ADMIN MODE): Bạn có quyền đăng thông báo mới, cập nhật chương trình, đội ngũ BCH, châm ngôn và nội quy mới.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("bllsv_open_admin"))}
              className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-red-700 shadow-xs transition hover:bg-white/90"
            >
              Mở Bảng Điều Khiển
            </button>
            <button
              onClick={() => {
                setIsAdmin(false);
                pushToast("Đã thoát chế độ Quản trị viên");
              }}
              className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-white/30"
            >
              Thoát Admin
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

      <Nav active={active} />

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

      <Footer />
      
      {/* Cổng Quản Trị Viên thu nhỏ ở góc màn hình */}
      <AdminPanel
        isAdmin={isAdmin}
        onLogin={() => setIsAdmin(true)}
        onLogout={() => setIsAdmin(false)}
        onToast={pushToast}
        onPostCreated={() => setDataVersion((v) => v + 1)}
      />

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
