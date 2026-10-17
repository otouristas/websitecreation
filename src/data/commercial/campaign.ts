/**
 * Website Launch Offer.
 *
 * The record stays `draft` until the owner confirms real start and end
 * instants, a capacity count, the moment capacity was verified, and a terms
 * version that has had legal review. Nothing here invents those facts.
 *
 * Draft still *presents* the proposed from-prices on marketing surfaces
 * (`SHOW_PROPOSED_OFFER_WHILE_DRAFT`) so the copy can be reviewed. It does
 * not reserve a slot, publish a remaining-places count, or emit schema dates.
 */

import { BUILD_DISCOUNT_BPS, PRICING_VERSION } from './money';

export const CAMPAIGN_TIMEZONE = 'Europe/Athens' as const;

export const CAMPAIGN_STATUSES = ['draft', 'active', 'expired', 'sold_out'] as const;
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];

export interface LaunchCampaign {
  readonly campaign_id: 'website-launch-offer';
  readonly status: CampaignStatus;
  /** ISO-8601 with offset, or null while the owner has not set the window. */
  readonly starts_at: string | null;
  readonly ends_at: string | null;
  readonly timezone: typeof CAMPAIGN_TIMEZONE;
  /** The commercial window is 30 days. Not a per-visit countdown. */
  readonly window_days: 30;
  /** Proposed cap. Not live until `capacity_verified_at` is set and `capacity_total` is a number. */
  readonly capacity_proposed: 5;
  readonly capacity_total: number | null;
  readonly capacity_verified_at: string | null;
  /** Slots already held by an accepted quote plus a confirmed deposit. */
  readonly reserved: number;
  readonly eligible_package_ids: readonly ['starter', 'professional', 'business'];
  readonly discount_bps: typeof BUILD_DISCOUNT_BPS;
  readonly terms_version: string;
  readonly reference_price_evidence: string;
  readonly pricing_version: typeof PRICING_VERSION;
}

/**
 * Proposed prices and the owner's copy render while the campaign is draft.
 * Set this to false to keep list prices on screen until status becomes active.
 */
export const SHOW_PROPOSED_OFFER_WHILE_DRAFT = true;

export const WEBSITE_LAUNCH_CAMPAIGN: LaunchCampaign = {
  campaign_id: 'website-launch-offer',
  status: 'draft',
  starts_at: null,
  ends_at: null,
  timezone: CAMPAIGN_TIMEZONE,
  window_days: 30,
  capacity_proposed: 5,
  capacity_total: null,
  capacity_verified_at: null,
  reserved: 0,
  eligible_package_ids: ['starter', 'professional', 'business'],
  discount_bps: BUILD_DISCOUNT_BPS,
  terms_version: 'draft-2026-10-17',
  reference_price_evidence:
    'List prices €1,500 / €2,500 / €4,000 net in src/data/pricing.ts (websitePackages.regular), audited 2026-10-17. See docs/commercial/current-state-audit.md.',
  pricing_version: PRICING_VERSION,
};

export type LaunchState = 'draft' | 'active' | 'expired' | 'sold_out' | 'unknown_capacity';

export type Scarcity =
  | { readonly kind: 'unverified' }
  | { readonly kind: 'verified'; readonly remaining: number; readonly total: number }
  | { readonly kind: 'ended' };

export interface LaunchOfferView {
  readonly state: LaunchState;
  /** When true, the build *base* is shown at the 30% from-price. Extras never use this flag. */
  readonly discountApplies: boolean;
  readonly scarcity: Scarcity;
  /** A slot can be reserved only from verified live capacity. Deposit confirmation is a separate check. */
  readonly canReserve: boolean;
  readonly campaign: LaunchCampaign;
}

function inWindow(campaign: LaunchCampaign, now: Date): boolean {
  if (!campaign.starts_at || !campaign.ends_at) return false;
  const start = Date.parse(campaign.starts_at);
  const end = Date.parse(campaign.ends_at);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return false;
  const t = now.getTime();
  return t >= start && t <= end;
}

function remainingOf(campaign: LaunchCampaign): number | null {
  if (campaign.capacity_total === null || campaign.capacity_verified_at === null) return null;
  return campaign.capacity_total - campaign.reserved;
}

/**
 * Resolve what the public site, the estimator and schema are allowed to say.
 * `now` is an argument so tests can pin the clock. There is no per-visit timer.
 */
export function launchOfferView(campaign?: LaunchCampaign, now: Date = new Date()): LaunchOfferView {
  const record = campaign ?? WEBSITE_LAUNCH_CAMPAIGN;
  if (record.status === 'draft') {
    return {
      state: 'draft',
      discountApplies: SHOW_PROPOSED_OFFER_WHILE_DRAFT,
      scarcity: { kind: 'unverified' },
      canReserve: false,
      campaign: record,
    };
  }

  if (record.status === 'sold_out') {
    return { state: 'sold_out', discountApplies: false, scarcity: { kind: 'ended' }, canReserve: false, campaign: record };
  }

  if (record.status === 'expired' || (record.status === 'active' && !inWindow(record, now))) {
    return { state: 'expired', discountApplies: false, scarcity: { kind: 'ended' }, canReserve: false, campaign: record };
  }

  const remaining = remainingOf(record);
  if (remaining === null) {
    return {
      state: 'unknown_capacity',
      discountApplies: true,
      scarcity: { kind: 'unverified' },
      canReserve: false,
      campaign: record,
    };
  }

  if (remaining <= 0) {
    return { state: 'sold_out', discountApplies: false, scarcity: { kind: 'ended' }, canReserve: false, campaign: record };
  }

  return {
    state: 'active',
    discountApplies: true,
    scarcity: { kind: 'verified', remaining, total: record.capacity_total as number },
    canReserve: true,
    campaign: record,
  };
}

export function packageEligible(campaign: LaunchCampaign, packageId: string): boolean {
  return (campaign.eligible_package_ids as readonly string[]).includes(packageId);
}
