/**
 * Commercial catalog checks. Run: npx tsx scripts/commercial-selftest.mts
 */
import assert from 'node:assert/strict';
import { CARE_PLANS, extraWorkCents } from '../src/data/commercial/care';
import {
  SHOW_PROPOSED_OFFER_WHILE_DRAFT,
  WEBSITE_LAUNCH_CAMPAIGN,
  launchOfferView,
  type LaunchCampaign,
} from '../src/data/commercial/campaign';
import { launchCopy } from '../src/data/commercial/launch-copy';
import {
  BUILD_DISCOUNT_BPS,
  discountedBaseCents,
  grossCents,
  installmentSplitCents,
  vatCents,
} from '../src/data/commercial/money';
import { seoLaunchFor } from '../src/data/commercial/seo-launch';
import { currentPrice, isOfferActive, seoPackages, websitePackages, withVat } from '../src/data/pricing';
import { buildEstimate } from '../src/lib/estimate/model';
import { cancelReservation, tryReserveSlot, type CapacityBook } from '../src/lib/commercial/capacity';
import {
  amountsMatch,
  applyPayment,
  consumeRate,
  counterFor,
  grandfatheredNetCents,
  payloadHasPii,
  recordNotice,
  sameTenant,
  signPayload,
  signaturesMatch,
  type AcceptedSnapshot,
} from '../src/lib/commercial/ledger';
import { activeMonthNumber, addCalendarMonths, athensCivilDate, programEndDate, programPhase } from '../src/lib/commercial/seo-program';

let failed = 0;
function eq(name: string, actual: unknown, expected: unknown) {
  try {
    assert.deepEqual(actual, expected);
    console.log(`ok  ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${name}`, error);
  }
}

const [starter, professional, business] = websitePackages;
eq('starter base discount', discountedBaseCents(1500_00), 1050_00);
eq('professional base discount', discountedBaseCents(2500_00), 1750_00);
eq('business base discount', discountedBaseCents(4000_00), 2800_00);
eq('formula matches bps', discountedBaseCents(1500_00, BUILD_DISCOUNT_BPS), 1500_00 - Math.round((1500_00 * 3000) / 10000));
eq('greek gross', [grossCents(1050_00, 'gr_standard'), grossCents(1750_00, 'gr_standard'), grossCents(2800_00, 'gr_standard')], [1302_00, 2170_00, 3472_00]);
eq('reverse charge has no greek vat', vatCents(1050_00, 'eu_b2b_reverse_charge'), 0);
eq('non-eu has no greek vat', vatCents(2800_00, 'non_eu'), 0);
eq('withVat matches cents', withVat(1050), 1302);
eq('starter instalments', installmentSplitCents(1050_00), [525_00, 315_00, 210_00]);
eq('pro instalments', installmentSplitCents(1750_00), [875_00, 525_00, 350_00]);
eq('business instalments', installmentSplitCents(2800_00), [1400_00, 840_00, 560_00]);
eq('odd net remainder on last invoice', installmentSplitCents(100), [50, 30, 20]);

eq('displayed starter', currentPrice(starter), 1050);
eq('displayed pro', currentPrice(professional), 1750);
eq('displayed business', currentPrice(business), 2800);
eq('seo foundations stays list', currentPrice(seoPackages[0]), 500);
eq('seo growth stays list', currentPrice(seoPackages[1]), 900);
eq('seo authority stays list', currentPrice(seoPackages[2]), 1500);
eq('old summer window does not discount seo', currentPrice(seoPackages[1], new Date('2026-07-01T12:00:00+03:00')), 900);
eq('summer helper is historical only', isOfferActive(new Date('2026-10-17T12:00:00+03:00')), false);

const plain = buildEstimate({ track: 'website', pages: 5, languages: 1, features: [], auditDepth: 'none', maintenance: false });
eq('plain build nets to discounted base', plain.oneOffNet, 1050);
eq('discount is base only', plain.discountNet, 450);
eq('no extras', plain.extrasNet, 0);
eq('starter has no seo months', plain.includedSeoMonths, 0);
eq('band does not undercut base', plain.oneOffLowNet >= plain.bandFloorNet, true);
eq('band floor is the package base', plain.bandFloorNet, 1050);
eq('deposit', plain.depositNet, 525);

const withShop = buildEstimate({ track: 'website', pages: 5, languages: 1, features: ['ecommerce'], auditDepth: 'none' });
eq('ecommerce is not discounted', withShop.oneOffNet, 1050 + 1200);
eq('ecommerce sits in extras', withShop.extrasNet, 1200);

const pro = buildEstimate({ track: 'website', pages: 8, languages: 1, features: [], auditDepth: 'none' });
eq('pro months', pro.includedSeoMonths, 3);
eq('pro price', pro.oneOffNet, 1750);
eq('seo launch does not renew', seoLaunchFor('professional').autoRenew, false);
eq('business hours', seoLaunchFor('business').totalHours, 12);

const seoOnly = buildEstimate({ track: 'seo', seoTier: 'growth', contentPagesPerMonth: 2, auditDepth: 'technical', maintenance: false });
eq('retainer undiscounted', seoOnly.monthlyNet, 900 + 360);
eq('seo estimate has no build discount', seoOnly.discountNet, 0);

const greek = launchCopy('el');
const english = launchCopy('en');
eq('desktop strip', greek.stripDesktop, '−30% στην κατασκευή ιστοσελίδας. Με 3 μήνες SEO στο Professional ή 6 μήνες στο Business.');
eq('mobile strip', greek.stripMobile, 'Ιστοσελίδα από 1.050€ + ΦΠΑ · −30%');
eq('pro card', greek.cards.professional.priceLine, 'Από 2.500€ → από 1.750€ + ΦΠΑ');
eq('business card', greek.cards.business.offerLine, '−30% στην κατασκευή + SEO Launch 6 μηνών');
eq('english strip names both lengths', english.stripDesktop.includes('3 months') && english.stripDesktop.includes('6'), true);
eq('no worth-phrase', `${greek.heroLead} ${english.heroLead}`.includes('worth'), false);

eq('draft campaign', launchOfferView().state, 'draft');
eq('draft shows proposed prices', launchOfferView().discountApplies, SHOW_PROPOSED_OFFER_WHILE_DRAFT);
eq('draft cannot reserve', launchOfferView().canReserve, false);
eq('draft hides counts', launchOfferView().scarcity.kind, 'unverified');

function campaign(patch: Partial<LaunchCampaign>): LaunchCampaign {
  return { ...WEBSITE_LAUNCH_CAMPAIGN, ...patch };
}
const activeBase = campaign({
  status: 'active',
  starts_at: '2026-11-01T00:00:00+02:00',
  ends_at: '2026-12-01T00:00:00+02:00',
  capacity_total: 5,
  capacity_verified_at: '2026-10-20T10:00:00+03:00',
  reserved: 0,
});
const during = new Date('2026-11-15T12:00:00+02:00');
eq('active verified', launchOfferView(activeBase, during).state, 'active');
eq('active scarcity', launchOfferView(activeBase, during).scarcity, { kind: 'verified', remaining: 5, total: 5 });
eq('before window is expired for pricing', launchOfferView(activeBase, new Date('2026-10-01T12:00:00+03:00')).discountApplies, false);
eq('after window', launchOfferView(activeBase, new Date('2026-12-02T12:00:00+02:00')).state, 'expired');
eq('unknown capacity', launchOfferView(campaign({ status: 'active', starts_at: activeBase.starts_at, ends_at: activeBase.ends_at, capacity_total: null }), during).state, 'unknown_capacity');
eq('sold out status', launchOfferView(campaign({ status: 'sold_out' }), during).discountApplies, false);

const book: CapacityBook = { total: 1, reservations: [] };
const nowMs = Date.parse('2026-11-15T12:00:00+02:00');
const first = tryReserveSlot({
  book,
  key: 'quote-1',
  packageId: 'professional',
  quoteId: 'q1',
  eligible: true,
  capacityVerified: true,
  depositConfirmed: true,
  quoteAccepted: true,
  nowMs,
  expiresAt: '2026-11-20T12:00:00+02:00',
});
eq('last slot taken', first.ok, true);
const second = tryReserveSlot({
  book: first.ok ? first.book : book,
  key: 'quote-2',
  packageId: 'professional',
  quoteId: 'q2',
  eligible: true,
  capacityVerified: true,
  depositConfirmed: true,
  quoteAccepted: true,
  nowMs,
  expiresAt: '2026-11-20T12:00:00+02:00',
});
eq('race loses', second.ok, false);
const replay = tryReserveSlot({
  book: first.ok ? first.book : book,
  key: 'quote-1',
  packageId: 'professional',
  quoteId: 'q1',
  eligible: true,
  capacityVerified: true,
  depositConfirmed: true,
  quoteAccepted: true,
  nowMs,
  expiresAt: '2026-11-20T12:00:00+02:00',
});
eq('same key is idempotent', replay.ok && replay.duplicate, true);
eq('cancel frees the slot', tryReserveSlot({
  book: cancelReservation(first.ok ? first.book : book, 'quote-1'),
  key: 'quote-3',
  packageId: 'starter',
  quoteId: 'q3',
  eligible: true,
  capacityVerified: true,
  depositConfirmed: true,
  quoteAccepted: true,
  nowMs,
  expiresAt: '2026-11-20T12:00:00+02:00',
}).ok, true);
eq('unverified capacity cannot reserve', tryReserveSlot({
  book,
  key: 'x',
  packageId: 'starter',
  quoteId: 'qx',
  eligible: true,
  capacityVerified: false,
  depositConfirmed: true,
  quoteAccepted: true,
  nowMs,
  expiresAt: '2026-11-20T12:00:00+02:00',
}).ok, false);

const snapshot: AcceptedSnapshot = {
  pricingVersion: '2026-10-17',
  campaignId: 'website-launch-offer',
  campaignStatus: 'active',
  packageId: 'professional',
  listBaseCents: 2500_00,
  discountBps: 3000,
  payableBaseCents: 1750_00,
  extrasCents: 0,
  netCents: 1750_00,
  vatTreatment: 'gr_standard',
  vatCents: 420_00,
  grossCents: 2170_00,
  seoLaunchMonths: 3,
  seoLaunchAutoRenew: false,
  termsVersion: 'draft-2026-10-17',
  acceptedAt: '2026-11-15T12:00:00+02:00',
};
eq('grandfather keeps accepted net', grandfatheredNetCents(snapshot), 1750_00);

let log: { appliedIds: readonly string[]; collectedCents: number } = { appliedIds: [], collectedCents: 0 };
const paid = applyPayment(log, { id: 'evt_1', quoteId: 'q1', amountCents: 525_00, kind: 'deposit', provider: 'test', verified: true });
log = paid.log;
const again = applyPayment(log, { id: 'evt_1', quoteId: 'q1', amountCents: 525_00, kind: 'deposit', provider: 'test', verified: true });
eq('duplicate payment ignored', again.duplicate && again.log.collectedCents === 525_00, true);
const unverified = applyPayment(log, { id: 'evt_2', quoteId: 'q1', amountCents: 100, kind: 'balance', provider: 'test', verified: false });
eq('unverified transfer does not count', unverified.log.collectedCents, 525_00);
eq('tampered amount rejected', amountsMatch(1049_99, 1050_00), false);
eq('pii rejected', payloadHasPii({ email: 'a@b.c' }), true);

const secret = 'test-secret';
const body = '{"id":"evt_1"}';
const good = signPayload(secret, body);
eq('good signature', signaturesMatch(good, good), true);
eq('bad signature', signaturesMatch(good, signPayload('other', body)), false);

const limited = consumeRate({ count: 20, resetAt: 10_000 }, 5_000, 20, 60_000);
eq('rate limit', limited.limited, true);

eq('seo counter', counterFor('seo_launch'), 'seo_launch');
eq('care counter', counterFor('care'), 'care');
eq('bug counter', counterFor('our_bug'), 'non_billable');
eq('in-round change is not care', counterFor('build_change'), 'non_billable');
eq('cross tenant blocked', sameTenant('a', 'b'), false);
eq('same tenant', sameTenant('a', 'a'), true);

const firstNotice = recordNotice({ keys: [] }, 'seo-end:q1:30d');
const secondNotice = recordNotice(firstNotice.log, 'seo-end:q1:30d');
eq('notice once', firstNotice.send && !secondNotice.send, true);

eq('month end', addCalendarMonths('2026-01-31', 1), '2026-02-28');
eq('leap day', addCalendarMonths('2028-01-31', 1), '2028-02-29');
eq('dst spring civil date', addCalendarMonths('2026-03-29', 1), '2026-04-29');
eq('dst autumn civil date', addCalendarMonths('2026-10-25', 1), '2026-11-25');
const program = { startDate: '2026-03-29', months: 3, pauses: [], autoRenew: false as const };
eq('program end', programEndDate(program), '2026-06-29');
eq('client pause extends end', programEndDate({ ...program, pauses: [{ from: '2026-04-01', to: '2026-04-11', cause: 'client' }] }), '2026-07-09');
eq('our delay does not extend', programEndDate({ ...program, pauses: [{ from: '2026-04-01', to: '2026-04-11', cause: 'us' }] }), '2026-06-29');
eq('paused phase', programPhase({ ...program, pauses: [{ from: '2026-04-01', to: '2026-04-11', cause: 'client' }] }, '2026-04-05'), 'paused');
eq('active month', activeMonthNumber(program, '2026-03-29'), 1);
eq('athens date is civil', athensCivilDate(new Date('2026-03-29T00:30:00Z')), '2026-03-29');

eq('care minimum', extraWorkCents(10), 40_00);
eq('care step', extraWorkCents(31), 60_00);
eq('partner minutes', CARE_PLANS.find((plan) => plan.id === 'partner')?.includedMinutes, 360);

if (failed > 0) {
  console.error(`\n${failed} failed`);
  process.exit(1);
}
console.log('\nall commercial checks passed');
