import type { ReactNode } from 'react';
import { Accent } from '@/components/kit/primitives';

/**
 * Splits an existing H1 string into "lead + serif accent" without changing a
 * single character of it, so the keyword wording that ranks stays exact.
 *
 * Order of preference for the accent:
 * 1. the clause after the last ", " ("..., not reports")
 * 2. the clause after ": " ("SEO Greece: ...")
 * 3. a trailing "(...)" group ("AI Visibility (GEO / AEO)")
 * 4. the part after " & " when it is three words or fewer ("Local SEO & GBP")
 * 5. the last word
 */
export function splitForAccent(text: string): [string, string] {
  const comma = text.lastIndexOf(', ');
  if (comma > 0) return [text.slice(0, comma + 1), text.slice(comma + 2)];
  const colon = text.indexOf(': ');
  if (colon > 0) return [text.slice(0, colon + 1), text.slice(colon + 2)];
  const paren = text.lastIndexOf(' (');
  if (paren > 0 && text.endsWith(')')) return [text.slice(0, paren), text.slice(paren + 1)];
  const amp = text.lastIndexOf(' & ');
  if (amp > 0 && text.slice(amp + 3).split(' ').length <= 3) return [text.slice(0, amp + 2), text.slice(amp + 3)];
  const space = text.lastIndexOf(' ');
  if (space > 0) return [text.slice(0, space), text.slice(space + 1)];
  return ['', text];
}

/** The H1 text with its closing phrase in the serif accent. */
export function AccentTitle({ text }: { readonly text: string }): ReactNode {
  const [lead, accent] = splitForAccent(text);
  return (
    <>
      {lead ? `${lead} ` : null}
      <Accent>{accent}</Accent>
    </>
  );
}
