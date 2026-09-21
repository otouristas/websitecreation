import { cn } from '@/lib/cn';

/**
 * The answer, before anything else.
 *
 * Four to six sentences directly under the H1, each one written to survive
 * being lifted out of the page alone. The block carries `data-ai="takeaways"`
 * so the auditor can find it, and the same strings go into the Article node's
 * `abstract`, which is what makes the markup and the copy impossible to drift.
 *
 * Server component. A retrieval system that does not run JavaScript still gets
 * the answer, which is the entire point of putting it here.
 */
export function KeyTakeaways({
  items,
  title = 'Key takeaways',
  className,
}: {
  items: readonly string[];
  title?: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section
      data-ai="takeaways"
      aria-label={title}
      className={cn('rounded-2xl border border-brand/30 bg-brand/8 p-5 sm:p-6', className)}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
