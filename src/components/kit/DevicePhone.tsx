import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * iPhone bezel for real demo screenshots. The shell is the same ink in both
 * themes (a phone is dark); the screen inside is the captured app.
 */
export function DevicePhone({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[1.85rem] bg-[#070d18] p-[7px] shadow-[0_28px_60px_-30px_oklch(0_0_0/75%),0_0_0_1px_oklch(1_0_0/14%)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.45rem] bg-[#f4f7fb]">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-[7px]">
          <div className="h-[16px] w-[72px] rounded-full bg-[#070d18]" />
        </div>
        {children}
      </div>
    </div>
  );
}
