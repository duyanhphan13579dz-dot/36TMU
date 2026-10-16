import { useEffect, useMemo, useState } from "react";
import TnvNoteBoard from "@/components/TnvNoteBoard";
import { ORG } from "@/data/content";
import { Button, Icon, Kicker, SectionHeading } from "@/components/ui";
import { getStoredAdminContact } from "@/data/adminStore";
import { cn } from "@/utils/cn";

export default function Contact({
  isAdmin = false,
  onToast,
}: {
  isAdmin?: boolean;
  onToast: (msg: string) => void;
}) {
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  const contact = useMemo(() => getStoredAdminContact(), [dataVersion]);
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 lg:py-28 scroll-mt-20 md:scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-tmu-50/70 to-white" />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          kicker="Góc TNV &amp; Liên hệ"
          title={
            <>
              Gắn kết nhà chung, <span className="text-flame-600">kết nối tình nguyện</span>
            </>
          }
          desc="Nơi lưu giữ những lời dặn dò, lưu ý hoạt động và tình cảm của các thế hệ thành viên BLLSV Thanh Hóa TMU. Bạn có thể để lại lời nhắn hoặc liên hệ trực tiếp với nhà chung qua các kênh chính thức bên dưới."
        />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* ============ BẢNG GHI CHÚ & LỜI NHẮN TNV (THAY THẾ FORM ĐĂNG KÝ) ============ */}
          <div>
            <TnvNoteBoard isAdmin={isAdmin} onToast={onToast} />
          </div>

          {/* ============ THÔNG TIN LIÊN HỆ ============ */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt-800 via-cobalt-700 to-tmu-600 p-5 text-white shadow-lift sm:p-7">
              <Kicker className="bg-white/10 text-glow-300 ring-white/20">Địa chỉ nhà chung</Kicker>
              <h3 className="mt-4 font-display text-xl leading-snug font-extrabold sm:text-2xl">
                Trường Đại học Thương Mại
              </h3>
              <p className="mt-1.5 text-[14px] text-white/85">{contact.address}</p>

              <div className="mt-5 space-y-3">
                {[
                  { icon: <Icon.mail className="h-4 w-4" />, label: contact.email, sub: "Email nhà chung" },
                  { icon: <Icon.chat className="h-4 w-4" />, label: contact.phone, sub: "Hotline Ban Nhân sự" },
                  { icon: <Icon.calendar className="h-4 w-4" />, label: contact.scheduleInfo || "19:00 – 21:00 tối thứ Ba", sub: "Sinh hoạt & tập bài nhảy" },
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
                  { label: "Fanpage", sub: "BLLSVTH TMU", href: contact.fanpage || ORG.fanpage, icon: <Icon.facebook className="h-5 w-5" />, tone: "from-tmu-500 to-cobalt-700" },
                  { label: "Kênh YouTube", sub: ORG.youtubeChannel || "TH VCU Media", href: ORG.youtube || "https://www.youtube.com/@THVcuMedia", icon: <Icon.youtube className="h-5 w-5" />, tone: "from-red-600 to-rose-700" },
                  { label: "TikTok", sub: "@bllsvth.tmu", href: contact.tiktok || ORG.tiktok, icon: <Icon.tiktok className="h-5 w-5" />, tone: "from-flame-500 to-flame-700" },
                  { label: "Group nội bộ", sub: "Nhà chung 36", href: contact.group || ORG.group, icon: <Icon.users className="h-5 w-5" />, tone: "from-cobalt-600 to-cobalt-900" },
                  { label: "Zalo nhóm", sub: "Tân SV K60, K61", href: ORG.zalo, icon: <Icon.chat className="h-5 w-5" />, tone: "from-glow-400 to-flame-500" },
                ].map((s, idx) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "group flex min-h-14 items-center gap-3 rounded-2xl border border-cobalt-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-soft",
                      idx === 4 && "col-span-2"
                    )}
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
