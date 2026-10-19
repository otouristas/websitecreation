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

const PATH = resourcePath(TOOL.slug);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const meta = buildMetadata({
    title: TOOL.seoTitle,
    description: TOOL.description,
    path: localizedPath(locale, `/resources/${TOOL.slug}`),
    canonicalPath: PATH,
    primaryKeyword: TOOL.primaryKeyword,
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `${BASE_URL}${PATH}.md` } } };
}

export default async function OpportunityFinderPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const crumbs = [
    { name: "Home", url: localizedPath("en", "/") },
    { name: "Resources", url: resourcePath() },
    { name: "SEO forecasting", url: resourcePath("seo-forecasting") },
    { name: TOOL.title, url: PATH },
  ];
  const faqs = articleFaqs(TOOL_BLOCKS);
  const schemas = combineSchemas(
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: TOOL.title,
      description: TOOL.description,
      url: `${BASE_URL}${PATH}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (runs in the browser)",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: brandOrganization(),
    },
    generateBreadcrumbSchema({ items: crumbs }),
    generateFAQSchema({ faqs }),
    ...articleHowTos(TOOL_BLOCKS).map((h) => generateHowToSchema(h)),
  );
  const source = `resources-${TOOL.slug}`;

  return (
    <DocsShell locale="en" tab="resources">
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale="en"
        eyebrow="Free tool"
        title="Search Console opportunity finder"
        description="Upload your Search Console export. Get the queries worth pushing onto page one, the snippets worth rewriting and how many clicks each could add. Nothing leaves your browser."
        path={PATH}
        headings={headingsOf(TOOL_BLOCKS)}
        feedbackId={`resources/${TOOL.slug}`}
        wide
      >
        <OpportunityFinder />
        <div className="xl:max-w-[48rem]">
          <ArticleBody blocks={TOOL_BLOCKS} locale="en" />
          <ResourceCta
            intent="direct"
            title="Run this every week, on every row"
            text="AnotherSEOGuru App reads up to 100,000 rows per period straight from Search Console, adds decay, cannibalization and missing-content detectors, and measures each fix after you ship it. Search Console features cost no credits on any plan."
            primary={{ label: "Sign up free", href: appLink("/signup", "en", source), event: `${source}_signup` }}
            secondary={{ label: "Open the live demo", href: appLink("/demo", "en", `${source}-demo`), event: `${source}_demo` }}
          />
          <nav aria-label="Related guides" className="mt-12">
            <h2 className="font-display text-[18px] font-semibold text-foreground">Related guides</h2>
            <ArticleBody
              locale="en"
              blocks={[
                {
                  type: "cards",
                  cols: 2,
                  items: [
                    { title: "SEO forecasting", text: "The method behind the forecast, step by step.", href: resourcePath("seo-forecasting"), icon: "bar-chart" },
                    { title: "SEO quick wins", text: "How to push striking-distance queries into the top 3.", href: resourcePath("seo-quick-wins"), icon: "sparkles" },
                    { title: "High impressions, low CTR", text: "Why a page is seen but not clicked, and the fixes.", href: resourcePath("high-impressions-low-ctr"), icon: "search" },
                    { title: "Organic CTR by position", text: "The baseline curve and how your own curve is learned.", href: resourcePath("ctr-by-position"), icon: "list" },
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
