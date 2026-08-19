import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlossaryClient } from "@/components/glossary/GlossaryClient";
import { glossaryCategories } from "@/data/glossary-data";
import { buildMetadata } from "@/lib/seo";
import { getGlossaryUi } from "@/lib/i18n/get-dictionary";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { notFound } from "next/navigation";

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

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="blueprint-grid relative z-0 main-below-header min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{ui.title}</h1>
              <p className="text-muted-foreground">{ui.loading}</p>
            </div>
          </main>
        }
      >
        <GlossaryClient locale={locale as SiteLocale} />
      </Suspense>
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
            <h3>{category.title}</h3>
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
      <Footer />
    </>
  );
}
