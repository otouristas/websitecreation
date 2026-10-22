import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TourismHubView } from '@/components/tourism-seo/HubView';
import { TOURISM_HUB_PATH } from '@/data/tourism-seo';
import { EN_TOURISM_HUB_PATH, tourismLanguageAlternates } from '@/data/tourism-seo/en';
import { buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../services/_lib/exact-title';

const TOURISM_HUB_TITLE = 'SEO Τουρισμού: Υπηρεσίες SEO για Τουριστικές Επιχειρήσεις';
const TOURISM_HUB_DESCRIPTION =
  'SEO τουρισμού σε όλη την Ελλάδα για ξενοδοχεία, rent a car, βίλες, εκδρομές και εστιατόρια: πολύγλωσσο SEO, Google Maps και άμεσες κρατήσεις.';

export const revalidate = 3600;

/** Greek-only, like /el/seo. The English locale 404s. */
export function generateStaticParams() {
  return [{ locale: 'el' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'el') return {};
  const metadata = buildMetadata({
    title: TOURISM_HUB_TITLE,
    description: TOURISM_HUB_DESCRIPTION,
    path: TOURISM_HUB_PATH,
    languages: tourismLanguageAlternates(EN_TOURISM_HUB_PATH, TOURISM_HUB_PATH),
  });
  return withExactTitle(metadata, TOURISM_HUB_TITLE);
}

export default async function TourismSeoHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'el') notFound();
  return <TourismHubView />;
}
