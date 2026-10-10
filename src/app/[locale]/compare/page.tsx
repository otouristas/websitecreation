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
import { CtaBand, KitEyebrow, KitSection, TrustLine, kitPrimaryBtn, kitSecondaryBtn, softwareTrust } from "@/components/kit";
import { CardGrid, LinkCard, PageHero, accentTail } from "@/components/page-kit";

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
    title: "Compare AnotherSEOGuru with other SEO tools",
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
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={siteLocale}
          breadcrumbs={breadcrumbItems}
          pill={{ href: lp("/platform/pricing"), kind: "save", tag: "Compare", text: "Pick on the work, not the feature grid" }}
          title={accentTail("Which SEO tool fits the job you are doing?", 3)}
          lead="Every tool here is good at something. These pages say what each one is good at, and where we are the wrong answer, so you can pick on the work rather than the feature grid."
          actions={
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={lp("/platform/pricing")} className={kitPrimaryBtn}>
                See software plans
              </Link>
              <Link href={lp("/platform")} className={kitSecondaryBtn}>
                What the platform does
              </Link>
            </div>
          }
          trust={<TrustLine items={softwareTrust("en")} />}
        />

        <KitSection className="!pt-14">
          {/* Answer-first: the comparison in one paragraph, before the cards. */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-hairline bg-surface/70 p-6 sm:p-8">
            <KitEyebrow icon={<Scale />}>The short answer</KitEyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
              Data you have, or data you need?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              AnotherSEOGuru is built around a verified Google Search Console
              property: it reads your real clicks, impressions and positions and
              turns them into work to do. Ahrefs and Semrush are broader research
              suites with far larger backlink and keyword indexes. If your
              bottleneck is finding data, buy an index. If your bottleneck is
              deciding what to do with the data you already have, that is what we
              built.
            </p>
          </div>

          <CardGrid cols={3} className="mx-auto mt-10">
            {COMPARE_PAGES.map((c) => (
              <LinkCard key={c.slug} href={lp(`/compare/${c.slug}`)} title={c.headline} text={c.summary} as="h2" />
            ))}
          </CardGrid>
        </KitSection>

        <CtaBand locale={siteLocale} source="compare-band" />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
