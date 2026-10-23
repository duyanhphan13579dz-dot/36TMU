import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { BANS, ORG, VOLUNTEER_TEAM } from "@/data/content";
import { Button, Icon } from "@/components/ui";
import { getStoredAdminMotto, getStoredAdminRules } from "@/data/adminStore";

const AboutVaultModal = lazy(() => import("@/components/AboutVaultModal"));

interface AboutProps {
  onToast?: (msg: string) => void;
}

export default function About({ onToast }: AboutProps) {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [vaultTab, setVaultTab] = useState<"org" | "culture" | "rules">("org");
  const [dataVersion, setDataVersion] = useState(0);

  const triggerToast = (msg: string) => {
    if (onToast) onToast(msg);
    else window.dispatchEvent(new CustomEvent("bllsv_toast", { detail: { message: msg } }));
  };

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  // Lắng nghe mở kho từ thanh tìm kiếm hoặc link điều hướng
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const ce = e as CustomEvent<{ tab?: "org" | "culture" | "rules" }>;
      if (ce.detail?.tab) setVaultTab(ce.detail.tab);
      setVaultOpen(true);
    };
    window.addEventListener("bllsv_open_about_vault", handleOpen);
    return () => window.removeEventListener("bllsv_open_about_vault", handleOpen);
  }, []);

  const motto = useMemo(() => getStoredAdminMotto(), [dataVersion]);
  const rules = useMemo(() => getStoredAdminRules(), [dataVersion]);

  const openVault = (tab: "org" | "culture" | "rules") => {
    setVaultTab(tab);
    setVaultOpen(true);
    if (tab === "org") triggerToast("Đang mở Cơ Cấu & 3 Ban Chuyên Môn... 🛡️");
    else if (tab === "culture") triggerToast("Đang mở Nghi Thức & Tinh Thần 36... ⭕");
    else triggerToast("Đang mở Bảng Nội Quy & Quy Chế... 📜");
  };

  return (
    <section id="about" className="relative overflow-hidden py-14 sm:py-18 lg:py-24 scroll-mt-20 md:scroll-mt-24 content-auto">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white" />
      <div className="pointer-events-none absolute top-1/4 -left-24 -z-10 h-72 w-72 rounded-full bg-flame-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-24 -z-10 h-80 w-80 rounded-full bg-tmu-200/30 blur-3xl" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        {/* ===== BLOCK SHOWCASE KHO TRUYỀN THỐNG & TỔ CHỨC 36 GỌN GÀNG & ĐẲNG CẤP ===== */}
        <div className="relative overflow-hidden rounded-3xl border border-cobalt-800/80 bg-gradient-to-br from-cobalt-950 via-cobalt-900 to-tmu-950 p-6 text-white shadow-lift sm:p-10 lg:p-12">
          {/* Background decorative glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-flame-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-tmu-500/25 blur-3xl" />

          <div className="relative z-10">
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-flame-400/40 bg-flame-950/70 px-3 py-1 text-[11px] font-bold tracking-wider text-flame-300 uppercase shadow-xs">
                🏛️ Kho Truyền Thống &amp; Tổ Chức 36
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur shadow-xs">
                Thành lập 12/04/2008 • Đội SVTN &amp; 3 Ban Chuyên Môn
              </span>
            </div>

            {/* Title & Desc */}
            <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div>
                <h2 className="text-balance-vn font-display text-2xl leading-tight font-black sm:text-3xl lg:text-4xl text-white">
                  “Mái nhà thứ hai” của người xứ Thanh{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-flame-400 to-amber-300">
                    tại 79 Hồ Tùng Mậu
                  </span>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-cobalt-200 sm:text-base">
                  Từ ngày đầu thành lập 12/04/2008, nhà chung hôm nay là nơi liên lạc, gắn kết và đồng hành cùng hàng nghìn
                  sinh viên Thanh Hóa tại TMU. Dưới sự điều phối của Đội SVTN cùng 3 ban chuyên môn, chúng mình cùng nhau thắp sáng ngọn lửa tình nguyện.
                </p>
              </div>

              {/* Thống kê nhanh kho (Vault Metrics Strip) */}
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-flame-400">12/04</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Năm 2008</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-white">3 Ban</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Chuyên môn</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-tmu-400">20 Trường</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Hội ĐH Thanh Hóa</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                  <div className="font-display text-xl font-black text-emerald-400">{rules.rules.length} Điều</div>
                  <div className="text-[11px] text-cobalt-300 font-medium">Nội quy chuẩn</div>
                </div>
              </div>
            </div>

            {/* Showcase 4 Thẻ Đơn Vị: Đội SVTN & 3 Ban Chuyên Môn */}
            <div className="mt-8">
              <div className="flex items-center justify-between pb-3">
                <p className="text-xs font-bold tracking-wider text-cobalt-300 uppercase">
                  🛡️ Cơ cấu tổ chức: Đội SVTN quản lý 3 ban chuyên môn
                </p>
                <button
                  type="button"
                  onClick={() => openVault("org")}
                  className="hidden text-xs font-bold text-flame-400 hover:text-flame-300 sm:inline-flex items-center gap-1 transition"
                >
                  Xem chi tiết cơ cấu <span>➔</span>
                </button>
              </div>

              <div className="scrollbar-none -mx-2 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-2 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
                {/* 1. Đội SVTN */}
                <div
                  onClick={() => openVault("org")}
                  className="group relative flex min-w-[78%] sm:min-w-0 shrink-0 snap-center cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-flame-400/40 bg-gradient-to-br from-flame-950/60 to-cobalt-900/60 p-4 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-flame-400 hover:bg-white/15"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{VOLUNTEER_TEAM.emoji}</span>
                      <span className="rounded-full bg-flame-500/80 px-2.5 py-0.5 text-[10px] font-bold text-white">
                        Điều Phối Trực Tiếp
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-bold text-white group-hover:text-flame-300 transition-colors">
                      {VOLUNTEER_TEAM.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-cobalt-200">
                      {VOLUNTEER_TEAM.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] font-bold text-flame-300">
                    <span>Xem nhiệm vụ Đội</span>
                    <span className="transition-transform group-hover:translate-x-1">➔</span>
                  </div>
                </div>

                {/* 2. 3 Ban chuyên môn */}
                {BANS.map((ban) => (
                  <div
                    key={ban.id}
                    onClick={() => openVault("org")}
                    className="group relative flex min-w-[78%] sm:min-w-0 shrink-0 snap-center cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tmu-400/50 hover:bg-white/15"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{ban.emoji}</span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-cobalt-200">
                          Ban Chuyên Môn
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-bold text-white group-hover:text-tmu-300 transition-colors">
                        {ban.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-cobalt-200">
                        {ban.tagline}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] font-bold text-tmu-300">
                      <span>Nhiệm vụ &amp; Ứng tuyển</span>
                      <span className="transition-transform group-hover:translate-x-1">➔</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="sm:hidden text-center text-[11px] text-cobalt-400 mt-2">
                👆 Vuốt ngang để xem tiếp các ban chuyên môn
              </p>
            </div>

            {/* Trích đoạn Slogan & Tinh thần 36 */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭕</span>
                  <div>
                    <p className="text-xs font-bold text-flame-300 uppercase tracking-wider">
                      Khẩu hiệu thiêng liêng {motto.term}
                    </p>
                    <p className="font-display text-sm sm:text-base font-bold text-white">
                      “{motto.slogan}”
                    </p>
                  </div>
                </div>
                <div className="text-xs text-cobalt-300 sm:text-right">
                  <span>🍚 Mời cơm: </span>
                  <span className="italic text-white">“{ORG.mealCheer}”</span>
                </div>
              </div>
            </div>

            {/* ===== CTA CHÍNH ĐỂ MỞ KHO TRUYỀN THỐNG & TỔ CHỨC ===== */}
            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/15 bg-gradient-to-r from-flame-500/20 via-white/5 to-emerald-500/20 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-flame-500 to-amber-600 text-2xl shadow-soft">
                  🏛️
                </span>
                <div>
                  <h4 className="text-base font-bold text-white sm:text-lg">
                    Khám phá Kho Truyền Thống &amp; Tổ Chức 36
                  </h4>
                  <p className="text-xs text-cobalt-300 sm:text-[13px]">
                    Toàn văn cơ cấu 3 Ban, nghi thức khẩu hiệu thiêng liêng và {rules.rules.length} điều khoản nội quy chính thức.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 shrink-0">
                <Button
                  variant="flame"
                  size="md"
                  className="flex-1 sm:flex-initial shadow-soft"
                  onClick={() => openVault("org")}
                >
                  🛡️ Cơ Cấu &amp; 3 Ban
                  <Icon.arrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => openVault("culture")}
                >
                  ⭕ Nghi thức 36
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => openVault("rules")}
                >
                  📜 Bảng Nội Quy ({rules.rules.length})
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODAL KHO TRUYỀN THỐNG TOÀN MÀN HÌNH (ABOUT VAULT MODAL) ===== */}
      <Suspense fallback={null}>
        <AboutVaultModal
          open={vaultOpen}
          onClose={() => setVaultOpen(false)}
          initialTab={vaultTab}
          onToast={triggerToast}
        />
      </Suspense>
    </section>
  );
}
