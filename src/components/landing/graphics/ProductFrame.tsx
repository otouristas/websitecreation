import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Browser window in glass with a brand halo. Wraps every coded product mockup
 * and client screenshot so they read as software rather than as decoration.
 */
export function ProductFrame({
  url = "app.anotherseoguru.com",
  children,
  className,
  padded = true,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "frame-halo overflow-hidden rounded-2xl border border-primary/30 bg-background/80 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-hairline bg-surface-raised/70 px-4 py-3">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-brand/80" />
        <div className="ml-3 flex flex-1 items-center gap-2 truncate rounded-md border border-hairline bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <svg viewBox="0 0 12 12" aria-hidden className="size-3 shrink-0 text-signal">
            <rect x="2.5" y="5" width="7" height="5.5" rx="1" fill="none" stroke="currentColor" />
            <path d="M4 5V3.5a2 2 0 014 0V5" fill="none" stroke="currentColor" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className={cn("bg-surface/70", padded && "p-4 sm:p-5")}>{children}</div>
    </div>
  );
}
