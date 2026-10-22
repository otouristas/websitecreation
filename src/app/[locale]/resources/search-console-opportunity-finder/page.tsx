import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ArticleBody } from "@/components/help/ArticleBody";
import { DocsPage, headingsOf } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { ResourceCta } from "@/components/resources/ResourceCta";
import { OpportunityFinder } from "@/components/tools/OpportunityFinder";
import { appLink } from "@/components/gsc-boost/copy";
import { articleFaqs, articleHowTos } from "@/data/help";
import { EL_FINDER, EL_FINDER_BLOCKS, EL_FINDER_PAGE } from "@/data/resources/el/opportunity";
import { OPPORTUNITY_FINDER as TOOL, OPPORTUNITY_FINDER_BLOCKS as TOOL_BLOCKS, resourcePath } from "@/data/resources";
import { isValidLocale, localizedPath } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, brandOrganization, combineSchemas, generateBreadcrumbSchema, generateFAQSchema, generateHowToSchema } from "@/lib/seo/schema";

/**
 * The hub's free tool: a working version of two of the app's opportunity
 * detectors, run on a Search Console export in the browser. No email gate.
 * Unlike /tools/[slug], which only deep-links into the app and is noindex,
 * this page is the tool, so it is indexable and in the sitemap.
 */

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const el = locale === "el";
  const path = resourcePath(TOOL.slug, locale);
  const meta = buildMetadata({
    title: el ? EL_FINDER.seoTitle : TOOL.seoTitle,
    description: el ? EL_FINDER.description : TOOL.description,
    path,
    canonicalPath: path,
    hreflangPath: `/resources/${TOOL.slug}`,
    primaryKeyword: el ? EL_FINDER.primaryKeyword : TOOL.primaryKeyword,
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `${BASE_URL}${path}.md` } } };
}

export default async function OpportunityFinderPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const el = locale === "el";
  const path = resourcePath(TOOL.slug, locale);
  const blocks = el ? EL_FINDER_BLOCKS : TOOL_BLOCKS;
  const g = EL_FINDER_PAGE;
  const crumbs = [
    { name: el ? g.home : "Home", url: localizedPath(locale, "/") },
    { name: el ? g.resources : "Resources", url: resourcePath(undefined, locale) },
    { name: el ? g.forecasting : "SEO forecasting", url: resourcePath("seo-forecasting", locale) },
    { name: el ? EL_FINDER.title : TOOL.title, url: path },
  ];
  const faqs = articleFaqs(blocks);
  const schemas = combineSchemas(
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: el ? EL_FINDER.title : TOOL.title,
      description: el ? EL_FINDER.description : TOOL.description,
      url: `${BASE_URL}${path}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: el ? "Οποιοδήποτε (τρέχει στον browser)" : "Any (runs in the browser)",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: brandOrganization(),
    },
    generateBreadcrumbSchema({ items: crumbs }),
    generateFAQSchema({ faqs }),
    ...articleHowTos(blocks).map((h) => generateHowToSchema(h)),
  );
  const source = `resources-${TOOL.slug}`;

  return (
    <DocsShell locale={locale} tab="resources">
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale={locale}
        eyebrow={el ? g.eyebrow : "Free tool"}
        title={el ? g.title : "Search Console opportunity finder"}
        description={el ? g.description : "Upload your Search Console export. Get the queries worth pushing onto page one, the snippets worth rewriting and how many clicks each could add. Nothing leaves your browser."}
        path={path}
        headings={headingsOf(blocks)}
        feedbackId={`resources/${TOOL.slug}`}
        wide
      >
        <OpportunityFinder locale={locale} />
        <div className="xl:max-w-[48rem]">
          <ArticleBody blocks={blocks} locale={locale} />
          <ResourceCta
            intent="direct"
            title={el ? g.ctaTitle : "Run this every week, on every row"}
            text={el ? g.ctaText : "AnotherSEOGuru App reads up to 100,000 rows per period straight from Search Console, adds decay, cannibalization and missing-content detectors, and measures each fix after you ship it. Search Console features cost no credits on any plan."}
            primary={{ label: el ? g.signup : "Sign up free", href: appLink("/signup", locale, source), event: `${source}_signup` }}
            secondary={{ label: el ? g.demo : "Open the live demo", href: appLink("/demo", locale, `${source}-demo`), event: `${source}_demo` }}
          />
          <nav aria-label={el ? g.related : "Related guides"} className="mt-12">
            <h2 className="font-display text-[18px] font-semibold text-foreground">{el ? g.related : "Related guides"}</h2>
            <ArticleBody
              locale={locale}
              blocks={[
                {
                  type: "cards",
                  cols: 2,
                  items: el
                    ? [...g.cards]
                    : [
                        { title: "SEO forecasting", text: "The method behind the forecast, step by step.", href: resourcePath("seo-forecasting", locale), icon: "bar-chart" },
                        { title: "SEO quick wins", text: "How to push striking-distance queries into the top 3.", href: resourcePath("seo-quick-wins", locale), icon: "sparkles" },
                        { title: "High impressions, low CTR", text: "Why a page is seen but not clicked, and the fixes.", href: resourcePath("high-impressions-low-ctr", locale), icon: "search" },
                        { title: "Organic CTR by position", text: "The baseline curve and how your own curve is learned.", href: resourcePath("ctr-by-position", locale), icon: "list" },
                      ],
                },
              ]}
            />
          </nav>
        </div>
      </DocsPage>
    </DocsShell>
  );
}
