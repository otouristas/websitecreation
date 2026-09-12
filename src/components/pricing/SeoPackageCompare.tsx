import Link from 'next/link';
import {
  currentPrice,
  formatPrice,
  seoPackages,
  withVat,
} from '@/data/pricing';
import type { PricingCompareRow } from '@/data/pricing-page-copy';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { Section, SectionHeading } from '@/components/landing/primitives';

/**
 * Foundations vs Growth vs Authority by scope.
 *
 * Prices come from the same `seoPackages` ladder as the cards below, so this
 * table cannot advertise a figure the pricing page does not charge.
 */
export function SeoPackageCompare({
  locale,
  title,
  eyebrow,
  intro,
  rows,
  footnote,
}: {
  locale: SiteLocale;
  title: string;
  eyebrow: string;
  intro: string;
  rows: readonly PricingCompareRow[];
  footnote: string;
}) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const per = isEl ? '/μήνα' : '/mo';
  const [foundations, growth, authority] = seoPackages;

  const headers = [
    { tier: foundations, name: 'Foundations' },
    { tier: growth, name: 'Growth' },
    { tier: authority, name: 'Authority' },
  ] as const;

  return (
    <Section id="compare">
      <SectionHeading align="left" eyebrow={eyebrow} title={title} body={intro} className="mb-10" />

      <div className="overflow-x-auto overscroll-x-contain pb-2 -mx-1 px-1">
        <p className="mb-2 text-xs text-muted-foreground sm:hidden">
          {isEl ? 'Σύρετε οριζόντια για να δείτε τον πίνακα.' : 'Swipe horizontally to view the table.'}
        </p>
        <table className="w-full min-w-[40rem] border-collapse overflow-hidden rounded-[10px] border border-hairline text-sm">
          <caption className="sr-only">
            {isEl
              ? 'Σύγκριση πακέτων SEO Foundations, Growth και Authority'
              : 'Comparison of SEO Foundations, Growth and Authority packages'}
          </caption>
          <thead>
            <tr className="border-b border-hairline bg-surface-raised/60">
              <th scope="col" className="px-4 py-4 text-left font-display text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {isEl ? 'Κάλυψη' : 'Scope'}
              </th>
              {headers.map(({ tier, name }) => {
                const net = currentPrice(tier);
                return (
                  <th key={tier.id} scope="col" className="px-4 py-4 text-left">
                    <span className="block font-display text-base font-medium text-foreground">{name}</span>
                    <span className="mt-1 block font-display text-lg tabular-nums tracking-[-0.03em] text-foreground">
                      €{formatPrice(net, locale)}
                      <span className="text-sm font-normal text-muted-foreground">{per}</span>
                    </span>
                    <span className="mt-0.5 block text-[12px] font-normal text-muted-foreground">
                      €{formatPrice(withVat(net), locale)}
                      {per} {isEl ? 'με ΦΠΑ' : 'incl. VAT'}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-hairline bg-surface last:border-b-0">
                <th scope="row" className="px-4 py-3.5 text-left align-top font-medium text-foreground">
                  {row.label}
                </th>
                <td className="px-4 py-3.5 align-top leading-relaxed text-muted-foreground">{row.foundations}</td>
                <td className="px-4 py-3.5 align-top leading-relaxed text-muted-foreground">{row.growth}</td>
                <td className="px-4 py-3.5 align-top leading-relaxed text-muted-foreground">{row.authority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">{footnote}</p>
      <p className="mt-3 text-sm">
        <Link href={lp('/seo-services')} className="font-medium text-primary hover:underline">
          {isEl ? 'Δείτε τι περιλαμβάνει μια υπηρεσία SEO' : 'See what an SEO service includes'}
        </Link>
        <span className="text-muted-foreground"> · </span>
        <Link href={lp('/get-started')} className="font-medium text-primary hover:underline">
          {isEl ? 'Ζητήστε προσφορά' : 'Request a quote'}
        </Link>
      </p>
    </Section>
  );
}
