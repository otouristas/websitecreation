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
      title: 'Κατασκευή Ιστοσελίδων & SEO στην Ελλάδα',
      description:
        'Κατασκευή ιστοσελίδων, e-shop και SEO για επιχειρήσεις σε όλη την Ελλάδα. Διαφανείς τιμές σε €, GEO/AEO, γρήγορη παράδοση. Ζητήστε δωρεάν προσφορά.',
      path: localizedPath('el', '/'),
      primaryKeyword: 'κατασκευή ιστοσελίδων',
      hreflangPath: '/',
    });
  }

  return buildMetadata({
    title: 'Tourism Web Design, SEO & Travel AI',
    description:
      'We build high-converting websites for hotels, rent-a-car, tours and travel brands - plus full SEO, GEO, AEO and AI chatbots. 55+ live projects. Free quote.',
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
