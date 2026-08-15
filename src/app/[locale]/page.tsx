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
      title: 'Κατασκευή Ιστοσελίδων & SEO',
      description:
        'Κατασκευή ιστοσελίδων, e-shop και SEO στην Ελλάδα από €899 / €299 μήνα. 70+ έργα, GEO/AEO, δωρεάν προσφορά σε 24 ώρες.',
      path: localizedPath('el', '/'),
      primaryKeyword: 'κατασκευή ιστοσελίδων',
      hreflangPath: '/',
    });
  }

  return buildMetadata({
    title: 'Website Design, E-shop & SEO',
    description:
      'Website design, WooCommerce and SEO for Greece and beyond. From €899 / €299 mo. GEO & AEO included. Free quote in 24 hours.',
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
