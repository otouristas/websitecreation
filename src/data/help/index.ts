import { getAppPath } from "@/lib/app-links";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { el } from "./el";
import { en } from "./en";
import { integrationsEl } from "./integrations-el";
import { integrationsEn } from "./integrations-en";
import { iphoneEl } from "./iphone-el";
import { iphoneEn } from "./iphone-en";
import type { Block, CardItem, HelpArticle, HelpCategory, Shot, StepItem } from "./types";

export type { Block, CardItem, HelpArticle, HelpCategory, Shot, StepItem };

/** The iPhone guides are a help category with their own tab in the docs. */
export const IPHONE_CATEGORY = "iphone-app";

const EN_ALL: ReadonlyArray<HelpCategory> = [...en, integrationsEn, iphoneEn];
const EL_ALL: ReadonlyArray<HelpCategory> = [...el, integrationsEl, iphoneEl];

/**
 * The GSC Boost help center. The articles are shared with the app repo
 * (gsc-gemini-boost src/help/content) and keep the same slugs in both
 * locales, so every page has a 1:1 hreflang twin.
 */
/** Bump when the articles change: it feeds dateModified and the sitemap. */
export const HELP_UPDATED = "2026-10-17";

export function helpContent(locale: SiteLocale): ReadonlyArray<HelpCategory> {
  return locale === "el" ? EL_ALL : EN_ALL;
}

export const helpPath = (locale: SiteLocale, category?: string, article?: string) =>
  localizedPath(locale, ["/help", category, article].filter(Boolean).join("/"));

const META_SUFFIX: Record<SiteLocale, string> = {
  en: "Step-by-step guide in the GSC Boost help center.",
  el: "Οδηγός βήμα βήμα στο κέντρο βοήθειας του GSC Boost.",
};

/** One-line summaries read well in the UI but are too thin for a search snippet. */
export function helpMetaDescription(summary: string, locale: SiteLocale): string {
  return summary.length >= 90 ? summary : `${summary} ${META_SUFFIX[locale]}`;
}

/**
 * Article links are written as app paths. On the website the product lives on
 * the app origin and the legal pages under the locale.
 */
export function resolveHelpHref(href: string, locale: SiteLocale): string {
  if (!href.startsWith("/")) return href;
  if (href.startsWith("/help")) return localizedPath(locale, href);
  if (href === "/privacy" || href === "/terms") return localizedPath(locale, href);
  if (href === "/security") return localizedPath(locale, "/platform/security");
  // Blog posts live on this site. Glossary "related resources" reuse this
  // resolver, and sending /blog to the app origin 404s.
  if (/^\/blog(?:\/|$)/.test(href)) return localizedPath(locale, href);
  if (/^\/(?:en|el)\/blog(?:\/|$)/.test(href)) return href;
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
    .map((b): string => {
      switch (b.type) {
        case "p":
        case "h2":
        case "h3":
        case "note":
          return stripInline(b.text);
        case "list":
          return b.items.map(stripInline).join(" ");
        case "steps":
          return b.items.map((i) => (typeof i === "string" ? stripInline(i) : `${i.title}. ${stripInline(i.text ?? "")}`)).join(" ");
        case "table":
          return [...b.head, ...b.rows.flat()].map(stripInline).join(" ");
        case "image":
          return b.caption ? stripInline(b.caption) : "";
        case "gallery":
          return b.items.map((i) => (i.caption ? stripInline(i.caption) : "")).join(" ");
        case "cards":
          return b.items.map((c) => `${c.title}. ${stripInline(c.text)}`).join(" ");
        case "tabs":
          return b.items.map((t) => `${t.label}. ${plainText(t.blocks)}`).join(" ");
        case "faq":
          return b.items.map((f) => `${f.q} ${stripInline(f.a)}`).join(" ");
        case "code":
          return "";
        default: {
          const never: never = b;
          return never;
        }
      }
    })
    .filter(Boolean)
    .join(" ");
}

/** Every question in an article, including those inside tabs (FAQPage schema). */
export function articleFaqs(blocks: ReadonlyArray<Block>): Array<{ question: string; answer: string }> {
  return blocks.flatMap((b) =>
    b.type === "faq" ? b.items.map((f) => ({ question: f.q, answer: stripInline(f.a) })) : b.type === "tabs" ? b.items.flatMap((t) => articleFaqs(t.blocks)) : [],
  );
}

export interface ArticleHowTo {
  readonly name: string;
  readonly description: string;
  readonly steps: ReadonlyArray<{ readonly name: string; readonly text: string }>;
}

/** Titled steps marked with `howTo`. Untitled lines are omitted so the schema matches the page. */
export function articleHowTos(blocks: ReadonlyArray<Block>): ArticleHowTo[] {
  return blocks.flatMap((b) => {
    if (b.type === "tabs") return b.items.flatMap((t) => articleHowTos(t.blocks));
    if (b.type !== "steps" || !b.howTo) return [];
    const steps = b.items.flatMap((item) => {
      if (typeof item === "string" || !item.title || !item.text) return [];
      return [{ name: item.title, text: stripInline(item.text) }];
    });
    return steps.length ? [{ name: b.howTo.name, description: b.howTo.description, steps }] : [];
  });
}
