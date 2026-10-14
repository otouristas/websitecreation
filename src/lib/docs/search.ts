import { allArticles, helpContent, helpPath, IPHONE_CATEGORY, plainText } from "@/data/help";
import { categoryTitle } from "@/components/glossary/category-labels";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { allTerms, glossaryPath, termCopy } from "@/lib/docs/glossary";
import type { DocEntry, DocKind } from "@/lib/docs/search-core";

export type { DocEntry, DocKind };
export { searchDocs, rankForQuestion } from "@/lib/docs/search-core";

const RESOURCES: ReadonlyArray<Omit<DocEntry, "kind" | "section">> = [
  {
    href: "/resources/search-optimization-layers",
    title: "The layers of modern search optimization",
    description: "SEO, AEO, GEO, AIO, DEO and SXO in one model: what each layer optimizes for, what it asks of a page, and how it is measured.",
    text: "",
  },
  {
    href: "/resources/ai-search-page-anatomy",
    title: "Anatomy of a page built for AI search",
    description: "Twelve parts of a page that decide whether an answer engine can read it, quote it and cite it.",
    text: "",
  },
];

export function docsIndex(locale: SiteLocale, textLimit = 4000): DocEntry[] {
  const el = locale === "el";
  const guides = allArticles(helpContent(locale)).map(({ category, article }) => ({
    href: helpPath(locale, category.slug, article.slug),
    kind: (category.slug === IPHONE_CATEGORY ? "iphone" : "guide") as DocKind,
    section: category.title,
    title: article.title,
    description: article.description,
    text: plainText(article.body).slice(0, textLimit),
  }));
  const terms = allTerms().map(({ category, term }) => {
    const t = termCopy(term, locale);
    return {
      href: glossaryPath(locale, term.id),
      kind: "term" as const,
      section: `${el ? "Γλωσσάρι" : "Glossary"} · ${categoryTitle(category, locale)}`,
      title: t.name,
      description: t.short,
      text: [t.full, t.example, t.technique, t.proTip].filter(Boolean).join(" ").slice(0, textLimit),
    };
  });
  const resources = RESOURCES.map((r) => ({ ...r, href: localizedPath("en", r.href), kind: "resource" as const, section: el ? "Πόροι" : "Resources" }));
  return [...guides, ...terms, ...resources];
}

