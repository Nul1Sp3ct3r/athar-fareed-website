import { Doodle } from "@/components/illustration/Doodle";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import type { Service } from "@/data/services";
import { getDictionary, localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn, pad } from "@/lib/utils";

/**
 * Each card is composed like a small poster: the illustration is the largest
 * element and is anchored differently per variant, so the six never resolve
 * into a repeating tile.
 */
const doodlePlacement = {
  feature: "bottom-7 end-7 w-[44%] max-w-[19rem] rotate-[-4deg] group-hover:rotate-[-1deg]",
  standard: "bottom-5 end-5 w-[34%] max-w-[9.5rem] rotate-[5deg] group-hover:rotate-[1deg]",
  compact: "bottom-5 end-5 w-[44%] max-w-[8.5rem] rotate-[-6deg] group-hover:rotate-[-2deg]",
} as const;

const minHeight = {
  feature: "min-h-[22rem] lg:min-h-[31rem]",
  standard: "min-h-[17rem] lg:min-h-[18rem]",
  compact: "min-h-[16rem] lg:min-h-[17rem]",
} as const;

function ServiceCard({
  service,
  index,
  locale,
  className,
}: {
  service: Service;
  index: number;
  locale: Locale;
  className?: string;
}) {
  const { variant } = service;
  const isFeature = variant === "feature";
  const onDark = service.onTone === "text-paper";

  return (
    <article
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-card-lg border-2 border-ink p-6 sm:p-7",
        "transition-transform duration-500 ease-spring hover:-translate-y-1.5",
        isFeature && "lg:p-9",
        service.tone,
        service.onTone,
        minHeight[variant],
        className,
      )}
    >
      <div className="relative flex items-baseline gap-3">
        <span
          className={cn(
            "font-display index-label text-2xl leading-none",
            onDark ? "text-paper/70" : "text-ink/45",
          )}
        >
          {pad(index + 1)}
        </span>
        <span
          aria-hidden
          className={cn("h-0.5 flex-1", onDark ? "bg-paper/30" : "bg-ink/20")}
        />
      </div>

      <h3
        className={cn(
          "font-display relative mt-6 max-w-[13ch]",
          isFeature ? "text-title" : "text-subtitle sm:text-[1.75rem]",
        )}
      >
        {service.title[locale]}
      </h3>

      <p
        className={cn(
          "relative mt-3",
          isFeature ? "max-w-sm text-lead" : "text-sm sm:text-base",
          variant === "standard" && "max-w-[26ch]",
          variant === "compact" && "max-w-[24ch] pb-24",
          onDark ? "text-paper/80" : "text-ink-soft",
        )}
      >
        {service.description[locale]}
      </p>

      {variant !== "compact" ? (
        <ul className="relative mt-auto flex flex-wrap gap-2 pt-8 sm:max-w-[62%]">
          {service.points[locale].map((point) => (
            <li
              key={point}
              className={cn(
                "rounded-full border-2 px-3 py-1 text-xs font-semibold",
                onDark ? "border-paper/40 text-paper" : "border-ink/25 text-ink",
              )}
            >
              {point}
            </li>
          ))}
        </ul>
      ) : null}

      <Doodle
        name={service.doodle}
        tone={service.fill}
        className={cn(
          "pointer-events-none absolute -z-10 transition-transform duration-700 ease-spring",
          onDark ? "text-paper" : "text-ink",
          doodlePlacement[variant],
        )}
      />
    </article>
  );
}

export function Services({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Section id="services" size="lg">
      <Container>
        <SectionHeading
          eyebrow={t.services.eyebrow}
          eyebrowTone="bg-acid"
          title={t.services.heading}
          lead={t.services.lead}
          action={
            <ButtonLink href={localePath(locale, "/services")} variant="secondary" withArrow>
              {t.services.cta}
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              pattern="scale"
              delay={Math.min(index, 3) * 0.05}
              className={service.span}
            >
              <ServiceCard
                service={service}
                index={index}
                locale={locale}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
