/**
 * Care catalog. Prices are net of VAT, in integer cents.
 * Defined once and re-exported from `src/data/pricing.ts`.
 */

export const EXTRA_WORK_CENTS_PER_HOUR = 8000;
export const EXTRA_WORK_MIN_MINUTES = 30;
export const EXTRA_WORK_STEP_MINUTES = 15;

export interface CarePlan {
  readonly id: 'technical-care' | 'care-plus' | 'partner';
  readonly monthlyNetCents: number;
  readonly includedMinutes: number;
  /** First-response target. Not a resolution time. */
  readonly firstResponse: { readonly businessDays?: number; readonly businessHours?: number };
  readonly priority: boolean;
}

export const CARE_PLANS: readonly CarePlan[] = [
  {
    id: 'technical-care',
    monthlyNetCents: 9900,
    includedMinutes: 60,
    firstResponse: { businessDays: 1 },
    priority: false,
  },
  {
    id: 'care-plus',
    monthlyNetCents: 25000,
    includedMinutes: 180,
    firstResponse: { businessDays: 1 },
    priority: false,
  },
  {
    id: 'partner',
    monthlyNetCents: 49000,
    includedMinutes: 360,
    firstResponse: { businessHours: 4 },
    priority: true,
  },
];

/** No care plan: first response within 2 business days. Not a resolution time. */
export const NO_PLAN_FIRST_RESPONSE_BUSINESS_DAYS = 2;

export const SUPPORT_WINDOW = {
  timezone: 'Europe/Athens',
  days: 'Mon-Fri',
  opens: '10:00',
  closes: '18:00',
} as const;

/**
 * Billable extra-work minutes.
 * The first block is 30 minutes (40€). Further time rounds up to 15 minutes.
 * Zero or negative input bills nothing.
 */
export function billableExtraMinutes(requestedMinutes: number): number {
  if (!Number.isFinite(requestedMinutes) || requestedMinutes <= 0) return 0;
  const stepped = Math.ceil(requestedMinutes / EXTRA_WORK_STEP_MINUTES) * EXTRA_WORK_STEP_MINUTES;
  return Math.max(EXTRA_WORK_MIN_MINUTES, stepped);
}

export function extraWorkCents(requestedMinutes: number): number {
  const minutes = billableExtraMinutes(requestedMinutes);
  return Math.round((minutes * EXTRA_WORK_CENTS_PER_HOUR) / 60);
}

export function carePlanById(id: string): CarePlan | undefined {
  return CARE_PLANS.find((plan) => plan.id === id);
}
