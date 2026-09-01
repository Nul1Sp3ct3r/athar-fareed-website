import { cn } from "@/lib/utils";

/** Section label, set as a small outlined chip rather than bare text. */
export function Eyebrow({
  children,
  tone = "bg-paper-raised",
  className,
}: {
  children: React.ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink px-3.5 py-1.5",
        "text-micro font-bold uppercase text-ink",
        tone,
        className,
      )}
    >
      {children}
    </span>
  );
}
