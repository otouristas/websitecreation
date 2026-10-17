import Link from 'next/link';
import { launchCopy } from '@/data/commercial/launch-copy';
import { launchOfferView, type LaunchOfferView } from '@/data/commercial/campaign';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { DismissOfferButton } from '@/components/commercial/DismissOfferButton';

/**
 * In-flow offer strip. It is not fixed, so it does not stack on the cookie
 * banner or the mobile quote pill. Dismissal is handled by a class the layout
 * script sets before paint (`launch-offer-dismissed`).
 */
export function LaunchOfferBanner({
  locale,
  view = launchOfferView(),
}: {
  readonly locale: SiteLocale;
  readonly view?: LaunchOfferView;
}) {
  const copy = launchCopy(locale);
  const packagesHref = localizedPath(locale, '/pricing#websites');
  const termsHref = localizedPath(locale, '/offer-terms');
  const ended = view.state === 'expired' || view.state === 'sold_out' || !view.discountApplies;

  return (
    <div
      data-launch-offer
      className="border-b border-hairline bg-surface/80 text-foreground"
      style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 text-[14px] leading-snug">
          {ended ? (
            <p>{copy.ended}</p>
          ) : (
            <>
              <p className="hidden sm:block">{copy.stripDesktop}</p>
              <p className="sm:hidden">{copy.stripMobile}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {view.scarcity.kind === 'verified'
                  ? `${copy.scarcityCount(view.scarcity.remaining, view.scarcity.total)} ${copy.scarcityConfirm}`
                  : copy.scarcityAsk}
              </p>
            </>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-4 text-[14px]">
          {!ended ? (
            <Link href={packagesHref} className="font-semibold text-foreground underline-offset-4 hover:underline">
              {copy.stripCta}
            </Link>
          ) : null}
          <Link href={termsHref} className="text-link underline-offset-4 hover:underline">
            {copy.stripTerms}
          </Link>
          <DismissOfferButton locale={locale} />
        </div>
      </div>
    </div>
  );
}
