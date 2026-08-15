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
      title: 'SEO & Κατασκευή Ιστοσελίδων στην Ελλάδα',
      description:
        'Τεχνικό SEO, τοπικό SEO και GEO/AEO, με κατασκευή ιστοσελίδων και e-shop. Στρατηγική βάσει των δικών σας δεδομένων, όχι έτοιμο πακέτο. Ζητήστε προσφορά.',
      path: localizedPath('el', '/'),
      primaryKeyword: 'κατασκευή ιστοσελίδων',
      hreflangPath: '/',
    });
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
