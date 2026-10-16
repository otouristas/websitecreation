"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Download, Printer, RotateCcw } from "lucide-react";
import { kitSecondaryBtn } from "@/components/kit/sections";
import { cn } from "@/lib/cn";
import {
  SEO_CHECKLIST,
  SEO_CHECKLIST_PAGE,
  allChecklistIds,
  type SeoChecklistGroup,
} from "@/data/seo-checklist";

const STORAGE_KEY = "asg-website-seo-checklist-v1";

const VALID_IDS = new Set(allChecklistIds());

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function csvCell(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

function sheetMarkdown(checked: ReadonlySet<string>): string {
  const lines = [
    "# Website SEO checklist",
    "",
    `Source: ${SEO_CHECKLIST_PAGE}`,
    "",
    "Mark an item only after you have checked it on the live site. Ticks in the browser stay on that device.",
    "",
  ];
  for (const group of SEO_CHECKLIST) {
    lines.push(`## ${group.title}`, "", group.intro, "");
    for (const item of group.items) {
      const box = checked.has(item.id) ? "x" : " ";
      lines.push(`- [${box}] **${item.label}.** ${item.detail}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function sheetCsv(checked: ReadonlySet<string>): string {
  const rows = [["group", "item", "how to verify", "done"]];
  for (const group of SEO_CHECKLIST) {
    for (const item of group.items) {
      rows.push([group.title, item.label, item.detail, checked.has(item.id) ? "yes" : "no"]);
    }
  }
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function sheetHtml(checked: ReadonlySet<string>): string {
  const groups = SEO_CHECKLIST.map((group) => {
    const items = group.items
      .map((item) => {
        const box = checked.has(item.id) ? "checked" : "";
        return `<li><label><input type="checkbox" ${box} disabled /> <strong>${escapeHtml(item.label)}.</strong> ${escapeHtml(item.detail)}</label></li>`;
      })
      .join("");
    return `<section><h2>${escapeHtml(group.title)}</h2><p>${escapeHtml(group.intro)}</p><ul>${items}</ul></section>`;
  }).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Website SEO checklist</title>
<style>
  body { font: 15px/1.5 Georgia, "Times New Roman", serif; color: #111; max-width: 42rem; margin: 2rem auto; padding: 0 1.25rem; }
  h1 { font-size: 1.6rem; line-height: 1.2; margin-bottom: 0.25rem; }
  h2 { font-size: 1.1rem; margin: 1.6rem 0 0.35rem; }
  p, li { margin: 0.35rem 0; }
  .meta { color: #333; font-size: 0.92rem; }
  ul { padding-left: 0; list-style: none; }
  a { color: inherit; }
</style>
</head>
<body>
<h1>Website SEO checklist</h1>
<p class="meta">Source: <a href="${SEO_CHECKLIST_PAGE}">${SEO_CHECKLIST_PAGE}</a></p>
${groups}
</body>
</html>`;
}

function downloadFile(filename: string, contents: string, type: string): void {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit(): void {
  for (const listener of listeners) listener();
}

let memory: string | null = null;

function readStored(): string {
  if (memory !== null) return memory;
  try {
    memory = localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    memory = "";
  }
  return memory;
}

function persist(ids: ReadonlySet<string>): void {
  const raw = JSON.stringify({ checked: [...ids] });
  memory = raw;
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Private mode or a full quota. This tab still keeps the ticks in memory.
  }
  emit();
}

function parseChecked(raw: string): ReadonlySet<string> {
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !("checked" in parsed)) return new Set();
    const stored = (parsed as { checked?: unknown }).checked;
    if (!Array.isArray(stored)) return new Set();
    return new Set(stored.filter((id): id is string => typeof id === "string" && VALID_IDS.has(id)));
  } catch {
    return new Set();
  }
}

export function SeoChecklist() {
  const stored = useSyncExternalStore(subscribe, readStored, () => "");
  const checked = useMemo(() => parseChecked(stored), [stored]);
  const [notice, setNotice] = useState<string | null>(null);

  const total = useMemo(() => allChecklistIds().length, []);
  const done = checked.size;

  function toggle(id: string): void {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    persist(next);
    setNotice(null);
  }

  function downloadMarkdown(): void {
    downloadFile("website-seo-checklist.md", sheetMarkdown(checked), "text/markdown;charset=utf-8");
    setNotice("Markdown sheet downloaded. Ticks you had marked are included.");
  }

  function downloadCsv(): void {
    downloadFile("website-seo-checklist.csv", sheetCsv(checked), "text/csv;charset=utf-8");
    setNotice("CSV sheet downloaded. Open it in a spreadsheet.");
  }

  function printSheet(): void {
    const popup = window.open("", "_blank");
    if (!popup) {
      downloadMarkdown();
      setNotice("The print window was blocked, so the Markdown sheet downloaded instead.");
      return;
    }
    popup.document.open();
    popup.document.write(sheetHtml(checked));
    popup.document.close();
    popup.focus();
    popup.print();
    setNotice("Print window opened. Use the browser print dialog to save a PDF or print the sheet.");
  }

  function clearChecks(): void {
    persist(new Set());
    setNotice("Ticks cleared on this browser.");
  }

  return (
    <section
      id="website-seo-checklist"
      aria-labelledby="website-seo-checklist-heading"
      className="my-10 rounded-2xl border border-hairline bg-surface p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand">
            Interactive sheet
          </p>
          <h2 id="website-seo-checklist-heading" className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-foreground">
            Website SEO checklist
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Ticks are saved in this browser only. Download the sheet if you want a copy you can share or file.
          </p>
        </div>
        <p className="font-mono text-[12px] text-muted-foreground" aria-live="polite">
          <span className="font-medium text-foreground">{done}</span> of {total} done
        </p>
      </div>

      <div
        className="mt-4 h-1.5 overflow-hidden rounded-full bg-foreground/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label="Checklist progress"
      >
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-200 motion-reduce:transition-none"
          style={{ width: total === 0 ? "0%" : `${(done / total) * 100}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={cn(kitSecondaryBtn, "min-h-10 px-3 text-[13px]")} onClick={downloadMarkdown}>
          <Download className="size-4" aria-hidden />
          Download Markdown
        </button>
        <button type="button" className={cn(kitSecondaryBtn, "min-h-10 px-3 text-[13px]")} onClick={downloadCsv}>
          <Download className="size-4" aria-hidden />
          Download CSV
        </button>
        <button type="button" className={cn(kitSecondaryBtn, "min-h-10 px-3 text-[13px]")} onClick={printSheet}>
          <Printer className="size-4" aria-hidden />
          Print
        </button>
        <button type="button" className={cn(kitSecondaryBtn, "min-h-10 px-3 text-[13px]")} onClick={clearChecks}>
          <RotateCcw className="size-4" aria-hidden />
          Clear ticks
        </button>
      </div>

      {notice ? (
        <p className="mt-3 text-sm text-muted-foreground" role="status">
          {notice}
        </p>
      ) : null}

      <div className="mt-6 space-y-8">
        {SEO_CHECKLIST.map((group) => (
          <ChecklistGroupView key={group.id} group={group} checked={checked} onToggle={toggle} />
        ))}
      </div>
    </section>
  );
}

function ChecklistGroupView({
  group,
  checked,
  onToggle,
}: {
  readonly group: SeoChecklistGroup;
  readonly checked: ReadonlySet<string>;
  readonly onToggle: (id: string) => void;
}) {
  const headingId = `seo-check-group-${group.id}`;
  return (
    <section aria-labelledby={headingId}>
      <h3 id={headingId} className="font-display text-base font-semibold text-foreground">
        {group.title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{group.intro}</p>
      <ul className="mt-3 divide-y divide-hairline">
        {group.items.map((item) => {
          const inputId = `seo-check-${item.id}`;
          const isChecked = checked.has(item.id);
          return (
            <li key={item.id} className="py-3">
              <label htmlFor={inputId} className="flex cursor-pointer items-start gap-3">
                <input
                  id={inputId}
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 accent-[var(--brand)]"
                  checked={isChecked}
                  onChange={() => onToggle(item.id)}
                />
                <span className="min-w-0">
                  <span className={cn("block text-[15px] font-medium text-foreground", isChecked && "text-muted-foreground line-through decoration-foreground/30")}>
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.detail}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
