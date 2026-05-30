import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const cardVariants = cva(
  "relative rounded-[var(--radius-lg)] transition-all duration-[var(--duration-base)] ease-[var(--ease-out-expo)]",
  {
    variants: {
      variant: {
        solid: "bg-[var(--color-surface)] border border-[var(--color-border)]",
        elevated: "bg-[var(--color-bg-elev-1)] border border-[var(--color-border)] shadow-[var(--shadow-md)]",
        glass: "glass",
        gradient: "gradient-border bg-[var(--color-surface)]",
        outline: "bg-transparent border border-[var(--color-border)]",
      },
      interactive: {
        true: "hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
        false: "",
      },
      glow: {
        none: "",
        violet: "hover:shadow-[var(--shadow-glow-violet)]",
        cyan: "hover:shadow-[var(--shadow-glow-cyan)]",
        emerald: "hover:shadow-[var(--shadow-glow-emerald)]",
      },
    },
    defaultVariants: { variant: "solid", interactive: false, glow: "none" },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, glow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, interactive, glow }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-3 space-y-1.5", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold tracking-tight text-[var(--color-fg)]", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-[var(--color-fg-muted)]", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-3", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0 flex items-center gap-3", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";
