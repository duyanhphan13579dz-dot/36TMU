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
      aria-label="Về đầu trang – BLLSV Thanh Hóa TMU"
    >
      <span className="relative flex items-center justify-center shrink-0">
        <span className="absolute inset-0 rounded-full bg-tmu-400/20 blur-md transition group-hover:bg-flame-400/40" />
        <LogoBadge className="relative h-11 w-11 drop-shadow-sm transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105 sm:h-12 sm:w-12" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-extrabold tracking-tight text-cobalt-900 sm:text-base">
          BLLSV Thanh Hóa
        </span>
        {!compact && (
          <span className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-flame-600 uppercase sm:text-[11px]">
            TMU · 79 Hồ Tùng Mậu
          </span>
        )}
      </span>
    </a>
  );
}

