'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { cn } from '@/lib/cn';
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
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { SCOPE_COPY } from './plan-copy';

/**
 * The plan panel: what the site needs, not what it costs.
 *
 * This was a cost estimator. It computed correctly and it drove leads away -
 * a real audit of a Greek hotel site put "Total over 6 months" at almost
 * twelve thousand euro in front of somebody who had typed a domain thirty
 * seconds earlier. A cold visitor cannot evaluate that number, so they do the
 * only safe thing and leave.
 *
 * The money did not disappear, it moved: `buildEstimate` still runs, and its
 * figures still travel with the brief so whoever picks up the call knows the
 * shape of the deal before they dial. The visitor sees the work.
 *
 * Nothing in this component may render a currency amount. The self-test
 * asserts that, because this is exactly the kind of thing that creeps back in
 * one "helpful" line at a time.
 */

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
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

export function ScopeBuilder({
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
  const t = SCOPE_COPY[locale];
  // The same model the brief is built from, so what the visitor reads and what
  // we receive can never describe two different projects. Only the labels are
  // rendered here; the amounts on each line stay behind.
  const plan = useMemo(() => buildEstimate(input), [input]);
  const set = <K extends keyof EstimateInput>(key: K, value: EstimateInput[K]): void =>
    onChange({ ...input, [key]: value });

  const wantsWebsite = input.track !== 'seo';
  const wantsSeo = input.track !== 'website';

  const toggleFeature = (featureId: string): void => {
    const has = input.features.includes(featureId);
    set('features', has ? input.features.filter((f) => f !== featureId) : [...input.features, featureId]);
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

      {/* -------------------------------------------------- the work, no cost */}
      <div className="glass flex flex-col rounded-3xl p-5 sm:p-6 lg:col-span-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.included}</p>
        {plan.lines.length === 0 ? (
          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{t.empty}</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {plan.lines.map((line) => (
              <li key={line.id} className="flex gap-3">
                <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium leading-snug text-foreground">
                    {locale === 'el' ? line.labelEl : line.labelEn}
                  </span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                      {line.kind === 'monthly' ? t.monthlyTag : t.oneOffTag}
                    </span>
                    {line.noteEn ? (
                      <span className="text-[12px] leading-relaxed text-muted-foreground">
                        {locale === 'el' ? line.noteEl : line.noteEn}
                      </span>
                    ) : null}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}

        {plan.hasRetainer ? (
          <p className="mt-5 border-t border-hairline pt-4 text-[12px] leading-relaxed text-muted-foreground">
            {t.minTerm(plan.minTermMonths)}
          </p>
        ) : null}

        {/* Prices are published, just not computed at a stranger. */}
        <p className={cn('text-[12px] leading-relaxed text-muted-foreground', plan.hasRetainer ? 'mt-2' : 'mt-5 border-t border-hairline pt-4')}>
          {t.priceNote}{' '}
          <Link href={localizedPath(locale, '/pricing')} className="text-link underline underline-offset-2 hover:text-foreground">
            {t.priceLink}
          </Link>
          .
        </p>

        {onSubmit ? (
          <div className="mt-6">
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
