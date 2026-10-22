import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VerticalPageView } from '@/components/tourism-seo/VerticalPageView';
import { getTourismVertical, TOURISM_VERTICALS, tourismPath } from '@/data/tourism-seo';
import { englishSlugForGreek, enTourismPath, tourismLanguageAlternates } from '@/data/tourism-seo/en';
import { buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../../services/_lib/exact-title';

export const revalidate = 3600;
export const dynamicParams = false;

/**
 * Same param shape as /el/seo/[place]: a slug for every parent locale, and the
 * page 404s outside Greek. There is no English copy.
 */
export function generateStaticParams() {
  return TOURISM_VERTICALS.map((vertical) => ({ vertical: vertical.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; vertical: string }>;
}): Promise<Metadata> {
  const { locale, vertical: slug } = await params;
  if (locale !== 'el') return {};
  const vertical = getTourismVertical(slug);
  if (!vertical) return {};
  const path = tourismPath(vertical.slug);
  const enSlug = englishSlugForGreek(vertical.slug);
  const metadata = buildMetadata({
    title: vertical.title,
    description: vertical.description,
    path,
    languages: enSlug ? tourismLanguageAlternates(enTourismPath(enSlug), path) : undefined,
  });
  return withExactTitle(metadata, vertical.title);
}

export default async function TourismVerticalPage({
  params,
}: {
  params: Promise<{ locale: string; vertical: string }>;
}) {
  const { locale, vertical: slug } = await params;
  if (locale !== 'el') notFound();
  const vertical = getTourismVertical(slug);
  if (!vertical) notFound();
  return <VerticalPageView vertical={vertical} />;
}
