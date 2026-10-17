/**
 * SEO Launch — a human service included with Professional and Business
 * while the Website Launch Offer applies. It is not a software entitlement
 * and it does not renew into a paid retainer.
 */

export const SEO_LAUNCH_HOURS_PER_ACTIVE_MONTH = 2;

export interface SeoLaunchAllowance {
  readonly months: number;
  readonly totalHours: number;
  readonly autoRenew: false;
}

const NONE: SeoLaunchAllowance = { months: 0, totalHours: 0, autoRenew: false };

export const SEO_LAUNCH_BY_PACKAGE: Readonly<Record<string, SeoLaunchAllowance>> = {
  starter: NONE,
  professional: { months: 3, totalHours: 6, autoRenew: false },
  business: { months: 6, totalHours: 12, autoRenew: false },
};

export function seoLaunchFor(packageId: string): SeoLaunchAllowance {
  return SEO_LAUNCH_BY_PACKAGE[packageId] ?? NONE;
}

/** The only permitted way to describe the included programme. No euro "worth". */
export const SEO_LAUNCH_INCLUDED_EL = 'περιλαμβάνεται στην προσφορά, χωρίς επιπλέον χρέωση';
export const SEO_LAUNCH_INCLUDED_EN = 'included in the offer, at no extra charge';
