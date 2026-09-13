import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll-triggered entrance, in CSS.
 *
 * Uses a `view()` animation timeline (`reveal` utility in globals.css): the
 * element rises and fades in as it enters the viewport, driven by the
 * compositor, with no JavaScript, no observer and nothing hidden for a visitor
 * whose browser lacks the feature - they simply see the content. Under
 * prefers-reduced-motion the utility is inert.
 *
 * `delay` is a fraction of the entry range (0-0.5), so siblings can stagger
 * with `i * 0.08` the way a time-based delay would.
 *
 * Never wrap the hero in this - the hero is the LCP element and paints on its
 * own CSS keyframes.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Element to render, so a revealed `<li>` stays a valid list item. */
  as?: "div" | "li" | "article" | "section";
}) {
  const pct = Math.max(0, Math.min(50, Math.round(delay * 100)));
  return (
    <Tag
      className={cn("reveal", className)}
      style={pct ? ({ "--rv": `${pct}%` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
