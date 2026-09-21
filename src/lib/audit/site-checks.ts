import type { CrawlPageInternal, CrawlSummary, CrawledPage } from './crawl';
import type { Localized } from './types';

/**
 * The findings that only exist once you have crawled more than one page.
 *
 * Everything the single-page audit reports can be judged from one document.
 * These cannot: a duplicate title needs a second title to duplicate, a broken
 * link needs the page that points at it, an orphan needs the set of pages that
 * failed to link it. This is the entire reason to crawl.
 *
 * The near-duplicate detector is adapted from LibreCrawl (MIT, Copyright (c)
 * 2025 Phiality) - the weighted Dice comparison over title, description and H1
 * token sets, the word-count length term, and the short-circuit that abandons
 * a pair as soon as the remaining weights cannot reach the threshold. See
 * NOTICE.md. The weights below are theirs, and they are good: title and
 * description carry most of the signal because a templated page duplicates
 * those first, while raw body overlap on a real site is noisy (shared nav,
 * footer and boilerplate inflate it on every pair).
 */

export type Severity = 'critical' | 'warning' | 'notice';

export interface SiteIssue {
  readonly id: string;
  readonly severity: Severity;
  readonly label: Localized;
  readonly detail: Localized;
  /** The URLs this finding is about, capped for rendering. */
  readonly urls: readonly string[];
  readonly count: number;
}

export interface SiteReport {
  readonly issues: readonly SiteIssue[];
  readonly stats: {
    readonly pages: number;
    readonly htmlPages: number;
    readonly ok: number;
    readonly broken: number;
    readonly redirected: number;
    readonly noindexed: number;
    readonly avgWordCount: number;
    readonly avgTtfbMs: number;
    readonly maxDepth: number;
    readonly totalBytes: number;
  };
  readonly summary: CrawlSummary;
}

const DUP_WEIGHTS = { title: 0.35, desc: 0.35, h1: 0.2, wordCount: 0.1 } as const;
const DUP_THRESHOLD = 0.85;
/** Above this many pages the pairwise pass is skipped; it is O(n²). */
const DUP_MAX_PAGES = 120;
const URL_SAMPLE = 8;

function tokens(text: string | null): Set<string> {
  if (!text) return new Set();
  return new Set(
    text
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((word) => word.length > 2),
  );
}

/** Dice coefficient of two token sets; zero when either is empty. */
function dice(a: ReadonlySet<string>, b: ReadonlySet<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const token of small) if (large.has(token)) shared += 1;
  return (2 * shared) / (a.size + b.size);
}

function lengthSimilarity(a: number, b: number): number {
  if (!a || !b) return 0;
  return Math.min(a, b) / Math.max(a, b);
}

interface DupCandidate {
  readonly url: string;
  readonly title: Set<string>;
  readonly desc: Set<string>;
  readonly h1: Set<string>;
  readonly wordCount: number;
}

/**
 * Weighted similarity, or null once the remaining weights cannot reach the
 * threshold. The early exits are what keep the pairwise pass affordable.
 */
function similarity(a: DupCandidate, b: DupCandidate, threshold: number): number | null {
  let score = dice(a.title, b.title) * DUP_WEIGHTS.title;
  if (score + DUP_WEIGHTS.desc + DUP_WEIGHTS.h1 + DUP_WEIGHTS.wordCount < threshold) return null;
  score += dice(a.desc, b.desc) * DUP_WEIGHTS.desc;
  if (score + DUP_WEIGHTS.h1 + DUP_WEIGHTS.wordCount < threshold) return null;
  score += dice(a.h1, b.h1) * DUP_WEIGHTS.h1;
  if (score + DUP_WEIGHTS.wordCount < threshold) return null;
  score += lengthSimilarity(a.wordCount, b.wordCount) * DUP_WEIGHTS.wordCount;
  return score >= threshold ? score : null;
}

function issue(
  id: string,
  severity: Severity,
  label: Localized,
  detail: Localized,
  urls: readonly string[],
): SiteIssue {
  return { id, severity, label, detail, urls: urls.slice(0, URL_SAMPLE), count: urls.length };
}

/** Groups pages by a normalised field value, returning only the collisions. */
function collisions(
  pages: readonly CrawledPage[],
  read: (page: CrawledPage) => string | null,
): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const page of pages) {
    const value = read(page)?.trim().toLowerCase();
    if (!value) continue;
    const bucket = groups.get(value) ?? [];
    bucket.push(page.url);
    groups.set(value, bucket);
  }
  for (const [key, urls] of groups) if (urls.length < 2) groups.delete(key);
  return groups;
}

export function buildSiteReport(
  crawled: readonly CrawlPageInternal[],
  sitemapUrls: readonly string[],
  summary: CrawlSummary,
): SiteReport {
  const pages = crawled.map((entry) => entry.page);
  const html = pages.filter((page) => page.isHtml);
  const issues: SiteIssue[] = [];

  // ------------------------------------------------------- broken internals
  const broken = pages.filter((page) => page.status >= 400 || page.status === 0);
  if (broken.length > 0) {
    issues.push(
      issue(
        'broken_links',
        'critical',
        { en: 'Broken internal links', el: 'Σπασμένοι εσωτερικοί σύνδεσμοι' },
        {
          en: 'These URLs are linked from your own pages and do not answer. Every one wastes crawl budget and dead-ends a visitor.',
          el: 'Αυτές οι διευθύνσεις έχουν συνδέσμους από τις σελίδες σας και δεν απαντούν. Κάθε μία σπαταλά crawl budget και οδηγεί τον επισκέπτη σε αδιέξοδο.',
        },
        broken.map((page) => `${page.url} → ${page.error ?? `HTTP ${page.status}`}${page.linkedFrom[0] ? ` (from ${page.linkedFrom[0]})` : ''}`),
      ),
    );
  }

  // ---------------------------------------------------------- redirect hops
  const redirected = summary.redirects;
  if (redirected.length > 0) {
    issues.push(
      issue(
        'internal_redirects',
        'warning',
        { en: 'Internal links point at redirects', el: 'Εσωτερικοί σύνδεσμοι δείχνουν σε ανακατευθύνσεις' },
        {
          en: 'Link straight to the final URL. Each hop is a round trip you are paying for on every crawl and every visit.',
          el: 'Συνδέστε απευθείας στην τελική διεύθυνση. Κάθε βήμα είναι ένα ταξίδι που πληρώνετε σε κάθε σάρωση και κάθε επίσκεψη.',
        },
        redirected.map((hop) => `${hop.from} → ${hop.to} (${hop.hops} hop${hop.hops === 1 ? '' : 's'})`),
      ),
    );
  }

  // ------------------------------------------------- duplicate title / desc
  const dupTitles = collisions(html, (page) => page.title);
  if (dupTitles.size > 0) {
    issues.push(
      issue(
        'duplicate_titles',
        'critical',
        { en: 'Duplicate title tags', el: 'Διπλότυποι τίτλοι' },
        {
          en: 'Pages sharing a title compete with each other for the same query, and search engines pick one - usually not the one that converts.',
          el: 'Σελίδες με ίδιο τίτλο ανταγωνίζονται μεταξύ τους για το ίδιο ερώτημα και οι μηχανές διαλέγουν μία, συνήθως όχι αυτή που φέρνει πελάτες.',
        },
        [...dupTitles.entries()].map(([title, urls]) => `"${title.slice(0, 60)}" × ${urls.length}: ${urls.slice(0, 3).join(', ')}`),
      ),
    );
  }

  const dupDescriptions = collisions(html, (page) => page.description);
  if (dupDescriptions.size > 0) {
    issues.push(
      issue(
        'duplicate_descriptions',
        'warning',
        { en: 'Duplicate meta descriptions', el: 'Διπλότυπες meta περιγραφές' },
        {
          en: 'One description reused across pages tells a searcher nothing about which result to click.',
          el: 'Μία περιγραφή σε πολλές σελίδες δεν λέει στον χρήστη ποιο αποτέλεσμα να επιλέξει.',
        },
        [...dupDescriptions.values()].map((urls) => `${urls.length} pages: ${urls.slice(0, 3).join(', ')}`),
      ),
    );
  }

  // ------------------------------------------------- near-duplicate content
  const candidates: DupCandidate[] = html
    .filter((page) => page.status >= 200 && page.status < 300 && page.wordCount > 0)
    .map((page) => ({
      url: page.url,
      title: tokens(page.title),
      desc: tokens(page.description),
      h1: tokens(page.h1Text),
      wordCount: page.wordCount,
    }));

  if (candidates.length > 1 && candidates.length <= DUP_MAX_PAGES) {
    const pairs: string[] = [];
    for (let i = 0; i < candidates.length; i += 1) {
      for (let j = i + 1; j < candidates.length; j += 1) {
        const score = similarity(candidates[i], candidates[j], DUP_THRESHOLD);
        if (score !== null) {
          pairs.push(`${Math.round(score * 100)}% · ${candidates[i].url} ≈ ${candidates[j].url}`);
        }
      }
    }
    if (pairs.length > 0) {
      issues.push(
        issue(
          'near_duplicate_content',
          'warning',
          { en: 'Near-duplicate pages', el: 'Σχεδόν διπλότυπες σελίδες' },
          {
            en: 'These pages are close enough that they read as the same page. Merge them, or make each one answer a different question.',
            el: 'Αυτές οι σελίδες είναι τόσο κοντά που διαβάζονται ως η ίδια σελίδα. Ενοποιήστε τες ή κάντε την καθεμία να απαντά σε διαφορετικό ερώτημα.',
          },
          pairs,
        ),
      );
    }
  }

  // ----------------------------------------------------------- orphan pages
  const crawledKeys = new Set(pages.map((page) => page.url.replace(/\/$/, '')));
  const linkedKeys = new Set(
    pages.flatMap((page) => [...page.linkedFrom]).map((url) => url.replace(/\/$/, '')),
  );
  const orphans = sitemapUrls
    .map((url) => url.replace(/\/$/, ''))
    .filter((url) => crawledKeys.has(url) && !linkedKeys.has(url))
    .filter((url) => {
      const page = pages.find((p) => p.url.replace(/\/$/, '') === url);
      return page ? page.depth > 0 : false;
    });
  if (orphans.length > 0) {
    issues.push(
      issue(
        'orphan_pages',
        'warning',
        { en: 'Pages in the sitemap nothing links to', el: 'Σελίδες στο sitemap χωρίς εσωτερικούς συνδέσμους' },
        {
          en: 'Your sitemap lists them but no crawled page links to them. Orphans get crawled last and rank worst.',
          el: 'Το sitemap τις αναφέρει αλλά καμία σαρωμένη σελίδα δεν τις συνδέει. Οι ορφανές σελίδες σαρώνονται τελευταίες και κατατάσσονται χειρότερα.',
        },
        orphans,
      ),
    );
  }

  // ----------------------------------------------- per-page rollups at scale
  const missingTitle = html.filter((page) => !page.title && page.status < 400).map((page) => page.url);
  if (missingTitle.length > 0) {
    issues.push(
      issue('missing_titles', 'critical',
        { en: 'Pages with no title tag', el: 'Σελίδες χωρίς τίτλο' },
        { en: 'A page without a title has nothing to show in a result.', el: 'Μια σελίδα χωρίς τίτλο δεν έχει τι να δείξει στα αποτελέσματα.' },
        missingTitle),
    );
  }

  const missingDescription = html.filter((page) => !page.description && page.status < 400).map((page) => page.url);
  if (missingDescription.length > 0) {
    issues.push(
      issue('missing_descriptions', 'warning',
        { en: 'Pages with no meta description', el: 'Σελίδες χωρίς meta περιγραφή' },
        { en: 'Google writes its own when you do not, and it writes for relevance, not for clicks.', el: 'Το Google γράφει τη δική του όταν λείπει, και τη γράφει για συνάφεια, όχι για κλικ.' },
        missingDescription),
    );
  }

  const badH1 = html.filter((page) => page.status < 400 && page.h1Count !== 1).map((page) => `${page.url} (${page.h1Count} H1)`);
  if (badH1.length > 0) {
    issues.push(
      issue('h1_problems', 'warning',
        { en: 'Pages without exactly one H1', el: 'Σελίδες χωρίς ακριβώς ένα H1' },
        { en: 'One H1 per page, carrying the phrase that page is for.', el: 'Ένα H1 ανά σελίδα, με τη φράση για την οποία υπάρχει η σελίδα.' },
        badH1),
    );
  }

  const noCanonical = html.filter((page) => page.status < 400 && !page.canonical).map((page) => page.url);
  if (noCanonical.length > 0) {
    issues.push(
      issue('missing_canonicals', 'warning',
        { en: 'Pages with no canonical URL', el: 'Σελίδες χωρίς canonical' },
        { en: 'Without a self-referencing canonical, every parameter and slash variant is a separate page to a crawler.', el: 'Χωρίς canonical προς την ίδια σελίδα, κάθε παραλλαγή παραμέτρου και καθέτου είναι ξεχωριστή σελίδα για ένα crawler.' },
        noCanonical),
    );
  }

  const thin = html.filter((page) => page.status < 400 && page.wordCount > 0 && page.wordCount < 250).map((page) => `${page.url} (${page.wordCount} words)`);
  if (thin.length > 0) {
    issues.push(
      issue('thin_content', 'warning',
        { en: 'Thin pages', el: 'Σελίδες με λίγο περιεχόμενο' },
        { en: 'Under 250 words gives a search engine almost nothing to match a query against.', el: 'Κάτω από 250 λέξεις δεν δίνει στις μηχανές σχεδόν τίποτα να ταιριάξουν με ένα ερώτημα.' },
        thin),
    );
  }

  const noindexed = html.filter((page) => page.noindex).map((page) => page.url);
  if (noindexed.length > 0) {
    issues.push(
      issue('noindexed_pages', 'critical',
        { en: 'Pages excluded from the index', el: 'Σελίδες εκτός ευρετηρίου' },
        { en: 'These carry noindex. If any of them is meant to rank, that directive is why it does not.', el: 'Αυτές έχουν noindex. Αν κάποια πρέπει να κατατάσσεται, αυτή η οδηγία είναι ο λόγος που δεν το κάνει.' },
        noindexed),
    );
  }

  const missingAlt = html
    .filter((page) => page.imagesTotal > 0 && page.imagesWithAlt / page.imagesTotal < 0.8)
    .map((page) => `${page.url} (${page.imagesWithAlt}/${page.imagesTotal})`);
  if (missingAlt.length > 0) {
    issues.push(
      issue('images_without_alt', 'notice',
        { en: 'Pages with images missing alt text', el: 'Σελίδες με εικόνες χωρίς alt' },
        { en: 'Describe every meaningful image; leave decorative ones alt="".', el: 'Περιγράψτε κάθε ουσιαστική εικόνα και αφήστε τις διακοσμητικές με alt="".' },
        missingAlt),
    );
  }

  const noSchema = html.filter((page) => page.status < 400 && page.jsonLdTypes.length === 0).map((page) => page.url);
  if (noSchema.length > 0) {
    issues.push(
      issue('no_structured_data', 'warning',
        { en: 'Pages with no structured data', el: 'Σελίδες χωρίς δομημένα δεδομένα' },
        { en: 'Without JSON-LD a machine has to infer what the page is. Answer engines quote what they can read without guessing.', el: 'Χωρίς JSON-LD, μια μηχανή πρέπει να μαντέψει τι είναι η σελίδα. Οι μηχανές απαντήσεων αναφέρουν ό,τι διαβάζουν χωρίς εικασίες.' },
        noSchema),
    );
  }

  const order: Record<Severity, number> = { critical: 0, warning: 1, notice: 2 };
  issues.sort((a, b) => order[a.severity] - order[b.severity] || b.count - a.count);

  const withTiming = pages.filter((page) => page.ttfbMs > 0);
  const withWords = html.filter((page) => page.wordCount > 0);

  return {
    issues,
    stats: {
      pages: pages.length,
      htmlPages: html.length,
      ok: pages.filter((page) => page.status >= 200 && page.status < 300).length,
      broken: broken.length,
      redirected: redirected.length,
      noindexed: noindexed.length,
      avgWordCount: withWords.length
        ? Math.round(withWords.reduce((n, page) => n + page.wordCount, 0) / withWords.length)
        : 0,
      avgTtfbMs: withTiming.length
        ? Math.round(withTiming.reduce((n, page) => n + page.ttfbMs, 0) / withTiming.length)
        : 0,
      maxDepth: pages.reduce((n, page) => Math.max(n, page.depth), 0),
      totalBytes: pages.reduce((n, page) => n + page.bytes, 0),
    },
    summary,
  };
}
