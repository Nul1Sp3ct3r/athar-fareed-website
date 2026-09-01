/**
 * Landing transforms for the About statement stickers.
 *
 * Composition is decided, not rolled. Each statement belongs to a fixed row
 * and a fixed slot within it, and the slot supplies a base horizontal spread
 * that pushes outer labels away from the centre so the cluster uses the width
 * of the panel. Randomness is confined to the *character* of the drop — fall
 * distance, tumble angle, delay, and a few pixels of jitter around the slot.
 *
 * Nothing here can move a label out of the panel: the stickers sit in normal
 * flex flow, so wrapping and containment stay under CSS control, and every
 * generated value is a small transform on top of that flow position.
 */

export type StickerDensity = "mobile" | "tablet" | "desktop";

/** Fraction of the About panel that must be in view before the drop starts. */
export const TRIGGER_FRACTION = 0.4;

export interface StickerTransform {
  /** Offset above the resting slot while poised, in px (negative). */
  fall: number;
  /** Horizontal offset while poised, in px. */
  startX: number;
  /** Rotation while falling, in degrees. */
  tilt: number;
  /** Resting rotation, in degrees. */
  rotate: number;
  /** Resting offset from the flow slot, in px. Visual only — flow is unmoved. */
  x: number;
  y: number;
  /** Seconds before this sticker starts falling. */
  delay: number;
}

interface Range {
  /** Maximum resting rotation. */
  rotate: number;
  /** How far the outermost slot in a row is pushed from centre. */
  spread: number;
  /** Jitter around the slot. */
  jitterX: number;
  jitterY: number;
  /** Fall distance bounds. */
  fall: [number, number];
  /** Starting horizontal offset bound. */
  startX: number;
  /** Maximum rotation during the fall. */
  tilt: number;
  /** Gap between consecutive drops. */
  step: [number, number];
}

/**
 * Latin ranges. Rotation stays inside ±3.5° at every size — enough to read as
 * hand-placed, not so much that a long pill starts to look toppled.
 */
const LATIN: Record<StickerDensity, Range> = {
  mobile: {
    rotate: 2.5,
    spread: 0,
    jitterX: 7,
    jitterY: 5,
    fall: [-200, -150],
    startX: 8,
    tilt: 6,
    step: [0.07, 0.12],
  },
  tablet: {
    rotate: 3,
    spread: 16,
    jitterX: 8,
    jitterY: 7,
    fall: [-260, -190],
    startX: 12,
    tilt: 8,
    step: [0.08, 0.13],
  },
  desktop: {
    rotate: 3.5,
    spread: 34,
    jitterX: 10,
    jitterY: 9,
    fall: [-320, -240],
    startX: 18,
    tilt: 10,
    step: [0.085, 0.14],
  },
};

/**
 * Arabic ranges. Connected letterforms lose legibility under tilt faster than
 * Latin, so rotation is capped at ±2.5°, and the phrases run wider, so they
 * get more room and less lateral jitter.
 */
const ARABIC: Record<StickerDensity, Range> = {
  mobile: { ...LATIN.mobile, rotate: 1.8, jitterX: 5, tilt: 4.5 },
  tablet: { ...LATIN.tablet, rotate: 2.2, spread: 12, jitterX: 6, tilt: 6 },
  desktop: { ...LATIN.desktop, rotate: 2.5, spread: 26, jitterX: 7, tilt: 7.5 },
};

/**
 * Row grouping per density, used to place each statement in its slot. Arabic
 * carries fewer per row on tablet because its phrases are markedly longer.
 */
const LATIN_ROWS: Record<StickerDensity, number[][]> = {
  mobile: [[0], [1], [2], [3], [4], [5], [6]],
  tablet: [
    [0, 1, 2],
    [3, 4, 5, 6],
  ],
  desktop: [
    [0, 1, 2, 3],
    [4, 5, 6],
  ],
};

const ARABIC_ROWS: Record<StickerDensity, number[][]> = {
  mobile: [[0], [1], [2], [3], [4], [5], [6]],
  tablet: [
    [0, 1],
    [2, 3],
    [4, 5, 6],
  ],
  // 3 / 4 rather than Latin's 4 / 3: the Arabic phrases are wide enough that a
  // four-up leading row overruns the panel at 1024 and drops a lone label.
  desktop: [
    [0, 1, 2],
    [3, 4, 5, 6],
  ],
};

/** Small, fast, seedable PRNG — enough for bounded layout jitter. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A fixed seed on the server and a fresh one in the browser.
 *
 * Nothing derived from the seed reaches the server-rendered markup — that is
 * always the constant `rest` variant — so the two never disagree.
 */
export function createStickerSeed(): number {
  if (typeof window === "undefined") return 0x5eed;
  return (Math.random() * 0xffffffff) >>> 0;
}

/** Reads the density band once, at layout time. */
export function detectStickerDensity(): StickerDensity {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(max-width: 639px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "desktop";
}

/** Where each statement sits: which row, and how far off-centre within it. */
function slotOffsets(rows: number[][], count: number): number[] {
  const offsets = new Array<number>(count).fill(0);

  for (const row of rows) {
    const half = (row.length - 1) / 2;
    row.forEach((item, position) => {
      if (item < count) {
        // -1 at the leading edge of the row, +1 at the trailing edge.
        offsets[item] = half === 0 ? 0 : (position - half) / half;
      }
    });
  }

  return offsets;
}

export function generateStickerLayout(
  count: number,
  {
    seed,
    density = "desktop",
    arabic = false,
  }: { seed: number; density?: StickerDensity; arabic?: boolean },
): StickerTransform[] {
  const random = mulberry32(seed);
  const range = (arabic ? ARABIC : LATIN)[density];
  const offsets = slotOffsets((arabic ? ARABIC_ROWS : LATIN_ROWS)[density], count);
  const between = (min: number, max: number) => min + random() * (max - min);

  let elapsed = 0;

  return Array.from({ length: count }, (_, index) => {
    const transform: StickerTransform = {
      fall: between(range.fall[0], range.fall[1]),
      startX: between(-range.startX, range.startX),
      // Alternating lean keeps a row from listing one way, whatever the
      // individual angles come out as.
      tilt: (index % 2 === 0 ? 1 : -1) * between(range.tilt * 0.5, range.tilt),
      rotate: (index % 2 === 0 ? 1 : -1) * between(range.rotate * 0.4, range.rotate),
      // Base spread from the slot, plus a little jitter so the row never
      // resolves into an even grid.
      x: offsets[index] * range.spread + between(-range.jitterX, range.jitterX),
      y: between(-range.jitterY, range.jitterY),
      delay: elapsed,
    };

    elapsed += between(range.step[0], range.step[1]);
    return transform;
  });
}
