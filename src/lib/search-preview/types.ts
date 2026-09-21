import type { MarketId } from './markets';

/**
 * One keyword, three surfaces.
 *
 * The homepage section `AiSearchSplit` tells this story with a fixed tourism
 * example: the classic Google result, the AI Overview above it, and the chat
 * answer that names you. This is the same story, run live through DataForSEO
 * for a keyword the visitor types, with their own domain highlighted wherever
 * it shows up.
 *
 * Every field is what the panel renders - no raw API payload reaches the
 * browser, so the response stays small and the upstream shape stays ours to
 * change.
 */

export interface OrganicResult {
  /** `rank_group`: position among organic results, not among every SERP element. */
  readonly rank: number;
  readonly title: string;
  readonly url: string;
  readonly domain: string;
  /** Google's own display path, e.g. `your-hotel.gr › rooms`. */
  readonly breadcrumb: string;
  readonly snippet: string;
  /** True when this result belongs to the domain the visitor is tracking. */
  readonly isMatch: boolean;
}

export interface GooglePanel {
  readonly results: readonly OrganicResult[];
  readonly matched: boolean;
  readonly matchRank: number | null;
}

/** A cited page, from either the AI Overview's references or ChatGPT's annotations. */
export interface SourceLink {
  readonly title: string;
  readonly domain: string;
  readonly url: string;
  readonly isMatch: boolean;
}

export interface AiOverviewPanel {
  /** False when Google showed no AI Overview for this query - which is itself a finding. */
  readonly present: boolean;
  readonly blocks: readonly string[];
  readonly references: readonly SourceLink[];
  readonly matched: boolean;
}

export interface ChatPanel {
  /** False when the LLM call failed; the other two panels still render. */
  readonly available: boolean;
  readonly model: string | null;
  readonly answer: string;
  readonly citations: readonly SourceLink[];
  readonly matched: boolean;
}

export interface SearchPreviewResult {
  readonly keyword: string;
  readonly market: MarketId;
  /** Normalised bare host the visitor asked us to look for, or null. */
  readonly domain: string | null;
  readonly fetchedAt: string;
  /** True for the built-in example, so the UI can label it rather than pass it off as live. */
  readonly sample: boolean;
  readonly google: GooglePanel;
  readonly aiOverview: AiOverviewPanel;
  readonly chat: ChatPanel;
}

export type SearchPreviewErrorCode =
  | 'invalid_keyword'
  | 'keyword_too_long'
  | 'invalid_domain'
  | 'invalid_market'
  | 'rate_limited'
  | 'daily_limit'
  | 'unconfigured'
  | 'no_results'
  | 'timeout'
  | 'upstream'
  | 'generic';

export interface SearchPreviewError {
  readonly error: SearchPreviewErrorCode;
}
