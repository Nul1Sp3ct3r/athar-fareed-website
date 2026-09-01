import type { Localized } from "@/lib/i18n";

/** Which CSS mockup composition renders for the project. */
export type ProjectVisual = "commerce" | "platform" | "agent";

export interface ProjectFeature {
  title: Localized;
  text: Localized;
}

export interface Project {
  slug: string;
  year: string;
  visual: ProjectVisual;
  /** Panel surface behind the mockup. Tailwind-safe literal classes. */
  tone: string;
  /** Highlight colour used inside the mockup. */
  accent: string;
  title: Localized;
  category: Localized;
  /** One-line teaser used on the work cards. */
  excerpt: Localized;
  tags: Localized<string[]>;
  overview: Localized;
  challenge: Localized;
  solution: Localized;
  technology: string[];
  features: ProjectFeature[];
  /** Deliberately empty: no invented results. Filled once real data exists. */
  results: ProjectFeature[];
}

export const projects: Project[] = [
  {
    slug: "hawli",
    year: "2025",
    visual: "commerce",
    tone: "bg-sun",
    accent: "bg-coral",
    title: { en: "Hawli", ar: "حولي" },
    category: { en: "Commerce Platform", ar: "منصة تجارة" },
    excerpt: {
      en: "A marketplace, a courier app and a logistics backend, running as one product.",
      ar: "سوق إلكتروني وتطبيق مندوبين ونظام لوجستي يعملون كمنتج واحد.",
    },
    tags: {
      en: ["Marketplace", "Mobile App", "Logistics", "Cloud"],
      ar: ["سوق إلكتروني", "تطبيق جوال", "لوجستيات", "سحابة"],
    },
    overview: {
      en: "A multi-vendor commerce platform covering storefront, vendor tooling, courier dispatch and the operations dashboard that ties them together.",
      ar: "منصة تجارة متعددة البائعين تغطي المتجر وأدوات البائعين وتوزيع المندوبين ولوحة العمليات التي تربطها جميعًا.",
    },
    challenge: {
      en: "Three audiences — buyers, vendors and couriers — needed different products that had to stay consistent with a single source of inventory and order truth.",
      ar: "ثلاث فئات — المشترون والبائعون والمندوبون — تحتاج منتجات مختلفة تظل متسقة مع مصدر واحد للمخزون والطلبات.",
    },
    solution: {
      en: "One typed API and a shared domain model, with a web storefront, a vendor console and a native courier app on top. Dispatch and inventory events flow through a queue so no surface reads stale state.",
      ar: "واجهة برمجية موحّدة ونموذج نطاق مشترك، وفوقها متجر ويب ولوحة بائعين وتطبيق مندوبين. تمر أحداث التوزيع والمخزون عبر طابور لضمان عدم قراءة بيانات قديمة.",
    },
    technology: ["Next.js", "NestJS", "PostgreSQL", "Flutter", "Redis", "AWS", "Docker"],
    features: [
      {
        title: { en: "Multi-vendor catalogue", ar: "كتالوج متعدد البائعين" },
        text: {
          en: "Per-vendor inventory, pricing rules and fulfilment windows.",
          ar: "مخزون وتسعير ونوافذ تنفيذ لكل بائع على حدة.",
        },
      },
      {
        title: { en: "Courier dispatch", ar: "توزيع المندوبين" },
        text: {
          en: "Live assignment, route batching and proof of delivery.",
          ar: "إسناد لحظي وتجميع للمسارات وإثبات تسليم.",
        },
      },
      {
        title: { en: "Operations console", ar: "لوحة العمليات" },
        text: {
          en: "Orders, exceptions and settlement in a single view.",
          ar: "الطلبات والاستثناءات والتسويات في شاشة واحدة.",
        },
      },
      {
        title: { en: "Bilingual by default", ar: "ثنائي اللغة أساسًا" },
        text: {
          en: "Arabic-first RTL interfaces across every surface.",
          ar: "واجهات عربية من اليمين لليسار في كل الشاشات.",
        },
      },
    ],
    results: [],
  },
  {
    slug: "university-platform",
    year: "2024",
    visual: "platform",
    tone: "bg-lilac",
    accent: "bg-cobalt",
    title: { en: "University Digital Platform", ar: "منصة جامعية رقمية" },
    category: { en: "Education Technology", ar: "تقنيات التعليم" },
    excerpt: {
      en: "Student services, administration and analytics unified behind one identity.",
      ar: "خدمات الطلاب والإدارة والتحليلات في منصة واحدة بهوية موحدة.",
    },
    tags: {
      en: ["Student Services", "Administration", "Analytics"],
      ar: ["خدمات الطلاب", "الإدارة", "التحليلات"],
    },
    overview: {
      en: "A digital front door for students and staff: registration, requests, schedules and reporting, sitting on top of existing academic systems.",
      ar: "واجهة رقمية موحّدة للطلاب والموظفين: التسجيل والطلبات والجداول والتقارير، فوق الأنظمة الأكاديمية القائمة.",
    },
    challenge: {
      en: "Critical records lived in legacy systems that could not be replaced. Anything new had to integrate without a migration event.",
      ar: "السجلات الحساسة موجودة في أنظمة قديمة لا يمكن استبدالها، وكان على أي حل جديد أن يتكامل دون ترحيل شامل.",
    },
    solution: {
      en: "An integration layer normalises the legacy sources behind a stable API, with single sign-on, role-based access and an analytics view built on read models rather than live queries.",
      ar: "طبقة تكامل توحّد المصادر القديمة خلف واجهة مستقرة، مع دخول موحّد وصلاحيات حسب الدور وتحليلات مبنية على نماذج قراءة بدل الاستعلام المباشر.",
    },
    technology: ["Next.js", "TypeScript", "PostgreSQL", "Keycloak", "Docker", "Kubernetes"],
    features: [
      {
        title: { en: "Single sign-on", ar: "دخول موحّد" },
        text: {
          en: "One identity across student, staff and admin surfaces.",
          ar: "هوية واحدة عبر شاشات الطلاب والموظفين والإدارة.",
        },
      },
      {
        title: { en: "Request workflows", ar: "مسارات الطلبات" },
        text: {
          en: "Configurable approval chains with a full audit trail.",
          ar: "سلاسل اعتماد قابلة للضبط مع سجل تدقيق كامل.",
        },
      },
      {
        title: { en: "Legacy integrations", ar: "التكامل مع الأنظمة القائمة" },
        text: {
          en: "Adapters that isolate old systems from the new product.",
          ar: "طبقات وسيطة تعزل الأنظمة القديمة عن المنتج الجديد.",
        },
      },
      {
        title: { en: "Reporting", ar: "التقارير" },
        text: {
          en: "Cohort, capacity and service-level dashboards.",
          ar: "لوحات للدفعات والطاقة الاستيعابية ومستوى الخدمة.",
        },
      },
    ],
    results: [],
  },
  {
    slug: "ai-business-automation",
    year: "2025",
    visual: "agent",
    tone: "bg-acid",
    accent: "bg-magenta",
    title: { en: "AI Business Automation", ar: "أتمتة الأعمال بالذكاء الاصطناعي" },
    category: { en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" },
    excerpt: {
      en: "Agents that read the inbox, route the work and close the loop in existing systems.",
      ar: "وكلاء يقرؤون الوارد ويوجّهون العمل ويغلقون الدورة داخل الأنظمة القائمة.",
    },
    tags: {
      en: ["AI Agents", "Workflow Automation", "Integrations"],
      ar: ["وكلاء ذكاء اصطناعي", "أتمتة العمليات", "التكامل"],
    },
    overview: {
      en: "An agent layer that handles high-volume, low-judgement operational work — classification, extraction, routing and follow-up — inside the tools a team already uses.",
      ar: "طبقة وكلاء تتولى الأعمال التشغيلية المتكررة — التصنيف والاستخراج والتوجيه والمتابعة — داخل الأدوات التي يستخدمها الفريق أصلًا.",
    },
    challenge: {
      en: "Automation had to be auditable. Every action an agent takes needed a reason, a record and a human override.",
      ar: "كان لا بد أن تكون الأتمتة قابلة للتدقيق: لكل إجراء سبب وسجل وإمكانية تدخل بشري.",
    },
    solution: {
      en: "Tool-using agents with narrow, typed permissions, a review queue for low-confidence decisions and structured logs for every step, wired into CRM, email and internal APIs.",
      ar: "وكلاء بأدوات وصلاحيات محددة الأنواع، وطابور مراجعة للقرارات منخفضة الثقة، وسجلات منظمة لكل خطوة، مربوطة بأنظمة العملاء والبريد والواجهات الداخلية.",
    },
    technology: ["Claude API", "TypeScript", "Python", "PostgreSQL", "pgvector", "Temporal"],
    features: [
      {
        title: { en: "Tool-using agents", ar: "وكلاء يستخدمون الأدوات" },
        text: {
          en: "Scoped permissions per tool, with typed inputs and outputs.",
          ar: "صلاحيات محددة لكل أداة بمدخلات ومخرجات موثقة الأنواع.",
        },
      },
      {
        title: { en: "Human in the loop", ar: "تدخل بشري" },
        text: {
          en: "Low-confidence decisions escalate to a review queue.",
          ar: "القرارات منخفضة الثقة تُحوَّل إلى طابور مراجعة.",
        },
      },
      {
        title: { en: "Retrieval", ar: "الاسترجاع" },
        text: {
          en: "Answers grounded in the organisation's own documents.",
          ar: "إجابات مبنية على وثائق المنشأة نفسها.",
        },
      },
      {
        title: { en: "Audit trail", ar: "سجل التدقيق" },
        text: {
          en: "Every action recorded with its reasoning and inputs.",
          ar: "كل إجراء مسجّل مع مبرراته ومدخلاته.",
        },
      },
    ],
    results: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
