import type { CSSProperties } from 'react';
import Link from 'next/link';
import { SEARCH_LAYERS, LAYER_FOUNDATION, type SearchLayer } from '@/data/search-layers';
import { Tick } from '@/components/landing/primitives';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { cn } from '@/lib/cn';

/**
 * The layer stack: six rows, SEO through SXO, each one a numeral, a goal, two
 * columns of substance and the metrics that tell you whether it is working.
 *
 * Colour comes from `--signature-h` per row rather than six hardcoded hues.
 * The theme owns lightness and chroma, so the ladder is legible on the dark
 * canvas and on the light one without a single `dark:` override, and it stays
 * inside the brand band instead of reaching for the source infographic's
 * orange and green.
 *
 * Server component, no JavaScript: the rail, the numerals and the reveal are
 * CSS. The whole thing is a list, so a screen reader and a crawler both get
 * the model in order rather than a picture of it.
 */

function LayerRow({ layer, index, locale }: { layer: SearchLayer; index: number; locale: SiteLocale }) {
  const n = String(index + 1).padStart(2, '0');

  return (
    <li
      id={layer.id}
      style={{ '--signature-h': String(layer.hue) } as CSSProperties}
      className="reveal relative scroll-mt-28"
    >
      {/* The rail: a hairline down the left gutter with the layer's own dot on
          it, which is what turns six cards into one sequence. Hidden below md,
          where the rows stack full-width and the sequence is the order. */}
      <span
        aria-hidden
        className="absolute left-[11px] top-8 hidden h-full w-px bg-hairline md:block"
      />
      <span
        aria-hidden
        className="absolute left-0 top-6 hidden size-6 rounded-full border border-signature/40 bg-background md:grid md:place-items-center"
      >
        <span className="size-2 rounded-full bg-signature" />
      </span>

      <article className="glass rounded-2xl p-6 transition-colors hover:border-signature/40 md:ml-10 md:p-7">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <header className="lg:col-span-3">
            <span className="font-mono text-[11px] tracking-[0.18em] text-signature">{n}</span>
            {/* h2: the six layers are this page's main sections, so the
                document outline runs h1 -> layer -> the cards inside it. */}
            <h2 className="mt-2 font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-foreground">
              {layer.abbr}
            </h2>
            <p className="mt-1.5 text-sm font-medium text-signature">{layer.name}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Goal
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{layer.goal}</p>
            <Link
              href={localizedPath(locale, layer.href)}
              className="mt-4 inline-flex text-sm font-medium text-link underline-offset-4 hover:underline"
            >
              {layer.hrefLabel} &rarr;
            </Link>
          </header>

          {/* Definition and the two columns from the model */}
          <div className="lg:col-span-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{layer.definition}</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {layer.columns.map((column) => (
                <div key={column.label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {column.label}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {column.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-snug text-foreground">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-signature" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="lg:col-span-3">
            <div className="h-full rounded-xl border border-signature/30 bg-[color-mix(in_oklab,var(--signature)_10%,transparent)] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signature">
                What you measure
              </p>
              <ul className="mt-3 space-y-2">
                {layer.metrics.map((metric) => (
                  <li key={metric} className="flex gap-2 text-sm leading-snug text-foreground">
                    <Tick className="text-signature" />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-hairline pt-4 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Why it exists. </span>
          {layer.why}
        </p>
      </article>
    </li>
  );
}

export function SearchLayersStack({
  locale,
  className,
}: {
  locale: SiteLocale;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <ol className="space-y-4">
        {SEARCH_LAYERS.map((layer, i) => (
          <LayerRow key={layer.abbr} layer={layer} index={i} locale={locale} />
        ))}
      </ol>

      {/* The closing bar: what every layer above is standing on. */}
      <div className="glass mt-4 flex flex-col gap-4 rounded-2xl p-6 md:ml-10 md:flex-row md:items-center md:justify-between md:p-7">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
            {LAYER_FOUNDATION.title}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
            {LAYER_FOUNDATION.items.map((item, i) => (
              <li
                key={item}
                className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
              >
                {i > 0 ? <span aria-hidden className="size-1 rounded-full bg-brand/70" /> : null}
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          {LAYER_FOUNDATION.note}
        </p>
      </div>
    </div>
  );
}
