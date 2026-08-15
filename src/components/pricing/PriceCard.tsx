import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  currentPrice,
  formatPrice,
  isOfferActive,
  withVat,
  type Tier,
} from '@/data/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { Tick } from '@/components/landing/primitives';

/**
 * A single pricing tier.
 *
 * Every card shows the net figure with an explicit "+ ΦΠΑ 24%" and the gross
 * figure directly beneath, on every surface - VAT is never buried in an FAQ.
 *
 * The struck-through regular price only renders while the offer is live. After
 * OFFER_ENDS the component falls back to the regular price with no promotional
 * framing at all, so nothing has to be edited by hand on 1 September.
 */
export function PriceCard({
  tier,
  locale,
  recurring = false,
}: {
  tier: Tier;
  locale: SiteLocale;
  recurring?: boolean;
}) {
  const isEl = locale === 'el';
  const active = isOfferActive();
  const net = currentPrice(tier);
  const gross = withVat(net);
  const per = recurring ? (isEl ? '/μήνα' : '/mo') : '';

  return (
    <div
      className={`relative flex flex-col rounded-[10px] border bg-surface p-7 ${
        tier.popular
          ? 'z-[1] border-primary/55 shadow-[0_0_40px_-12px_color-mix(in_oklab,var(--primary)_45%,transparent)] lg:scale-[1.03]'
          : 'border-hairline'
      }`}
    >
      {tier.popular ? (
        <span className="absolute right-5 top-5 rounded-full border border-brand/45 bg-brand/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-brand">
          {isEl ? 'Πιο δημοφιλές' : 'Most popular'}
        </span>
      ) : null}

      <h3 className="font-display text-lg font-medium text-foreground">{tier.name}</h3>
      <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-muted-foreground">
        {isEl ? tier.forEl : tier.forEn}
      </p>

      <div className="mt-6">
        {active ? (
          <p className="mb-1 text-sm text-muted-foreground">
            <span className="line-through">€{formatPrice(tier.regular, locale)}</span>{' '}
            <span className="text-[11px] uppercase tracking-[0.12em] text-brand">Summer Offer</span>
          </p>
        ) : null}

        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-display text-4xl font-medium tabular-nums tracking-[-0.04em] text-foreground">
            €{formatPrice(net, locale)}
          </span>
          {per ? <span className="text-sm text-muted-foreground">{per}</span> : null}
          <span className="text-sm text-muted-foreground">{isEl ? '+ ΦΠΑ 24%' : '+ 24% VAT'}</span>
        </p>

        <p className="mt-1.5 text-[13px] text-muted-foreground">
          €{formatPrice(gross, locale)}
          {per} {isEl ? 'τελική τιμή με ΦΠΑ' : 'incl. VAT'}
        </p>
      </div>

      {tier.deliveryEn ? (
        <p className="mt-5 rounded-[8px] border border-hairline bg-surface-raised/60 px-3.5 py-2.5 text-[13px] text-muted-foreground">
          {isEl ? 'Ενδεικτικός χρόνος παράδοσης: ' : 'Indicative delivery: '}
          <span className="font-medium text-foreground">
            {isEl ? tier.deliveryEl : tier.deliveryEn}
          </span>
        </p>
      ) : null}

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {(isEl ? tier.includesEl : tier.includesEn).map((item) => (
          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <Tick />
            {item}
          </li>
        ))}
      </ul>

      <Link
        href={localizedPath(locale, '/get-started')}
        className={`mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] font-display text-sm font-medium transition-opacity hover:opacity-90 ${
          tier.popular
            ? 'bg-primary text-primary-foreground'
            : 'border border-hairline bg-surface-raised/60 text-foreground hover:border-brand/40'
        }`}
      >
        {isEl ? 'Ζητήστε Προσφορά' : 'Request a Quote'}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
