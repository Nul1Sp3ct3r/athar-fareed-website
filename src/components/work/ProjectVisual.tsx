import type { ProjectVisual as VisualKind } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Interface fragments, drawn in the same ink-outline language as the doodles.
 * Light surfaces on a coloured panel, with the project's own accent used for
 * the one element that matters in each screen.
 */
function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-t-2xl border-2 border-ink bg-paper-raised">
      <div className="flex items-center gap-1.5 border-b-2 border-ink px-3 py-2.5 sm:px-4">
        <span className="size-2 rounded-full border-2 border-ink" />
        <span className="size-2 rounded-full border-2 border-ink" />
        <span className="ms-3 h-3 w-24 rounded-full bg-ink/10 sm:w-40" />
        <span className="ms-auto hidden h-3 w-8 rounded-full bg-ink/10 sm:block" />
      </div>
      {children}
    </div>
  );
}

function Bar({ className }: { className?: string }) {
  return <span className={cn("block rounded-full bg-ink/15", className)} />;
}

export function ProjectVisual({
  visual,
  accent = "bg-cobalt",
  className,
}: {
  visual: VisualKind;
  /** The project's accent, used for the highlight in each screen. */
  accent?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      dir="ltr"
      className={cn(
        "absolute inset-0 flex items-end justify-center px-5 pt-7 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12",
        className,
      )}
    >
      {visual === "commerce" ? (
        <div className="relative w-full max-w-[56rem]">
          <Chrome>
            <div className="flex items-center gap-2 border-b-2 border-ink/15 px-3 py-2.5 sm:px-4">
              <span className={cn("h-5 w-16 rounded-full border-2 border-ink", accent)} />
              <span className="h-5 w-12 rounded-full bg-ink/8" />
              <span className="h-5 w-14 rounded-full bg-ink/8" />
              <span className="ms-auto size-5 rounded-full border-2 border-ink" />
            </div>

            <div className="grid grid-cols-3 gap-2.5 p-3 sm:gap-3.5 sm:p-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-ink",
                      index % 3 === 1 ? accent : "bg-ink/8",
                    )}
                  >
                    <span className="absolute bottom-1.5 start-1.5 h-2 w-6 rounded-full border-2 border-ink bg-paper-raised" />
                  </div>
                  <Bar className="h-2 w-4/5" />
                  <Bar className="h-2 w-1/2 bg-ink/8" />
                </div>
              ))}
            </div>
          </Chrome>

          {/* Courier app, overlapping the storefront. */}
          <div className="absolute bottom-16 end-3 w-[24%] min-w-[80px] overflow-hidden rounded-[1.3rem] border-2 border-ink bg-paper-raised sm:end-7">
            <div className="flex justify-center py-2">
              <span className="h-1 w-7 rounded-full bg-ink/25" />
            </div>
            <div className="space-y-1.5 px-2.5 pb-3">
              <div className={cn("h-12 rounded-lg border-2 border-ink sm:h-16", accent)} />
              <Bar className="h-2 w-full" />
              <Bar className="h-2 w-2/3" />
              <div className="mt-2 h-5 rounded-full border-2 border-ink bg-ink" />
            </div>
          </div>
        </div>
      ) : null}

      {visual === "platform" ? (
        <div className="w-full max-w-[46rem]">
          <Chrome>
            <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
              <div className="hidden w-1/5 shrink-0 space-y-2.5 border-e-2 border-ink/15 pe-3 sm:block">
                <Bar className="h-2.5 w-full bg-ink/30" />
                <Bar className="h-2.5 w-4/5" />
                <Bar className="h-2.5 w-3/5" />
                <Bar className="h-2.5 w-4/5" />
                <span className={cn("mt-4 block h-7 rounded-md border-2 border-ink", accent)} />
              </div>

              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-3 gap-2.5">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className={cn(
                        "rounded-lg border-2 border-ink p-2.5",
                        index === 1 ? accent : "bg-paper",
                      )}
                    >
                      <Bar className="h-1.5 w-1/2 bg-ink/25" />
                      <div className="mt-2 h-3.5 w-3/4 rounded-full bg-ink/70" />
                    </div>
                  ))}
                </div>

                <div className="flex h-20 items-end gap-1.5 rounded-lg border-2 border-ink bg-paper p-2.5 sm:h-24">
                  {[38, 62, 45, 80, 55, 92, 70, 48, 66].map((height, index) => (
                    <span
                      key={index}
                      className={cn(
                        "flex-1 rounded-sm border-2 border-ink",
                        index === 5 ? accent : "bg-ink/12",
                      )}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <div className="space-y-2 rounded-lg border-2 border-ink bg-paper p-2.5">
                  {[0, 1, 2].map((row) => (
                    <div key={row} className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full border-2 border-ink" />
                      <Bar className="h-2 flex-1" />
                      <Bar className="h-2 w-8 bg-ink/8" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Chrome>
        </div>
      ) : null}

      {visual === "agent" ? (
        <div className="w-full max-w-[52rem]">
          <Chrome>
            <div className="grid gap-3 p-3 sm:grid-cols-[1.15fr_1fr] sm:gap-4 sm:p-4">
              <div className="space-y-2.5">
                <div className="w-4/5 space-y-1.5 rounded-xl rounded-ss-sm border-2 border-ink bg-paper p-2.5">
                  <Bar className="h-2 w-full" />
                  <Bar className="h-2 w-2/3" />
                </div>
                <div
                  className={cn(
                    "ms-auto w-3/4 space-y-1.5 rounded-xl rounded-se-sm border-2 border-ink p-2.5",
                    accent,
                  )}
                >
                  <Bar className="h-2 w-full bg-ink/35" />
                  <Bar className="h-2 w-1/2 bg-ink/25" />
                </div>
                <div className="w-[88%] space-y-1.5 rounded-xl rounded-ss-sm border-2 border-ink bg-paper p-2.5">
                  <Bar className="h-2 w-full" />
                  <Bar className="h-2 w-3/5" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border-2 border-dashed border-ink/40 px-2.5 py-2">
                  <span className={cn("size-2.5 rounded-full border-2 border-ink", accent)} />
                  <Bar className="h-2 w-1/3 bg-ink/12" />
                </div>
              </div>

              <div className="relative hidden rounded-xl border-2 border-ink bg-paper sm:block">
                <svg viewBox="0 0 160 120" className="size-full">
                  <g
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    className="text-ink"
                  >
                    <path d="M80 30v26M80 56 44 84M80 56l36 28" />
                  </g>
                  <g className="text-ink" stroke="currentColor" strokeWidth="3.5">
                    <circle cx="80" cy="24" r="11" fill="currentColor" />
                    <circle cx="42" cy="90" r="9" fill="none" />
                    <circle cx="118" cy="90" r="9" fill="none" />
                  </g>
                </svg>
              </div>
            </div>
          </Chrome>
        </div>
      ) : null}
    </div>
  );
}
