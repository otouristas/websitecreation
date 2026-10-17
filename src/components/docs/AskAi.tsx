"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, FileText, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { searchDocs, rankForQuestion, type DocEntry } from "@/lib/docs/search-core";
import { useDocsUI } from "./DocsUI";

export interface AskCopy {
  readonly title: string;
  readonly button: string;
  readonly placeholder: string;
  readonly intro: string;
  readonly suggestions: ReadonlyArray<string>;
  readonly sources: string;
  readonly thinking: string;
  readonly fallbackIntro: string;
  readonly handoff: string;
  readonly limited: string;
  readonly close: string;
  readonly disclaimer: string;
}

type Source = { href: string; title: string; section: string };
type Turn = { q: string; a: string; sources: Source[]; mode: "ai" | "fallback" | "error"; done: boolean };

const BOLD = /(\*\*[^*]+\*\*|`[^`]+`)/g;
function inline(text: string): ReactNode {
  return text.split(BOLD).map((p, i) =>
    p.startsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {p.slice(2, -2)}
      </strong>
    ) : p.startsWith("`") ? (
      <code key={i} className="rounded border border-hairline px-1 font-code text-[0.85em]">
        {p.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
}

/** Enough Markdown for an answer: paragraphs, bullet and numbered lists, bold and code. */
function Answer({ text }: { readonly text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="grid gap-2.5">
      {blocks.map((b, i) => {
        const lines = b.split("\n").filter(Boolean);
        if (lines.length > 0 && lines.every((l) => /^\s*([-*]|\d+\.)\s/.test(l))) {
          const ordered = /^\s*\d+\./.test(lines[0]);
          const List = ordered ? "ol" : "ul";
          return (
            <List key={i} className={cn("grid gap-1 pl-5", ordered ? "list-decimal" : "list-disc")}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\s*([-*]|\d+\.)\s/, ""))}</li>
              ))}
            </List>
          );
        }
        return <p key={i}>{inline(b.replace(/^#+\s*/, ""))}</p>;
      })}
    </div>
  );
}

const indexPromise: Partial<Record<string, Promise<DocEntry[]>>> = {};
const loadIndex = (locale: string) => (indexPromise[locale] ??= fetch(`/api/docs-index/${locale}`).then((r) => (r.ok ? r.json() : [])));

function handoffLinks(question: string, pageUrl: string) {
  const prompt = `Using the AnotherSEOGuru App docs at https://anotherseoguru.com/llms-full.txt (current page: ${pageUrl}), answer: ${question}`;
  const q = encodeURIComponent(prompt);
  return [
    { label: "ChatGPT", href: `https://chatgpt.com/?hints=search&q=${q}` },
    { label: "Claude", href: `https://claude.ai/new?q=${q}` },
    { label: "Perplexity", href: `https://www.perplexity.ai/search?q=${q}` },
  ];
}

/** Floating "Ask AI" button and its side panel. */
export function AskAi({ copy }: { readonly copy: AskCopy }) {
  const ui = useDocsUI();
  const pathname = usePathname() ?? "";
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const open = ui.panel === "ask";

  useEffect(() => {
    if (open) window.setTimeout(() => input.current?.focus(), 30);
  }, [open]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [turns]);

  const update = (i: number, patch: Partial<Turn>) => setTurns((t) => t.map((x, j) => (j === i ? { ...x, ...patch } : x)));

  async function submit(question: string) {
    const q = question.trim();
    if (q.length < 3 || busy) return;
    setDraft("");
    setBusy(true);
    const i = turns.length;
    setTurns((t) => [...t, { q, a: "", sources: [], mode: "ai", done: false }]);
    try {
      const res = await fetch("/api/ask-docs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q, locale: ui.locale, page: pathname }),
      });
      if (!res.ok || !res.body) {
        const index = await loadIndex(ui.locale);
        const hits = searchDocs(index, q, 5);
        const ranked = hits.length ? hits : rankForQuestion(index, q, 5);
        update(i, { mode: res.status === 429 ? "error" : "fallback", a: res.status === 429 ? copy.limited : "", sources: ranked.map((h) => ({ href: h.href, title: h.title, section: h.section })), done: true });
        return;
      }
      let sources: Source[] = [];
      try {
        sources = JSON.parse(decodeURIComponent(res.headers.get("x-sources") ?? "[]"));
      } catch {
        sources = [];
      }
      update(i, { sources });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        update(i, { a: text });
      }
      update(i, { done: true });
    } catch {
      update(i, { mode: "fallback", done: true });
    } finally {
      setBusy(false);
    }
  }

  // A question handed over from search.
  const pending = ui.pendingQuestion;
  const handled = useRef("");
  useEffect(() => {
    if (open && pending && handled.current !== pending) {
      handled.current = pending;
      void submit(pending);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pending]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submit(draft);
  };
  const pageUrl = `https://anotherseoguru.com${pathname}`;

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => ui.open("ask")}
          style={{ bottom: "calc(max(var(--chrome-bottom-bar), 0px) + var(--chrome-cookie-bar, 0px) + 1.25rem)" }}
          className="asg-primary-action fixed right-5 z-[60] hidden h-12 items-center gap-2 rounded-full pl-4 pr-5 font-display text-[14.5px] font-semibold text-primary-foreground shadow-[0_14px_40px_-12px_color-mix(in_oklab,var(--primary)_85%,transparent)] transition-transform hover:-translate-y-0.5 lg:inline-flex"
        >
          <Sparkles className="size-4.5" aria-hidden />
          {copy.button}
        </button>
      ) : null}
      {open ? (
        <aside
          role="dialog"
          aria-label={copy.title}
          className="fixed inset-y-0 right-0 z-[85] flex w-full flex-col border-l border-hairline bg-surface shadow-2xl sm:w-[28rem]"
        >
          <div className="flex h-14 items-center gap-2 border-b border-hairline px-4">
            <Sparkles className="size-4.5 text-primary-glow" aria-hidden />
            <p className="font-display text-[15px] font-semibold text-foreground">{copy.title}</p>
            <button type="button" onClick={ui.close} aria-label={copy.close} className="ml-auto grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 py-5 text-[14.5px] leading-relaxed text-foreground/85">
            {turns.length === 0 ? (
              <div>
                <p className="text-muted-foreground">{copy.intro}</p>
                <div className="mt-4 grid gap-2">
                  {copy.suggestions.map((s) => (
                    <button key={s} type="button" onClick={() => void submit(s)} className="rounded-xl border border-hairline px-3.5 py-2.5 text-left text-[14px] text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="grid gap-6">
              {turns.map((t, i) => (
                <div key={i} className="grid gap-3">
                  <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary/12 px-3.5 py-2 text-foreground">{t.q}</p>
                  {t.mode === "ai" ? (
                    t.a ? <Answer text={t.a} /> : <p className="animate-pulse text-muted-foreground">{copy.thinking}</p>
                  ) : t.mode === "error" ? (
                    <p className="text-muted-foreground">{t.a}</p>
                  ) : (
                    <div>
                      <p className="text-muted-foreground">{copy.fallbackIntro}</p>
                      <p className="mt-3 text-[12.5px] font-medium text-muted-foreground">{copy.handoff}</p>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {handoffLinks(t.q, pageUrl).map((l) => (
                          <a key={l.label} href={l.href} target="_blank" rel="noopener" className="rounded-full border border-hairline px-3 py-1 text-[13px] font-medium text-foreground hover:border-primary/40">
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {t.sources.length > 0 && (t.done || t.a) ? (
                    <div>
                      <p className="text-[12.5px] font-medium text-muted-foreground">{copy.sources}</p>
                      <ul className="mt-1.5 grid gap-1.5">
                        {t.sources.map((s) => (
                          <li key={s.href}>
                            <Link href={s.href} onClick={ui.close} className="flex items-start gap-2 rounded-lg border border-hairline px-3 py-2 text-[13.5px] hover:border-primary/40">
                              <FileText className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden />
                              <span className="min-w-0">
                                <span className="block truncate font-medium text-foreground">{s.title}</span>
                                <span className="block truncate text-[12px] text-muted-foreground">{s.section}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={onSubmit} className="border-t border-hairline p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-hairline bg-background px-3 py-2 focus-within:border-primary/50">
              <textarea
                ref={input}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void submit(draft);
                  }
                }}
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
                className="max-h-32 min-h-9 flex-1 resize-none bg-transparent py-1.5 text-[14.5px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" disabled={busy || draft.trim().length < 3} aria-label={copy.button} className="asg-primary-action grid size-9 shrink-0 place-items-center rounded-xl text-primary-foreground disabled:opacity-40">
                <ArrowUp className="size-4" aria-hidden />
              </button>
            </div>
            <p className="mt-2 px-1 text-[11.5px] text-muted-foreground">{copy.disclaimer}</p>
          </form>
        </aside>
      ) : null}
    </>
  );
}
