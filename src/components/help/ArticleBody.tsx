import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, ChevronRight, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/i18n/locale";
import { resolveHelpHref, type Block, type Shot, type StepItem } from "@/data/help";
import { CopyButton, DocTabs, Zoomable } from "@/components/docs/DocClient";
import { docIcon } from "@/components/docs/icons";

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
            <code key={i} className="break-words rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[0.84em] text-foreground">
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
  warning: { icon: AlertTriangle, en: "Warning", el: "Προσοχή", className: "border-warning bg-[var(--asg-warning-surface)] [&_svg]:text-warning" },
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


/** A screenshot in a browser or iPhone frame. With a dark capture, each theme shows its own. */
export function ShotFrame({ shot, locale, className }: { readonly shot: Shot; readonly locale: SiteLocale; readonly className?: string }) {
  const el = locale === "el";
  const iphone = shot.device === "iphone";
  const img = (src: string, cls: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" className={cn("block h-auto w-full", cls)} />
  );
  const pictures = shot.srcDark ? (
    <>
      {img(shot.src, "docs-shot-light")}
      {img(shot.srcDark, "docs-shot-dark")}
    </>
  ) : (
    img(shot.src, "")
  );
  const frame = iphone ? (
    <div className="mx-auto w-full max-w-[17rem] rounded-[2.6rem] border border-hairline bg-[#0b1220] p-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
      <div className="overflow-hidden rounded-[2.1rem]">{pictures}</div>
    </div>
  ) : (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface p-1.5 shadow-[0_24px_60px_-34px_color-mix(in_oklab,var(--primary)_55%,transparent)]">
      <div className="flex items-center gap-1.5 px-2.5 pb-2 pt-1" aria-hidden>
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-3 h-5 flex-1 truncate rounded-md bg-foreground/[0.05] px-2 font-code text-[10.5px] leading-5 text-muted-foreground">{shot.address ?? "app.anotherseoguru.com"}</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-hairline">{pictures}</div>
    </div>
  );
  return (
    <figure className={cn("mt-7", className)}>
      <Zoomable label={el ? `Μεγέθυνση: ${shot.alt}` : `Enlarge: ${shot.alt}`} closeLabel={el ? "Κλείσιμο" : "Close"}>
        {frame}
      </Zoomable>
      {shot.caption ? (
        <figcaption className={cn("mt-3 text-[13.5px] leading-relaxed text-muted-foreground", iphone && "text-center")}>
          <Inline text={shot.caption} locale={locale} />
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Numbered steps joined by a line, as in Mintlify. */
function Steps({ items, locale }: { readonly items: ReadonlyArray<string | StepItem>; readonly locale: SiteLocale }) {
  return (
    <ol className="mt-7 grid">
      {items.map((raw, j) => {
        const item: StepItem = typeof raw === "string" ? { title: "", text: raw } : raw;
        const last = j === items.length - 1;
        return (
          <li key={j} className="relative flex gap-4 pb-7 last:pb-0">
            {!last ? <span aria-hidden className="absolute bottom-0 left-[0.9rem] top-9 w-px bg-hairline" /> : null}
            <span className="relative z-10 mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/12 font-mono text-[12.5px] font-semibold text-primary-glow">
              {j + 1}
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              {item.title ? <p className="font-display text-[16px] font-semibold tracking-[-0.01em] text-foreground">{item.title}</p> : null}
              {item.text ? (
                <p className={cn(item.title && "mt-1.5")}>
                  <Inline text={item.text} locale={locale} />
                </p>
              ) : null}
              {item.image ? <ShotFrame shot={item.image} locale={locale} className="mt-4" /> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ArticleBody({ blocks, locale, nested = false }: { readonly blocks: ReadonlyArray<Block>; readonly locale: SiteLocale; readonly nested?: boolean }) {
  return (
    <div className={cn(!nested && "text-[16px] leading-[1.75] text-foreground/85")}>
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
                  <li key={j} className="min-w-0">
                    <Inline text={item} locale={locale} />
                  </li>
                ))}
              </ul>
            );
          case "steps":
            return <Steps key={i} items={b.items} locale={locale} />;
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
              <div
                key={i}
                role="region"
                aria-label={`${locale === "el" ? "Πίνακας άρθρου" : "Article table"}: ${b.head.join(", ")}`}
                tabIndex={0}
                className="mt-7 overflow-x-auto rounded-2xl border border-hairline bg-surface focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
              >
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
          case "image":
            return <ShotFrame key={i} shot={b} locale={locale} />;
          case "gallery":
            return (
              <div key={i} className={cn("mt-7 grid gap-6", b.items.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                {b.items.map((shot) => (
                  <ShotFrame key={shot.src} shot={{ ...shot, device: shot.device ?? "iphone" }} locale={locale} className="mt-0" />
                ))}
              </div>
            );
          case "cards":
            return (
              <div key={i} className={cn("mt-7 grid gap-4", b.cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
                {b.items.map((c) => {
                  const Icon = docIcon(c.icon);
                  const href = resolveHelpHref(c.href, locale);
                  const inner = (
                    <>
                      {Icon ? <Icon className="size-5 text-primary-glow" aria-hidden /> : null}
                      <span className={cn("block font-display text-[15.5px] font-semibold text-foreground", Icon && "mt-4")}>{c.title}</span>
                      <span className="mt-1.5 block text-[14px] leading-relaxed text-muted-foreground">
                        <Inline text={c.text} locale={locale} />
                      </span>
                      <ArrowRight className="absolute right-5 top-5 size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                    </>
                  );
                  const cls = "group relative block rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-primary/50";
                  return href.startsWith("/") ? (
                    <Link key={c.href} href={href} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <a key={c.href} href={href} className={cls}>
                      {inner}
                    </a>
                  );
                })}
              </div>
            );
          case "tabs":
            return (
              <DocTabs key={i} labels={b.items.map((t) => t.label)}>
                {b.items.map((t) => (
                  <ArticleBody key={t.label} blocks={t.blocks} locale={locale} nested />
                ))}
              </DocTabs>
            );
          case "faq":
            return (
              <div key={i} className="mt-7 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface">
                {b.items.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 font-medium text-foreground hover:bg-foreground/[0.03] [&::-webkit-details-marker]:hidden">
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
                      <span className="text-[15px]">{f.q}</span>
                    </summary>
                    <div className="px-5 pb-5 pl-12 text-[15px]">
                      <Inline text={f.a} locale={locale} />
                    </div>
                  </details>
                ))}
              </div>
            );
          case "code":
            return (
              <div key={i} className="mt-7 overflow-hidden rounded-2xl border border-hairline bg-[color-mix(in_oklab,var(--surface)_70%,var(--background))]">
                <div className="flex items-center gap-2 border-b border-hairline px-4 py-1.5">
                  <span className="font-code text-[12px] text-muted-foreground">{b.title ?? b.lang ?? "text"}</span>
                  <span className="ml-auto">
                    <CopyButton text={b.text} label={locale === "el" ? "Αντιγραφή" : "Copy"} />
                  </span>
                </div>
                <pre className="overflow-x-auto px-4 py-3.5 font-code text-[13px] leading-6 text-foreground">
                  <code>{b.text}</code>
                </pre>
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
