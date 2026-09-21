import { cn } from '@/lib/cn';

/**
 * The visible half of `dateModified`.
 *
 * Asserting a modification date in JSON-LD that the page never shows is the
 * most common failure in the audit: six of eight sampled templates did it. It
 * is a claim a reader cannot check and a model cannot corroborate, and the
 * fix is not to drop the assertion, it is to show the date.
 *
 * `<time dateTime>` carries the machine-readable form next to the rendered one,
 * so the two can never say different things.
 */
export function LastUpdated({
  date,
  locale = 'en',
  published,
  className,
}: {
  /** ISO date. The same value the page's `dateModified` asserts. */
  date: string;
  locale?: 'en' | 'el';
  /** Published date, shown alongside when it differs from `date`. */
  published?: string;
  className?: string;
}) {
  const iso = date.slice(0, 10);
  const isEl = locale === 'el';
  const format = (value: string) =>
    new Date(value).toLocaleDateString(isEl ? 'el-GR' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const revised = Boolean(published && published.slice(0, 10) !== iso);

  return (
    <span className={cn('inline-flex flex-wrap items-center gap-x-2 gap-y-1', className)}>
      <span>
        {isEl ? 'Ενημερώθηκε' : 'Updated'}{' '}
        <time dateTime={iso}>{format(date)}</time>
      </span>
      {revised && published ? (
        <span className="text-muted-foreground">
          <span aria-hidden>·</span> {isEl ? 'δημοσιεύθηκε' : 'published'}{' '}
          <time dateTime={published.slice(0, 10)}>{format(published)}</time>
        </span>
      ) : null}
    </span>
  );
}
