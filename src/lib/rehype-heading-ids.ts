import type { Root, Element, Text } from 'hast';
import { slugifyHeading } from '@/lib/blog';

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

function textOf(node: HastNode): string {
  if (node.type === 'text') return (node as Text).value ?? '';
  return (node.children ?? []).map(textOf).join('');
}

/**
 * Assigns heading ids using the SAME slug function as `extractHeadings`.
 *
 * We cannot use `rehype-slug` here: it delegates to github-slugger, which does
 * not strip Greek diacritics, so "Πόσο κοστίζει" would get a different id than
 * the table of contents generated server-side and every Greek anchor would
 * dead-link. Sharing one function makes parity structural rather than lucky.
 */
export function rehypeHeadingIds() {
  return (tree: Root) => {
    const seen = new Map<string, number>();
    const walk = (node: HastNode) => {
      if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
        const base = slugifyHeading(textOf(node));
        if (base) {
          const n = seen.get(base) ?? 0;
          seen.set(base, n + 1);
          node.properties = { ...(node.properties ?? {}), id: n === 0 ? base : `${base}-${n}` };
        }
      }
      (node.children ?? []).forEach(walk);
    };
    walk(tree as unknown as HastNode);
  };
}

export type { Element };
