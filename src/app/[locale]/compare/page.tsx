import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
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
import { Section, SectionHeading, PrimaryButtonLink, GhostButtonLink } from "@/components/landing/primitives";

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
      <main className="blueprint-grid relative z-0 main-below-header">
        <Section>
          <Breadcrumbs items={breadcrumbItems} />
          <SectionHeading
            eyebrow="Compare"
            title="Which SEO tool fits the job you are doing?"
            body="Every tool here is good at something. These pages say what each one is good at, and where we are the wrong answer, so you can pick on the work rather than the feature grid."
          />

          {/* Answer-first: the comparison in one paragraph, before the cards. */}
          <div className="mx-auto mt-10 max-w-2xl rounded-[14px] border border-hairline bg-surface p-6">
            <p className="text-muted-foreground leading-relaxed">
              AnotherSEOGuru is built around a verified Google Search Console
              property: it reads your real clicks, impressions and positions and
              turns them into work to do. Ahrefs and Semrush are broader research
              suites with far larger backlink and keyword indexes. If your
              bottleneck is finding data, buy an index. If your bottleneck is
              deciding what to do with the data you already have, that is what we
              built.
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {COMPARE_PAGES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={lp(`/compare/${c.slug}`)}
                  className="group flex h-full flex-col rounded-[14px] border border-hairline bg-surface p-6 transition-colors hover:border-primary/40"
                >
                  <span className="flex items-center gap-1.5 font-display text-lg font-medium text-foreground">
                    {c.headline}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.summary}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButtonLink href={lp("/platform/pricing")}>See software plans</PrimaryButtonLink>
            <GhostButtonLink href={lp("/platform")}>What the platform does</GhostButtonLink>
          </div>
        </Section>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
