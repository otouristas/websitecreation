"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, BookOpen, ChevronRight, Code, Lightbulb, Search, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import { categoryDescription, categoryTitle, isTermTranslated } from "./category-labels";
import { glossaryCategories, type GlossaryCategory, type GlossaryTerm } from "@/data/glossary-data";
import { resolveMarketingPath } from "@/lib/marketing-links";
import { getGlossaryUi } from "@/lib/i18n/get-dictionary";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

const categoryBadgeClass: Record<string, string> = {
  blue: "bg-blue-500/10 text-primary border border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20",
  green: "bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20",
  orange: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-500/20",
  cyan: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20",
  yellow: "bg-yellow-500/10 text-yellow-800 dark:text-yellow-300 border border-yellow-500/20",
  red: "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20",
  indigo: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20",
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20",
  violet: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20",
  slate: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20",
  pink: "bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-500/20",
};

/**
 * The categories a locale can show. On /el only fully translated terms are
 * listed, so the Greek page never drops into English mid-list; categories
 * left empty by that filter are hidden. The server-rendered list on the page
 * still carries every term for crawlers.
 */
function categoriesFor(locale: SiteLocale): GlossaryCategory[] {
  if (locale !== "el") return glossaryCategories;
  return glossaryCategories
    .map((category) => ({ ...category, terms: category.terms.filter(isTermTranslated) }))
    .filter((category) => category.terms.length > 0);
}

function flattenTerms(categories: GlossaryCategory[]): { category: GlossaryCategory; term: GlossaryTerm }[] {
  return categories.flatMap((category) => category.terms.map((term) => ({ category, term })));
}

function RelatedResourceLink(props: {
  readonly title: string;
  readonly url: string;
  readonly locale?: SiteLocale;
}) {
  const href = resolveMarketingPath(props.url, props.locale ?? "en");
  const isExternal = href.startsWith("http");
  const className =
    "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-hairline bg-surface/70 px-4 py-3 text-left transition-colors hover:border-primary/50";
  if (isExternal) {
    return (
      <a href={href} className={className} rel="noopener noreferrer" target="_blank">
        <span className="font-medium text-foreground">{props.title}</span>
        <span className="text-xs text-muted-foreground">{props.locale === "el" ? "Εφαρμογή" : "App"}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      <span className="font-medium text-foreground">{props.title}</span>
      <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  );
}

export function GlossaryClient({ locale = "en" }: { locale?: SiteLocale }) {
  const ui = getGlossaryUi(locale);
  const isEl = locale === "el";
  const tName = (t: GlossaryTerm) => (isEl && t.termEl) || t.term;
  const tShort = (t: GlossaryTerm) => (isEl && t.shortDefinitionEl) || t.shortDefinition;
  const tFull = (t: GlossaryTerm) => (isEl && t.fullDefinitionEl) || t.fullDefinition;
  const catTitle = (c: GlossaryCategory) => categoryTitle(c, locale);
  const glossaryBase = localizedPath(locale, "/glossary");
  const categories = useMemo(() => categoriesFor(locale), [locale]);
  const allTerms = useMemo(() => flattenTerms(categories), [categories]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category"));
  const [selectedTerm, setSelectedTerm] = useState<string | null>(searchParams.get("term"));
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setSelectedCategory(searchParams.get("category"));
    setSelectedTerm(searchParams.get("term"));
  }, [searchParams]);

  const syncUrl = useCallback(
    (categoryId: string | null, termId: string | null) => {
      const p = new URLSearchParams();
      if (categoryId) {
        p.set("category", categoryId);
      }
      if (termId) {
        p.set("term", termId);
      }
      const q = p.toString();
      router.replace(q ? `${glossaryBase}?${q}` : glossaryBase, { scroll: false });
    },
    [router, glossaryBase],
  );

  // After a term opens, bring the top of the panel into view - but only when
  // the reader has scrolled past it (mobile, or deep in a long category);
  // otherwise the jump is just noise. Runs after render, so it measures the
  // new content rather than the list that was just replaced.
  const pendingReveal = useRef(false);
  const revealContent = () => {
    pendingReveal.current = true;
  };
  useEffect(() => {
    if (!pendingReveal.current) return;
    pendingReveal.current = false;
    const el = contentRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
  }, [selectedTerm]);

  const selectTerm = (categoryId: string, termId: string) => {
    setSearchQuery("");
    setSelectedCategory(categoryId);
    setSelectedTerm(termId);
    syncUrl(categoryId, termId);
    revealContent();
  };

  const selectCategory = (categoryId: string | null) => {
    setSearchQuery("");
    setSelectedCategory(categoryId);
    setSelectedTerm(null);
    syncUrl(categoryId, null);
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return null;
    }
    const query = searchQuery.toLowerCase();
    return allTerms.filter(
      ({ term }) =>
        term.term.toLowerCase().includes(query) ||
        term.shortDefinition.toLowerCase().includes(query) ||
        term.fullDefinition.toLowerCase().includes(query) ||
        (term.termEl ?? "").toLowerCase().includes(query) ||
        (term.shortDefinitionEl ?? "").toLowerCase().includes(query),
    );
  }, [searchQuery, allTerms]);

  const currentTerm = useMemo(() => {
    if (!selectedTerm) {
      return null;
    }
    return allTerms.find(({ term }) => term.id === selectedTerm) ?? null;
  }, [selectedTerm, allTerms]);

  const filteredCategories = useMemo(() => {
    if (selectedCategory) {
      const match = categories.filter((c) => c.id === selectedCategory);
      if (match.length > 0) return match;
    }
    return categories;
  }, [selectedCategory, categories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const clearSelection = () => selectCategory(null);

  const chip = (active: boolean) =>
    cn(
      "inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
      active
        ? "border-primary/50 bg-primary/10 text-foreground"
        : "border-hairline bg-surface/60 text-muted-foreground hover:text-foreground",
    );

  const sectionTitle = "mb-3 font-display text-lg font-semibold tracking-[-0.02em] text-foreground";

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10">
      <aside className="min-w-0">
        <div className="lg:sticky lg:top-[calc(var(--site-header-height)+1rem)] lg:max-h-[calc(100vh-var(--site-header-height)-2rem)] lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-hairline lg:bg-surface/70 lg:p-4">
          <label className="relative block">
            <span className="sr-only">{ui.searchPlaceholder}</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              placeholder={ui.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-12 w-full rounded-xl border border-hairline bg-background/70 pl-10 pr-3 text-[16px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 lg:text-sm"
            />
          </label>

          {/* Mobile: one scrollable row of category chips instead of the tree. */}
          <div className="scrollbar-none -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
            <button type="button" onClick={clearSelection} className={chip(!selectedCategory && !selectedTerm)} aria-pressed={!selectedCategory && !selectedTerm}>
              {ui.allCategories}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
                className={chip(selectedCategory === category.id)}
                aria-pressed={selectedCategory === category.id}
              >
                {catTitle(category)}
                <span className="font-mono text-[10px] text-muted-foreground">{category.terms.length}</span>
              </button>
            ))}
          </div>

          {/* Desktop: the category tree. */}
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={clearSelection}
              className={cn(
                "mb-2 mt-4 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                !selectedCategory && !selectedTerm ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-surface-raised hover:text-foreground",
              )}
            >
              <BookOpen className="size-4 text-brand" aria-hidden />
              {ui.allCategories}
            </button>
            <nav className="space-y-0.5" aria-label={isEl ? "Κατηγορίες" : "Categories"}>
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                const isExpanded = expandedCategories.has(category.id) || selectedCategory === category.id;
                const isActive = selectedCategory === category.id;
                return (
                  <div key={category.id}>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => selectCategory(category.id)}
                        className={cn(
                          "flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                          isActive ? "bg-primary/10 text-foreground" : "text-foreground/85 hover:bg-surface-raised",
                        )}
                      >
                        <CategoryIcon className="size-4 shrink-0 text-brand" />
                        <span className="truncate">{catTitle(category)}</span>
                        <span className="ml-auto font-mono text-[10px] text-muted-foreground">{category.terms.length}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        aria-expanded={isExpanded}
                        aria-label={isEl ? `Όροι: ${catTitle(category)}` : `Terms in ${catTitle(category)}`}
                        className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-surface-raised hover:text-foreground"
                      >
                        <ChevronRight className={cn("size-4 transition-transform", isExpanded && "rotate-90")} />
                      </button>
                    </div>
                    {isExpanded ? (
                      <div className="mb-1 ml-5 mt-0.5 space-y-0.5 border-l border-hairline pl-3">
                        {category.terms.map((term) => (
                          <button
                            key={term.id}
                            type="button"
                            onClick={() => selectTerm(category.id, term.id)}
                            className={cn(
                              "w-full truncate rounded-md px-3 py-1.5 text-left text-[13px] transition-colors",
                              selectedTerm === term.id ? "bg-primary/10 font-medium text-foreground" : "text-muted-foreground hover:bg-surface-raised hover:text-foreground",
                            )}
                          >
                            {tName(term)}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      <div ref={contentRef} className="min-w-0 scroll-mt-28">
        {searchResults ? (
          <div className="mx-auto max-w-3xl">
            <h2 className={sectionTitle}>{isEl ? "Αποτελέσματα αναζήτησης" : "Search results"}</h2>
            {searchResults.length === 0 ? (
              <p className="rounded-2xl border border-hairline bg-surface/70 p-6 text-sm text-muted-foreground">{ui.noResults}</p>
            ) : (
              <ul className="space-y-2">
                {searchResults.map(({ category, term }) => (
                  <li key={term.id}>
                    <button
                      type="button"
                      onClick={() => selectTerm(category.id, term.id)}
                      className="w-full rounded-2xl border border-hairline bg-surface/70 p-4 text-left transition-colors hover:border-primary/50"
                    >
                      <span className="font-medium text-foreground">{tName(term)}</span>
                      <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">{tShort(term)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : currentTerm ? (
          <article className="mx-auto max-w-3xl rounded-3xl border border-hairline bg-surface/70 p-6 sm:p-10">
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground" aria-label={isEl ? "Διαδρομή γλωσσαρίου" : "Glossary path"}>
              <button type="button" onClick={clearSelection} className="hover:text-foreground">
                {isEl ? "Γλωσσάρι" : "Glossary"}
              </button>
              <ChevronRight className="size-3.5" aria-hidden />
              <button type="button" onClick={() => selectCategory(currentTerm.category.id)} className="hover:text-foreground">
                {catTitle(currentTerm.category)}
              </button>
              <ChevronRight className="size-3.5" aria-hidden />
              <span className="font-medium text-foreground">{tName(currentTerm.term)}</span>
            </nav>
            <span className={`mb-3 inline-block rounded-md px-2 py-1 text-xs font-medium ${categoryBadgeClass[currentTerm.category.color] ?? "bg-muted"}`}>
              {catTitle(currentTerm.category)}
            </span>
            <h2 className="mb-4 font-display text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-4xl">{tName(currentTerm.term)}</h2>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{tShort(currentTerm.term)}</p>
            <section className="mb-8">
              <h3 className={sectionTitle}>{isEl ? "Ορισμός" : "Definition"}</h3>
              <p className="leading-relaxed text-muted-foreground">{tFull(currentTerm.term)}</p>
            </section>
            {currentTerm.term.example ? (
              <section className="mb-8">
                <h3 className={sectionTitle}>{isEl ? "Παράδειγμα" : "Example"}</h3>
                <div className="flex gap-3 rounded-xl border border-hairline bg-background/60 p-4">
                  <Code className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                  <code className="whitespace-pre-wrap break-words text-sm text-foreground">{currentTerm.term.example}</code>
                </div>
              </section>
            ) : null}
            {/* Implementation notes and tips exist in English only, so /el skips them. */}
            {currentTerm.term.technique && !isEl ? (
              <section className="mb-8">
                <h3 className={sectionTitle}>How to implement</h3>
                <div className="flex gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4">
                  <Zap className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <p className="text-sm text-foreground">{currentTerm.term.technique}</p>
                </div>
              </section>
            ) : null}
            {currentTerm.term.proTip && !isEl ? (
              <section className="mb-8">
                <h3 className={sectionTitle}>Pro tip</h3>
                <div className="flex gap-3 rounded-xl border border-signal/30 bg-signal/5 p-4">
                  <Lightbulb className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden />
                  <p className="text-sm text-foreground">{currentTerm.term.proTip}</p>
                </div>
              </section>
            ) : null}
            {currentTerm.term.relatedLinks && currentTerm.term.relatedLinks.length > 0 ? (
              <section className="mb-8">
                <h3 className={sectionTitle}>{ui.relatedResources}</h3>
                <div className="grid gap-2">
                  {currentTerm.term.relatedLinks.map((link) => (
                    <RelatedResourceLink
                      key={`${link.title}-${link.url}`}
                      title={link.title}
                      url={link.url}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            ) : null}
            {currentTerm.term.relatedTerms && currentTerm.term.relatedTerms.length > 0 ? (
              <section className="border-t border-hairline pt-6">
                <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {isEl ? "Σχετικοί όροι" : "Related terms"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentTerm.term.relatedTerms.map((termId) => {
                    const found = allTerms.find((t) => t.term.id === termId);
                    if (!found) {
                      return null;
                    }
                    return (
                      <button key={termId} type="button" onClick={() => selectTerm(found.category.id, termId)} className={chip(false)}>
                        {tName(found.term)}
                      </button>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </article>
        ) : (
          <div className="space-y-16">
            {filteredCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                  <div className="mb-6 flex flex-wrap items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-hairline bg-surface text-brand">
                      <CategoryIcon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 id={`cat-${category.id}`} className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
                        {catTitle(category)}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{categoryDescription(category, locale)}</p>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {category.terms.length} {isEl ? "όροι" : "terms"}
                    </span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {category.terms.map((term) => (
                      <button
                        key={term.id}
                        type="button"
                        onClick={() => selectTerm(category.id, term.id)}
                        className="group flex flex-col rounded-2xl border border-hairline bg-surface/70 p-5 text-left transition-colors hover:border-primary/50"
                      >
                        <h3 className="font-display text-[16px] font-semibold text-foreground">{tName(term)}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{tShort(term)}</p>
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
