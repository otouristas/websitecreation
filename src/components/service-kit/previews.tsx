import { ArrowRight, CheckCircle2, Clock3, CornerDownRight, KeyRound, MapPin, MessageSquare, Palette, ShoppingCart, Star, Type } from 'lucide-react';
import { PCard } from '@/components/kit/AppWindow';
import { ScoreRing } from '@/components/kit/chart';
import { Pill, SAMPLE_SITE } from '@/components/kit/previews';
import { cn } from '@/lib/cn';
import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Service-specific previews in the kit's visual language, on the same sample
 * Paros hotel as the kit previews. Static markup, clearly labelled sample data.
 */

type L = SiteLocale;
const tx = (l: L, en: string, el: string) => (l === 'el' ? el : en);

/* ------------------------------------------------------------------ build stages */

function StageFrame({ variant, label, liveTag }: { readonly variant: 'wire' | 'design' | 'live'; readonly label: string; readonly liveTag: string }) {
  const bar = (w: string, tone: string) => <span className={cn('block h-2 rounded-[2px]', tone)} style={{ width: w }} />;
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-background">
      <div className="flex items-center gap-1.5 border-b border-hairline bg-surface px-3 py-2">
        <span className="size-1.5 rounded-full bg-foreground/15" />
        <span className="size-1.5 rounded-full bg-foreground/15" />
        <span className={cn('size-1.5 rounded-full', variant === 'live' ? 'bg-success' : 'bg-foreground/15')} />
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      </div>
      <div className="space-y-2.5 p-4">
        {variant === 'wire' ? (
          <>
            {bar('60%', 'bg-foreground/12')}
            {bar('85%', 'bg-foreground/8')}
            {bar('45%', 'bg-foreground/8')}
          </>
        ) : variant === 'design' ? (
          <>
            {bar('60%', 'bg-primary/55')}
            {bar('85%', 'bg-foreground/12')}
            {bar('45%', 'bg-foreground/10')}
          </>
        ) : (
          <>
            {bar('60%', 'bg-primary')}
            {bar('85%', 'bg-foreground/20')}
            {bar('45%', 'bg-foreground/14')}
          </>
        )}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'block h-8 rounded-[4px]',
                variant === 'wire' ? 'bg-foreground/6' : variant === 'design' ? 'bg-primary/12' : 'bg-brand/20',
              )}
            />
          ))}
        </div>
        {variant === 'live' ? <Pill tone="success">{liveTag}</Pill> : null}
      </div>
    </div>
  );
}

/** Wireframe -> design -> live, for build pages. */
export function BuildStagesPreview({ locale: l, only }: { readonly locale: L; readonly only?: 'wire' | 'design' | 'live' }) {
  const stages = [
    ['wire', 'Wireframe'],
    ['design', tx(l, 'Design', 'Σχεδιασμός')],
    ['live', 'Live'],
  ] as const;
  const liveTag = tx(l, 'Indexed', 'Στο ευρετήριο');
  if (only) {
    const s = stages.find(([v]) => v === only)!;
    return <StageFrame variant={s[0]} label={s[1]} liveTag={liveTag} />;
  }
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stages.map(([v, label]) => (
        <StageFrame key={v} variant={v} label={label} liveTag={liveTag} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ ownership */

export function OwnershipPreview({ locale: l }: { readonly locale: L }) {
  const rows: [string, string][] = [
    [tx(l, 'Domain', 'Domain'), tx(l, 'In your name', 'Στο όνομά σας')],
    ['Hosting', tx(l, 'In your name', 'Στο όνομά σας')],
    [tx(l, 'Admin access', 'Πρόσβαση διαχειριστή'), tx(l, 'Full', 'Πλήρης')],
    ['Search Console & Analytics', tx(l, 'Your account', 'Δικός σας λογαριασμός')],
    [tx(l, 'Training', 'Εκπαίδευση'), tx(l, 'At handover', 'Στην παράδοση')],
  ];
  return (
    <PCard icon={<KeyRound />} title={tx(l, 'Handover checklist', 'Λίστα παράδοσης')} subtitle={SAMPLE_SITE} meta={tx(l, 'sample', 'δείγμα')}>
      <ul className="divide-y divide-hairline">
        {rows.map(([k, v]) => (
          <li key={k} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="flex items-center gap-2 text-foreground/90">
              <CheckCircle2 className="size-3.5 text-success" />
              {k}
            </span>
            <span className="text-[12px] text-muted-foreground">{v}</span>
          </li>
        ))}
      </ul>
    </PCard>
  );
}

/* ------------------------------------------------------------------ redesign */

export function RedirectMapPreview({ locale: l }: { readonly locale: L }) {
  const rows: [string, string, string][] = [
    ['/rooms.php?id=4', '/rooms/sea-view-suite', '301'],
    ['/el/domatia', '/el/rooms', '301'],
    ['/offers-2024', '/offers', '301'],
    ['/blog/paros-beaches', '/blog/best-beaches-paros', '301'],
  ];
  return (
    <PCard
      icon={<CornerDownRight />}
      title={tx(l, 'Redirect map', 'Χάρτης ανακατευθύνσεων')}
      subtitle={tx(l, '214 old URLs mapped before launch · sample data', '214 παλιά URL αντιστοιχισμένα πριν το λανσάρισμα · δείγμα')}
      meta={tx(l, '0 lost', '0 χαμένα')}
    >
      <ul className="divide-y divide-hairline font-mono text-[11.5px]">
        {rows.map(([from, to, code]) => (
          <li key={from} className="flex items-center gap-2 px-4 py-2.5">
            <span className="min-w-0 flex-1 truncate text-muted-foreground line-through decoration-foreground/25">{from}</span>
            <ArrowRight className="size-3.5 shrink-0 text-brand" />
            <span className="min-w-0 flex-1 truncate text-foreground">{to}</span>
            <Pill tone="success">{code}</Pill>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-hairline px-4 py-2.5 text-[11.5px] text-muted-foreground">
        <span>
          {tx(l, 'Rankings kept', 'Θέσεις που διατηρήθηκαν')} <b className="text-foreground">96%</b>
        </span>
        <span>
          {tx(l, 'Content carried over', 'Περιεχόμενο που μεταφέρθηκε')} <b className="text-foreground">100%</b>
        </span>
      </div>
    </PCard>
  );
}

/* ------------------------------------------------------------------ speed */

export function SpeedPreview({ locale: l }: { readonly locale: L }) {
  const rows: [string, string, string, 'success' | 'warning'][] = [
    ['LCP', '4.6s', '2.1s', 'success'],
    ['INP', '310ms', '140ms', 'success'],
    ['CLS', '0.21', '0.03', 'success'],
    [tx(l, 'Page weight', 'Βάρος σελίδας'), '5.8MB', '1.4MB', 'success'],
  ];
  return (
    <PCard title={tx(l, 'Core Web Vitals · mobile', 'Core Web Vitals · κινητό')} subtitle={`${SAMPLE_SITE}/rooms · ${tx(l, 'sample data', 'δείγμα')}`} meta={tx(l, 'before → after', 'πριν → μετά')}>
      <div className="flex items-center gap-5 border-b border-hairline px-4 py-3">
        <div className="text-center">
          <ScoreRing value={41} size={56} tone="warning" />
          <div className="mt-1 text-[11px] text-muted-foreground">{tx(l, 'Before', 'Πριν')}</div>
        </div>
        <ArrowRight className="size-4 text-muted-foreground" />
        <div className="text-center">
          <ScoreRing value={94} size={56} />
          <div className="mt-1 text-[11px] text-muted-foreground">{tx(l, 'After', 'Μετά')}</div>
        </div>
        <p className="hidden flex-1 text-[12px] leading-snug text-muted-foreground sm:block">
          {tx(l, 'Images, fonts, caching and the booking widget, fixed in order of impact.', 'Εικόνες, γραμματοσειρές, cache και το widget κρατήσεων, με σειρά επίδρασης.')}
        </p>
      </div>
      <table className="w-full text-[12px]">
        <tbody className="divide-y divide-hairline">
          {rows.map(([k, before, after, tone]) => (
            <tr key={k}>
              <td className="px-4 py-2 font-medium text-foreground">{k}</td>
              <td className="px-2 py-2 text-right tabular-nums text-muted-foreground line-through decoration-foreground/25">{before}</td>
              <td className="px-2 py-2 text-right tabular-nums text-foreground">{after}</td>
              <td className="px-4 py-2 text-right">
                <Pill tone={tone}>{tx(l, 'Good', 'Καλό')}</Pill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PCard>
  );
}

/* ------------------------------------------------------------------ logo / brand */

export function BrandKitPreview({ locale: l }: { readonly locale: L }) {
  const swatches = ['bg-[oklch(0.32_0.08_255)]', 'bg-[oklch(0.62_0.15_220)]', 'bg-[oklch(0.93_0.03_90)]', 'bg-[oklch(0.72_0.13_60)]'];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <PCard icon={<Palette />} title={tx(l, 'Brand kit', 'Brand kit')} subtitle="Aegean Suites" meta={tx(l, 'sample', 'δείγμα')}>
        <div className="flex items-center gap-3 px-4 py-4">
          <span className="grid size-12 place-items-center rounded-xl bg-[oklch(0.32_0.08_255)] font-serif text-[22px] italic text-white">A</span>
          <div>
            <div className="font-display text-[17px] font-semibold tracking-[-0.02em] text-foreground">Aegean Suites</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Paros · Cyclades</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 border-t border-hairline px-4 py-3">
          {swatches.map((s) => (
            <span key={s} className={cn('h-8 rounded-md ring-1 ring-inset ring-foreground/10', s)} />
          ))}
        </div>
      </PCard>
      <PCard icon={<Type />} title={tx(l, 'Guidelines', 'Οδηγίες χρήσης')} subtitle={tx(l, 'Formats for web, print and social', 'Αρχεία για web, εκτύπωση και social')}>
        <ul className="grid gap-1.5 px-4 py-3 text-[12px]">
          {['SVG · PNG · PDF', tx(l, 'Light and dark versions', 'Ανοιχτή και σκούρα εκδοχή'), tx(l, 'Typography pairing', 'Συνδυασμός γραμματοσειρών'), tx(l, 'Favicon and social avatar', 'Favicon και avatar για social')].map((t) => (
            <li key={t} className="flex items-center gap-2 text-foreground/90">
              <CheckCircle2 className="size-3.5 text-success" />
              {t}
            </li>
          ))}
        </ul>
      </PCard>
    </div>
  );
}

/* ------------------------------------------------------------------ e-shop */

export function StorePreview({ locale: l }: { readonly locale: L }) {
  const rows: [string, string, 'success' | 'warning' | 'brand'][] = [
    [tx(l, 'Category pages indexed', 'Κατηγορίες στο ευρετήριο'), '24 / 24', 'success'],
    [tx(l, 'Product schema valid', 'Έγκυρο schema προϊόντων'), '312 / 318', 'success'],
    [tx(l, 'Checkout steps', 'Βήματα ολοκλήρωσης αγοράς'), '2', 'brand'],
    [tx(l, 'Mobile LCP on product pages', 'LCP σε κινητό, σελίδες προϊόντων'), '2.3s', 'warning'],
  ];
  return (
    <PCard icon={<ShoppingCart />} title={tx(l, 'Store health', 'Υγεία καταστήματος')} subtitle={tx(l, 'WooCommerce · sample data', 'WooCommerce · δείγμα')} meta={tx(l, 'weekly', 'εβδομαδιαία')}>
      <div className="grid grid-cols-3 gap-2 border-b border-hairline px-4 py-3">
        {[
          [tx(l, 'Organic orders', 'Οργανικές παραγγελίες'), '186'],
          [tx(l, 'Conversion', 'Μετατροπή'), '2.4%'],
          [tx(l, 'Revenue', 'Έσοδα'), '€21.4K'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-hairline bg-background px-2.5 py-2">
            <div className="truncate text-[11px] text-muted-foreground">{k}</div>
            <div className="font-display text-[17px] font-semibold text-foreground">{v}</div>
          </div>
        ))}
      </div>
      <ul className="divide-y divide-hairline">
        {rows.map(([k, v, tone]) => (
          <li key={k} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="text-foreground/90">{k}</span>
            <Pill tone={tone}>{v}</Pill>
          </li>
        ))}
      </ul>
    </PCard>
  );
}

/* ------------------------------------------------------------------ local */

/** A Google Business Profile completeness card (sample business). */
export function GbpProfilePreview({ locale: l }: { readonly locale: L }) {
  const items: [string, boolean][] = [
    [tx(l, 'Primary and secondary categories', 'Κύρια και δευτερεύουσες κατηγορίες'), true],
    [tx(l, 'Services and service areas', 'Υπηρεσίες και περιοχές εξυπηρέτησης'), true],
    [tx(l, 'Holiday hours', 'Ωράριο αργιών'), true],
    [tx(l, 'Weekly posts and photos', 'Εβδομαδιαίες αναρτήσεις και φωτογραφίες'), true],
    [tx(l, '3 questions unanswered', '3 ερωτήσεις χωρίς απάντηση'), false],
  ];
  return (
    <PCard icon={<MapPin />} title="Google Business Profile" subtitle={`Aegean Suites · ${tx(l, 'sample data', 'δείγμα')}`} meta="92%">
      <div className="flex items-center gap-4 border-b border-hairline px-4 py-3 text-[12px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5 text-warning" /> <b className="text-foreground">4.9</b> · 312 {tx(l, 'reviews', 'κριτικές')}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 className="size-3.5" /> {tx(l, 'Open now', 'Ανοιχτά τώρα')}
        </span>
        <span className="hidden items-center gap-1 sm:inline-flex">
          <MessageSquare className="size-3.5" /> {tx(l, 'Replies within a day', 'Απαντήσεις σε μία μέρα')}
        </span>
      </div>
      <ul className="divide-y divide-hairline">
        {items.map(([k, ok]) => (
          <li key={k} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="text-foreground/90">{k}</span>
            <Pill tone={ok ? 'success' : 'warning'}>{ok ? tx(l, 'Done', 'Έτοιμο') : tx(l, 'To do', 'Εκκρεμεί')}</Pill>
          </li>
        ))}
      </ul>
    </PCard>
  );
}

/** Name / address / phone lines, drifted or consistent. */
export function NapListPreview({
  title,
  lines,
  tone,
}: {
  readonly title: string;
  readonly lines: ReadonlyArray<string>;
  readonly tone: 'bad' | 'good';
}) {
  return (
    <PCard
      title={title}
      meta={tone === 'good' ? '3 / 3' : '0 / 3'}
      className={tone === 'good' ? 'border-brand/35' : undefined}
    >
      <ul className="divide-y divide-hairline font-mono text-[12px] leading-relaxed">
        {lines.map((line, i) => (
          <li key={i} className={cn('px-4 py-3', tone === 'good' ? 'text-foreground' : 'text-muted-foreground')}>
            {line}
          </li>
        ))}
      </ul>
    </PCard>
  );
}
