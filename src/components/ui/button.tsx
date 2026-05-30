"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Marketing-grade button. Variants:
 * - primary: gradient violet→cyan with neon glow on hover
 * - secondary: glass surface with subtle border
 * - outline: transparent with border, hover fills
 * - ghost: no chrome, hover bg
 * - link: underline, no padding
 * - gradient: solid aurora gradient
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-violet-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-violet-500)] text-white hover:bg-[var(--color-violet-400)] hover:shadow-[var(--shadow-glow-violet)] active:scale-[0.98]",
        gradient:
          "relative text-white bg-[linear-gradient(120deg,var(--color-violet-500),var(--color-cyan-500))] hover:brightness-110 hover:shadow-[var(--shadow-glow-violet)] active:scale-[0.98] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(120deg,var(--color-cyan-500),var(--color-violet-500))] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-[var(--duration-slow)] [&_*]:relative [&_*]:z-[1]",
        secondary:
          "bg-[var(--color-surface)] text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-strong)]",
        outline:
          "bg-transparent text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]",
        ghost:
          "bg-transparent text-[var(--color-fg-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]",
        link:
          "bg-transparent text-[var(--color-cyan-400)] hover:text-[var(--color-cyan-300)] underline-offset-4 hover:underline p-0 h-auto",
        danger:
          "bg-[var(--color-rose-500)] text-white hover:bg-[var(--color-rose-400)] active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
