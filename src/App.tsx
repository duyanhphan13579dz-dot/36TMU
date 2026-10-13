import { useCallback, useEffect, useRef, useState } from "react";
import Nav, { useActiveSection } from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import DanceLab from "@/components/DanceLab";
import Gallery from "@/components/Gallery";
import Contact, { Footer } from "@/components/Contact";
import { Toast } from "@/components/ui";
import { NAV_ITEMS, ORG, type NavId } from "@/data/content";

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
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
      io.observe(el);
    });

    // Fallback: đảm bảo các element hiển thị sau khi load trang
    const timerId = window.setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add("is-visible");
        }
      });
    }, 600);

    return () => {
      io.disconnect();
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-sky-paper">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-xl focus:bg-cobalt-900 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Bỏ qua tới nội dung chính
      </a>
      <Nav active={active} />

      <main>
        <Hero />

        {/* Dải ranh giới trang trí */}
        <Divider />

        <About />
        <Events onToast={pushToast} />
        <DanceLab onToast={pushToast} />
        <Gallery onToast={pushToast} />
        <Contact onToast={pushToast} />
      </main>

      <Footer />
      <Toast message={toast} />
    </div>
  );
}

function Divider() {
  return (
    <div className="relative border-y border-cobalt-100 bg-white/60 py-3">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-tmu-200 sm:block" />
        <p className="text-center text-[11px] font-bold tracking-[0.2em] text-tmu-700 uppercase sm:text-[12.5px]">
          {ORG.slogan}
        </p>
        <span className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-tmu-200 sm:block" />
      </div>
    </div>
  );
}
