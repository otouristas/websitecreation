import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryPageView } from '@/components/pages/IndustryPageView';
import { getAllIndustrySlugs } from '@/data/industries';
import { getLocalizedIndustry, getIndustryMeta } from '@/lib/industry-locale';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string; industry: string }> };

export async function generateStaticParams() {
  const locales = ['en', 'el'] as const;
  const slugs = getAllIndustrySlugs();
  return locales.flatMap((locale) => slugs.map((industry) => ({ locale, industry })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, industry: slug } = await params;
  if (!isValidLocale(locale)) return {};
  const industry = getLocalizedIndustry(slug, locale as SiteLocale);
  if (!industry) return { title: 'Not Found' };
  const meta = getIndustryMeta(industry, locale as SiteLocale);
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: localizedPath(locale as SiteLocale, `/solutions/${slug}`),
    hreflangPath: `/solutions/${slug}`,
  });
}

export default async function IndustryPage({ params }: PageProps) {
  const { locale, industry: slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const industry = getLocalizedIndustry(slug, locale as SiteLocale);
  if (!industry) notFound();
  return <IndustryPageView industrySlug={slug} locale={locale as SiteLocale} />;
}
