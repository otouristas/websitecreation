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
import { CheckList, MarketingBadge, kitPrimaryBtn, kitSecondaryBtn } from '@/components/kit';

/**
 * A single pricing tier.
 *
 * Every card shows the net figure with an explicit "+ ΦΠΑ 24%" and the gross
 * figure directly beneath, on every surface - VAT is never buried in an FAQ.
 *
 * The struck-through regular price only renders while the offer is live. After
 * OFFER_ENDS the component falls back to the regular price with no promotional
 * framing at all, so nothing has to be edited by hand on 1 September.
 *
 * The popular tier sits in a gradient ring: a 1px padded wrapper carrying the
 * brand gradient, with the kit card inside it.
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

  const card = (
    <div
      className={`relative flex h-full flex-col rounded-[calc(1rem-1px)] p-6 sm:p-7 ${
        tier.popular ? 'bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_10%,var(--background)),var(--background))]' : 'bg-surface/60'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">{tier.name}</h3>
        {tier.popular ? <MarketingBadge kind="popular">{isEl ? 'Πιο δημοφιλές' : 'Most popular'}</MarketingBadge> : null}
      </div>
      <p className="mt-2 min-h-[3.5rem] text-[14px] leading-relaxed text-muted-foreground">
        {isEl ? tier.forEl : tier.forEn}
      </p>

      <div className="mt-6">
        {active ? (
          <p className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="line-through">€{formatPrice(tier.regular, locale)}</span>
            <MarketingBadge kind="save">Summer Offer</MarketingBadge>
          </p>
        ) : null}

        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-display text-[44px] font-semibold tabular-nums leading-none tracking-[-0.045em] text-foreground">
            €{formatPrice(net, locale)}
          </span>
          {per ? <span className="text-sm text-muted-foreground">{per}</span> : null}
          <span className="text-sm text-muted-foreground">{isEl ? '+ ΦΠΑ 24%' : '+ 24% VAT'}</span>
        </p>

        <p className="mt-2 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
          €{formatPrice(gross, locale)}
          {per} {isEl ? 'τελική τιμή με ΦΠΑ' : 'incl. VAT'}
        </p>
      </div>

      {tier.deliveryEn ? (
        <p className="mt-5 rounded-xl border border-hairline bg-background/60 px-3.5 py-2.5 text-[13px] text-muted-foreground">
          {isEl ? 'Ενδεικτικός χρόνος παράδοσης: ' : 'Indicative delivery: '}
          <span className="font-medium text-foreground">
            {isEl ? tier.deliveryEl : tier.deliveryEn}
          </span>
        </p>
      ) : null}

      <CheckList size="sm" className="mt-6 flex-1 content-start" items={isEl ? tier.includesEl : tier.includesEn} />

      <Link
        href={localizedPath(locale, '/get-started')}
        className={`mt-8 w-full ${tier.popular ? kitPrimaryBtn : kitSecondaryBtn}`}
      >
        {isEl ? 'Ζητήστε Προσφορά' : 'Request a Quote'}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );

  if (tier.popular) {
    return (
      <div className="relative z-[1] h-full rounded-2xl bg-[linear-gradient(160deg,var(--primary-glow),var(--brand)_50%,var(--primary))] p-px shadow-[0_0_60px_-16px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
        {card}
      </div>
    );
  }

  return <div className="h-full rounded-2xl border border-hairline">{card}</div>;
}
