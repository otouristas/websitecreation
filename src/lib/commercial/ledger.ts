/**
 * Pure commercial ledger used by quotes, payments and time.
 * No network, no card data, no production writes.
 */

import { createHmac, timingSafeEqual } from 'node:crypto';
import { installmentSplitCents } from '@/data/commercial/money';

export interface AcceptedSnapshot {
  readonly pricingVersion: string;
  readonly campaignId: string | null;
  readonly campaignStatus: string;
  readonly packageId: string;
  readonly listBaseCents: number;
  readonly discountBps: number;
  readonly payableBaseCents: number;
  readonly extrasCents: number;
  readonly netCents: number;
  readonly vatTreatment: string;
  readonly vatCents: number;
  readonly grossCents: number;
  readonly seoLaunchMonths: number;
  readonly seoLaunchAutoRenew: false;
  readonly termsVersion: string;
  readonly acceptedAt: string;
}

/** Accepted deals keep the snapshotted price. Later catalog edits do not rewrite them. */
export function grandfatheredNetCents(snapshot: AcceptedSnapshot): number {
  return snapshot.netCents;
}

export interface PaymentEvent {
  readonly id: string;
  readonly quoteId: string;
  readonly amountCents: number;
  readonly kind: 'deposit' | 'instalment' | 'balance';
  readonly provider: 'test';
  readonly verified: boolean;
}

export interface PaymentLog {
  readonly appliedIds: readonly string[];
  readonly collectedCents: number;
}

/** Bank transfers and card events count once, and only when verified. */
export function applyPayment(log: PaymentLog, event: PaymentEvent): { readonly log: PaymentLog; readonly duplicate: boolean } {
  if (log.appliedIds.includes(event.id)) return { log, duplicate: true };
  if (!event.verified || event.provider !== 'test') return { log, duplicate: false };
  if (!Number.isInteger(event.amountCents) || event.amountCents <= 0) return { log, duplicate: false };
  return {
    duplicate: false,
    log: {
      appliedIds: [...log.appliedIds, event.id],
      collectedCents: log.collectedCents + event.amountCents,
    },
  };
}

export function owedCents(netCents: number, collectedCents: number): number {
  return Math.max(0, netCents - collectedCents);
}

export function quoteInstallments(netCents: number): readonly [number, number, number] {
  return installmentSplitCents(netCents);
}

/** Reject a client-supplied total that does not match the server figure. */
export function amountsMatch(claimedCents: number, serverCents: number): boolean {
  return Number.isInteger(claimedCents) && claimedCents === serverCents;
}

const PII_KEYS = ['email', 'phone', 'name', 'card', 'iban', 'password', 'address'];

export function payloadHasPii(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  return Object.keys(value as Record<string, unknown>).some((key) => PII_KEYS.includes(key.toLowerCase()));
}

export function signPayload(secret: string, payload: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function signaturesMatch(expectedHex: string, receivedHex: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(expectedHex) || !/^[a-f0-9]{64}$/i.test(receivedHex)) return false;
  const a = Buffer.from(expectedHex, 'hex');
  const b = Buffer.from(receivedHex, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

export interface RateBucket {
  readonly count: number;
  readonly resetAt: number;
}

export function consumeRate(bucket: RateBucket | undefined, now: number, limit: number, windowMs: number): { readonly limited: boolean; readonly bucket: RateBucket } {
  if (!bucket || bucket.resetAt <= now) {
    return { limited: false, bucket: { count: 1, resetAt: now + windowMs } };
  }
  const count = bucket.count + 1;
  return { limited: count > limit, bucket: { count, resetAt: bucket.resetAt } };
}

export type TimeCounter = 'seo_launch' | 'care' | 'non_billable';

export function counterFor(
  category: 'implementation_bug' | 'build_change' | 'seo_launch' | 'care' | 'extra_work' | 'new_feature' | 'admin' | 'our_bug',
): TimeCounter {
  switch (category) {
    case 'seo_launch':
      return 'seo_launch';
    case 'care':
    case 'extra_work':
    case 'new_feature':
      return 'care';
    case 'implementation_bug':
    case 'build_change':
    case 'admin':
    case 'our_bug':
      return 'non_billable';
    default: {
      const unknown: never = category;
      return unknown;
    }
  }
}

export function sameTenant(actorTenant: string, resourceTenant: string): boolean {
  return actorTenant.length > 0 && actorTenant === resourceTenant;
}

export interface NoticeLog {
  readonly keys: readonly string[];
}

/** Optional 30-day and 7-day notices. The same key is not sent twice. */
export function recordNotice(log: NoticeLog, key: string): { readonly log: NoticeLog; readonly send: boolean } {
  if (log.keys.includes(key)) return { log, send: false };
  return { send: true, log: { keys: [...log.keys, key] } };
}
