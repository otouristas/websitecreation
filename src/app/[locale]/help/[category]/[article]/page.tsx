import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { KitBreadcrumbs } from "@/components/page-kit";
import { ArticleBody } from "@/components/help/ArticleBody";
import { HelpFeedback } from "@/components/help/HelpFeedback";
import { HelpToc, type TocHeading } from "@/components/help/HelpNav";
import { ContactCard, DemoCard, HelpShell, helpCopy } from "@/components/help/HelpShell";
import { HELP_UPDATED, allArticles, findArticle, helpContent, helpMetaDescription, helpPath } from "@/data/help";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { combineSchemas, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";

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
  return buildMetadata({
    title: found.article.title,
    description: helpMetaDescription(found.article.description, locale),
    path: helpPath(locale, category, article),
    hreflangPath: `/help/${category}/${article}`,
    hreflangLocales: ["en", "el"],
  });
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { locale: raw, category, article: slug } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const content = helpContent(locale);
  const found = findArticle(content, category, slug);
  if (!found) notFound();
  const { category: cat, article } = found;
  const t = helpCopy(locale);

  const headings: TocHeading[] = article.body.flatMap((b) => (b.type === "h2" || b.type === "h3" ? [{ id: b.id, text: b.text, level: b.type === "h2" ? 2 : 3 }] : []));
  const order = allArticles(content);
  const index = order.findIndex((r) => r.category.slug === cat.slug && r.article.slug === article.slug);
  const prev = index > 0 ? order[index - 1] : null;
  const next = index < order.length - 1 ? order[index + 1] : null;
  const url = `https://anotherseoguru.com${helpPath(locale, cat.slug, article.slug)}`;
  const crumbs = [
    { name: t.homeCrumb, url: localizedPath(locale, "/") },
    { name: t.short, url: helpPath(locale) },
    { name: cat.title, url: helpPath(locale, cat.slug) },
    { name: article.title, url: helpPath(locale, cat.slug, article.slug) },
  ];
  const schemas = combineSchemas(
    generateArticleSchema({
      headline: article.title,
      description: article.description,
      datePublished: HELP_UPDATED,
      dateModified: HELP_UPDATED,
      author: { name: "AnotherSEOGuru" },
      schemaType: "Article",
      inLanguage: locale,
      mainEntityOfPage: url,
    }),
    generateBreadcrumbSchema({ items: crumbs }),
  );

  return (
    <HelpShell locale={locale} current={cat.slug}>
      <SchemaMarkup schemas={schemas} />
      <div className="mx-auto grid max-w-[66rem] gap-12 px-4 py-10 sm:px-8 lg:py-12 xl:grid-cols-[minmax(0,1fr)_14rem]">
        <article className="min-w-0 max-w-[46rem]">
          <KitBreadcrumbs items={crumbs.slice(1)} align="left" />
          <h1 className="mt-6 text-balance font-display text-[34px] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-[42px]">{article.title}</h1>
          <p className="mt-4 text-[19px] leading-relaxed text-muted-foreground">{article.description}</p>
          {headings.length > 1 ? (
            <div className="mt-8 xl:hidden">
              <HelpToc headings={headings} label={t.inThisArticle} collapsible />
            </div>
          ) : null}

          <div className="mt-2">
            <ArticleBody blocks={article.body} locale={locale} />
          </div>

          <div className="mt-14 grid gap-6">
            <HelpFeedback
              id={`${cat.slug}/${article.slug}`}
              labels={{ question: t.helpful, yes: t.yes, no: t.no, thanksYes: t.thanksYes, thanksNo: t.thanksNo }}
            />
            <nav aria-label={t.short} className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link href={helpPath(locale, prev.category.slug, prev.article.slug)} className="group rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-primary/40">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <ArrowLeft className="size-3.5" aria-hidden />
                    {t.previous}
                  </span>
                  <span className="mt-2 block text-[15px] font-medium text-foreground">{prev.article.title}</span>
                </Link>
              ) : (
                <span aria-hidden />
              )}
              {next ? (
                <Link href={helpPath(locale, next.category.slug, next.article.slug)} className="group rounded-2xl border border-hairline bg-surface p-5 text-right transition-colors hover:border-primary/40">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {t.next}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                  <span className="mt-2 block text-[15px] font-medium text-foreground">{next.article.title}</span>
                </Link>
              ) : null}
            </nav>
            <ContactCard locale={locale} />
          </div>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-[calc(var(--site-header-height)+2rem)] grid gap-8">
            {headings.length > 0 ? <HelpToc headings={headings} label={t.inThisArticle} /> : null}
            <DemoCard locale={locale} source="help-article-demo" />
          </div>
        </aside>
      </div>
    </HelpShell>
  );
}
