"use client";

import { useSyncExternalStore } from "react";

/** Nothing to subscribe to — the value flips once and never changes again. */
function subscribe(): () => void {
  return () => {};
}

/**
 * False on the server and during the hydrating render, true from the render
 * straight after.
 *
 * Use it to serve markup the server can reproduce exactly, then swap in
 * client-only values (randomised layout, measured sizes) once hydration is
 * safely past. Mirrors `useReducedMotionSafe`, which solves the same problem
 * for the motion preference.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
