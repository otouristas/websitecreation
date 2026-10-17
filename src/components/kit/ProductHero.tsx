import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DevicePhone } from "./DevicePhone";

/** Overview card from the public demo: KPI row plus the clicks chart, captured at 2x. */
const OVERVIEW_SRC = "/images/product/hero-overview.webp";
/** Same demo, iPhone-width viewport. */
const PHONE = { src: "/images/product/hero-phone.webp", width: 780, height: 1688 } as const;

/**
 * Hero product shot: a browser frame of the real demo, with the mobile demo
 * overlapping on large screens. Below the `md` breakpoint the phone is omitted
 * and the overview image sits alone, so the first screen stays a single
 * reserved box.
 */
export function ProductHero({
  href,
  label,
  ctaLabel,
  badge,
  url = "app.anotherseoguru.com/demo",
  className,
}: {
  readonly href: string;
  readonly label: string;
  readonly ctaLabel?: string;
  readonly badge?: ReactNode;
  readonly url?: string;
  readonly className?: string;
}) {
  return (
    <div className={cn("group/hero relative md:pb-14", className)}>
      <a
        href={href}
        className="relative block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring md:rounded-2xl"
      >
        <div className="frame-halo overflow-hidden rounded-xl border border-hairline bg-surface md:rounded-2xl">
          <div className="relative hidden h-10 items-center gap-3 border-b border-hairline bg-surface px-3 md:flex sm:px-4">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
            </div>
            <div
              className="absolute left-1/2 flex h-6 max-w-[46%] -translate-x-1/2 items-center gap-1.5 truncate rounded-md border border-hairline bg-background px-2.5 text-[12px] text-muted-foreground"
              aria-hidden
            >
              <Lock className="size-3 shrink-0" />
              <span className="min-w-0 truncate">{url}</span>
            </div>
            {badge ? <div className="ml-auto hidden lg:block">{badge}</div> : null}
          </div>
          {/* 16:10 window, top-aligned so the KPI row and the chart stay in frame. */}
          <div className="relative aspect-[16/10] w-full bg-background">
            <Image
              src={OVERVIEW_SRC}
              alt={label}
              fill
              priority
              quality={68}
              sizes="(max-width: 767px) 100vw, (max-width: 1280px) 92vw, 1080px"
              className="object-cover object-top"
            />
          </div>
        </div>
        {ctaLabel ? (
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-6 hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background opacity-0 shadow-lg transition-opacity duration-300 md:inline-flex motion-safe:group-hover/hero:opacity-100 motion-safe:group-focus-visible/hero:opacity-100"
          >
            {ctaLabel}
            <ArrowRight className="size-3.5" />
          </span>
        ) : null}
      </a>
      <div className="pointer-events-none absolute bottom-0 right-[5%] hidden w-[188px] md:block lg:right-[6.5%] lg:w-[214px]" aria-hidden>
        <DevicePhone className="transition-transform duration-300 motion-safe:group-hover/hero:-translate-y-1">
          <Image
            src={PHONE.src}
            alt=""
            width={PHONE.width}
            height={PHONE.height}
            quality={64}
            sizes="214px"
            className="h-auto w-full"
          />
        </DevicePhone>
      </div>
    </div>
  );
}
