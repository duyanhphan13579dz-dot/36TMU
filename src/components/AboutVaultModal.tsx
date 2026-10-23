import { useEffect, useMemo, useState } from "react";
import { BANS, ORG, VOLUNTEER_TEAM } from "@/data/content";
import { Button, Icon, useEscape, useLockScroll } from "@/components/ui";
import { getStoredAdminMotto, getStoredAdminRules } from "@/data/adminStore";
import { cn } from "@/utils/cn";

export interface AboutVaultModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: "org" | "culture" | "rules";
  onToast: (msg: string) => void;
}

export default function AboutVaultModal({
  open,
  onClose,
  initialTab = "org",
  onToast,
}: AboutVaultModalProps) {
  const [activeTab, setActiveTab] = useState<"org" | "culture" | "rules">(initialTab);
  const [selectedBan, setSelectedBan] = useState<string>("media");
  const [dataVersion, setDataVersion] = useState(0);

  useLockScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open && initialTab) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  const motto = useMemo(() => getStoredAdminMotto(), [dataVersion]);
  const rules = useMemo(() => getStoredAdminRules(), [dataVersion]);

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
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-flame-500 to-amber-600 text-lg shadow-soft text-white">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base sm:text-lg font-black text-white">
                Kho Truyền Thống &amp; Tổ Chức 36
              </h2>
              <span className="hidden sm:inline-flex rounded-full bg-flame-500/20 border border-flame-400/30 px-2 py-0.5 text-[10.5px] font-bold text-flame-300">
                Tradition &amp; Organization Vault
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-cobalt-300">
              Cơ cấu tổ chức • Nghi thức truyền thống • Nội quy &amp; Quy chế
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-9 w-9 rounded-full p-0 text-white/80 hover:bg-white/10 hover:text-white"
          title="Đóng (Esc)"
        >
          ✕
        </Button>
      </header>

      {/* Thanh điều hướng 3 Tab Kho */}
      <div className="sticky top-[57px] z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-cobalt-900/90 px-4 py-2 sm:px-6 backdrop-blur">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab("org")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-[13px] font-bold transition-all shrink-0 active:scale-95",
              activeTab === "org"
                ? "bg-flame-500 text-white shadow-soft"
                : "bg-white/5 text-cobalt-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <span>🛡️</span>
            <span>Cơ Cấu &amp; 3 Ban Chuyên Môn</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("culture")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-[13px] font-bold transition-all shrink-0 active:scale-95",
              activeTab === "culture"
                ? "bg-tmu-500 text-white shadow-soft"
                : "bg-white/5 text-cobalt-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <span>⭕</span>
            <span>Nghi Thức &amp; Tinh Thần 36</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rules")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-[13px] font-bold transition-all shrink-0 active:scale-95",
              activeTab === "rules"
                ? "bg-emerald-600 text-white shadow-soft"
                : "bg-white/5 text-cobalt-300 hover:bg-white/10 hover:text-white",
            )}
          >
            <span>📜</span>
            <span>Nội Quy &amp; Quy Chế Hoạt Động</span>
          </button>
        </div>
      </div>

      {/* Nội dung chính cuộn theo Tab */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-sky-paper p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* ================= TAB 1: CƠ CẤU & 3 BAN ================= */}
          {activeTab === "org" && (
            <div className="space-y-6">
              {/* ĐỘI SINH VIÊN TÌNH NGUYỆN */}
              <div className="overflow-hidden rounded-3xl border-2 border-flame-300 bg-gradient-to-br from-flame-50 via-white to-sky-50 p-6 shadow-soft sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flame-500 text-2xl text-white shadow-soft">
                        {VOLUNTEER_TEAM.emoji}
                      </span>
                      <div>
                        <span className="inline-flex rounded-full bg-flame-100 px-3 py-0.5 text-[10.5px] font-bold tracking-wider text-flame-700 uppercase">
                          Đơn vị quản lý &amp; điều phối trực tiếp
                        </span>
                        <h3 className="font-display text-xl font-black text-cobalt-950 sm:text-2xl">
                          {VOLUNTEER_TEAM.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed font-medium text-cobalt-800">
                      {VOLUNTEER_TEAM.desc}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-flame-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-flame-800 shadow-xs">
                      <span>🎯</span>
                      <span>
                        Chịu trách nhiệm quản lý toàn bộ tình nguyện viên thuộc 3 ban: Ban Truyền thông, Ban Văn hóa – Sự kiện &amp; Ban Hậu cần
                      </span>
                    </div>
                  </div>

                  {/* Nhiệm vụ của Đội SVTN */}
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:max-w-lg">
                    {VOLUNTEER_TEAM.duties.map((duty, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-2xl border border-cobalt-100 bg-white/95 p-3 text-xs text-cobalt-800 shadow-xs transition hover:border-flame-300"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-flame-500 text-[10px] font-bold text-white">
                          ✓
                        </span>
                        <span className="leading-snug font-medium text-cobalt-900">{duty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 BAN CHUYÊN MÔN: INTERACTIVE SPLIT CARD */}
              <div className="rounded-3xl border border-cobalt-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-cobalt-100 pb-5">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-flame-600 uppercase">
                      Cơ quan chấp hành
                    </span>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-black text-cobalt-950">
                      3 Ban Chuyên Môn Trực Thuộc
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                    {BANS.map((ban) => (
                      <button
                        key={ban.id}
                        onClick={() => setSelectedBan(ban.id)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition active:scale-95 shrink-0",
                          selectedBan === ban.id
                            ? "bg-cobalt-800 text-white shadow-soft"
                            : "border border-cobalt-200 bg-white text-cobalt-700 hover:border-flame-400",
                        )}
                      >
                        <span>{ban.emoji}</span>
                        <span>{ban.name.replace("Ban ", "")}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chi tiết từng Ban */}
                <div className="mt-6">
                  {BANS.map((ban) => {
                    if (ban.id !== selectedBan) return null;
                    return (
                      <div key={ban.id} className="space-y-6 animate-[fadeIn_.2s_ease-out]">
                        <div className={cn("rounded-2xl bg-gradient-to-br p-6 text-white shadow-soft", ban.accent)}>
                          <div className="flex items-center justify-between">
                            <span className="text-4xl">{ban.emoji}</span>
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                              Ban Chuyên Môn
                            </span>
                          </div>
                          <h4 className="mt-3 font-display text-2xl font-black">{ban.name}</h4>
                          <p className="mt-1 text-sm text-white/90 font-medium">{ban.tagline}</p>
                          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/80">{ban.desc}</p>
                        </div>

                        <div>
                          <h5 className="font-display text-base font-bold text-cobalt-950 flex items-center gap-2">
                            <span>📌</span> Nhiệm vụ trọng tâm và hoạt động thực tế
                          </h5>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {ban.duties.map((duty, dIdx) => (
                              <div
                                key={dIdx}
                                className="flex items-start gap-3 rounded-2xl border border-cobalt-100 bg-sky-paper/50 p-4 transition hover:bg-white hover:border-tmu-300 hover:shadow-xs"
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-flame-500 text-xs font-bold text-white">
                                  {dIdx + 1}
                                </span>
                                <p className="text-xs sm:text-sm font-medium leading-relaxed text-cobalt-800">
                                  {duty}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl bg-cobalt-50 p-4 border border-cobalt-100">
                          <p className="text-xs text-cobalt-700">
                            Bạn mong muốn rèn luyện kỹ năng và tham gia vào <strong>{ban.name}</strong>?
                          </p>
                          <Button
                            variant="flame"
                            size="sm"
                            onClick={() => {
                              onToast(`Đang mở đơn đăng ký ứng tuyển vào ${ban.name}... ✍️`);
                              onClose();
                              window.dispatchEvent(new CustomEvent("bllsv_open_recruit"));
                            }}
                          >
                            Ứng tuyển vào Ban này
                            <Icon.arrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: NGHI THỨC & TINH THẦN 36 ================= */}
          {activeTab === "culture" && (
            <div className="space-y-6">
              {/* Châm ngôn & Slogan thiêng liêng */}
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt-900 via-cobalt-800 to-tmu-700 p-6 text-white shadow-lift sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-glow-300 ring-1 ring-white/20">
                    Tinh thần 36
                  </span>
                  <span className="rounded-full bg-flame-500 px-2.5 py-0.5 text-[11px] font-bold text-white uppercase tracking-wider">
                    {motto.term}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-black text-white sm:text-3xl">
                  Châm Ngôn &amp; Nghi Thức Thiêng Liêng
                </h3>

                <blockquote className="mt-4 border-l-4 border-flame-500 pl-4 text-base font-bold italic text-glow-300 sm:text-xl">
                  “{motto.slogan}”
                </blockquote>

                {motto.meaning && (
                  <p className="mt-3 text-sm italic leading-relaxed text-glow-200/90">
                    ✨ <strong>Thông điệp Ban Chấp Hành:</strong> “{motto.meaning}”
                  </p>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-bold text-flame-300 uppercase tracking-wider">
                      ⭕ Nghi thức hô khẩu hiệu
                    </p>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/90">
                      {ORG.sloganRitual}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                    <p className="text-xs font-bold text-glow-300 uppercase tracking-wider">
                      🍚 Khẩu hiệu mời cơm truyền thống
                    </p>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/90">
                      “{ORG.mealCheer}”
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/15 text-xs text-white/75 leading-relaxed">
                  🏛️ <strong>Tổ chức trực thuộc:</strong> {ORG.parentOrg} ({ORG.parentOrgMembersCount} đơn vị trường, Chủ tịch: {ORG.parentOrgPresident}).
                </div>
              </div>

              {/* 4 Cột mốc tự hào */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { n: "12/04/2008", l: "Ngày thành lập Ban liên lạc", icon: "🌱" },
                  { n: "16 Khóa", l: "Thế hệ BCH (K44 – K60)", icon: "⭐" },
                  { n: "20 Đơn vị", l: "Hội ĐH Thanh Hóa tại HN", icon: "🤝" },
                  { n: "4 Năm", l: "Vô địch Âm Vang Xứ Thanh", icon: "🏆" },
                ].map((x) => (
                  <div
                    key={x.l}
                    className="rounded-3xl border border-cobalt-100 bg-white p-5 text-center shadow-sm"
                  >
                    <span className="text-2xl">{x.icon}</span>
                    <p className="mt-2 font-display text-xl sm:text-2xl font-black text-cobalt-950">{x.n}</p>
                    <p className="mt-1 text-xs font-medium text-cobalt-600">{x.l}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: NỘI QUY & QUY CHẾ ================= */}
          {activeTab === "rules" && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-cobalt-100 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-cobalt-100 pb-5">
                  <div className="max-w-2xl space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold tracking-wider text-emerald-800 uppercase">
                        📜 Văn bản quy chế chính thức
                      </span>
                      <span className="rounded-full bg-cobalt-100 px-2.5 py-0.5 text-[10.5px] font-bold text-cobalt-800">
                        Hiệu lực: {rules.effectiveDate}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-cobalt-950">
                      {rules.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cobalt-600 leading-relaxed">
                      {rules.summary}
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                    <span className="rounded-xl border border-cobalt-200 bg-cobalt-50 px-3 py-1.5 text-xs font-bold text-cobalt-800">
                      🏛️ {rules.issuedBy}
                    </span>
                    <span className="text-[11px] text-cobalt-500">
                      Cập nhật: {rules.updatedAt}
                    </span>
                  </div>
                </div>

                {/* Danh sách các điều khoản nội quy */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {rules.rules.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-2xl border border-cobalt-100 bg-gradient-to-br from-cobalt-50/40 via-white to-tmu-50/20 p-4 transition hover:border-emerald-300 hover:shadow-soft"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-xs font-black text-white shadow-2xs">
                          {idx + 1}
                        </span>
                        <p className="text-xs font-semibold text-cobalt-900 leading-relaxed">
                          {item}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1 pt-2 border-t border-cobalt-100/60 text-[10.5px] font-bold text-emerald-700">
                        <span>✓</span>
                        <span>Quy định bắt buộc đối với mọi thành viên</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-emerald-50/80 p-4 text-xs text-emerald-900 border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <span>
                      Mọi thắc mắc hoặc đề xuất điều chỉnh nội quy, vui lòng liên hệ <strong>Ban Chấp Hành BLLSV TMU</strong>.
                    </span>
                  </div>
                  <span className="font-bold text-emerald-800">#KỷLuật #GắnKết #TinhThần36</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
