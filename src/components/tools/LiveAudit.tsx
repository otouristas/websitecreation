'use client';

import { useCallback, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Check, Minus, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { trackFormStart } from '@/lib/analytics';
import type { SiteLocale } from '@/lib/i18n/locale';
import type { AuditEvent, AuditResult, CheckState, Pillar } from '@/lib/audit/types';
import { AUDIT_COPY, PILLAR_LABELS, STEP_LABELS, type AuditCopy } from './plan-copy';

/**
 * The live site test.
 *
 * The log on screen is the audit's own event stream, read off the response as
 * it arrives. There is no minimum duration and no scripted sequence: a fast
 * host finishes in under a second and the log says so, a slow one crawls and
 * the visitor watches it crawl. That honesty is the product - a progress bar
 * animated on a timer teaches a visitor that the number at the end is theatre
 * too.
 */

type Stage = 'idle' | 'running' | 'done';

interface StepState {
  readonly id: string;
  readonly state: 'start' | 'done' | 'skip';
  readonly detail?: string;
}

const STATE_TONE: Record<CheckState, string> = {
  pass: 'text-signal',
  warn: 'text-warning',
  fail: 'text-destructive',
};

function toneForScore(score: number): string {
  return score >= 80 ? 'var(--signal)' : score >= 55 ? 'var(--brand)' : 'var(--warning)';
}

function ScoreDial({ score, grade, label }: { score: number; grade: string; label: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div
      className="relative grid size-28 shrink-0 place-items-center"
      role="img"
      aria-label={`${label}: ${score}/100 (${grade})`}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--hairline)" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={toneForScore(score)}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="text-center">
        <span className="block font-display text-3xl font-semibold tabular-nums leading-none tracking-[-0.04em] text-foreground">
          {score}
        </span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {grade}
        </span>
      </div>
    </div>
  );
}

function PillarBar({ pillar, score, locale }: { pillar: Pillar; score: number; locale: SiteLocale }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[13px] font-medium text-foreground">{PILLAR_LABELS[pillar][locale]}</span>
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{score}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-hairline">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${score}%`, background: toneForScore(score) }}
        />
      </div>
    </div>
  );
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-3.5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 truncate font-display text-sm font-medium tabular-nums text-foreground" title={value}>
        {value}
      </dd>
    </div>
  );
}

/** The measured figures, formatted. Nulls render as "-" rather than a zero. */
function metricRows(result: AuditResult, t: AuditCopy): { label: string; value: string }[] {
  const m = result.metrics;
  const rows: { label: string; value: string }[] = [
    { label: t.metrics.ttfbMs, value: `${m.ttfbMs} ms` },
    { label: t.metrics.downloadMs, value: `${m.downloadMs} ms` },
    { label: t.metrics.htmlBytes, value: `${Math.round(m.htmlBytes / 1024)} KB` },
    { label: t.metrics.compression, value: m.compression ?? '—' },
    { label: t.metrics.redirectHops, value: String(m.redirectHops) },
    { label: t.metrics.wordCount, value: String(m.wordCount) },
    { label: t.metrics.imageCount, value: String(m.imageCount) },
    { label: t.metrics.altCoverage, value: `${Math.round(m.altCoverage * 100)}%` },
    { label: t.metrics.renderBlockingScripts, value: String(m.renderBlockingScripts) },
    { label: t.metrics.externalScripts, value: String(m.externalScripts) },
    { label: t.metrics.thirdPartyHosts, value: String(m.thirdPartyHosts.length) },
    { label: t.metrics.internalLinks, value: String(m.internalLinks) },
    { label: t.metrics.sitemapUrls, value: m.sitemapUrls === null ? '—' : String(m.sitemapUrls) },
    { label: t.metrics.jsonLdTypes, value: m.jsonLdTypes.length ? m.jsonLdTypes.slice(0, 2).join(', ') : '—' },
    { label: t.metrics.hreflangCount, value: String(m.hreflangCount) },
    { label: t.metrics.notFoundStatus, value: m.notFoundStatus === null ? '—' : `HTTP ${m.notFoundStatus}` },
  ];
  // Always both, never conditionally: the grid is two and three columns wide
  // at its breakpoints, and an odd row count leaves a hairline-coloured hole
  // where the missing cell would be. Eighteen divides by both.
  rows.push({ label: t.metrics.server, value: m.server ?? '—' });
  rows.push({ label: t.metrics.llmsTxt, value: m.llmsTxt ? '✓' : '—' });
  return rows;
}

export function LiveAudit({
  locale,
  initialUrl = '',
  onResult,
  onPriceClick,
  className,
}: {
  locale: SiteLocale;
  initialUrl?: string;
  /** Fired once per completed audit, so the estimator can seed its scope. */
  onResult?: (result: AuditResult) => void;
  onPriceClick?: () => void;
  className?: string;
}) {
  const t = AUDIT_COPY[locale];

  const [stage, setStage] = useState<Stage>('idle');
  const [url, setUrl] = useState(initialUrl);
  const [steps, setSteps] = useState<StepState[]>([]);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const applyEvent = useCallback(
    (event: AuditEvent) => {
      if (event.type === 'step') {
        setSteps((prev) => {
          const next = prev.filter((s) => s.id !== event.id);
          return [...next, { id: event.id, state: event.state, detail: event.detail }];
        });
        return;
      }
      if (event.type === 'result') {
        setResult(event.result);
        setStage('done');
        onResult?.(event.result);
        return;
      }
      if (event.type === 'error') {
        const map = t.errors as Record<string, string>;
        setError(map[event.code] ?? t.errors.generic);
        setStage('idle');
      }
    },
    [onResult, t.errors],
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = url.trim();
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    setSteps([]);
    setResult(null);
    setStage('running');
    trackFormStart('live_audit');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: value }),
        signal: controller.signal,
      });

      // A non-streaming body means the route refused before the audit began
      // (a bad payload, or the rate limiter), and that arrives as plain JSON.
      if (!res.ok && !res.headers.get('content-type')?.includes('ndjson')) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null;
        const map = t.errors as Record<string, string>;
        setError(map[json?.error ?? 'generic'] ?? t.errors.generic);
        setStage('idle');
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('no body');
      const decoder = new TextDecoder();
      let buffer = '';

      for (;;) {
        const { done, value: chunk } = await reader.read();
        if (done) break;
        buffer += decoder.decode(chunk, { stream: true });
        let newline = buffer.indexOf('\n');
        while (newline !== -1) {
          const line = buffer.slice(0, newline).trim();
          buffer = buffer.slice(newline + 1);
          if (line) {
            try {
              applyEvent(JSON.parse(line) as AuditEvent);
            } catch {
              // A truncated line is not fatal: the next chunk completes it, and
              // a genuinely malformed one costs one log row, not the audit.
            }
          }
          newline = buffer.indexOf('\n');
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError(t.errors.generic);
      setStage('idle');
    }
  }

  function reset() {
    abortRef.current?.abort();
    setStage('idle');
    setResult(null);
    setSteps([]);
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const orderedSteps = steps;

  return (
    <div className={cn('w-full', className)}>
      {stage !== 'done' && (
        <form onSubmit={handleSubmit} noValidate>
          <div className="glass flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center sm:rounded-full sm:pl-5">
            <label htmlFor="audit-url" className="sr-only">
              {t.placeholder}
            </label>
            <div className="flex min-w-0 flex-1 items-center gap-2 px-3 sm:px-0">
              <svg viewBox="0 0 20 20" aria-hidden className="size-4 shrink-0 text-brand">
                <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                id="audit-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                spellCheck={false}
                placeholder={t.placeholder}
                value={url}
                disabled={stage === 'running'}
                onChange={(e) => setUrl(e.target.value)}
                className="h-11 w-full min-w-0 bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:h-12"
              />
            </div>
            <button type="submit" disabled={stage === 'running'} className="btn btn-primary shrink-0 disabled:opacity-80">
              {stage === 'running' ? (
                <>
                  <span className="live-dot" aria-hidden />
                  {t.running}…
                </>
              ) : (
                <>
                  {t.run}
                  <ArrowRight className="size-4" aria-hidden />
                </>
              )}
            </button>
          </div>
          <p
            className={cn(
              'mt-3 px-1 font-mono text-[11px] uppercase tracking-[0.14em]',
              error ? 'text-warning' : 'text-muted-foreground',
            )}
            role={error ? 'alert' : undefined}
          >
            {error ?? t.hint}
          </p>
        </form>
      )}

      {orderedSteps.length > 0 && stage !== 'done' && (
        <ol className="glass mt-4 space-y-1.5 rounded-2xl p-4 font-mono text-[11px] uppercase tracking-[0.12em]" aria-live="polite">
          {orderedSteps.map((step) => (
            <li key={step.id} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0">
                {step.state === 'start' ? (
                  <span className="live-dot" aria-hidden />
                ) : step.state === 'skip' ? (
                  <Minus className="size-3 text-muted-foreground" aria-hidden />
                ) : (
                  <Check className="size-3 text-signal" aria-hidden />
                )}
              </span>
              <span className={step.state === 'start' ? 'text-brand' : 'text-muted-foreground'}>
                {STEP_LABELS[step.id]?.[locale] ?? step.id}
                {step.detail ? <span className="ml-2 normal-case tracking-normal text-foreground/70">{step.detail}</span> : null}
              </span>
            </li>
          ))}
        </ol>
      )}

      {stage === 'done' && result && (
        <div className="space-y-4" aria-live="polite">
          <div className="glass rounded-3xl p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <ScoreDial score={result.score} grade={result.grade} label={t.score} />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">{t.score}</p>
                <p className="mt-1 truncate font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {result.finalUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{t.elapsed(result.elapsedMs)}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {result.pillars.map((p) => (
                    <PillarBar key={p.pillar} pillar={p.pillar} score={p.score} locale={locale} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hairline pt-5">
              {onPriceClick ? (
                <button type="button" onClick={onPriceClick} className="btn btn-primary">
                  {t.toEstimate}
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </button>
              ) : null}
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                {t.rerun}
              </button>
            </div>
          </div>

          <div className="glass rounded-3xl p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.aiAccess}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[...result.aiAccess, ...result.searchAccess].map((agent) => (
                <li
                  key={agent.id}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px]',
                    agent.allowed
                      ? 'border-signal/30 bg-signal/10 text-foreground'
                      : 'border-destructive/40 bg-destructive/10 text-foreground',
                  )}
                >
                  {agent.allowed ? (
                    <Check className="size-3.5 text-signal" aria-hidden />
                  ) : (
                    <X className="size-3.5 text-destructive" aria-hidden />
                  )}
                  <span className="font-medium">{locale === 'el' ? agent.labelEl : agent.labelEn}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {agent.allowed ? t.aiAllowed : t.aiBlocked}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {result.priorities.length > 0 ? (
            <div className="glass rounded-3xl p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.priorities}</p>
              <ul className="mt-3 space-y-3.5">
                {result.priorities.map((issue) => (
                  <li key={issue.id} className="flex gap-3 text-sm">
                    <span
                      aria-hidden
                      className={cn(
                        'mt-1.5 size-2 shrink-0 rounded-full',
                        issue.state === 'fail' ? 'bg-destructive' : 'bg-warning',
                      )}
                    />
                    <span className="min-w-0">
                      <span className={cn('font-medium', STATE_TONE[issue.state])}>{issue.label[locale]}</span>
                      {issue.value ? (
                        <span className="ml-2 font-mono text-[11px] text-muted-foreground">{issue.value}</span>
                      ) : null}
                      <span className="block text-[13px] leading-relaxed text-muted-foreground">{issue.fix[locale]}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="glass rounded-3xl p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">{t.allPass}</p>
          )}

          <div className="glass overflow-hidden rounded-3xl p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.measured}</p>
            <dl className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
              {metricRows(result, t).map((row) => (
                <MetricCell key={row.label} label={row.label} value={row.value} />
              ))}
            </dl>
            <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">{t.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
