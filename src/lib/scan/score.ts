import type { ScanCheck, ScanMeta } from './checks';

export interface ScanResult {
  readonly url: string;
  readonly finalUrl: string;
  readonly status: number;
  readonly ttfbMs: number;
  readonly observedAt?: string;
  readonly scope?: 'requested-page-html';
  readonly truncated?: boolean;
  readonly score: number;
  readonly passed: number;
  readonly total: number;
  readonly checks: readonly ScanCheck[];
  /** Observed issues first, then optional advisories; at most three. */
  readonly topIssues: readonly ScanCheck[];
  readonly meta: Pick<ScanMeta, 'title' | 'description' | 'h1Count' | 'jsonLdTypes' | 'hreflangCount' | 'lang'>;
}

export function scoreChecks(checks: readonly ScanCheck[]): {
  score: number;
  passed: number;
  total: number;
  topIssues: ScanCheck[];
} {
  const totalWeight = checks.reduce((n, c) => n + c.weight, 0);
  const earned = checks.filter((c) => c.pass).reduce((n, c) => n + c.weight, 0);
  const score = totalWeight === 0 ? 0 : Math.round((earned / totalWeight) * 100);
  const topIssues = checks
    .filter((c) => !c.pass && c.severity !== 'info')
    .sort((a, b) => Number(b.severity === 'issue') - Number(a.severity === 'issue') || b.weight - a.weight)
    .slice(0, 3);
  return { score, passed: checks.filter((c) => c.pass).length, total: checks.length, topIssues };
}
