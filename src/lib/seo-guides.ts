import { cache } from 'react';
import {
  getBlogPostBySlug,
  getTranslationCounterpart,
  type BlogPostListItem,
  type BlogPostParsed,
} from '@/lib/blog';
import type { SiteLocale } from '@/lib/i18n/locale';
import {
  allSeoGuideRefs,
  SEO_GUIDE_GROUPS,
  SEO_GUIDE_PILLARS,
  type SeoGuideRef,
} from '@/data/seo-guides';

export interface SeoGuideGroupView {
  readonly id: string;
  readonly title: string;
  readonly posts: readonly BlogPostListItem[];
}

export interface SeoGuideHub {
  readonly pillar: BlogPostListItem | null;
  readonly groups: readonly SeoGuideGroupView[];
  readonly posts: readonly BlogPostListItem[];
}

function toItem(post: BlogPostParsed): BlogPostListItem {
  const { content: _content, headings: _headings, ...rest } = post;
  return rest;
}

/** The post in `locale`, following `translationOf` in either direction. */
function livePost(slug: string | undefined, locale: SiteLocale): BlogPostListItem | null {
  if (!slug) return null;
  const post = getBlogPostBySlug(slug);
  if (!post) return null;
  if (post.locale === locale) return toItem(post);
  const twin = getTranslationCounterpart(post);
  if (twin && twin.locale === locale) return twin;
  return null;
}

function resolveRef(ref: SeoGuideRef, locale: SiteLocale): BlogPostListItem | null {
  const preferred = locale === 'el' ? ref.el : ref.en;
  const other = locale === 'el' ? ref.en : ref.el;
  return livePost(preferred, locale) ?? livePost(other, locale);
}

export function getSeoGuideHub(locale: SiteLocale): SeoGuideHub {
  const seen = new Set<string>();
  let pillar: BlogPostListItem | null = null;
  for (const ref of SEO_GUIDE_PILLARS) {
    const post = resolveRef(ref, locale);
    if (!post || seen.has(post.slug)) continue;
    pillar = post;
    seen.add(post.slug);
    break;
  }

  const posts: BlogPostListItem[] = pillar ? [pillar] : [];
  const groups: SeoGuideGroupView[] = [];
  for (const group of SEO_GUIDE_GROUPS) {
    const groupPosts: BlogPostListItem[] = [];
    for (const ref of group.refs) {
      const post = resolveRef(ref, locale);
      if (!post || seen.has(post.slug)) continue;
      seen.add(post.slug);
      groupPosts.push(post);
      posts.push(post);
    }
    if (groupPosts.length > 0) {
      groups.push({
        id: group.id,
        title: locale === 'el' ? group.titleEl : group.titleEn,
        posts: groupPosts,
      });
    }
  }

  return { pillar, groups, posts };
}

/** Slugs that belong on the hub, including translation twins of listed posts. */
export const seoGuideSlugSet = cache((): ReadonlySet<string> => {
  const slugs = new Set<string>();
  for (const ref of allSeoGuideRefs()) {
    for (const slug of [ref.en, ref.el]) {
      if (!slug) continue;
      slugs.add(slug);
      const post = getBlogPostBySlug(slug);
      if (!post) continue;
      const twin = getTranslationCounterpart(post);
      if (twin) slugs.add(twin.slug);
    }
  }
  return slugs;
});
