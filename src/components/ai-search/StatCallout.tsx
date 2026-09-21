import type { OriginalDatum } from '@/lib/ai-search/contract';
import { cn } from '@/lib/cn';

/**
 * A figure a model can quote, with its provenance attached.
 *
 * The audit's most common failure across this site was "no figure on the page
 * a model could cite", and the reason a bare number does not count is that it
 * cannot be verified: a citation needs the value, what it means, how it was
 * produced, and when. All four render here, from the same `OriginalDatum` the
 * page hands to `buildPageGraph`, which emits the matching `Dataset` node.
 *
 * `illustrative: true` says the number is a worked example. It renders with
 * that stated in the open and no Dataset is emitted, because the type asserts
 * that something was measured.
 */
export function StatCallout({
  datum,
  className,
}: {
  datum: OriginalDatum;
  className?: string;
}) {
  return (
    <figure
      data-ai="datum"
      className={cn(
        'not-prose m-0 rounded-2xl border border-hairline bg-surface/60 p-5 sm:p-6',
        className,
      )}
    >
      <p className="font-display text-4xl font-semibold leading-none tracking-[-0.04em] text-foreground">
        {datum.value}
      </p>
      <figcaption className="mt-3 space-y-2">
        <p className="text-[15px] leading-relaxed text-foreground">{datum.claim}</p>
        <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
          {datum.illustrative ? 'Illustrative figure. ' : ''}
          {datum.method}
          {datum.measuredAt ? (
            <>
              {' · '}
              <time dateTime={datum.measuredAt.slice(0, 10)}>{datum.measuredAt.slice(0, 10)}</time>
            </>
          ) : null}
        </p>
      </figcaption>
    </figure>
  );
}
