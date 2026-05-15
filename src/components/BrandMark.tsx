type BrandMarkSize = "sm" | "md" | "lg";

const markSizeClass: Record<BrandMarkSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-12 w-12",
};

const wordmarkClass: Record<BrandMarkSize, string> = {
  sm: "text-[12px]",
  md: "text-[17px]",
  lg: "text-[22px]",
};

type BrandMarkProps = {
  size?: BrandMarkSize;
  className?: string;
};

type BrandLockupProps = BrandMarkProps & {
  showTagline?: boolean;
};

export function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={`${markSizeClass[size]} flex-none ${className}`}
      focusable="false"
    >
      <defs>
        <linearGradient id="openhw-explorer-mark-gradient" x1="8" x2="58" y1="6" y2="58">
          <stop stopColor="#0E65C7" />
          <stop offset="0.52" stopColor="#073B78" />
          <stop offset="1" stopColor="#071B3E" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#openhw-explorer-mark-gradient)" />
      <text
        x="9"
        y="33"
        fill="#FFFFFF"
        fontFamily="Arial Black, Inter, system-ui, sans-serif"
        fontSize="24"
        fontWeight="900"
        letterSpacing="-2.2"
      >
        OH
      </text>
      <path
        d="M18 45 40 31M21 31l23 16"
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="6"
      />
      <path d="M42 45h12L41 33Z" fill="#18A957" />
      <path d="M18 50h26" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2.6" opacity="0.25" />
    </svg>
  );
}

export function BrandLockup({
  size = "md",
  showTagline = false,
  className = "",
}: BrandLockupProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <BrandMark size={size} />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`${wordmarkClass[size]} font-extrabold leading-[0.92] tracking-tight text-[var(--brand-wordmark-primary)]`}
        >
          OpenHW
        </span>
        <span
          className={`${wordmarkClass[size]} font-extrabold leading-[1.02] tracking-tight text-[var(--brand-wordmark-accent)]`}
        >
          Explorer
        </span>
        {showTagline ? (
          <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--brand-wordmark-muted)] sm:block">
            Explore <span className="text-[var(--green)]">•</span> Learn{" "}
            <span className="text-[var(--green)]">•</span> Build
          </span>
        ) : null}
      </span>
    </span>
  );
}
