import type { ReactElement } from 'react';
import Image from 'next/image';
import type { HomeCopy } from '@/components/pages/home/copy';

type Mark = 'yes' | 'some' | 'no';

const GRID =
  'grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_var(--app-col)] md:grid-cols-[minmax(0,1.45fr)_7.75rem_8.5rem_var(--app-col)]';

function markLabel(kind: Mark, copy: HomeCopy): string {
  switch (kind) {
    case 'yes':
      return copy.markYes;
    case 'some':
      return copy.markSome;
    case 'no':
      return copy.markNo;
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

function StatusIcon({
  kind,
  label,
  decorative = false,
}: {
  readonly kind: Mark;
  readonly label: string;
  readonly decorative?: boolean;
}): ReactElement {
  const tone =
    kind === 'yes'
      ? 'bg-success text-[var(--asg-background)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--success)_16%,transparent)]'
      : kind === 'some'
        ? 'bg-[var(--asg-warning-surface)] text-[var(--asg-warning)] ring-1 ring-[color-mix(in_oklab,var(--warning)_50%,transparent)]'
        : 'bg-foreground/[0.05] text-muted-foreground ring-1 ring-foreground/12';

  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
      className={`grid size-7 shrink-0 place-items-center rounded-full ${tone}`}
    >
      {kind === 'yes' ? (
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <path
            d="M3.2 8.4 6.4 11.4 12.8 4.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {kind === 'some' ? (
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <path
            d="M2.8 9.2c1.15-2.15 2.15-2.15 3.3 0s2.15 2.15 3.3 0 2.15-2.15 3.8 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
      {kind === 'no' ? (
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <path d="M3.5 8h9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : null}
    </span>
  );
}

function ColumnName({
  short,
  full,
}: {
  readonly short: string;
  readonly full: string;
}): ReactElement {
  return (
    <>
      <span className="lg:hidden">{short}</span>
      <span className="hidden lg:inline">{full}</span>
    </>
  );
}

/**
 * Agency / tool / AnotherSEOGuru App comparison. The App column is an elevated
 * card (gradient edge, logo and name in the cap). Copy and marks come from the
 * homepage dictionary; this component does not add claims.
 */
export function CompareBoard({ copy }: { readonly copy: HomeCopy }): ReactElement {
  return (
    <div className="mt-12" data-compare-board="">
      <div className="compare-board relative [--app-col:6.7rem] sm:[--app-col:7.25rem] md:[--app-col:12.25rem] lg:[--app-col:13.75rem]">
        <div
          role="table"
          aria-label={copy.whyEyebrow}
          className="relative"
        >
          <div
            role="row"
            className={`${GRID} sticky top-[var(--site-header-height)] z-30 items-stretch`}
          >
            <div role="columnheader" className="hidden bg-background/90 backdrop-blur-xl md:block">
              <span className="sr-only">{copy.whyEyebrow}</span>
            </div>
            <div
              role="columnheader"
              className="flex items-end justify-center bg-background/90 px-1 pb-3 pt-3 text-center text-[12.5px] font-semibold leading-tight text-foreground backdrop-blur-xl md:px-2 md:pb-4 md:pt-5 md:text-[14px]"
            >
              <ColumnName short={copy.colAgencyShort} full={copy.colAgency} />
            </div>
            <div
              role="columnheader"
              className="flex items-end justify-center bg-background/90 px-1 pb-3 pt-3 text-center text-[12.5px] font-semibold leading-tight text-foreground backdrop-blur-xl md:px-2 md:pb-4 md:pt-5 md:text-[14px]"
            >
              <ColumnName short={copy.colToolShort} full={copy.colTool} />
            </div>
            <div
              role="columnheader"
              className="compare-app-cap relative z-[1] flex min-h-[5.25rem] flex-col items-center justify-end gap-1.5 px-1.5 pb-3 pt-4 text-center md:min-h-[7.5rem] md:justify-center md:gap-2 md:px-3 md:py-6"
            >
              <Image src="/brand/asg-mark.svg" alt="" width={36} height={29} unoptimized className="h-6 w-auto md:h-8" />
              <span className="text-balance text-[10.5px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[11.5px] md:text-[14.5px]">
                AnotherSEOGuru App
              </span>
            </div>
          </div>

          <div role="rowgroup" className="relative">
            <div aria-hidden className="compare-app-body pointer-events-none absolute inset-y-0 right-0 z-0 w-[var(--app-col)]" />
            {copy.compare.map((row) => (
              <div
                key={row.label}
                role="row"
                className={`${GRID} relative z-[1] py-3.5 md:min-h-[4.65rem] md:items-center md:py-0 after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-px after:w-[calc(100%-var(--app-col))] after:bg-hairline last:after:hidden`}
              >
                <div
                  role="rowheader"
                  className="col-span-2 row-start-1 min-w-0 px-1 pb-3 text-[14.5px] font-semibold leading-snug text-foreground md:col-span-1 md:col-start-1 md:row-span-1 md:px-1 md:py-4 md:pb-4 md:text-[16px] md:font-medium md:leading-snug"
                >
                  {row.label}
                </div>
                <div role="cell" className="col-start-1 row-start-2 flex justify-center md:col-start-2 md:row-start-1">
                  <StatusIcon kind={row.agency} label={markLabel(row.agency, copy)} />
                </div>
                <div role="cell" className="col-start-2 row-start-2 flex justify-center md:col-start-3 md:row-start-1">
                  <StatusIcon kind={row.tool} label={markLabel(row.tool, copy)} />
                </div>
                <div
                  role="cell"
                  className="relative z-[1] col-start-3 row-span-2 row-start-1 flex items-center justify-center md:col-start-4 md:row-span-1"
                >
                  <StatusIcon kind="yes" label={copy.markYes} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] font-medium text-muted-foreground">
        <li className="inline-flex items-center gap-2">
          <StatusIcon kind="yes" label={copy.markYes} decorative />
          {copy.markYes}
        </li>
        <li className="inline-flex items-center gap-2">
          <StatusIcon kind="some" label={copy.markSome} decorative />
          {copy.markSome}
        </li>
        <li className="inline-flex items-center gap-2">
          <StatusIcon kind="no" label={copy.markNo} decorative />
          {copy.markNo}
        </li>
      </ul>
      <p className="mt-3 max-w-3xl text-[12.5px] leading-relaxed text-muted-foreground">{copy.footnote}</p>
    </div>
  );
}
