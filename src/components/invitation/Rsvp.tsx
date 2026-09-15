"use client";

import { useReducedMotion } from "framer-motion";
import { invitationConfig } from "@config";
import WaxSeal from "./WaxSeal";
import GoldDivider from "./GoldDivider";
import ScriptHeading from "./ScriptHeading";
import SectionReveal from "./SectionReveal";

/** (7) RSVP — wax seal opens WhatsApp */
export default function Rsvp() {
  const { texts, rsvp } = invitationConfig;
  const reduced = useReducedMotion();

  const whatsappHref = (() => {
    const phone = rsvp.whatsapp.replace(/\D/g, "");
    const text = encodeURIComponent(rsvp.whatsappMessage || "");
    return text
      ? `https://wa.me/${phone}?text=${text}`
      : `https://wa.me/${phone}`;
  })();

  return (
    <section className="px-4 pb-0 pt-11">
      <SectionReveal className="text-center">
        <ScriptHeading>{texts.rsvpHeading}</ScriptHeading>
        <p className="mx-auto mt-4 max-w-xs font-display text-base font-normal leading-[1.6] text-ink sm:text-[1.0625rem]">
          {texts.rsvpSubtext}
        </p>
        <GoldDivider className="my-9" />

        <div className="flex flex-col items-center gap-2.5">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${texts.rsvpButton} — WhatsApp`}
            className="inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <WaxSeal
              size="lg"
              animate={!reduced}
              emboss={texts.rsvpButton}
              label={texts.rsvpButton}
            />
          </a>
          <span className="mt-1 flex flex-col items-center gap-0.5 font-display text-xs text-ink-light">
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path
                d="M12 19 L12 5 M6 11 L12 5 L18 11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {texts.rsvpOpenHint}
          </span>
        </div>
      </SectionReveal>
    </section>
  );
}
