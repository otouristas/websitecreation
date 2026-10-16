/**
 * Checks that every blog post, including one that does not exist on disk yet,
 * gets a canonical URL, a hreflang cluster, a sitemap row and BlogPosting
 * JSON-LD from the same helpers the page and sitemap use.
 *
 * Run: npx tsx scripts/check-blog-seo.mts
 * Does not request indexing.
 */
import type { MetadataRoute } from 'next';
import * as sitemapModule from '../src/app/sitemap';
import { getAllBlogPosts, getTranslationCounterpart, type BlogPostListItem } from '../src/lib/blog';
import {
  blogPostCanonicalUrl,
  blogPostHreflangLanguages,
  blogPostingSchema,
  blogSitemapEntry,
  buildBlogPostMetadata,
} from '../src/lib/blog-seo';

// The metadata builder logs banned copy tokens outside production. This check
// asserts structure, and those tokens are existing copy, not a pipeline failure.
(process.env as Record<string, string | undefined>).NODE_ENV = 'production';

const failures: string[] = [];

function fail(message: string): void {
  failures.push(message);
}

function hrefOf(languages: object | undefined, code: string): string {
  if (!languages) return '';
  const value = (languages as Record<string, unknown>)[code];
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
  return '';
}

function assertCluster(
  post: Pick<BlogPostListItem, 'slug' | 'locale' | 'translationOf'>,
  label: string,
  reciprocal = true,
): void {
  const canonical = blogPostCanonicalUrl(post);
  const languages = blogPostHreflangLanguages(post);
  const entry = blogSitemapEntry({
    ...post,
    date: '2026-10-16',
    isPillarHub: false,
  });

  if (entry.url !== canonical) fail(`${label}: sitemap loc is not the canonical`);
  const sitemapLanguages = entry.alternates?.languages ?? {};
  for (const [code, href] of Object.entries(languages)) {
    if (hrefOf(sitemapLanguages, code) !== href) {
      fail(`${label}: sitemap hreflang ${code} does not match the head`);
    }
    if (!href.startsWith('https://anotherseoguru.com/')) {
      fail(`${label}: hreflang ${code} is not absolute (${href})`);
    }
  }
  if (languages[post.locale] !== canonical) fail(`${label}: missing self hreflang`);
  if (!languages['x-default']) fail(`${label}: missing x-default`);

  const counterpart = getTranslationCounterpart(post);
  if (counterpart) {
    const other = blogPostCanonicalUrl(counterpart);
    if (languages[counterpart.locale] !== other) {
      fail(`${label}: hreflang ${counterpart.locale} is not the counterpart`);
    }
    const english = post.locale === 'en' ? canonical : other;
    if (languages['x-default'] !== english) fail(`${label}: x-default is not the English URL`);
    if (reciprocal) {
      const back = blogPostHreflangLanguages(counterpart);
      if (back[post.locale] !== canonical || back[counterpart.locale] !== other) {
        fail(`${label}: hreflang is not reciprocal`);
      }
    }
  } else {
    const keys = Object.keys(languages).sort();
    const expected = [post.locale, 'x-default'].sort();
    if (keys.join(',') !== expected.join(',')) {
      fail(`${label}: single-locale hreflang keys are ${keys.join(', ')}`);
    }
    if (languages['x-default'] !== canonical) fail(`${label}: x-default is not the only URL`);
  }
}

function assertDocument(post: BlogPostListItem): void {
  const canonical = blogPostCanonicalUrl(post);
  const meta = buildBlogPostMetadata(post);
  const canonicalTag = typeof meta.alternates?.canonical === 'string' ? meta.alternates.canonical : '';
  if (canonicalTag !== canonical) fail(`${post.slug}: canonical tag is ${canonicalTag || '(missing)'}`);

  const head = meta.alternates?.languages ?? {};
  const expected = blogPostHreflangLanguages(post);
  for (const [code, href] of Object.entries(expected)) {
    if (hrefOf(head, code) !== href) fail(`${post.slug}: head hreflang ${code} drifted`);
  }

  const og = meta.openGraph as { type?: string; publishedTime?: string } | null | undefined;
  if (!og || og.type !== 'article') fail(`${post.slug}: Open Graph type is not article`);
  if (og && og.type === 'article' && og.publishedTime !== post.date) {
    fail(`${post.slug}: article:published_time is ${String(og.publishedTime)}`);
  }

  const schema = blogPostingSchema(post);
  if (schema['@type'] !== 'BlogPosting') fail(`${post.slug}: JSON-LD @type is ${String(schema['@type'])}`);
  const main = schema.mainEntityOfPage as { '@id'?: string } | undefined;
  if (main?.['@id'] !== canonical) fail(`${post.slug}: mainEntityOfPage is not the canonical`);
  if (schema.inLanguage !== post.locale) fail(`${post.slug}: inLanguage is ${String(schema.inLanguage)}`);
  if (schema.datePublished !== post.date) fail(`${post.slug}: datePublished drifted`);
  if (schema.dateModified !== (post.updated ?? post.date)) fail(`${post.slug}: dateModified drifted`);
  const image = schema.image as { url?: string } | undefined;
  if (image?.url !== 'https://anotherseoguru.com/opengraph-image.png') {
    fail(`${post.slug}: BlogPosting image is ${image?.url ?? '(missing)'}`);
  }
}

const posts = getAllBlogPosts();
if (posts.length === 0) fail('no blog posts were loaded');

for (const post of posts) {
  assertCluster(post, post.slug);
  assertDocument(post);
}

const fresh: BlogPostListItem = {
  slug: 'new-post-not-in-the-repo',
  title: 'A new post for the pipeline check',
  description: 'Pipeline check only. This file is not published.',
  date: '2026-10-16',
  author: 'AnotherSEOGuru Editorial Team',
  isPillarHub: false,
  locale: 'en',
  itemList: false,
  wordCount: 1000,
  readingTime: 5,
};
assertCluster(fresh, 'unsaved new post');
const freshLanguages = blogPostHreflangLanguages(fresh);
if ('el' in freshLanguages) fail('unsaved new post advertised an el alternate');
const freshSchema = blogPostingSchema(fresh);
if (freshSchema['@type'] !== 'BlogPosting') fail('unsaved new post did not get BlogPosting');
if (freshSchema.mainEntityOfPage && (freshSchema.mainEntityOfPage as { '@id': string })['@id'] !== blogPostCanonicalUrl(fresh)) {
  fail('unsaved new post canonical drifted from BlogPosting');
}

const greek = posts.find((post) => post.locale === 'el');
if (!greek) {
  fail('no Greek post to pair a new English file against');
} else {
  const pairedNew: BlogPostListItem = {
    ...fresh,
    slug: 'new-paired-post-not-in-the-repo',
    translationOf: greek.slug,
  };
  // The Greek page cannot point back until this file is actually in content/blog.
  assertCluster(pairedNew, 'unsaved paired post', false);
  const paired = blogPostHreflangLanguages(pairedNew);
  if (paired.el !== blogPostCanonicalUrl(greek)) fail('unsaved paired post did not point el at the Greek URL');
  if (paired.en !== blogPostCanonicalUrl(pairedNew)) fail('unsaved paired post did not point en at itself');
}

function loadSitemap(): MetadataRoute.Sitemap {
  const exported: unknown = sitemapModule.default;
  const nested =
    exported !== null && typeof exported === 'object' && 'default' in exported
      ? (exported as { default: unknown }).default
      : undefined;
  const build = typeof exported === 'function' ? exported : nested;
  if (typeof build !== 'function') {
    fail(`sitemap.ts default export is not a function (${typeof exported})`);
    return [];
  }
  return build() as MetadataRoute.Sitemap;
}

const rows = loadSitemap();
const seen = new Map<string, number>();
for (const row of rows) seen.set(row.url, (seen.get(row.url) ?? 0) + 1);
for (const post of posts) {
  const url = blogPostCanonicalUrl(post);
  if ((seen.get(url) ?? 0) !== 1) fail(`${post.slug}: sitemap lists ${url} ${seen.get(url) ?? 0} times`);
  const row = rows.find((entry) => entry.url === url);
  const langs = row?.alternates?.languages ?? {};
  const expected = blogPostHreflangLanguages(post);
  for (const [code, href] of Object.entries(expected)) {
    if (hrefOf(langs, code) !== href) fail(`${post.slug}: sitemap() hreflang ${code} drifted`);
  }
}

if (failures.length > 0) {
  for (const message of failures) console.error(`FAIL  ${message}`);
  console.error(`\n${failures.length} blog SEO check(s) failed`);
  process.exit(1);
}

const paired = posts.filter((post) => getTranslationCounterpart(post)).length;
console.log(`${posts.length} posts · ${paired} with a translation pair · single-locale posts self-reference hreflang · unsaved post covered`);
