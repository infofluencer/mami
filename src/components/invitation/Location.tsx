import Image from "next/image";
import { invitationConfig } from "@config";
import GoldDivider from "./GoldDivider";
import ScriptHeading from "./ScriptHeading";
import SectionReveal from "./SectionReveal";

/** (5) Venue name, illustration, framed map + open link */
export default function Location() {
  const { venue, texts, assets } = invitationConfig;

  return (
    <section className="px-4 py-9">
      <SectionReveal className="text-center">
        <ScriptHeading>{texts.locationHeading}</ScriptHeading>
        <GoldDivider className="my-6" compact />

        <p className="font-display text-xl font-medium text-ink">{venue.name}</p>
        <p className="mx-auto mt-2.5 max-w-xs font-display text-base font-normal leading-[1.6] text-ink sm:text-[1.0625rem]">
          {venue.address}
        </p>
      </SectionReveal>

      <SectionReveal delay={0.1} className="mx-auto mt-8 max-w-md">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-card">
          <Image
            src={assets.venue}
            alt={venue.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 448px) 100vw, 448px"
          />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.15} className="mx-auto mt-8 w-full">
        {/* Ornate / torn-paper style map frame */}
        <div
          className="relative overflow-hidden p-[3px] shadow-card"
          style={{
            background:
              "linear-gradient(145deg, #D4B896 0%, #B08D4C 40%, #A67C34 70%, #D4B896 100%)",
            clipPath: `polygon(
              0% 2%, 4% 0%, 10% 1.5%, 18% 0%, 28% 1%, 40% 0%, 55% 1.5%, 70% 0%,
              82% 1%, 92% 0%, 100% 2%,
              100% 98%, 96% 100%, 88% 98.5%, 75% 100%, 60% 98%, 45% 100%,
              30% 98.5%, 18% 100%, 8% 98%, 0% 100%
            )`,
          }}
        >
          <div
            className="relative overflow-hidden bg-ivory-light"
            style={{
              clipPath: "inherit",
            }}
          >
            {/* Pill — top-left of map */}
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-gold/40 bg-ivory-light/95 px-3.5 py-1.5 font-display text-[10px] uppercase tracking-[0.14em] text-gold-dark shadow-card backdrop-blur-sm transition-colors hover:border-gold hover:bg-ivory"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 10 5 10s5-6.5 5-10a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
              {texts.openMaps}
            </a>

            <div className="relative aspect-[4/3] w-full">
              <iframe
                src={venue.mapEmbedUrl}
                title={`${venue.name} haritası`}
                className="absolute inset-0 h-full w-full border-0 grayscale-[25%] sepia-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
