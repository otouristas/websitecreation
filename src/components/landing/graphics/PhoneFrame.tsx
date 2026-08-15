import type { ReactNode } from "react";

/** Gradient-bezel phone shell with a brand halo, for the AI/chat panels. */
export function PhoneFrame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="relative rounded-[3rem] bg-gradient-to-b from-foreground/[0.1] via-foreground/[0.045] to-foreground/[0.08] p-3 shadow-[0_0_0_1px_var(--hairline),0_0_70px_-18px_color-mix(in_oklab,var(--primary)_40%,transparent),0_40px_64px_-28px_oklch(0_0_0_/_28%)]">
        <div className="relative overflow-hidden rounded-[2.35rem] bg-background ring-1 ring-hairline">
          <div className="flex items-center justify-center pt-3">
            <div className="h-6 w-[108px] rounded-full bg-foreground/50 shadow-inner" />
          </div>
          {label ? (
            <p className="pt-2 text-center text-[11px] text-muted-foreground">{label}</p>
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
