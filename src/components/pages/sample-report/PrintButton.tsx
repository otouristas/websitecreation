"use client";

import { Printer } from "lucide-react";

/** Opens the browser print dialog, where "Save as PDF" turns the sample into a file. */
export function PrintButton({ label, className }: { readonly label: string; readonly className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer className="size-4" aria-hidden />
      {label}
    </button>
  );
}
