import type { DoodleName } from "@/components/illustration/Doodle";
import type { Localized } from "@/lib/i18n";


/**
 * Card weight inside the bento. Three variants keep the grid from reading as
 * six identical tiles: one lead card, three standard, two narrow.
 */
export type ServiceVariant = "feature" | "standard" | "compact";

export interface Service {
  id: string;
  /** Which house illustration carries the idea. */
  doodle: DoodleName;
  /** Card surface. Literal classes so Tailwind can statically detect them. */
  tone: string;
  /** Flat fill inside the illustration, chosen to sit on `tone`. */
  fill: string;
  /** Type colour for the card — cobalt is the only surface needing paper. */
  onTone: string;
  /** Bento placement. */
  span: string;
  variant: ServiceVariant;
  title: Localized;
  description: Localized;
  /** Short capability chips shown on hover / on the feature card. */
  points: Localized<string[]>;
}

export const services: Service[] = [
  {
    id: "web",
    doodle: "browser",
    tone: "bg-cobalt",
    fill: "fill-acid",
    onTone: "text-paper",
    span: "lg:col-span-7 lg:row-span-2",
    variant: "feature",
    title: { en: "Web Development", ar: "تطوير المواقع" },
    description: {
      en: "High-performance websites, platforms and digital experiences.",
      ar: "مواقع ومنصات وتجارب رقمية عالية الأداء.",
    },
    points: {
      en: ["Next.js", "Design systems", "Headless CMS", "Core Web Vitals"],
      ar: ["Next.js", "أنظمة تصميم", "أنظمة محتوى", "أداء وسرعة"],
    },
  },
  {
    id: "mobile",
    doodle: "phone",
    tone: "bg-sun",
    fill: "fill-paper-raised",
    onTone: "text-ink",
    span: "lg:col-span-5",
    variant: "standard",
    title: { en: "Mobile Applications", ar: "تطبيقات الجوال" },
    description: {
      en: "Scalable mobile products designed around real users.",
      ar: "تطبيقات قابلة للتوسع مصممة حول المستخدم.",
    },
    points: {
      en: ["Flutter", "iOS & Android", "Offline-first"],
      ar: ["Flutter", "iOS و Android", "يعمل دون اتصال"],
    },
  },
  {
    id: "ai",
    doodle: "spark",
    tone: "bg-acid",
    fill: "fill-paper-raised",
    onTone: "text-ink",
    span: "lg:col-span-5",
    variant: "standard",
    title: { en: "AI & Automation", ar: "الذكاء الاصطناعي والأتمتة" },
    description: {
      en: "AI agents, intelligent workflows and business automation.",
      ar: "وكلاء ذكاء اصطناعي وأتمتة عمليات وأنظمة ذكية.",
    },
    points: {
      en: ["AI agents", "RAG", "Workflow automation"],
      ar: ["وكلاء ذكيون", "استرجاع معزز", "أتمتة العمليات"],
    },
  },
  {
    id: "security",
    doodle: "shield",
    tone: "bg-coral",
    fill: "fill-paper-raised",
    onTone: "text-ink",
    span: "lg:col-span-5",
    variant: "standard",
    title: { en: "Cybersecurity", ar: "الأمن السيبراني" },
    description: {
      en: "Secure architecture, assessments and penetration testing.",
      ar: "بنية آمنة وتقييمات أمنية واختبارات اختراق.",
    },
    points: {
      en: ["Threat modelling", "Pen testing", "Hardening"],
      ar: ["نمذجة التهديدات", "اختبار اختراق", "تحصين الأنظمة"],
    },
  },
  {
    id: "custom",
    doodle: "stack",
    tone: "bg-lilac",
    fill: "fill-paper-raised",
    onTone: "text-ink",
    span: "lg:col-span-3",
    variant: "compact",
    title: { en: "Custom Software", ar: "البرمجيات المخصصة" },
    description: {
      en: "Software designed specifically around your operations.",
      ar: "برمجيات يتم تصميمها خصيصًا لاحتياجات عملك.",
    },
    points: {
      en: ["Internal tools", "ERP & portals", "Data models"],
      ar: ["أدوات داخلية", "أنظمة وبوابات", "نمذجة البيانات"],
    },
  },
  {
    id: "cloud",
    doodle: "cloud",
    tone: "bg-magenta",
    fill: "fill-paper-raised",
    onTone: "text-ink",
    span: "lg:col-span-4",
    variant: "compact",
    title: { en: "Cloud & Integrations", ar: "الحلول السحابية والتكامل" },
    description: {
      en: "Scalable cloud infrastructure and connected systems.",
      ar: "بنية سحابية قابلة للتوسع وتكامل الأنظمة.",
    },
    points: {
      en: ["AWS", "Containers", "System integrations"],
      ar: ["AWS", "الحاويات", "تكامل الأنظمة"],
    },
  },
];

/** Marquee row — technologies only, never fabricated client logos. */
export const technologies = [
  "AWS",
  "Next.js",
  "React",
  "Nuxt",
  "Flutter",
  "NestJS",
  "PostgreSQL",
  "Docker",
  "AI",
  "Cloud",
  "Cybersecurity",
  "Automation",
] as const;
