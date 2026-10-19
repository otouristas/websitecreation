/**
 * The free Search Console opportunity finder on /resources.
 *
 * A port of two detectors from the app's opportunity engine
 * (gsc-gemini-boost src/lib/seo/ctr.ts and opportunities.ts): striking
 * distance and low CTR, with the same CTR curve, thresholds and formulas, so
 * the free tool and the product give the same answer for the same rows. Keep
 * the numbers in step when the app changes them.
 *
 * Everything runs in the browser. The visitor's export never leaves the page.
 */

export interface QueryRow {
  readonly key: string;
  readonly clicks: number;
  readonly impressions: number;
  /** Ratio 0–1 */
  readonly ctr: number;
  readonly position: number;
}

/**
 * The app's baseline: a blended desktop and mobile, non-brand curve for
 * results pages with AI Overviews. Index = position (1-based).
 */
const INDUSTRY_CURVE: ReadonlyArray<number> = [
  0, 0.235, 0.135, 0.092, 0.066, 0.05, 0.039, 0.031, 0.025, 0.021, 0.018, 0.0135, 0.0115, 0.01, 0.0088, 0.0078,
  0.007, 0.0062, 0.0056, 0.005, 0.0045,
];
const TAIL_CTR = 0.002;

export function industryExpectedCtr(position: number): number {
  if (!Number.isFinite(position) || position <= 0) return 0;
  if (position <= 1) return INDUSTRY_CURVE[1];
  const max = INDUSTRY_CURVE.length - 1;
  if (position >= max) return Math.max(TAIL_CTR, INDUSTRY_CURVE[max] * Math.pow(0.88, position - max));
  const lo = Math.floor(position);
  const t = position - lo;
  return INDUSTRY_CURVE[lo] * (1 - t) + INDUSTRY_CURVE[lo + 1] * t;
}

/** Baseline CTR for whole positions 1–20, for tables and charts. */
export const BASELINE_CTR_TABLE: ReadonlyArray<{ position: number; ctr: number }> = INDUSTRY_CURVE.slice(1).map(
  (ctr, i) => ({ position: i + 1, ctr }),
);

export interface CtrModel {
  expected(position: number): number;
  /** Position buckets with at least five qualifying rows of the site's own data. */
  readonly learnedBuckets: number;
}

const MIN_IMPRESSIONS_PER_ROW = 30;
const BUCKETS = 20;
const PRIOR_WEIGHT = 12;

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** The site's own curve, shrunk toward the baseline where a position has few rows. */
export function buildCtrModel(rows: ReadonlyArray<QueryRow>): CtrModel {
  const buckets: number[][] = Array.from({ length: BUCKETS + 1 }, () => []);
  for (const row of rows) {
    if (row.impressions < MIN_IMPRESSIONS_PER_ROW || row.position <= 0) continue;
    const bucket = Math.round(row.position);
    if (bucket < 1 || bucket > BUCKETS) continue;
    buckets[bucket].push(row.ctr);
  }
  const learned = buckets.map((values, pos) => {
    if (pos === 0) return 0;
    const prior = industryExpectedCtr(pos);
    if (values.length === 0) return prior;
    const w = values.length / (values.length + PRIOR_WEIGHT);
    return w * median(values) + (1 - w) * prior;
  });
  // Never claim position 6 beats position 5.
  for (let pos = 2; pos <= BUCKETS; pos++) learned[pos] = Math.min(learned[pos], learned[pos - 1]);
  return {
    learnedBuckets: buckets.filter((b, i) => i > 0 && b.length >= 5).length,
    expected(position: number) {
      if (!Number.isFinite(position) || position <= 0) return 0;
      if (position <= 1) return learned[1];
      if (position >= BUCKETS) return industryExpectedCtr(position) * (learned[BUCKETS] / industryExpectedCtr(BUCKETS) || 1);
      const lo = Math.floor(position);
      const t = position - lo;
      return learned[lo] * (1 - t) + learned[lo + 1] * t;
    },
  };
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

export function brandTerms(input: string): string[] {
  return input
    .split(/[,\n]/)
    .map((t) => normalize(t))
    .filter((t) => t.length >= 2);
}

export function isBrandQuery(query: string, terms: ReadonlyArray<string>): boolean {
  if (terms.length === 0) return false;
  const q = normalize(query);
  return terms.some((t) => q.includes(t));
}

export type OpportunityKind = "striking_distance" | "ctr_gap";

export interface Opportunity {
  readonly kind: OpportunityKind;
  readonly query: string;
  readonly action: string;
  readonly reason: string;
  /** Estimated additional clicks per 30 days. */
  readonly impact: number;
  readonly confidence: number;
  readonly effort: "low" | "medium";
  readonly score: number;
  readonly row: QueryRow;
  readonly expectedCtr: number;
  readonly targetPosition?: number;
}

const EFFORT_WEIGHT = { low: 1, medium: 1.8 } as const;
const perMonth = (value: number, days: number) => (days > 0 ? (value * 30) / days : value);
const minImpressions = (days: number, per28: number) => Math.max(10, Math.round((per28 * days) / 28));
const pct = (r: number) => `${(r * 100).toFixed(1)}%`;
const n = (v: number) => Math.round(v).toLocaleString("en-US");

/** Queries ranking 4–20 with real demand. Same thresholds and formula as the app. */
export function findStrikingDistance(rows: ReadonlyArray<QueryRow>, days: number, model: CtrModel, brand: ReadonlyArray<string>): Opportunity[] {
  const floor = minImpressions(days, 150);
  const out: Opportunity[] = [];
  for (const row of rows) {
    if (row.position < 4 || row.position > 20 || row.impressions < floor) continue;
    if (isBrandQuery(row.key, brand)) continue;
    const onPageTwo = row.position > 10.5;
    const target = onPageTwo ? 8 : 3;
    // A query that under-clicks today will under-click at the target too.
    const ratio = model.expected(target) / Math.max(1e-6, model.expected(row.position));
    const baseCtr = row.ctr > 0 ? row.ctr : model.expected(row.position) * 0.5;
    const gain = row.impressions * Math.max(0, baseCtr * ratio - row.ctr);
    const impact = Math.round(perMonth(gain, days));
    if (impact < 5) continue;
    const effort = onPageTwo ? "medium" : "low";
    const confidence = onPageTwo ? 0.45 : 0.6;
    out.push({
      kind: "striking_distance",
      query: row.key,
      action: onPageTwo ? "Move it onto page 1" : "Push it into the top 3",
      reason: `Ranks ${row.position.toFixed(1)} with ${n(perMonth(row.impressions, days))} impressions a month. Position ${target} would be worth about ${n(impact)} more clicks a month.`,
      impact,
      confidence,
      effort,
      score: (impact * confidence) / EFFORT_WEIGHT[effort],
      row,
      expectedCtr: model.expected(target),
      targetPosition: target,
    });
  }
  return out.sort((a, b) => b.score - a.score);
}

/** Top-10 queries earning far fewer clicks than their position usually gets. */
export function findCtrGaps(rows: ReadonlyArray<QueryRow>, days: number, model: CtrModel, brand: ReadonlyArray<string>): Opportunity[] {
  const floor = minImpressions(days, 300);
  const out: Opportunity[] = [];
  for (const row of rows) {
    if (row.position <= 0 || row.position > 10 || row.impressions < floor) continue;
    if (isBrandQuery(row.key, brand)) continue;
    const expected = model.expected(row.position);
    if (expected <= 0 || row.ctr >= expected * 0.6) continue;
    // A rewrite rarely recovers the whole gap: assume half.
    const impact = Math.round(perMonth(row.impressions * (expected - row.ctr) * 0.5, days));
    if (impact < 5) continue;
    const confidence = 0.55;
    out.push({
      kind: "ctr_gap",
      query: row.key,
      action: "Rewrite the title and description",
      reason: `CTR is ${pct(row.ctr)} at position ${row.position.toFixed(1)}, where ${pct(expected)} is typical at that position. A sharper snippet could add about ${n(impact)} clicks a month.`,
      impact,
      confidence,
      effort: "low",
      score: impact * confidence,
      row,
      expectedCtr: expected,
    });
  }
  return out.sort((a, b) => b.score - a.score);
}

export interface Analysis {
  readonly rows: number;
  readonly brandRows: number;
  readonly clicksPerMonth: number;
  readonly learnedBuckets: number;
  /** Each query appears once, under its biggest opportunity. */
  readonly opportunities: ReadonlyArray<Opportunity>;
  readonly forecast: { readonly conservative: number; readonly expected: number; readonly ceiling: number };
}

export function analyze(rows: ReadonlyArray<QueryRow>, days: number, brandInput: string): Analysis {
  const brand = brandTerms(brandInput);
  const nonBrand = rows.filter((r) => !isBrandQuery(r.key, brand));
  // Learn the curve from non-brand rows: brand queries click far above any curve.
  const model = buildCtrModel(nonBrand);
  const all = [...findStrikingDistance(rows, days, model, brand), ...findCtrGaps(rows, days, model, brand)];
  const best = new Map<string, Opportunity>();
  for (const o of all) {
    const prev = best.get(o.query);
    if (!prev || o.score > prev.score) best.set(o.query, o);
  }
  const opportunities = [...best.values()].sort((a, b) => b.score - a.score);
  const ceiling = opportunities.reduce((s, o) => s + o.impact, 0);
  const expected = opportunities.reduce((s, o) => s + o.impact * o.confidence, 0);
  return {
    rows: rows.length,
    brandRows: rows.length - nonBrand.length,
    clicksPerMonth: Math.round(perMonth(rows.reduce((s, r) => s + r.clicks, 0), days)),
    learnedBuckets: model.learnedBuckets,
    opportunities,
    forecast: {
      // Only the top ten, at their confidence: what a team ships in a month or two.
      conservative: Math.round(opportunities.slice(0, 10).reduce((s, o) => s + o.impact * o.confidence, 0)),
      expected: Math.round(expected),
      ceiling: Math.round(ceiling),
    },
  };
}
