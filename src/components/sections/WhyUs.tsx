import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/** Each reason carries a colour on its number chip and its hover wash. */
const ROWS = [
  { chip: "bg-sun", wash: "group-hover:bg-sun/25" },
  { chip: "bg-acid", wash: "group-hover:bg-acid/25" },
  { chip: "bg-coral", wash: "group-hover:bg-coral/20" },
  { chip: "bg-lilac", wash: "group-hover:bg-lilac/25" },
  { chip: "bg-magenta", wash: "group-hover:bg-magenta/20" },
  { chip: "bg-cobalt", wash: "group-hover:bg-cobalt/12" },
];

/**
 * Inverted hierarchy: the section heading is set smaller than its own rows,
 * so the reasons are the largest type in the band.
 */
export function WhyUs({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Section id="why" size="md">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal pattern="fade">
              <Eyebrow tone="bg-magenta">{t.why.eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="font-display mt-5 max-w-[18ch] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] text-ink lg:mt-7">
              <TextReveal text={t.why.heading} />
            </h2>
          </div>

          <Reveal delay={0.1}>
            <p className="max-w-md text-base text-ink-soft sm:text-lead">{t.why.lead}</p>
          </Reveal>
        </div>

        <ul className="mt-12 border-t-2 border-ink lg:mt-16">
          {t.why.items.map((item, index) => {
            const style = ROWS[index % ROWS.length];

            return (
              <li
                key={item.title}
                className="group relative overflow-hidden border-b-2 border-ink/15"
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-transparent transition-colors duration-400 ease-out-expo",
                    style.wash,
                  )}
                />

                <Reveal delay={Math.min(index, 4) * 0.04} y={14}>
                  <div className="relative grid items-center gap-x-8 gap-y-3 py-6 transition-[padding] duration-400 ease-out-expo lg:grid-cols-[4.5rem_minmax(0,1fr)_22rem] lg:py-7 lg:group-hover:ps-4">
                    <span
                      className={cn(
                        "index-label inline-flex size-11 items-center justify-center rounded-full border-2 border-ink text-sm font-bold text-ink",
                        style.chip,
                      )}
                    >
                      {pad(index + 1)}
                    </span>

                    <h3 className="font-display text-row text-ink">{item.title}</h3>

                    <p className="text-sm text-ink-soft sm:text-base lg:col-start-3">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
