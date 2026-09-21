/**
 * The AI-search page contract.
 *
 * A page declares what it is: who wrote it, when it was last true, the answer
 * it leads with, the questions it covers, the figures it is prepared to be
 * quoted on. Everything else in this module - the JSON-LD graph, the render
 * primitives, the auditor - is derived from this one declaration, so the
 * visible copy and the structured data cannot drift apart. Marking up a claim
 * the page does not make is the failure mode this shape exists to prevent.
 *
 * Nothing here is specific to this site. `src/lib/ai-search/*` has no imports
 * outside itself and is meant to be copied into another Next.js codebase whole.
 */

/** Who stands behind the page. A Person when there is one; never invented. */
export interface AuthorEntity {
  /** Stable fragment id, e.g. 'editorial-team'. Becomes `${site}/#author-<id>`. */
  readonly id: string;
  readonly name: string;
  readonly type: 'Person' | 'Organization';
  /** Page that describes this author. Relative to the site root. */
  readonly url?: string;
  /** Profiles that let a model resolve this author to the same entity elsewhere. */
  readonly sameAs?: readonly string[];
  readonly jobTitle?: string;
  /** Topics this author is actually credentialed in. */
  readonly knowsAbout?: readonly string[];
  /** One or two sentences, shown in the byline block. */
  readonly bio?: string;
}

/** A figure the page is willing to be quoted on, with its provenance attached. */
export interface OriginalDatum {
  /** The number as it should read, e.g. '3.1x', '42%', 'EUR 1,450'. */
  readonly value: string;
  /** What the number says. One sentence, self-contained. */
  readonly claim: string;
  /** How it was produced: sample, period, method. Required - a figure without it is not citable. */
  readonly method: string;
  /** ISO date the measurement was taken. Drives Dataset.temporalCoverage. */
  readonly measuredAt: string;
  /** Set when the figure is illustrative rather than measured. Suppresses Dataset. */
  readonly illustrative?: boolean;
}

export interface QaPair {
  readonly question: string;
  readonly answer: string;
}

/**
 * What a page declares about itself. Every field maps to one of the twelve
 * checks in `checks.ts`, and the render primitives put each on the page.
 */
export interface AiPageContract {
  /** Absolute URL, canonical form. */
  readonly url: string;
  readonly headline: string;
  readonly description: string;
  readonly locale: string;
  readonly datePublished: string;
  /** Last substantive revision. Rendered visibly AND emitted as dateModified. */
  readonly dateModified: string;
  readonly author: AuthorEntity;
  readonly publisher: { readonly name: string; readonly url: string; readonly id?: string };
  /**
   * The answer, before anything else. Four to six sentences, each one able to
   * survive being lifted out alone.
   */
  readonly takeaways?: readonly string[];
  /** Questions the page answers, rendered visibly and emitted as FAQPage. */
  readonly faqs?: readonly QaPair[];
  /** Figures with provenance. Emitted as Dataset when not illustrative. */
  readonly data?: readonly OriginalDatum[];
  readonly breadcrumbs?: readonly { readonly name: string; readonly url: string }[];
  /** CSS selectors whose text is safe to read aloud. */
  readonly speakableSelectors?: readonly string[];
  readonly schemaType?: 'Article' | 'BlogPosting' | 'WebPage' | 'TechArticle';
}

/**
 * Contract violations that are worth failing a build over, because they make
 * the structured data assert something the page does not show.
 *
 * Returns messages rather than throwing so callers decide the severity: a
 * blog template may warn in dev and ship, a checked page may throw.
 */
export function validateContract(c: AiPageContract): string[] {
  const errors: string[] = [];

  if (!c.headline.trim()) errors.push('headline is empty');
  if (!c.url.startsWith('http')) errors.push(`url must be absolute: ${c.url}`);
  if (Number.isNaN(Date.parse(c.datePublished))) errors.push(`datePublished unparseable: ${c.datePublished}`);
  if (Number.isNaN(Date.parse(c.dateModified))) errors.push(`dateModified unparseable: ${c.dateModified}`);
  if (Date.parse(c.dateModified) < Date.parse(c.datePublished)) {
    errors.push('dateModified precedes datePublished');
  }
  if (!c.author.name.trim()) errors.push('author has no name');

  for (const t of c.takeaways ?? []) {
    // A takeaway that points backwards cannot be lifted out on its own, which
    // is the only thing takeaways are for.
    if (/^\s*(this|that|these|those|it|they|he|she)\b/i.test(t)) {
      errors.push(`takeaway opens with a backward reference: "${t.slice(0, 48)}..."`);
    }
  }

  for (const d of c.data ?? []) {
    if (!d.illustrative && !d.method.trim()) {
      errors.push(`datum "${d.value}" has no method, so it is not citable`);
    }
  }

  for (const f of c.faqs ?? []) {
    if (!f.answer.trim()) errors.push(`FAQ "${f.question.slice(0, 40)}" has no answer`);
  }

  return errors;
}
