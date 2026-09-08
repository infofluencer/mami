"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Stagger children on reveal */
  stagger?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: 0.08,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const singleVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/** Fade + slide-up when section enters viewport */
export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: SectionRevealProps) {
  const reduced = useReducedMotion();
  const d = reduced ? 0 : delay;

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        custom={d}
        variants={
          reduced
            ? {
                hidden: { opacity: 1 },
                visible: { opacity: 1 },
              }
            : containerVariants
        }
      >
        {Array.isArray(children) ? (
          children.map((child, i) => (
            <motion.div key={i} variants={reduced ? undefined : itemVariants}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={reduced ? undefined : itemVariants}>
            {children}
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={d}
      variants={
        reduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : singleVariants
      }
    >
      {children}
    </motion.div>
  );
}
