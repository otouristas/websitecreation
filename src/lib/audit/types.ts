import type { AgentVerdict } from './robots';

/**
 * The shapes the audit route emits and the widget renders.
 *
 * Kept free of any Node import so the client bundle can type against the same
 * file the route builds - the widget renders the checks straight off the wire,
 * labels and all, and a drifting duplicate here would show up as wrong copy in
 * front of a lead rather than as a compile error.
 */

export type Pillar = 'technical' | 'content' | 'performance' | 'ai';

export const PILLARS: readonly Pillar[] = ['technical', 'content', 'performance', 'ai'];

export type CheckState = 'pass' | 'warn' | 'fail';

export interface Localized {
  readonly en: string;
  readonly el: string;
}

export interface AuditCheck {
  readonly id: string;
  readonly pillar: Pillar;
  /** Share of the pillar's score. A `warn` earns half of it. */
  readonly weight: number;
  readonly state: CheckState;
  readonly label: Localized;
  /** What we measured, verbatim. Locale-independent: numbers and values. */
  readonly value?: string;
  readonly fix: Localized;
}

export interface PillarScore {
  readonly pillar: Pillar;
  readonly score: number;
  readonly passed: number;
  readonly total: number;
  readonly failed: number;
}

/**
 * Every number on this object was measured on this request. Nothing is
 * modelled, averaged or carried over from another site - if a probe did not
 * complete, the field is null and the UI says so rather than filling in.
 */
export interface AuditMetrics {
  readonly ttfbMs: number;
  readonly downloadMs: number;
  readonly totalMs: number;
  readonly redirectHops: number;
  readonly htmlBytes: number;
  readonly transferBytes: number;
  readonly compression: string | null;
  readonly server: string | null;
  readonly wordCount: number;
  readonly textRatio: number;
  readonly imageCount: number;
  readonly altCoverage: number;
  readonly renderBlockingScripts: number;
  readonly externalScripts: number;
  readonly thirdPartyHosts: readonly string[];
  readonly stylesheets: number;
  readonly inlineBytes: number;
  readonly internalLinks: number;
  readonly externalLinks: number;
  readonly headings: Readonly<Record<string, number>>;
  readonly jsonLdTypes: readonly string[];
  readonly hreflangCount: number;
  readonly robotsPresent: boolean;
  readonly sitemapUrls: number | null;
  readonly sitemapIsIndex: boolean;
  readonly llmsTxt: boolean;
  readonly notFoundStatus: number | null;
  readonly title: string | null;
  readonly description: string | null;
  readonly lang: string | null;
}

export interface AuditResult {
  /** What the visitor typed. */
  readonly url: string;
  /** What we ended up measuring, after redirects. */
  readonly finalUrl: string;
  readonly scannedAt: string;
  readonly score: number;
  readonly grade: 'A' | 'B' | 'C' | 'D' | 'F';
  readonly pillars: readonly PillarScore[];
  readonly checks: readonly AuditCheck[];
  /** The failures that cost the most, worst first, at most six. */
  readonly priorities: readonly AuditCheck[];
  readonly metrics: AuditMetrics;
  readonly aiAccess: readonly AgentVerdict[];
  readonly searchAccess: readonly AgentVerdict[];
  /** Milliseconds of real work, start to finish. */
  readonly elapsedMs: number;
}

/** One line on the wire while the audit runs. */
export type AuditEvent =
  | { readonly type: 'step'; readonly id: string; readonly state: 'start' | 'done' | 'skip'; readonly detail?: string }
  | { readonly type: 'metric'; readonly id: string; readonly value: string }
  | { readonly type: 'result'; readonly result: AuditResult }
  | { readonly type: 'error'; readonly code: string };

export const STEP_IDS = [
  'resolve',
  'homepage',
  'parse',
  'robots',
  'sitemap',
  'ai',
  'notfound',
  'score',
] as const;

export type StepId = (typeof STEP_IDS)[number];
