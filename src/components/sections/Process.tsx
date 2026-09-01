import { ArrowMark } from "@/components/illustration/Marks";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/** Colour and tilt per step — the flow reads as six pinned cards. */
const STEPS = [
  { tone: "bg-sun", tilt: "lg:-rotate-2" },
  { tone: "bg-acid", tilt: "lg:rotate-1" },
  { tone: "bg-lilac", tilt: "lg:-rotate-1" },
  { tone: "bg-coral", tilt: "lg:rotate-2" },
  { tone: "bg-magenta", tilt: "lg:-rotate-2" },
  { tone: "bg-cobalt", tilt: "lg:rotate-1" },
];

export function Process({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Section id="process" size="md">
      <Container>
        <SectionHeading
          eyebrow={t.process.eyebrow}
          eyebrowTone="bg-coral"
          title={t.process.heading}
          lead={t.process.lead}
        />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
          {t.process.steps.map((step, index) => {
            const style = STEPS[index % STEPS.length];
            const onDark = style.tone === "bg-cobalt";
            // Arrows sit between cards on a row, never after the last column.
            const showArrow = index % 3 !== 2 && index < t.process.steps.length - 1;

            return (
              <li key={step.title} className="relative">
                <Reveal pattern="scale" delay={(index % 3) * 0.06}>
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-card-lg border-2 border-ink p-6 sm:p-7",
                      "transition-transform duration-500 ease-spring hover:-translate-y-1.5 lg:hover:rotate-0",
                      style.tone,
                      style.tilt,
                      onDark ? "text-paper" : "text-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display index-label text-[3.5rem] leading-[0.8]",
                        onDark ? "text-paper" : "text-ink",
                      )}
                    >
                      {pad(index + 1)}
                    </span>
                    <h3 className="font-display mt-6 text-[1.75rem] leading-none">
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm sm:text-base",
                        onDark ? "text-paper/80" : "text-ink-soft",
                      )}
                    >
                      {step.text}
                    </p>
                  </div>
                </Reveal>

                {showArrow ? (
                  <ArrowMark
                    className="absolute -end-9 top-1/2 hidden w-14 -translate-y-1/2 text-ink/70 lg:block rtl:-scale-x-100"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
