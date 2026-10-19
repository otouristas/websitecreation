import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TourismHubView } from '@/components/tourism-seo/HubView';
import { TOURISM_HUB_PATH } from '@/data/tourism-seo';
import { BASE_URL, buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../services/_lib/exact-title';

const TOURISM_HUB_TITLE = 'Υπηρεσίες SEO για Τουριστικές Επιχειρήσεις';
const TOURISM_HUB_DESCRIPTION =
  'Υπηρεσίες SEO για τουριστικές επιχειρήσεις σε όλη την Ελλάδα: ξενοδοχεία, rent a car, βίλες, εκδρομές και εστιατόρια. Άμεσες κρατήσεις από Google και AI.';

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
    languages: {
      el: `${BASE_URL}${TOURISM_HUB_PATH}`,
      'x-default': `${BASE_URL}${TOURISM_HUB_PATH}`,
    },
  });
  return withExactTitle(metadata, TOURISM_HUB_TITLE);
}

export default async function TourismSeoHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'el') notFound();
  return <TourismHubView />;
}
