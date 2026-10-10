import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import RelatedPages from '@/components/seo/RelatedPages';
import { ArrowUpRight, ListChecks, MapPin, Plane, X } from 'lucide-react';
import { CtaBand, FeatureRow, KitHeading, KitSection, OpportunitiesPreview, ReportPreview, Stage } from '@/components/kit';
import {
  AccentTitle,
  CardGrid,
  ChipLinks,
  DiyRow,
  FaqBlock,
  PriceTiers,
  ProcessGrid,
  ProofGrid,
  ServiceHero,
} from '@/components/service-kit';
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
import { getSeoServicesPillarCopy } from '@/data/seo-services-pillar';
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

  const related = [
    { path: '/services/local-seo', title: isEl ? 'Τοπικό SEO' : 'Local SEO' },
    { path: '/services/seo-audits', title: isEl ? 'SEO audit' : 'SEO audit' },
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

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        {/* Answer-first: the whole proposition in one paragraph, directly
            under the H1, so a snippet or an answer engine can lift it. */}
        <ServiceHero
          locale={siteLocale}
          breadcrumbs={breadcrumbItems}
          pill={{
            kind: 'free',
            tag: tx('Free', 'Δωρεάν'),
            text: tx('Every engagement starts with a free SEO audit', 'Κάθε συνεργασία ξεκινά με δωρεάν έλεγχο SEO'),
            href: `${lp('/get-started')}#free-audit`,
          }}
          h1={t.h1}
          lead={rp(t.answer)}
          extra={t.answerExtra}
          primaryHref={lp('/get-started')}
          primaryLabel={t.cta.primary}
          links={[{ href: lp('/pricing'), label: t.cta.secondary }]}
          visual={<ReportPreview locale={siteLocale} />}
          visualLabel={tx(
            'A monthly SEO report on a sample hotel: organic clicks, booking-page visits, top-3 keywords and the changes shipped.',
            'Μηνιαία αναφορά SEO σε δείγμα ξενοδοχείου: οργανικά κλικ, επισκέψεις κρατήσεων, λέξεις στο top 3 και οι αλλαγές που έγιναν.',
          )}
          caption={tx('A sample monthly report, the kind every client gets.', 'Δείγμα μηνιαίας αναφοράς, όπως αυτή που παίρνει κάθε πελάτης.')}
        />

        <KitSection className="mt-6 sm:mt-10">
          <FeatureRow
            eyebrow={isEl ? 'Παραδοτέα' : 'Deliverables'}
            eyebrowIcon={<ListChecks />}
            title={<AccentTitle text={t.includes.title} />}
            body={t.includes.intro}
            bullets={t.includes.items.slice(0, 3).map((item) => item.title)}
            preview={
              <Stage>
                <OpportunitiesPreview locale={siteLocale} />
              </Stage>
            }
          />
          <CardGrid className="mt-16" items={t.includes.items} locale={siteLocale} />
        </KitSection>

        <KitSection tinted id="process">
          <KitHeading eyebrow={isEl ? 'Διαδικασία' : 'Process'} title={<AccentTitle text={t.process.title} />} description={t.process.intro} />
          <ProcessGrid className="mt-12" steps={t.process.steps} />
        </KitSection>

        <KitSection>
          <KitHeading eyebrow={t.tourism.eyebrow} eyebrowIcon={<Plane />} title={<AccentTitle text={t.tourism.title} />} description={t.tourism.intro} />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {t.tourism.chips.map((chip) => (
              <Link
                key={chip.slug}
                href={workHref(chip.slug, lp)}
                className="reveal group flex flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-colors hover:border-brand/40 hover:bg-surface"
              >
                <span className="flex items-start justify-between gap-3 text-[16px] font-semibold text-foreground">
                  {chip.label}
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
                </span>
                <span className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{chip.line}</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-[14px]">
            <Link href={lp('/work')} className="font-medium text-link underline-offset-4 hover:underline">
              {PROJECTS_DELIVERED_LABEL} {t.tourism.portfolioLabel}
            </Link>
          </p>
        </KitSection>

        <KitSection tinted id="pricing">
          <KitHeading align="center" eyebrow={isEl ? 'Τιμές' : 'Pricing'} title={<AccentTitle text={t.pricing.title} />} description={t.pricing.intro} />
          <PriceTiers kind="seo" locale={siteLocale} className="mt-12" />
          <p className="mx-auto mt-8 max-w-2xl text-center text-[14px] text-muted-foreground">
            {t.pricing.note.replace('6', String(SEO_MIN_TERM_MONTHS))}
          </p>
          <p className="mt-4 text-center text-[14px]">
            <Link href={lp('/pricing')} className="font-medium text-link underline-offset-4 hover:underline">
              {t.pricing.cta}
            </Link>
          </p>
        </KitSection>

        <KitSection>
          <KitHeading eyebrow={isEl ? 'Επιλογή' : 'Choosing'} title={<AccentTitle text={t.choosing.title} />} description={t.choosing.intro} />
          <CardGrid className="mt-12" cols={2} items={t.choosing.items} />
          <div className="reveal mt-10 rounded-2xl border border-dashed border-hairline p-6 sm:p-7">
            <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">{t.notForYou.title}</h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {t.notForYou.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-6 text-muted-foreground">
                  <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/8 [&_svg]:size-3">
                    <X strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </KitSection>

        <TopicSections topics={t.topics} locale={siteLocale} tinted id="topics" />

        {t.cities && seoCities.length > 0 ? (
          <KitSection id="locations">
            <KitHeading
              eyebrow="Περιοχές"
              eyebrowIcon={<MapPin />}
              title={<AccentTitle text={t.cities.title} />}
              description={renderInlineLinks(t.cities.intro, siteLocale)}
            />
            <ChipLinks
              className="mt-10"
              items={seoCities.map((l) => ({
                href: lp(`/services/seo-audits/${l.slug}`),
                label: `SEO ${getGreekLocative(l.slug, l.cityLocal ?? l.city)}`,
              }))}
            />
          </KitSection>
        ) : null}

        <DiyRow locale={siteLocale} source="seo-services" />

        {proof.length > 0 ? (
          <KitSection>
            <KitHeading eyebrow={isEl ? 'Έργα' : 'Work'} title={<AccentTitle text={t.proof.title} />} description={t.proof.intro} />
            <ProofGrid className="mt-12" projects={proof} locale={siteLocale} />
            <p className="mx-auto mt-8 max-w-2xl text-center text-[14px] text-muted-foreground">{t.proof.caveat}</p>
          </KitSection>
        ) : null}

        <FaqBlock locale={siteLocale} tinted title={<AccentTitle text={t.faqTitle} />} faqs={faqs} />

        <KitSection className="py-14 sm:py-16">
          <RelatedPages title={t.relatedTitle} pages={related.map((r) => ({ slug: lp(r.path), title: r.title }))} />
        </KitSection>

        <CtaBand locale={siteLocale} source="seo-services" title={<AccentTitle text={t.cta.title} />} description={t.cta.body} />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
