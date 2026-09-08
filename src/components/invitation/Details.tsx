import { invitationConfig } from "@config";
import TornPaperCard from "./TornPaperCard";
import ScriptHeading from "./ScriptHeading";
import SectionReveal from "./SectionReveal";

/** (6) Dress code & gift — corner florals behind padded text */
export default function Details() {
  const { texts } = invitationConfig;

  return (
    <section className="w-full py-5">
      <SectionReveal>
        <TornPaperCard florals="details">
          <div className="relative z-20 space-y-9 px-1 pb-2 pt-4 text-center sm:pt-6">
            <div>
              <ScriptHeading as="h3">{texts.dressCodeHeading}</ScriptHeading>
              <p className="mx-auto mt-5 max-w-[16rem] font-display text-base font-normal leading-[1.6] text-ink sm:text-[1.0625rem]">
                {texts.dressCode}
              </p>
            </div>

            <div>
              <ScriptHeading as="h3">{texts.giftHeading}</ScriptHeading>
              <p className="mx-auto mt-5 max-w-[16rem] font-display text-base font-normal leading-[1.6] text-ink sm:text-[1.0625rem]">
                {texts.gift}
              </p>
            </div>
          </div>
        </TornPaperCard>
      </SectionReveal>
    </section>
  );
}
