import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryPageView } from '@/components/pages/IndustryPageView';
import { getBespokeIndustryPage } from '@/components/solutions/registry';
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

  // Each industry gets its own hand-built page. Slugs not yet rebuilt fall
  // through to the shared template so the rollout can ship in waves.
  // Registry lookup, not a component defined during render: the module-level
  // map is stable across renders. react-hooks cannot see that through the call.
  const Bespoke = getBespokeIndustryPage(slug);
  // eslint-disable-next-line react-hooks/static-components
  if (Bespoke) return <Bespoke locale={locale as SiteLocale} />;

  return <IndustryPageView industrySlug={slug} locale={locale as SiteLocale} />;
}
