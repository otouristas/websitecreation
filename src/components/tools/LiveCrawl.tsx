'use client';

import { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Minus, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/cn';
import { trackFormStart } from '@/lib/analytics';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import type { CrawlEvent, CrawlResult } from '@/lib/audit/crawl-run';
import type { CrawledPage } from '@/lib/audit/crawl';
import type { Severity } from '@/lib/audit/site-checks';
import { CRAWL_COPY, CRAWL_PHASE_LABELS, SEVERITY_LABELS } from './plan-copy';

/**
 * The live crawl.
 *
 * Rows appear because a page was just fetched. The counter moves because a
 * response landed. There is no minimum duration and no interpolation - on a
 * fast host the table fills faster than it can be read, and on a slow one the
 * visitor watches it crawl, which is the finding.
 *
 * The table is capped in the DOM, not in the data: a crawl can return forty
 * rows and the interesting ones are the failures, so failures sort up and the
 * rest are there to scroll.
 */

type Stage = 'idle' | 'running' | 'done';

interface PhaseState {
  readonly id: string;
  readonly state: 'start' | 'done' | 'skip';
  readonly detail?: string;
}

const SEVERITY_TONE: Record<Severity, string> = {
  critical: 'border-destructive/40 bg-destructive/10 text-destructive',
  warning: 'border-warning/40 bg-warning/10 text-warning',
  notice: 'border-hairline bg-surface text-muted-foreground',
};

function statusTone(page: CrawledPage): string {
  if (page.status === 0 || page.status >= 500) return 'text-destructive';
  if (page.status >= 400) return 'text-destructive';
  if (page.status >= 300) return 'text-warning';
  return 'text-signal';
}

function pathOf(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.pathname}${parsed.search}` || '/';
  } catch {
    return url;
  }
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface p-3.5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-lg font-semibold tabular-nums text-foreground">{value}</dd>
    </div>
  );
}

export function LiveCrawl({ locale, className }: { locale: SiteLocale; className?: string }) {
  const t = CRAWL_COPY[locale];
  const lp = (path: string) => localizedPath(locale, path);

  const [stage, setStage] = useState<Stage>('idle');
  const [url, setUrl] = useState('');
  const [phases, setPhases] = useState<PhaseState[]>([]);
  const [pages, setPages] = useState<CrawledPage[]>([]);
  const [result, setResult] = useState<CrawlResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  function applyEvent(event: CrawlEvent): void {
    if (event.type === 'phase') {
      setPhases((prev) => [...prev.filter((p) => p.id !== event.id), { id: event.id, state: event.state, detail: event.detail }]);
      return;
    }
    if (event.type === 'page') {
      setPages((prev) => [...prev, event.page]);
      return;
    }
    if (event.type === 'result') {
      setResult(event.result);
      setStage('done');
      return;
    }
    if (event.type === 'error') {
      const map = t.errors as Record<string, string>;
      setError(map[event.code] ?? t.errors.generic);
      setStage('idle');
    }
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
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
    setPhases([]);
    setPages([]);
    setResult(null);
    setStage('running');
    trackFormStart('live_crawl');

    try {
      const res = await fetch('/api/crawl', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: value }),
        signal: controller.signal,
      });

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
              applyEvent(JSON.parse(line) as CrawlEvent);
            } catch {
              // A split line completes on the next chunk.
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

  function reset(): void {
    abortRef.current?.abort();
    setStage('idle');
    setPages([]);
    setPhases([]);
    setResult(null);
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  // Failures first: a crawl of forty pages is read for what went wrong.
  const rows = [...pages].sort((a, b) => {
    const rank = (page: CrawledPage) => (page.status === 0 || page.status >= 400 ? 0 : page.status >= 300 ? 1 : 2);
    return rank(a) - rank(b) || a.depth - b.depth;
  });

  return (
    <div className={cn('w-full', className)}>
      {stage !== 'done' && (
        <form onSubmit={handleSubmit} noValidate>
          <div className="glass flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center sm:rounded-full sm:pl-5">
            <label htmlFor="crawl-url" className="sr-only">
              {t.placeholder}
            </label>
            <input
              ref={inputRef}
              id="crawl-url"
              name="url"
              type="text"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              placeholder={t.placeholder}
              value={url}
              disabled={stage === 'running'}
              onChange={(e) => setUrl(e.target.value)}
              className="h-11 w-full min-w-0 bg-transparent px-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:h-12 sm:px-0"
            />
            <button type="submit" disabled={stage === 'running'} className="btn btn-primary shrink-0 disabled:opacity-80">
              {stage === 'running' ? (
                <>
                  <span className="live-dot" aria-hidden />
                  {t.running}
                  {pages.length > 0 ? ` ${pages.length}` : ''}…
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
            className={cn('mt-3 px-1 font-mono text-[11px] uppercase tracking-[0.14em]', error ? 'text-warning' : 'text-muted-foreground')}
            role={error ? 'alert' : undefined}
          >
            {error ?? t.hint}
          </p>
        </form>
      )}

      {phases.length > 0 && stage !== 'done' && (
        <ol className="glass mt-4 space-y-1.5 rounded-2xl p-4 font-mono text-[11px] uppercase tracking-[0.12em]" aria-live="polite">
          {phases.map((phase) => (
            <li key={phase.id} className="flex items-start gap-2.5">
              <span className="mt-0.5 shrink-0">
                {phase.state === 'start' ? (
                  <span className="live-dot" aria-hidden />
                ) : phase.state === 'skip' ? (
                  <Minus className="size-3 text-muted-foreground" aria-hidden />
                ) : (
                  <Check className="size-3 text-signal" aria-hidden />
                )}
              </span>
              <span className={phase.state === 'start' ? 'text-brand' : 'text-muted-foreground'}>
                {CRAWL_PHASE_LABELS[phase.id]?.[locale] ?? phase.id}
                {phase.detail ? <span className="ml-2 normal-case tracking-normal text-foreground/70">{phase.detail}</span> : null}
              </span>
            </li>
          ))}
        </ol>
      )}

      {pages.length > 0 && (
        <div className="glass mt-4 overflow-hidden rounded-2xl">
          <div className="flex items-baseline justify-between gap-3 border-b border-hairline px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.pages}</p>
            <p className="font-mono text-[11px] tabular-nums text-brand">{pages.length}</p>
          </div>
          <div className="max-h-[26rem] overflow-y-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="sticky top-0 bg-surface">
                <tr className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  <th scope="col" className="px-4 py-2 font-medium">{t.table.url}</th>
                  <th scope="col" className="px-2 py-2 text-right font-medium">{t.table.status}</th>
                  <th scope="col" className="hidden px-2 py-2 text-right font-medium sm:table-cell">{t.table.depth}</th>
                  <th scope="col" className="hidden px-2 py-2 text-right font-medium sm:table-cell">{t.table.words}</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">{t.table.ttfb}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((page) => (
                  <tr key={page.url} className="border-t border-hairline/60">
                    <td className="max-w-[20rem] truncate px-4 py-2 text-foreground" title={page.url}>
                      {pathOf(page.url)}
                      {page.title ? (
                        <span className="block truncate text-[11px] text-muted-foreground">{page.title}</span>
                      ) : null}
                    </td>
                    <td className={cn('px-2 py-2 text-right font-mono tabular-nums', statusTone(page))}>
                      {page.status === 0 ? (page.error ?? 'err') : page.status}
                    </td>
                    <td className="hidden px-2 py-2 text-right font-mono tabular-nums text-muted-foreground sm:table-cell">{page.depth}</td>
                    <td className="hidden px-2 py-2 text-right font-mono tabular-nums text-muted-foreground sm:table-cell">{page.wordCount || '—'}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-muted-foreground">{page.ttfbMs || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {stage === 'done' && result && (
        <div className="mt-4 space-y-4" aria-live="polite">
          <div className="glass rounded-2xl p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.stats}</p>
            <dl className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              <StatCell label={t.statLabels.pages} value={String(result.report.stats.pages)} />
              <StatCell label={t.statLabels.ok} value={String(result.report.stats.ok)} />
              <StatCell label={t.statLabels.broken} value={String(result.report.stats.broken)} />
              <StatCell label={t.statLabels.redirected} value={String(result.report.stats.redirected)} />
              <StatCell label={t.statLabels.noindexed} value={String(result.report.stats.noindexed)} />
              <StatCell label={t.statLabels.avgWordCount} value={String(result.report.stats.avgWordCount)} />
              <StatCell label={t.statLabels.avgTtfbMs} value={`${result.report.stats.avgTtfbMs} ms`} />
              <StatCell label={t.statLabels.maxDepth} value={String(result.report.stats.maxDepth)} />
            </dl>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {t.scope(result.report.summary.crawled, t.stopReason[result.report.summary.stoppedBy])}
            </p>
          </div>

          <div className="glass rounded-2xl p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t.findings}</p>
            {result.report.issues.length === 0 ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.clean}</p>
            ) : (
              <ul className="mt-4 space-y-5">
                {result.report.issues.map((finding) => (
                  <li key={finding.id}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          'rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]',
                          SEVERITY_TONE[finding.severity],
                        )}
                      >
                        {SEVERITY_LABELS[finding.severity][locale]}
                      </span>
                      <span className="font-display text-base font-semibold tracking-[-0.01em] text-foreground">
                        {finding.label[locale]}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        {t.affected(finding.count)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{finding.detail[locale]}</p>
                    <ul className="mt-2 space-y-1">
                      {finding.urls.map((entry) => (
                        <li key={entry} className="truncate font-mono text-[11px] text-foreground/70" title={entry}>
                          {entry}
                        </li>
                      ))}
                      {finding.count > finding.urls.length ? (
                        <li className="font-mono text-[11px] text-muted-foreground">
                          {t.andMore(finding.count - finding.urls.length)}
                        </li>
                      ) : null}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-6 border-t border-hairline pt-4 text-[12px] leading-relaxed text-muted-foreground">{t.caveat}</p>
          </div>

          <div className="glass rounded-2xl p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Link href={`${lp('/get-started')}?website=${encodeURIComponent(result.startUrl)}`} className="btn btn-primary">
                {t.cta}
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                {t.rerun}
              </button>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">{t.ctaHint}</p>
          </div>
        </div>
      )}
    </div>
  );
}
