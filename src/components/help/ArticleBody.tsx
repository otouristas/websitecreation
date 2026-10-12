import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/i18n/locale";
import { resolveHelpHref, type Block } from "@/data/help";

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|[\w.+-]+@[\w-]+\.[a-z]{2,})/g;
const LINK = "font-medium text-link underline decoration-hairline underline-offset-4 hover:decoration-current";

/** **bold**, `code`, [label](/path) and bare email addresses. */
export function Inline({ text, locale }: { readonly text: string; readonly locale: SiteLocale }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
        if (part.startsWith("**")) return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        if (part.startsWith("`")) {
          return (
            <code key={i} className="rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[0.84em] text-foreground">
              {part.slice(1, -1)}
            </code>
          );
        }
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const href = resolveHelpHref(link[2], locale);
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={LINK}>
              {link[1]}
            </Link>
          ) : (
            <a key={i} href={href} className={LINK} rel="noopener">
              {link[1]}
            </a>
          );
        }
        return (
          <a key={i} href={`mailto:${part}`} className={LINK}>
            {part}
          </a>
        );
      })}
    </>
  );
}

const NOTE = {
  info: { icon: Info, en: "Note", el: "Σημείωση", className: "border-primary/30 bg-primary/[0.07] [&_svg]:text-primary-glow" },
  tip: { icon: Lightbulb, en: "Tip", el: "Συμβουλή", className: "border-signal/30 bg-signal/[0.07] [&_svg]:text-signal" },
  warning: { icon: AlertTriangle, en: "Warning", el: "Προσοχή", className: "border-amber-400/35 bg-amber-400/[0.07] [&_svg]:text-amber-400" },
} as const;

function Heading({ level, id, children }: { readonly level: 2 | 3; readonly id: string; readonly children: ReactNode }) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag
      id={id}
      className={cn(
        "group scroll-mt-[calc(var(--site-header-height)+1.5rem)] font-display font-semibold tracking-[-0.025em] text-foreground",
        level === 2 ? "mt-12 border-b border-hairline pb-3 text-[24px]" : "mt-8 text-[18px]",
      )}
    >
      {children}
      <a href={`#${id}`} aria-hidden tabIndex={-1} className="ml-2 font-mono text-[0.7em] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        #
      </a>
    </Tag>
  );
}

export function ArticleBody({ blocks, locale }: { readonly blocks: ReadonlyArray<Block>; readonly locale: SiteLocale }) {
  return (
    <div className="text-[16px] leading-[1.75] text-foreground/85">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mt-5">
                <Inline text={b.text} locale={locale} />
              </p>
            );
          case "h2":
            return (
              <Heading key={i} level={2} id={b.id}>
                {b.text}
              </Heading>
            );
          case "h3":
            return (
              <Heading key={i} level={3} id={b.id}>
                {b.text}
              </Heading>
            );
          case "list":
            return (
              <ul key={i} className="mt-5 grid list-disc gap-2.5 pl-6 marker:text-muted-foreground">
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} locale={locale} />
                  </li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="mt-6 grid gap-4">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-[12px] font-semibold text-primary-foreground">
                      {j + 1}
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <Inline text={item} locale={locale} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "note": {
            const note = NOTE[b.tone];
            const Icon = note.icon;
            return (
              <div key={i} role="note" className={cn("mt-7 flex gap-3 rounded-2xl border px-5 py-4 text-[15px] leading-relaxed", note.className)}>
                <Icon className="mt-1 size-4 shrink-0" aria-hidden />
                <div className="min-w-0">
                  <span className="mr-1.5 font-semibold text-foreground">{locale === "el" ? note.el : note.en}:</span>
                  <Inline text={b.text} locale={locale} />
                </div>
              </div>
            );
          }
          case "table":
            return (
              <div key={i} className="mt-7 overflow-x-auto rounded-2xl border border-hairline bg-surface">
                <table className="w-full min-w-[32rem] border-collapse text-left text-[14.5px]">
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="border-b border-hairline px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-b border-hairline last:border-0">
                        {row.map((cell, c) => (
                          <td key={c} className={cn("px-4 py-3 align-top", c === 0 && "font-medium text-foreground")}>
                            <Inline text={cell} locale={locale} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default: {
            const never: never = b;
            return never;
          }
        }
      })}
    </div>
  );
}
