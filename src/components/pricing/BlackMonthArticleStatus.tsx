"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { OFFER_ENDS } from "@/data/pricing";

function subscribe(onChange: () => void) {
  const remaining = OFFER_ENDS.getTime() - Date.now();
  if (remaining <= 0) return () => {};
  const timer = window.setTimeout(
    onChange,
    Math.min(remaining + 100, 2147483647),
  );
  return () => window.clearTimeout(timer);
}

/** A dated campaign article must remain clearly historical once its offer ends. */
export function BlackMonthArticleStatus() {
  const expired = useSyncExternalStore(
    subscribe,
    () => Date.now() > OFFER_ENDS.getTime(),
    () => false,
  );
  return (
    <aside
      className="mb-8 rounded-2xl border border-hairline bg-accent p-5 text-sm leading-relaxed text-accent-foreground"
      aria-label="Ισχύς καμπάνιας"
    >
      <strong>
        {expired
          ? "Η καμπάνια Black Month 2026 έχει ολοκληρωθεί."
          : "Black Month 2026: προσφορές έως 30 Νοεμβρίου."}
      </strong>{" "}
      {expired
        ? "Τα ποσά του άρθρου αφορούν τη συγκεκριμένη καμπάνια. "
        : "Η προσφορά αφορά νέα έργα που θα επιβεβαιωθούν έως τότε. "}
      <Link
        href="/el/ypiresies/times"
        className="font-semibold text-link underline underline-offset-4"
      >
        Δείτε τις ισχύουσες τιμές και παροχές.
      </Link>
    </aside>
  );
}
