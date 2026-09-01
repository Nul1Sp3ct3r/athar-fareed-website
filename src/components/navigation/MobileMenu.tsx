"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { Wordmark } from "@/components/navigation/Wordmark";
import { siteConfig } from "@/config/site";
import { EASE } from "@/lib/animations";
import { localePath } from "@/lib/i18n";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { NavItem } from "@/lib/nav";

export function MobileMenu({
  locale,
  t,
  items,
}: {
  locale: Locale;
  t: Dictionary;
  items: NavItem[];
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Lock the page behind the overlay and allow Escape to dismiss.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        className="relative z-[70] flex size-11 items-center justify-center rounded-full border-2 border-ink bg-paper-raised text-ink lg:hidden"
      >
        <span aria-hidden className="relative block h-3.5 w-5">
          <motion.span
            className="absolute inset-x-0 top-0 block h-[2px] rounded-full bg-current"
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          />
          <motion.span
            className="absolute inset-x-0 bottom-0 block h-[2px] rounded-full bg-current"
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menuLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden"
          >
            <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

            {/* The header wordmark sits under the overlay, so restate it here. */}
            <div className="pointer-events-none absolute inset-x-5 top-0 flex h-[72px] items-center sm:inset-x-8">
              <Wordmark locale={locale} asLink={false} />
            </div>

            <div className="relative flex flex-1 flex-col justify-between overflow-y-auto px-5 pb-10 pt-28 sm:px-8">
              <nav aria-label={t.nav.menuLabel} className="flex flex-col">
                {items.map((item, index) => (
                  <div key={item.href} className="overflow-hidden border-b border-ink/15">
                    <motion.div
                      initial={{ y: "105%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.08 + index * 0.06, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        className="flex items-baseline justify-between py-4 text-[clamp(2.25rem,11vw,3.25rem)] font-medium leading-none tracking-[-0.03em] text-ink"
                      >
                        {item.label}
                        <span className="text-micro text-ink-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36, ease: EASE }}
                className="mt-12 space-y-6"
              >
                <Link
                  href={localePath(locale, "/contact")}
                  onClick={close}
                  className="flex items-center justify-between gap-4 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-paper"
                >
                  {t.nav.cta}
                  <Arrow />
                </Link>

                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-ink-soft underline decoration-ink/30 underline-offset-4"
                  >
                    {siteConfig.email}
                  </a>
                  <LanguageSwitcher
                    locale={locale}
                    label={t.nav.switchTo}
                    ariaLabel={t.nav.languageLabel}
                    onNavigate={close}
                  />
                </div>

                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-faint">
                  {siteConfig.social.map((social) => (
                    <li key={social.label}>
                      <a href={social.href} target="_blank" rel="noreferrer noopener">
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
