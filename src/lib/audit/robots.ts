/**
 * robots.txt, read the way the crawlers read it.
 *
 * This file exists because "can AI answer engines read this site?" is a
 * question with a factual answer, and the answer is usually sitting in a file
 * nobody has opened since the site launched. A blanket `Disallow: /` under
 * `User-agent: *` silently excludes every assistant that respects the
 * standard, and plenty of hosting panels and WordPress plugins ship one.
 *
 * Matching follows the de-facto rules the major crawlers implement: group by
 * user-agent, exact (case-insensitive) agent token beats `*`, and within the
 * chosen group the longest matching path rule wins, with `Allow` beating
 * `Disallow` on an equal-length tie.
 */

export interface RobotsGroup {
  readonly agents: readonly string[];
  readonly allow: readonly string[];
  readonly disallow: readonly string[];
}

export interface RobotsFile {
  readonly present: boolean;
  readonly groups: readonly RobotsGroup[];
  readonly sitemaps: readonly string[];
  readonly bytes: number;
}

/**
 * The agents worth reporting on, and what each one actually gates.
 *
 * `purpose` is rendered next to the verdict, because "GPTBot is blocked" only
 * means something to a business owner once they know GPTBot is the crawler
 * that decides whether ChatGPT has ever read their site.
 */
export interface AiAgent {
  readonly id: string;
  readonly token: string;
  readonly labelEn: string;
  readonly labelEl: string;
  /** Weight in the AI-access sub-score; the answer engines people ask by name lead. */
  readonly weight: number;
}

export const AI_AGENTS: readonly AiAgent[] = [
  { id: 'oai-search', token: 'OAI-SearchBot', labelEn: 'ChatGPT search', labelEl: 'Αναζήτηση ChatGPT', weight: 3 },
  { id: 'gptbot', token: 'GPTBot', labelEn: 'OpenAI GPTBot', labelEl: 'OpenAI GPTBot', weight: 2 },
  { id: 'claudebot', token: 'ClaudeBot', labelEn: 'Claude', labelEl: 'Claude', weight: 2 },
  { id: 'perplexity', token: 'PerplexityBot', labelEn: 'Perplexity', labelEl: 'Perplexity', weight: 3 },
  { id: 'google-extended', token: 'Google-Extended', labelEn: 'Google AI Overviews', labelEl: 'Google AI Overviews', weight: 3 },
  { id: 'applebot-extended', token: 'Applebot-Extended', labelEn: 'Apple Intelligence', labelEl: 'Apple Intelligence', weight: 1 },
  { id: 'ccbot', token: 'CCBot', labelEn: 'Common Crawl', labelEl: 'Common Crawl', weight: 1 },
];

/** The two crawlers that gate classic organic search; blocking either is fatal. */
export const SEARCH_AGENTS: readonly AiAgent[] = [
  { id: 'googlebot', token: 'Googlebot', labelEn: 'Googlebot', labelEl: 'Googlebot', weight: 5 },
  { id: 'bingbot', token: 'Bingbot', labelEn: 'Bingbot', labelEl: 'Bingbot', weight: 2 },
];

export function parseRobots(text: string): RobotsFile {
  const groups: RobotsGroup[] = [];
  const sitemaps: string[] = [];
  let agents: string[] = [];
  let allow: string[] = [];
  let disallow: string[] = [];
  let lastWasAgent = false;

  const flush = (): void => {
    if (agents.length) groups.push({ agents, allow, disallow });
    agents = [];
    allow = [];
    disallow = [];
  };

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim();
    if (!line) continue;
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const field = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (field === 'user-agent') {
      // A new agent line after rules closes the previous group.
      if (!lastWasAgent) flush();
      agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (field === 'allow') allow.push(value);
    else if (field === 'disallow') disallow.push(value);
    else if (field === 'sitemap' && value) sitemaps.push(value);
  }
  flush();

  return {
    present: true,
    groups,
    sitemaps: Array.from(new Set(sitemaps)).slice(0, 20),
    bytes: text.length,
  };
}

export const ABSENT_ROBOTS: RobotsFile = {
  present: false,
  groups: [],
  sitemaps: [],
  bytes: 0,
};

/** Turns a robots path pattern into a matcher, honouring `*` and `$`. */
function matches(pattern: string, path: string): boolean {
  if (pattern === '') return false;
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  const anchored = escaped.endsWith('$') ? `^${escaped}` : `^${escaped}`;
  try {
    return new RegExp(anchored).test(path);
  } catch {
    return false;
  }
}

/** The rule length that decides precedence; `$` is punctuation, not length. */
function ruleLength(pattern: string): number {
  return pattern.replace(/\$$/, '').length;
}

function groupFor(robots: RobotsFile, token: string): RobotsGroup | null {
  const wanted = token.toLowerCase();
  const exact = robots.groups.find((g) => g.agents.includes(wanted));
  if (exact) return exact;
  // Some sites write `User-agent: claudebot/1.0` or a bare prefix.
  const prefixed = robots.groups.find((g) =>
    g.agents.some((a) => a !== '*' && (wanted.startsWith(a) || a.startsWith(wanted))),
  );
  if (prefixed) return prefixed;
  return robots.groups.find((g) => g.agents.includes('*')) ?? null;
}

/**
 * Can `token` fetch `path`?
 *
 * No robots.txt at all means everything is allowed, which is the standard's
 * own default and the state most small sites are in.
 */
export function isAllowed(robots: RobotsFile, token: string, path = '/'): boolean {
  if (!robots.present) return true;
  const group = groupFor(robots, token);
  if (!group) return true;

  let bestAllow = -1;
  let bestDisallow = -1;
  for (const rule of group.allow) if (matches(rule, path)) bestAllow = Math.max(bestAllow, ruleLength(rule));
  for (const rule of group.disallow) {
    // `Disallow:` with an empty value means "allow everything" for the group.
    if (rule === '') continue;
    if (matches(rule, path)) bestDisallow = Math.max(bestDisallow, ruleLength(rule));
  }
  if (bestDisallow === -1) return true;
  return bestAllow >= bestDisallow;
}

/** True when the group that applies to `token` carries a site-wide block. */
export function isFullyBlocked(robots: RobotsFile, token: string): boolean {
  if (!robots.present) return false;
  const group = groupFor(robots, token);
  if (!group) return false;
  return group.disallow.some((rule) => rule === '/' || rule === '/*') && !group.allow.includes('/');
}

export interface AgentVerdict extends AiAgent {
  readonly allowed: boolean;
  /** Explicit means the agent has its own group, not a `*` fallback. */
  readonly explicit: boolean;
}

export function judgeAgents(
  robots: RobotsFile,
  agents: readonly AiAgent[],
): AgentVerdict[] {
  return agents.map((agent) => {
    const token = agent.token.toLowerCase();
    const explicit = robots.groups.some((g) => g.agents.includes(token));
    return { ...agent, allowed: isAllowed(robots, agent.token, '/'), explicit };
  });
}

/** Counts `<loc>` entries and notes whether the document is an index of sitemaps. */
export function readSitemap(xml: string): { urls: number; isIndex: boolean } {
  const isIndex = /<sitemapindex[\s>]/i.test(xml);
  const urls = (xml.match(/<loc\b[^>]*>/gi) ?? []).length;
  return { urls, isIndex };
}
