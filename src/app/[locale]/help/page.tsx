import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { PageHero } from "@/components/page-kit";
import { Accent, Container } from "@/components/kit";
import { HelpSearch } from "@/components/help/HelpSearch";
import { ContactCard, DemoCard, helpCopy } from "@/components/help/HelpShell";
import { CATEGORY_ICON, POPULAR, findArticle, helpContent, helpPath, searchIndex } from "@/data/help";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import { combineSchemas, generateBreadcrumbSchema, generateCollectionPageSchema } from "@/lib/seo/schema";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "el" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const el = locale === "el";
  return buildMetadata({
    title: el ? "Κέντρο βοήθειας GSC Boost: οδηγοί και απαντήσεις" : "GSC Boost Help Center: Guides and Answers",
    description: el
      ? "Οδηγοί για το GSC Boost: σύνδεση Search Console, ευκαιρίες, παρακολούθηση θέσεων, έλεγχος ιστότοπου, ορατότητα σε AI, εργαλεία για γραφεία και χρεώσεις."
      : "Guides for GSC Boost: connect Search Console, read opportunities, track rankings, run site audits, check AI visibility, and manage agency clients and billing.",
    path: helpPath(locale),
    hreflangPath: "/help",
    hreflangLocales: ["en", "el"],
  });
}

export default async function HelpHomePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale: SiteLocale = raw;
  const t = helpCopy(locale);
  const content = helpContent(locale);
  const popular = POPULAR.map(([c, a]) => findArticle(content, c, a)).filter((x) => x !== null);
  const crumbs = [
    { name: t.homeCrumb, url: localizedPath(locale, "/") },
    { name: t.short, url: helpPath(locale) },
  ];
  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: crumbs }),
    generateCollectionPageSchema({
      name: t.home,
      description: t.heroLead,
      url: `https://anotherseoguru.com${helpPath(locale)}`,
      inLanguage: locale,
      items: content.map((c) => ({ name: c.title, url: `https://anotherseoguru.com${helpPath(locale, c.slug)}` })),
    }),
  );

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale}
          breadcrumbs={crumbs}
          size="md"
          title={
            locale === "el" ? (
              <>
                Πώς μπορούμε να <Accent>βοηθήσουμε;</Accent>
              </>
            ) : (
              <>
                How can we <Accent>help?</Accent>
              </>
            )
          }
          lead={t.heroLead}
          actions={
            <div className="mx-auto max-w-2xl">
              <HelpSearch index={searchIndex(locale)} labels={t.search} size="hero" shortcut />
              <p className="mt-4 text-[13px] text-muted-foreground">
                {t.popularShort}{" "}
                {popular.slice(0, 3).map((p, i) => (
                  <span key={p.article.slug}>
                    {i > 0 ? " · " : null}
                    <Link href={helpPath(locale, p.category.slug, p.article.slug)} className="underline decoration-hairline underline-offset-4 hover:text-foreground hover:decoration-foreground">
                      {p.article.title}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          }
          trust={null}
        />

        <Container className="pb-24">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand">{t.browse}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.map((cat) => {
              const Icon = CATEGORY_ICON[cat.slug];
              return (
                <li key={cat.slug} className="flex flex-col rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-primary/40">
                  <Link href={helpPath(locale, cat.slug)} className="group">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary-glow">{Icon ? <Icon className="size-5" aria-hidden /> : null}</span>
                    <span className="mt-5 block font-display text-[17px] font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary-glow">{cat.title}</span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-muted-foreground">{cat.description}</span>
                  </Link>
                  <ul className="mt-5 grid gap-2 border-t border-hairline pt-4 text-[13.5px]">
                    {cat.articles.slice(0, 3).map((a) => (
                      <li key={a.slug}>
                        <Link href={helpPath(locale, cat.slug, a.slug)} className="line-clamp-1 text-muted-foreground transition-colors hover:text-foreground">
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={helpPath(locale, cat.slug)} className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-medium text-link hover:underline hover:underline-offset-4">
                    {t.articles(cat.articles.length)}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <section>
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand">{t.popular}</h2>
              <ul className="mt-5 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface">
                {popular.map(({ category, article }) => (
                  <li key={article.slug}>
                    <Link href={helpPath(locale, category.slug, article.slug)} className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-primary/5">
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold text-foreground">{article.title}</span>
                        <span className="mt-0.5 block truncate text-[13.5px] text-muted-foreground">{article.description}</span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <aside className="grid content-start gap-4">
              <DemoCard locale={locale} source="help-home-demo" />
              <ContactCard locale={locale} className="sm:flex-col sm:items-start" />
            </aside>
          </div>
        </Container>
      </main>
      <Footer locale={locale} />
    </>
  );
}
