import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PlacePageView } from '@/components/place-seo/PlacePageView';
import { getPlace, PLACE_PAGES } from '@/data/place-seo';
import { BASE_URL, buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../../services/_lib/exact-title';

export const revalidate = 3600;
export const dynamicParams = false;

/**
 * Emit a slug for every parent locale. An empty array for English makes the
 * param set incomplete, and Next then prerenders none of the place pages.
 * Non-Greek URLs still 404 in the page below. There is no English copy.
 */
export function generateStaticParams() {
  return PLACE_PAGES.map((place) => ({ place: place.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; place: string }>;
}): Promise<Metadata> {
  const { locale, place: slug } = await params;
  if (locale !== 'el') return {};
  const place = getPlace(slug);
  if (!place) return {};
  const path = `/el/seo/${place.slug}`;
  const metadata = buildMetadata({
    title: place.title,
    description: place.description,
    path,
    languages: {
      el: `${BASE_URL}${path}`,
      'x-default': `${BASE_URL}${path}`,
    },
  });
  return withExactTitle(metadata, place.title);
}

export default async function PlaceSeoPage({
  params,
}: {
  params: Promise<{ locale: string; place: string }>;
}) {
  const { locale, place: slug } = await params;
  if (locale !== 'el') notFound();
  const place = getPlace(slug);
  if (!place) notFound();
  return <PlacePageView place={place} />;
}
