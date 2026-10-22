import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { COMPARE_HUB_EL, COMPARE_PAGES_EL } from "@/data/compare-pages-el";
import { COMPARE_PAGES } from "@/data/compare-pages";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import {
  BASE_URL,
  combineSchemas,
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from "@/lib/seo/schema";
import { generateBreadcrumbs } from "@/lib/linking";
import { CtaBand, TrustLine, softwareTrust } from "@/components/kit";
import { KitBreadcrumbs } from "@/components/page-kit";
import { AnnouncePill, WaveEyebrow, WaveHero, waveGhostBtn, wavePrimaryBtn } from "@/components/pages/platform-wave/ui";
import { accentEnd } from "@/components/pages/services-wave/ui";

type PageProps = { params: Promise<{ locale: string }> };

/**
 * `/compare` hub. English and Greek share the slug. Greek copy is in
 * compare-pages-el.ts and only restates what the English pages already say.
 */
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const el = locale === "el";

  return buildMetadata({
    title: el ? COMPARE_HUB_EL.title : "SEO tools compared: Ahrefs, Semrush, GSC",
    description: el
      ? COMPARE_HUB_EL.description
      : "How AnotherSEOGuru compares with Ahrefs, Semrush and Search Console on their own, and which one fits the job you are actually trying to do.",
    path: localizedPath(locale, "/compare"),
    canonicalPath: localizedPath(locale, "/compare"),
    hreflangPath: "/compare",
    primaryKeyword: el ? COMPARE_HUB_EL.primaryKeyword : "SEO software comparison",
  });
}

export default async function CompareHubPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const el = siteLocale === "el";
  const lp = (path: string) => localizedPath(siteLocale, path);
  const hubPath = lp("/compare");

  const breadcrumbItems = generateBreadcrumbs([{ name: el ? COMPARE_HUB_EL.crumb : "Compare", url: "/compare" }], siteLocale);

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateCollectionPageSchema({
      name: el ? COMPARE_HUB_EL.schemaName : "Compare AnotherSEOGuru with other SEO tools",
      description: el
        ? COMPARE_HUB_EL.schemaDescription
        : "Side-by-side comparisons of AnotherSEOGuru against Ahrefs, Semrush and Search Console on its own.",
      url: `${BASE_URL}${hubPath}`,
      inLanguage: siteLocale,
      items: COMPARE_PAGES.map((c) => {
        const copy = el ? COMPARE_PAGES_EL[c.slug] : undefined;
        return {
          name: copy?.headline ?? c.headline,
          url: `${BASE_URL}${lp(`/compare/${c.slug}`)}`,
          description: copy?.summary ?? c.summary,
          itemType: "WebPage",
        };
      }),
    }),
  );

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs align="left" items={breadcrumbItems} />
              <AnnouncePill wrap href={lp("/platform/pricing")} tag={el ? "Σύγκριση" : "Compare"} text={el ? COMPARE_HUB_EL.pill : "Pick on the work, not the feature grid"} />
            </div>
          }
          title={accentEnd(el ? COMPARE_HUB_EL.heroTitle : "Which SEO tool fits the job you are doing?", el ? COMPARE_HUB_EL.heroAccentWords : 3)}
          titleClassName="text-[1.7rem] min-[400px]:text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem]"
          lead={el ? COMPARE_HUB_EL.lead : "Every tool here is good at something. These pages say what each one is good at, and where we are the wrong answer, so you can pick on the work rather than the feature grid."}
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={lp("/platform/pricing")} className={wavePrimaryBtn}>
                {el ? COMPARE_HUB_EL.plans : "See software plans"}
              </Link>
              <Link href={lp("/platform")} className={waveGhostBtn}>
                {el ? COMPARE_HUB_EL.platform : "What the platform does"}
              </Link>
            </div>
          }
          trust={<TrustLine align="left" items={softwareTrust(siteLocale)} />}
          panel={
            <div className="min-w-0 rounded-[22px] border border-hairline bg-surface/80 p-6 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent),0_30px_80px_-28px_color-mix(in_oklab,var(--primary)_45%,transparent)] sm:p-8">
              <WaveEyebrow>
                <span className="inline-flex items-center gap-2">
                  <Scale className="size-3.5" aria-hidden />
                  {el ? COMPARE_HUB_EL.shortEyebrow : "The short answer"}
                </span>
              </WaveEyebrow>
              <h2 className="mt-3 text-balance font-display text-2xl font-bold tracking-[-0.03em] text-foreground">
                {el ? COMPARE_HUB_EL.shortTitle : "Data you have, or data you need?"}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {el
                  ? COMPARE_HUB_EL.shortBody
                  : "AnotherSEOGuru is built around a verified Google Search Console property: it reads your real clicks, impressions and positions and turns them into work to do. Ahrefs and Semrush are broader research suites with far larger backlink and keyword indexes. If your bottleneck is finding data, buy an index. If your bottleneck is deciding what to do with the data you already have, that is what we built."}
              </p>
            </div>
          }
        />

        <section data-shot="compare" className="scroll-mt-28">
          <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
            <div className="grid min-w-0 gap-4 md:grid-cols-3">
              {COMPARE_PAGES.map((c) => (
                <Link
                  key={c.slug}
                  href={lp(`/compare/${c.slug}`)}
                  className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/70 p-6 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <h2 className="text-balance font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-foreground">{el ? COMPARE_PAGES_EL[c.slug].headline : c.headline}</h2>
                  <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{el ? COMPARE_PAGES_EL[c.slug].cardText : c.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div data-shot="cta">
          <CtaBand locale={siteLocale} source="compare-band" />
        </div>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
