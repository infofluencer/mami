"use client";

import { useState } from "react";
import Image from "next/image";
import { invitationConfig } from "@config";

/** Soft top fade into page cream — matches reference (no hard photo edge) */
const PHOTO_TOP_MASK =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 6%, black 16%, black 100%)";

/**
 * Closing — photo flush to page bottom; smaller fotocicek bottom border.
 */
export default function Closing() {
  const { couple, texts, assets } = invitationConfig;
  const photoSrc = assets.couplePhoto || assets.couple;
  const floralSrc = assets.florals.photo;
  const [failed, setFailed] = useState(false);

  return (
    <section className="relative mt-0 overflow-hidden pb-0 pt-0">
      <div className="relative mx-auto w-full max-w-invite">
        <div className="relative aspect-[3/4] w-full">
          <div
            className="absolute inset-0 z-0 overflow-hidden bg-transparent"
            style={{
              WebkitMaskImage: PHOTO_TOP_MASK,
              maskImage: PHOTO_TOP_MASK,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          >
            {!failed ? (
              <Image
                src={photoSrc}
                alt={couple.display}
                fill
                className="object-cover object-[center_30%]"
                sizes="430px"
                priority={false}
                onError={() => setFailed(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-ivory-light to-ivory-dark" />
            )}

            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[22%]"
              style={{
                background:
                  "linear-gradient(to bottom, #F3EDDB 0%, rgba(243,237,219,0.75) 35%, rgba(243,237,219,0.2) 70%, transparent 100%)",
              }}
              aria-hidden
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-[14%] z-20 px-6 text-center">
            <p className="font-script text-[1.85rem] leading-snug text-gold drop-shadow-[0_1px_0_rgba(255,252,245,0.5)] sm:text-[2.1rem]">
              {texts.closing}
            </p>
            <p className="mt-3 font-script text-[2.35rem] leading-none text-gold sm:text-[2.65rem]">
              {couple.display}
            </p>
          </div>

          {/* Smaller bottom floral — sits on photo edge, clipped flush */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 w-full leading-[0]"
            aria-hidden
          >
            <Image
              src={floralSrc}
              alt=""
              width={1512}
              height={1512}
              className="relative left-1/2 h-auto w-[120%] max-w-none -translate-x-1/2 translate-y-[6%] select-none"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
