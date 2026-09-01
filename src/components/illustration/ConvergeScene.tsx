import { Doodle } from "@/components/illustration/Doodle";
import { DoodleTile } from "@/components/illustration/Sticker";
import { cn } from "@/lib/utils";

/**
 * Several digital objects moving toward one finished product — the closing
 * image of the page, built from the same tiles used in the hero.
 */
export function ConvergeScene({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative mx-auto h-64 w-full max-w-2xl sm:h-72", className)}>
      {/* Inbound objects */}
      <DoodleTile
        name="terminal"
        tone="bg-paper-raised"
        fill="fill-lilac"
        className="absolute start-0 top-4 size-20 -rotate-12 sm:size-24"
        doodleClassName="w-[58%]"
      />
      <DoodleTile
        name="database"
        tone="bg-paper-raised"
        fill="fill-sun"
        className="absolute start-[14%] bottom-2 size-[4.5rem] rotate-6 sm:size-20"
        doodleClassName="w-[54%]"
      />
      <DoodleTile
        name="cloud"
        tone="bg-paper-raised"
        fill="fill-magenta"
        className="absolute end-[14%] top-2 size-[4.5rem] rotate-[10deg] sm:size-20"
        doodleClassName="w-[58%]"
      />
      <DoodleTile
        name="cursor"
        tone="bg-paper-raised"
        fill="fill-coral"
        className="absolute end-0 bottom-6 size-20 -rotate-6 sm:size-24"
        doodleClassName="w-[52%]"
      />

      {/* Inbound motion lines */}
      <svg
        viewBox="0 0 400 260"
        className="absolute inset-0 size-full text-ink/35"
        preserveAspectRatio="none"
      >
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="9 11">
          <path d="M96 62c34 14 52 34 64 58" />
          <path d="M96 214c30-16 48-38 60-62" />
          <path d="M304 58c-32 16-50 36-62 60" />
          <path d="M306 210c-30-14-48-36-60-60" />
        </g>
      </svg>

      {/* The product they add up to */}
      <div className="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-card border-2 border-ink bg-ink sm:size-36">
        <Doodle name="spark" tone="fill-acid" className="w-[56%] text-paper" />
      </div>
    </div>
  );
}
