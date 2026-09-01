"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/animations";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** Used from template.tsx, so it replays on every route change. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
