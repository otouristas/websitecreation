import type { ComponentProps } from 'react';
import { Sparkles } from 'lucide-react';
import { PCard, Pill } from '@/components/kit';
import type { SiteLocale } from '@/lib/i18n/locale';

type Tone = ComponentProps<typeof Pill>['tone'];

/**
 * Page-local "Do this next" card for /solutions/rent-a-car.
 *
 * The kit's DecisionsPanel is hard-wired to the sample Paros hotel, which read
 * oddly on a car rental page. Same visual language, car rental examples, and no
 * click or traffic figures: it illustrates the kind of fix, not a result.
 */
export function RentalFixesPreview({ locale, count = 3 }: { readonly locale: SiteLocale; readonly count?: number }) {
  const el = locale === 'el';
  const items: { tone: Tone; label: string; effort: string; title: string; path: string }[] = [
    {
      tone: 'brand',
      label: el ? 'Λείπει σελίδα' : 'Missing page',
      effort: el ? 'Μία μέρα' : 'A day',
      title: el ? 'Σελίδα παραλαβής για «ενοικίαση αυτοκινήτου αεροδρόμιο ηρακλείου»' : 'Pickup page for “car rental heraklion airport”',
      path: '/heraklion-airport',
    },
    {
      tone: 'warning',
      label: el ? 'Χαμηλό CTR' : 'Low CTR',
      effort: el ? 'Γρήγορο' : 'Quick fix',
      title: el ? 'Τίτλος με τιμή «από» και δωρεάν ακύρωση στη σελίδα στόλου' : 'Add a from-price and free cancellation to the fleet title',
      path: '/fleet',
    },
    {
      tone: 'primary',
      label: el ? 'Κοντά στην κορυφή' : 'Striking distance',
      effort: el ? 'Μισή μέρα' : 'Half a day',
      title: el ? 'Σελίδα λιμανιού με ωράρια πλοίων και σημείο συνάντησης' : 'Port page with ferry times and the meeting point',
      path: '/port-pickup',
    },
    {
      tone: 'destructive',
      label: el ? 'Ταχύτητα' : 'Speed',
      effort: el ? 'Μισή μέρα' : 'Half a day',
      title: el ? 'Ελαφρύτερη φόρμα κράτησης στο κινητό' : 'Lighter booking form on mobile',
      path: '/book',
    },
  ];

  return (
    <PCard
      icon={<Sparkles />}
      title={el ? 'Κάντε αυτό τώρα' : 'Do this next'}
      meta={el ? 'Δείγμα rent a car' : 'Sample rental'}
    >
      <ul className="divide-y divide-hairline">
        {items.slice(0, count).map((f, i) => (
          <li key={f.path} className="flex gap-3 px-4 py-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/8 text-[11px] font-medium text-muted-foreground">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Pill tone={f.tone}>{f.label}</Pill>
                <span className="text-[11px] text-muted-foreground">{f.effort}</span>
              </div>
              <div className="mt-1 font-medium leading-snug text-foreground">{f.title}</div>
              <div className="mt-0.5 truncate text-[12px] text-muted-foreground">{f.path}</div>
            </div>
          </li>
        ))}
      </ul>
    </PCard>
  );
}
