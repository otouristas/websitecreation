import Image from "next/image";
import Link from "next/link";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

export function LandingHero({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const t = isEl ? elHome.hero : null;

  return (
    <section className="hero-below-header relative overflow-hidden pb-16 lg:pb-24">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {isEl ? t!.badge : "Website design · E-shop · SEO · GEO / AEO"}
            </p>
            <h1 className="font-display mb-6 text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.4rem]">
              {isEl ? (
                <>
                  {t!.h1Line1}
                  <span className="block text-primary">{t!.h1Line2}</span>
                </>
              ) : (
                <>
                  Websites and SEO that
                  <span className="block text-primary">win the booking</span>
                </>
              )}
            </h1>
            <p className="mb-4 text-lg leading-relaxed text-foreground/85 md:text-xl">
              {isEl
                ? t!.sub
                : "AnotherSEOGuru designs and ranks websites, WooCommerce shops, and hotel sites for Greece and international markets — from €899, with GEO and AEO built in."}
            </p>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              {isEl
                ? t!.proof
                : "70+ live projects. Transparent EUR pricing. One team for design, technical SEO, and AI-search visibility."}
            </p>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localizedPath(isEl ? "el" : "en", "/get-started")}
                className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background transition hover:opacity-90"
              >
                {isEl ? t!.ctaQuote : "Get a free quote"}
              </Link>
              <Link
                href={localizedPath(isEl ? "el" : "en", "/work")}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition hover:border-foreground/30"
              >
                {isEl ? t!.ctaWork : "See the work"}
              </Link>
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-4">
              {(isEl
                ? [
                    [t!.stats.projectsVal, t!.stats.projects],
                    [t!.stats.marketsVal, t!.stats.markets],
                    [t!.stats.languagesVal, t!.stats.languages],
                    [t!.stats.supportVal, t!.stats.support],
                  ]
                : [
                    ["70+", "Projects"],
                    ["€899", "Website from"],
                    ["€299", "SEO / month"],
                    ["EN / EL", "Languages"],
                  ]
              ).map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-2xl font-semibold text-foreground">{value}</dd>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-strong">
              <Image
                src="/portfolio/discover-cyclades.webp"
                alt={isEl ? t!.imageAlt : "Tourism website designed by AnotherSEOGuru"}
                width={1200}
                height={800}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 630px"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
