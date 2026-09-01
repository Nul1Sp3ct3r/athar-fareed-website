"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { DoodleTile } from "@/components/illustration/Sticker";
import type { DoodleName } from "@/components/illustration/Doodle";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

interface Tile {
  name: DoodleName;
  tone: string;
  fill: string;
  /** Placement inside the collage box. */
  position: string;
  rotate: string;
  /** How strongly the tile answers the pointer. */
  depth: number;
}

const TILES: Tile[] = [
  {
    name: "browser",
    tone: "bg-cobalt",
    fill: "fill-acid",
    position: "start-0 top-4 size-[8.5rem] sm:size-[10.5rem]",
    rotate: "-rotate-6",
    depth: 14,
  },
  {
    name: "spark",
    tone: "bg-acid",
    fill: "fill-paper-raised",
    position: "start-[42%] top-0 size-[6rem] sm:size-[7rem]",
    rotate: "rotate-[9deg]",
    depth: 24,
  },
  {
    name: "phone",
    tone: "bg-sun",
    fill: "fill-paper-raised",
    position: "start-[30%] bottom-0 size-[7.5rem] sm:size-[9rem]",
    rotate: "rotate-[5deg]",
    depth: 18,
  },
  {
    name: "shield",
    tone: "bg-coral",
    fill: "fill-paper-raised",
    position: "end-0 bottom-6 size-[6.5rem] sm:size-[7.5rem]",
    rotate: "-rotate-[10deg]",
    depth: 30,
  },
];

/**
 * The hero's graphic block: four illustrated tiles overlapped like objects
 * dropped on a desk. They drift a little with the pointer, which is the only
 * cursor-driven moment on the page.
 */
export function HeroCollage({ className }: { className?: string }) {
  const reduced = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function onMove(event: PointerEvent) {
      x.set((event.clientX / window.innerWidth - 0.5) * 2);
      y.set((event.clientY / window.innerHeight - 0.5) * 2);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  return (
    <div
      aria-hidden
      className={cn("relative h-[17rem] w-full max-w-[30rem] sm:h-[21rem]", className)}
    >
      {TILES.map((tile) => (
        <FloatingTile key={tile.name} tile={tile} pointerX={x} pointerY={y} />
      ))}
    </div>
  );
}

function FloatingTile({
  tile,
  pointerX,
  pointerY,
}: {
  tile: Tile;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  pointerY: ReturnType<typeof useMotionValue<number>>;
}) {
  const reduced = useReducedMotionSafe();
  const depth = reduced ? 0 : tile.depth;

  const dx = useSpring(useTransform(pointerX, (value) => value * depth), {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });
  const dy = useSpring(useTransform(pointerY, (value) => value * depth), {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  return (
    <motion.div
      style={{ x: dx, y: dy }}
      className={cn("absolute", tile.position)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.25, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <DoodleTile
        name={tile.name}
        tone={tile.tone}
        fill={tile.fill}
        className={cn(
          "size-full card-lift transition-transform duration-500 ease-spring hover:rotate-0",
          tile.rotate,
        )}
        doodleClassName="w-[58%]"
      />
    </motion.div>
  );
}
