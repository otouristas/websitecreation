import { Check, X } from 'lucide-react';
import { aiCitations, assistantThread } from '@/data/graphics-data';
import { PhoneFrame } from './PhoneFrame';

/**
 * GEO/AEO panel in a phone frame: which answer engines cite the brand, plus a
 * short assistant thread. This is the visual for the AI-visibility service.
 */
export function AiVisibilityPanel({ locale = 'en' }: { locale?: 'en' | 'el' }) {
  const isEl = locale === 'el';

  return (
    <PhoneFrame label="app.anotherseoguru.com">
      <div className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-3">
        <div>
          <p className="font-display text-sm font-medium text-foreground">
            {isEl ? 'Ορατότητα σε AI' : 'AI visibility'}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {isEl ? 'Πού αναφέρεται το brand σας' : 'Where your brand gets cited'}
          </p>
        </div>

        <ul className="flex flex-col gap-1.5">
          {aiCitations.map((row) => (
            <li
              key={row.engine}
              className="flex items-center justify-between gap-3 rounded-[8px] border border-hairline bg-surface px-3 py-2.5"
            >
              <span className="min-w-0">
                <span className="block text-[12px] font-medium text-foreground">{row.engine}</span>
                <span className="block truncate text-[10px] text-muted-foreground">
                  &ldquo;{row.prompt}&rdquo;
                </span>
              </span>
              {row.cited ? (
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                  <Check className="size-3.5" aria-label={isEl ? 'Αναφέρεται' : 'Cited'} />
                </span>
              ) : (
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                  <X className="size-3.5" aria-label={isEl ? 'Χωρίς αναφορά' : 'Not cited'} />
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-2 rounded-[10px] border border-hairline bg-surface-raised/60 p-3">
          {assistantThread.map((m, i) => (
            <p
              key={i}
              className={
                m.from === 'user'
                  ? 'ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-[11px] leading-relaxed text-primary-foreground'
                  : 'mr-auto max-w-[90%] rounded-2xl rounded-bl-md border border-hairline bg-background px-3 py-2 text-[11px] leading-relaxed text-muted-foreground'
              }
            >
              {m.text}
            </p>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
