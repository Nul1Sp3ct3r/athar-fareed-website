"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { EASE, viewport } from "@/lib/animations";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word mask reveal. Splitting happens on whitespace only — never
 * per character, which would break Arabic letter shaping.
 *
 * Always renders a <span>; wrap it in the semantic element you need so the
 * motion component identity stays stable across renders.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const reduced = useReducedMotionSafe();
  const words = text.split(" ").filter(Boolean);

  const activation = animateOnMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...activation}
      transition={{
        delayChildren: reduced ? 0 : delay,
        staggerChildren: reduced ? 0 : stagger,
      }}
    >
      {/* The animated words are decorative; assistive tech reads this copy. */}
      <span className="sr-only">{text}</span>

      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span
            aria-hidden
            /* Padding buys room for Latin descenders and, more importantly,
               the marks that sit above Arabic letterforms; the matching
               negative margins keep the line box unchanged. */
            className="inline-block overflow-hidden pb-[0.16em] pt-[0.22em] align-bottom -mb-[0.16em] -mt-[0.22em]"
          >
            <motion.span
              className={cn("inline-block", wordClassName)}
              variants={{
                hidden: { y: "132%" },
                visible: {
                  y: "0%",
                  transition: { duration: reduced ? 0 : 0.9, ease: EASE },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* The separator is a real text node outside the clipping wrapper,
              which would otherwise trim it as trailing white space. */}
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
