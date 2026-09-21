import type { AuthorEntity } from '@/lib/ai-search/contract';

/**
 * The author registry.
 *
 * `docs/seo-2026/README.md` P2.9: "No person exists on this site. Zero Person
 * schema, no author bios, no team page." Until real people are named here, the
 * honest fix is not to invent one - it is to make the entity that does exist
 * resolvable: one canonical name, one `@id`, a page that describes it, and the
 * `sameAs` profiles that let a model tie all three to the organization it
 * already knows.
 *
 * Front matter across 69 posts spelled the same author two ways, which is two
 * entities as far as a knowledge graph is concerned. `resolveAuthor` collapses
 * the aliases, so the byline, the JSON-LD and the author page cannot disagree.
 *
 * Adding a real person later is a matter of adding an entry with
 * `type: 'Person'`, their credentials and their profiles, then naming them in
 * the post's `author:` field. Nothing else changes.
 */

export const AUTHORS = {
  'editorial-team': {
    id: 'editorial-team',
    name: 'AnotherSEOGuru Editorial Team',
    type: 'Organization',
    url: '/en/about',
    jobTitle: 'Editorial team',
    bio: 'The agency team that plans, writes and reviews everything published here: technical SEO, Greek tourism search, and AI visibility work for client sites.',
    knowsAbout: [
      'Technical SEO',
      'Local SEO',
      'Google Search Console',
      'Generative engine optimization',
      'Answer engine optimization',
      'Greek tourism marketing',
      'Core Web Vitals',
    ],
    sameAs: [
      'https://www.linkedin.com/company/anotherseoguru',
      'https://twitter.com/anotherseoguru',
      'https://www.youtube.com/@anotherseoguru',
    ],
  },
} as const satisfies Record<string, AuthorEntity>;

export type AuthorId = keyof typeof AUTHORS;

export const DEFAULT_AUTHOR_ID: AuthorId = 'editorial-team';

/** Front-matter spellings that mean the same entity. Lower-cased on lookup. */
const ALIASES: Record<string, AuthorId> = {
  'anotherseoguru editorial team': 'editorial-team',
  'anotherseoguru team': 'editorial-team',
  anotherseoguru: 'editorial-team',
  'editorial team': 'editorial-team',
};

/**
 * Resolve a front-matter author string to an entity.
 *
 * An unknown name is not silently folded into the default: it returns a bare
 * Organization entity carrying that exact name, so the byline stays truthful
 * and the auditor reports the missing `url`/`sameAs` rather than the page
 * quietly claiming the wrong author.
 */
export function resolveAuthor(name: string | undefined): AuthorEntity {
  if (!name) return AUTHORS[DEFAULT_AUTHOR_ID];
  const id = ALIASES[name.trim().toLowerCase()];
  if (id) return AUTHORS[id];
  return {
    id: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    name: name.trim(),
    type: 'Organization',
  };
}
