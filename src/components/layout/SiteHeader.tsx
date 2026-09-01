"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { NavLinks } from "@/components/navigation/NavLinks";
import { Wordmark } from "@/components/navigation/Wordmark";
import { useI18n } from "@/lib/i18n-client";
import { localePath } from "@/lib/i18n";
import { getNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";

export function SiteHeader() {
  const { locale, t } = useI18n();
  const items = getNavItems(locale, t);

  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCondensed(latest > 24);
    // Reveal on any upward intent; hide only once well past the hero fold.
    setHidden(latest > previous && latest > 420);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-[background-color,backdrop-filter,border-color] duration-500 ease-out-expo",
          condensed
            ? "border-b-2 border-ink/10 bg-paper/85 backdrop-blur-xl"
            : "border-b-2 border-transparent bg-transparent",
        )}
      >
        <Container className="relative flex h-[72px] items-center justify-between gap-4 lg:h-[84px]">
          <Wordmark locale={locale} />

          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
            <div className="pointer-events-auto rounded-full border-2 border-ink bg-paper-raised p-1">
              <NavLinks items={items} />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher
              locale={locale}
              label={t.nav.switchTo}
              ariaLabel={t.nav.languageLabel}
              className="max-sm:hidden"
            />
            <ButtonLink
              href={localePath(locale, "/contact")}
              withArrow
              className="max-sm:hidden"
            >
              {t.nav.cta}
            </ButtonLink>
            <MobileMenu locale={locale} t={t} items={items} />
          </div>
        </Container>
      </div>
    </motion.header>
  );
}
