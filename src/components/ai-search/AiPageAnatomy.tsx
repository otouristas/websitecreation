import type { ReactNode } from 'react';
import {
  ANATOMY_NOTES,
  ANATOMY_DISCLAIMER,
  SAMPLE_PAGE,
  type AnatomyNote,
} from '@/data/ai-page-anatomy';
import { cn } from '@/lib/cn';

/**
 * The annotated page: a sample document in the middle, twelve notes in the
 * gutters, each one numbered to the part of the document it is about.
 *
 * The source for this idea is a static image, and an image is the one format
 * that fails every point it is making - a model reading this page would get
 * nothing out of a picture of good markup. So it is built as HTML: the notes
 * are a list, the sample is text, and the numbering survives the collapse to
 * one column on a phone, where no drawn connector could.
 *
 * The document is fiction and says so in three places: the chrome, the caption
 * under the statistic and the footnote. Nothing in it is a figure this agency
 * is publishing.
 */

/** Explicit grid placement so the DOM order stays 1..12 while the notes
    alternate gutters on wide screens. Literal classes: Tailwind scans source. */
const ROW_START = [
  'xl:row-start-1',
  'xl:row-start-2',
  'xl:row-start-3',
  'xl:row-start-4',
  'xl:row-start-5',
  'xl:row-start-6',
] as const;

/**
 * The numeral tying a note to the part of the document it is about.
 *
 * Drawn with `content: attr(data-n)` rather than a text node on purpose. A
 * marker inside a heading makes its text read "4What is a hotel booking
 * engine?" to anything extracting text - which is the exact failure this page
 * is about. Generated content is decorative, stays out of `textContent`, and
 * `aria-hidden` keeps it out of the accessibility tree; the notes carry the
 * same number as real text.
 */
function Marker({ n, className }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden
      data-n={n}
      className={cn(
        'grid size-[18px] shrink-0 place-items-center rounded-full border border-brand/45 bg-brand/12 font-mono text-[10px] leading-none text-brand before:content-[attr(data-n)]',
        className,
      )}
    />
  );
}

function Note({ note, index }: { note: AnatomyNote; index: number }) {
  return (
    <article
      className={cn(
        'glass rounded-2xl p-5 transition-colors hover:border-brand/40 xl:col-span-3',
        note.side === 'left' ? 'xl:col-start-1' : 'xl:col-start-10',
        ROW_START[Math.floor(index / 2)],
      )}
    >
      <div className="flex items-center gap-2">
        <Marker n={note.n} />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">
          {note.badge}
        </span>
      </div>
      <h3 className="mt-3 font-display text-base font-semibold tracking-[-0.02em] text-foreground">
        {note.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
    </article>
  );
}

/** One row of the crawl-elements card: a mono label and its value. */
function HeadRow({
  label,
  marker,
  children,
}: {
  label: string;
  marker?: number;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1 border-t border-hairline px-5 py-4 first:border-t-0 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {marker ? <Marker n={marker} /> : null}
        {label}
      </span>
      <span className="min-w-0 text-sm leading-relaxed text-foreground">{children}</span>
    </div>
  );
}

function SampleDocument() {
  const s = SAMPLE_PAGE;

  return (
    <div className="glass overflow-hidden rounded-2xl xl:col-span-6 xl:col-start-4 xl:row-span-6 xl:row-start-1">
      {/* Chrome. The placeholder domain is the first of three notices that
          this document is illustrative. */}
      <div className="flex items-center gap-3 border-b border-hairline bg-surface/60 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/35" />
          <span className="size-2 rounded-full bg-muted-foreground/35" />
          <span className="size-2 rounded-full bg-muted-foreground/35" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full border border-hairline bg-background/70 px-3 py-1 font-mono text-[10px] text-muted-foreground">
          {s.url}
        </span>
        <span className="hidden shrink-0 rounded-full bg-muted px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground sm:block">
          Sample
        </span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <header>
          <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
            {s.title}
          </h3>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            <span>{s.byline.author}</span>
            <span aria-hidden>&middot;</span>
            <span>{s.byline.role}</span>
            <span aria-hidden>&middot;</span>
            <span>{s.byline.updated}</span>
            <span aria-hidden>&middot;</span>
            <span>{s.byline.readTime}</span>
          </p>
        </header>

        {/* 3 - the answer, before anything else */}
        <section className="rounded-xl border border-brand/30 bg-brand/8 p-4">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brand">
            <Marker n={3} />
            Key takeaways
          </p>
          <ul className="mt-3 space-y-2">
            {s.takeaways.map((t) => (
              <li key={t} className="flex gap-2 text-[13px] leading-snug text-foreground">
                <span aria-hidden className="mt-1.5 size-1 shrink-0 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* 4 - an H2 per fan-out query; 6 - the answer leads each section */}
        <section>
          <h4 className="flex items-start gap-2 font-display text-base font-semibold tracking-[-0.02em] text-foreground">
            <Marker n={4} className="mt-1" />
            {s.sections[0].heading}
          </h4>
          <p className="mt-2 flex gap-2 text-[13px] leading-relaxed text-muted-foreground">
            <Marker n={6} className="mt-0.5" />
            <span>{s.sections[0].lead}</span>
          </p>
          <dl className="mt-3 space-y-1.5">
            {s.sections[0].chunks.map((chunk) => (
              <div key={chunk.term} className="flex gap-2 text-[13px] leading-snug">
                <dt className="shrink-0 font-medium text-foreground">{chunk.term}</dt>
                <dd className="text-muted-foreground">&mdash; {chunk.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 5 - the figures belong in a table, not a paragraph */}
        <section>
          <h4 className="font-display text-base font-semibold tracking-[-0.02em] text-foreground">
            {s.sections[1].heading}
          </h4>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {s.sections[1].lead}
          </p>
          <div className="mt-3 flex items-start gap-2">
            <Marker n={5} className="mt-2" />
            <div className="min-w-0 flex-1 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[12px]">
                <caption className="sr-only">{s.sections[1].table.caption}</caption>
                <thead>
                  <tr>
                    {s.sections[1].table.headers.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="border-b border-hairline px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.sections[1].table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td
                          key={`${row[0]}-${i}`}
                          className={cn(
                            'border-b border-hairline px-2 py-1.5 tabular-nums',
                            i === 0 ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">{s.sections[1].table.caption}</p>
        </section>

        {/* 7 - the number a model can quote, with its provenance attached */}
        <section className="flex items-start gap-3 rounded-xl border border-hairline bg-surface/60 p-4">
          <Marker n={7} className="mt-1" />
          <div className="min-w-0">
            <p className="font-display text-2xl font-semibold leading-none tracking-[-0.03em] text-foreground">
              {s.stat.value}
            </p>
            <p className="mt-2 text-[13px] leading-snug text-muted-foreground">{s.stat.line}</p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              {s.stat.source}
            </p>
          </div>
        </section>

        {/* 8 - the part no model could have generated without you */}
        <section>
          <h4 className="flex items-start gap-2 font-display text-base font-semibold tracking-[-0.02em] text-foreground">
            <Marker n={8} className="mt-1" />
            {s.differentiator.heading}
          </h4>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {s.differentiator.body}
          </p>
        </section>

        {/* 9 - questions in the words they arrive in */}
        <section className="rounded-xl border border-hairline bg-surface/60 p-4">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <Marker n={9} />
            Frequently asked questions
          </p>
          <dl className="mt-3 space-y-3">
            {s.faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="text-[13px] font-medium text-foreground">{faq.q}</dt>
                <dd className="mt-1 text-[13px] leading-snug text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 10 - the same claims again, in a form a parser can read */}
        <section className="flex flex-wrap items-center gap-2">
          <Marker n={10} />
          {s.schemaChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-hairline bg-surface px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </section>

        {/* 11 and 12 - who says so, and when it was last true */}
        <footer className="space-y-2 border-t border-hairline pt-4">
          <p className="flex gap-2 text-[12px] leading-snug text-muted-foreground">
            <Marker n={11} className="mt-0.5" />
            <span>{s.authorNote}</span>
          </p>
          <p className="flex gap-2 text-[12px] leading-snug text-muted-foreground">
            <Marker n={12} className="mt-0.5" />
            <span>
              {s.byline.updated}, matching the <code className="font-mono text-[11px]">dateModified</code> in
              the markup above.
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export function AiPageAnatomy({ className }: { className?: string }) {
  const s = SAMPLE_PAGE;

  return (
    <figure className={cn('not-prose m-0', className)}>
      {/* Title, meta and crawl elements: everything that decides what the page
          is and whether a model may read it at all. */}
      <div className="glass overflow-hidden rounded-2xl">
        <p className="border-b border-hairline bg-surface/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-brand">
          Title, meta and crawl elements
        </p>
        <HeadRow label="Title" marker={1}>
          {s.title}
        </HeadRow>
        <HeadRow label="Meta description">{s.metaDescription}</HeadRow>
        <HeadRow label="URL">
          <code className="font-mono text-[13px] text-muted-foreground">{s.url}</code>
        </HeadRow>
        <HeadRow label="robots.txt" marker={2}>
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {s.crawlers.map((bot) => (
              <code
                key={bot}
                className="rounded-full border border-hairline bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {bot}
              </code>
            ))}
            <span aria-hidden className="text-muted-foreground">
              &rarr;
            </span>
            <code className="rounded-full border border-signal/35 bg-signal/10 px-2.5 py-1 font-mono text-[11px] text-foreground">
              {s.crawlerRule}
            </code>
          </span>
        </HeadRow>
      </div>

      {/* The annotated document. One column on phones (document, then notes in
          order), three columns from xl, where explicit row/column placement
          moves the notes into the gutters without reordering the DOM. */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12 xl:items-start">
        <SampleDocument />
        {ANATOMY_NOTES.map((note, i) => (
          <Note key={note.n} note={note} index={i} />
        ))}
      </div>

      <figcaption className="mt-6 rounded-2xl border border-hairline bg-surface/60 p-5 text-sm leading-relaxed text-muted-foreground">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Note
        </span>
        <span className="mt-2 block">{ANATOMY_DISCLAIMER}</span>
      </figcaption>
    </figure>
  );
}
