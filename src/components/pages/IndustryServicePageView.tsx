import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { getIndustriesForLocale } from '@/data/industries';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  combineSchemas,
} from '@/lib/seo';
import { SchemaMarkup } from '@/components/seo';
import { ArrowUpRight, Compass, ListChecks, MapPin, Target, TrendingUp, Workflow } from 'lucide-react';
import {
  Accent,
  AgencyCtas,
  AuditPreview,
  CtaBand,
  DecisionsPanel,
  KitHeading,
  KitSection,
  Stage,
  kitSecondaryBtn,
} from '@/components/kit';
import { CardGrid, ChipLinks, InfoCard, KitFaq, LinkCard, PageHero, SplitRow } from '@/components/page-kit';
import { getLocalizedIndustry } from '@/lib/industry-locale';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { solutionsUi } from '@/data/translations/solutions-ui';
import { getServiceAngle, getServiceFaqs, ANGLE_HEADINGS, FAQ_HEADING } from '@/data/industry-service-copy';
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from '@/lib/seo/content-dates';
import { getIndexableServiceLocations } from '@/data/locations';
import { isCityPageService } from '@/lib/indexability/service-location';

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
  const features = svcEl?.features ?? baseService.features;
  const ui = isEl ? solutionsUi.el : solutionsUi.en;
  /**
   * Differentiation on the service axis. Composed with the industry's authored
   * pain points below, this is what stops the page being the same template with
   * a noun swapped in.
   */
  const angle = getServiceAngle(serviceSlug, locale);
  const angleHeadings = isEl ? ANGLE_HEADINGS.el : ANGLE_HEADINGS.en;
  const serviceFaqs = getServiceFaqs(serviceSlug, locale);
  const lp = (path: string) => localizedPath(locale, path);

  const relatedServices = services
    .filter((s) => s.slug !== serviceSlug)
    .slice(0, 3)
    .map((s) => ({
      ...s,
      name: isEl ? (getServiceEl(s.slug)?.name ?? s.name) : s.name,
      description: isEl ? (getServiceEl(s.slug)?.description ?? s.description) : s.description,
    }));

  const relatedIndustries = getIndustriesForLocale(locale)
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
      name: ui.serviceForIndustry(serviceName, industry.nameFor),
      description: ui.serviceHeroDesc(serviceName, industry.name),
      provider: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
      serviceType: 'Web Development',
    }),
    generateArticleSchema({
      headline: ui.serviceForIndustry(serviceName, industry.nameFor),
      description: ui.serviceHeroDesc(serviceName, industry.name),
      datePublished: GENERATED_CONTENT_PUBLISHED,
      dateModified: GENERATED_CONTENT_UPDATED,
      author: { name: 'AnotherSEOGuru' },
    }),
  );

  // Only link live service x city pages (2026-10 city cut): services without
  // city pages show no city block at all.
  const locations = isCityPageService(serviceSlug)
    ? getIndexableServiceLocations(isEl ? 'el' : 'en')
    : [];

  const h1 = ui.serviceForIndustry(serviceName, industry.nameFor);
  const cut = h1.lastIndexOf(industry.nameFor);
  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale}
          size="md"
          breadcrumbs={breadcrumbs}
          pill={{
            href: lp('/get-started#free-audit'),
            kind: 'free',
            tag: tx('Free', 'Δωρεάν'),
            text: tx('SEO audit before any quote', 'Έλεγχος SEO πριν από κάθε προσφορά'),
          }}
          title={
            cut > 0 ? (
              <>
                {h1.slice(0, cut)}
                <Accent>{h1.slice(cut)}</Accent>
              </>
            ) : (
              h1
            )
          }
          lead={ui.serviceHeroDesc(serviceName, industry.name)}
          actions={
            <div className="flex flex-col items-center gap-3">
              <AgencyCtas locale={locale} primaryHref={lp('/contact')} primaryLabel={ui.getIndustryQuote(industry.name)} />
              <Link
                href={lp(`/solutions/${industrySlug}`)}
                className="text-[14px] font-medium text-muted-foreground underline decoration-hairline underline-offset-4 hover:text-foreground"
              >
                {ui.allIndustryServices(industry.name)}
              </Link>
            </div>
          }
        />

        {/* No FAQPage: `getServiceFaqs` serves the same shared default block
            to most industry x service combinations, so this marked up
            identical Q&A across hundreds of URLs for a rich result an agency
            cannot earn. The visible FAQ below is the part that matters. */}
        {angle ? (
          <KitSection>
            <div className="grid gap-4 md:grid-cols-3">
              {(
                [
                  [angleHeadings.approach, angle.approach, Compass],
                  [angleHeadings.process, angle.process, Workflow],
                  [angleHeadings.outcome, angle.outcome, TrendingUp],
                ] as const
              ).map(([heading, body, Icon]) => (
                <InfoCard key={heading} as="h2" icon={<Icon />} title={heading} text={body} />
              ))}
            </div>
          </KitSection>
        ) : null}

        <KitSection className={angle ? '!pt-0' : undefined}>
          <SplitRow
            eyebrow={tx('Included', 'Περιλαμβάνεται')}
            eyebrowIcon={<ListChecks />}
            title={ui.whatsIncluded(industry.nameFor)}
            body={ui.whatsIncludedDesc(serviceName, industry.nameFor)}
            bullets={features}
            preview={
              <Stage>
                <AuditPreview locale={locale} />
              </Stage>
            }
          />
        </KitSection>

        <KitSection tinted>
          <SplitRow
            flip
            eyebrow={industry.name}
            eyebrowIcon={<Target />}
            title={ui.builtFor(industry.nameFor)}
            body={ui.builtForDesc(industry.name)}
            bullets={industry.painPoints}
            preview={
              <Stage>
                <DecisionsPanel locale={locale} />
              </Stage>
            }
          />
        </KitSection>

        {serviceFaqs.length > 0 ? (
          <KitFaq
            title={isEl ? FAQ_HEADING.el : FAQ_HEADING.en}
            items={serviceFaqs.map((q) => ({ question: q.question, answer: q.answer }))}
          />
        ) : null}

        {locations.length > 0 ? (
          <KitSection className="!pt-0">
            <KitHeading
              eyebrow={tx('Local', 'Τοπικά')}
              eyebrowIcon={<MapPin />}
              title={ui.byCityService(serviceName, industry.name)}
              description={ui.byCityServiceDesc(industry.nameFor, isEl)}
            />
            <ChipLinks
              className="mt-8"
              items={locations.map((location) => ({
                key: location.slug,
                href: lp(`/services/${serviceSlug}/${location.slug}`),
                label: 'cityLocal' in location && location.cityLocal ? location.cityLocal : location.city,
              }))}
            />
          </KitSection>
        ) : null}

        <KitSection tinted>
          <KitHeading eyebrow={tx('More services', 'Περισσότερες υπηρεσίες')} title={ui.otherServicesFor(industry.nameFor)} />
          <CardGrid className="mt-10">
            {relatedServices.map((related) => (
              <LinkCard
                key={related.slug}
                href={lp(`/solutions/${industrySlug}/${related.slug}`)}
                title={related.name}
                text={related.description}
              />
            ))}
          </CardGrid>
          <h2 className="mt-16 font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground sm:text-[26px]">
            {ui.serviceForOtherIndustries(serviceName)}
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {relatedIndustries.map((related) => (
              <li key={related.slug}>
                <Link
                  href={lp(`/solutions/${related.slug}/${serviceSlug}`)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-background/60 px-4 py-3.5 text-[14.5px] font-medium text-foreground transition-colors hover:border-brand/40"
                >
                  {related.name}
                  <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-brand" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link href={lp('/contact')} className={kitSecondaryBtn}>
              {ui.freeQuote}
            </Link>
          </p>
        </KitSection>

        <CtaBand
          locale={locale}
          source={`industry-service-${industrySlug}`}
          title={<>{ui.readyForService(serviceName)}</>}
          description={ui.readyForServiceSub(industry.name)}
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
