"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";
import type { CtaIntent } from "@/data/resources/types";

export interface CtaLink {
  readonly label: string;
  readonly href: string;
  /** Analytics name: resources_<slug>_<placement>. */
  readonly event: string;
}

/**
 * The end-of-article call to action. Soft on informational pages (the free
 * tool first, the demo second), direct on commercial ones (sign-up first).
 * No popups, no gates: it sits where the reader finishes.
 */
export function ResourceCta({
  intent,
  title,
  text,
  primary,
  secondary,
}: {
  readonly intent: CtaIntent;
  readonly title: string;
  readonly text: string;
  readonly primary: CtaLink;
  readonly secondary: CtaLink;
}) {
  const link = (l: CtaLink, main: boolean) => {
    const cls = main
      ? "asg-primary-action inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-4 font-display text-[14px] font-semibold text-primary-foreground"
      : "inline-flex h-10 items-center justify-center rounded-xl border border-hairline px-4 font-display text-[14px] font-medium text-foreground hover:border-primary/50";
    const body = (
      <>
        {l.label}
        {main ? <ArrowRight className="size-3.5" aria-hidden /> : null}
      </>
    );
    const onClick = () => trackCtaClick(l.event);
    return l.href.startsWith("/") ? (
      <Link href={l.href} className={cls} onClick={onClick}>
        {body}
      </Link>
    ) : (
      <a href={l.href} className={cls} onClick={onClick} rel="noopener">
        {body}
      </a>
    );
  };
  return (
    <section
      aria-label={title}
      data-cta-intent={intent}
      className="mt-14 rounded-2xl border border-primary/30 bg-[radial-gradient(120%_120%_at_0%_0%,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_60%)] p-6"
    >
      <p className="font-display text-[19px] font-semibold tracking-[-0.02em] text-foreground">{title}</p>
      <p className="mt-2 max-w-[38rem] text-[15px] leading-relaxed text-muted-foreground">{text}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        {link(primary, true)}
        {link(secondary, false)}
      </div>
    </section>
  );
}
