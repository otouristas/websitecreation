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
    // Exact SERP title from the Greek keyword map: the homepage owns
    // «εταιρεία SEO»; «υπηρεσίες SEO» belongs to /el/seo-services.
    const title = 'Εταιρεία SEO & Κατασκευή Ιστοσελίδων | AnotherSEOGuru';
    return withExactTitle(
      buildMetadata({
        title,
        description:
          'Εταιρεία SEO και κατασκευής ιστοσελίδων στην Ελλάδα. Δουλεύουμε με ξενοδοχεία, rent-a-car και τοπικές επιχειρήσεις και μετράμε αποτελέσματα σε αιτήματα.',
        path: localizedPath('el', '/'),
        primaryKeyword: 'εταιρεία SEO',
        hreflangPath: '/',
      }),
      title,
    );
  }

  return buildMetadata({
    title: 'SEO & Web Design Agency in Greece',
    description:
      'Technical SEO, local SEO and GEO/AEO, plus website and e-shop builds. Strategy built on your own Search Console data, not a template. Request a quote.',
    path: localizedPath('en', '/'),
    primaryKeyword: 'website design',
    hreflangPath: '/',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <HomePageView locale={locale as SiteLocale} />;
}
