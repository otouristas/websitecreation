import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { ArticleBody } from "@/components/help/ArticleBody";
import { DocsPage, headingsOf } from "@/components/docs/DocsPage";
import { DocsShell } from "@/components/docs/DocsShell";
import { SignupCard } from "@/components/docs/SignupCard";
import { HELP_UPDATED, allArticles, articleFaqs, articleHowTos, findArticle, helpContent, helpMetaDescription, helpPath } from "@/data/help";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { tabForCategory } from "@/lib/docs/nav";
import { buildMetadata } from "@/lib/seo";
import { BASE_URL, combineSchemas, generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, generateHowToSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ locale: string; category: string; article: string }> };

/** Parent params only flow down from layouts, and [category] has none, so emit both segments here. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale: SiteLocale = isValidLocale(params.locale) ? params.locale : "en";
  return helpContent(locale).flatMap((c) => c.articles.map((a) => ({ category: c.slug, article: a.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category, article } = await params;
  if (!isValidLocale(locale)) return {};
  const found = findArticle(helpContent(locale), category, article);
  if (!found) return {};
  const path = helpPath(locale, category, article);
  const meta = buildMetadata({
    title: found.article.title,
    description: helpMetaDescription(found.article.description, locale),
    path,
    hreflangPath: `/help/${category}/${article}`,
    hreflangLocales: ["en", "el"],
  });
  return { ...meta, alternates: { ...meta.alternates, types: { "text/markdown": `${BASE_URL}${path}.md` } } };
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { locale: raw, category, article: slug } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const content = helpContent(locale);
  const found = findArticle(content, category, slug);
  if (!found) notFound();
  const { category: cat, article } = found;
  const el = locale === "el";

  // Previous / next stay inside the article's own tab.
  const tab = tabForCategory(cat.slug);
  const order = allArticles(content).filter((r) => tabForCategory(r.category.slug) === tab);
  const index = order.findIndex((r) => r.category.slug === cat.slug && r.article.slug === article.slug);
  const link = (r: (typeof order)[number] | undefined) => (r ? { title: r.article.title, href: helpPath(locale, r.category.slug, r.article.slug) } : null);
  const path = helpPath(locale, cat.slug, article.slug);
  const crumbs = [
    { name: el ? "Αρχική" : "Home", url: localizedPath(locale, "/") },
    { name: el ? "Κέντρο βοήθειας" : "Help center", url: helpPath(locale) },
    { name: cat.title, url: helpPath(locale, cat.slug) },
    { name: article.title, url: path },
  ];
  const faqs = articleFaqs(article.body);
  const howTos = articleHowTos(article.body);
  const schemas = combineSchemas(
    generateArticleSchema({
      headline: article.title,
      description: article.description,
      datePublished: HELP_UPDATED,
      dateModified: HELP_UPDATED,
      author: { name: "AnotherSEOGuru" },
      schemaType: "Article",
      inLanguage: locale,
      mainEntityOfPage: `${BASE_URL}${path}`,
    }),
    generateBreadcrumbSchema({ items: crumbs }),
    ...(faqs.length ? [generateFAQSchema({ faqs })] : []),
    ...howTos.map((howTo) => generateHowToSchema(howTo)),
  );

  return (
    <DocsShell locale={locale} tab={tab} alternateHref={helpPath(el ? "en" : "el", cat.slug, article.slug)}>
      <SchemaMarkup schemas={schemas} />
      <DocsPage
        locale={locale}
        eyebrow={cat.title}
        title={article.title}
        description={article.description}
        path={path}
        headings={headingsOf(article.body)}
        feedbackId={`${cat.slug}/${article.slug}`}
        prev={link(order[index - 1])}
        next={link(order[index + 1])}
        rail={<SignupCard locale={locale} source={`help-article-${cat.slug}`} />}
      >
        <ArticleBody blocks={article.body} locale={locale} />
      </DocsPage>
    </DocsShell>
  );
}
