import { useEffect, useState } from "react";
import { BANS, ORG, VOLUNTEER_TEAM } from "@/data/content";
import { Button, Icon, Kicker, SectionHeading } from "@/components/ui";
import { getStoredAdminMotto, getStoredAdminRules } from "@/data/adminStore";
import { cn } from "@/utils/cn";

export default function About() {
  const [mobileTab, setMobileTab] = useState(0);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [, setDataVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20 lg:py-28 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-tmu-50/60 to-white" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          kicker="Về chúng mình"
          title={
            <>
              “Mái nhà thứ hai” của người xứ Thanh{" "}
              <span className="text-tmu-600">tại 79 Hồ Tùng Mậu</span>
            </>
          }
          desc="Từ ngày đầu thành lập 12/04/2008, nhà chung hôm nay là nơi liên lạc, gắn kết và đồng hành cùng hàng nghìn sinh viên Thanh Hóa tại TMU. Dưới sự điều phối của Đội Sinh viên tình nguyện cùng 3 ban chuyên môn, chúng mình thắp sáng ngọn lửa tình nguyện và văn hóa xứ Thanh qua từng thế hệ."
          action={
            <div className="hidden gap-3 lg:flex">
              <Button as="a" href="#events" variant="outline">
                Xem hoạt động
                <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          }
        />

        {/* Dải thông tin nhanh */}
        <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-10 lg:grid-cols-4">
          {[
            { k: "Địa chỉ nhà chung", v: ORG.address, icon: "🏠" },
            { k: "Mô hình tổ chức", v: "Đội SVTN quản lý 3 ban chuyên môn", icon: "🛡️" },
            { k: "Tuyển tình nguyện viên", v: "Mỗi đầu năm học (tháng 9 – 10)", icon: "📝" },
            { k: "Ngôn ngữ chính thức", v: "Tiếng Việt + tiếng Quảng 100%", icon: "😄" },
          ].map((item) => (
            <div
              key={item.k}
              className="group rounded-2xl border border-cobalt-100 bg-white/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-tmu-200 hover:shadow-soft"
            >
              <span className="text-xl transition-transform duration-300 group-hover:scale-125">{item.icon}</span>
              <p className="mt-2 text-[11px] font-bold tracking-[0.14em] text-tmu-600 uppercase">{item.k}</p>
              <p className="mt-1 text-[13px] leading-snug font-semibold text-cobalt-800">{item.v}</p>
            </div>
          ))}
        </div>

        {/* ================= CƠ CẤU TỔ CHỨC: ĐỘI SVTN & 3 BAN ================= */}
        <div className="mt-14 lg:mt-20">
          {/* ĐỘI SINH VIÊN TÌNH NGUYỆN: CƠ QUAN QUẢN LÝ TRỰC TIẾP 3 BAN */}
          <div className="mb-10 overflow-hidden rounded-3xl border-2 border-flame-300 bg-gradient-to-br from-flame-50/80 via-white to-sky-50/70 p-6 shadow-soft sm:p-8">
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
                <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-flame-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-flame-800 shadow-xs">
                  <span>🎯</span>
                  <span>Chịu trách nhiệm quản lý toàn bộ tình nguyện viên thuộc: Ban Truyền thông, Ban Văn hóa – Sự kiện &amp; Ban Hậu cần</span>
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

          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-flame-700 uppercase">
                3 Ban chuyên môn trực thuộc
              </p>
              <h4 className="font-display text-lg font-bold text-cobalt-950 sm:text-xl">
                Ban Truyền thông · Ban Văn hóa – Sự kiện · Ban Hậu cần
              </h4>
            </div>
            <span className="hidden rounded-full bg-cobalt-100 px-3 py-1 text-xs font-bold text-cobalt-800 sm:inline-block">
              Quản lý bởi Đội SVTN
            </span>
          </div>

          {/* ----- MOBILE / TABLET: tab + carousel snap ----- */}
          <div className="lg:hidden">
            <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2">
              {BANS.map((ban, i) => (
                <button
                  key={ban.id}
                  onClick={() => setMobileTab(i)}
                  className={cn(
                    "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-2xl border px-4 py-2.5 text-[13px] font-bold transition-all active:scale-95",
                    mobileTab === i
                      ? "border-transparent bg-cobalt-800 text-white shadow-soft"
                      : "border-cobalt-200 bg-white text-cobalt-700",
                  )}
                >
                  <span className="text-base">{ban.emoji}</span>
                  {ban.name.replace("Ban ", "")}
                </button>
              ))}
            </div>

            <div className="scrollbar-none -mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
              {BANS.map((ban, i) => (
                <article
                  key={ban.id}
                  className={cn(
                    "min-w-[86%] shrink-0 snap-center overflow-hidden rounded-3xl border border-cobalt-100 bg-white shadow-soft transition-all duration-500 sm:min-w-[68%]",
                    mobileTab === i ? "ring-2 ring-flame-400/60" : "opacity-70",
                  )}
                >
                  <div className={cn("bg-gradient-to-br p-5 text-white", ban.accent)}>
                    <span className="text-3xl">{ban.emoji}</span>
                    <h3 className="mt-3 font-display text-xl font-extrabold">{ban.name}</h3>
                    <p className="mt-1 text-[13px] text-white/85">{ban.tagline}</p>
                  </div>
                  <div className="space-y-3 p-5">
                    <p className="text-[13.5px] leading-relaxed text-cobalt-700/85">{ban.desc}</p>
                    <ul className="space-y-2">
                      {ban.duties.map((d) => (
                        <li key={d} className="flex gap-2.5 text-[13px] leading-snug text-cobalt-800">
                          <Icon.heart className="mt-0.5 h-4 w-4 shrink-0 text-flame-500" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-xs text-cobalt-500">👆 Vuốt ngang để xem tiếp các ban</p>
          </div>

          {/* ----- DESKTOP: 3 card lật (flip) cân đối tuyệt đẹp ----- */}
          <div className="hidden gap-6 lg:grid lg:grid-cols-3">
            {BANS.map((ban) => {
              const isFlipped = flipped === ban.id;
              return (
                <div
                  key={ban.id}
                  className="[perspective:1600px]"
                  onMouseLeave={() => setFlipped((f) => (f === ban.id ? null : f))}
                >
                  <div
                    className={cn(
                      "relative h-[430px] w-full transition-transform duration-[650ms] [transform-style:preserve-3d] ease-[cubic-bezier(.4,.1,.2,1)]",
                      isFlipped && "[transform:rotateY(180deg)]",
                    )}
                  >
                    {/* Mặt trước */}
                    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-cobalt-100 bg-white shadow-sm [backface-visibility:hidden] transition-shadow hover:shadow-lift">
                      <div className={cn("relative bg-gradient-to-br px-5 pt-6 pb-12 text-white", ban.accent)}>
                        <span className="absolute -right-3 -bottom-4 text-[6rem] leading-none opacity-20">{ban.emoji}</span>
                        <span className="inline-flex rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] uppercase backdrop-blur">
                          Ban chuyên môn
                        </span>
                        <h3 className="relative mt-3 font-display text-2xl font-extrabold">{ban.name}</h3>
                        <p className="relative mt-1 text-sm text-white/85">{ban.tagline}</p>
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <p className="text-[13.5px] leading-relaxed text-cobalt-700/85">{ban.short}</p>
                        <div>
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {ban.duties.slice(0, 2).map((d) => (
                              <span key={d} className={cn("rounded-lg px-2 py-1 text-[11px] font-semibold", ban.chip)}>
                                {d.split(" ").slice(0, 3).join(" ")}…
                              </span>
                            ))}
                          </div>
                          <Button variant="soft" className="w-full" onClick={() => setFlipped(ban.id)}>
                            Xem nhiệm vụ ban
                            <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Mặt sau */}
                    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt-900 to-cobalt-700 text-white shadow-lift [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="flex items-center gap-3 border-b border-white/15 px-5 py-4">
                        <span className="text-2xl">{ban.emoji}</span>
                        <p className="font-display text-lg font-extrabold">{ban.name}</p>
                      </div>
                      <ul className="flex-1 space-y-2.5 overflow-y-auto p-5">
                        {ban.duties.map((d) => (
                          <li key={d} className="flex gap-2.5 text-[13px] leading-snug text-white/90">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-glow-400" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div className="p-5 pt-0">
                        <Button
                          variant="flame"
                          className="w-full"
                          onClick={() => setFlipped(null)}
                        >
                          Quay lại
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dải thông tin truyền thống & Văn hóa nhà chung (Slogan & Châm ngôn BCH mới nhất) */}
        {(() => {
          const motto = getStoredAdminMotto();
          const rules = getStoredAdminRules();
          return (
            <>
              <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt-900 via-cobalt-800 to-tmu-700 p-6 text-white shadow-lift sm:p-10 lg:mt-20">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Kicker className="bg-white/10 text-glow-300 ring-white/20">Tinh thần 36</Kicker>
                      <span className="rounded-full bg-flame-500/80 px-2.5 py-0.5 text-[10.5px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
                        {motto.term}
                      </span>
                    </div>
                    <h3 className="mt-4 text-balance-vn font-display text-2xl leading-tight font-extrabold sm:text-3xl lg:text-4xl">
                      Châm ngôn &amp; Nghi thức thiêng liêng
                    </h3>
                    <blockquote className="mt-4 border-l-4 border-flame-500 pl-4 text-base font-bold italic text-glow-300 sm:text-lg">
                      “{motto.slogan}”
                    </blockquote>
                    {motto.meaning && (
                      <p className="mt-2.5 text-[13px] italic leading-relaxed text-glow-200/90">
                        ✨ <strong>Thông điệp BCH:</strong> “{motto.meaning}”
                      </p>
                    )}
                    <p className="mt-3 text-[13.5px] leading-relaxed text-white/85 sm:text-sm">
                      ⭕ <strong>Nghi thức hô slogan:</strong> {ORG.sloganRitual}
                    </p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/85 sm:text-sm">
                      🍚 <strong>Khẩu hiệu mời cơm truyền thống:</strong> “{ORG.mealCheer}”
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-white/75">
                      🏛️ <strong>Tổ chức trực thuộc:</strong> {ORG.parentOrg} ({ORG.parentOrgMembersCount} đơn vị, Chủ tịch: {ORG.parentOrgPresident}).
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                      <Button as="a" href="#contact" variant="flame" className="w-full sm:w-auto">
                        Gia nhập gia đình 36
                        <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                      <Button as="a" href="#dance" variant="ghost" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20">
                        <Icon.mirror className="h-4 w-4" />
                        4 Bài nhảy truyền thống
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { n: "12/04/2008", l: "Ngày thành lập Ban liên lạc" },
                      { n: "16 Khóa", l: "Thế hệ BCH (K44 – K60)" },
                      { n: "20 Đơn vị", l: "Thuộc Hội ĐH Thanh Hóa" },
                      { n: "4 Năm", l: "Vô địch Âm Vang Xứ Thanh" },
                    ].map((x) => (
                      <div
                        key={x.l}
                        className="rounded-2xl border border-white/15 bg-white/10 p-3.5 text-center backdrop-blur transition hover:-translate-y-1 hover:bg-white/20 sm:p-4"
                      >
                        <p className="font-display text-2xl font-black text-glow-300 sm:text-3xl">{x.n}</p>
                        <p className="mt-1 text-[11.5px] leading-snug font-medium text-white/85 sm:text-xs">{x.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ============ BẢNG THÔNG BÁO NỘI QUY & QUY CHẾ HOẠT ĐỘNG MỚI NHẤT ============ */}
              <div className="mt-14 overflow-hidden rounded-3xl border border-cobalt-200/80 bg-white p-6 shadow-soft sm:p-8 lg:mt-16 lg:p-10" data-reveal>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-cobalt-100 pb-5">
                  <div className="max-w-2xl space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-flame-100 px-3 py-1 text-[11px] font-bold tracking-wider text-flame-800 uppercase">
                        📜 Thông Báo Nội Quy &amp; Quy Chế
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800">
                        {rules.effectiveDate}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-black text-cobalt-950 sm:text-2xl">
                      {rules.title}
                    </h3>
                    <p className="text-xs text-cobalt-600 sm:text-sm leading-relaxed">
                      {rules.summary}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
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
                      className="group flex flex-col justify-between rounded-2xl border border-cobalt-100 bg-gradient-to-br from-cobalt-50/40 via-white to-tmu-50/20 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-flame-300 hover:shadow-soft"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-flame-500 text-xs font-black text-white shadow-2xs group-hover:bg-cobalt-950 transition-colors">
                          {idx + 1}
                        </span>
                        <p className="text-xs font-semibold text-cobalt-900 leading-relaxed">
                          {item}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center gap-1 pt-2 border-t border-cobalt-100/60 text-[10.5px] font-bold text-tmu-700">
                        <span>✓</span>
                        <span>Quy định bắt buộc đối với mọi TNV</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-cobalt-50/80 p-3.5 text-xs text-cobalt-700">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <span>
                      Mọi thắc mắc hoặc đề xuất điều chỉnh nội quy, vui lòng liên hệ <strong>Ban Chấp Hành BLLSV TMU</strong>.
                    </span>
                  </div>
                  <span className="font-bold text-flame-700">#KỷLuật #GắnKết #TinhThần36</span>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </section>
  );
}
