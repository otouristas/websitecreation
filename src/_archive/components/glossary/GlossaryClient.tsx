"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, ChevronRight, Code, Lightbulb, Search, Zap } from "lucide-react";
import { glossaryCategories, type GlossaryCategory, type GlossaryTerm } from "@/data/glossary-data";
import { resolveMarketingPath } from "@/lib/marketing-links";

const categoryBadgeClass: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-700 border border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-700 border border-purple-500/20",
  green: "bg-green-500/10 text-green-700 border border-green-500/20",
  orange: "bg-orange-500/10 text-orange-700 border border-orange-500/20",
  cyan: "bg-cyan-500/10 text-cyan-700 border border-cyan-500/20",
  yellow: "bg-yellow-500/10 text-yellow-800 border border-yellow-500/20",
  red: "bg-red-500/10 text-red-700 border border-red-500/20",
  indigo: "bg-indigo-500/10 text-indigo-700 border border-indigo-500/20",
  emerald: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-800 border border-amber-500/20",
  violet: "bg-violet-500/10 text-violet-700 border border-violet-500/20",
  slate: "bg-slate-500/10 text-slate-700 border border-slate-500/20",
  pink: "bg-pink-500/10 text-pink-700 border border-pink-500/20",
};

function getAllTerms(): { category: GlossaryCategory; term: GlossaryTerm }[] {
  const terms: { category: GlossaryCategory; term: GlossaryTerm }[] = [];
  glossaryCategories.forEach((category) => {
    category.terms.forEach((term) => {
      terms.push({ category, term });
    });
  });
  return terms;
}

function getTotalTermCount(): number {
  return glossaryCategories.reduce((acc, cat) => acc + cat.terms.length, 0);
}

function RelatedResourceLink(props: { readonly title: string; readonly url: string }) {
  const href = resolveMarketingPath(props.url);
  const isExternal = href.startsWith("http");
  const className =
    "flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 text-left w-full";
  if (isExternal) {
    return (
      <a href={href} className={className} rel="noopener noreferrer" target="_blank">
        <span className="font-medium text-foreground">{props.title}</span>
        <span className="text-xs text-muted-foreground">App</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      <span className="font-medium text-foreground">{props.title}</span>
      <span className="text-muted-foreground text-sm">→</span>
    </Link>
  );
}

export function GlossaryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category"));
  const [selectedTerm, setSelectedTerm] = useState<string | null>(searchParams.get("term"));
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(glossaryCategories.map((c) => c.id)),
  );

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
      router.replace(q ? `/glossary?${q}` : "/glossary", { scroll: false });
    },
    [router],
  );

  const selectTerm = (categoryId: string, termId: string) => {
    setSelectedCategory(categoryId);
    setSelectedTerm(termId);
    syncUrl(categoryId, termId);
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return null;
    }
    const query = searchQuery.toLowerCase();
    return getAllTerms().filter(
      ({ term }) =>
        term.term.toLowerCase().includes(query) ||
        term.shortDefinition.toLowerCase().includes(query) ||
        term.fullDefinition.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const currentTerm = useMemo(() => {
    if (!selectedTerm) {
      return null;
    }
    for (const category of glossaryCategories) {
      const term = category.terms.find((t) => t.id === selectedTerm);
      if (term) {
        return { category, term };
      }
    }
    return null;
  }, [selectedTerm]);

  const filteredCategories = useMemo(() => {
    if (selectedCategory) {
      return glossaryCategories.filter((c) => c.id === selectedCategory);
    }
    return glossaryCategories;
  }, [selectedCategory]);

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

  const clearSelection = () => {
    setSelectedCategory(null);
    setSelectedTerm(null);
    syncUrl(null, null);
  };

  return (
    <div className="main-below-header flex min-h-[calc(100vh-var(--site-header-height))] flex-col lg:flex-row">
      <aside className="shrink-0 border-border bg-muted/20 lg:min-h-screen lg:w-72 lg:border-r border-b lg:border-b-0">
        <div className="sticky top-[calc(var(--site-header-height)+0.25rem)] max-h-[calc(100vh-var(--site-header-height)-0.5rem)] overflow-y-auto p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <button
            type="button"
            onClick={clearSelection}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium mb-2 ${
              !selectedCategory && !selectedTerm ? "bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            All categories
          </button>
          <nav className="space-y-1">
            {glossaryCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isExpanded = expandedCategories.has(category.id);
              const isActive = selectedCategory === category.id;
              return (
                <div key={category.id} className="mb-1">
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <CategoryIcon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{category.title}</span>
                      <span className="text-[10px] px-1.5 py-0 rounded bg-muted text-muted-foreground">{category.terms.length}</span>
                    </span>
                    <ChevronRight className={`h-4 w-4 shrink-0 transition ${isExpanded ? "rotate-90" : ""}`} />
                  </button>
                  {isExpanded ? (
                    <div className="ml-4 pl-3 border-l border-border mt-1 space-y-0.5">
                      {category.terms.map((term) => (
                        <button
                          key={term.id}
                          type="button"
                          onClick={() => selectTerm(category.id, term.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-sm truncate ${
                            selectedTerm === term.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {term.term}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-y-auto">
        {searchResults ? (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-lg font-semibold mb-4">Search results</h2>
            <ul className="space-y-2">
              {searchResults.map(({ category, term }) => (
                <li key={term.id}>
                  <button
                    type="button"
                    onClick={() => selectTerm(category.id, term.id)}
                    className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50"
                  >
                    <span className="font-medium text-foreground">{term.term}</span>
                    <span className="block text-sm text-muted-foreground line-clamp-2">{term.shortDefinition}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : currentTerm ? (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
              <button type="button" onClick={clearSelection} className="hover:text-primary">
                Glossary
              </button>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>{currentTerm.category.title}</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">{currentTerm.term.term}</span>
            </nav>
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md mb-3 ${categoryBadgeClass[currentTerm.category.color] ?? "bg-muted"}`}>
              {currentTerm.category.title}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{currentTerm.term.term}</h1>
            <p className="text-lg text-muted-foreground mb-8">{currentTerm.term.shortDefinition}</p>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-foreground">Definition</h2>
              <p className="text-muted-foreground leading-relaxed">{currentTerm.term.fullDefinition}</p>
            </section>
            {currentTerm.term.example ? (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-foreground">Example</h2>
                <div className="bg-muted/50 rounded-lg p-4 border border-border flex gap-3">
                  <Code className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <code className="text-sm whitespace-pre-wrap text-foreground">{currentTerm.term.example}</code>
                </div>
              </section>
            ) : null}
            {currentTerm.term.technique ? (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-foreground">How to implement</h2>
                <div className="rounded-lg p-4 border border-primary/20 bg-primary/5 flex gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{currentTerm.term.technique}</p>
                </div>
              </section>
            ) : null}
            {currentTerm.term.proTip ? (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-foreground">Pro tip</h2>
                <div className="rounded-lg p-4 border border-secondary/30 bg-secondary/5 flex gap-3">
                  <Lightbulb className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{currentTerm.term.proTip}</p>
                </div>
              </section>
            ) : null}
            {currentTerm.term.relatedLinks && currentTerm.term.relatedLinks.length > 0 ? (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-foreground">Related resources</h2>
                <div className="grid gap-2">
                  {currentTerm.term.relatedLinks.map((link) => (
                    <RelatedResourceLink key={`${link.title}-${link.url}`} title={link.title} url={link.url} />
                  ))}
                </div>
              </section>
            ) : null}
            {currentTerm.term.relatedTerms && currentTerm.term.relatedTerms.length > 0 ? (
              <section className="pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Related terms</h3>
                <div className="flex flex-wrap gap-2">
                  {currentTerm.term.relatedTerms.map((termId) => {
                    const found = getAllTerms().find((t) => t.term.id === termId);
                    if (!found) {
                      return null;
                    }
                    return (
                      <button
                        key={termId}
                        type="button"
                        onClick={() => selectTerm(found.category.id, termId)}
                        className="px-3 py-1.5 text-sm bg-muted rounded-full hover:bg-muted/80"
                      >
                        {found.term.term}
                      </button>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                SEO <span className="gradient-text">Glossary</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{getTotalTermCount()}+ terms with examples and tactics.</p>
            </div>
            {filteredCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <div key={category.id} className="mb-12">
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <div className={`p-2 rounded-lg ${categoryBadgeClass[category.color] ?? ""}`}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.terms.length} terms</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {category.terms.map((term) => (
                      <button
                        key={term.id}
                        type="button"
                        onClick={() => selectTerm(category.id, term.id)}
                        className="text-left p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all"
                      >
                        <h3 className="font-semibold mb-2 text-foreground">{term.term}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{term.shortDefinition}</p>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
