import Link from "next/link";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

interface AgencyPricingTeaserProps {
  locale?: SiteLocale;
}

export function AgencyPricingTeaser({ locale = "en" }: AgencyPricingTeaserProps) {
  const isEl = locale === "el";

  if (isEl) {
    const t = elHome.agencyPricing;
    return (
      <section className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)] bg-muted/20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.title}</h2>
            <p className="text-muted-foreground">{t.sub}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {t.tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-6 flex flex-col ${
                  i === 1 ? "border-primary shadow-glow bg-primary/5" : "border-border bg-card"
                }`}
              >
                <div className="text-sm font-semibold text-primary mb-1">{tier.name}</div>
                <div className="text-lg font-bold text-foreground mb-2">{tier.price}</div>
                <p className="text-sm text-muted-foreground mb-4">{tier.blurb}</p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 flex-1">
                  {tier.bullets.map((b) => (
                    <li key={b}>✓ {b}</li>
                  ))}
                </ul>
                <Link
                  href={localizedPath("el", "/get-started")}
                  className={`btn w-full justify-center ${i === 1 ? "btn-gradient" : "btn-outline"}`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href={localizedPath("el", "/pricing")} className="btn btn-outline px-8">
              {t.linkPricing}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
