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
        ? 'Ζητήστε έλεγχο SEO ή πείτε μας τι νέα ιστοσελίδα χρειάζεστε. Πρώτη απάντηση σε ερώτημα πώλησης μέσα σε 2 εργάσιμες. Χωρίς υποχρεωτική φροντίδα ή εφαρμογή.'
        : 'Ask for an SEO audit or tell us about the new website you need. Sales enquiries get a first reply within 2 business days. No mandatory care plan or app purchase.',
    path: localizedPath(locale as SiteLocale, '/get-started'),
    hreflangPath: '/get-started',
  });
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
