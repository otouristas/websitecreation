import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface)] text-[var(--color-fg-muted)] border border-[var(--color-border)]",
        violet: "bg-[oklch(0.64_0.26_290_/_0.15)] text-[var(--color-violet-300)] border border-[oklch(0.64_0.26_290_/_0.3)]",
        cyan: "bg-[oklch(0.70_0.18_205_/_0.15)] text-[var(--color-cyan-300)] border border-[oklch(0.70_0.18_205_/_0.3)]",
        emerald: "bg-[oklch(0.70_0.20_160_/_0.15)] text-[var(--color-emerald-400)] border border-[oklch(0.70_0.20_160_/_0.3)]",
        amber: "bg-[oklch(0.76_0.21_65_/_0.15)] text-[var(--color-amber-400)] border border-[oklch(0.76_0.21_65_/_0.3)]",
        rose: "bg-[oklch(0.66_0.24_18_/_0.15)] text-[var(--color-rose-400)] border border-[oklch(0.66_0.24_18_/_0.3)]",
        outline: "bg-transparent text-[var(--color-fg-muted)] border border-[var(--color-border)]",
        gradient:
          "bg-[linear-gradient(120deg,oklch(0.64_0.26_290_/_0.2),oklch(0.70_0.18_205_/_0.2))] text-[var(--color-fg)] border border-[oklch(0.64_0.26_290_/_0.3)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
