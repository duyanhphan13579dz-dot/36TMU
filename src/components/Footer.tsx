import { useEffect, useMemo, useState } from "react";
import { LogoBadge } from "@/components/Logo";
import { ORG } from "@/data/content";
import { Icon } from "@/components/ui";
import { getStoredAdminMotto, getStoredAdminContact } from "@/data/adminStore";

export function Footer() {
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  const motto = useMemo(() => getStoredAdminMotto(), [dataVersion]);
  const contact = useMemo(() => getStoredAdminContact(), [dataVersion]);

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
            <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-white/90 italic">“{motto.slogan}”</p>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/80">
              Mái nhà chung của sinh viên Thanh Hóa tại Trường Đại học Thương Mại, trực thuộc {ORG.parentOrg}. Thành lập ngày {ORG.foundedDate} – hơn 18 năm giữ lửa và cống hiến.
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
                    className="group inline-flex items-center gap-2 text-[13.5px] text-white/85 transition hover:text-white"
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
            <ul className="mt-4 space-y-3 text-[13.5px] text-white/85">
              <li className="flex items-start gap-2.5">
                <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                {contact.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon.mail className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                {contact.email}
              </li>
              <li className="flex items-start gap-2.5">
                <Icon.chat className="mt-0.5 h-4 w-4 shrink-0 text-flame-400" />
                {contact.phone}
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[
                { href: contact.fanpage, icon: <Icon.facebook className="h-4 w-4" />, label: "Fanpage" },
                { href: contact.tiktok, icon: <Icon.tiktok className="h-4 w-4" />, label: "TikTok" },
                { href: contact.group, icon: <Icon.users className="h-4 w-4" />, label: "Group" },
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
          <p className="text-[12px] text-white/75">
            © {new Date().getFullYear()} BLLSV Thanh Hóa – TMU. Made with 💙 bởi Ban Truyền thông – Kỹ thuật.
          </p>
          <div className="flex items-center gap-3">
            <a href="#home" className="text-[12px] font-semibold text-white/80 transition hover:text-white">
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

export default Footer;
