import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EnglishVerticalView } from '@/components/tourism-seo/EnglishVerticalView';
import {
  ENGLISH_VERTICALS,
  enTourismPath,
  getEnglishTourismVertical,
  tourismLanguageAlternates,
} from '@/data/tourism-seo/en';
import { tourismPath } from '@/data/tourism-seo';
import { buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../../services/_lib/exact-title';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return ENGLISH_VERTICALS.map((vertical) => ({ vertical: vertical.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; vertical: string }>;
}): Promise<Metadata> {
  const { locale, vertical: slug } = await params;
  if (locale !== 'en') return {};
  const vertical = getEnglishTourismVertical(slug);
  if (!vertical) return {};
  const path = enTourismPath(vertical.slug);
  const metadata = buildMetadata({
    title: vertical.title,
    description: vertical.description,
    path,
    languages: tourismLanguageAlternates(path, tourismPath(vertical.elSlug)),
  });
  return withExactTitle(metadata, vertical.title);
}

export default async function EnglishTourismVerticalPage({
  params,
}: {
  params: Promise<{ locale: string; vertical: string }>;
}) {
  const { locale, vertical: slug } = await params;
  if (locale !== 'en') notFound();
  const vertical = getEnglishTourismVertical(slug);
  if (!vertical) notFound();
  return <EnglishVerticalView vertical={vertical} />;
}
