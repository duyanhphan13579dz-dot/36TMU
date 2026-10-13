import { useState } from "react";
import { BANS, ORG } from "@/data/content";
import { Button, Icon, Kicker, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function About() {
  const [mobileTab, setMobileTab] = useState(0);
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
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
          desc="Từ một nhóm nhỏ sinh viên Thanh Hóa năm 2011, nhà chung hôm nay đã là nơi liên lạc, kết nối và đồng hành cùng hàng nghìn bạn trẻ TMU. Mỗi năm chúng mình đi tình nguyện, tổ chức hội trại, đón tân sinh viên và giữ gìn những điệu dân vũ rất… “Quảng”."
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
            { k: "Mô hình", v: "4 ban chuyên môn + Ban chủ nhiệm", icon: "🧩" },
            { k: "Tuyển thành viên", v: "Mỗi đầu năm học (tháng 9 – 10)", icon: "📝" },
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

        {/* ================= 4 BAN CHUYÊN MÔN ================= */}
        <div className="mt-14 lg:mt-20" data-reveal>
          {/* ----- MOBILE / TABLET: tab + carousel snap ----- */}
          <div className="lg:hidden">
            <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-tmu-600 uppercase">Chọn ban để xem</p>
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

          {/* ----- DESKTOP: 4 card lật (flip) khi hover / click ----- */}
          <div className="hidden gap-5 lg:grid lg:grid-cols-2 xl:grid-cols-4">
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
                            Xem Ban làm gì
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

        {/* Dải thông tin truyền thống & Văn hóa nhà chung */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt-900 via-cobalt-800 to-tmu-700 p-6 text-white shadow-lift sm:p-10 lg:mt-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Kicker className="bg-white/10 text-glow-300 ring-white/20">Tinh thần 36</Kicker>
              <h3 className="mt-4 text-balance-vn font-display text-2xl leading-tight font-extrabold sm:text-3xl lg:text-4xl">
                Slogan & Nghi thức thiêng liêng
              </h3>
              <blockquote className="mt-4 border-l-4 border-flame-500 pl-4 text-base font-bold italic text-glow-300 sm:text-lg">
                “{ORG.slogan}”
              </blockquote>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/85 sm:text-sm">
                ⭕ <strong>Nghi thức hô slogan:</strong> {ORG.sloganRitual}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/85 sm:text-sm">
                🍚 <strong>Khẩu hiệu mời cơm truyền thống:</strong> “{ORG.mealCheer}”
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/75">
                🏛️ <strong>Tổ chức trực thuộc:</strong> {ORG.parentOrg} ({ORG.parentOrgMembersCount} đơn vị, Chủ tịch: {ORG.parentOrgPresident}).
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button as="a" href="#contact" variant="flame">
                  Gia nhập gia đình 36
                  <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button as="a" href="#dance" variant="ghost" className="bg-white/10 text-white hover:bg-white/20">
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
      </div>
    </section>
  );
}
