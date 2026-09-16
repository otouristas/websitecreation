"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { HOME_ENGINES, HOME_PROMPT_SAMPLES, type HomeEngine } from "@/data/home-content";
import type { SiteLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/cn";

/**
 * The hero's proof object: the platform's AI-visibility view, demonstrated
 * live. A sample prompt types itself, the four answer engines resolve one by
 * one to "cited" or "not cited", the share-of-voice bar fills, and the panel
 * moves on to the next prompt.
 *
 * It is labelled as a sample and tracks a placeholder domain. The server
 * renders the fully resolved first prompt, so without JavaScript (and under
 * prefers-reduced-motion) the panel is complete and still.
 */

type Phase = "typing" | "resolving" | "hold";

const TYPE_MS = 42;
const RESOLVE_MS = 420;
const HOLD_MS = 3200;

const COPY = {
  en: {
    label: "AI visibility · sample report",
    prompt: "Prompt",
    cited: "Cited",
    notCited: "Not cited",
    source: "Source",
    sov: "Share of voice",
    engines: "engines",
    live: "Tracking",
  },
  el: {
    label: "Ορατότητα σε AI · δείγμα αναφοράς",
    prompt: "Ερώτημα",
    cited: "Αναφέρεται",
    notCited: "Χωρίς αναφορά",
    source: "Πηγή",
    sov: "Μερίδιο απαντήσεων",
    engines: "μηχανές",
    live: "Παρακολούθηση",
  },
} as const;

function EngineMark({ engine }: { engine: HomeEngine }) {
  if (engine.mark) {
    return (
      <span className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
        <Image src={engine.mark} alt="" width={18} height={18} className="size-[18px] object-contain" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="grid size-7 shrink-0 place-items-center rounded-full border border-hairline bg-background font-display text-[11px] font-semibold"
      style={{ color: engine.tone }}
    >
      {engine.name.slice(0, 1)}
    </span>
  );
}

export function AnswerEnginePanel({ locale = "en" }: { locale?: SiteLocale }) {
  const samples = HOME_PROMPT_SAMPLES[locale];
  const copy = COPY[locale];
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("hold");
  const [typed, setTyped] = useState(samples[0].prompt.length);
  const [resolved, setResolved] = useState(HOME_ENGINES.length);
  const [running, setRunning] = useState(false);

  // Start the loop after hydration so the SSR frame is the resolved sample.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setRunning(true), 1800);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!running) return;
    const sample = samples[index];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "hold") {
      t = setTimeout(() => {
        setIndex((i) => (i + 1) % samples.length);
        setTyped(0);
        setResolved(0);
        setPhase("typing");
      }, HOLD_MS);
    } else if (phase === "typing") {
      if (typed < sample.prompt.length) {
        t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      } else {
        t = setTimeout(() => setPhase("resolving"), 500);
      }
    } else {
      if (resolved < HOME_ENGINES.length) {
        t = setTimeout(() => setResolved((n) => n + 1), RESOLVE_MS);
      } else {
        t = setTimeout(() => setPhase("hold"), 200);
      }
    }
    return () => clearTimeout(t);
  }, [running, phase, typed, resolved, index, samples]);

  const sample = samples[index];
  const citedCount = HOME_ENGINES.filter((e) => sample.cited[e.id]).length;
  const visibleCited = HOME_ENGINES.slice(0, resolved).filter((e) => sample.cited[e.id]).length;
  const sov = Math.round((visibleCited / HOME_ENGINES.length) * 100);

  return (
    <div
      className="glass relative w-full max-w-[520px] rounded-3xl p-1.5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_25%,transparent),0_40px_100px_-40px_color-mix(in_oklab,var(--primary)_70%,transparent),0_30px_60px_-30px_oklch(0_0_0/70%)]"
      aria-label={copy.label}
    >
      <div className="rounded-[1.25rem] border border-hairline bg-background/70">
        {/* Title bar */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
          <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="live-dot" aria-hidden />
            {copy.live}
          </span>
          <span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
            {copy.label}
          </span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* Prompt */}
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {copy.prompt}
            </p>
            <div className="flex min-h-11 items-center gap-2 rounded-xl border border-hairline bg-surface/70 px-3.5 py-2.5 text-sm text-foreground">
              <svg viewBox="0 0 20 20" aria-hidden className="size-4 shrink-0 text-brand">
                <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13.5 13.5 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="min-w-0 truncate">
                {sample.prompt.slice(0, typed)}
                {phase === "typing" ? (
                  <span aria-hidden className="ml-px inline-block h-4 w-px translate-y-[3px] bg-brand motion-safe:animate-pulse" />
                ) : null}
              </span>
            </div>
          </div>

          {/* Engines */}
          <ul className="space-y-1.5" aria-live="polite">
            {HOME_ENGINES.map((engine, i) => {
              const isResolved = i < resolved;
              const cited = sample.cited[engine.id];
              return (
                <li
                  key={engine.id}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border px-3 py-2 transition-colors duration-300",
                    isResolved && cited
                      ? "border-signal/35 bg-signal/10"
                      : "border-hairline bg-surface/60",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <EngineMark engine={engine} />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium text-foreground">
                        {engine.name}
                      </span>
                      <span className="block truncate font-mono text-[10px] text-muted-foreground">
                        {isResolved && cited ? `${copy.source}: ${sample.domain}` : "…"}
                      </span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300",
                      !isResolved
                        ? "text-muted-foreground/50"
                        : cited
                          ? "bg-signal text-signal-foreground"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {!isResolved ? "···" : cited ? copy.cited : copy.notCited}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Share of voice */}
          <div className="rounded-xl border border-hairline bg-surface/60 px-3.5 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {copy.sov}
              </span>
              <span className="font-display text-lg font-semibold tabular-nums tracking-[-0.03em] text-foreground">
                {sov}%
                <span className="ml-1.5 font-mono text-[10px] font-normal tracking-[0.1em] text-muted-foreground">
                  {visibleCited}/{HOME_ENGINES.length} {copy.engines}
                </span>
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--signal))] transition-[width] duration-500 ease-out"
                style={{ width: `${(citedCount === 0 ? 0 : sov)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
