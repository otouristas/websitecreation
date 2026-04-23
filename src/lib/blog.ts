import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
    content,
  };
}

/**
 * Returns all blog posts from content/blog, newest first.
 */
export function getAllBlogPosts(): BlogPostListItem[] {
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
