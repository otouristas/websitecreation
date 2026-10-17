'use client';

import { useMemo, useState } from 'react';
import { FEATURE_RATES, INCLUDED_PAGES } from '@/data/estimator-rates';
import { CARE_PLANS } from '@/data/commercial/care';
import { launchCopy } from '@/data/commercial/launch-copy';
import { SEO_LAUNCH_INCLUDED_EL, SEO_LAUNCH_INCLUDED_EN } from '@/data/commercial/seo-launch';
import { formatPrice, seoPackages, withVat } from '@/data/pricing';
import { buildEstimate, type EstimateInput, type SeoTierId } from '@/lib/estimate/model';
import type { VatTreatment } from '@/data/commercial/money';
import type { SiteLocale } from '@/lib/i18n/locale';

const OPTIONAL_FEATURES = FEATURE_RATES.filter((feature) => feature.id !== 'contact-form' && feature.id !== 'blog' && feature.id !== 'gallery');

/**
 * Public build estimator.
 * Optional retainers and care plans start unchecked. The ±15% band is clamped
 * so it cannot render below the package base. Figures come from buildEstimate,
 * the same function the server route validates against.
 */
export function WebsiteEstimator({ locale }: { readonly locale: SiteLocale }) {
  const isEl = locale === 'el';
  const copy = launchCopy(locale);
  const [pages, setPages] = useState(5);
  const [languages, setLanguages] = useState(1);
  const [features, setFeatures] = useState<string[]>([]);
  const [paidSeo, setPaidSeo] = useState(false);
  const [seoTier, setSeoTier] = useState<SeoTierId>('growth');
  const [maintenance, setMaintenance] = useState(false);
  const [treatment, setTreatment] = useState<VatTreatment>('gr_standard');

  const input: EstimateInput = useMemo(
    () => ({
      track: paidSeo ? 'both' : 'website',
      pages,
      languages,
      features: ['contact-form', ...features],
      seoTier,
      contentPagesPerMonth: 0,
      auditDepth: 'none',
      maintenance,
    }),
    [features, languages, maintenance, pages, paidSeo, seoTier],
  );

  const estimate = buildEstimate(input, undefined, treatment);
  const money = (value: number) => `€${formatPrice(value, locale)}`;
  const included = SEO_LAUNCH_INCLUDED_EL;

  const toggle = (id: string) => {
    setFeatures((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
        <div>
          <h2 className="font-display text-[28px] font-semibold tracking-[-0.03em] text-foreground">
            {isEl ? 'Εκτίμηση κατασκευής' : 'Build estimate'}
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
            {isEl
              ? 'Οι τιμές είναι «από». Η έκπτωση πιάνει μόνο τη βάση. Hosting, άδειες, επιπλέον σελίδες, κρατήσεις και μηνιαίες υπηρεσίες δεν εκπίπτουν και δεν είναι προεπιλεγμένα.'
              : 'Prices are from-prices. The discount applies to the base only. Hosting, licences, extra pages, booking and monthly services are not discounted and start unselected.'}
          </p>
        </div>
        <label className="block text-[14px]">
          <span className="font-medium text-foreground">{isEl ? 'Σελίδες' : 'Pages'}</span>
          <input
            type="number"
            min={1}
            max={60}
            value={pages}
            onChange={(event) => setPages(Number(event.target.value))}
            className="mt-1 w-full rounded-xl border border-hairline bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="block text-[14px]">
          <span className="font-medium text-foreground">{isEl ? 'Γλώσσες' : 'Languages'}</span>
          <input
            type="number"
            min={1}
            max={5}
            value={languages}
            onChange={(event) => setLanguages(Number(event.target.value))}
            className="mt-1 w-full rounded-xl border border-hairline bg-background px-3 py-2 text-foreground"
          />
          <span className="mt-1 block text-[12px] text-muted-foreground">
            {isEl
              ? 'Η δεύτερη γλώσσα χωρίζεται σε δομή (hreflang) και μετάφραση. Η μετάφραση μπαίνει στην προσφορά, όχι σε αυτό το σύνολο.'
              : 'A second language is split into structure (hreflang) and translation. Translation is quoted, not added to this total.'}
          </span>
        </label>
        <fieldset className="space-y-2">
          <legend className="text-[14px] font-medium text-foreground">{isEl ? 'Πρόσθετα, χωρίς έκπτωση' : 'Extras, not discounted'}</legend>
          {OPTIONAL_FEATURES.map((feature) => (
            <label key={feature.id} className="flex items-start gap-2 text-[14px] text-foreground">
              <input type="checkbox" checked={features.includes(feature.id)} onChange={() => toggle(feature.id)} className="mt-1" />
              <span>
                {isEl ? feature.labelEl : feature.labelEn}
                {feature.net === null ? (isEl ? ' — στην προσφορά' : ' — quoted') : ` — ${money(feature.net)}`}
              </span>
            </label>
          ))}
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="text-[14px] font-medium text-foreground">{isEl ? 'Προαιρετικές μηνιαίες υπηρεσίες' : 'Optional monthly services'}</legend>
          <label className="flex items-start gap-2 text-[14px]">
            <input type="checkbox" checked={paidSeo} onChange={() => setPaidSeo((value) => !value)} className="mt-1" />
            <span>{isEl ? 'Μηνιαίο SEO επί πληρωμή (δεν είναι το SEO Launch)' : 'Paid monthly SEO (this is not SEO Launch)'}</span>
          </label>
          {paidSeo ? (
            <select
              value={seoTier}
              onChange={(event) => setSeoTier(event.target.value as SeoTierId)}
              className="w-full rounded-xl border border-hairline bg-background px-3 py-2"
            >
              {seoPackages.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.name}
                </option>
              ))}
            </select>
          ) : null}
          <label className="flex items-start gap-2 text-[14px]">
            <input type="checkbox" checked={maintenance} onChange={() => setMaintenance((value) => !value)} className="mt-1" />
            <span>{isEl ? 'Συντήρηση / φροντίδα' : 'Maintenance / care'}</span>
          </label>
          <ul className="text-[13px] leading-relaxed text-muted-foreground">
            {CARE_PLANS.map((plan) => (
              <li key={plan.id}>
                {plan.id}: {money(plan.monthlyNetCents / 100)}/{isEl ? 'μήνα' : 'mo'}, {plan.includedMinutes}′
              </li>
            ))}
          </ul>
        </fieldset>
        <label className="block text-[14px]">
          <span className="font-medium text-foreground">{isEl ? 'ΦΠΑ' : 'VAT'}</span>
          <select
            value={treatment}
            onChange={(event) => setTreatment(event.target.value as VatTreatment)}
            className="mt-1 w-full rounded-xl border border-hairline bg-background px-3 py-2"
          >
            <option value="gr_standard">{isEl ? 'Ελλάδα, ΦΠΑ 24%' : 'Greece, 24% VAT'}</option>
            <option value="eu_b2b_reverse_charge">{isEl ? 'ΕΕ, επιχείρηση, αντίστροφη χρέωση' : 'EU business, reverse charge'}</option>
            <option value="non_eu">{isEl ? 'Εκτός ΕΕ' : 'Outside the EU'}</option>
          </select>
        </label>
      </form>

      <div className="rounded-2xl border border-hairline bg-surface/70 p-5 text-[14px] leading-relaxed">
        <p className="font-medium text-foreground">
          {estimate.websiteTier?.name} · {isEl ? 'έως' : 'up to'} {estimate.websiteTier ? INCLUDED_PAGES[estimate.websiteTier.id] : '—'}{' '}
          {isEl ? 'σελίδες' : 'pages'}
        </p>
        <dl className="mt-4 space-y-2">
          <Row label={isEl ? 'Βάση' : 'Base'} value={money(estimate.baseListNet)} />
          <Row label={isEl ? 'Έκπτωση βάσης' : 'Base discount'} value={estimate.discountNet ? `−${money(estimate.discountNet)}` : '—'} />
          <Row label={isEl ? 'Πρόσθετα' : 'Extras'} value={money(estimate.extrasNet)} />
          <Row
            label="SEO Launch"
            value={
              estimate.includedSeoMonths > 0
                ? isEl
                  ? `${estimate.includedSeoMonths} μήνες, ${included}`
                  : `${estimate.includedSeoMonths} months, ${SEO_LAUNCH_INCLUDED_EN}`
                : isEl
                  ? 'Δεν περιλαμβάνεται σε αυτό το πακέτο'
                  : 'Not included in this package'
            }
          />
          <Row label={isEl ? 'Καθαρή' : 'Net'} value={money(estimate.oneOffNet)} />
          <Row label={isEl ? 'ΦΠΑ' : 'VAT'} value={money(estimate.oneOffGross - estimate.oneOffNet)} />
          <Row label={isEl ? 'Πληρωτέο' : 'Payable'} value={money(estimate.oneOffGross)} />
          <Row label={isEl ? 'Προκαταβολή (50% καθαρής)' : 'Deposit (50% of net)'} value={money(estimate.depositNet)} />
          <Row
            label={isEl ? 'Δόσεις 50/30/20' : 'Instalments 50/30/20'}
            value={estimate.installmentsNet.map((part) => money(part)).join(' · ')}
          />
        </dl>
        <p className="mt-4 text-[13px] text-muted-foreground">
          {isEl
            ? `Το εύρος δεν εμφανίζεται κάτω από τη βάση του πακέτου (${money(estimate.bandFloorNet)}). Άνω ένδειξη ${money(estimate.oneOffHighNet)}.`
            : `The range is never shown below the package base (${money(estimate.bandFloorNet)}). Upper indication ${money(estimate.oneOffHighNet)}.`}
        </p>
        <p className="mt-3 text-[13px] text-muted-foreground">{copy.termsNearPrice}</p>
        <p className="mt-3 text-[13px] text-muted-foreground">
          {isEl ? 'Μηνιαία, αν επιλεγούν: ' : 'Monthly, if selected: '}
          {estimate.monthlyNet > 0 ? `${money(estimate.monthlyNet)} + ${isEl ? 'ΦΠΑ' : 'VAT'} ${money(withVat(estimate.monthlyNet, treatment) - estimate.monthlyNet)}` : isEl ? 'κανένα προεπιλεγμένο' : 'none selected'}
        </p>
        <p className="mt-4 text-[13px] text-foreground">{copy.scarcityAsk}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-hairline/80 py-1.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}
