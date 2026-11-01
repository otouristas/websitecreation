/**
 * Sitemap, hreflang, canonical and BlogPosting for a blog post.
 *
 * The post template, sitemap.ts and scripts/check-blog-seo.mts all call these
 * helpers. A new markdown file in content/blog is enough: nothing else has to
 * be registered for the URL to be canonical, annotated and listed.
 */

import type { Metadata, MetadataRoute } from 'next';
import type { BlogPostListItem } from '@/lib/blog';
import { getTranslationCounterpart } from '@/lib/blog';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildHreflangMapFromPaths } from '@/lib/locale-paths';
import { buildMetadata, DEFAULT_OG_IMAGE } from '@/lib/seo/metadata';
import { BASE_URL, generateArticleSchema } from '@/lib/seo/schema';

export function blogPostPath(locale: SiteLocale, slug: string): string {
  return localizedPath(locale, `/blog/${slug}`);
}

export function blogPostCanonicalUrl(post: Pick<BlogPostListItem, 'locale' | 'slug'>): string {
  return `${BASE_URL}${blogPostPath(post.locale, post.slug)}`;
}

/**
 * hreflang cluster for one post.
 *
 * A real translation pair gets en, el and x-default on the English URL, the
 * same map paired posts already ship. A post with no counterpart gets a
 * self-reference and x-default on its own URL, so a new single-locale file
 * does not advertise a twin that 404s.
 */
export function blogPostHreflangLanguages(
  post: Pick<BlogPostListItem, 'slug' | 'locale' | 'translationOf'>,
): Record<string, string> {
  const counterpart = getTranslationCounterpart(post);
  if (counterpart) {
    const paired = buildHreflangMapFromPaths({
      [post.locale]: blogPostPath(post.locale, post.slug),
      [counterpart.locale]: blogPostPath(counterpart.locale, counterpart.slug),
    });
    if (paired) return paired;
  }
  const url = blogPostCanonicalUrl(post);
  return {
    [post.locale]: url,
    'x-default': url,
  };
}

export function buildBlogPostMetadata(
  post: Pick<
    BlogPostListItem,
    'slug' | 'locale' | 'translationOf' | 'title' | 'description' | 'date' | 'updated' | 'author' | 'category'
  > & { readonly seoTitle?: string },
): Metadata {
  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: blogPostPath(post.locale, post.slug),
    languages: blogPostHreflangLanguages(post),
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      ...(post.category ? { section: post.category } : {}),
    },
  });
}

/** BlogPosting for the post URL. Image matches the Open Graph image already on the page. */
export function blogPostingSchema(
  post: Pick<BlogPostListItem, 'slug' | 'locale' | 'title' | 'description' | 'date' | 'updated' | 'author'>,
) {
  return generateArticleSchema({
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { name: post.author },
    schemaType: 'BlogPosting',
    inLanguage: post.locale,
    mainEntityOfPage: blogPostCanonicalUrl(post),
    image: {
      url: `${BASE_URL}${DEFAULT_OG_IMAGE}`,
      width: 1200,
      height: 630,
    },
  });
}

/** One sitemap row, including the same hreflang cluster the HTML head emits. */
export function blogSitemapEntry(
  post: Pick<BlogPostListItem, 'slug' | 'locale' | 'translationOf' | 'date' | 'updated' | 'isPillarHub'>,
): MetadataRoute.Sitemap[number] {
  return {
    url: blogPostCanonicalUrl(post),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: 'monthly',
    priority: post.isPillarHub ? 0.85 : 0.7,
    alternates: {
      languages: blogPostHreflangLanguages(post),
    },
  };
}
