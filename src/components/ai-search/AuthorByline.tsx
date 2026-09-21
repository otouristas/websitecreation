import Link from 'next/link';
import type { AuthorEntity } from '@/lib/ai-search/contract';
import { cn } from '@/lib/cn';

/**
 * The visible half of the author entity.
 *
 * A model resolves authors across the whole web, so the name in the byline has
 * to be the name in the JSON-LD, linked to the page that describes it. A
 * bare string in a byline is not an entity; it is a coincidence of characters.
 *
 * `rel="author"` is on the link because it is the oldest, cheapest signal that
 * says which of the page's links is the one about who wrote it.
 */
export function AuthorByline({
  author,
  className,
  showBio = false,
}: {
  author: AuthorEntity;
  className?: string;
  showBio?: boolean;
}) {
  const name = author.url ? (
    <Link href={author.url} rel="author" className="font-medium text-foreground underline-offset-4 hover:underline">
      {author.name}
    </Link>
  ) : (
    <span className="font-medium text-foreground">{author.name}</span>
  );

  if (!showBio) return <span className={className}>{name}</span>;

  return (
    <div className={cn('rounded-2xl border border-hairline bg-surface/60 p-5', className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {author.type === 'Person' ? 'Author' : 'Published by'}
      </p>
      <p className="mt-2 text-sm">{name}{author.jobTitle ? <span className="text-muted-foreground"> · {author.jobTitle}</span> : null}</p>
      {author.bio ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
      ) : null}
      {author.knowsAbout?.length ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {author.knowsAbout.slice(0, 6).map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-hairline bg-surface px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
