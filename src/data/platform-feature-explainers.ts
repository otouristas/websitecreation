/**
 * Long-form explainers for platform feature pages.
 *
 * Scope boundary - read before adding to this file
 * ------------------------------------------------
 * The product application is a separate codebase (app.anotherseoguru.com); it is
 * not in this repository. That means no claim about what the software does,
 * which inputs it accepts, what it outputs or where its limits are can be
 * verified from here.
 *
 * So this file deliberately contains **discipline knowledge, not product
 * specifications**: what the technique is, why it matters, how practitioners
 * use the output. Those statements are true independently of any tool, which is
 * what makes them safe to publish. Product capability claims stay where they
 * already were - `marketing-features.json`, authored by the business - and are
 * rendered separately, above this content.
 *
 * If you later have the app source, feature-specific inputs/outputs/limitations
 * can be added here and marked as verified. Until then, do not.
 */

export interface ExplainerSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

export interface FeatureExplainer {
  /** One-paragraph definition answering "what is X" directly. */
  readonly directAnswer: string;
  readonly sections: readonly ExplainerSection[];
  readonly faqs: readonly { question: string; answer: string }[];
  /** Related reading on this site, as [path, label]. */
  readonly furtherReading?: readonly (readonly [string, string])[];
}

export const FEATURE_EXPLAINERS: Record<string, FeatureExplainer> = {
  'semantic-keyword-clustering': {
    directAnswer:
      'Semantic keyword clustering is the practice of grouping keywords by the meaning and intent behind them rather than by the words they share. Two phrases can look almost identical and belong on different pages, while two phrases with no words in common can belong on the same one. Clustering decides how many pages a topic actually needs, and what each of them should cover.',
    sections: [
      {
        heading: 'Why string matching is not enough',
        paragraphs: [
          'The older approach grouped keywords by shared tokens: everything containing "running shoes" went together. That breaks in both directions. "Running shoes" and "trainers for running" describe the same need with almost no overlapping words. "Cheap running shoes" and "running shoes for flat feet" share two words out of three but represent different buyers looking for different pages.',
          'Semantic clustering works from meaning instead. Phrases are compared on how close their meanings are, so paraphrases and synonyms land together and superficially similar phrases with different intent are separated.',
        ],
      },
      {
        heading: 'Intent is the second axis',
        paragraphs: [
          'Meaning alone still merges things that should stay apart. "What is technical SEO" and "technical SEO agency" are semantically adjacent but serve a reader who wants an explanation and a buyer who wants a supplier. A useful cluster separates those, because one becomes an article and the other becomes a service page.',
          'In practice this means grouping on two axes at once: how close the meanings are, and what the searcher is trying to do — understand something, compare options, or act. A common sanity check is the SERP itself: if the results for two phrases are largely the same pages, one page can serve both; if they diverge, they need separate pages.',
        ],
        bullets: [
          'Informational — the searcher wants to understand something',
          'Commercial — the searcher is comparing options before choosing',
          'Transactional — the searcher is ready to act',
          'Navigational — the searcher already has a destination in mind',
        ],
      },
      {
        heading: 'What you do with the clusters',
        paragraphs: [
          'A cluster list is a means, not the deliverable. Four things are usually built from it.',
        ],
        bullets: [
          'Content planning — each cluster becomes at most one page, which turns an unordered keyword export into a finite, prioritisable backlog.',
          'Topical maps — clusters are arranged into a hub with supporting pages, so a broad pillar covers the topic and narrower pages cover its sub-questions.',
          'Cannibalisation prevention — if two existing pages map to the same cluster they are competing for the same intent, and one should be merged, redirected or repointed.',
          'Internal linking — pages inside a cluster link to each other and up to the hub, which is a far more defensible pattern than linking on exact-match anchors wherever a phrase appears.',
        ],
      },
      {
        heading: 'Where clustering goes wrong',
        paragraphs: [
          'Clustering is a judgement aid, not an oracle, and it fails in recognisable ways. Set the similarity threshold too loosely and unrelated intents collapse into one oversized cluster; set it too tightly and you get hundreds of near-duplicate groups that imply hundreds of near-duplicate pages.',
          'Brand terms, misspellings and very low-volume long tails tend to distort groupings and are usually worth handling separately. And no clustering method knows your commercial priorities: two clusters of identical size can be worth very different amounts to the business, so the output always needs a human pass before it becomes a content plan.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is semantic keyword clustering?',
        answer:
          'Grouping keywords by the meaning and intent behind them rather than by shared words, so that each group corresponds to one page you should build. It answers "how many pages does this topic need, and what does each one cover".',
      },
      {
        question: 'How is it different from ordinary keyword grouping?',
        answer:
          'Ordinary grouping matches on shared text, so paraphrases end up in different groups and phrases with different intent end up in the same one. Semantic grouping compares meaning, then separates by intent, which maps far more closely to how pages actually rank.',
      },
      {
        question: 'How many keywords should one page target?',
        answer:
          'There is no fixed number. A page should cover one cluster — one intent — however many phrasings that turns out to be. A cluster of forty paraphrases is still one page; two phrases with genuinely different intent are two pages.',
      },
      {
        question: 'Does semantic keyword clustering require Python?',
        answer:
          'No. Python is one common way to build clustering scripts yourself, using embeddings and a clustering algorithm, and it is a reasonable route if you want full control over the method. It is not a requirement for doing the work — the technique is independent of the language or tool you implement it in.',
      },
      {
        question: 'How does clustering help with keyword cannibalisation?',
        answer:
          'It makes the overlap visible. If two existing URLs map to the same cluster they are competing for the same intent, which is the definition of cannibalisation. The fix is to merge them, redirect the weaker one, or narrow one page to a genuinely different intent.',
      },
    ],
    furtherReading: [
      ['/blog/semantic-keyword-clustering', 'How to do semantic keyword clustering (with or without code)'],
      ['/platform/features/cannibalization-doctor', 'Cannibalization Doctor'],
      ['/platform/features/content-gap-analysis', 'Content Gap Analysis'],
    ],
  },

  'technical-seo-audits': {
    directAnswer:
      'A technical SEO audit checks whether search engines can reach, render, understand and index the pages you want ranked — and only those pages. It sits underneath content and links, because a page that cannot be crawled or is quietly excluded from the index cannot benefit from either.',
    sections: [
      {
        heading: 'The order the checks matter in',
        paragraphs: [
          'Technical findings are not equally urgent, and treating them as a flat list is the most common way an audit fails to produce results. Problems that stop a page existing in search at all outrank problems that make an existing page slightly worse.',
          'A workable order is: can it be crawled, is it indexable, is the right URL canonical, does it render, is it fast enough, and only then the refinements. A missing meta description on a page that is excluded from the index is not worth anyone\'s afternoon.',
        ],
        bullets: [
          'Crawlability — robots directives, redirect chains, server errors, orphaned pages',
          'Indexability — noindex, canonical targets, duplicate and parameter URLs',
          'Rendering — whether content that matters exists in the served HTML',
          'Structured data — valid markup that matches what is visible on the page',
          'Internationalisation — hreflang reciprocity and language signals, where relevant',
          'Performance — Core Web Vitals, measured on real templates rather than the homepage alone',
          'Internal linking — depth, orphans, and where authority actually accumulates',
        ],
      },
      {
        heading: 'Why audits so often change nothing',
        paragraphs: [
          'Most audits fail for one of two reasons. Either they are a raw export of every warning a crawler produced, in which case nobody knows where to start; or they are a list of issues with no owner, no sequence and no estimate of what fixing each one is worth.',
          'An audit is useful when it ends in an ordered plan: what to fix first, why that ranks above the rest, roughly what it takes, and how you will know it worked. The finding is the easy half.',
        ],
      },
      {
        heading: 'Auditing a templated site',
        paragraphs: [
          'On a site built from templates — programmatic location pages, category pages, product pages — issues are rarely per-URL. One template defect reproduces across thousands of URLs, and one template fix clears them all at once.',
          'That changes how you sample. Auditing every URL individually wastes effort; auditing one representative URL per template, then confirming the fix propagates, finds more in less time. It also changes severity: a defect on a template behind 2,000 URLs is a bigger problem than the same defect on a single page.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What does a technical SEO audit cover?',
        answer:
          'Whether search engines can crawl your pages, whether those pages are indexable, which URL is canonical, whether the content renders in the served HTML, whether structured data is valid and matches the page, and whether performance and internal linking help or hinder.',
      },
      {
        question: 'How often should a site be audited?',
        answer:
          'It depends on how often the site changes. A site under active development benefits from a check each release, because most technical regressions arrive with a deploy. A stable brochure site rarely needs more than a periodic review plus a check after any migration or redesign.',
      },
      {
        question: 'Is a technical audit enough to improve rankings?',
        answer:
          'It removes what is holding you back rather than creating new demand. If pages were excluded from the index or unreachable, fixing that can change results quickly. If the technical base is already sound, the constraint is usually content or authority, and an audit will say so.',
      },
      {
        question: 'What is the difference between a technical audit and a site crawl?',
        answer:
          'A crawl is data collection — it lists what a crawler found. An audit interprets that data against how your site is actually built and what the business needs, then decides what matters and in what order. The crawl is an input to the audit, not the audit itself.',
      },
    ],
    furtherReading: [
      ['/blog/technical-seo-guide', 'Technical SEO guide'],
      ['/services/seo-audits', 'SEO audit services'],
      ['/platform/features/seo-health-score', 'SEO Health Score'],
    ],
  },
};

export function getFeatureExplainer(slug: string): FeatureExplainer | undefined {
  return FEATURE_EXPLAINERS[slug];
}

/** Slugs carrying a long-form explainer, used by the indexability review. */
export const FEATURES_WITH_EXPLAINER = new Set(Object.keys(FEATURE_EXPLAINERS));
