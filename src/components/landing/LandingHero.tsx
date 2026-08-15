import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

export function LandingHero({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const t = isEl ? elHome.hero : null;

  return (
    <section className="hero-below-header relative flex min-h-[70vh] items-center overflow-hidden border-b border-border/80 pb-12 lg:pb-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <div className="mb-5 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
                {isEl ? t!.badge : "Website design · E-shop · SEO · GEO / AEO"}
              </div>
            </div>
            <h1 className="mb-5 text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-foreground md:text-5xl lg:text-6xl">
              <span className="gradient-text">
                {isEl ? t!.h1Line1 : "Websites and SEO that"}
              </span>
              <br />
              <span className="text-foreground">
                {isEl ? t!.h1Line2 : "win the booking"}
              </span>
            </h1>
            <p className="mb-3 text-lg text-muted-foreground md:text-xl">
              {isEl
                ? t!.sub
                : "AnotherSEOGuru designs and ranks websites, WooCommerce shops, and hotel sites for Greece and international markets — from €899, with GEO and AEO built in."}
            </p>
            <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground lg:mx-0">
              {isEl
                ? t!.proof
                : "70+ live projects. Transparent EUR pricing. One team for design, technical SEO, and AI-search visibility."}
            </p>
            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href={localizedPath(isEl ? "el" : "en", "/get-started")}
                className="btn btn-gradient px-8 py-4 text-lg font-semibold"
              >
                {isEl ? t!.ctaQuote : "Get a free quote"}
              </Link>
              <Link href={localizedPath(isEl ? "el" : "en", "/work")} className="btn btn-outline px-8 py-4 text-lg">
                {isEl ? t!.ctaWork : "See the work"}
              </Link>
              <Link href={localizedPath(isEl ? "el" : "en", "/contact")} className="btn btn-outline px-8 py-4 text-lg">
                {isEl ? t!.ctaContact : "Talk to us"}
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground lg:justify-start">
              {(isEl
                ? [t!.trust1, t!.trust2, t!.trust3]
                : ["SEO-ready from day one", "Multilingual sites", "Agency + technical support"]
              ).map((label) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-[hsl(var(--success))]" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-2xl border-2 border-border shadow-strong">
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
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl" />
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-medium">
            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
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
                  <div className="text-2xl font-bold md:text-3xl">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
