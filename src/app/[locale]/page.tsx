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
      title: 'AnotherSEOGuru | Κατασκευή Ιστοσελίδων, SEO & GEO Ελλάδα',
      description:
        'AnotherSEOGuru — κατασκευή ιστοσελίδων, e-shop και SEO από €899 / €299 μήνα. 70+ live projects σε τουρισμό & τοπικές επιχειρήσεις. GEO/AEO. Δωρεάν προσφορά.',
      path: localizedPath('el', '/'),
      primaryKeyword: 'κατασκευή ιστοσελίδων',
      hreflangPath: '/',
    });
  }

  return buildMetadata({
    title: 'AnotherSEOGuru | Tourism Websites, SEO & AI Visibility',
    description:
      'AnotherSEOGuru builds high-converting websites for hotels, rent-a-car and tours — plus SEO, GEO, AEO and AI chatbots. 70+ live projects. Free quote in EUR.',
    path: localizedPath('en', '/'),
    primaryKeyword: 'tourism website design',
    hreflangPath: '/',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <HomePageView locale={locale as SiteLocale} />;
}
