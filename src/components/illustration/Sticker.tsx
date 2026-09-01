import { Doodle } from "@/components/illustration/Doodle";
import type { DoodleName } from "@/components/illustration/Doodle";
import { cn } from "@/lib/utils";

/**
 * A doodle sitting in its own coloured tile — the unit the hero cluster and
 * the process flow are both built from.
 */
export function DoodleTile({
  name,
  tone = "bg-sun",
  fill = "fill-paper-raised",
  className,
  doodleClassName,
}: {
  name: DoodleName;
  tone?: string;
  fill?: string;
  className?: string;
  doodleClassName?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-card border-2 border-ink",
        tone,
        className,
      )}
    >
      <Doodle name={name} tone={fill} className={cn("w-1/2", doodleClassName)} />
    </span>
  );
}
