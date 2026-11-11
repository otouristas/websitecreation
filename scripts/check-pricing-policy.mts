import assert from 'node:assert/strict';
import {
  VAT_GIFT_STARTS, OFFER_ENDS, addOns, websitePackages, seoPackages,
  currentPrice, currentGrossPrice, currentDisplayPrice, currentPriceIncludesVat,
  currentPriceVatLabel, entryWebsiteDisplay, entrySeoDisplay, resolvePriceTokens, withVat,
} from '../src/data/pricing';
import { buildEstimate } from '../src/lib/estimate/model';
import { getNavModel } from '../src/data/nav-menu';
import { getPricingPageCopy } from '../src/data/pricing-page-copy';

const beforeGift = new Date(VAT_GIFT_STARTS.getTime() - 1);
const firstGift = new Date(VAT_GIFT_STARTS);
const during = new Date('2026-11-10T12:00:00+02:00');
const lastGift = new Date(OFFER_ENDS);
const expired = new Date(OFFER_ENDS.getTime() + 1);
const starter = websitePackages[0];
const foundations = seoPackages[0];

// Latest owner correction: regular NET baselines are 1,000 and 350/month.
// The current VAT-inclusive offers and every unrelated fee stay unchanged.
assert.deepEqual([starter.regular, starter.offer, foundations.regular, foundations.offer], [1000, 599, 350, 149]);
assert.equal(withVat(starter.regular), 1240);
assert.equal(withVat(foundations.regular), 434);
assert.deepEqual(websitePackages.slice(1).map(t => [t.regular, t.offer]), [[2500, 2500], [4000, 4000]]);
assert.deepEqual(seoPackages.slice(1).map(t => [t.regular, t.offer]), [[900, 900], [1500, 1500]]);
assert.deepEqual(addOns.map(a => a.from), [180, 180, 450, 750, 250, 600, 350, 1200]);
assert.deepEqual([...websitePackages, ...seoPackages].filter(t => t.offerVatIncluded).map(t => t.id), ['starter', 'foundations']);
assert.ok(starter.includesEl.some(text => text.includes('€130')));

// Athens November boundaries: the older promotion stays net until the gift starts.
assert.equal(currentPriceIncludesVat(starter, beforeGift), false);
assert.equal(currentPrice(starter, beforeGift), 599);
assert.equal(currentGrossPrice(starter, beforeGift), 742.76);
assert.equal(currentPrice(foundations, beforeGift), 149);
assert.equal(currentGrossPrice(foundations, beforeGift), 184.76);
for (const date of [firstGift, during, lastGift]) {
  assert.equal(currentPriceIncludesVat(starter, date), true);
  assert.equal(currentPriceIncludesVat(foundations, date), true);
  assert.equal(currentGrossPrice(starter, date), 599);
  assert.equal(currentGrossPrice(foundations, date), 149);
  assert.equal(currentDisplayPrice(starter, date), 599);
  assert.equal(currentDisplayPrice(foundations, date), 149);
  // A rounded intermediate would regress the website total to 598.99.
  assert.equal(withVat(currentPrice(starter, date)), 599);
  assert.equal(withVat(currentPrice(foundations, date)), 149);
  assert.ok(Math.abs(currentPrice(starter, date) - 599 / 1.24) < 1e-10);
  for (const tier of [...websitePackages.slice(1), ...seoPackages.slice(1)]) {
    assert.equal(currentPriceIncludesVat(tier, date), false);
    assert.equal(currentPrice(tier, date), tier.regular);
    assert.equal(currentGrossPrice(tier, date), withVat(tier.regular));
  }
}
assert.equal(currentPriceIncludesVat(starter, expired), false);
assert.equal(currentPriceIncludesVat(foundations, expired), false);
assert.equal(currentPrice(starter, expired), 1000);
assert.equal(currentGrossPrice(starter, expired), 1240);
assert.equal(currentPrice(foundations, expired), 350);
assert.equal(currentGrossPrice(foundations, expired), 434);
assert.equal(currentPriceVatLabel(starter, 'el', during), 'με ΦΠΑ 24%');
assert.equal(currentPriceVatLabel(starter, 'el', expired), '+ ΦΠΑ 24%');
assert.equal(entryWebsiteDisplay(during), 599);
assert.equal(entrySeoDisplay(during), 149);

// Existing authored contexts explicitly say pre-VAT, so their old tokens stay NET.
assert.equal(resolvePriceTokens('{{ENTRY_WEBSITE}} + ΦΠΑ', 'el', during), '€483,06 + ΦΠΑ');
assert.equal(resolvePriceTokens('{{ENTRY_SEO}} + ΦΠΑ', 'el', during), '€120,16 + ΦΠΑ');
assert.equal(resolvePriceTokens('{{ENTRY_WEBSITE_GROSS}} / {{ENTRY_SEO_GROSS}}', 'el', during), '€599 / €149');
assert.equal(resolvePriceTokens('{{ENTRY_WEBSITE_GROSS}}', 'el', expired), '€1.240');

const simple = { pages: 5, languages: 1, features: [], seoTier: 'foundations' as const, contentPagesPerMonth: 0, auditDepth: 'none' as const, maintenance: false };
const website = buildEstimate({ ...simple, track: 'website' }, during);
assert.equal(website.oneOffGross, 599);
const seo = buildEstimate({ ...simple, track: 'seo' }, during);
assert.equal(seo.monthlyGross, 149);
assert.equal(seo.minTermMonths, 6);
assert.equal(withVat(seo.minTermNet), 894); // The gift applies to all six monthly payments.
const combined = buildEstimate({ ...simple, track: 'both', features: ['logo'], auditDepth: 'technical' }, during);
assert.equal(combined.oneOffGross, 1591); // 599 gross + the unchanged 350/450 net add-ons.
assert.equal(combined.monthlyGross, 149);
assert.equal(withVat(combined.minTermNet), 2485);
assert.equal(buildEstimate({ ...simple, track: 'seo' }, expired).monthlyGross, 434);

const activeNav = JSON.stringify(getNavModel('el', 'agency', during));
assert.ok(activeNav.includes('€599 με ΦΠΑ 24%'));
assert.ok(activeNav.includes('€149/μήνα με ΦΠΑ 24%'));
const expiredNav = JSON.stringify(getNavModel('el', 'agency', expired));
assert.ok(expiredNav.includes('€1.000 + ΦΠΑ 24%'));
assert.ok(expiredNav.includes('€350/μήνα + ΦΠΑ 24%'));
const activeFaqs = getPricingPageCopy('el', during).faqs;
assert.ok(activeFaqs[0].answer.includes('πριν €1.000 + ΦΠΑ 24% (€1.240 με ΦΠΑ), τώρα €599'));
assert.ok(activeFaqs[0].answer.includes('πριν €350/μήνα + ΦΠΑ 24% (€434/μήνα με ΦΠΑ), τώρα €149'));
assert.ok(activeFaqs.find(f => f.question === 'Περιλαμβάνεται ο ΦΠΑ στις τιμές;')!.answer.includes('σε όλη την εξάμηνη συνεργασία'));
assert.ok(!getPricingPageCopy('el', expired).faqs.some(f => f.question.includes('Black Month')));
console.log('Pricing policy passed: corrected regular baselines, November boundaries, exact gross totals, six-month SEO, unchanged other fees, net tokens, estimator and nav.');
