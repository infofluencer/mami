"use client";

import { motion, useReducedMotion } from "framer-motion";

interface WaxSealProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
  onClick?: () => void;
  /** Embossed center text — defaults to label or "LCV" */
  label?: string;
  /** Visible emboss text inside the seal */
  emboss?: string;
}

const sizes = {
  sm: "h-12 w-12 text-[10px]",
  md: "h-16 w-16 text-xs",
  lg: "h-[5.25rem] w-[5.25rem] text-sm",
};

/** Glossy bordo wax seal with gold emboss */
export default function WaxSeal({
  size = "md",
  className = "",
  animate = true,
  onClick,
  label,
  emboss,
}: WaxSealProps) {
  const reduced = useReducedMotion();
  const text = emboss ?? label ?? "LCV";

  const inner = (
    <>
      {/* Gloss highlight */}
      <div
        className="pointer-events-none absolute inset-[3px] rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/25"
        aria-hidden
      />
      {/* Inner rim */}
      <div
        className="pointer-events-none absolute inset-[7px] rounded-full border border-gold-light/25"
        aria-hidden
      />
      {/* Wax drip */}
      <div
        className="pointer-events-none absolute -bottom-1 left-1/2 h-3 w-4 -translate-x-1/2 rounded-b-full bg-bordo-dark/85"
        aria-hidden
      />
      <span className="relative z-10 font-display font-semibold tracking-[0.2em] text-gold-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
        {text}
      </span>
    </>
  );

  return (
    <motion.div
      className={`relative inline-flex ${className}`}
      animate={
        animate && !reduced ? { scale: [1, 1.03, 1] } : undefined
      }
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={label ?? text}
          className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-bordo-light via-bordo to-bordo-dark shadow-seal ${sizes[size]} cursor-pointer transition-transform hover:scale-105 active:scale-95 ${animate && !reduced ? "animate-seal-glow" : ""}`}
        >
          {inner}
        </button>
      ) : (
        <div
          className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-bordo-light via-bordo to-bordo-dark shadow-seal ${sizes[size]} ${animate && !reduced ? "animate-seal-glow" : ""}`}
          aria-hidden={!label}
          aria-label={label}
        >
          {inner}
        </div>
      )}
    </motion.div>
  );
}
