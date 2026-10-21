import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import RelatedPages from '@/components/seo/RelatedPages';
import { AuditPreview, ContentPreview, KeywordsPreview, agencyTrust, kitSecondaryBtn } from '@/components/kit';
import { DiyRow } from '@/components/service-kit';
import { PriceCard } from '@/components/pricing/PriceCard';
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
import { ManagedFaq, RiskBuckets, ServiceHeroActions, accentEnd, type RiskItem, type RiskTier } from '@/components/pages/services-wave/ui';
import {
  fillSpokePrices,
  getSeoServiceCards,
  type SpokePageCopy,
  type SpokeSlug,
} from '@/data/seo-service-spokes';
import { SEO_MIN_TERM_MONTHS } from '@/data/company-facts';
import { VAT_RATE, addOns, formatPrice, seoPackages, withVat } from '@/data/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { generateBreadcrumbs } from '@/lib/linking';
import {
  BASE_URL,
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
} from '@/lib/seo/schema';

/**
 * Shared layout for /seo-services/technical, /on-page and /strategy.
 * Prices are the Foundations tier and the technical-audit add-on only.
 */
const ACCENT_WORDS: Record<SpokeSlug, Record<SiteLocale, number>> = {
  technical: { en: 4, el: 5 },
  'on-page': { en: 5, el: 4 },
  strategy: { en: 3, el: 3 },
};

function item(copy: SpokePageCopy, index: number): RiskItem {
  const source = copy.includes.items[index];
  return { key: source.title, title: source.title, body: source.body };
}

function riskTiers(copy: SpokePageCopy, locale: SiteLocale): readonly RiskTier[] {
  const isEl = locale === 'el';
  switch (copy.slug) {
    case 'technical':
      return [
        { id: 'fetch', label: isEl ? 'Αν δεν διαβάζεται' : 'If it is not fetched', items: [item(copy, 0), item(copy, 3)] },
        { id: 'signals', label: isEl ? 'Αν τα σήματα δεν ταιριάζουν' : 'If the signals are wrong', items: [item(copy, 1), item(copy, 2)] },
      ];
    case 'on-page':
      return [
        { id: 'which', label: isEl ? 'Ποια σελίδα' : 'Which page', items: [item(copy, 0)] },
        { id: 'itself', label: isEl ? 'Η ίδια η σελίδα' : 'The page itself', items: [item(copy, 1), item(copy, 2), item(copy, 3)] },
      ];
    case 'strategy':
      return [
        { id: 'url', label: isEl ? 'Ποιο URL' : 'Which URL', items: [item(copy, 0), item(copy, 1)] },
        { id: 'month', label: isEl ? 'Κάθε μήνας' : 'Each month', items: [item(copy, 2), item(copy, 3)] },
      ];
    default: {
      const unknown: never = copy.slug;
      return unknown;
    }
  }
}

export function SpokeView({ locale, copy }: { readonly locale: SiteLocale; readonly copy: SpokePageCopy }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const fill = (text: string) =>
    fillSpokePrices(text, locale).replace(/\{\{MONTHS\}\}/g, String(SEO_MIN_TERM_MONTHS));
  const tx = (en: string, el: string) => (isEl ? el : en);

  const breadcrumbItems = generateBreadcrumbs(
    [
      { name: isEl ? 'Υπηρεσίες SEO' : 'SEO services', url: '/seo-services' },
      { name: copy.eyebrow, url: `/seo-services/${copy.slug}` },
    ],
    locale,
  );

  const faqs = copy.faqs.map((faq) => ({ question: faq.question, answer: fill(faq.answer) }));
  const foundations = seoPackages.find((tier) => tier.id === 'foundations');
  const audit = addOns.find((entry) => entry.id === 'technical-audit');
  if (!foundations || !audit) {
    throw new Error('Published SEO price list is missing Foundations or the technical audit add-on.');
  }

  const others = getSeoServiceCards(locale).filter((card) => card.href !== `/seo-services/${copy.slug}`);
  const related = [
    { path: '/seo-services', title: isEl ? 'Υπηρεσίες SEO' : 'SEO services' },
    ...others.map((card) => ({ path: card.href, title: card.title })),
    { path: '/pricing', title: isEl ? 'Τιμές και πακέτα' : 'Pricing and packages' },
    ...(copy.guide.href === '/seo-services' ? [] : [{ path: copy.guide.href, title: copy.guide.label }]),
  ];

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateServiceSchema({
      name: copy.h1,
      description: copy.lead,
      provider: { name: 'AnotherSEOGuru', url: BASE_URL },
      serviceType: copy.serviceType,
      areaServed: ['GR'],
    }),
    generateFAQSchema({ faqs }),
  );

  const vatPct = Math.round(VAT_RATE * 100);
  const auditGross = withVat(audit.from);
  const preview =
    copy.slug === 'technical' ? (
      <AuditPreview locale={locale} />
    ) : copy.slug === 'on-page' ? (
      <ContentPreview locale={locale} />
    ) : (
      <KeywordsPreview locale={locale} />
    );
  const previewUrl =
    copy.slug === 'technical'
      ? 'app.anotherseoguru.com/audit'
      : copy.slug === 'on-page'
        ? 'app.anotherseoguru.com/content'
        : 'app.anotherseoguru.com/keywords';

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          titleClassName="text-[1.85rem] min-[400px]:text-[2.05rem] sm:text-[2.55rem] lg:text-[3rem]"
          pill={
            <div className="flex min-w-0 flex-col items-start gap-4">
              <Breadcrumbs items={breadcrumbItems} className="min-w-0 max-w-full" />
              <AnnouncePill href={lp('/seo-services')} tag={copy.eyebrow} text={isEl ? 'Μέρος των υπηρεσιών SEO' : 'Part of SEO services'} wrap />
            </div>
          }
          title={accentEnd(copy.h1, ACCENT_WORDS[copy.slug][locale])}
          lead={copy.lead}
          extra={copy.extra}
          actions={
            <ServiceHeroActions
              locale={locale}
              primaryHref={lp('/get-started')}
              primaryLabel={copy.cta.primary}
              links={[
                { href: lp('/pricing'), label: copy.cta.secondary },
                { href: lp(copy.guide.href), label: copy.guide.label },
              ]}
            />
          }
          trust={<TrustMarks items={agencyTrust(locale).map((entry) => entry.label)} yesLabel={homeCopy(locale).markYes} />}
          panel={
            <AppPanel
              url={previewUrl}
              badge={tx('Sample data', 'Δείγμα δεδομένων')}
              caption={tx('Sample data for a fictional site.', 'Δείγμα δεδομένων για φανταστικό ιστότοπο.')}
            >
              {preview}
            </AppPanel>
          }
        />

        <WaveSection id="scope" shot="risks">
          <WaveHeading eyebrow={copy.eyebrow} title={accentEnd(copy.includes.title, 2)} lead={copy.includes.intro} />
          <RiskBuckets tiers={riskTiers(copy, locale)} />
        </WaveSection>

        <WaveSteps
          id="process"
          eyebrow={tx('Process', 'Διαδικασία')}
          title={accentEnd(copy.process.title, 2)}
          lead={copy.process.intro}
          steps={copy.process.steps.map((step, index) => ({
            n: String(index + 1).padStart(2, '0'),
            title: step.title,
            body: step.body,
          }))}
        />

        <WaveChoice locale={locale} source={`seo-services-${copy.slug}-choice`} />

        <WaveSection id="pricing" shot="pricing" tinted>
          <WaveHeading eyebrow={tx('Pricing', 'Τιμές')} title={accentEnd(copy.pricing.title, 2)} lead={copy.pricing.intro} />
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
            <PriceCard tier={foundations} locale={locale} recurring />
            <div className="h-full min-w-0 rounded-2xl border border-hairline">
              <div className="flex h-full flex-col rounded-[calc(1rem-1px)] bg-surface/60 p-6 sm:p-7">
                <h3 className="text-balance font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">
                  {isEl ? audit.nameEl : audit.nameEn}
                </h3>
                <p className="mt-2 text-pretty text-[14px] leading-relaxed text-muted-foreground">
                  {isEl
                    ? 'Εφάπαξ πρόσθετο. Η τιμή του τιμοκαταλόγου είναι «από», γιατί το εύρος αλλάζει το τελικό ποσό.'
                    : 'One-off add-on. The list price is a from-price, because scope changes the final figure.'}
                </p>
                <div className="mt-6">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{isEl ? 'από' : 'from'}</p>
                  <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
                    <span className="font-display text-[44px] font-semibold tabular-nums leading-none tracking-[-0.045em] text-foreground">
                      €{formatPrice(audit.from, locale)}
                    </span>
                    <span className="text-sm text-muted-foreground">{isEl ? `+ ΦΠΑ ${vatPct}%` : `+ ${vatPct}% VAT`}</span>
                  </p>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
                    €{formatPrice(auditGross, locale)} {isEl ? 'τελική τιμή με ΦΠΑ' : 'incl. VAT'}
                  </p>
                </div>
                <Link href={lp('/pricing')} className={`mt-8 w-full ${kitSecondaryBtn}`}>
                  {copy.cta.secondary}
                </Link>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-[14px] leading-relaxed text-muted-foreground">{fill(copy.pricing.note)}</p>
          <p className="mt-4 text-center text-[14px]">
            <Link href={lp('/pricing')} className="font-medium text-link underline-offset-4 hover:underline">
              {isEl ? 'Όλος ο τιμοκατάλογος, με ΦΠΑ' : 'The full price list, with VAT'}
            </Link>
          </p>
        </WaveSection>

        <WaveSection shot="others">
          <WaveHeading title={accentEnd(copy.otherTitle, 2)} lead={copy.otherIntro} />
          <RiskBuckets
            tiers={[
              {
                id: 'siblings',
                label: '',
                items: others.map((card) => ({
                  key: card.href,
                  title: card.title,
                  body: card.body,
                  href: lp(card.href),
                })),
              },
            ]}
          />
        </WaveSection>

        <div data-shot="diy">
          <DiyRow locale={locale} source={`seo-services-${copy.slug}`} />
        </div>

        <WaveStats locale={locale} />

        <ManagedFaq locale={locale} title={accentEnd(copy.faqTitle, 1)} faqs={faqs} askLabel={tx('Talk on WhatsApp', 'Μιλήστε στο WhatsApp')} />

        <WaveSection shot="related">
          <RelatedPages title={copy.relatedTitle} pages={related.map((entry) => ({ slug: lp(entry.path), title: entry.title }))} />
        </WaveSection>

        <WaveClose locale={locale} source={`seo-services-${copy.slug}`} title={accentEnd(copy.cta.title, 4)} lead={copy.cta.body} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
