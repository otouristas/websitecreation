import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type LayoutProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return buildMetadata({
    title: locale === 'el' ? 'Ξεκινήστε - Δωρεάν έλεγχος SEO ή νέα ιστοσελίδα' : 'Get Started - Free SEO Audit or New Website',
    description:
      locale === 'el'
        ? 'Ζητήστε δωρεάν έλεγχο SEO για την ιστοσελίδα σας ή πείτε μας τι νέα ιστοσελίδα ή e-shop χρειάζεστε. Δύο λεπτά, χωρίς δέσμευση, απάντηση σε 24 εργάσιμες ώρες.'
        : 'Get a free SEO audit of your site, or tell us about the new website or e-shop you need. Two minutes, no commitment, and a reply within 24 working hours.',
    path: localizedPath(locale as SiteLocale, '/get-started'),
    hreflangPath: '/get-started',
  });
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
