import fs from "fs";
import path from "path";
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
}

export interface BlogPostParsed extends BlogPostListItem {
  readonly content: string;
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
    content,
  };
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
export function getAllBlogPosts(locale?: 'en' | 'el'): BlogPostListItem[] {
  const dir = getContentDir();
  if (!fs.existsSync(dir)) {
    return [];
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const posts: BlogPostParsed[] = [];
  for (const file of files) {
    const full = path.join(dir, file);
    const parsed = parsePostFile(full, file.replace(/\.md$/, ""));
    if (parsed) {
      posts.push(parsed);
    }
  }
  return posts
    .filter((p) => !locale || p.locale === locale)
    .map(({ content: _c, ...rest }) => rest)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Load a single post by slug for static generation and detail pages.
 */
export function getBlogPostBySlug(slug: string): BlogPostParsed | null {
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
