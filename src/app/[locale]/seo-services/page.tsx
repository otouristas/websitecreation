import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import RelatedPages from '@/components/seo/RelatedPages';
import { OpportunitiesPreview, ReportPreview, agencyTrust } from '@/components/kit';
import { ChipLinks, DiyRow, PriceTiers, ProofGrid } from '@/components/service-kit';
import { homeCopy } from '@/components/pages/home/copy';
import {
  AnnouncePill,
  AppPanel,
  TrustMarks,
  WaveChoice,
  WaveClose,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveStats,
  WaveSteps,
} from '@/components/pages/platform-wave/ui';
import { ManagedFaq, RiskBuckets, ServiceHeroActions, accentEnd, type RiskTier } from '@/components/pages/services-wave/ui';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildMetadata } from '@/lib/seo';
import {
  BASE_URL,
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
} from '@/lib/seo/schema';
import { generateBreadcrumbs } from '@/lib/linking';
import { getSeoServicesPillarCopy, type PillarSection } from '@/data/seo-services-pillar';
import { getSeoHubServicesBlock, getSeoServiceCards } from '@/data/seo-service-spokes';
import { resolvePriceTokens } from '@/data/pricing';
import { PROJECTS_DELIVERED_LABEL, SEO_MIN_TERM_MONTHS } from '@/data/company-facts';
import { portfolioProjects } from '@/data/portfolio';
import { getIndexableServiceLocations } from '@/data/locations';
import { getGreekLocative } from '@/lib/greek-locative';
import { TopicSections, renderInlineLinks } from '@/components/services/topic-sections';
import { withExactTitle } from '../services/_lib/exact-title';

type PageProps = { params: Promise<{ locale: string }> };

function workHref(slug: string, lp: (path: string) => string): string {
  const project = portfolioProjects.find((p) => p.slug === slug && !p.liveStatus);
  return project ? lp(`/work/${project.slug}`) : lp('/work');
}

function numbered(steps: readonly PillarSection[]) {
  return steps.map((step, index) => ({
    n: String(index + 1).padStart(2, '0'),
    title: step.title,
    body: step.body,
  }));
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

/**
 * The SEO-services commercial pillar.
 *
 * Deliberately *not* a new entry in `src/data/services.ts`: that array is the
 * axis of the service x location and industry x service matrices, so adding a
 * slug there would generate ~160 more location URLs and 62 more industry ones,
 * every Greek city among them immediately indexable through
 * `hasLocationContent`, which does not discriminate by service. A pillar with
 * no city variants has no business living on that axis.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getSeoServicesPillarCopy(locale);

  const metadata = buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: localizedPath(locale, '/seo-services'),
    hreflangPath: '/seo-services',
    primaryKeyword: t.primaryKeyword,
  });
  // The Greek title is the exact SERP string from the keyword map (it already
  // carries the brand), so it bypasses the 43-character primary-part cap.
  return locale === 'el' ? withExactTitle(metadata, t.metaTitle) : metadata;
}

export default async function SeoServicesPillarPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === 'el';
  const lp = (path: string) => localizedPath(siteLocale, path);
  const t = getSeoServicesPillarCopy(siteLocale);
  const rp = (text: string) => resolvePriceTokens(text, siteLocale);

  const breadcrumbItems = generateBreadcrumbs(
    [{ name: t.eyebrow, url: '/seo-services' }],
    siteLocale,
  );

  const faqs = t.faqs.map((f) => ({ question: f.question, answer: rp(f.answer) }));

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateServiceSchema({
      name: t.metaTitle,
      description: rp(t.metaDescription),
      provider: { name: 'AnotherSEOGuru', url: BASE_URL },
      serviceType: 'Search engine optimization',
      areaServed: ['GR'],
    }),
    // FAQPage stays here: these questions are written for this page,
    // rendered visibly on it, and are not repeated on any other URL.
    generateFAQSchema({ faqs }),
  );

  // Greek client work, used as evidence of market rather than of outcome:
  // no metric is recorded for any project, so none is claimed.
  const proof = portfolioProjects
    .filter((p) => !p.liveStatus && p.markets.includes('GR'))
    .filter((p) => ['rent-a-car', 'hotel', 'tours'].includes(p.category))
    .slice(0, 6);

  const serviceCards = getSeoServiceCards(siteLocale);
  const servicesBlock = getSeoHubServicesBlock(siteLocale);

  const related = [
    { path: isEl ? '/diacheirisi-seo' : '/managed-seo', title: isEl ? 'Διαχείριση SEO' : 'Managed SEO' },
    ...serviceCards.map((card) => ({ path: card.href, title: card.title })),
    { path: '/services/ai-visibility', title: isEl ? 'AI Visibility (GEO/AEO)' : 'AI visibility (GEO/AEO)' },
    { path: '/services/website-creation', title: isEl ? 'Κατασκευή ιστοσελίδων' : 'Website creation' },
    { path: '/pricing', title: isEl ? 'Τιμές και πακέτα' : 'Pricing and packages' },
    ...(isEl ? [{ path: '/blog/pos-na-epilexete-etaireia-seo', title: 'Πώς να επιλέξετε εταιρεία SEO' }] : []),
    {
      path: isEl ? '/blog/poso-kostizei-to-seo' : '/blog/how-much-does-seo-cost',
      title: isEl ? 'Πόσο κοστίζει το SEO' : 'How much SEO costs',
    },
  ];

  const tx = (en: string, el: string) => (isEl ? el : en);
  const seoCities = isEl && t.cities ? getIndexableServiceLocations('el') : [];
  const copy = homeCopy(siteLocale);
  const includes = t.includes.items;
  const riskTiers: readonly RiskTier[] = [
    {
      id: 'site',
      label: tx('The site', 'Ο ιστότοπος'),
      items: includes.slice(0, 1).map((item) => ({
        key: item.href ?? item.title,
        title: item.title,
        body: item.body,
        href: item.href ? lp(item.href) : undefined,
      })),
    },
    {
      id: 'page',
      label: tx('The page', 'Η σελίδα'),
      items: includes.slice(1, 3).map((item) => ({
        key: item.href ?? item.title,
        title: item.title,
        body: item.body,
        href: item.href ? lp(item.href) : undefined,
      })),
    },
    {
      id: 'found',
      label: tx('When they search', 'Όταν σας ψάχνουν'),
      items: includes.slice(3).map((item) => ({
        key: item.href ?? item.title,
        title: item.title,
        body: item.body,
        href: item.href ? lp(item.href) : undefined,
      })),
    },
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          titleClassName="text-[1.85rem] min-[400px]:text-[2.05rem] sm:text-[2.6rem] lg:text-[3.05rem]"
          pill={
            <div className="flex min-w-0 flex-col items-start gap-4">
              <Breadcrumbs items={breadcrumbItems} className="min-w-0 max-w-full" />
              <AnnouncePill
                href={`${lp('/get-started')}#free-audit`}
                tag={tx('Free', 'Δωρεάν')}
                text={tx('Every engagement starts with a free SEO audit', 'Κάθε συνεργασία ξεκινά με δωρεάν έλεγχο SEO')}
                wrap
              />
            </div>
          }
          title={accentEnd(t.h1, 2)}
          lead={rp(t.answer)}
          extra={t.answerExtra}
          actions={
            <ServiceHeroActions
              locale={siteLocale}
              primaryHref={lp('/get-started')}
              primaryLabel={t.cta.primary}
              whatsappLabel={t.cta.whatsapp}
              links={[{ href: lp('/pricing'), label: t.cta.secondary }]}
            />
          }
          trust={<TrustMarks items={agencyTrust(siteLocale).map((item) => item.label)} yesLabel={copy.markYes} />}
          panel={
            <AppPanel
              url="app.anotherseoguru.com/reports"
              badge={tx('Sample data', 'Δείγμα δεδομένων')}
              caption={tx(
                'A monthly SEO report on a sample hotel: organic clicks, booking-page visits, top-3 keywords and the changes shipped.',
                'Μηνιαία αναφορά SEO σε δείγμα ξενοδοχείου: οργανικά κλικ, επισκέψεις κρατήσεων, λέξεις στο top 3 και οι αλλαγές που έγιναν.',
              )}
            >
              <ReportPreview locale={siteLocale} />
            </AppPanel>
          }
          panelNote={tx('A sample monthly report, the kind every client gets.', 'Δείγμα μηνιαίας αναφοράς, όπως αυτή που παίρνει κάθε πελάτης.')}
        />

        <WaveSection id="services" shot="services">
          <WaveHeading eyebrow={servicesBlock.eyebrow} title={accentEnd(servicesBlock.title, 4)} lead={servicesBlock.description} />
          <RiskBuckets
            tiers={[
              {
                id: 'directory',
                label: '',
                items: serviceCards.map((card) => ({
                  key: card.href,
                  title: card.title,
                  body: card.body,
                  href: lp(card.href),
                })),
              },
            ]}
          />
        </WaveSection>

        <WaveSection shot="risks" tinted>
          <WaveHeading eyebrow={tx('Deliverables', 'Παραδοτέα')} title={accentEnd(t.includes.title, isEl ? 2 : 2)} lead={t.includes.intro} />
          <RiskBuckets tiers={riskTiers} />
          <div className="mt-10 max-w-3xl">
            <AppPanel
              url="app.anotherseoguru.com/opportunities"
              badge={tx('Sample data', 'Δείγμα δεδομένων')}
              caption={tx('Sample opportunities on a fictional site.', 'Δείγμα ευκαιριών σε φανταστικό ιστότοπο.')}
            >
              <OpportunitiesPreview locale={siteLocale} />
            </AppPanel>
          </div>
        </WaveSection>

        <WaveSteps
          id="process"
          eyebrow={tx('Process', 'Διαδικασία')}
          title={accentEnd(t.process.title, 1)}
          lead={t.process.intro}
          steps={numbered(t.process.steps)}
        />

        <WaveChoice locale={siteLocale} source="seo-services-choice" />

        <WaveSection shot="tourism">
          <WaveHeading eyebrow={t.tourism.eyebrow} title={accentEnd(t.tourism.title, 2)} lead={t.tourism.intro} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {t.tourism.chips.map((chip) => (
              <li key={chip.slug} className="min-w-0">
                <Link
                  href={workHref(chip.slug, lp)}
                  className="group flex h-full flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="flex items-start justify-between gap-3 text-[16px] font-semibold text-foreground">
                    <span className="min-w-0">{chip.label}</span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  </span>
                  <span className="mt-2 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{chip.line}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[14px]">
            <Link href={lp('/work')} className="font-medium text-link underline-offset-4 hover:underline">
              {PROJECTS_DELIVERED_LABEL} {t.tourism.portfolioLabel}
            </Link>
          </p>
        </WaveSection>

        <WaveSection id="pricing" shot="pricing" tinted>
          <WaveHeading align="center" eyebrow={tx('Pricing', 'Τιμές')} title={accentEnd(t.pricing.title, 2)} lead={t.pricing.intro} />
          <PriceTiers kind="seo" locale={siteLocale} className="mt-12" />
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-[14px] text-muted-foreground">
            {t.pricing.note.replace('6', String(SEO_MIN_TERM_MONTHS))}
          </p>
          <p className="mt-4 text-center text-[14px]">
            <Link href={lp('/pricing')} className="font-medium text-link underline-offset-4 hover:underline">
              {t.pricing.cta}
            </Link>
          </p>
        </WaveSection>

        <WaveSection shot="choosing">
          <WaveHeading eyebrow={tx('Choosing', 'Επιλογή')} title={accentEnd(t.choosing.title, 2)} lead={t.choosing.intro} />
          <RiskBuckets
            tiers={[
              {
                id: 'questions',
                label: '',
                items: t.choosing.items.map((item) => ({ key: item.title, title: item.title, body: item.body })),
              },
            ]}
          />
          <div className="mt-10 rounded-[22px] border border-dashed border-hairline p-6 sm:p-7">
            <h3 className="font-code text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">{t.notForYou.title}</h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {t.notForYou.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-pretty text-[15px] leading-6 text-muted-foreground">
                  <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/8 [&_svg]:size-3">
                    <X strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </WaveSection>

        {t.topics ? (
          <div data-shot="topics">
            <TopicSections topics={t.topics} locale={siteLocale} tinted id="topics" />
          </div>
        ) : null}

        {t.cities && seoCities.length > 0 ? (
          <WaveSection id="locations" shot="locations">
            <WaveHeading
              eyebrow="Περιοχές"
              title={accentEnd(t.cities.title, 2)}
              lead={renderInlineLinks(t.cities.intro, siteLocale)}
            />
            <ChipLinks
              className="mt-10"
              items={seoCities.map((l) => ({
                href: lp(`/services/seo-audits/${l.slug}`),
                label: `SEO ${getGreekLocative(l.slug, l.cityLocal ?? l.city)}`,
              }))}
            />
          </WaveSection>
        ) : null}

        <div data-shot="diy">
          <DiyRow locale={siteLocale} source="seo-services" />
        </div>

        {proof.length > 0 ? (
          <WaveSection shot="proof">
            <WaveHeading eyebrow={tx('Work', 'Έργα')} title={accentEnd(t.proof.title, 2)} lead={t.proof.intro} />
            <ProofGrid className="mt-12" projects={proof} locale={siteLocale} />
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-[14px] text-muted-foreground">{t.proof.caveat}</p>
          </WaveSection>
        ) : null}

        <WaveStats locale={siteLocale} />

        <ManagedFaq locale={siteLocale} title={accentEnd(t.faqTitle, 1)} faqs={faqs} askLabel={t.cta.whatsapp} />

        <WaveSection shot="related">
          <RelatedPages title={t.relatedTitle} pages={related.map((r) => ({ slug: lp(r.path), title: r.title }))} />
        </WaveSection>

        <WaveClose locale={siteLocale} source="seo-services" title={accentEnd(t.cta.title, 3)} lead={t.cta.body} />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
