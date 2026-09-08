"use client";

import Image from "next/image";
import { invitationConfig } from "@config";

interface ScriptHeadingProps {
  children: string;
  className?: string;
  /** Heading element — default h2 */
  as?: "h2" | "h3" | "p";
}

/**
 * Gold script section title with left/right flourish ornaments.
 * Flourishes shrink slightly on narrow screens but stay on one line.
 */
export default function ScriptHeading({
  children,
  className = "",
  as: Tag = "h2",
}: ScriptHeadingProps) {
  const { flourishLeft, flourishRight } = invitationConfig.assets;

  return (
    <div
      className={`flex w-full items-center justify-center gap-3 sm:gap-4 ${className}`}
    >
      <Image
        src={flourishLeft}
        alt=""
        width={48}
        height={24}
        className="h-auto w-[clamp(2rem,10vw,3rem)] shrink select-none opacity-90"
        unoptimized
        aria-hidden
      />
      <Tag className="min-w-0 shrink text-center font-script text-[clamp(1.65rem,7vw,2.25rem)] leading-none text-gold">
        {children}
      </Tag>
      <Image
        src={flourishRight}
        alt=""
        width={48}
        height={24}
        className="h-auto w-[clamp(2rem,10vw,3rem)] shrink select-none opacity-90"
        unoptimized
        aria-hidden
      />
    </div>
  );
}
