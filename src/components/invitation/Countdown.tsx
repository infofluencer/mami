"use client";

import { useState, useEffect } from "react";
import { invitationConfig } from "@config";
import SectionReveal from "./SectionReveal";
import ScriptHeading from "./ScriptHeading";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const labels = ["GÜN", "SAAT", "DAKİKA", "SANİYE"] as const;

/** Plain cream countdown — no boxes, gold numbers + colons */
export default function Countdown() {
  const { event, texts } = invitationConfig;
  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(event.dateISO));

  useEffect(() => {
    const id = setInterval(() => setTime(calcTimeLeft(event.dateISO)), 1000);
    return () => clearInterval(id);
  }, [event.dateISO]);

  const values = [time.days, time.hours, time.minutes, time.seconds];

  return (
    <section className="bg-ivory px-4 py-10">
      <SectionReveal className="text-center">
        <ScriptHeading>{texts.countdownHeading}</ScriptHeading>

        <div className="mx-auto mt-8 flex max-w-sm items-start justify-center gap-1 sm:gap-2">
          {values.map((val, i) => (
            <div key={labels[i]} className="flex items-start gap-1 sm:gap-2">
              <div className="flex min-w-[3.2rem] flex-col items-center sm:min-w-[3.6rem]">
                <span className="font-display text-[1.85rem] font-medium tabular-nums leading-none text-gold sm:text-[2.15rem]">
                  {String(val).padStart(2, "0")}
                </span>
                <span className="mt-2.5 font-display text-[11px] uppercase tracking-[0.22em] text-gold sm:text-xs">
                  {labels[i]}
                </span>
              </div>
              {i < values.length - 1 && (
                <span
                  className="mt-0.5 select-none font-display text-[1.65rem] font-light text-gold sm:text-[1.9rem]"
                  aria-hidden
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
