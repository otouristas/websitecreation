"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, CornerDownLeft, FileText, Layers, Search, Smartphone, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { searchDocs, type DocEntry, type DocKind } from "@/lib/docs/search-core";
import { useDocsUI } from "./DocsUI";

const KIND_ICON: Record<DocKind, typeof FileText> = { guide: FileText, iphone: Smartphone, term: BookOpen, resource: Layers };

const cache: Partial<Record<string, Promise<DocEntry[]>>> = {};
function loadIndex(locale: string): Promise<DocEntry[]> {
  cache[locale] ??= fetch(`/api/docs-index/${locale}`).then((r) => (r.ok ? r.json() : []));
  return cache[locale]!;
}

export interface SearchCopy {
  readonly placeholder: string;
  readonly empty: string;
  readonly emptyHint: string;
  readonly askAi: string;
  readonly quick: string;
  readonly close: string;
  readonly quickLinks: ReadonlyArray<{ readonly title: string; readonly href: string; readonly section: string }>;
}

/** ⌘K search across guides, iPhone guides, glossary and resources, with a hand-off to Ask AI. */
export function DocsSearch({ copy }: { readonly copy: SearchCopy }) {
  const ui = useDocsUI();
  const router = useRouter();
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState<DocEntry[] | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const isOpen = ui.panel === "search";

  useEffect(() => {
    if (!isOpen) return;
    let live = true;
    loadIndex(ui.locale).then((i) => live && setIndex(i));
    const t = window.setTimeout(() => input.current?.focus(), 10);
    return () => {
      live = false;
      window.clearTimeout(t);
    };
  }, [isOpen, ui.locale]);

  const hits = useMemo(() => (index && query.trim().length > 1 ? searchDocs(index, query, 12) : []), [index, query]);
  const searching = query.trim().length > 1;
  // The last row is always "Ask AI about …" while typing.
  const rows = searching ? hits.length + 1 : copy.quickLinks.length;

  if (!isOpen) return null;

  const go = (i: number) => {
    if (searching && i === hits.length) {
      ui.ask(query.trim());
      setQuery("");
      return;
    }
    const href = searching ? hits[i]?.href : copy.quickLinks[i]?.href;
    if (!href) return;
    ui.close();
    setQuery("");
    router.push(href);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(rows - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(active);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[10vh] backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && ui.close()}>
      <div role="dialog" aria-modal="true" aria-label={copy.placeholder} className="w-full max-w-2xl overflow-hidden rounded-2xl border border-hairline bg-surface shadow-2xl">
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={input}
            type="search"
            role="combobox"
            aria-expanded
            aria-controls={listId}
            aria-activedescendant={`${listId}-${active}`}
            aria-label={copy.placeholder}
            placeholder={copy.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            className="h-14 min-w-0 flex-1 bg-transparent outline-none focus-visible:outline-none text-[16px] text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
          />
          <button type="button" onClick={ui.close} aria-label={copy.close} className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
            <X className="size-4" aria-hidden />
          </button>
        </div>
        <div id={listId} role="listbox" className="max-h-[min(32rem,65dvh)] overflow-y-auto p-2">
          {!searching ? (
            <>
              <p className="px-3 pb-1 pt-2 text-[12px] font-medium text-muted-foreground">{copy.quick}</p>
              {copy.quickLinks.map((l, i) => (
                <Row key={l.href} id={`${listId}-${i}`} active={i === active} onHover={() => setActive(i)} onPick={() => go(i)} icon={FileText} section={l.section} title={l.title} />
              ))}
            </>
          ) : (
            <>
              {index && hits.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-[14px] font-medium text-foreground">{copy.empty.replace("{query}", query.trim())}</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">{copy.emptyHint}</p>
                </div>
              ) : null}
              {hits.map((h, i) => (
                <Row
                  key={h.href}
                  id={`${listId}-${i}`}
                  active={i === active}
                  onHover={() => setActive(i)}
                  onPick={() => go(i)}
                  icon={KIND_ICON[h.kind]}
                  section={h.section}
                  title={h.title}
                  text={h.snippet ?? h.description}
                />
              ))}
              <Row
                id={`${listId}-${hits.length}`}
                active={active === hits.length}
                onHover={() => setActive(hits.length)}
                onPick={() => go(hits.length)}
                icon={Sparkles}
                accent
                section="Ask AI"
                title={copy.askAi.replace("{query}", query.trim())}
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-hairline px-4 py-2.5 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-hairline px-1">↑</kbd>
            <kbd className="rounded border border-hairline px-1">↓</kbd>
          </span>
          <span className="inline-flex items-center gap-1">
            <CornerDownLeft className="size-3.5" aria-hidden />
          </span>
          <span className="ml-auto">
            <kbd className="rounded border border-hairline px-1">esc</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}

function Row({
  id,
  active,
  onHover,
  onPick,
  icon: Icon,
  section,
  title,
  text,
  accent = false,
}: {
  readonly id: string;
  readonly active: boolean;
  readonly onHover: () => void;
  readonly onPick: () => void;
  readonly icon: typeof FileText;
  readonly section: string;
  readonly title: string;
  readonly text?: string;
  readonly accent?: boolean;
}) {
  return (
    <button
      id={id}
      type="button"
      role="option"
      aria-selected={active}
      onMouseEnter={onHover}
      onClick={onPick}
      className={cn("flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left", active ? "bg-primary/10" : "hover:bg-primary/5")}
    >
      <span className={cn("mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-hairline", accent ? "text-primary-glow" : "text-muted-foreground")}>
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11.5px] text-muted-foreground">{section}</span>
        <span className="block truncate text-[14.5px] font-medium text-foreground">{title}</span>
        {text ? <span className="mt-0.5 line-clamp-2 block text-[13px] leading-5 text-muted-foreground">{text}</span> : null}
      </span>
    </button>
  );
}
