"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-2 text-xs text-ink-soft transition-colors duration-300 hover:text-ink"
    >
      {label}
      <ArrowUp className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
    </button>
  );
}
