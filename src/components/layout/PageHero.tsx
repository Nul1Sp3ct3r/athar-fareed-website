import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Shared masthead for every inner page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="rule-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_75%_at_50%_0%,black,transparent)]" />
        <div className="absolute -end-[8%] -top-[26%] size-[30rem] rounded-full bg-sun/25 blur-3xl" />
        <div className="absolute -start-[10%] top-[30%] size-[24rem] rounded-full bg-lilac/25 blur-3xl" />
      </div>

      <Container className="relative pb-16 pt-32 sm:pt-40 lg:pb-24 lg:pt-52">
        <Reveal y={12} duration={0.6}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:items-end lg:gap-6">
          <h1 className="font-display text-display text-ink lg:col-span-7">
            <TextReveal text={title} animateOnMount delay={0.1} />
          </h1>

          {lead ? (
            <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-md text-base text-ink-soft sm:text-lead">{lead}</p>
            </Reveal>
          ) : null}
        </div>

        {children}
      </Container>
    </section>
  );
}
