"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { FileText, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SearchEntry } from "@/data/help";

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

interface Hit extends SearchEntry {
  readonly score: number;
  readonly snippet: string | null;
}

/** Every word must match; title matches rank first. Greek accents are ignored. */
function search(index: ReadonlyArray<SearchEntry>, query: string): Hit[] {
  const words = fold(query).split(/\s+/).filter((w) => w.length > 1);
  if (words.length === 0) return [];
  const hits: Hit[] = [];
  for (const entry of index) {
    const title = fold(entry.title);
    const description = fold(entry.description);
    const body = fold(entry.text);
    let score = 0;
    let all = true;
    for (const w of words) {
      const s = (title.includes(w) ? 10 : 0) + (description.includes(w) ? 4 : 0) + (body.includes(w) ? 1 : 0);
      if (s === 0) all = false;
      score += s;
    }
    if (!all) continue;
    const at = title.includes(words[0]) || description.includes(words[0]) ? -1 : body.indexOf(words[0]);
    let snippet: string | null = null;
    if (at >= 0) {
      const from = at > 40 ? entry.text.indexOf(" ", at - 40) + 1 : 0;
      const to = entry.text.lastIndexOf(" ", at + 110);
      snippet = `${from > 0 ? "…" : ""}${entry.text.slice(from, to > at ? to : at + 110).trim()}…`;
    }
    hits.push({ ...entry, score, snippet });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 8);
}

export function HelpSearch({
  index,
  labels,
  size = "bar",
  shortcut = false,
}: {
  readonly index: ReadonlyArray<SearchEntry>;
  readonly labels: { readonly placeholder: string; readonly empty: string; readonly emptyHint: string };
  readonly size?: "bar" | "hero";
  readonly shortcut?: boolean;
}) {
  const router = useRouter();
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const hits = useMemo(() => search(index, query), [index, query]);
  const showList = open && query.trim().length > 1;

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key === "/" && !(t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable))) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  const go = (i: number) => {
    const hit = hits[i];
    if (!hit) return;
    router.push(hit.href);
    setQuery("");
    setOpen(false);
    input.current?.blur();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(hits.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(active);
    } else if (e.key === "Escape") {
      setOpen(false);
      input.current?.blur();
    }
  };

  const hero = size === "hero";
  return (
    <div className="relative w-full text-left">
      <Search className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground", hero ? "left-5 size-5" : "left-3.5 size-4")} aria-hidden />
      <input
        ref={input}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={showList && hits[active] ? `${listId}-${active}` : undefined}
        aria-autocomplete="list"
        aria-label={labels.placeholder}
        placeholder={labels.placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
        className={cn(
          "w-full rounded-2xl border border-hairline bg-surface text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary/60 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent)] [&::-webkit-search-cancel-button]:hidden",
          hero ? "h-16 pl-14 pr-5 text-[17px]" : "h-11 pl-10 pr-10 text-[14px]",
        )}
      />
      {shortcut && !query ? (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-hairline px-1.5 font-mono text-[11px] text-muted-foreground sm:block">/</kbd>
      ) : null}
      {showList ? (
        <div id={listId} role="listbox" className="absolute inset-x-0 top-full z-50 mt-2 max-h-[min(30rem,70dvh)] overflow-y-auto rounded-2xl border border-hairline bg-surface-raised p-1.5 shadow-2xl">
          {hits.length === 0 ? (
            <div className="px-4 py-7 text-center">
              <p className="text-[14px] font-medium text-foreground">{labels.empty.replace("{query}", query.trim())}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{labels.emptyHint}</p>
            </div>
          ) : (
            hits.map((hit, i) => (
              <button
                key={hit.href}
                id={`${listId}-${i}`}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(i)}
                className={cn("flex w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left", i === active ? "bg-primary/10" : "hover:bg-primary/5")}
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="min-w-0">
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{hit.category}</span>
                  <span className="mt-0.5 block truncate text-[14px] font-semibold text-foreground">{hit.title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-[13px] leading-5 text-muted-foreground">{hit.snippet ?? hit.description}</span>
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
