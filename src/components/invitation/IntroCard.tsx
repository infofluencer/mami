import { invitationConfig } from "@config";
import TornPaperCard from "./TornPaperCard";
import GoldDivider from "./GoldDivider";
import SectionReveal from "./SectionReveal";

/** Intro — same floating torn-paper card as Schedule */
export default function IntroCard() {
  const { texts } = invitationConfig;

  return (
    <section className="w-full bg-ivory py-4">
      <SectionReveal>
        <TornPaperCard florals="intro">
          <div className="relative z-20 text-center">
            {texts.besmele ? (
              <p className="mb-4 font-script text-[1.65rem] leading-snug text-gold sm:mb-5 sm:text-[1.85rem]">
                {texts.besmele}
              </p>
            ) : null}

            <div className="space-y-1.5">
              {texts.introLines.map((line) => (
                <p
                  key={line}
                  className="font-script text-[2rem] leading-[1.15] text-gold sm:text-[2.35rem]"
                >
                  {line}
                </p>
              ))}
            </div>

            <GoldDivider className="my-7" />

            <p className="mx-auto max-w-[18rem] font-display text-base font-normal leading-[1.6] text-ink sm:max-w-[19rem] sm:text-[1.0625rem]">
              {texts.introBody}
            </p>
          </div>
        </TornPaperCard>
      </SectionReveal>
    </section>
  );
}
