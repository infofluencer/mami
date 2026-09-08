"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import {
  invitationConfig,
  type FloralPlacement,
  type FloralLayouts,
} from "@config";

export type FloralKey = keyof typeof invitationConfig.assets.florals;
export type FloralSection = keyof FloralLayouts;

/**
 * Single decorative floral from a config placement.
 * Parent must be `position: relative`.
 */
export default function FloralOverlay({
  placement,
  className = "",
}: {
  placement: FloralPlacement;
  className?: string;
}) {
  const src = invitationConfig.assets.florals[placement.which];
  const width =
    placement.widthPx ??
    Math.round(((placement.widthPercent ?? 40) / 100) * 430);
  const height = placement.heightPercent
    ? Math.round((placement.heightPercent / 100) * 560)
    : width;
  const opacity = placement.opacity ?? 0.95;
  const zIndex = placement.zIndex ?? 12;
  const objectFit = placement.objectFit ?? "contain";

  const style: CSSProperties = {
    top: placement.top,
    right: placement.right,
    bottom: placement.bottom,
    left: placement.left,
    opacity,
    zIndex,
    transform: placement.transform,
    width: placement.widthPercent
      ? `${placement.widthPercent}%`
      : placement.widthPx
        ? `${placement.widthPx}px`
        : undefined,
    height: placement.heightPercent
      ? `${placement.heightPercent}%`
      : "auto",
    maxWidth: "none",
    objectFit,
    objectPosition: placement.objectPosition,
  };

  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className={`pointer-events-none absolute select-none ${className}`}
      style={style}
      sizes={
        placement.widthPercent
          ? `${placement.widthPercent}vw`
          : `${width}px`
      }
      unoptimized
      aria-hidden
    />
  );
}

/** Render all florals for a named section from invitation.config.ts */
export function SectionFlorals({
  section,
  className = "",
}: {
  section: FloralSection;
  className?: string;
}) {
  const placements = invitationConfig.floralLayouts[section];
  if (!placements?.length) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-visible ${className || "z-[1]"}`}
      aria-hidden
    >
      {placements.map((p, i) => (
        <FloralOverlay key={`${section}-${p.which}-${i}`} placement={p} />
      ))}
    </div>
  );
}
