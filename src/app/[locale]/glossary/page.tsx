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
      <Suspense fallback={<div className="main-below-header min-h-screen text-center text-muted-foreground">{ui.loading}</div>}>
        <GlossaryClient locale={locale as SiteLocale} />
      </Suspense>
      <Footer />
    </>
  );
}
