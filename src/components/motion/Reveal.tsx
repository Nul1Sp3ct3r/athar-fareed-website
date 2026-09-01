"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE, viewport } from "@/lib/animations";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/**
 * Scroll-triggered entrance. Several patterns share one boundary so that not
 * every element on the page arrives the same way:
 *
 *   rise  — fade + translate, the default for text blocks
 *   fade  — opacity only, for elements already carrying motion of their own
 *   clip  — a wipe from the block's own bottom edge, for media panels
 *   scale — a very slight settle, for cards
 */
type Pattern = "rise" | "fade" | "clip" | "scale";

export function Reveal({
  children,
  pattern = "rise",
  delay = 0,
  y = 22,
  duration = 0.62,
  className,
}: {
  children: ReactNode;
  pattern?: Pattern;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();

  const variants = {
    rise: { hidden: { opacity: 0, y }, shown: { opacity: 1, y: 0 } },
    fade: { hidden: { opacity: 0 }, shown: { opacity: 1 } },
    clip: {
      hidden: { opacity: 0, clipPath: "inset(14% 0% 0% 0%)" },
      shown: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
    },
    scale: { hidden: { opacity: 0, y: 14, scale: 0.985 }, shown: { opacity: 1, y: 0, scale: 1 } },
  }[pattern];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      variants={variants}
      transition={{
        duration: reduced ? 0 : pattern === "clip" ? duration + 0.25 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
