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
      title: 'Κατασκευή Ιστοσελίδων Τουρισμού & SEO | Ξενοδοχεία, Rent a Car',
      description:
        'AnotherSEOGuru: κατασκευή ιστοσελίδων, e-shop και SEO για ξενοδοχεία και τουρισμό από €899 / €299 μήνα. 70+ έργα. GEO/AEO. Δωρεάν προσφορά.',
      path: localizedPath('el', '/'),
      primaryKeyword: 'κατασκευή ιστοσελίδων',
      hreflangPath: '/',
    });
  }

  return buildMetadata({
    title: 'Tourism Website Design & SEO Agency | Hotels, Rent-a-Car, Tours',
    description:
      'Custom tourism websites with SEO, GEO & AEO. 70+ live projects across Greece and Europe. From €899. Free quote.',
    path: localizedPath('en', '/'),
    primaryKeyword: 'hotel website design',
    hreflangPath: '/',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <HomePageView locale={locale as SiteLocale} />;
}
