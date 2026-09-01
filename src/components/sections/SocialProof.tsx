import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { partners, testimonials } from "@/data/proof";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * Social proof, wired but empty.
 *
 * There are no approved client quotes or logos yet, so nothing is invented
 * and nothing ships: in production this renders null. In development it
 * shows a clearly-labelled stub so the slot stays visible while the real
 * material is gathered. Add entries to `src/data/proof.ts` to turn it on.
 */
export function SocialProof({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const hasContent = testimonials.length > 0 || partners.length > 0;

  if (!hasContent) {
    if (process.env.NODE_ENV === "production") return null;

    return (
      <Section size="sm" aria-hidden>
        <Container>
          <div className="rounded-card border-2 border-dashed border-ink/30 p-6 text-sm text-ink-faint">
            {t.proof.devNote}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section size="md">
      <Container>
        <Eyebrow tone="bg-lilac">{t.proof.eyebrow}</Eyebrow>

        {testimonials.length > 0 ? (
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <li
                key={item.id}
                className="rounded-card-lg border-2 border-ink bg-paper-raised p-7"
              >
                <p className="text-subtitle text-ink">{item.quote[locale]}</p>
                <p className="mt-6 text-sm font-semibold text-ink">{item.author}</p>
                <p className="text-sm text-ink-soft">{item.role[locale]}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {partners.length > 0 ? (
          <ul className="mt-10 flex flex-wrap items-center gap-6">
            {partners.map((partner) => (
              <li key={partner.id} className="text-lg font-semibold text-ink-soft">
                {partner.name}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  );
}
