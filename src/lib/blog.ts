import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";

export interface BlogFaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface BlogPostListItem {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly author: string;
  readonly category?: string;
  readonly categoryColor?: string;
  readonly pillar?: string;
  readonly isPillarHub: boolean;
  readonly locale: 'en' | 'el';
  /** Slug of this post's counterpart in the other locale, when a real translation pair exists. */
  readonly translationOf?: string;
  /** Optional Q&A pairs (frontmatter `faq:`) surfaced into FAQPage JSON-LD. */
  readonly faq?: readonly BlogFaqItem[];
  /** Body word count, used for reading time and Article schema. */
  readonly wordCount: number;
  /** Estimated minutes to read, at 200 wpm, floored to 1. */
  readonly readingTime: number;
}

export interface BlogHeading {
  readonly depth: 2 | 3;
  readonly text: string;
  /** Slug used as the heading `id` and the TOC anchor. */
  readonly id: string;
}

export interface BlogPostParsed extends BlogPostListItem {
  readonly content: string;
  /** H2/H3 outline, for the table of contents. */
  readonly headings: readonly BlogHeading[];
}

interface MatterData {
  readonly slug?: string;
  readonly title?: string;
  readonly description?: string;
  readonly date?: string;
  readonly author?: string;
  readonly category?: string;
  readonly categoryColor?: string;
  readonly pillar?: string;
  readonly pillarHub?: boolean;
  readonly locale?: 'en' | 'el';
  readonly translationOf?: string;
  readonly faq?: unknown;
}

/** Normalize the frontmatter `faq:` list into clean {question, answer} pairs. */
function parseFaq(raw: unknown): BlogFaqItem[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const items: BlogFaqItem[] = [];
  for (const entry of raw) {
    if (entry && typeof entry === "object") {
      const q = (entry as Record<string, unknown>).question ?? (entry as Record<string, unknown>).q;
      const a = (entry as Record<string, unknown>).answer ?? (entry as Record<string, unknown>).a;
      if (typeof q === "string" && typeof a === "string" && q.trim() && a.trim()) {
        items.push({ question: q.trim(), answer: a.trim() });
      }
    }
  }
  return items.length > 0 ? items : undefined;
}

function getContentDir(): string {
  return path.join(process.cwd(), "content/blog");
}

function parsePostFile(filePath: string, fileBase: string): BlogPostParsed | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const d = data as MatterData;
  const slug = typeof d.slug === "string" ? d.slug : fileBase.replace(/\.md$/, "");
  if (typeof d.title !== "string" || typeof d.description !== "string") {
    return null;
  }
  const date =
    typeof d.date === "string" ? d.date : new Date().toISOString().slice(0, 10);
  const wordCount = countBodyWords(content);
  return {
    slug,
    title: d.title,
    description: d.description,
    date,
    author: typeof d.author === "string" ? d.author : "AnotherSEOGuru Editorial Team",
    category: typeof d.category === "string" ? d.category : undefined,
    categoryColor: typeof d.categoryColor === "string" ? d.categoryColor : undefined,
    pillar: typeof d.pillar === "string" ? d.pillar : undefined,
    isPillarHub: Boolean(d.pillarHub),
    locale: d.locale === "el" ? "el" : "en",
    translationOf: typeof d.translationOf === "string" ? d.translationOf : undefined,
    faq: parseFaq(d.faq),
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / 200)),
    content,
    headings: extractHeadings(content),
  };
}

/**
 * GitHub-style heading slug. Handles Greek: strips diacritics via NFD so
 * "Πόσο κοστίζει" and "Ποσο κοστιζει" resolve to the same anchor, then keeps
 * Greek letters rather than stripping them to an empty string.
 */
export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

/** Parse the H2/H3 outline out of markdown for the table of contents. */
export function extractHeadings(content: string): BlogHeading[] {
  const out: BlogHeading[] = [];
  const seen = new Map<string, number>();
  let inFence = false;
  for (const line of content.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = stripMarkdownInline(m[2]);
    if (!text) continue;
    const base = slugifyHeading(text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.push({ depth: m[1].length === 2 ? 2 : 3, text, id: n === 0 ? base : `${base}-${n}` });
  }
  return out;
}

function countBodyWords(content: string): number {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ");
  return plain.split(/\s+/).filter(Boolean).length;
}

/** Strip markdown inline formatting so FAQ answers are clean plain text for JSON-LD. */
function stripMarkdownInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [label](url) -> label
    .replace(/\*\*([^*]+)\*\*/g, "$1") // **bold** -> bold
    .replace(/\*([^*]+)\*/g, "$1") // *italic* -> italic
    .replace(/`([^`]+)`/g, "$1") // `code` -> code
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Derive FAQ Q&A pairs from a post body's "Συχνές Ερωτήσεις" / "FAQ" section
 * (H2), reading each following H3 as a question and its paragraphs as the answer.
 * Used as a fallback when a post has no explicit `faq:` frontmatter, so FAQPage
 * JSON-LD is emitted from content the reader already sees.
 */
export function extractFaqFromMarkdown(content: string): BlogFaqItem[] {
  const lines = content.split(/\r?\n/);
  const faqHeading = /^##\s+(Συχνές\s+Ερωτήσεις|FAQ|Frequently\s+Asked\s+Questions)\s*$/i;
  let inSection = false;
  const items: BlogFaqItem[] = [];
  let question: string | null = null;
  let answerLines: string[] = [];
  const flush = () => {
    if (question) {
      const answer = stripMarkdownInline(answerLines.join(" "));
      if (answer) items.push({ question: stripMarkdownInline(question), answer });
    }
    question = null;
    answerLines = [];
  };
  for (const line of lines) {
    if (!inSection) {
      if (faqHeading.test(line.trim())) inSection = true;
      continue;
    }
    if (/^##\s+/.test(line) && !/^###/.test(line)) {
      // Next H2 ends the FAQ section.
      flush();
      break;
    }
    const h3 = line.match(/^###\s+(.*\S)\s*$/);
    if (h3) {
      flush();
      question = h3[1].replace(/[?;]\s*$/, (m) => m.trim());
      continue;
    }
    if (question && line.trim()) answerLines.push(line.trim());
  }
  flush();
  return items;
}

/**
 * Resolve the other-locale counterpart of a post. Follows `translationOf` in
 * either direction and validates the pair really spans two locales.
 */
export function getTranslationCounterpart(
  post: Pick<BlogPostListItem, "slug" | "locale" | "translationOf">,
): BlogPostListItem | null {
  if (post.translationOf) {
    const target = getBlogPostBySlug(post.translationOf);
    if (target && target.locale !== post.locale) {
      const { content: _c, ...rest } = target;
      return rest;
    }
  }
  const reverse = getAllBlogPosts().find(
    (p) => p.translationOf === post.slug && p.locale !== post.locale,
  );
  return reverse ?? null;
}

/**
 * Returns all blog posts from content/blog, newest first.
 */
/**
 * Parse every post once per request.
 *
 * Without this a single post render walked `content/blog` and re-parsed all 69
 * files four separate times (metadata, counterpart lookup, the component, and
 * related posts).
 */
const readAllPosts = cache((): BlogPostParsed[] => {
  const dir = getContentDir();
  if (!fs.existsSync(dir)) {
    return [];
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const posts: BlogPostParsed[] = [];
  for (const file of files) {
    const parsed = parsePostFile(path.join(dir, file), file.replace(/\.md$/, ""));
    if (parsed) {
      posts.push(parsed);
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export function getAllBlogPosts(locale?: 'en' | 'el'): BlogPostListItem[] {
  return readAllPosts()
    .filter((p) => !locale || p.locale === locale)
    .map(({ content: _c, headings: _h, ...rest }) => rest);
}

/**
 * Canonical pillar for a post.
 *
 * `ai-visibility` and `ai-llm-visibility` were near-duplicate pillars covering
 * the same topic; they collapse into one so the hub aggregates properly.
 */
export function normalizePillar(pillar?: string): string | undefined {
  if (!pillar) return undefined;
  return pillar === "ai-visibility" ? "ai-llm-visibility" : pillar;
}

export interface PillarSummary {
  readonly pillar: string;
  readonly count: number;
  readonly latest?: BlogPostListItem;
}

/** Posts in a pillar, newest first, locale-scoped. */
export function getPostsByPillar(pillar: string, locale: 'en' | 'el'): BlogPostListItem[] {
  const target = normalizePillar(pillar);
  return getAllBlogPosts(locale).filter(
    (p) => !p.isPillarHub && normalizePillar(p.pillar) === target,
  );
}

/** Every pillar present in a locale, with its post count. Drives the hub grid. */
export function getPillarSummary(locale: 'en' | 'el'): PillarSummary[] {
  const byPillar = new Map<string, BlogPostListItem[]>();
  for (const p of getAllBlogPosts(locale)) {
    if (p.isPillarHub) continue;
    const key = normalizePillar(p.pillar);
    if (!key) continue;
    const list = byPillar.get(key) ?? [];
    list.push(p);
    byPillar.set(key, list);
  }
  return [...byPillar.entries()]
    .map(([pillar, posts]) => ({ pillar, count: posts.length, latest: posts[0] }))
    .sort((a, b) => b.count - a.count);
}

/** All pillar slugs across both locales, for static params and the sitemap. */
export function getAllPillarSlugs(): string[] {
  const set = new Set<string>();
  for (const p of readAllPosts()) {
    const key = normalizePillar(p.pillar);
    if (key) set.add(key);
  }
  return [...set].sort();
}

/**
 * Related posts: same pillar first, topped up from the same category.
 *
 * The pillar-only version left Greek posts in the smaller pillars with a single
 * related article, because there are no Greek pillar hubs and the pools are thin.
 */
export function getRelatedPosts(
  post: Pick<BlogPostListItem, 'slug' | 'pillar' | 'category' | 'locale'>,
  limit = 4,
): BlogPostListItem[] {
  const pool = getAllBlogPosts(post.locale).filter((p) => p.slug !== post.slug && !p.isPillarHub);
  const pillar = normalizePillar(post.pillar);
  const out: BlogPostListItem[] = [];
  const push = (candidates: BlogPostListItem[]) => {
    for (const c of candidates) {
      if (out.length >= limit) return;
      if (!out.some((o) => o.slug === c.slug)) out.push(c);
    }
  };
  if (pillar) push(pool.filter((p) => normalizePillar(p.pillar) === pillar));
  if (post.category) push(pool.filter((p) => p.category === post.category));
  push(pool);
  return out.slice(0, limit);
}

/** Previous/next within the post's pillar, for sequential reading. */
export function getPillarNeighbours(
  post: Pick<BlogPostListItem, 'slug' | 'pillar' | 'locale'>,
): { prev?: BlogPostListItem; next?: BlogPostListItem } {
  const pillar = normalizePillar(post.pillar);
  if (!pillar) return {};
  const list = getPostsByPillar(pillar, post.locale);
  const i = list.findIndex((p) => p.slug === post.slug);
  if (i === -1) return {};
  return { prev: list[i - 1], next: list[i + 1] };
}

/**
 * Load a single post by slug for static generation and detail pages.
 */
export function getBlogPostBySlug(slug: string): BlogPostParsed | null {
  const cached = readAllPosts().find((p) => p.slug === slug);
  if (cached) return cached;
  const dir = getContentDir();
  if (!fs.existsSync(dir)) {
    return null;
  }
  const directPath = path.join(dir, `${slug}.md`);
  if (fs.existsSync(directPath)) {
    return parsePostFile(directPath, slug);
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const full = path.join(dir, file);
    const parsed = parsePostFile(full, file.replace(/\.md$/, ""));
    if (parsed && parsed.slug === slug) {
      return parsed;
    }
  }
  return null;
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}

/**
 * Newest posts first, capped for footer / widgets.
 */
export function getRecentBlogPosts(limit: number): BlogPostListItem[] {
  const n = Math.max(0, Math.floor(limit));
  if (n === 0) {
    return [];
  }
  return getAllBlogPosts().slice(0, n);
}

/**
 * Pillar hub posts (frontmatter pillarHub: true), newest first.
 */
export function getPillarHubPosts(): BlogPostListItem[] {
  return getAllBlogPosts().filter((p) => p.isPillarHub);
}
