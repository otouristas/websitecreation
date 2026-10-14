import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { HelpFeedback } from "@/components/help/HelpFeedback";
import { BASE_URL } from "@/lib/seo/schema";
import type { SiteLocale } from "@/lib/i18n/locale";
import type { Block } from "@/data/help";
import { docsCopy } from "./DocsShell";
import { DocsToc, type TocHeading } from "./DocsToc";
import { PageActions, type PageActionsCopy } from "./PageActions";

export type { TocHeading };

/** h2/h3 blocks, including those inside tabs, as the "On this page" list. */
export function headingsOf(blocks: ReadonlyArray<Block>): TocHeading[] {
  return blocks.flatMap((b): TocHeading[] =>
    b.type === "h2" || b.type === "h3" ? [{ id: b.id, text: b.text, level: b.type === "h2" ? 2 : 3 }] : [],
  );
}

export function pageActionsCopy(locale: SiteLocale): PageActionsCopy {
  const el = locale === "el";
  return {
    copy: el ? "Αντιγραφή σελίδας" : "Copy page",
    copied: el ? "Αντιγράφηκε" : "Copied",
    copyHint: el ? "Ως Markdown, για LLMs" : "As Markdown for LLMs",
    view: el ? "Προβολή ως Markdown" : "View as Markdown",
    viewHint: el ? "Η σελίδα ως απλό κείμενο" : "This page as plain text",
    openIn: el ? "Άνοιγμα στο {name}" : "Open in {name}",
    openHint: el ? "Κάντε ερωτήσεις για αυτή τη σελίδα" : "Ask questions about this page",
    more: el ? "Περισσότερες επιλογές" : "More options",
  };
}

export interface PrevNext {
  readonly title: string;
  readonly href: string;
}

export interface Crumb {
  readonly name: string;
  readonly url: string;
}

/**
 * One docs page: eyebrow, title, page actions, lead, body, feedback and
 * previous/next, with "On this page" on the right from xl up.
 */
export function DocsPage({
  locale,
  eyebrow,
  title,
  description,
  path,
  markdown = true,
  headings,
  feedbackId,
  prev,
  next,
  rail,
  wide = false,
  children,
}: {
  readonly locale: SiteLocale;
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  /** The page path; its ".md" twin feeds the page actions. */
  readonly path: string;
  readonly markdown?: boolean;
  readonly headings: ReadonlyArray<TocHeading>;
  readonly feedbackId?: string;
  readonly prev?: PrevNext | null;
  readonly next?: PrevNext | null;
  /** Extra right-rail content under the table of contents. */
  readonly rail?: ReactNode;
  readonly wide?: boolean;
  readonly children: ReactNode;
}) {
  const t = docsCopy(locale);
  const el = locale === "el";
  return (
    <div className="mx-auto flex max-w-[76rem] gap-12 px-4 pb-20 pt-8 sm:px-8 lg:pt-10">
      <article className={wide ? "min-w-0 flex-1" : "min-w-0 flex-1 xl:max-w-[48rem]"}>
        {eyebrow ? <p className="text-[14px] font-semibold text-primary-glow">{eyebrow}</p> : null}
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-balance font-display text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[38px]">{title}</h1>
          {markdown ? <PageActions mdHref={`${path}.md`} pageUrl={`${BASE_URL}${path}`} copy={pageActionsCopy(locale)} /> : null}
        </div>
        {description ? <p className="mt-3 text-[18px] leading-relaxed text-muted-foreground">{description}</p> : null}

        {headings.length > 1 ? (
          <details className="group mt-6 rounded-xl border border-hairline bg-surface xl:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-[14px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {t.onThisPage}
              <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform group-open:rotate-90" aria-hidden />
            </summary>
            <div className="px-4 pb-4">
              <DocsToc headings={headings} label={t.onThisPage} />
            </div>
          </details>
        ) : null}

        <div className="mt-2">{children}</div>

        {feedbackId || prev || next ? (
          <div className="mt-16 grid gap-6 border-t border-hairline pt-8">
            {feedbackId ? (
              <HelpFeedback
                id={feedbackId}
                labels={{
                  question: el ? "Σας βοήθησε αυτή η σελίδα;" : "Was this page helpful?",
                  yes: el ? "Ναι" : "Yes",
                  no: el ? "Όχι" : "No",
                  thanksYes: el ? "Ευχαριστούμε! Χαιρόμαστε που βοήθησε." : "Thanks! Glad it helped.",
                  thanksNo: el ? "Ευχαριστούμε. Γράψτε μας τι έλειπε και θα το προσθέσουμε." : "Thanks. Tell us what was missing and we'll add it.",
                }}
              />
            ) : null}
            {prev || next ? (
              <nav aria-label={el ? "Προηγούμενη και επόμενη" : "Previous and next"} className="grid gap-3 sm:grid-cols-2">
                {prev ? (
                  <Link href={prev.href} className="group rounded-2xl border border-hairline p-4 transition-colors hover:border-primary/50">
                    <span className="inline-flex items-center gap-1 text-[12.5px] text-muted-foreground">
                      <ArrowLeft className="size-3.5" aria-hidden />
                      {el ? "Προηγούμενο" : "Previous"}
                    </span>
                    <span className="mt-1 block text-[15px] font-medium text-foreground group-hover:text-primary-glow">{prev.title}</span>
                  </Link>
                ) : (
                  <span aria-hidden />
                )}
                {next ? (
                  <Link href={next.href} className="group rounded-2xl border border-hairline p-4 text-right transition-colors hover:border-primary/50">
                    <span className="inline-flex items-center gap-1 text-[12.5px] text-muted-foreground">
                      {el ? "Επόμενο" : "Next"}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                    <span className="mt-1 block text-[15px] font-medium text-foreground group-hover:text-primary-glow">{next.title}</span>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </div>
        ) : null}
      </article>
      <aside className="hidden w-[15rem] shrink-0 xl:block">
        <div className="sticky top-[calc(3.5rem+2.5rem)] grid max-h-[calc(100dvh-7rem)] gap-8 overflow-y-auto pb-8 [scrollbar-width:none]">
          <DocsToc headings={headings} label={t.onThisPage} />
          {rail}
        </div>
      </aside>
    </div>
  );
}
