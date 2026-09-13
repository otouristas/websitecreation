"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A card whose border lights up where the pointer is.
 *
 * All the painting is CSS (`spotlight` utility in globals.css, driven by the
 * `--mx`/`--my` variables); this component only writes the two variables on
 * pointer move, which is cheap enough to run on every event. Touch devices
 * never fire pointermove without contact, so they simply see the static card.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  function handleMove(e: PointerEvent<HTMLDivElement>): void {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div onPointerMove={handleMove} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
