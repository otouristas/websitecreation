import { BarChart3, Bot, Building2, CreditCard, KeyRound, Rocket, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { getAppPath } from "@/lib/app-links";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { el } from "./el";
import { en } from "./en";
import type { Block, HelpArticle, HelpCategory } from "./types";

export type { Block, HelpArticle, HelpCategory };

/**
 * The GSC Boost help center. The articles are shared with the app repo
 * (gsc-gemini-boost src/help/content) and keep the same slugs in both
 * locales, so every page has a 1:1 hreflang twin.
 */
/** Bump when the articles change: it feeds dateModified and the sitemap. */
export const HELP_UPDATED = "2026-10-13";

export function helpContent(locale: SiteLocale): ReadonlyArray<HelpCategory> {
  return locale === "el" ? el : en;
}

export const CATEGORY_ICON: Readonly<Record<string, LucideIcon>> = {
  "getting-started": Rocket,
  "search-performance": BarChart3,
  "opportunities-tasks": Sparkles,
  "keywords-content": KeyRound,
  "site-audit": ShieldCheck,
  "competitors-ai": Bot,
  agencies: Building2,
  "account-billing": CreditCard,
};

/** Shown first on the help home. */
export const POPULAR: ReadonlyArray<readonly [string, string]> = [
  ["getting-started", "connect-search-console"],
  ["search-performance", "this-week"],
  ["opportunities-tasks", "opportunities"],
  ["keywords-content", "rank-tracking"],
  ["site-audit", "running-an-audit"],
  ["account-billing", "plans-and-credits"],
];

export const helpPath = (locale: SiteLocale, category?: string, article?: string) =>
  localizedPath(locale, ["/help", category, article].filter(Boolean).join("/"));

/**
 * Article links are written as app paths. On the website the product lives on
 * the app origin and the legal pages under the locale.
 */
export function resolveHelpHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/")) return href;
  if (href.startsWith("/help")) return localizedPath(locale, href);
  if (href === "/privacy" || href === "/terms") return localizedPath(locale, href);
  if (href === "/security") return localizedPath(locale, "/platform/security");
  return getAppPath(href);
}

export interface ArticleRef {
  readonly category: HelpCategory;
  readonly article: HelpArticle;
}

export function allArticles(content: ReadonlyArray<HelpCategory>): ArticleRef[] {
  return content.flatMap((category) => category.articles.map((article) => ({ category, article })));
}

export function findArticle(content: ReadonlyArray<HelpCategory>, category: string | undefined, article: string | undefined): ArticleRef | null {
  const cat = content.find((c) => c.slug === category);
  const art = cat?.articles.find((a) => a.slug === article);
  return cat && art ? { category: cat, article: art } : null;
}

const stripInline = (s: string) => s.replace(/\*\*|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

/** The article's text without inline markup (search, descriptions). */
export function plainText(blocks: ReadonlyArray<Block>): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "p":
        case "h2":
        case "h3":
        case "note":
          return stripInline(b.text);
        case "list":
        case "steps":
          return b.items.map(stripInline).join(" ");
        case "table":
          return [...b.head, ...b.rows.flat()].map(stripInline).join(" ");
        default: {
          const never: never = b;
          return never;
        }
      }
    })
    .join(" ");
}

/** What the client search needs, without shipping the block tree. */
export interface SearchEntry {
  readonly href: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly text: string;
}

export function searchIndex(locale: SiteLocale): SearchEntry[] {
  return allArticles(helpContent(locale)).map(({ category, article }) => ({
    href: helpPath(locale, category.slug, article.slug),
    category: category.title,
    title: article.title,
    description: article.description,
    text: plainText(article.body),
  }));
}
