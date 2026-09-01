"use client";

import { motion } from "motion/react";
import { EASE, viewport } from "@/lib/animations";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Rule that draws itself from the reading edge — flips origin in RTL. */
export function GrowLine({
  className,
  delay = 0,
  animateOnMount = false,
}: {
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const reduced = useReducedMotionSafe();
  const activation = animateOnMount
    ? { animate: { scaleX: 1 } }
    : { whileInView: { scaleX: 1 }, viewport };

  return (
    <motion.span
      aria-hidden
      className={cn("block origin-left rtl:origin-right", className)}
      initial={{ scaleX: 0 }}
      {...activation}
      transition={{
        duration: reduced ? 0 : 1.1,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    />
  );
}
