"use client";

import { useState, useSyncExternalStore } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const noop = () => () => {};

function readVote(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

const BUTTON =
  "inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-hairline px-3.5 text-[13.5px] font-medium text-foreground transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

/** "Was this helpful?", remembered per article in this browser. */
export function HelpFeedback({
  id,
  labels,
}: {
  readonly id: string;
  readonly labels: { readonly question: string; readonly yes: string; readonly no: string; readonly thanksYes: string; readonly thanksNo: string };
}) {
  const key = `asg-help-feedback:${id}`;
  const stored = useSyncExternalStore(noop, () => readVote(key), () => null);
  const [chosen, setChosen] = useState<{ key: string; value: string } | null>(null);
  const vote = chosen?.key === key ? chosen.value : stored;
  const choose = (value: "yes" | "no") => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage blocked: still thank the reader */
    }
    setChosen({ key, value });
  };
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-hairline bg-surface px-5 py-4">
      {vote ? (
        <p role="status" className="text-[14.5px] text-foreground">
          {vote === "yes" ? labels.thanksYes : labels.thanksNo}
        </p>
      ) : (
        <>
          <p className="mr-auto text-[14.5px] font-medium text-foreground">{labels.question}</p>
          <button type="button" onClick={() => choose("yes")} className={BUTTON}>
            <ThumbsUp className="size-4" aria-hidden />
            {labels.yes}
          </button>
          <button type="button" onClick={() => choose("no")} className={BUTTON}>
            <ThumbsDown className="size-4" aria-hidden />
            {labels.no}
          </button>
        </>
      )}
    </div>
  );
}
