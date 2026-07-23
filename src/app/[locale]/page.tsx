import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePageView } from '@/components/pages/HomePageView';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: 'SEO Guru - Web & SEO Ελλάδα',
      description:
        'SEO Guru για κατασκευή ιστοσελίδων, e-shop και SEO από €899 / €299 μήνα. 70+ live projects σε τουρισμό & τοπικές επιχειρήσεις. GEO/AEO. Δωρεάν προσφορά.',
      path: localizedPath('el', '/'),
      primaryKeyword: 'seo guru',
      hreflangPath: '/',
    });
  }

  return buildMetadata({
    title: 'SEO Guru for Hotels & Tours',
    description:
      'SEO Guru builds high-converting websites for hotels, rent-a-car and tours — plus SEO, GEO, AEO. From €899 / €299 mo. 70+ live projects. Free quote in EUR.',
    path: localizedPath('en', '/'),
    primaryKeyword: 'seo guru',
    hreflangPath: '/',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <HomePageView locale={locale as SiteLocale} />;
}
