"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { invitationConfig } from "@config";
import { SectionFlorals } from "./FloralCorner";
import GoldDivider from "./GoldDivider";
import SectionReveal from "./SectionReveal";

/**
 * Hero — arch/swans image with names, scroll hint, cream blend,
 * and a full-width floral strip at the bottom seam into Intro.
 */
export default function Hero() {
  const { couple, event, texts, assets } = invitationConfig;
  const reduced = useReducedMotion();

  return (
    <section className="relative w-full overflow-visible bg-ivory">
      <div className="relative mx-auto w-full max-w-invite aspect-[9/16] overflow-visible">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={assets.heroBg}
            alt=""
            fill
            priority
            sizes="430px"
            className="object-cover object-center"
          />
          {/* Short cream blend into continuous paper — not a large empty band */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[9%]"
            style={{
              background:
                "linear-gradient(to top, #F3EDDB 0%, rgba(243,237,219,0.7) 45%, transparent 100%)",
            }}
            aria-hidden
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-[10%] top-[18%] z-[1] h-[28%] rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse 75% 70% at 50% 40%, rgba(255,250,240,0.62) 0%, rgba(250,247,240,0.28) 42%, transparent 74%)",
          }}
          aria-hidden
        />

        <div className="absolute inset-x-0 top-[22%] z-10 flex flex-col items-center px-8 text-center sm:top-[23%]">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-24 w-[78%] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,252,245,0.55) 0%, rgba(255,252,245,0.18) 55%, transparent 78%)",
            }}
            aria-hidden
          />

          <SectionReveal className="relative">
            <p className="font-script text-[1.75rem] leading-none text-gold drop-shadow-[0_1px_6px_rgba(255,255,255,0.45)] sm:text-[2rem]">
              {event.title}
            </p>
            <p className="mt-2.5 font-display text-[11px] uppercase tracking-[0.28em] text-gold drop-shadow-[0_1px_4px_rgba(255,255,255,0.35)] sm:text-xs">
              {event.dateDisplay}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1} className="relative mt-4 w-full sm:mt-5">
            <GoldDivider className="mb-2.5" compact />
            <h1 className="font-script text-[3.5rem] leading-[1.05] text-gold drop-shadow-[0_1px_0_rgba(255,255,255,0.3)] sm:text-[4rem]">
              {couple.first}
            </h1>
            <p className="my-0.5 font-display text-base tracking-[0.2em] text-gold-dark">
              &
            </p>
            <h1 className="font-script text-[3.5rem] leading-[1.05] text-gold drop-shadow-[0_1px_0_rgba(255,255,255,0.3)] sm:text-[4rem]">
              {couple.second}
            </h1>
            <GoldDivider className="mt-3" compact />
          </SectionReveal>

          <SectionReveal delay={0.18} className="relative mt-6 sm:mt-7">
            <p className="font-display text-sm tracking-[0.14em] text-gold-dark drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
              {texts.scrollDown}
            </p>
            <motion.svg
              viewBox="0 0 24 24"
              className={`mx-auto mt-1.5 h-5 w-5 text-gold ${reduced ? "" : "animate-chevron-bounce"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden
            >
              <path
                d="M12 5 L12 19 M6 13 L12 19 L18 13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </SectionReveal>
        </div>

        {/*
          Top-layer swan-frame florals: left + mirrored right corners,
          thin bottom bridge at the seam. Spills onto intro card (above z-20).
        */}
        <div className="pointer-events-none absolute inset-0 z-[50] overflow-visible">
          <SectionFlorals section="hero" className="z-[50]" />
        </div>
      </div>
    </section>
  );
}
