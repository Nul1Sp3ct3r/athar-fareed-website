"use client";

import { motion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import {
  TRIGGER_FRACTION,
  createStickerSeed,
  detectStickerDensity,
  generateStickerLayout,
} from "@/lib/sticker-layout";
import { useIsHydrated } from "@/lib/use-hydrated";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/** Seven statements over six accents, ordered so no two neighbours repeat. */
const TONES = [
  "bg-acid text-ink",
  "bg-cobalt text-paper",
  "bg-sun text-ink",
  "bg-lilac text-ink",
  "bg-coral text-ink",
  "bg-magenta text-ink",
  "bg-acid text-ink",
];

/**
 * Forces the desktop row split; below `lg` the labels wrap on their own.
 * Latin runs 4 / 3, Arabic 3 / 4 — its phrases are markedly wider.
 */
const ROW_BREAK_AFTER = { en: 3, ar: 2 } as const;

/**
 * The statement collage.
 *
 * Three states, in order:
 *   rest   — what the server renders: invisible, no transform, all constants
 *   poised — after hydration: lifted above the panel, tilted, still invisible
 *   landed — on trigger: dropped into the slot with a single spring overshoot
 *
 * The randomised values only ever appear in `poised` and `landed`, both of
 * which are applied through `animate` after mount, so nothing generated here
 * reaches the server-rendered markup.
 */
export function AboutStickers({
  statements,
  locale,
}: {
  statements: readonly string[];
  locale: Locale;
}) {
  const isArabic = locale === "ar";
  const reduced = useReducedMotionSafe();
  const hydrated = useIsHydrated();
  const listRef = useRef<HTMLUListElement>(null);
  const [landed, setLanded] = useState(false);

  const [layout] = useState(() =>
    generateStickerLayout(statements.length, {
      seed: createStickerSeed(),
      density: detectStickerDensity(),
      arabic: isArabic,
    }),
  );

  useEffect(() => {
    const list = listRef.current;
    const panel = list?.closest("[data-about-panel]");
    if (!panel) return;

    // Watch the panel, not the sticker row: the row sits at the bottom of the
    // panel, so observing it would delay the drop until the section is almost
    // fully past. Shrinking the root's bottom edge by a share of the panel's
    // own height makes the trigger fire once roughly TRIGGER_FRACTION of the
    // panel is showing, and the viewport cap keeps it reachable on screens
    // shorter than the panel.
    const height = panel.getBoundingClientRect().height;
    const inset = Math.round(
      Math.min(height * TRIGGER_FRACTION, window.innerHeight * 0.55),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLanded(true);
          observer.disconnect();
        }
      },
      { rootMargin: `0px 0px -${inset}px 0px` },
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  const state = landed ? "landed" : hydrated ? "poised" : "rest";

  return (
    <motion.ul
      ref={listRef}
      initial="rest"
      animate={state}
      className={cn(
        "flex flex-wrap justify-center gap-x-2 gap-y-3 sm:gap-x-3 lg:gap-x-4",
        !landed && "pointer-events-none",
      )}
    >
      {statements.map((statement, index) => {
        const sticker = layout[index];

        return (
          <Fragment key={statement}>
            <motion.li
              className="group relative hover:z-30"
              variants={{
                rest: { opacity: 0 },
                poised: reduced
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: sticker.fall,
                      x: sticker.startX,
                      rotate: sticker.tilt,
                      scale: 0.96,
                      // Taking up the position must not be visible in itself.
                      transition: { duration: 0 },
                    },
                landed: {
                  opacity: 1,
                  y: sticker.y,
                  x: sticker.x,
                  rotate: sticker.rotate,
                  scale: 1,
                  transition: reduced
                    ? { duration: 0.25, delay: Math.min(sticker.delay, 0.25) }
                    : {
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        mass: 0.9,
                        delay: sticker.delay,
                        // Fades in just after release, so a label becomes
                        // visible on the way down rather than at full height.
                        opacity: { duration: 0.2, delay: sticker.delay + 0.05 },
                      },
                },
              }}
              whileHover={reduced ? undefined : { rotate: 0, y: sticker.y - 5, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 340, damping: 24 }}
            >
              <span
                className={cn(
                  "inline-flex items-center whitespace-nowrap rounded-full border-2 border-ink",
                  "px-4 py-2 sm:px-5 sm:py-2.5",
                  "font-display leading-none",
                  isArabic
                    ? "text-[clamp(0.9rem,1.42vw,1.25rem)]"
                    : "text-[clamp(0.95rem,1.5vw,1.3rem)]",
                  "shadow-[0_5px_14px_-6px_rgb(23_22_26/0.45)]",
                  "transition-shadow duration-300 group-hover:shadow-[0_12px_22px_-8px_rgb(23_22_26/0.5)]",
                  TONES[index % TONES.length],
                )}
              >
                {statement}
              </span>
            </motion.li>

            {index === ROW_BREAK_AFTER[isArabic ? "ar" : "en"] ? (
              <li aria-hidden className="hidden h-0 basis-full lg:block" />
            ) : null}
          </Fragment>
        );
      })}
    </motion.ul>
  );
}
