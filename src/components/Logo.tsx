/**
 * Logo BLLSV Thanh Hóa – TMU dựng lại bằng SVG thuần
 * (vòng tròn xanh biển + chữ vàng chanh + mô-típ mái nhà/cửa vòm màu cam)
 */
export function LogoBadge({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Logo Ban Liên Lạc Sinh Viên Thanh Hóa - TMU">
      <defs>
        <path id="blTop" d="M 13,55 A 37,37 0 0 1 87,55" />
        <path id="blBottom" d="M 12,52 A 38,38 0 0 0 88,52" />
      </defs>

      {/* Vòng ngoài */}
      <circle cx="50" cy="50" r="49" fill="#2E97DD" />
      <circle cx="50" cy="50" r="33.5" fill="#CDE9F8" />

      {/* Chữ trên cung */}
      <text
        fill="#D9E021"
        fontFamily="'Be Vietnam Pro', sans-serif"
        fontSize="9.1"
        fontWeight="700"
        letterSpacing="0.35"
      >
        <textPath href="#blTop" startOffset="50%" textAnchor="middle">
          BAN LIÊN LẠC SINH VIÊN
        </textPath>
      </text>
      <text
        fill="#D9E021"
        fontFamily="'Be Vietnam Pro', sans-serif"
        fontSize="11.4"
        fontWeight="700"
        letterSpacing="1.1"
      >
        <textPath href="#blBottom" startOffset="50%" textAnchor="middle">
          THANH HÓA
        </textPath>
      </text>

      {/* Hai ngôi sao */}
      <g fill="#E8F03C">
        <path d="M18.6 62.4 l1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5z" />
        <path d="M81.4 62.4 l1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5z" />
      </g>

      {/* Mô-típ trung tâm: mái nhà + số 36 + cửa vòm */}
      <g stroke="#F58220" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.5 39.5 L81 30.5" strokeWidth="4.2" />
        <path d="M20.5 48.5 L80 39" strokeWidth="4.2" />
        <path d="M25.5 56.5 L41 47 L58 55 L74 46.5 L79.5 53" strokeWidth="3.1" />
        <path d="M35 76 L35 44 L58 34 L58 55" strokeWidth="4.4" />
        <path d="M69 73 L69 45" strokeWidth="4.4" />
        <path d="M42 48 h14 v11 h-14 z" strokeWidth="3.2" />
        <path d="M44.5 73 v-9 a3.6 3.6 0 0 1 7.2 0 v9" strokeWidth="3" />
        <path d="M54.5 73 v-9 a3.6 3.6 0 0 1 7.2 0 v9" strokeWidth="3" />
        <path d="M28 74 Q50 60 76 74" strokeWidth="3.4" />
      </g>
      <text
        x="52"
        y="86"
        fill="#F58220"
        fontFamily="'Baloo 2', cursive"
        fontSize="13"
        fontStyle="italic"
        fontWeight="700"
        textAnchor="middle"
      >
        TMU
      </text>
    </svg>
  );
}

/** Logo + chữ tên tổ chức (dùng ở navbar & footer) */
export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="group flex items-center gap-2.5 sm:gap-3" aria-label="Về đầu trang – BLLSV Thanh Hóa TMU">
      <span className="relative">
        <span className="absolute inset-0 rounded-full bg-flame-400/40 blur-md transition group-hover:bg-flame-400/70" />
        <LogoBadge className="relative h-11 w-11 transition-transform duration-500 group-hover:rotate-[8deg] sm:h-12 sm:w-12" />
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
