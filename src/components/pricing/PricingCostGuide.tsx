import Link from 'next/link';
import type { PricingPageCopy } from '@/data/pricing-page-copy';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { Section, SectionHeading } from '@/components/landing/primitives';

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

  return (
    <Section id="seo-cost">
      <SectionHeading
        align="left"
        eyebrow={cost.eyebrow}
        title={cost.title}
        body={cost.answer}
        className="mb-6"
      />
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{cost.websiteBand}</p>
      <p className="mt-4 text-sm">
        <Link href={lp('/seo-services')} className="font-medium text-primary hover:underline">
          {proof.services}
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href={lp('/get-started')} className="font-medium text-primary hover:underline">
          {locale === 'el' ? 'Ζητήστε προσφορά' : 'Request a quote'}
        </Link>
      </p>

      <h3 className="mt-14 font-display text-2xl font-medium tracking-[-0.03em] text-foreground">
        {cost.determinantsTitle}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{cost.determinantsIntro}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cost.determinants.map((item) => (
          <div key={item.title} className="rounded-[10px] border border-hairline bg-surface p-6">
            <h4 className="font-display text-base font-medium text-foreground">{item.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[10px] border border-hairline bg-surface p-6 md:p-7">
        <h3 className="font-display text-lg font-medium text-foreground">{proof.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{proof.body}</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <Link href={lp('/solutions/hotels')} className="font-medium text-primary hover:underline">
              {proof.hotels}
            </Link>
          </li>
          <li>
            <Link href={lp('/solutions/rent-a-car')} className="font-medium text-primary hover:underline">
              {proof.rentals}
            </Link>
          </li>
          <li>
            <Link href={lp('/work/hotels-santorini')} className="font-medium text-primary hover:underline">
              Hotels Santorini
            </Link>
          </li>
          <li>
            <Link href={lp('/work/cyclades-rentacar')} className="font-medium text-primary hover:underline">
              Cyclades Rent a Car
            </Link>
          </li>
          <li>
            <Link href={lp('/work')} className="font-medium text-primary hover:underline">
              {proof.work}
            </Link>
          </li>
        </ul>
      </div>
    </Section>
  );
}
