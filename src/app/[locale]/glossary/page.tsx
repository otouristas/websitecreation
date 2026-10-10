import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlossaryClient } from "@/components/glossary/GlossaryClient";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { glossaryCategories } from "@/data/glossary-data";
import { buildMetadata, generateDefinedTermSetSchema } from "@/lib/seo";
import { BASE_URL } from "@/lib/seo/schema";
import { getGlossaryUi } from "@/lib/i18n/get-dictionary";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { notFound } from "next/navigation";
import { Container, CtaBand } from "@/components/kit";
import { PageHero, accentTail } from "@/components/page-kit";
import { categoryTitle } from "@/components/glossary/category-labels";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const ui = getGlossaryUi(locale as SiteLocale);
  return buildMetadata({
    title: ui.title,
    description: ui.metaDescription,
    path: localizedPath(locale as SiteLocale, "/glossary"),
    hreflangPath: "/glossary",
    primaryKeyword: locale === "el" ? "SEO γλωσσάρι" : "SEO glossary",
  });
}

export default async function GlossaryPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const ui = getGlossaryUi(locale as SiteLocale);
  const isEl = locale === 'el';

  // Same strings the server-rendered list below renders, so the markup and the
  // visible text cannot disagree. Greek falls back to English per term, which
  // is what the UI does too - 28 of the 105 terms are translated so far.
  const glossaryUrl = `${BASE_URL}${localizedPath(locale as SiteLocale, "/glossary")}`;
  const termSetSchema = generateDefinedTermSetSchema({
    name: ui.title,
    description: ui.metaDescription,
    url: glossaryUrl,
    inLanguage: locale,
    terms: glossaryCategories.flatMap((category) =>
      category.terms.map((term) => ({
        id: term.id,
        name: isEl ? (term.termEl ?? term.term) : term.term,
        description: isEl
          ? (term.shortDefinitionEl ?? term.shortDefinition)
          : term.shortDefinition,
      })),
    ),
  });

  return (
    <>
      <SchemaMarkup schemas={[termSetSchema]} />
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale as SiteLocale}
          pill={{
            href: localizedPath(locale as SiteLocale, "/blog"),
            kind: "free",
            tag: "Blog",
            text: isEl ? "Οδηγοί που βάζουν τους όρους σε πράξη" : "Guides that put the terms to work",
          }}
          title={accentTail(ui.heroTitle, 1)}
          lead={
            isEl
              ? "Ορισμοί για τεχνικό SEO, GEO, AEO, αναζήτηση με AI και Search Console, με συνδέσμους σε οδηγούς και στην πλατφόρμα."
              : "Definitions for technical SEO, GEO, AEO, AI search and Search Console, with links to guides and platform features."
          }
          actions={null}
          trust={null}
          size="md"
        />
        <Container className="pb-20 pt-12 sm:pt-16">
          <Suspense fallback={<p className="text-center text-muted-foreground">{ui.loading}</p>}>
            <GlossaryClient locale={locale as SiteLocale} />
          </Suspense>
        </Container>
      {/*
        Server-rendered copy of every term.

        GlossaryClient reads `useSearchParams`, so its whole subtree is excluded
        from the prerendered HTML - the served page carried the H1 and a loading
        string, and all 105 definitions existed only after hydration. Search
        engines that render JS would eventually see them; nothing else would.
        This block puts the same content in the static HTML. It is hidden from
        the visual layout (the interactive version above is what users get) but
        is a plain, crawlable list rather than display:none, so it stays
        accessible to assistive technology and to crawlers alike.
      */}
      <section className="sr-only" aria-label={isEl ? "Όλοι οι όροι" : "All glossary terms"}>
        <h2>{isEl ? "Όλοι οι όροι του γλωσσαρίου" : "All glossary terms"}</h2>
        {glossaryCategories.map((category) => (
          <div key={category.id}>
            <h3>{categoryTitle(category, locale as SiteLocale)}</h3>
            <dl>
              {category.terms.map((term) => (
                <div key={term.id}>
                  <dt>{isEl ? (term.termEl ?? term.term) : term.term}</dt>
                  <dd>
                    {isEl
                      ? (term.shortDefinitionEl ?? term.shortDefinition)
                      : term.shortDefinition}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>
        <CtaBand locale={locale as SiteLocale} source="glossary-band" />
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
