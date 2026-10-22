import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EnglishTourismHubView } from '@/components/tourism-seo/EnglishHubView';
import { EN_TOURISM_HUB_PATH, tourismLanguageAlternates } from '@/data/tourism-seo/en';
import { TOURISM_HUB_PATH } from '@/data/tourism-seo';
import { buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../services/_lib/exact-title';

const TITLE = 'Tourism SEO Agency for Hotels and Tours | AnotherSEOGuru';
const DESCRIPTION =
  'Tourism SEO for hotels, villas, rent a car, tours and restaurants in Greece: multilingual pages, Google Maps and direct bookings. Request a free audit.';

export const revalidate = 3600;

/** English twin of /el/seo-tourismou. Greek visitors stay on the Greek URL. */
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') return {};
  const metadata = buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: EN_TOURISM_HUB_PATH,
    languages: tourismLanguageAlternates(EN_TOURISM_HUB_PATH, TOURISM_HUB_PATH),
  });
  return withExactTitle(metadata, TITLE);
}

export default async function EnglishTourismHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  return <EnglishTourismHubView />;
}
