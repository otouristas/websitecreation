import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type LayoutProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: locale === 'el' ? 'Ξεκινήστε — Έργο ιστοσελίδας & SEO' : 'Get Started — Website & SEO Project',
    description:
      locale === 'el'
        ? 'Ξεκινήστε το έργο σας: επιλέξτε πακέτο, μοιραστείτε στόχους και λάβετε SEO-ready ιστοσελίδα σε εβδομάδες.'
        : 'Start your website or SEO project: choose a package, share your goals, and launch a fast, SEO-ready site in weeks. Platform trial or full agency delivery available.',
    path: localizedPath(locale as SiteLocale, '/get-started'),
    hreflangPath: '/get-started',
  });
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
