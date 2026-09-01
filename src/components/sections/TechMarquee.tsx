import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { technologies } from "@/data/services";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/** Dots cycle through the palette so the band carries colour without noise. */
const DOTS = ["bg-acid", "bg-sun", "bg-coral", "bg-lilac", "bg-magenta", "bg-cobalt"];

/**
 * The page's one dark band. It sits between the hero and the first full
 * section to give the light canvas a hard horizontal beat.
 */
export function TechMarquee({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-night py-12 text-paper lg:py-14">
      <Container>
        <h2 className="max-w-2xl text-subtitle font-semibold text-paper/70">{t.marquee.heading}</h2>
      </Container>

      {/* Technology names stay left-to-right regardless of page direction. */}
      <Reveal pattern="fade" delay={0.1} className="mt-8 lg:mt-10">
        <div dir="ltr">
          <Marquee duration={46}>
            {technologies.map((tech, index) => (
              <span key={`a-${tech}`} className="flex items-center gap-6 pe-6 lg:gap-9 lg:pe-9">
                <span className="font-display whitespace-nowrap text-[clamp(2rem,4.6vw,4rem)] text-paper">
                  {tech}
                </span>
                <span className={`size-3 shrink-0 rounded-full ${DOTS[index % DOTS.length]}`} />
              </span>
            ))}
          </Marquee>
        </div>

        <div dir="ltr" className="mt-7 lg:mt-8">
          <Marquee duration={66} reverse>
            {[...technologies].reverse().map((tech) => (
              <span
                key={`b-${tech}`}
                className="me-2.5 flex items-center whitespace-nowrap rounded-full border-2 border-paper/25 px-4 py-1.5 text-xs font-semibold text-paper/60 lg:me-3"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
