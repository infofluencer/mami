"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { invitationConfig } from "@config";
import type { FloralSection } from "./FloralCorner";
import { SectionFlorals } from "./FloralCorner";

interface TornPaperCardProps {
  children: ReactNode;
  className?: string;
  /** Which config floral layout — false = none */
  florals?: FloralSection | false;
  /** Must match torn PNG paper cream (#F3EDDC) */
  paperColor?: string;
}

/**
 * Torn handmade-paper card: cream body + /torn-top.png & /torn-bottom.png deckles.
 * Same structure for Intro and Schedule — floating paper with drop-shadow.
 */
export default function TornPaperCard({
  children,
  className = "",
  florals = false,
  paperColor,
}: TornPaperCardProps) {
  const { assets, tornPaperColor } = invitationConfig;
  const bg = paperColor ?? tornPaperColor;

  const topTuck = "-2.5625%"; // -41/1600
  const bottomTuck = "-1.9375%"; // -31/1600

  return (
    <div className="relative mx-auto w-full max-w-invite overflow-visible">
      <div
        className="relative z-10 w-full"
        style={{
          filter:
            "drop-shadow(0 12px 24px rgba(92, 74, 58, 0.14)) drop-shadow(0 2px 6px rgba(92, 74, 58, 0.07))",
        }}
      >
        {/* Top deckle */}
        <div
          className="pointer-events-none relative z-[5] w-full leading-[0]"
          style={{ marginBottom: topTuck }}
          aria-hidden
        >
          <Image
            src={assets.tornTop}
            alt=""
            width={1600}
            height={90}
            className="relative top-[-1px] h-auto w-full select-none"
            unoptimized
          />
        </div>

        <div
          className={`relative z-[1] w-full px-10 pb-12 pt-12 sm:pb-14 sm:pt-14 ${className}`}
          style={{ backgroundColor: bg }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-x-[18px] bottom-5 top-5 z-[6] border border-gold/25 sm:inset-x-[22px] sm:bottom-6 sm:top-6"
            aria-hidden
          />

          <div className="relative z-20">{children}</div>
        </div>

        {/* Bottom deckle */}
        <div
          className="pointer-events-none relative z-[5] w-full leading-[0]"
          style={{ marginTop: bottomTuck }}
          aria-hidden
        >
          <Image
            src={assets.tornBottom}
            alt=""
            width={1600}
            height={90}
            className="relative bottom-[-1px] h-auto w-full select-none"
            unoptimized
          />
        </div>
      </div>

      {/* Corner florals above paper + border */}
      {florals && <SectionFlorals section={florals} className="z-30" />}
    </div>
  );
}
