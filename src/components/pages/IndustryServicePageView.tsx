import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';
import { services, getServiceBySlug } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { industries } from '@/data/industries';
import { greeceLocations, tier1Locations } from '@/data/locations';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  combineSchemas,
} from '@/lib/seo';
import { SchemaMarkup, Breadcrumbs } from '@/components/seo';
import { getLocalizedIndustry } from '@/lib/industry-locale';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { solutionsUi } from '@/data/translations/solutions-ui';

export function IndustryServicePageView({
  industrySlug,
  serviceSlug,
  locale,
}: {
  industrySlug: string;
  serviceSlug: string;
  locale: SiteLocale;
}) {
  const industry = getLocalizedIndustry(industrySlug, locale);
  const baseService = getServiceBySlug(serviceSlug);
  if (!industry || !baseService) return null;

  const isEl = locale === 'el';
  const svcEl = isEl ? getServiceEl(serviceSlug) : null;
  const serviceName = svcEl?.name ?? baseService.name;
  const serviceDesc = svcEl?.description ?? baseService.description;
  const features = svcEl?.features ?? baseService.features;
  const ui = isEl ? solutionsUi.el : solutionsUi.en;
  const lp = (path: string) => localizedPath(locale, path);

  const relatedServices = services
    .filter((s) => s.slug !== serviceSlug)
    .slice(0, 3)
    .map((s) => ({
      ...s,
      name: isEl ? (getServiceEl(s.slug)?.name ?? s.name) : s.name,
      description: isEl ? (getServiceEl(s.slug)?.description ?? s.description) : s.description,
    }));

  const relatedIndustries = industries
    .filter((i) => i.slug !== industrySlug)
    .slice(0, 4)
    .map((i) => getLocalizedIndustry(i.slug, locale)!);

  const breadcrumbs = [
    { name: ui.home, url: lp('/') },
    { name: ui.solutions, url: lp('/solutions') },
    { name: industry.name, url: lp(`/solutions/${industrySlug}`) },
    { name: serviceName, url: lp(`/solutions/${industrySlug}/${serviceSlug}`) },
  ];

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generateServiceSchema({
      name: ui.serviceForIndustry(serviceName, industry.name),
      description: ui.serviceHeroDesc(serviceName, industry.name),
      provider: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
      serviceType: 'Web Development',
    }),
    generateArticleSchema({
      headline: ui.serviceForIndustry(serviceName, industry.name),
      description: ui.serviceHeroDesc(serviceName, industry.name),
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      author: { name: 'AnotherSEOGuru' },
    }),
  );

  const locations = isEl ? greeceLocations : tier1Locations.slice(0, 18);

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header />
      <main className="main-below-header">
        <section className="section-compact gradient-hero">
          <div className="container">
            <div className="max-w-3xl">
              <Breadcrumbs items={breadcrumbs} className="mb-6" />
              <h1 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
                {ui.serviceForIndustry(serviceName, industry.name)}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground">
                {ui.serviceHeroDesc(serviceName, industry.name)}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={lp('/contact')} className="btn btn-gradient">
                  {ui.getIndustryQuote(industry.name)}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href={lp(`/solutions/${industrySlug}`)} className="btn btn-outline">
                  {ui.allIndustryServices(industry.name)}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{ui.whatsIncluded(industry.name)}</h2>
            <p className="mb-8 max-w-2xl text-muted-foreground">
              {ui.whatsIncludedDesc(serviceName, industry.name)}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{ui.builtFor(industry.name)}</h2>
            <p className="mb-8 text-muted-foreground">{ui.builtForDesc(industry.name)}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {industry.painPoints.map((point) => (
                <div key={point} className="card p-6 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              {ui.byCityService(serviceName, industry.name)}
            </h2>
            <p className="mb-8 text-muted-foreground">
              {ui.byCityServiceDesc(industry.name, isEl)}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  href={lp(`/services/${serviceSlug}/${location.slug}`)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-center text-sm transition-smooth hover:border-primary hover:text-primary"
                >
                  {'cityLocal' in location && location.cityLocal ? location.cityLocal : location.city}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">{ui.otherServicesFor(industry.name)}</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={lp(`/solutions/${industrySlug}/${related.slug}`)}
                  className="card p-6 hover-glow"
                >
                  <h3 className="mb-2 font-semibold">{related.name}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">
              {ui.serviceForOtherIndustries(serviceName)}
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relatedIndustries.map((related) => (
                <Link
                  key={related.slug}
                  href={lp(`/solutions/${related.slug}/${serviceSlug}`)}
                  className="card p-4 text-center hover-glow"
                >
                  <span className="text-sm font-medium">{related.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section gradient-primary text-white">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold">{ui.readyForService(serviceName)}</h2>
            <p className="mb-8 text-white/80">{ui.readyForServiceSub(industry.name)}</p>
            <Link href={lp('/contact')} className="btn bg-white text-primary hover:bg-white/90">
              {ui.freeQuote}
            </Link>
          </div>
        </section>
      </main>
      <StickyMobileCta />
      <Footer />
    </>
  );
}
