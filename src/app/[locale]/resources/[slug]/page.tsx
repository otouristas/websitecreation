import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ArticleBody } from "@/components/help/ArticleBody";
import { DocsPage, headingsOf } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { SignupCard } from "@/components/docs/SignupCard";
import { ResourceCta } from "@/components/resources/ResourceCta";
import { appLink } from "@/components/gsc-boost/copy";
import { articleFaqs, articleHowTos } from "@/data/help";
import {
  OPPORTUNITY_FINDER,
  RESOURCE_ARTICLES,
  clusterArticles,
  clusterById,
  pillarTitle,
  findResource,
  resourcePath,
  type ResourceArticle,
} from "@/data/resources";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, combineSchemas, generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, generateHowToSchema } from "@/lib/seo/schema";

/**
 * Pillars and supporting articles of the /resources hub. English and Greek
 * share the slug (/el/resources/seo-reporting). A missing Greek article 404s
 * instead of falling back to English.
 */

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const article = findResource(slug, locale);
  if (!article) return {};
  const path = resourcePath(slug, locale);
  const meta = buildMetadata({
    title: article.seoTitle,
    description: article.description,
    path,
    canonicalPath: path,
    hreflangPath: `/resources/${slug}`,
    primaryKeyword: article.primaryKeyword,
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `${BASE_URL}${path}.md` } } };
}

function cta(article: ResourceArticle, locale: SiteLocale) {
  const source = `resources-${article.slug}`;
  const el = locale === "el";
  if (["seo-reporting-tools", "white-label-seo-reports"].includes(article.slug)) {
    return {
      title: el ? "Δείτε την αναφορά που θα λάβει ο πελάτης" : "See the report your client would receive",
      text: el
        ? "Κατεβάστε το δείγμα PDF ή ανοίξτε την εφαρμογή με ενδεικτικά στοιχεία για να επιλέξετε περίοδο, ενότητες και λογότυπο."
        : "Download the sample PDF or open the reporting workspace with sample data to choose the period, sections and branding.",
      primary: { label: el ? "Άνοιγμα δείγματος αναφοράς" : "Open the sample report", href: resourcePath("sample-seo-report", locale), event: `${source}_sample` },
      secondary: { label: el ? "Δοκιμή του εργαλείου αναφορών" : "Try the report builder", href: appLink("/demo/reports", locale, source), event: `${source}_demo` },
    };
  }
  if (article.cta === "direct") {
    return {
      title: el ? "Δείτε τι συμβαίνει στη δική σας ιστοσελίδα" : "Try it with your own site",
      text: el
        ? "Συνδέστε το Search Console μόνο για ανάγνωση. Θα μπορείτε να ελέγχετε τα κλικ κάθε σελίδας και να παρακολουθείτε τις αλλαγές που κάνατε. Η ανάλυση του Search Console δεν καταναλώνει μονάδες."
        : "Connect Search Console with read-only access. Check clicks for an individual page and follow up after you make an edit. Search Console analysis uses no credits.",
      primary: { label: el ? "Εγγραφή δωρεάν" : "Sign up free", href: appLink("/signup", locale, source), event: `${source}_signup` },
      secondary: { label: el ? "Ανοίξτε τη ζωντανή επίδειξη" : "Open the live demo", href: appLink("/demo", locale, `${source}-demo`), event: `${source}_demo` },
    };
  }
  return {
    title: el ? "Βρείτε αυτές τις ευκαιρίες στα δικά σας δεδομένα" : "Find these opportunities in your own data",
    text: el
      ? "Επιλέξτε το αρχείο CSV από το Search Console για να δείτε πού υπάρχουν περιθώρια για περισσότερα κλικ. Το αρχείο μένει στη συσκευή σας και δεν χρειάζεστε λογαριασμό."
      : "Choose your Search Console CSV to see where a page could earn more clicks. The file stays on your device and you can use the tool without an account.",
    primary: { label: el ? "Ανοίξτε το δωρεάν εργαλείο" : "Open the free tool", href: resourcePath(OPPORTUNITY_FINDER.slug, locale), event: `${source}_tool` },
    secondary: { label: el ? "Ανοίξτε τη ζωντανή επίδειξη" : "See the app on sample data", href: appLink("/demo", locale, `${source}-demo`), event: `${source}_demo` },
  };
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale: SiteLocale = locale;
  const el = siteLocale === "el";
  const article = findResource(slug, siteLocale);
  if (!article) notFound();

  const cluster = clusterById(article.cluster, siteLocale);
  const siblings = clusterArticles(cluster.id, siteLocale);
  const pillar = siblings.find((a) => a.kind === "pillar");
  // The AI cluster's pillar is a bespoke page, not a data article.
  const pillarLink =
    pillar && pillar.slug !== article.slug
      ? { title: pillar.title.split(":")[0], href: resourcePath(pillar.slug, siteLocale) }
      : !pillar
        ? { title: pillarTitle(cluster, siteLocale), href: resourcePath(cluster.pillar, siteLocale) }
        : null;
  const index = siblings.findIndex((a) => a.slug === article.slug);
  const link = (a: ResourceArticle | undefined) => (a ? { title: a.title, href: resourcePath(a.slug, siteLocale) } : null);
  const path = resourcePath(article.slug, siteLocale);

  const crumbs = [
    { name: el ? "Αρχική" : "Home", url: localizedPath(siteLocale, "/") },
    { name: el ? "Υλικό" : "Resources", url: resourcePath(undefined, siteLocale) },
    ...(pillarLink ? [{ name: cluster.title, url: pillarLink.href }] : []),
    { name: article.title.split(":")[0], url: path },
  ];
  const faqs = articleFaqs(article.body);
  const schemas = combineSchemas(
    generateArticleSchema({
      headline: article.title,
      description: article.description,
      datePublished: article.published,
      dateModified: article.updated,
      author: { name: "AnotherSEOGuru", url: BASE_URL },
      inLanguage: siteLocale,
      mainEntityOfPage: `${BASE_URL}${path}`,
    }),
    generateBreadcrumbSchema({ items: crumbs }),
    ...(faqs.length ? [generateFAQSchema({ faqs })] : []),
    ...articleHowTos(article.body).map((howTo) => generateHowToSchema(howTo)),
  );
  const c = cta(article, siteLocale);
  const related = siblings.filter((a) => a.slug !== article.slug);

  return (
    <DocsShell locale={siteLocale} tab="resources">
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale={siteLocale}
        eyebrow={cluster.title}
        title={article.title}
        description={article.description}
        path={path}
        headings={headingsOf(article.body)}
        feedbackId={`resources/${article.slug}`}
        prev={link(siblings[index - 1])}
        next={link(siblings[index + 1])}
        rail={<SignupCard locale={siteLocale} source={`resources-${article.slug}`} />}
      >
        {pillarLink ? (
          <p className="mt-6 text-[14px] text-muted-foreground">
            {el ? "Μέρος του οδηγού " : "Part of "}
            <Link href={pillarLink.href} className="font-medium text-link underline decoration-hairline underline-offset-4 hover:decoration-current">
              {pillarLink.title}
            </Link>
          </p>
        ) : null}
        <ArticleBody blocks={article.body} locale={siteLocale} />
        <ResourceCta intent={article.cta} {...c} />
        <nav aria-label={el ? `Περισσότερα: ${cluster.title}` : `More in ${cluster.title}`} className="mt-12">
          <h2 className="font-display text-[18px] font-semibold text-foreground">{el ? `Περισσότερα: ${cluster.title}` : `More in ${cluster.title}`}</h2>
          <ul className="mt-4 grid gap-2 text-[15px]">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={resourcePath(a.slug, siteLocale)} className="font-medium text-link hover:underline">
                  {a.title}
                </Link>
              </li>
            ))}
            {cluster.existing.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="font-medium text-link hover:underline">
                  {e.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={cluster.product.href} className="font-medium text-link hover:underline">
                {cluster.product.title}
              </Link>
            </li>
            <li>
              <Link href={resourcePath(undefined, siteLocale)} className="text-muted-foreground hover:text-foreground">
                {el ? "Όλο το υλικό" : "All resources"}
              </Link>
            </li>
          </ul>
        </nav>
      </DocsPage>
    </DocsShell>
  );
}
