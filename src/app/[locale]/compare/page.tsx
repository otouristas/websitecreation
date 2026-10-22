import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
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
 * `/compare` hub.
 *
 * It did not exist. `next.config.ts` redirects `/el/compare` to `/en/compare`,
 * and `src/app/[locale]/compare/` held only `[slug]/`, so that 308 landed on a
 * 404. The three comparison pages were also close to orphaned - one or two
 * inbound links each, and no upward path from them - because there was no hub
 * to link them from.
 *
 * English-only content, like the rest of `/compare/*`: `locale.ts:21` lists it
 * in `EN_ONLY_SECTIONS`, so `localizedPath` keeps every link on `/en`.
 */
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return buildMetadata({
    title: "SEO tools compared: Ahrefs, Semrush, GSC",
    description:
      "How AnotherSEOGuru compares with Ahrefs, Semrush and Search Console on their own, and which one fits the job you are actually trying to do.",
    path: localizedPath("en", "/compare"),
    canonicalPath: localizedPath("en", "/compare"),
    hreflangPath: undefined,
    primaryKeyword: "SEO software comparison",
  });
}

export default async function CompareHubPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const lp = (path: string) => localizedPath(siteLocale, path);

  const breadcrumbItems = generateBreadcrumbs([{ name: "Compare", url: "/compare" }], "en");

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateCollectionPageSchema({
      name: "Compare AnotherSEOGuru with other SEO tools",
      description:
        "Side-by-side comparisons of AnotherSEOGuru against Ahrefs, Semrush and Search Console on its own.",
      url: `${BASE_URL}${localizedPath("en", "/compare")}`,
      inLanguage: "en",
      items: COMPARE_PAGES.map((c) => ({
        name: c.headline,
        url: `${BASE_URL}${localizedPath("en", `/compare/${c.slug}`)}`,
        description: c.summary,
        itemType: "WebPage",
      })),
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
              <AnnouncePill wrap href={lp("/platform/pricing")} tag="Compare" text="Pick on the work, not the feature grid" />
            </div>
          }
          title={accentEnd("Which SEO tool fits the job you are doing?", 3)}
          titleClassName="text-[1.7rem] min-[400px]:text-[1.95rem] sm:text-[2.4rem] lg:text-[2.9rem]"
          lead="Every tool here is good at something. These pages say what each one is good at, and where we are the wrong answer, so you can pick on the work rather than the feature grid."
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={lp("/platform/pricing")} className={wavePrimaryBtn}>
                See software plans
              </Link>
              <Link href={lp("/platform")} className={waveGhostBtn}>
                What the platform does
              </Link>
            </div>
          }
          trust={<TrustLine align="left" items={softwareTrust("en")} />}
          panel={
            <div className="min-w-0 rounded-[22px] border border-hairline bg-surface/80 p-6 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent),0_30px_80px_-28px_color-mix(in_oklab,var(--primary)_45%,transparent)] sm:p-8">
              <WaveEyebrow>
                <span className="inline-flex items-center gap-2">
                  <Scale className="size-3.5" aria-hidden />
                  The short answer
                </span>
              </WaveEyebrow>
              <h2 className="mt-3 text-balance font-display text-2xl font-bold tracking-[-0.03em] text-foreground">
                Data you have, or data you need?
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                AnotherSEOGuru is built around a verified Google Search Console
                property: it reads your real clicks, impressions and positions and
                turns them into work to do. Ahrefs and Semrush are broader research
                suites with far larger backlink and keyword indexes. If your
                bottleneck is finding data, buy an index. If your bottleneck is
                deciding what to do with the data you already have, that is what we
                built.
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
                  <h2 className="text-balance font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-foreground">{c.headline}</h2>
                  <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{c.summary}</p>
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
