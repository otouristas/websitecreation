import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import RelatedPages from '@/components/seo/RelatedPages';
import { CtaBand, KitHeading, KitSection, kitSecondaryBtn } from '@/components/kit';
import { AccentTitle, CardGrid, DiyRow, FaqBlock, ProcessGrid, ServiceHero } from '@/components/service-kit';
import { PriceCard } from '@/components/pricing/PriceCard';
import {
  fillSpokePrices,
  getSeoServiceCards,
  type SpokePageCopy,
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
export function SpokeView({ locale, copy }: { readonly locale: SiteLocale; readonly copy: SpokePageCopy }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const fill = (text: string) =>
    fillSpokePrices(text, locale).replace(/\{\{MONTHS\}\}/g, String(SEO_MIN_TERM_MONTHS));

  const breadcrumbItems = generateBreadcrumbs(
    [
      { name: isEl ? 'Υπηρεσίες SEO' : 'SEO services', url: '/seo-services' },
      { name: copy.eyebrow, url: `/seo-services/${copy.slug}` },
    ],
    locale,
  );

  const faqs = copy.faqs.map((faq) => ({ question: faq.question, answer: fill(faq.answer) }));
  const foundations = seoPackages.find((tier) => tier.id === 'foundations');
  const audit = addOns.find((item) => item.id === 'technical-audit');
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

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <ServiceHero
          locale={locale}
          breadcrumbs={breadcrumbItems}
          h1={copy.h1}
          lead={copy.lead}
          extra={copy.extra}
          primaryHref={lp('/get-started')}
          primaryLabel={copy.cta.primary}
          links={[
            { href: lp('/pricing'), label: copy.cta.secondary },
            { href: lp(copy.guide.href), label: copy.guide.label },
          ]}
        />

        <KitSection className="mt-6 sm:mt-10">
          <KitHeading eyebrow={copy.eyebrow} title={<AccentTitle text={copy.includes.title} />} description={copy.includes.intro} />
          <CardGrid className="mt-12" cols={2} items={copy.includes.items} />
        </KitSection>

        <KitSection tinted id="process">
          <KitHeading
            eyebrow={isEl ? 'Διαδικασία' : 'Process'}
            title={<AccentTitle text={copy.process.title} />}
            description={copy.process.intro}
          />
          <ProcessGrid className="mt-12" steps={copy.process.steps} />
        </KitSection>

        <KitSection id="pricing">
          <KitHeading
            eyebrow={isEl ? 'Τιμές' : 'Pricing'}
            title={<AccentTitle text={copy.pricing.title} />}
            description={copy.pricing.intro}
          />
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
            <PriceCard tier={foundations} locale={locale} recurring />
            <div className="h-full rounded-2xl border border-hairline">
              <div className="flex h-full flex-col rounded-[calc(1rem-1px)] bg-surface/60 p-6 sm:p-7">
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">
                  {isEl ? audit.nameEl : audit.nameEn}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
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
          <p className="mx-auto mt-8 max-w-2xl text-center text-[14px] leading-relaxed text-muted-foreground">{fill(copy.pricing.note)}</p>
          <p className="mt-4 text-center text-[14px]">
            <Link href={lp('/pricing')} className="font-medium text-link underline-offset-4 hover:underline">
              {isEl ? 'Όλος ο τιμοκατάλογος, με ΦΠΑ' : 'The full price list, with VAT'}
            </Link>
          </p>
        </KitSection>

        <KitSection tinted>
          <KitHeading title={<AccentTitle text={copy.otherTitle} />} description={copy.otherIntro} />
          <CardGrid className="mt-12" items={others} locale={locale} />
        </KitSection>

        <DiyRow locale={locale} source={`seo-services-${copy.slug}`} />

        <FaqBlock locale={locale} title={<AccentTitle text={copy.faqTitle} />} faqs={faqs} />

        <KitSection className="py-14 sm:py-16">
          <RelatedPages title={copy.relatedTitle} pages={related.map((item) => ({ slug: lp(item.path), title: item.title }))} />
        </KitSection>

        <CtaBand locale={locale} source={`seo-services-${copy.slug}`} title={<AccentTitle text={copy.cta.title} />} description={copy.cta.body} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
