import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { CheckList, KitEyebrow } from "@/components/kit";

/**
 * The kit's FeatureRow with a configurable heading level. FeatureRow titles
 * are H3; on pages being restyled, many of these rows carry H2s that rank
 * (and the outline should not change), so they render through this instead.
 * Same layout, type scale and reveal behaviour as FeatureRow.
 */
export function SplitRow({
  id,
  eyebrow,
  eyebrowIcon,
  title,
  titleAs: Heading = "h2",
  body,
  bullets,
  links,
  note,
  preview,
  flip = false,
  className,
}: {
  readonly id?: string;
  readonly eyebrow?: ReactNode;
  readonly eyebrowIcon?: ReactNode;
  readonly title: ReactNode;
  readonly titleAs?: "h2" | "h3";
  readonly body?: ReactNode;
  readonly bullets?: ReadonlyArray<ReactNode>;
  readonly links?: ReadonlyArray<{ href: string; label: string; primary?: boolean }>;
  readonly note?: ReactNode;
  readonly preview: ReactNode;
  readonly flip?: boolean;
  readonly className?: string;
}) {
  return (
    <div id={id} className={cn("scroll-mt-28 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16", className)}>
      <div className={cn("reveal min-w-0", flip && "lg:order-2")}>
        {eyebrow ? (
          <KitEyebrow icon={eyebrowIcon} className="mb-4">
            {eyebrow}
          </KitEyebrow>
        ) : null}
        <Heading className="text-balance font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-[36px]">
          {title}
        </Heading>
        {body ? <div className="mt-4 text-pretty text-[16px] leading-relaxed text-muted-foreground">{body}</div> : null}
        {bullets && bullets.length > 0 ? <CheckList items={bullets} className="mt-6" /> : null}
        {links && links.length > 0 ? (
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px] font-medium">
            {links.map((l) => {
              const cls = l.primary
                ? "inline-flex items-center gap-1.5 text-link hover:underline underline-offset-4"
                : "text-foreground/80 hover:text-foreground";
              return (
                <Link key={l.href + l.label} href={l.href} className={cls}>
                  {l.label}
                  {l.primary ? <ArrowRight className="size-4" /> : null}
                </Link>
              );
            })}
          </div>
        ) : null}
        {note ? <p className="mt-4 text-[12.5px] text-muted-foreground/80">{note}</p> : null}
      </div>
      <div className={cn("reveal min-w-0 [--rv:8%]", flip && "lg:order-1")}>{preview}</div>
    </div>
  );
}
