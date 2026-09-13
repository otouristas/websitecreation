import type { ReactNode } from "react";

/** Gradient-bezel phone shell with a brand halo, for the AI/chat panels. */
export function PhoneFrame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="relative rounded-[3rem] bg-[linear-gradient(180deg,oklch(1_0_0/14%),oklch(1_0_0/5%)_50%,oklch(1_0_0/10%))] p-3 shadow-[0_0_0_1px_var(--hairline),0_0_90px_-20px_color-mix(in_oklab,var(--primary)_55%,transparent),0_40px_80px_-32px_oklch(0_0_0/60%)]">
        <div className="relative overflow-hidden rounded-[2.35rem] bg-background ring-1 ring-hairline">
          <div className="flex items-center justify-center pt-3">
            <div className="h-6 w-[108px] rounded-full bg-foreground/60 shadow-inner" />
          </div>
          {label ? (
            <p className="pt-2 text-center font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
              {label}
            </p>
          ) : null}
          <div className="flex min-h-[480px] flex-col">{children}</div>
          <div className="flex justify-center pb-3 pt-2">
            <div className="h-1.5 w-36 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
