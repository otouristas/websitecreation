import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SpokeView } from '@/components/seo-services/SpokeView';
import { SPOKE_SLUGS, getSpokeCopy } from '@/data/seo-service-spokes';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string; spoke: string }> };

/**
 * Technical, on-page and strategy pages under the SEO-services hub.
 *
 * Not entries in `src/data/services.ts`. That array drives the city-page
 * matrix, and these pages have no city variants.
 */
export function generateStaticParams() {
  return SPOKE_SLUGS.map((spoke) => ({ spoke }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, spoke } = await params;
  if (!isValidLocale(locale)) return {};
  const copy = getSpokeCopy(locale, spoke);
  if (!copy) return {};

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: localizedPath(locale, `/seo-services/${copy.slug}`),
    hreflangPath: `/seo-services/${copy.slug}`,
    primaryKeyword: copy.primaryKeyword,
  });
}

export default async function SeoServiceSpokePage({ params }: PageProps) {
  const { locale, spoke } = await params;
  if (!isValidLocale(locale)) notFound();
  const copy = getSpokeCopy(locale as SiteLocale, spoke);
  if (!copy) notFound();
  return <SpokeView locale={locale as SiteLocale} copy={copy} />;
}
