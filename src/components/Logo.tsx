import logoImg from "@/assets/logo.png";
import { cn } from "@/utils/cn";

export { logoImg };

/**
 * Logo chính thức của Ban Liên Lạc Sinh Viên Thanh Hóa - TMU
 */
export function LogoBadge({
  className = "h-10 w-10",
  alt = "Logo Ban Liên Lạc Sinh Viên Thanh Hóa - TMU",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={logoImg}
      alt={alt}
      className={cn("aspect-square rounded-full object-contain select-none", className)}
      loading="eager"
      decoding="async"
    />
  );
}

/** Logo + chữ tên tổ chức (dùng ở navbar & footer) */
export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#home"
      className="group flex items-center gap-2.5 sm:gap-3"
      aria-label="Về đầu trang – Ban Liên Lạc Sinh Viên Thanh Hóa Đại Học Thương Mại"
    >
      <span className="relative flex items-center justify-center shrink-0">
        <span className="absolute inset-0 rounded-full bg-tmu-400/20 blur-md transition group-hover:bg-flame-400/40" />
        <LogoBadge
          className={cn(
            "relative drop-shadow-sm transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105",
            compact ? "h-9 w-9 sm:h-10 sm:w-10" : "h-11 w-11 sm:h-12 sm:w-12",
          )}
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display font-black uppercase tracking-tight text-cobalt-900 leading-tight",
            compact ? "text-[10px] sm:text-[11.5px]" : "text-[11px] sm:text-[13.5px]",
          )}
        >
          BAN LIÊN LẠC SINH VIÊN THANH HÓA
        </span>
        <span
          className={cn(
            "mt-0.5 font-bold tracking-[0.14em] text-flame-600 uppercase leading-tight",
            compact ? "text-[8.5px] sm:text-[9.5px]" : "text-[9.5px] sm:text-[11px]",
          )}
        >
          ĐẠI HỌC THƯƠNG MẠI
        </span>
      </span>
    </a>
  );
}

