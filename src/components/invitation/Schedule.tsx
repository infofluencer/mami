"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { invitationConfig } from "@config";
import TornPaperCard from "./TornPaperCard";
import ScriptHeading from "./ScriptHeading";
import SectionReveal from "./SectionReveal";

const ROSE_SIZE = 48;
/** Equal center-to-center row rhythm */
const ROW_H = 76;
const LINE = "#8A7666";
const ROW = "#6b5644";

function DiamondNode() {
  return (
    <span
      className="relative z-10 inline-flex h-2.5 w-2.5 items-center justify-center"
      aria-hidden
    >
      <span
        className="h-[10px] w-[10px] rotate-45"
        style={{ backgroundColor: ROW }}
      />
    </span>
  );
}

function EventLabel({ text }: { text: string }) {
  const lines = text.split(/\s*\/\s*|\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length <= 1) {
    return (
      <span className="font-display text-[1.25rem] font-normal leading-snug tracking-wide text-[#6b5644]">
        {text}
      </span>
    );
  }
  return (
    <span className="flex flex-col items-start text-left font-display text-[1.25rem] font-normal leading-[1.2] tracking-wide text-[#6b5644]">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  );
}

/** Schedule — reference typography + scroll-driven rose */
export default function Schedule() {
  const { schedule, texts, assets } = invitationConfig;
  const reduced = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLSpanElement>(null);
  const lastNodeRef = useRef<HTMLSpanElement>(null);

  const [startY, setStartY] = useState(0);
  const [travel, setTravel] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const first = firstNodeRef.current;
    const last = lastNodeRef.current;
    if (!track || !first || !last) return;

    const measure = () => {
      const trackBox = track.getBoundingClientRect();
      const firstBox = first.getBoundingClientRect();
      const lastBox = last.getBoundingClientRect();
      const firstCenter = firstBox.top + firstBox.height / 2 - trackBox.top;
      const lastCenter = lastBox.top + lastBox.height / 2 - trackBox.top;
      setStartY(firstCenter - ROSE_SIZE / 2);
      setTravel(Math.max(0, lastCenter - firstCenter));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [schedule.length]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });

  const yRaw = useTransform(scrollYProgress, (v) => v * travel);
  const ySpring = useSpring(yRaw, { stiffness: 120, damping: 28, mass: 0.4 });
  const roseY = reduced ? 0 : ySpring;

  return (
    <section className="w-full bg-ivory py-4">
      <SectionReveal>
        <TornPaperCard>
          <ScriptHeading className="mb-10 px-1 pt-1">
            {texts.scheduleHeading}
          </ScriptHeading>

          <div ref={trackRef} className="relative mx-auto w-full max-w-[340px] pb-1">
            {/* Center timeline — thin muted taupe */}
            <div
              className="pointer-events-none absolute bottom-[38px] left-1/2 top-[38px] w-[1.5px] -translate-x-1/2"
              style={{ backgroundColor: LINE }}
              aria-hidden
            />

            <motion.div
              className="pointer-events-none absolute z-30"
              style={{
                left: "50%",
                top: startY,
                x: "-50%",
                y: roseY,
                width: ROSE_SIZE,
                height: ROSE_SIZE,
                transformOrigin: "center center",
              }}
              aria-hidden
            >
              <Image
                src={assets.timelineRose}
                alt=""
                width={ROSE_SIZE}
                height={ROSE_SIZE}
                className="h-full w-full object-contain drop-shadow-[0_2px_5px_rgba(92,74,58,0.22)]"
                unoptimized
              />
            </motion.div>

            <ul className="relative">
              {schedule.map((item, i) => {
                const isFirst = i === 0;
                const isLast = i === schedule.length - 1;
                return (
                  <li
                    key={`${item.time}-${item.event}`}
                    className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4"
                    style={{ minHeight: ROW_H }}
                  >
                    <span className="text-right font-display text-[2rem] font-normal tabular-nums tracking-wide text-[#6b5644] sm:text-[2.125rem]">
                      {item.time}
                    </span>

                    <span
                      ref={
                        isFirst
                          ? firstNodeRef
                          : isLast
                            ? lastNodeRef
                            : undefined
                      }
                      className="flex w-4 justify-center"
                    >
                      <DiamondNode />
                    </span>

                    <EventLabel text={item.event} />
                  </li>
                );
              })}
            </ul>
          </div>
        </TornPaperCard>
      </SectionReveal>
    </section>
  );
}
