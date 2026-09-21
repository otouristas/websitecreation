'use client';

import { useMemo, type ReactNode } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { cn } from '@/lib/cn';
import { formatPrice } from '@/data/pricing';
import { FEATURE_RATES } from '@/data/estimator-rates';
import {
  CONTENT_RANGE,
  LANGUAGE_RANGE,
  PAGE_RANGE,
  SEO_TIERS,
  buildEstimate,
  type AuditDepth,
  type EstimateInput,
  type SeoTierId,
  type Track,
} from '@/lib/estimate/model';
import type { Localized } from '@/lib/audit/types';
import type { SiteLocale } from '@/lib/i18n/locale';
import { ESTIMATE_COPY } from './plan-copy';

/**
 * The live cost generator.
 *
 * Controlled from the outside: the parent owns the input so the audit can seed
 * it and so the wizard can file the exact figures the visitor was looking at.
 * The estimate itself is recomputed on every render from `buildEstimate`,
 * which is pure and cheap - memoised on the input rather than cached, because
 * a stale total next to a moved slider is the one failure this component
 * cannot have.
 */

function euro(amount: number, locale: SiteLocale): string {
  return `€${formatPrice(amount, locale)}`;
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-medium text-foreground">{label}</span>
        {hint ? <span className="font-mono text-[11px] tabular-nums text-brand">{hint}</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Slider({
  id,
  value,
  min,
  max,
  onChange,
  label,
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
}) {
  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={1}
      value={value}
      aria-label={label}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-[var(--primary)]"
    />
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: readonly { id: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            'rounded-full border px-4 py-2 text-[13px] font-medium transition-colors',
            value === option.id
              ? 'border-primary/60 bg-primary/15 text-foreground'
              : 'border-hairline bg-surface text-muted-foreground hover:border-brand/40 hover:text-foreground',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Total({
  label,
  net,
  gross,
  locale,
  emphasis = false,
  netLabel,
  vatLabel,
  suffix,
  note,
}: {
  label: string;
  net: number;
  gross: number;
  locale: SiteLocale;
  emphasis?: boolean;
  netLabel: string;
  vatLabel: string;
  /** Rendered against the figure itself, e.g. "/month". */
  suffix?: string;
  note?: string;
}) {
  return (
    <div className={cn('bg-surface p-4', emphasis && 'bg-surface-raised')}>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p
        className={cn(
          'mt-1 font-display font-semibold tabular-nums tracking-[-0.03em] text-foreground',
          emphasis ? 'text-3xl' : 'text-xl',
        )}
      >
        {euro(net, locale)}
        {suffix ? (
          <span className="font-display text-base font-medium text-muted-foreground">{suffix}</span>
        ) : null}
        <span className="ml-1.5 font-mono text-[11px] font-normal tracking-normal text-muted-foreground">
          {netLabel}
        </span>
      </p>
      <p className="mt-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
        {euro(gross, locale)} {vatLabel}
      </p>
      {note ? (
        <p className="mt-1.5 font-mono text-[11px] tabular-nums text-muted-foreground">{note}</p>
      ) : null}
    </div>
  );
}

export function CostEstimator({
  locale,
  input,
  onChange,
  reasons = [],
  onSubmit,
  className,
  id,
}: {
  locale: SiteLocale;
  input: EstimateInput;
  onChange: (next: EstimateInput) => void;
  /** Why the scope starts where it does, straight from the audit. */
  reasons?: readonly Localized[];
  onSubmit?: () => void;
  className?: string;
  id?: string;
}) {
  const t = ESTIMATE_COPY[locale];
  const estimate = useMemo(() => buildEstimate(input), [input]);
  const set = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]): void =>
    onChange({ ...input, [key]: value });

  const wantsWebsite = input.track !== 'seo';
  const wantsSeo = input.track !== 'website';

  const toggleFeature = (featureId: string): void => {
    const has = input.features.includes(featureId);
    set(
      'features',
      has ? input.features.filter((f) => f !== featureId) : [...input.features, featureId],
    );
  };

  return (
    <div id={id} className={cn('grid gap-4 lg:grid-cols-5', className)}>
      {/* ------------------------------------------------------------ inputs */}
      <div className="glass space-y-6 rounded-3xl p-5 sm:p-6 lg:col-span-3">
        <Field label={t.track}>
          <Segmented
            label={t.track}
            value={input.track}
            onChange={(value: Track) => set('track', value)}
            options={[
              { id: 'website' as Track, label: t.tracks.website },
              { id: 'seo' as Track, label: t.tracks.seo },
              { id: 'both' as Track, label: t.tracks.both },
            ]}
          />
        </Field>

        {wantsWebsite ? (
          <>
            <Field label={t.pages} hint={String(input.pages)}>
              <Slider
                id="est-pages"
                label={t.pages}
                value={input.pages}
                min={PAGE_RANGE.min}
                max={PAGE_RANGE.max}
                onChange={(value) => set('pages', value)}
              />
            </Field>
            <Field label={t.languages} hint={String(input.languages)}>
              <Slider
                id="est-languages"
                label={t.languages}
                value={input.languages}
                min={LANGUAGE_RANGE.min}
                max={LANGUAGE_RANGE.max}
                onChange={(value) => set('languages', value)}
              />
            </Field>
            <Field label={t.features}>
              <div className="flex flex-wrap gap-2">
                {FEATURE_RATES.map((feature) => {
                  const active = input.features.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleFeature(feature.id)}
                      className={cn(
                        'rounded-full border px-3.5 py-1.5 text-[13px] transition-colors',
                        active
                          ? 'border-primary/60 bg-primary/15 text-foreground'
                          : 'border-hairline bg-surface text-muted-foreground hover:border-brand/40 hover:text-foreground',
                      )}
                    >
                      {locale === 'el' ? feature.labelEl : feature.labelEn}
                      {feature.net !== null ? (
                        <span className="ml-1.5 font-mono text-[10px] text-muted-foreground">
                          +{euro(feature.net, locale)}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </Field>
          </>
        ) : null}

        {wantsSeo ? (
          <>
            <Field label={t.seoTier}>
              <Segmented
                label={t.seoTier}
                value={input.seoTier}
                onChange={(value: SeoTierId) => set('seoTier', value)}
                options={SEO_TIERS.map((tier) => ({ id: tier.id as SeoTierId, label: tier.name }))}
              />
            </Field>
            <Field label={t.contentPages} hint={String(input.contentPagesPerMonth)}>
              <Slider
                id="est-content"
                label={t.contentPages}
                value={input.contentPagesPerMonth}
                min={CONTENT_RANGE.min}
                max={CONTENT_RANGE.max}
                onChange={(value) => set('contentPagesPerMonth', value)}
              />
            </Field>
          </>
        ) : null}

        <Field label={t.audit}>
          <Segmented
            label={t.audit}
            value={input.auditDepth}
            onChange={(value: AuditDepth) => set('auditDepth', value)}
            options={[
              { id: 'none' as AuditDepth, label: t.auditOptions.none },
              { id: 'technical' as AuditDepth, label: t.auditOptions.technical },
              { id: 'advanced' as AuditDepth, label: t.auditOptions.advanced },
            ]}
          />
        </Field>

        <label className="flex cursor-pointer items-center gap-3 text-[13px] text-foreground">
          <input
            type="checkbox"
            checked={input.maintenance}
            onChange={(e) => set('maintenance', e.target.checked)}
            className="size-4 accent-[var(--primary)]"
          />
          {t.maintenance}
        </label>

        {reasons.length > 0 ? (
          <div className="rounded-2xl border border-hairline bg-surface p-4">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
              <Info className="size-3.5" aria-hidden />
              {t.fromAudit}
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {reasons.map((reason) => (
                <li key={reason.en} className="text-[13px] leading-relaxed text-muted-foreground">
                  {reason[locale]}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* ------------------------------------------------------------ totals */}
      <div className="glass flex flex-col rounded-3xl p-5 sm:p-6 lg:col-span-2">
        {/* Two figures, and neither is a multiple of the other.
            A retainer is a monthly decision; rendering six or twelve months of
            it as one number turns that decision into a five-figure one and
            gets declined on sight. The minimum term is stated in words below,
            the way /pricing states it. */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
          <Total
            label={estimate.monthlyNet > 0 ? t.monthly : t.monthlyNone}
            net={estimate.monthlyNet}
            gross={estimate.monthlyGross}
            locale={locale}
            emphasis={estimate.monthlyNet > 0}
            netLabel={t.net}
            vatLabel={t.vat}
            suffix={estimate.monthlyNet > 0 ? t.perMonth : undefined}
          />
          <Total
            label={estimate.oneOffNet > 0 ? t.oneOff : t.oneOffNone}
            net={estimate.oneOffNet}
            gross={estimate.oneOffGross}
            locale={locale}
            emphasis={estimate.monthlyNet === 0 && estimate.oneOffNet > 0}
            netLabel={t.net}
            vatLabel={t.vat}
            note={
              estimate.oneOffNet > 0
                ? t.band(euro(estimate.oneOffLowNet, locale), euro(estimate.oneOffHighNet, locale))
                : undefined
            }
          />
        </div>

        {estimate.hasRetainer ? (
          <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
            {t.minTerm(estimate.minTermMonths)}
          </p>
        ) : null}

        {estimate.offerActive && estimate.savingNet > 0 ? (
          <p className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">
            <span className="live-dot" aria-hidden />
            {t.offer} · {t.saving(formatPrice(estimate.savingNet, locale))}
          </p>
        ) : null}

        <div className="mt-5 border-t border-hairline pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.breakdown}</p>
          {estimate.lines.length === 0 ? (
            <p className="mt-2 text-[13px] text-muted-foreground">{t.empty}</p>
          ) : (
            <ul className="mt-2.5 space-y-2">
              {estimate.lines.map((line) => (
                <li key={line.id} className="flex items-baseline justify-between gap-3 text-[13px]">
                  <span className="min-w-0">
                    <span className="text-foreground">{locale === 'el' ? line.labelEl : line.labelEn}</span>
                    {line.noteEn ? (
                      <span className="block font-mono text-[10px] text-muted-foreground">
                        {locale === 'el' ? line.noteEl : line.noteEn}
                      </span>
                    ) : null}
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-mono tabular-nums text-muted-foreground">
                    {euro(line.net, locale)}
                    {line.kind === 'monthly' ? <span className="text-[10px]">{t.perMonth}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-5 text-[12px] leading-relaxed text-muted-foreground">{t.disclaimer}</p>

        {onSubmit ? (
          <div className="mt-5">
            <button type="button" onClick={onSubmit} className="btn btn-primary w-full">
              {t.send}
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </button>
            <p className="mt-2 text-center text-[12px] leading-relaxed text-muted-foreground">{t.sendHint}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
