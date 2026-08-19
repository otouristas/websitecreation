import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryServicePageView } from '@/components/pages/IndustryServicePageView';
import { getAllIndustrySlugs, getIndustryBySlug } from '@/data/industries';
import { getAllServiceSlugs, getServiceBySlug } from '@/data/services';
import { getLocalizedIndustry } from '@/lib/industry-locale';
import { getServiceEl } from '@/data/services-i18n';
import { buildIndustryServiceMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { evaluateIndustryService } from '@/lib/indexability/industry-service';

export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string; industry: string; service: string }> };

export async function generateStaticParams() {
  const locales = ['en', 'el'] as const;
  const industrySlugs = getAllIndustrySlugs();
  const serviceSlugs = getAllServiceSlugs();
  return locales.flatMap((locale) =>
    industrySlugs.flatMap((industry) =>
      serviceSlugs.map((service) => ({ locale, industry, service })),
    ),
  );
}

/** Pain points are sentence fragments; give them a full stop before appending. */
function punctuate(text?: string): string {
  if (!text) return '';
  const t = text.trim();
  return /[.!?]$/.test(t) ? `${t} ` : `${t}. `;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, industry: industrySlug, service: serviceSlug } = await params;
  if (!isValidLocale(locale)) return {};
  const industry = getIndustryBySlug(industrySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!industry || !service) return {};
  // Shared builder, so this page and scripts/seo-audit.ts cannot drift apart.
  const meta = buildIndustryServiceMetadata(industry, service, locale as SiteLocale);
  // Combinations the industry hub already satisfies stay reachable for users but
  // out of the index. See lib/indexability/industry-service.ts for the reasoning.
  const verdict = evaluateIndustryService(industrySlug, serviceSlug, locale as SiteLocale);
  if (!verdict.indexable) {
    return { ...meta, robots: { index: false, follow: true } };
  }
  return meta;
}

export default async function IndustryServicePage({ params }: PageProps) {
  const { locale, industry: industrySlug, service: serviceSlug } = await params;
  if (!isValidLocale(locale)) notFound();
  const industry = getLocalizedIndustry(industrySlug, locale as SiteLocale);
  const service = getServiceBySlug(serviceSlug);
  if (!industry || !service) notFound();

  return (
    <IndustryServicePageView
      industrySlug={industrySlug}
      serviceSlug={serviceSlug}
      locale={locale as SiteLocale}
    />
  );
}
