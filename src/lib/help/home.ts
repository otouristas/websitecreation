import { helpContent, helpPath, type Block } from "@/data/help";
import type { SiteLocale } from "@/lib/i18n/locale";
import type { HelpSearchEntry } from "@/lib/help/search";

/**
 * Help-home cards. A slot is omitted when that category or article is not in
 * the help content, so the grid only links to pages that already exist.
 */
const FEATURED: ReadonlyArray<{ readonly category: string; readonly article?: string; readonly icon: string }> = [
  { category: "seo-in-practice", article: "latest-features", icon: "sparkles" },
  { category: "seo-in-practice", article: "when-changes-appear", icon: "book" },
  { category: "getting-started", icon: "rocket" },
  { category: "integrations", article: "wordpress-plugin", icon: "wrench" },
  { category: "integrations", article: "chrome-extension", icon: "layers" },
  { category: "iphone-app", icon: "smartphone" },
  { category: "agencies", icon: "building" },
  { category: "account-billing", icon: "credit-card" },
];

export interface HelpHomeCard {
  readonly href: string;
  readonly title: string;
  readonly text: string;
  readonly icon: string;
}

const strip = (s: string) => s.replace(/\*\*|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

function headingText(blocks: ReadonlyArray<Block>): string[] {
  const out: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "h2":
      case "h3":
        out.push(strip(block.text));
        break;
      case "tabs":
        for (const tab of block.items) out.push(...headingText(tab.blocks));
        break;
      case "p":
      case "list":
      case "steps":
      case "note":
      case "table":
      case "image":
      case "gallery":
      case "cards":
      case "faq":
      case "code":
        break;
      default: {
        const never: never = block;
        throw new Error(`Unknown help block ${String(never)}`);
      }
    }
  }
  return out;
}

export function helpHomeCards(locale: SiteLocale): HelpHomeCard[] {
  const content = helpContent(locale);
  const cards: HelpHomeCard[] = [];
  for (const spec of FEATURED) {
    const category = content.find((c) => c.slug === spec.category);
    if (!category || category.articles.length === 0) continue;
    if (spec.article) {
      const article = category.articles.find((a) => a.slug === spec.article);
      if (!article) continue;
      cards.push({
        href: helpPath(locale, category.slug, article.slug),
        title: article.title,
        text: article.description,
        icon: spec.icon,
      });
      continue;
    }
    cards.push({
      href: helpPath(locale, category.slug),
      title: category.title,
      text: category.description,
      icon: spec.icon,
    });
  }
  return cards;
}

/** Titles, summaries and headings of categories and articles that have body content. */
export function helpSearchEntries(locale: SiteLocale, homeLabel: string): HelpSearchEntry[] {
  const entries: HelpSearchEntry[] = [];
  for (const category of helpContent(locale)) {
    if (category.articles.length === 0) continue;
    entries.push({
      href: helpPath(locale, category.slug),
      title: category.title,
      description: category.description,
      section: homeLabel,
      headings: category.articles.map((a) => a.title).join(" "),
    });
    for (const article of category.articles) {
      entries.push({
        href: helpPath(locale, category.slug, article.slug),
        title: article.title,
        description: article.description,
        section: category.title,
        headings: headingText(article.body).join(" "),
      });
    }
  }
  return entries;
}
