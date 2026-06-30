import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustryServicePageView } from '@/components/pages/IndustryServicePageView';
import { getAllIndustrySlugs } from '@/data/industries';
import { getAllServiceSlugs, getServiceBySlug } from '@/data/services';
import { getLocalizedIndustry } from '@/lib/industry-locale';
import { getServiceEl } from '@/data/services-i18n';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, industry: industrySlug, service: serviceSlug } = await params;
  if (!isValidLocale(locale)) return {};
  const industry = getLocalizedIndustry(industrySlug, locale as SiteLocale);
  const baseService = getServiceBySlug(serviceSlug);
  if (!industry || !baseService) return { title: 'Not Found' };

  const svcEl = locale === 'el' ? getServiceEl(serviceSlug) : null;
  const serviceName = svcEl?.name ?? baseService.name;

  const title =
    locale === 'el'
      ? `${serviceName} για ${industry.name}`
      : `${serviceName} for ${industry.name}`;

  return buildMetadata({
    title,
    description:
      locale === 'el'
        ? `Επαγγελματικό ${serviceName.toLowerCase()} για ${industry.name}. SEO-ready ιστοσελίδες, τοπική στρατηγική και γρήγορη παράδοση.`
        : `Professional ${serviceName.toLowerCase()} for ${industry.name}. SEO-ready websites tailored to your industry.`,
    path: localizedPath(locale as SiteLocale, `/solutions/${industrySlug}/${serviceSlug}`),
    hreflangPath: `/solutions/${industrySlug}/${serviceSlug}`,
  });
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
