import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type LayoutProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: locale === 'el' ? 'Επικοινωνία με την ομάδα του AnotherSEOGuru' : 'Contact the AnotherSEOGuru Team',
    description:
      locale === 'el'
        ? 'Ρωτήστε για το AnotherSEOGuru App, ζητήστε βοήθεια με το SEO ή συζητήστε μια νέα ιστοσελίδα. Απαντάμε μέσα σε 24 εργάσιμες ώρες.'
        : 'Ask about an AnotherSEOGuru App plan, get help with SEO or discuss a website project. Our team replies within 24 working hours.',
    path: localizedPath(locale as SiteLocale, '/contact'),
    hreflangPath: '/contact',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
