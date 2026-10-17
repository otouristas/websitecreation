"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CornerDownLeft, FileText, Mail, Search, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_HREF } from "@/lib/contact-info";
import { cn } from "@/lib/cn";
import { searchHelp, type HelpSearchEntry } from "@/lib/help/search";

export interface HelpHomeSearchCopy {
  readonly placeholder: string;
  readonly empty: string;
  readonly emptyHint: string;
  readonly whatsapp: string;
  readonly contact: string;
  readonly clear: string;
}

interface Row {
  readonly key: string;
  readonly href: string;
  readonly title: string;
  readonly section: string;
  readonly text?: string;
  readonly external?: boolean;
  readonly icon: "doc" | "whatsapp" | "mail";
}

/** Large help-home search. Results stay in an overlay so the cards underneath do not move. */
export function HelpHomeSearch({
  entries,
  contactHref,
  copy,
}: {
  readonly entries: readonly HelpSearchEntry[];
  readonly contactHref: string;
  readonly copy: HelpHomeSearchCopy;
}) {
  const listId = useId();
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [closed, setClosed] = useState(false);
  const [panelMax, setPanelMax] = useState(360);

  const placePanel = () => {
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    const below = window.innerHeight - rect.bottom - 12;
    setPanelMax(Math.max(180, Math.min(384, Math.floor(below))));
  };

  const hits = useMemo(() => searchHelp(entries, query, 8), [entries, query]);
  const searching = query.trim().length > 0;
  const open = searching && !closed;

  const rows: Row[] = useMemo(() => {
    if (!searching) return [];
    if (hits.length > 0) {
      return hits.map((hit) => ({
        key: hit.href,
        href: hit.href,
        title: hit.title,
        section: hit.section,
        text: hit.snippet ?? hit.description,
        icon: "doc" as const,
      }));
    }
    return [
      { key: "whatsapp", href: WHATSAPP_HREF, title: copy.whatsapp, section: "", external: true, icon: "whatsapp" as const },
      { key: "contact", href: contactHref, title: copy.contact, section: "", icon: "mail" as const },
    ];
  }, [searching, hits, copy.whatsapp, copy.contact, contactHref]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setClosed(true);
    };
    const onResize = () => placePanel();
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || rows.length === 0) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setQuery("");
        setActive(0);
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(rows.length - 1, i + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const row = rows[active];
      if (!row) return;
      if (row.external) window.open(row.href, "_blank", "noopener,noreferrer");
      else router.push(row.href);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setQuery("");
      setActive(0);
      setClosed(false);
    }
  };

  const status = searching && hits.length === 0 ? copy.empty.replace("{query}", query.trim()) : "";

  return (
    <div ref={root} className="relative mt-6">
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        ref={input}
        id="help-home-search"
        type="search"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-autocomplete="list"
        aria-label={copy.placeholder}
        placeholder={copy.placeholder}
        value={query}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="search"
        onChange={(event) => {
          placePanel();
          setQuery(event.target.value);
          setActive(0);
          setClosed(false);
        }}
        onFocus={() => {
          placePanel();
          setClosed(false);
        }}
        onKeyDown={onKeyDown}
        className="h-14 w-full rounded-2xl border border-hairline bg-surface pl-12 pr-12 text-[16px] text-foreground outline-none placeholder:text-muted-foreground focus-visible:outline-none sm:h-16 sm:text-[18px] [&::-webkit-search-cancel-button]:hidden"
      />
      {query ? (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setActive(0);
            input.current?.focus();
          }}
          aria-label={copy.clear}
          className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
      {open ? (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-hairline bg-surface shadow-2xl">
          <div id={listId} role="listbox" aria-label={copy.placeholder} className="overflow-y-auto overscroll-contain p-2" style={{ maxHeight: Math.max(120, panelMax - 44) }}>
            {hits.length === 0 ? (
              <div className="px-3 py-4 text-center">
                <p className="text-[14px] font-medium text-foreground">{copy.empty.replace("{query}", query.trim())}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{copy.emptyHint}</p>
              </div>
            ) : null}
            {rows.map((row, i) => (
              <ResultLink
                key={row.key}
                id={`${listId}-${i}`}
                href={row.href}
                external={row.external}
                selected={i === active}
                onHover={() => setActive(i)}
              >
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-hairline text-muted-foreground">
                  <RowIcon icon={row.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  {row.section ? <span className="block text-[11.5px] text-muted-foreground">{row.section}</span> : null}
                  <span className={cn("block truncate text-[14.5px] font-medium text-foreground", !row.section && "py-1.5")}>{row.title}</span>
                  {row.text ? <span className="mt-0.5 line-clamp-2 block text-[13px] leading-5 text-muted-foreground">{row.text}</span> : null}
                </span>
              </ResultLink>
            ))}
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
      ) : null}
    </div>
  );
}

function ResultLink({
  id,
  href,
  external,
  selected,
  onHover,
  children,
}: {
  readonly id: string;
  readonly href: string;
  readonly external?: boolean;
  readonly selected: boolean;
  readonly onHover: () => void;
  readonly children: ReactNode;
}) {
  const className = cn("flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left", selected ? "bg-primary/10" : "hover:bg-primary/5");
  if (external) {
    return (
      <a id={id} role="option" aria-selected={selected} href={href} target="_blank" rel="noopener noreferrer" onMouseEnter={onHover} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link id={id} role="option" aria-selected={selected} href={href} onMouseEnter={onHover} className={className}>
      {children}
    </Link>
  );
}

function RowIcon({ icon }: { readonly icon: Row["icon"] }) {
  switch (icon) {
    case "doc":
      return <FileText className="size-4" aria-hidden />;
    case "whatsapp":
      return <WhatsAppIcon className="size-4 text-[#25D366]" />;
    case "mail":
      return <Mail className="size-4" aria-hidden />;
    default: {
      const never: never = icon;
      return never;
    }
  }
}
