"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** Quiet "there is more below" hint. */
export function ScrollCue({ label }: { label: string }) {
  const reduced = useReducedMotionSafe();

  return (
    <div className="flex items-center gap-3 text-micro uppercase text-ink-soft">
      <span className="relative block h-8 w-px overflow-hidden bg-ink/20">
        <motion.span
          className="absolute inset-x-0 top-0 block h-3 bg-cobalt"
          animate={reduced ? { y: 0 } : { y: ["-100%", "300%"] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </span>
      {label}
    </div>
  );
}
