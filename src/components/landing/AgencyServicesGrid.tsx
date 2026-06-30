import Link from "next/link";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

interface AgencyServicesGridProps {
  locale?: SiteLocale;
}

export function AgencyServicesGrid({ locale = "en" }: AgencyServicesGridProps) {
  if (locale !== "el") return null;

  const t = elHome.servicesGrid;

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
          <Link href={localizedPath("el", "/services")} className="btn btn-outline px-8">
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
