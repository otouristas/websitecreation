import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WebsiteRegionView } from '@/components/website-region/WebsiteRegionView';
import { getWebsiteRegion, WEBSITE_REGION_PAGES, websiteRegionPath } from '@/data/website-regions';
import { BASE_URL, buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../../services/_lib/exact-title';

export const revalidate = 3600;
export const dynamicParams = false;

/** Greek only. English params are emitted so the set is complete, then 404 below. */
export function generateStaticParams() {
  return WEBSITE_REGION_PAGES.map((page) => ({ region: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}): Promise<Metadata> {
  const { locale, region } = await params;
  if (locale !== 'el') return {};
  const page = getWebsiteRegion(region);
  if (!page) return {};
  const path = websiteRegionPath(page.slug);
  const metadata = buildMetadata({
    title: page.title,
    description: page.description,
    path,
    languages: {
      el: `${BASE_URL}${path}`,
      'x-default': `${BASE_URL}${path}`,
    },
  });
  return withExactTitle(metadata, page.title);
}

export default async function WebsiteRegionPage({
  params,
}: {
  params: Promise<{ locale: string; region: string }>;
}) {
  const { locale, region } = await params;
  if (locale !== 'el') notFound();
  const page = getWebsiteRegion(region);
  if (!page) notFound();
  return <WebsiteRegionView page={page} />;
}
