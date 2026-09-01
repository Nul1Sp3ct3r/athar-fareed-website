/** Shared easing — expo-out reads as "fast then settle", the premium default. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Standard scroll trigger: fire a little before the element is centred. */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;
