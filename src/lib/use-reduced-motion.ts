"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * Hydration-safe reduced-motion signal.
 *
 * The server cannot know the preference, so the first client render must
 * agree with it (`false`); React re-renders with the real value straight
 * after hydration. Use this to soften animations — never to change which
 * elements are rendered, which would reintroduce the mismatch.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
