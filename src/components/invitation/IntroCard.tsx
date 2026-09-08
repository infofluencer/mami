import { invitationConfig } from "@config";
import TornPaperCard from "./TornPaperCard";
import GoldDivider from "./GoldDivider";
import SectionReveal from "./SectionReveal";

/**
 * Intro — continuous cream from hero floral strip.
 * Torn top tucks under the seam florals; no floating-card gap/shadow.
 */
export default function IntroCard() {
  const { texts } = invitationConfig;

  return (
    <section className="relative z-10 -mt-10 w-full bg-transparent pb-1 pt-0 sm:-mt-12">
      <SectionReveal>
        <TornPaperCard florals="intro" flushTop>
          <div className="relative z-20 px-2 pb-3 pt-2 text-center sm:px-3 sm:pt-3">
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
