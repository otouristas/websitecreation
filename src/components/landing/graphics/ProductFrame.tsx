import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fake browser window with a brand halo. Wraps every coded product mockup so
 * platform screenshots read as software rather than as decoration.
 */
export function ProductFrame({
  url = "app.anotherseoguru.com",
  children,
  className,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "frame-halo overflow-hidden rounded-[14px] border border-primary/25 bg-background ring-1 ring-hairline",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-hairline bg-surface-raised/80 px-4 py-3">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-brand/70" />
        <div className="ml-3 flex-1 truncate rounded-md border border-hairline bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
          {url}
        </div>
      </div>
      <div className="bg-surface p-4 sm:p-5">{children}</div>
    </div>
  );
}
