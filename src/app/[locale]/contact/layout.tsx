import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type LayoutProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: locale === 'el' ? 'Επικοινωνία - Δωρεάν προσφορά SEO' : 'Contact - Get a Free SEO Quote',
    description:
      locale === 'el'
        ? 'Επικοινωνήστε με την ομάδα SEO και web design. Απάντηση εντός 24 ωρών. Δωρεάν προσφορά για ιστοσελίδες, GEO, AEO και τεχνικό SEO.'
        : 'Contact our SEO and web design team. We respond within 24 hours. Request a free quote for websites, GEO, AEO, technical SEO, or platform trial access.',
    path: localizedPath(locale as SiteLocale, '/contact'),
    hreflangPath: '/contact',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
