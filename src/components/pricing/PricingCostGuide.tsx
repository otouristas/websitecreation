import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';
import type { PricingPageCopy } from '@/data/pricing-page-copy';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { KitHeading, KitSection, ReportPreview, Stage } from '@/components/kit';
import { ChipLinks, InfoCard } from '@/components/page-kit';

/**
 * Answer-first Greece cost block: the H2 that owns «πόσο κοστίζει το SEO».
 *
 * Visible links to /seo-services, /get-started and tourism work live here so
 * the FAQ answers can stay plain text (FAQPage schema) without losing crawl
 * paths off this URL.
 */
export function PricingCostGuide({
  locale,
  copy,
}: {
  locale: SiteLocale;
  copy: PricingPageCopy;
}) {
  const lp = (path: string) => localizedPath(locale, path);
  const { cost, proof } = copy;

  const links = [
    { href: lp('/solutions/hotels'), label: proof.hotels },
    { href: lp('/solutions/rent-a-car'), label: proof.rentals },
    { href: lp('/work/hotels-santorini'), label: 'Hotels Santorini' },
    { href: lp('/work/cyclades-rentacar'), label: 'Cyclades Rent a Car' },
    { href: lp('/work'), label: proof.work },
  ];

  return (
    <KitSection id="seo-cost">
      {/* The H2 that owns the cost query stays an H2 (FeatureRow titles are H3). */}
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="min-w-0">
          <KitHeading eyebrow={cost.eyebrow} eyebrowIcon={<Calculator />} title={cost.title} description={cost.answer} />
          <p className="mt-4 text-pretty text-[16px] leading-relaxed text-muted-foreground">{cost.websiteBand}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-medium">
            <Link href={lp('/seo-services')} className="inline-flex items-center gap-1.5 text-link underline-offset-4 hover:underline">
              {proof.services}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href={lp('/get-started')} className="text-foreground/80 hover:text-foreground">
              {locale === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
            </Link>
          </div>
        </div>
        <div className="reveal min-w-0">
          <Stage>
            <ReportPreview locale={locale} />
          </Stage>
        </div>
      </div>

      <div className="mt-24">
        <KitHeading as="h3" title={cost.determinantsTitle} description={cost.determinantsIntro} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {cost.determinants.map((item) => (
            <InfoCard key={item.title} as="h4" title={item.title} text={item.body} />
          ))}
        </div>
      </div>

      <div className="reveal mt-10 rounded-2xl border border-hairline bg-surface/60 p-6 sm:p-8">
        <h3 className="font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">{proof.title}</h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{proof.body}</p>
        <ChipLinks className="mt-5" items={links} />
      </div>
    </KitSection>
  );
}
