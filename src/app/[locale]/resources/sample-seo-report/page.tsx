import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ArticleBody } from "@/components/help/ArticleBody";
import { DocsPage, headingsOf } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { ResourceCta } from "@/components/resources/ResourceCta";
import { SampleSeoReport } from "@/components/pages/sample-report/SampleSeoReport";
import { PrintButton } from "@/components/pages/sample-report/PrintButton";
import { appLink } from "@/components/gsc-boost/copy";
import { articleFaqs, articleHowTos } from "@/data/help";
import { resourcePath } from "@/data/resources";
import {
  SAMPLE_REPORT,
  SAMPLE_REPORT_BLOCKS,
  SAMPLE_REPORT_BLOCKS_EL,
  SAMPLE_REPORT_EL,
  SAMPLE_REPORT_PUBLISHED,
  SAMPLE_REPORT_SLUG,
} from "@/data/resources/sample-report";
import { isValidLocale, localizedPath } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, combineSchemas, generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, generateHowToSchema } from "@/lib/seo/schema";

/**
 * A complete monthly client report on sample data, printable as a PDF.
 * Search intent for "sample seo report" and "seo report example" is to see a
 * finished report, so the report comes first and the explanation follows.
 */

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const m = locale === "el" ? SAMPLE_REPORT_EL : SAMPLE_REPORT;
  const path = resourcePath(SAMPLE_REPORT_SLUG, locale);
  return buildMetadata({
    title: m.seoTitle,
    description: m.description,
    path,
    canonicalPath: path,
    hreflangPath: `/resources/${SAMPLE_REPORT_SLUG}`,
    primaryKeyword: m.primaryKeyword,
  });
}

export default async function SampleSeoReportPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const el = locale === "el";
  const m = el ? SAMPLE_REPORT_EL : SAMPLE_REPORT;
  const blocks = el ? SAMPLE_REPORT_BLOCKS_EL : SAMPLE_REPORT_BLOCKS;
  const path = resourcePath(SAMPLE_REPORT_SLUG, locale);
  const source = `resources-${SAMPLE_REPORT_SLUG}`;
  const crumbs = [
    { name: el ? "Αρχική" : "Home", url: localizedPath(locale, "/") },
    { name: el ? "Υλικό" : "Resources", url: resourcePath(undefined, locale) },
    { name: el ? "Αναφορές SEO" : "SEO reporting", url: resourcePath("seo-reporting", locale) },
    { name: el ? "Δείγμα αναφοράς SEO" : "Sample SEO report", url: path },
  ];
  const schemas = combineSchemas(
    generateArticleSchema({
      headline: m.title,
      description: m.description,
      datePublished: SAMPLE_REPORT_PUBLISHED,
      dateModified: SAMPLE_REPORT_PUBLISHED,
      author: { name: "AnotherSEOGuru", url: BASE_URL },
      inLanguage: locale,
      mainEntityOfPage: `${BASE_URL}${path}`,
    }),
    generateBreadcrumbSchema({ items: crumbs }),
    generateFAQSchema({ faqs: articleFaqs(blocks) }),
    ...articleHowTos(blocks).map((h) => generateHowToSchema(h)),
  );

  return (
    <DocsShell locale={locale} tab="resources">
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale={locale}
        eyebrow={m.eyebrow}
        title={m.title}
        description={m.lead}
        path={path}
        headings={headingsOf(blocks)}
        feedbackId={`resources/${SAMPLE_REPORT_SLUG}`}
        wide
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 print:hidden">
          <PrintButton
            label={m.print}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-[14px] font-medium text-foreground hover:bg-accent"
          />
          <a
            href={appLink("/signup", locale, `${source}-top`)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[14px] font-semibold text-primary-foreground hover:opacity-90"
          >
            {el ? "Φτιάξτε τη δική σας δωρεάν" : "Build yours free"}
          </a>
          <a href={appLink("/demo/reports", locale, `${source}-demo-top`)} className="text-[14px] font-medium text-link underline decoration-hairline underline-offset-4">
            {m.demo}
          </a>
        </div>
        <div className="mt-6">
          <SampleSeoReport locale={locale} />
        </div>
        <div className="xl:max-w-[48rem] print:hidden">
          <ArticleBody blocks={blocks} locale={locale} />
          <ResourceCta
            intent="direct"
            title={m.ctaTitle}
            text={m.ctaText}
            primary={{ label: m.signup, href: appLink("/signup", locale, source), event: `${source}_signup` }}
            secondary={{ label: m.demo, href: appLink("/demo/reports", locale, `${source}-demo`), event: `${source}_demo` }}
          />
          <nav aria-label={m.related} className="mt-12">
            <h2 className="font-display text-[18px] font-semibold text-foreground">{m.related}</h2>
            <ArticleBody
              locale={locale}
              blocks={[
                {
                  type: "cards",
                  cols: 2,
                  items: el
                    ? [
                        { title: "Πρότυπο αναφοράς SEO", text: "Η ίδια δομή ως έγγραφο για συμπλήρωση.", href: resourcePath("seo-report-template", locale), icon: "file" },
                        { title: "White-label αναφορές SEO", text: "Αναφορές με το δικό σας λογότυπο για κάθε πελάτη.", href: localizedPath(locale, "/platform/white-label-reports"), icon: "layout" },
                        { title: "SEO KPIs", text: "Ποιες μετρήσεις αξίζει να παρακολουθείτε.", href: resourcePath("seo-kpis", locale), icon: "bar-chart" },
                        { title: "Αναφορές SEO", text: "Τι περιλαμβάνουν, πόσο συχνά και πώς τις διαβάζουν οι πελάτες.", href: resourcePath("seo-reporting", locale), icon: "list" },
                      ]
                    : [
                        { title: "SEO report template", text: "The same structure as a fill-in document.", href: resourcePath("seo-report-template", locale), icon: "file" },
                        { title: "White-label SEO reports", text: "This report under your logo, for every client.", href: localizedPath(locale, "/platform/white-label-reports"), icon: "layout" },
                        { title: "SEO KPIs", text: "Which metrics deserve a place in the report.", href: resourcePath("seo-kpis", locale), icon: "bar-chart" },
                        { title: "SEO reporting tools", text: "How to choose one, with a fair look at the options.", href: resourcePath("seo-reporting-tools", locale), icon: "list" },
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
