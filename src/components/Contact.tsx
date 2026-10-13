import { useState } from "react";
import { BANS, ORG } from "@/data/content";
import { Button, Icon, Kicker, SectionHeading } from "@/components/ui";
import { LogoBadge } from "@/components/Logo";
import { cn } from "@/utils/cn";

const HOMETOWNS = [
  "TP. Thanh Hóa", "Sầm Sơn", "Bỉm Sơn", "Nghi Sơn", "Quảng Xương", "Hậu Lộc", "Hoằng Hóa",
  "Nga Sơn", "Hà Trung", "Thiệu Hóa", "Đông Sơn", "Triệu Sơn", "Yên Định", "Thọ Xuân",
  "Quan Sơn", "Bá Thước", "Cẩm Thủy", "Ngọc Lặc", "Thạch Thành", "Lang Chánh", "Mường Lát",
  "Nông Cống", "Như Thanh", "Như Xuân", "Tĩnh Gia", "Giảng Sơn", "Vĩnh Lộc", "Hướng dẫn khác",
];

const inputBase =
  "min-h-12 w-full rounded-2xl border border-cobalt-200 bg-white px-4 text-[15px] text-cobalt-900 outline-none transition placeholder:text-cobalt-400 focus:border-tmu-400 focus:ring-4 focus:ring-tmu-100";

export default function Contact({ onToast }: { onToast: (msg: string) => void }) {
  const [intent, setIntent] = useState<"join" | "message">("join");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    onToast(
      intent === "join"
        ? "Đã nhận đơn! Anh chị Ban Nhân sự sẽ nhắn tin cho bạn trong 24h 💙"
        : "Cảm ơn lời nhắn của bạn, nhà chung đã đọc rồi nhé! 💙",
    );
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-tmu-50/70 to-white" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          kicker="Liên hệ & gia nhập"
          title={
            <>
              Còn chần chừ gì nữa, <span className="text-flame-600">về nhà chung</span> thôi!
            </>
          }
          desc="Điền vài dòng thông tin, anh chị Ban Nhân sự sẽ liên lạc với bạn. Không cần chỉnh sửa gì, cứ viết tự nhiên như đang nhắn tin cho một người bạn cùng quê."
        />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* ============ FORM ============ */}
          <div className="rounded-3xl border border-cobalt-100 bg-white/90 p-5 shadow-soft backdrop-blur sm:p-7" data-reveal>
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-flame-100 text-4xl">🎉</span>
                <h3 className="font-display text-xl font-extrabold text-cobalt-900 sm:text-2xl">Đã gửi thành công!</h3>
                <p className="max-w-md text-[14px] leading-relaxed text-cobalt-700/85">
                  Cảm ơn bạn đã tin tưởng nhà chung. Trong lúc chờ, bạn cứ ghé trang <strong>Kho bài nhảy</strong> học
                  trước bài <em>Tinh Thần 36</em> – tối thứ Ba gặp nhau ở sân 79 Hồ Tùng Mậu nhé!
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Button variant="flame" onClick={() => setSent(false)}>
                    Gửi thêm thông tin khác
                  </Button>
                  <Button as="a" href="#dance" variant="outline">
                    Đi tới kho bài nhảy
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                {/* Chọn mục đích */}
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-cobalt-800/5 p-1.5">
                  {(
                    [
                      { k: "join", label: "Đăng ký thành viên", icon: "🙋" },
                      { k: "message", label: "Gửi lời nhắn", icon: "💬" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.k}
                      type="button"
                      onClick={() => setIntent(opt.k)}
                      className={cn(
                        "flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-[13px] font-bold transition-all",
                        intent === opt.k ? "bg-white text-cobalt-900 shadow-sm" : "text-cobalt-600 hover:text-cobalt-800",
                      )}
                    >
                      <span>{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-bold text-cobalt-800">Họ và tên *</span>
                    <input required name="name" placeholder="Nguyễn Văn Trưởng" className={inputBase} autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-bold text-cobalt-800">Số điện thoại / Zalo *</span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      pattern="[0-9+\s]{9,15}"
                      placeholder="09xx xxx xxx"
                      className={inputBase}
                      autoComplete="tel"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-bold text-cobalt-800">Email</span>
                    <input
                      name="email"
                      type="email"
                      inputMode="email"
                      placeholder="ban@email.com"
                      className={inputBase}
                      autoComplete="email"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12.5px] font-bold text-cobalt-800">Quê quán (Thanh Hóa)</span>
                    <select name="hometown" defaultValue="" className={cn(inputBase, "appearance-none bg-white pr-10")}>
                      <option value="" disabled>
                        Chọn huyện / thị xã
                      </option>
                      {HOMETOWNS.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <span className="mb-2 block text-[12.5px] font-bold text-cobalt-800">
                    {intent === "join" ? "Bạn muốn vào Ban nào?" : "Ban bạn muốn nhắn gửi tới"}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {BANS.map((b) => (
                      <label
                        key={b.id}
                        className="group flex min-h-12 cursor-pointer items-center gap-2.5 rounded-2xl border border-cobalt-200 px-3 transition hover:border-tmu-300 hover:bg-tmu-50/60 has-checked:border-flame-400 has-checked:bg-flame-50"
                      >
                        <input type="radio" name="ban" value={b.id} defaultChecked={b.id === "van-the-my"} className="sr-only" />
                        <span className="text-lg">{b.emoji}</span>
                        <span className="text-[12.5px] leading-tight font-semibold text-cobalt-800">{b.name.replace("Ban ", "")}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[12.5px] font-bold text-cobalt-800">
                    {intent === "join" ? "Vì sao bạn muốn gia nhập nhà chung?" : "Lời nhắn của bạn"}
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Mình là K17, quê Quảng Xương. Mình muốn tham gia Mùa Hè Xanh và học flashmob…"
                    className={cn(inputBase, "resize-none py-3 leading-relaxed")}
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button variant="flame" size="lg" className="w-full sm:w-auto">
                    {intent === "join" ? "Gửi đơn đăng ký" : "Gửi lời nhắn"}
                    <Icon.arrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <p className="text-[12px] leading-snug text-cobalt-600/70">
                    Bằng việc gửi form, bạn đồng ý để BLLSV Thanh Hóa TMU liên lạc qua điện thoại/Zalo. Thông tin chỉ dùng
                    cho hoạt động của nhà chung.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ============ THÔNG TIN LIÊN HỆ ============ */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt-800 via-cobalt-700 to-tmu-600 p-5 text-white shadow-lift sm:p-7">
              <Kicker className="bg-white/10 text-glow-300 ring-white/20">Địa chỉ nhà chung</Kicker>
              <h3 className="mt-4 font-display text-xl leading-snug font-extrabold sm:text-2xl">
                Trường Đại học Thương Mại
              </h3>
              <p className="mt-1.5 text-[14px] text-white/85">{ORG.address}</p>

              <div className="mt-5 space-y-3">
                {[
                  { icon: <Icon.mail className="h-4 w-4" />, label: ORG.email, sub: "Email nhà chung" },
                  { icon: <Icon.chat className="h-4 w-4" />, label: ORG.phone, sub: "Hotline Ban Nhân sự" },
                  { icon: <Icon.calendar className="h-4 w-4" />, label: "19:00 – 21:00 tối thứ Ba", sub: "Sinh hoạt & tập bài nhảy" },
                ].map((row) => (
                  <div key={row.sub} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur transition hover:bg-white/20">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-glow-400/20 text-glow-300">
                      {row.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-bold">{row.label}</p>
                      <p className="text-[11.5px] text-white/70">{row.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                as="a"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ORG.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                variant="flame"
                className="mt-5 w-full"
              >
                <Icon.pin className="h-4 w-4" />
                Chỉ đường tới 79 Hồ Tùng Mậu
              </Button>
            </div>

            {/* Nút mạng xã hội */}
            <div className="rounded-3xl border border-cobalt-100 bg-white/90 p-5 shadow-sm backdrop-blur sm:p-6">
              <p className="font-display text-base font-extrabold text-cobalt-900">Dẫn nhanh tới nhà chung</p>
              <p className="mt-1 text-[13px] text-cobalt-600/80">Fanpage cập nhật hoạt động hằng ngày, Group nội bộ chỉ dành cho thành viên 36.</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Fanpage", sub: "BLLSVTH TMU", href: ORG.fanpage, icon: <Icon.facebook className="h-5 w-5" />, tone: "from-tmu-500 to-cobalt-700" },
                  { label: "Group nội bộ", sub: "Nhà chung 36", href: ORG.group, icon: <Icon.users className="h-5 w-5" />, tone: "from-cobalt-600 to-cobalt-900" },
                  { label: "TikTok", sub: "@bllsvth.tmu", href: ORG.tiktok, icon: <Icon.tiktok className="h-5 w-5" />, tone: "from-flame-500 to-flame-700" },
                  { label: "Zalo nhóm", sub: "Tân SV K17", href: ORG.zalo, icon: <Icon.chat className="h-5 w-5" />, tone: "from-glow-400 to-flame-500" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-14 items-center gap-3 rounded-2xl border border-cobalt-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-soft"
                  >
                    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white transition-transform duration-300 group-hover:scale-110", s.tone)}>
                      {s.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-bold text-cobalt-900">{s.label}</span>
                      <span className="block truncate text-[11px] text-cobalt-600/70">{s.sub}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cobalt-950 pt-14 pb-28 text-white xl:pb-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] bg-dots" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-tmu-500/25 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoBadge className="h-14 w-14" />
              <div>
                <p className="font-display text-lg font-extrabold">{ORG.fullName}</p>
                <p className="text-[12px] tracking-[0.18em] text-glow-300 uppercase">{ORG.school}</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-white/70 italic">“{ORG.slogan}”</p>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/60">
              Nhà chung của sinh viên Thanh Hóa đang học tập tại Hà Nội, hoạt động dưới sự hỗ trợ của Hội Sinh viên
              Trường Đại học Thương Mại. Thành lập năm {ORG.founded} – 15 năm một chuyến đi.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-glow-300 uppercase">Khám phá</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "#about", label: "Về chúng mình" },
                { href: "#events", label: "Chương trình & sự kiện" },
                { href: "#dance", label: "Kho bài nhảy" },
                { href: "#memories", label: "Góc kỷ niệm" },
                { href: "#contact", label: "Đăng ký thành viên" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[13.5px] text-white/70 transition hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-flame-500 transition-all group-hover:w-3" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-glow-300 uppercase">Liên hệ</p>
            <ul className="mt-4 space-y-3 text-[13.5px] text-white/70">
              <li className="flex items-start gap-2.5">
                <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                {ORG.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon.mail className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                {ORG.email}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon.chat className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                {ORG.phone}
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[
                { href: ORG.fanpage, icon: <Icon.facebook className="h-4 w-4" />, label: "Fanpage" },
                { href: ORG.tiktok, icon: <Icon.tiktok className="h-4 w-4" />, label: "TikTok" },
                { href: ORG.group, icon: <Icon.users className="h-4 w-4" />, label: "Group" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:-translate-y-1 hover:bg-flame-500"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/50">
            © {new Date().getFullYear()} BLLSV Thanh Hóa – TMU. Made with 💙 bởi Ban Truyền thông – Kỹ thuật.
          </p>
          <div className="flex items-center gap-3">
            <a href="#home" className="text-[12px] font-semibold text-white/60 transition hover:text-white">
              Điều khoản sử dụng
            </a>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-4 text-[12px] font-semibold text-white transition hover:bg-flame-500 active:scale-95"
            >
              Về đầu trang ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
