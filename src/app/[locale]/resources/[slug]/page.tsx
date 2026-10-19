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
  findResource,
  resourcePath,
  type ResourceArticle,
} from "@/data/resources";
import { isValidLocale, localizedPath } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, combineSchemas, generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, generateHowToSchema } from "@/lib/seo/schema";

/**
 * Pillars and supporting articles of the /resources hub. English only, like
 * the rest of /resources: next.config redirects /el/resources/* to /en and
 * every page canonicalizes to its /en URL.
 */

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return RESOURCE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const article = findResource(slug);
  if (!article) return {};
  const path = resourcePath(slug);
  const meta = buildMetadata({
    title: article.seoTitle,
    description: article.description,
    path: localizedPath(locale, `/resources/${slug}`),
    canonicalPath: path,
    primaryKeyword: article.primaryKeyword,
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `${BASE_URL}${path}.md` } } };
}

function cta(article: ResourceArticle) {
  const source = `resources-${article.slug}`;
  if (article.cta === "direct") {
    return {
      title: "Do this on your own data",
      text: "Connect Search Console once (read-only) and AnotherSEOGuru App runs this analysis for every site you manage, every week. Search Console features cost no credits on any plan.",
      primary: { label: "Sign up free", href: appLink("/signup", "en", source), event: `${source}_signup` },
      secondary: { label: "Open the live demo", href: appLink("/demo", "en", `${source}-demo`), event: `${source}_demo` },
    };
  }
  return {
    title: "Find these opportunities in your own data",
    text: "Upload your Search Console export to the free opportunity finder. It runs in your browser, nothing is uploaded and there is no sign-up.",
    primary: { label: "Open the free tool", href: resourcePath(OPPORTUNITY_FINDER.slug), event: `${source}_tool` },
    secondary: { label: "See the app on sample data", href: appLink("/demo", "en", `${source}-demo`), event: `${source}_demo` },
  };
}

export default async function ResourceArticlePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const article = findResource(slug);
  if (!article) notFound();

  const cluster = clusterById(article.cluster);
  const siblings = clusterArticles(cluster.id);
  const pillar = siblings.find((a) => a.kind === "pillar");
  const index = siblings.findIndex((a) => a.slug === article.slug);
  const link = (a: ResourceArticle | undefined) => (a ? { title: a.title, href: resourcePath(a.slug) } : null);
  const path = resourcePath(article.slug);

  const crumbs = [
    { name: "Home", url: localizedPath("en", "/") },
    { name: "Resources", url: resourcePath() },
    ...(pillar && pillar.slug !== article.slug ? [{ name: cluster.title, url: resourcePath(pillar.slug) }] : []),
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
      inLanguage: "en",
      mainEntityOfPage: `${BASE_URL}${path}`,
    }),
    generateBreadcrumbSchema({ items: crumbs }),
    ...(faqs.length ? [generateFAQSchema({ faqs })] : []),
    ...articleHowTos(article.body).map((howTo) => generateHowToSchema(howTo)),
  );
  const c = cta(article);
  const related = siblings.filter((a) => a.slug !== article.slug);

  return (
    <DocsShell locale="en" tab="resources">
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale="en"
        eyebrow={cluster.title}
        title={article.title}
        description={article.description}
        path={path}
        headings={headingsOf(article.body)}
        feedbackId={`resources/${article.slug}`}
        prev={link(siblings[index - 1])}
        next={link(siblings[index + 1])}
        rail={<SignupCard locale="en" source={`resources-${article.slug}`} />}
      >
        {pillar && pillar.slug !== article.slug ? (
          <p className="mt-6 text-[14px] text-muted-foreground">
            Part of{" "}
            <Link href={resourcePath(pillar.slug)} className="font-medium text-link underline decoration-hairline underline-offset-4 hover:decoration-current">
              {pillar.title.split(":")[0]}
            </Link>
          </p>
        ) : null}
        <ArticleBody blocks={article.body} locale="en" />
        <ResourceCta intent={article.cta} {...c} />
        <nav aria-label={`More in ${cluster.title}`} className="mt-12">
          <h2 className="font-display text-[18px] font-semibold text-foreground">More in {cluster.title}</h2>
          <ul className="mt-4 grid gap-2 text-[15px]">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={resourcePath(a.slug)} className="font-medium text-link hover:underline">
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
              <Link href={resourcePath()} className="text-muted-foreground hover:text-foreground">
                All resources
              </Link>
            </li>
          </ul>
        </nav>
      </DocsPage>
    </DocsShell>
  );
}
