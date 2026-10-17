import Link from 'next/link';
import type { ReactNode } from 'react';
import { inlineLink } from '@/components/seo/location-styles';

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders a paragraph that may contain markdown links. */
export function RichText({ text }: { readonly text: string }): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(LINK_RE)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const label = match[1] ?? '';
    const href = match[2] ?? '/el';
    parts.push(
      <Link key={key} href={href} className={inlineLink}>
        {label}
      </Link>,
    );
    key += 1;
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
