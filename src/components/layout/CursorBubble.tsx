"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A scoped cursor affordance rather than a global cursor replacement: the
 * bubble only appears over elements that declare `data-cursor="Label"`.
 */
export function CursorBubble() {
  const [label, setLabel] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 34, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 400, damping: 34, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;

      x.set(event.clientX);
      y.set(event.clientY);

      // Mount only once a real mouse has moved, so touch sessions pay nothing.
      if (!readyRef.current) {
        readyRef.current = true;
        setReady(true);
      }

      const target = event.target as Element | null;
      const host = target?.closest?.("[data-cursor]") ?? null;
      setLabel(host ? host.getAttribute("data-cursor") : null);
    }

    function onLeave() {
      setLabel(null);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!ready) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
      style={{ x: springX, y: springY }}
    >
      <AnimatePresence>
        {label ? (
          <motion.span
            key="bubble"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="flex size-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-acid text-[11px] font-bold uppercase tracking-[0.12em] text-ink rtl:tracking-normal"
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
