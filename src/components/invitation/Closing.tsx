"use client";

import { useState } from "react";
import Image from "next/image";
import { invitationConfig } from "@config";
import GoldDivider from "./GoldDivider";
import SectionReveal from "./SectionReveal";
import { SectionFlorals } from "./FloralCorner";

/** (8) Closing + couple photo — floral-closing.webp bottom border only */
export default function Closing() {
  const { couple, texts, assets } = invitationConfig;
  const photoSrc = assets.couplePhoto || assets.couple;
  const [failed, setFailed] = useState(false);

  return (
    <section className="pb-24 pt-4">
      <SectionReveal className="px-5 text-center">
        <p className="font-script text-[2.125rem] leading-snug text-gold sm:text-[2.25rem]">
          {texts.closing}
        </p>
        <GoldDivider className="my-7" />
        <p className="font-script text-3xl text-gold-dark sm:text-4xl">
          {couple.display}
        </p>
      </SectionReveal>

      <SectionReveal
        delay={0.1}
        className="relative mx-auto mt-10 w-full max-w-invite px-4"
      >
        <div className="relative overflow-visible pb-10">
          <div className="relative overflow-hidden shadow-card">
            <div className="relative aspect-[3/4] w-full bg-ivory-dark/40">
              {!failed ? (
                <Image
                  src={photoSrc}
                  alt={couple.display}
                  fill
                  className="object-cover object-center"
                  sizes="430px"
                  priority={false}
                  onError={() => setFailed(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-ivory-light to-ivory-dark px-6 text-center">
                  <p className="font-script text-3xl text-gold">{couple.display}</p>
                  <p className="font-display text-xs tracking-wide text-ink-light">
                    /public/couple.jpg ekleyin
                  </p>
                </div>
              )}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24"
                style={{
                  background:
                    "linear-gradient(to top, rgba(243,237,219,0.45) 0%, transparent 100%)",
                }}
                aria-hidden
              />
            </div>
          </div>

          {/* Dual-corner bouquet strip along bottom edge only */}
          <SectionFlorals section="closing" className="z-20" />
        </div>
      </SectionReveal>
    </section>
  );
}
