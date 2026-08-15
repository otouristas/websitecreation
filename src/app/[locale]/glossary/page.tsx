import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlossaryClient } from "@/components/glossary/GlossaryClient";
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
      <Footer />
    </>
  );
}
