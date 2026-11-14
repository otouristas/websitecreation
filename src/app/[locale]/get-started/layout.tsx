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
        ? 'Ζητήστε δωρεάν έλεγχο SEO για την ιστοσελίδα σας. Αν σχεδιάζετε μια νέα ιστοσελίδα ή e-shop, περιγράψτε μας τι χρειάζεστε για να λάβετε προσφορά.'
        : 'Request a free SEO check of your public pages, or tell us about a website or online shop you want to build and get a quote from our team.',
    path: localizedPath(locale as SiteLocale, '/get-started'),
    hreflangPath: '/get-started',
  });
}

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
