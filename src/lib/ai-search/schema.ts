/**
 * The JSON-LD graph a page emits, derived from its contract.
 *
 * One `@graph` rather than a pile of separate blocks: nodes get `@id`s and
 * reference each other, so the author on an article is the same entity a model
 * meets on the author page and on the organization node, instead of three
 * unrelated strings that happen to match. That referencing is the difference
 * between markup and an entity.
 *
 * Every node here restates something the page shows. Nothing is asserted that
 * a reader cannot see, which is both Google's structured-data policy and the
 * only version of this that survives contact with a fact-checking model.
 */

import type { AiPageContract, AuthorEntity, OriginalDatum } from './contract';

export type JsonLdNode = Record<string, unknown>;

function abs(siteUrl: string, path: string | undefined): string | undefined {
  if (!path) return undefined;
  return path.startsWith('http') ? path : `${siteUrl.replace(/\/$/, '')}${path}`;
}

/** `${site}/#author-<id>` - stable across every page the author appears on. */
export function authorId(siteUrl: string, author: AuthorEntity): string {
  return `${siteUrl.replace(/\/$/, '')}/#author-${author.id}`;
}

export function buildAuthorNode(siteUrl: string, author: AuthorEntity): JsonLdNode {
  return {
    '@type': author.type,
    '@id': authorId(siteUrl, author),
    name: author.name,
    ...(author.url ? { url: abs(siteUrl, author.url) } : {}),
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.bio ? { description: author.bio } : {}),
    ...(author.knowsAbout?.length ? { knowsAbout: [...author.knowsAbout] } : {}),
    ...(author.sameAs?.length ? { sameAs: [...author.sameAs] } : {}),
  };
}

/**
 * Dataset for a figure the site produced.
 *
 * Only emitted for measured data. An illustrative number gets no Dataset: the
 * point of the type is that something real was measured, and claiming it for a
 * worked example would be the exact dishonesty this module is built to avoid.
 */
export function buildDatasetNode(
  siteUrl: string,
  pageUrl: string,
  datum: OriginalDatum,
  index: number,
  publisherId: string,
): JsonLdNode | null {
  if (datum.illustrative) return null;
  return {
    '@type': 'Dataset',
    '@id': `${pageUrl}#data-${index + 1}`,
    name: datum.claim,
    description: `${datum.value} - ${datum.claim} Method: ${datum.method}`,
    temporalCoverage: datum.measuredAt,
    dateModified: datum.measuredAt,
    isAccessibleForFree: true,
    url: pageUrl,
    creator: { '@id': publisherId },
    includedInDataCatalog: { '@type': 'DataCatalog', name: 'Site research', url: siteUrl },
    ...(datum.method ? { measurementTechnique: datum.method } : {}),
  };
}

export function buildFaqNode(pageUrl: string, faqs: AiPageContract['faqs']): JsonLdNode | null {
  if (!faqs?.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildBreadcrumbNode(
  siteUrl: string,
  pageUrl: string,
  items: AiPageContract['breadcrumbs'],
): JsonLdNode | null {
  if (!items?.length) return null;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(siteUrl, item.url),
    })),
  };
}

/**
 * The whole page graph: article, author, breadcrumbs, FAQ, datasets, speakable.
 *
 * `siteUrl` is used for the `@id`s that tie this page's nodes to the site-wide
 * Organization and WebSite nodes a layout already emits, so passing the same
 * `publisherId` here is what merges the two graphs.
 */
export function buildPageGraph(
  contract: AiPageContract,
  opts: { readonly siteUrl: string; readonly publisherId?: string },
): { '@context': 'https://schema.org'; '@graph': JsonLdNode[] } {
  const site = opts.siteUrl.replace(/\/$/, '');
  const publisherId = opts.publisherId ?? `${site}/#organization`;
  const pageUrl = contract.url;

  const article: JsonLdNode = {
    '@type': contract.schemaType ?? 'Article',
    '@id': `${pageUrl}#article`,
    headline: contract.headline,
    description: contract.description,
    inLanguage: contract.locale,
    datePublished: contract.datePublished,
    dateModified: contract.dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    author: { '@id': authorId(site, contract.author) },
    publisher: { '@id': publisherId },
    isPartOf: { '@id': `${site}/#website` },
  };

  // Takeaways are the answer the page leads with, so they are also the
  // abstract. One string, because that is what a retrieval system quotes.
  if (contract.takeaways?.length) {
    article.abstract = contract.takeaways.join(' ');
  }

  if (contract.speakableSelectors?.length) {
    article.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: [...contract.speakableSelectors],
    };
  }

  const datasets = (contract.data ?? [])
    .map((d, i) => buildDatasetNode(site, pageUrl, d, i, publisherId))
    .filter((n): n is JsonLdNode => n !== null);

  if (datasets.length) {
    article.citation = datasets.map((d) => ({ '@id': d['@id'] as string }));
  }

  const graph: (JsonLdNode | null)[] = [
    article,
    buildAuthorNode(site, contract.author),
    buildBreadcrumbNode(site, pageUrl, contract.breadcrumbs),
    buildFaqNode(pageUrl, contract.faqs),
    ...datasets,
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph.filter((n): n is JsonLdNode => n !== null),
  };
}

/**
 * The page-level node a hub, feature page or legal page needs.
 *
 * The audit's second-commonest failure was "no page-level type": the only
 * JSON-LD on those URLs was the site-wide Organization and WebSite nodes, so
 * nothing in the markup was about the page a reader was on, and nothing said
 * when it was last true. A `WebPage` node with dates, language and an
 * `isPartOf` link to the site costs nothing and fixes both.
 */
export type PageNodeType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';

export function buildWebPageNode(input: {
  readonly siteUrl: string;
  readonly url: string;
  readonly name: string;
  readonly description?: string;
  readonly locale: string;
  readonly datePublished?: string;
  readonly dateModified: string;
  readonly breadcrumbId?: string;
  readonly type?: PageNodeType;
}): { '@context': 'https://schema.org'; '@type': PageNodeType } & JsonLdNode {
  const site = input.siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': input.type ?? 'WebPage',
    '@id': input.url,
    url: input.url,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    inLanguage: input.locale,
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    dateModified: input.dateModified,
    isPartOf: { '@id': `${site}/#website` },
    publisher: { '@id': `${site}/#organization` },
    ...(input.breadcrumbId ? { breadcrumb: { '@id': input.breadcrumbId } } : {}),
  };
}
