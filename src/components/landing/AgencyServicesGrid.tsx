import Link from "next/link";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

interface AgencyServicesGridProps {
  locale?: SiteLocale;
}

const enServices = {
  heading: "What every tourism project includes",
  subheading: "Each site ships with SEO-ready architecture, not a template bolted on later.",
  items: [
    {
      title: "Website creation",
      desc: "Custom design for hotels, rent-a-car and tour brands.",
    },
    {
      title: "SEO web design",
      desc: "Speed, schema, internal links and mobile-first UX.",
    },
    {
      title: "Local SEO",
      desc: "Google Business Profile, local listings and city/island pages.",
    },
    {
      title: "GEO & AEO",
      desc: "Optimization for AI answers and LLM citations.",
    },
    {
      title: "AI chatbots",
      desc: "Multilingual assistants for bookings and FAQs.",
    },
    {
      title: "Content & blog",
      desc: "Destination guides and topic hubs built to rank.",
    },
  ],
  cta: "All services",
} as const;

export function AgencyServicesGrid({ locale = "en" }: AgencyServicesGridProps) {
  const isEl = locale === "el";
  const t = isEl ? elHome.servicesGrid : enServices;
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.heading}</h2>
          <p className="text-lg text-muted-foreground">{t.subheading}</p>
        </div>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border p-6 bg-card">
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ul>
        <div className="text-center mt-10">
          <Link href={lp("/services")} className="btn btn-outline px-8">
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
