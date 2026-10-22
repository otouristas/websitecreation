import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePageView } from '@/components/pages/HomePageView';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { withExactTitle } from './services/_lib/exact-title';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    // Exact SERP title: the homepage owns «εταιρεία SEO»; «υπηρεσίες SEO»
    // belongs to /el/seo-services. Built from the Google top 3 for «εταιρεία
    // SEO» (2026-10-23): all lead with «Εταιρεία SEO», plus Ελλάδα and a free check.
    const title = 'Εταιρεία SEO στην Ελλάδα, με Δωρεάν Έλεγχο | AnotherSEOGuru';
    return withExactTitle(
      buildMetadata({
        title,
        description:
          'Εταιρεία SEO στην Ελλάδα για ξενοδοχεία, rent-a-car και τοπικές επιχειρήσεις: τεχνικό SEO, GEO/AEO και μέτρηση σε αιτήματα. Ζητήστε δωρεάν έλεγχο.',
        path: localizedPath('el', '/'),
        primaryKeyword: 'εταιρεία SEO',
        hreflangPath: '/',
      }),
      title,
    );
  }

  // Built from the Google top 3 for "seo agency greece" (2026-10-23):
  // "SEO Companies in Greece", "SEO & Growth Marketing in Greece", "SEO Agencies in Greece".
  return buildMetadata({
    title: 'SEO Agency in Greece: Technical SEO & GEO',
    description:
      'Technical SEO, local SEO and GEO/AEO, plus website and e-shop builds. Strategy built on your own Search Console data, not a template. Request a quote.',
    path: localizedPath('en', '/'),
    primaryKeyword: 'seo agency greece',
    hreflangPath: '/',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <HomePageView locale={locale as SiteLocale} />;
}
