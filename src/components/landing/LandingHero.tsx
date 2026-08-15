import { ArrowRight } from "lucide-react";
import { elHome } from "@/data/translations/el-home";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { getTrustStats } from "@/data/trust-stats";
import { Bloom, GhostButtonLink, PrimaryButtonLink } from "./primitives";
import { ProductFrame, SearchChart } from "./graphics";

/**
 * Homepage hero.
 *
 * Copy follows `docs/keyword-research/`: /el is the C1 pillar (21 of 51 P0
 * keywords resolve to it), so the H1 leads with `seo υπηρεσίες` +
 * `προώθηση ιστοσελίδων`, and the paragraph beneath is the 40-55 word
 * answer-first opener the AEO rules require. The retired "seo guru" vanity
 * framing - 4,633 impressions at ~0% CTR - is gone.
 */
export function LandingHero({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const t = isEl ? elHome.hero : null;
  const lp = (path: string) => localizedPath(locale, path);
  const stats = getTrustStats(locale);

  const proofs = isEl
    ? [
        "Τεχνικό SEO, τοπικό SEO και GEO/AEO από μία ομάδα",
        "Κατασκευή ιστοσελίδων και e-shop έτοιμων για SEO",
        "Δική μας πλατφόρμα συνδεδεμένη με το Search Console",
        "Διαφανή πακέτα και δωρεάν αξιολόγηση σε 24 ώρες",
      ]
    : [
        "Technical SEO, local SEO and GEO/AEO from one team",
        "Websites and e-shops that ship SEO-ready",
        "Our own platform, wired into Search Console",
        "Transparent packages and a free audit in 24 hours",
      ];

  return (
    <section className="relative overflow-hidden">
      <Bloom className="left-1/2 top-[-6rem] h-[32rem] w-[72rem] -translate-x-1/2" />

      <div className="hero-below-header relative mx-auto max-w-6xl px-6 pb-10 text-center md:pb-14">
        <span className="rise-in inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-brand backdrop-blur">
          {isEl ? t!.badge : "SEO · GEO / AEO · Web design · E-shop"}
        </span>

        <h1 className="rise-in mt-7 font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.04em] text-foreground sm:text-6xl md:text-[4.5rem]">
          {isEl ? t!.h1Line1 : "SEO services & web design"}
          <br />
          <span className="text-primary">{isEl ? t!.h1Line2 : "that bring in customers"}</span>
        </h1>

        {/* Answer-first opener: 40-55 words, entity named. Targets PAA / AI Overviews. */}
        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {isEl
            ? t!.sub
            : "AnotherSEOGuru is a Greek SEO and web design agency. We handle technical SEO, local SEO, GEO/AEO and website or e-shop builds, with transparent packages from €400 a month. Every engagement starts with a free SEO audit, so you see what works before you commit."}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButtonLink href={lp("/get-started")}>
            {isEl ? t!.ctaQuote : "Get a free SEO audit"}
            <ArrowRight className="size-4" aria-hidden />
          </PrimaryButtonLink>
          <GhostButtonLink href={lp("/work")}>
            {isEl ? t!.ctaWork : "See the work"}
          </GhostButtonLink>
        </div>
      </div>

      {/* Coded product mockup - the platform half of the positioning */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rise-in relative">
          <Bloom className="left-1/2 top-1/3 h-[24rem] w-[46rem] -translate-x-1/2 opacity-80" />
          <div className="relative">
            <ProductFrame url="app.anotherseoguru.com/dashboard">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-medium text-foreground">
                    {isEl ? "Οργανική απόδοση" : "Organic performance"}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {isEl
                      ? "Κλικ και εμφανίσεις, 12 μήνες"
                      : "Clicks and impressions, last 12 months"}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary" />
                    {isEl ? "Κλικ" : "Clicks"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-brand" />
                    {isEl ? "Εμφανίσεις" : "Impressions"}
                  </span>
                </div>
              </div>
              <SearchChart />
            </ProductFrame>
          </div>
        </div>
      </div>

      {/* Hairline proof grid */}
      <div className="relative mx-auto max-w-6xl px-6 pt-12">
        <div className="grid grid-cols-1 border-y border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {proofs.map((p, i) => (
            <div
              key={p}
              className={`px-5 py-6 text-sm leading-snug text-muted-foreground ${
                i > 0 ? "border-t border-hairline lg:border-l lg:border-t-0" : ""
              } ${i === 1 ? "sm:border-l sm:border-t-0" : ""} ${i === 3 ? "sm:border-l" : ""}`}
            >
              <span className="mb-3 block font-display text-[11px] tracking-[0.18em] text-brand">
                0{i + 1}
              </span>
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Metrics strip */}
      <div className="relative border-b border-hairline bg-surface/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-8 ${i % 2 === 1 ? "border-l border-hairline" : ""} ${
                i >= 2 ? "border-t border-hairline lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <div className="font-display text-3xl font-medium tabular-nums tracking-[-0.04em] text-foreground sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
