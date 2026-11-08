import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type LayoutProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: locale === 'el' ? 'Επικοινωνία - Υποστήριξη AnotherSEOGuru App' : 'Contact - AnotherSEOGuru App Support',
    description:
      locale === 'el'
        ? 'Επικοινωνήστε με την ομάδα του AnotherSEOGuru App για ερωτήσεις, βοήθεια με τον λογαριασμό ή επίδειξη. Απάντηση εντός 24 ωρών.'
        : 'Contact the AnotherSEOGuru App team for questions, account help or a demo. We reply within 24 hours.',
    path: localizedPath(locale as SiteLocale, '/contact'),
    hreflangPath: '/contact',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
