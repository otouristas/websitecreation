'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import type { AuditResult, Localized } from '@/lib/audit/types';
import { buildEstimate, normalizeInput, type EstimateInput } from '@/lib/estimate/model';
import { presetForService, recommendFromAudit } from '@/lib/estimate/recommend';
import { formatPrice } from '@/data/pricing';
import type { SiteLocale } from '@/lib/i18n/locale';
import { AUDIT_COPY, ESTIMATE_COPY, PILLAR_LABELS } from './plan-copy';
import { LiveAudit } from './LiveAudit';
import { CostEstimator } from './CostEstimator';

/**
 * Test, then price - the two halves of the same question.
 *
 * Kept as one component because the handover between them is the whole point:
 * the audit measures the site, the measurement seeds the scope, and the
 * visitor sees a number that came from their own domain rather than from a
 * dropdown they guessed at. Wiring them separately would make that handover
 * something a future edit could quietly drop.
 *
 * State lives here and is mirrored upward through `onChange` so the brief that
 * eventually reaches us carries the exact figures the visitor was looking at.
 */

export interface PlanSnapshot {
  readonly result: AuditResult | null;
  readonly input: EstimateInput;
  readonly reasons: readonly Localized[];
}

/**
 * Flattens the snapshot into the plain fields a form submission carries.
 *
 * Deliberately strings, not JSON: this lands in an inbox that a person reads
 * before a call, and a pasted object is not something anyone reads.
 */
export function summarizePlan(snapshot: PlanSnapshot, locale: SiteLocale): Record<string, string> {
  const estimate = buildEstimate(snapshot.input);
  const out: Record<string, string> = {
    'Estimate: scope': `${snapshot.input.track}, ${snapshot.input.pages} pages, ${snapshot.input.languages} language(s)`,
    'Estimate: SEO': `${snapshot.input.seoTier}, ${snapshot.input.seoMonths} months, ${snapshot.input.contentPagesPerMonth} content pages/month`,
    'Estimate: audit': snapshot.input.auditDepth,
    'Estimate: features': snapshot.input.features.join(', ') || 'none',
    'Estimate: one-off net': `€${formatPrice(estimate.oneOffNet, locale)}`,
    'Estimate: monthly net': `€${formatPrice(estimate.monthlyNet, locale)}`,
    'Estimate: first invoice net': `€${formatPrice(estimate.firstInvoiceNet, locale)}`,
  };
  if (estimate.commitmentMonths > 0) {
    out['Estimate: commitment net'] =
      `€${formatPrice(estimate.commitmentNet, locale)} over ${estimate.commitmentMonths} months (band €${formatPrice(estimate.bandLowNet, locale)}–€${formatPrice(estimate.bandHighNet, locale)})`;
  }

  const result = snapshot.result;
  if (result) {
    out['Audit: url'] = result.finalUrl;
    out['Audit: score'] = `${result.score}/100 (${result.grade})`;
    out['Audit: pillars'] = result.pillars.map((p) => `${p.pillar} ${p.score}`).join(', ');
    out['Audit: ttfb'] = `${result.metrics.ttfbMs} ms`;
    out['Audit: words'] = String(result.metrics.wordCount);
    out['Audit: sitemap urls'] = result.metrics.sitemapUrls === null ? 'none found' : String(result.metrics.sitemapUrls);
    out['Audit: structured data'] = result.metrics.jsonLdTypes.join(', ') || 'none';
    const blocked = result.aiAccess.filter((a) => !a.allowed).map((a) => a.token);
    out['Audit: AI crawlers blocked'] = blocked.join(', ') || 'none';
    out['Audit: top issues'] = result.priorities.map((p) => `${p.label.en} (${p.value ?? p.state})`).join(' | ');
  }
  return out;
}

export function InstantPlan({
  locale,
  service,
  initialUrl = '',
  onChange,
  onAudited,
  onSendBrief,
  className,
}: {
  locale: SiteLocale;
  /** Service slug from the URL, so the scope starts where the visitor's intent is. */
  service?: string | null;
  initialUrl?: string;
  onChange?: (snapshot: PlanSnapshot) => void;
  /** Fired when an audit completes. An event, so callers react without an effect. */
  onAudited?: (result: AuditResult) => void;
  onSendBrief?: () => void;
  className?: string;
}) {
  const at = AUDIT_COPY[locale];
  const et = ESTIMATE_COPY[locale];

  const [input, setInput] = useState<EstimateInput>(() =>
    normalizeInput(presetForService(service ?? null)),
  );
  const [result, setResult] = useState<AuditResult | null>(null);
  const [reasons, setReasons] = useState<readonly Localized[]>([]);

  // The audit's reading of the site replaces the service preset, because a
  // measurement beats an inference about what a click meant. Anything the
  // visitor has already moved by hand is not overwritten - `normalizeInput`
  // merges onto the current input rather than onto the defaults.
  const handleResult = useCallback(
    (next: AuditResult) => {
      const recommendation = recommendFromAudit(next);
      setResult(next);
      setReasons(recommendation.reasons);
      setInput((prev) => normalizeInput({ ...prev, ...recommendation.input }));
      onAudited?.(next);
    },
    [onAudited],
  );

  const snapshot = useMemo<PlanSnapshot>(() => ({ result, input, reasons }), [result, input, reasons]);

  useEffect(() => {
    onChange?.(snapshot);
  }, [snapshot, onChange]);

  const scrollToEstimator = useCallback(() => {
    document.getElementById('live-estimate')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className={cn('space-y-12', className)}>
      <section aria-labelledby="live-audit-title">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          {at.eyebrow}
        </p>
        <h2
          id="live-audit-title"
          className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground"
        >
          {at.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{at.intro}</p>
        <LiveAudit
          locale={locale}
          initialUrl={initialUrl}
          onResult={handleResult}
          onPriceClick={scrollToEstimator}
          className="mt-7"
        />
        {result ? (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {result.pillars.map((p) => `${PILLAR_LABELS[p.pillar][locale]} ${p.score}`).join(' · ')}
          </p>
        ) : null}
      </section>

      <section aria-labelledby="live-estimate-title">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          {et.eyebrow}
        </p>
        <h2
          id="live-estimate-title"
          className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground"
        >
          {et.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{et.intro}</p>
        <CostEstimator
          id="live-estimate"
          locale={locale}
          input={input}
          onChange={setInput}
          reasons={reasons}
          onSubmit={onSendBrief}
          className="mt-7 scroll-mt-28"
        />
      </section>
    </div>
  );
}
