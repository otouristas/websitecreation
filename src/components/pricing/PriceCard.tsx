import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  currentPrice,
  currentDisplayPrice,
  currentGrossPrice,
  currentPriceIncludesVat,
  formatPrice,
  tierOnOffer,
  withVat,
  type Tier,
} from '@/data/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { CheckList, MarketingBadge, kitPrimaryBtn, kitSecondaryBtn } from '@/components/kit';

/**
 * A single pricing tier.
 *
 * Every card labels its VAT basis explicitly. November entry offers lead
 * with the payable gross amount; the regular reference shows net plus VAT
 * and its gross equivalent, directly on the card.
 *
 * The struck-through regular price only renders while the offer is live. After
 * OFFER_ENDS the component falls back to the regular price with no promotional
 * framing at all, so nothing has to be edited by hand after the November deadline.
 *
 * The popular tier sits in a gradient ring: a 1px padded wrapper carrying the
 * brand gradient, with the kit card inside it.
 *
 * `frame="quiet"` matches the software plan cards: the same accent border, and
 * the same floating label ("Most popular" / "Δημοφιλές") sitting on that border.
 */
export function PriceCard({
  tier,
  locale,
  recurring = false,
  frame = 'glow',
  offerLabel,
}: {
  tier: Tier;
  locale: SiteLocale;
  recurring?: boolean;
  frame?: 'glow' | 'quiet';
  offerLabel?: string;
}) {
  const isEl = locale === 'el';
  const active = tierOnOffer(tier);
  const net = currentPrice(tier);
  const gross = currentGrossPrice(tier);
  const vatIncluded = currentPriceIncludesVat(tier);
  const displayed = currentDisplayPrice(tier);
  const per = recurring ? (isEl ? '/μήνα' : '/mo') : '';
  const quiet = frame === 'quiet' && Boolean(tier.popular);

  const card = (
    <div
      className={`relative flex h-full flex-col p-6 sm:p-7 ${
        quiet
          ? 'rounded-2xl border border-primary bg-accent ring-1 ring-primary/20'
          : `rounded-[calc(1rem-1px)] ${
              tier.popular
                ? 'bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_10%,var(--background)),var(--background))]'
                : 'bg-surface/60'
            }`
      }`}
    >
      {quiet ? (
        <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-semibold text-accent-foreground">
          {isEl ? 'Δημοφιλές' : 'Most popular'}
        </span>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h3 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">{tier.name}</h3>
        {tier.popular && !quiet ? (
          <MarketingBadge kind="popular">{isEl ? 'Πιο δημοφιλές' : 'Most popular'}</MarketingBadge>
        ) : null}
      </div>
      <p className="mt-2 min-h-[3.5rem] text-[14px] leading-relaxed text-muted-foreground">
        {isEl ? tier.forEl : tier.forEn}
      </p>

      <div className="mt-6">
        {active ? (
          <div className="mb-2 text-sm text-muted-foreground">
            <p className="flex flex-wrap items-center gap-2">
              <span>{isEl ? 'Πριν' : 'Was'} <del>€{formatPrice(tier.regular, locale)}{per}</del> {isEl ? '+ ΦΠΑ 24%' : '+ 24% VAT'}</span>
              <MarketingBadge kind="save">{offerLabel ?? (isEl ? 'Προσφορά Νοεμβρίου' : 'November offer')}</MarketingBadge>
            </p>
            <p className="mt-1 text-[11px]">€{formatPrice(withVat(tier.regular), locale)}{per} {isEl ? 'με ΦΠΑ 24%' : 'incl. 24% VAT'}</p>
          </div>
        ) : null}

        <p className="flex flex-wrap items-baseline gap-x-1.5">
          {active ? <span className="w-full text-[11px] font-semibold text-muted-foreground">{isEl ? 'Τώρα' : 'Now'}</span> : null}
          <span className="font-display text-[44px] font-semibold tabular-nums leading-none tracking-[-0.045em] text-foreground">
            €{formatPrice(displayed, locale)}
          </span>
          {per ? <span className="text-sm text-muted-foreground">{per}</span> : null}
          <span className="text-sm text-muted-foreground">{vatIncluded ? (isEl ? 'τελική με ΦΠΑ 24%' : 'incl. 24% VAT') : (isEl ? '+ ΦΠΑ 24%' : '+ 24% VAT')}</span>
        </p>

        <p className="mt-2 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
          {vatIncluded ? `${isEl ? 'Καθαρή αξία' : 'Net'} €${formatPrice(net, locale)}${per}. ${isEl ? 'Δώρο ο ΦΠΑ στο Black Month.' : 'VAT covered for Black Month.'}` : `€${formatPrice(gross, locale)}${per} ${isEl ? 'τελική τιμή με ΦΠΑ' : 'incl. VAT'}`}
        </p>
      </div>

      {vatIncluded && recurring ? <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">{isEl ? 'Η τελική τιμή με ΦΠΑ ισχύει σε όλη την εξάμηνη συνεργασία για όσους κλείσουν μέσα στον Νοέμβριο.' : 'This VAT-inclusive monthly price applies throughout the six-month engagement confirmed in November.'}</p> : null}

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
        {isEl ? 'Ζητήστε προσφορά' : 'Request a Quote'}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );

  if (quiet) return card;

  if (tier.popular) {
    return (
      <div className="relative z-[1] h-full rounded-2xl bg-[linear-gradient(160deg,var(--primary-glow),var(--brand)_50%,var(--primary))] p-px shadow-[0_0_60px_-16px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
        {card}
      </div>
    );
  }

  return <div className="h-full rounded-2xl border border-hairline">{card}</div>;
}
