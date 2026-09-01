import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { CtaSection } from "@/components/sections/CtaSection";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { SocialProof } from "@/components/sections/SocialProof";
import { Services } from "@/components/sections/Services";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { WhyUs } from "@/components/sections/WhyUs";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildMetadata({ locale }) : {};
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Hero locale={locale} />
      <TechMarquee locale={locale} />
      <Services locale={locale} />
      <SelectedWork locale={locale} />
      <SocialProof locale={locale} />
      <About locale={locale} />
      <Process locale={locale} />
      <WhyUs locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
