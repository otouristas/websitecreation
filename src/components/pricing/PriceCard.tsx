import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { launchCopy } from '@/data/commercial/launch-copy';
import { launchOfferView } from '@/data/commercial/campaign';
import { seoLaunchFor } from '@/data/commercial/seo-launch';
import {
  currentPrice,
  formatPrice,
  isWebsiteTier,
  withVat,
  type Tier,
} from '@/data/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { CheckList, MarketingBadge, kitPrimaryBtn, kitSecondaryBtn } from '@/components/kit';

/**
 * A single pricing tier.
 *
 * Website cards follow the launch-offer view: from-price, struck list price,
 * net, VAT and the terms link beside the price. SEO retainers never take the
 * build discount. There is no countdown.
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
  const copy = launchCopy(locale);
  const website = isWebsiteTier(tier) && !recurring;
  const view = launchOfferView();
  const discount = website && view.discountApplies;
  const net = currentPrice(tier);
  const gross = withVat(net);
  const per = recurring ? (isEl ? '/μήνα' : '/mo') : '';
  const cardCopy = website ? copy.cards[tier.id as 'starter' | 'professional' | 'business'] : undefined;
  const launch = discount ? seoLaunchFor(tier.id) : null;
  const quoteHref = localizedPath(locale, `/get-started?package=${tier.id}`);

  const card = (
    <div
      className={`relative flex h-full flex-col rounded-[calc(1rem-1px)] p-6 sm:p-7 ${
        tier.popular ? 'bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_10%,var(--background)),var(--background))]' : 'bg-surface/60'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h3 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">{tier.name}</h3>
        {tier.popular ? <MarketingBadge kind="popular">{isEl ? 'Πιο δημοφιλές' : 'Most popular'}</MarketingBadge> : null}
      </div>
      <p className="mt-2 min-h-[3.5rem] text-[14px] leading-relaxed text-muted-foreground">
        {discount && cardCopy ? cardCopy.detail : isEl ? tier.forEl : tier.forEn}
      </p>

      <div className="mt-6">
        {discount && cardCopy ? (
          <p className="mb-2 text-[15px] font-medium leading-snug text-foreground">{cardCopy.priceLine}</p>
        ) : null}
        {discount && cardCopy ? (
          <p className="mb-3 text-[13px] font-medium text-primary">{cardCopy.offerLine}</p>
        ) : (
          <p className="mb-1 text-[13px] text-muted-foreground">{isEl ? 'Από' : 'From'}</p>
        )}

        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="font-display text-[44px] font-semibold tabular-nums leading-none tracking-[-0.045em] text-foreground">
            €{formatPrice(net, locale)}
          </span>
          {per ? <span className="text-sm text-muted-foreground">{per}</span> : null}
          <span className="text-sm text-muted-foreground">{isEl ? '+ ΦΠΑ' : '+ VAT'}</span>
        </p>

        <p className="mt-2 font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
          €{formatPrice(net, locale)} {isEl ? 'καθαρή' : 'net'}
          {' · '}
          €{formatPrice(gross - net, locale)} {isEl ? 'ΦΠΑ' : 'VAT'}
          {' · '}
          €{formatPrice(gross, locale)}
          {per} {isEl ? 'σύνολο' : 'total'}
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
          {isEl
            ? 'Για πελάτες εκτός Ελλάδας ο ΦΠΑ επιβεβαιώνεται στην προσφορά (αντίστροφη χρέωση ή εκτός ΕΕ).'
            : 'For clients outside Greece, VAT is confirmed on the quote (reverse charge or outside the EU).'}
        </p>

        {launch && launch.months > 0 ? (
          <p className="mt-3 text-[13px] leading-relaxed text-foreground">
            {isEl
              ? `SEO Launch ${launch.months} μηνών, έως 2 ώρες τον ενεργό μήνα. Χωρίς αυτόματη ανανέωση.`
              : `SEO Launch for ${launch.months} months, up to 2 hours each active month. No automatic renewal.`}
          </p>
        ) : null}

        <p className="mt-3 text-[13px] leading-relaxed">
          <Link href={localizedPath(locale, '/offer-terms')} className="font-medium text-link underline-offset-4 hover:underline">
            {copy.stripTerms}
          </Link>
        </p>
      </div>

      {tier.deliveryEn ? (
        <p className="mt-5 rounded-xl border border-hairline bg-background/60 px-3.5 py-2.5 text-[13px] text-muted-foreground">
          {isEl ? 'Ενδεικτικός χρόνος παράδοσης: ' : 'Indicative delivery: '}
          <span className="font-medium text-foreground">{isEl ? tier.deliveryEl : tier.deliveryEn}</span>
        </p>
      ) : null}

      <CheckList size="sm" className="mt-6 flex-1 content-start" items={isEl ? tier.includesEl : tier.includesEn} />

      <Link href={quoteHref} className={`mt-8 w-full ${tier.popular ? kitPrimaryBtn : kitSecondaryBtn}`}>
        {cardCopy && discount ? cardCopy.cta : copy.chooseQuote}
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
