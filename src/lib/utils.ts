type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Minimal class joiner — avoids pulling in clsx for a 10-line utility. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }

  return out.join(" ");
}

/** "01", "02", … for editorial index labels. */
export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
