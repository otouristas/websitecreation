/**
 * Integer money for the website commercial catalog.
 *
 * Every figure that can be charged is an integer number of euro cents.
 * Percentages are basis points (3000 = 30%). Rounding uses half-away-from-zero
 * via `Math.round` on the exact integer product `cents * bps / 10000`, which
 * is the rule `discounted_base = base - round(base * 3000 / 10000)`.
 */

export const PRICING_VERSION = '2026-10-17';

/** Greek standard VAT, 24.00%. */
export const GR_VAT_BPS = 2400;

/** Website Launch Offer: 30.00% off the build base only. */
export const BUILD_DISCOUNT_BPS = 3000;

export type VatTreatment = 'gr_standard' | 'eu_b2b_reverse_charge' | 'non_eu';

export function vatBpsFor(treatment: VatTreatment): number {
  switch (treatment) {
    case 'gr_standard':
      return GR_VAT_BPS;
    case 'eu_b2b_reverse_charge':
    case 'non_eu':
      return 0;
    default: {
      const unknown: never = treatment;
      return unknown;
    }
  }
}

/** `round(baseCents * bps / 10000)` with integer inputs. */
export function bpsOfCents(baseCents: number, bps: number): number {
  if (!Number.isInteger(baseCents) || !Number.isInteger(bps)) {
    throw new Error('money: cents and basis points must be integers');
  }
  if (baseCents < 0 || bps < 0) throw new Error('money: negative amounts are not valid inputs');
  return Math.round((baseCents * bps) / 10000);
}

/** `base - round(base * discountBps / 10000)`. */
export function discountedBaseCents(baseCents: number, discountBps: number = BUILD_DISCOUNT_BPS): number {
  return baseCents - bpsOfCents(baseCents, discountBps);
}

export function vatCents(netCents: number, treatment: VatTreatment): number {
  return bpsOfCents(netCents, vatBpsFor(treatment));
}

export function grossCents(netCents: number, treatment: VatTreatment): number {
  return netCents + vatCents(netCents, treatment);
}

export function eurosToCents(euros: number): number {
  if (!Number.isFinite(euros)) throw new Error('money: euros must be finite');
  return Math.round(euros * 100);
}

export function centsToEuros(cents: number): number {
  if (!Number.isInteger(cents)) throw new Error('money: expected integer cents');
  return cents / 100;
}

/**
 * 50% / 30% / 20% of a net amount.
 * The first two shares are floored. The last invoice receives the remainder,
 * so the three invoices always sum to the net total.
 */
export function installmentSplitCents(netCents: number): readonly [number, number, number] {
  if (!Number.isInteger(netCents) || netCents < 0) {
    throw new Error('money: installment base must be a non-negative integer number of cents');
  }
  const deposit = Math.floor((netCents * 5000) / 10000);
  const middle = Math.floor((netCents * 3000) / 10000);
  const last = netCents - deposit - middle;
  return [deposit, middle, last];
}
