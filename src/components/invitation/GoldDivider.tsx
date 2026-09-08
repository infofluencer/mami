interface GoldDividerProps {
  className?: string;
  compact?: boolean;
}

/** Ornate gold flourish divider — stronger presence for premium feel */
export default function GoldDivider({
  className = "",
  compact = false,
}: GoldDividerProps) {
  const lineW = compact ? "w-10 sm:w-14" : "w-20 sm:w-28";

  return (
    <div
      className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}
      aria-hidden
    >
      <span
        className={`${lineW} h-[1.5px] bg-gradient-to-r from-transparent via-gold to-gold/80`}
      />
      <svg
        viewBox="0 0 72 22"
        className="h-5 w-[4.5rem] shrink-0 text-gold sm:h-6 sm:w-20"
        fill="none"
      >
        {/* Outer curls */}
        <path
          d="M4 11 C10 4, 18 4, 22 11 C18 18, 10 18, 4 11"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.75"
        />
        <path
          d="M68 11 C62 4, 54 4, 50 11 C54 18, 62 18, 68 11"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.75"
        />
        {/* Center diamond blossom */}
        <path
          d="M36 4 C32 8, 32 14, 36 18 C40 14, 40 8, 36 4 Z"
          fill="#A67C34"
          opacity="0.85"
        />
        <circle cx="36" cy="11" r="2.2" fill="#D4B896" opacity="0.95" />
        <circle cx="26" cy="11" r="1.2" fill="#B08D4C" opacity="0.7" />
        <circle cx="46" cy="11" r="1.2" fill="#B08D4C" opacity="0.7" />
        <path
          d="M22 11 H28 M44 11 H50"
          stroke="#A67C34"
          strokeWidth="1"
          opacity="0.55"
        />
      </svg>
      <span
        className={`${lineW} h-[1.5px] bg-gradient-to-l from-transparent via-gold to-gold/80`}
      />
    </div>
  );
}

/** Side flourish for headings — muted gold, ~40px wide */
export function GoldFlourish({
  className = "",
  mirror = false,
}: {
  className?: string;
  mirror?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 14"
      className={`h-3 w-10 shrink-0 text-gold/70 ${mirror ? "scale-x-[-1]" : ""} ${className}`}
      fill="none"
      aria-hidden
    >
      <path
        d="M2 7 H22 M22 7 C26 2.5, 34 2.5, 38 7 C34 11.5, 26 11.5, 22 7"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="41" cy="7" r="1.6" fill="#B08D4C" opacity="0.65" />
      <circle cx="14" cy="7" r="0.9" fill="#B08D4C" opacity="0.45" />
    </svg>
  );
}
