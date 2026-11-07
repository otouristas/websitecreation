'use client';

import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Bell, Building2, Car, Lock, ShoppingBag, Stethoscope } from 'lucide-react';
import { trackCtaClick } from '@/lib/analytics';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/**
 * Homepage hero, right half and the audit input: a phone showing the
 * AnotherSEOGuru App "Today" screen, with notification cards floating around it.
 *
 * Everything on the phone is sample data on `.example` domains, labelled as a
 * sample on the screen itself (the app does the same in its demo workspace).
 * The example chips switch the sample business and prefill the audit request
 * with that industry; the input sends the visitor to the free audit form with
 * their website already filled in.
 */

type Industry = 'hotel' | 'cars' | 'shop' | 'clinic';

interface Sample {
  readonly chip: string;
  readonly project: string;
  readonly domain: string;
  readonly score: number;
  readonly clicks: string;
  readonly change: string;
  readonly pagesUp: string;
  readonly fixes: readonly { readonly title: string; readonly impact: string }[];
  readonly aiQuery: string;
  readonly notifyClicks: string;
  readonly notifyAi: string;
  readonly notifyLead: string;
  readonly aster: string;
}

interface HeroCopy {
  readonly prefix: string;
  readonly inputLabel: string;
  readonly submit: string;
  readonly examples: string;
  readonly hint: string;
  readonly sampleBanner: string;
  readonly greeting: string;
  readonly health: string;
  readonly ofHundred: string;
  readonly clicks: string;
  readonly pagesUp: string;
  readonly fixesLabel: string;
  readonly weekFixes: string;
  readonly range: string;
  readonly aiTitle: string;
  readonly cited: string;
  readonly mentioned: string;
  readonly tabs: readonly [string, string, string, string];
  readonly now: string;
  readonly minutesAgo: string;
  readonly appName: string;
  readonly caption: string;
  readonly samples: Record<Industry, Sample>;
}

const COPY: Record<SiteLocale, HeroCopy> = {
  en: {
    prefix: 'https://',
    inputLabel: 'Your website address',
    submit: 'Get my free SEO audit',
    examples: 'For example',
    hint: 'Free · a person replies in 24 hours · no signup',
    sampleBanner: 'Sample workspace. Sign in to see your own sites.',
    greeting: 'Good evening',
    health: 'Search health',
    ofHundred: 'of 100',
    clicks: 'Clicks',
    pagesUp: 'Pages up',
    fixesLabel: 'Fixes',
    weekFixes: 'This week’s fixes',
    range: '28 days',
    aiTitle: 'AI visibility',
    cited: 'Cited',
    mentioned: 'Mentioned',
    tabs: ['Today', 'Work', 'Insights', 'Workspace'],
    now: 'now',
    minutesAgo: '2m ago',
    appName: 'AnotherSEOGuru',
    caption: 'The AnotherSEOGuru App on iPhone, with a sample workspace. The figures are illustrative, not a client result.',
    samples: {
      hotel: {
        chip: 'Hotel',
        project: 'Hotel',
        domain: 'aegean-suites.example',
        score: 72,
        clicks: '14.8K',
        change: '+23%',
        pagesUp: '18',
        fixes: [
          { title: 'Top 3 for “boutique hotel paros”', impact: '+412' },
          { title: 'New title & meta, /rooms', impact: '+268' },
          { title: 'Refresh /blog/best-beaches', impact: '+190' },
        ],
        aiQuery: '“best boutique hotel in paros”',
        notifyClicks: 'Clicks +48% this week',
        notifyAi: 'ChatGPT now recommends you for “boutique hotel paros”',
        notifyLead: 'New booking request from Google',
        aster: 'Your /rooms page is on page 2. I turned the fix into a task.',
      },
      cars: {
        chip: 'Rent a car',
        project: 'Rent a car',
        domain: 'naxos-cars.example',
        score: 68,
        clicks: '9.6K',
        change: '+31%',
        pagesUp: '12',
        fixes: [
          { title: 'Page for “car rental naxos port”', impact: '+356' },
          { title: 'Add prices to /fleet', impact: '+214' },
          { title: 'Google Business Profile photos', impact: '+120' },
        ],
        aiQuery: '“car rental in naxos”',
        notifyClicks: 'Clicks +36% this week',
        notifyAi: 'ChatGPT now mentions you for “car rental naxos”',
        notifyLead: '3 new rental requests today',
        aster: 'Visitors look for the port pick-up. One page could win them.',
      },
      shop: {
        chip: 'E-shop',
        project: 'E-shop',
        domain: 'olive-grove.example',
        score: 64,
        clicks: '21.3K',
        change: '+18%',
        pagesUp: '27',
        fixes: [
          { title: 'Product schema on 42 products', impact: '+520' },
          { title: 'Fix slow /category/olive-oil', impact: '+305' },
          { title: 'Merge 2 duplicate pages', impact: '+160' },
        ],
        aiQuery: '“best greek olive oil to buy”',
        notifyClicks: 'Clicks +27% this week',
        notifyAi: 'Gemini now cites your olive oil guide',
        notifyLead: '5 orders from organic search today',
        aster: 'Product schema is missing. Your products can show prices on Google.',
      },
      clinic: {
        chip: 'Clinic',
        project: 'Medical practice',
        domain: 'smile-dental.example',
        score: 77,
        clicks: '4.2K',
        change: '+41%',
        pagesUp: '9',
        fixes: [
          { title: 'Top 3 for “dentist chalandri”', impact: '+188' },
          { title: 'Reviews section on /contact', impact: '+96' },
          { title: 'FAQ for “dental implants cost”', impact: '+74' },
        ],
        aiQuery: '“good dentist in chalandri”',
        notifyClicks: 'Calls from Google +41%',
        notifyAi: 'ChatGPT now recommends you for “dentist chalandri”',
        notifyLead: 'New appointment request',
        aster: 'You are 4th on Maps. Two fixes can bring you into the top 3.',
      },
    },
  },
  el: {
    prefix: 'https://',
    inputLabel: 'Η διεύθυνση της ιστοσελίδας σας',
    submit: 'Θέλω δωρεάν έλεγχο SEO',
    examples: 'Για παράδειγμα',
    hint: 'Δωρεάν · απαντά άνθρωπος σε 24 ώρες · χωρίς εγγραφή',
    sampleBanner: 'Δείγμα. Συνδεθείτε για να δείτε τους δικούς σας ιστότοπους.',
    greeting: 'Καλησπέρα',
    health: 'Υγεία SEO',
    ofHundred: 'στα 100',
    clicks: 'Κλικ',
    pagesUp: 'Σελίδες ↑',
    fixesLabel: 'Διορθώσεις',
    weekFixes: 'Οι διορθώσεις της εβδομάδας',
    range: '28 ημέρες',
    aiTitle: 'Ορατότητα AI',
    cited: 'Πηγή',
    mentioned: 'Αναφορά',
    tabs: ['Σήμερα', 'Εργασίες', 'Τάσεις', 'Χώρος'],
    now: 'τώρα',
    minutesAgo: 'πριν 2΄',
    appName: 'AnotherSEOGuru',
    caption: 'Η εφαρμογή AnotherSEOGuru στο iPhone, με δείγμα δεδομένων. Τα νούμερα είναι ενδεικτικά, όχι αποτέλεσμα πελάτη.',
    samples: {
      hotel: {
        chip: 'Ξενοδοχείο',
        project: 'Ξενοδοχείο',
        domain: 'aegean-suites.example',
        score: 72,
        clicks: '14,8K',
        change: '+23%',
        pagesUp: '18',
        fixes: [
          { title: 'Top 3 για «boutique hotel paros»', impact: '+412' },
          { title: 'Νέος τίτλος και meta, /rooms', impact: '+268' },
          { title: 'Ανανέωση του /blog/paralies', impact: '+190' },
        ],
        aiQuery: '«καλύτερο boutique ξενοδοχείο Πάρος»',
        notifyClicks: 'Κλικ +48% αυτή την εβδομάδα',
        notifyAi: 'Το ChatGPT σας προτείνει πλέον για «ξενοδοχείο Πάρος»',
        notifyLead: 'Νέο αίτημα κράτησης από το Google',
        aster: 'Η σελίδα /rooms είναι στη 2η σελίδα. Τη διόρθωση την έκανα ήδη εργασία.',
      },
      cars: {
        chip: 'Rent a car',
        project: 'Rent a car',
        domain: 'naxos-cars.example',
        score: 68,
        clicks: '9,6K',
        change: '+31%',
        pagesUp: '12',
        fixes: [
          { title: 'Σελίδα για «ενοικίαση αυτοκινήτου λιμάνι Νάξου»', impact: '+356' },
          { title: 'Τιμές στη σελίδα /stolos', impact: '+214' },
          { title: 'Φωτογραφίες στο Google Business Profile', impact: '+120' },
        ],
        aiQuery: '«ενοικίαση αυτοκινήτου Νάξος»',
        notifyClicks: 'Κλικ +36% αυτή την εβδομάδα',
        notifyAi: 'Το ChatGPT σας αναφέρει πλέον για «rent a car Νάξος»',
        notifyLead: '3 νέα αιτήματα ενοικίασης σήμερα',
        aster: 'Οι πελάτες ψάχνουν παράδοση στο λιμάνι. Μία σελίδα αρκεί για να τους κερδίσετε.',
      },
      shop: {
        chip: 'E-shop',
        project: 'E-shop',
        domain: 'olive-grove.example',
        score: 64,
        clicks: '21,3K',
        change: '+18%',
        pagesUp: '27',
        fixes: [
          { title: 'Schema προϊόντων σε 42 προϊόντα', impact: '+520' },
          { title: 'Πιο γρήγορη η /katigoria/elaiolado', impact: '+305' },
          { title: 'Ένωση 2 διπλών σελίδων', impact: '+160' },
        ],
        aiQuery: '«καλύτερο ελληνικό ελαιόλαδο online»',
        notifyClicks: 'Κλικ +27% αυτή την εβδομάδα',
        notifyAi: 'Το Gemini παραθέτει πλέον τον οδηγό σας για το ελαιόλαδο',
        notifyLead: '5 παραγγελίες από την αναζήτηση σήμερα',
        aster: 'Λείπει το schema προϊόντων. Με αυτό, οι τιμές σας φαίνονται στο Google.',
      },
      clinic: {
        chip: 'Ιατρείο',
        project: 'Ιατρείο',
        domain: 'smile-dental.example',
        score: 77,
        clicks: '4,2K',
        change: '+41%',
        pagesUp: '9',
        fixes: [
          { title: 'Top 3 για «οδοντίατρος Χαλάνδρι»', impact: '+188' },
          { title: 'Κριτικές στη σελίδα /epikoinonia', impact: '+96' },
          { title: 'FAQ για «κόστος εμφυτευμάτων»', impact: '+74' },
        ],
        aiQuery: '«καλός οδοντίατρος στο Χαλάνδρι»',
        notifyClicks: 'Κλήσεις από το Google +41%',
        notifyAi: 'Το ChatGPT σας προτείνει πλέον για «οδοντίατρος Χαλάνδρι»',
        notifyLead: 'Νέο αίτημα για ραντεβού',
        aster: 'Είστε 4οι στους χάρτες. Δύο διορθώσεις σας φέρνουν στην πρώτη τριάδα.',
      },
    },
  },
};

const INDUSTRIES: readonly { readonly id: Industry; readonly Icon: typeof Building2 }[] = [
  { id: 'hotel', Icon: Building2 },
  { id: 'cars', Icon: Car },
  { id: 'shop', Icon: ShoppingBag },
  { id: 'clinic', Icon: Stethoscope },
];

/** Hostnames typed into the empty input, one after the other, as a hint. */
const TYPED: Record<SiteLocale, readonly string[]> = {
  en: ['your-business.com', 'your-hotel.gr', 'your-eshop.gr'],
  el: ['h-epixeirisi-sas.gr', 'to-ksenodoxeio-sas.gr', 'to-eshop-sas.gr'],
};

function useTypedPlaceholder(words: readonly string[], active: boolean): string {
  const [text, setText] = useState(words[0] ?? '');
  useEffect(() => {
    if (!active) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let word = 0;
    let len = words[0]?.length ?? 0;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = words[word] ?? '';
      if (deleting) {
        len -= 1;
        if (len <= 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
      } else {
        len += 1;
        if (len >= (words[word] ?? '').length) {
          deleting = true;
          setText((words[word] ?? '').slice(0, len));
          timer = setTimeout(tick, 2200);
          return;
        }
      }
      setText((deleting ? current : words[word] ?? '').slice(0, Math.max(0, len)));
      timer = setTimeout(tick, deleting ? 45 : 85);
    };
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [words, active]);
  return text;
}

export function PhoneHero({
  locale,
  children,
  after,
}: {
  readonly locale: SiteLocale;
  readonly children?: ReactNode;
  readonly after?: ReactNode;
}) {
  const t = COPY[locale];
  const [industry, setIndustry] = useState<Industry>('hotel');
  const [website, setWebsite] = useState('');
  const [focused, setFocused] = useState(false);
  const typed = useTypedPlaceholder(TYPED[locale], !focused && website === '');
  const sample = t.samples[industry];
  const auditBase = localizedPath(locale, '/get-started');

  const auditHref = (site: string) => {
    const params = new URLSearchParams();
    const clean = site.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
    if (clean) params.set('website', clean);
    params.set('project', sample.project);
    return `${auditBase}?${params.toString()}#free-audit`;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackCtaClick('home-hero-audit-input');
    window.location.assign(auditHref(website));
  };

  return (
    <>
      <div className="min-w-0">
        {children}
        <form
          action={auditBase}
          method="get"
          onSubmit={onSubmit}
          className="mt-8 flex w-full max-w-[560px] items-center gap-2 rounded-full border border-hairline bg-surface/90 p-1.5 pl-5 shadow-[0_18px_50px_-22px_color-mix(in_oklab,var(--primary)_60%,transparent)] backdrop-blur transition-[border-color,box-shadow] focus-within:border-primary/60 focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent),0_18px_50px_-22px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
          data-hero-cta=""
        >
          <Lock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="hidden shrink-0 font-display text-[17px] text-muted-foreground min-[420px]:inline sm:text-[19px]" aria-hidden>
            {t.prefix}
          </span>
          <label htmlFor="home-hero-website" className="sr-only">{t.inputLabel}</label>
          <input
            id="home-hero-website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            value={website}
            placeholder={typed}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(event) => setWebsite(event.target.value)}
            className="min-w-0 flex-1 bg-transparent py-2.5 font-display text-[17px] font-semibold text-foreground outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 placeholder:font-medium placeholder:text-foreground/30 sm:text-[19px]"
          />
          <button
            type="submit"
            aria-label={t.submit}
            title={t.submit}
            className="asg-primary-action grid size-12 shrink-0 place-items-center rounded-full transition-transform duration-200 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </form>
        <p className="mt-2.5 pl-5 text-[12.5px] text-muted-foreground">{t.hint}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 w-full font-code text-[11px] xl:w-auto font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.examples}</span>
          {INDUSTRIES.map(({ id, Icon }) => {
            const active = id === industry;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setIndustry(id)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-[14px] font-semibold transition-colors ${
                  active
                    ? 'border-foreground/70 bg-surface text-foreground shadow-[0_6px_20px_-12px_oklch(0_0_0/60%)]'
                    : 'border-hairline bg-surface/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                }`}
              >
                <span className={`grid size-6 place-items-center rounded-full ${active ? 'bg-[linear-gradient(135deg,var(--primary),var(--signal))] text-primary-foreground' : 'bg-foreground/10'}`}>
                  <Icon className="size-3.5" aria-hidden />
                </span>
                {t.samples[id].chip}
              </button>
            );
          })}
        </div>
        {after}
      </div>

      <PhoneStage t={t} sample={sample} />
    </>
  );
}

function Float({ className, delay, children }: { readonly className: string; readonly delay: number; readonly children: ReactNode }) {
  return (
    <div className={`phone-float absolute z-20 ${className}`} style={{ '--float-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

function AppIcon({ className = 'size-8' }: { readonly className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-[9px] bg-[#0B1424] ${className}`}>
      <img src="/brand/asg-mark.svg" alt="" width={20} height={20} className="size-[62%]" />
    </span>
  );
}

function Notification({ title, body, time, icon }: { readonly title: string; readonly body: string; readonly time: string; readonly icon: ReactNode }) {
  return (
    <div className="flex w-[262px] items-start gap-2.5 rounded-[20px] border border-white/40 bg-white/80 p-3 text-[#0B1424] shadow-[0_24px_60px_-20px_oklch(0_0_0/55%)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1A2333]/85 dark:text-white">
      {icon}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[12.5px] font-semibold">{title}</span>
          <span className="shrink-0 text-[10.5px] opacity-55">{time}</span>
        </div>
        <p className="mt-0.5 text-[12.5px] leading-snug opacity-85">{body}</p>
      </div>
    </div>
  );
}

function ScoreDial({ score }: { readonly score: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="size-[66px] -rotate-90" aria-hidden>
      <circle cx="32" cy="32" r={r} fill="none" stroke="currentColor" strokeWidth="5" className="text-foreground/10" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - score / 100)}
        className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
      />
    </svg>
  );
}

function PhoneStage({ t, sample }: { readonly t: HeroCopy; readonly sample: Sample }) {
  return (
    <figure className="relative mx-auto flex min-w-0 w-full max-w-[560px] justify-center pb-6 pt-14 lg:mx-0 lg:justify-end lg:pr-10">
      <figcaption className="sr-only">{t.caption}</figcaption>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(520px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_32%,transparent),transparent_65%)] blur-2xl" />

      {/* The phone. 9:19.5, like a current iPhone. */}
      <div aria-hidden className="relative w-[272px] shrink-0 rounded-[48px] bg-[#0A0F18] p-[9px] shadow-[0_0_0_1.5px_#2A3344,0_50px_100px_-30px_oklch(0_0_0/70%),inset_0_0_0_1px_#1C2433] sm:w-[300px] xl:w-[316px]">
        <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[40px] bg-background">
          <div className="absolute left-1/2 top-[9px] z-10 h-[24px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center justify-between px-6 pt-[13px] text-[11px] font-semibold text-foreground">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="flex items-end gap-[1.5px]">
                <span className="h-[4px] w-[2.5px] rounded-sm bg-foreground" />
                <span className="h-[6px] w-[2.5px] rounded-sm bg-foreground" />
                <span className="h-[8px] w-[2.5px] rounded-sm bg-foreground" />
                <span className="h-[10px] w-[2.5px] rounded-sm bg-foreground" />
              </span>
              <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-foreground/60 p-[1.5px]">
                <span className="block h-full w-[75%] rounded-[1px] bg-foreground" />
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 pt-4">
            <img src="/brand/asg-mark.svg" alt="" width={20} height={20} className="size-5" />
            <span className="text-[13px] font-semibold text-foreground">
              Another<span className="text-primary">SEO</span>Guru
            </span>
            <span className="ml-auto grid size-7 place-items-center rounded-full border border-hairline text-[13px] text-primary">✦</span>
          </div>

          <div className="mx-3 mt-3 rounded-xl border border-primary/25 bg-primary/10 px-3 py-1.5 text-[9.5px] leading-snug text-muted-foreground">
            {t.sampleBanner}
          </div>

          <div className="mx-3 mt-2.5 rounded-[20px] border border-hairline bg-surface p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 pt-1">
                <div className="text-[16px] font-bold leading-tight text-foreground">{t.greeting}</div>
                <div key={sample.domain} className="hero-swap mt-1 truncate text-[11px] text-muted-foreground">{sample.domain}</div>
              </div>
              <div className="relative grid shrink-0 place-items-center">
                <ScoreDial score={sample.score} />
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div key={sample.score} className="hero-swap text-[17px] font-light leading-none text-foreground">{sample.score}</div>
                    <div className="text-[7px] text-muted-foreground">{t.ofHundred}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[
                { v: sample.clicks, l: t.clicks, tone: 'text-primary' },
                { v: sample.pagesUp, l: t.pagesUp, tone: 'text-success' },
                { v: String(sample.fixes.length * 8 + 1), l: t.fixesLabel, tone: 'text-warning' },
              ].map((stat) => (
                <div key={stat.l} className="rounded-xl border border-hairline bg-background/60 px-2 py-1.5">
                  <div key={stat.v} className={`hero-swap text-[14px] font-semibold leading-tight ${stat.tone}`}>{stat.v}</div>
                  <div className="truncate text-[9px] text-muted-foreground">{stat.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-[9.5px] text-muted-foreground">
              <span>Search Console · {t.range}</span>
              <span className="rounded-full bg-success/15 px-1.5 py-px font-semibold text-success">↗ {sample.change}</span>
            </div>
          </div>

          <div className="mx-3 mt-2.5 rounded-[20px] border border-hairline bg-surface p-3">
            <div className="text-[11.5px] font-semibold text-foreground">{t.weekFixes}</div>
            <ul key={sample.domain} className="hero-swap mt-2 space-y-1.5">
              {sample.fixes.map((fix, index) => (
                <li key={fix.title} className="flex items-center gap-2 text-[10px]">
                  <span className="grid size-[18px] shrink-0 place-items-center rounded-md bg-primary/15 text-[9px] font-bold text-primary">{index + 1}</span>
                  <span className="min-w-0 flex-1 truncate text-foreground/90">{fix.title}</span>
                  <span className="shrink-0 font-semibold text-success">{fix.impact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-3 mt-2.5 rounded-[20px] border border-hairline bg-surface p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-semibold text-foreground">{t.aiTitle}</span>
            </div>
            <div key={sample.aiQuery} className="hero-swap mt-0.5 truncate text-[9.5px] text-muted-foreground">{sample.aiQuery}</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {[
                { name: 'ChatGPT', cited: true },
                { name: 'Gemini', cited: false },
                { name: 'Perplexity', cited: true },
              ].map((engine) => (
                <span
                  key={engine.name}
                  className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${engine.cited ? 'bg-success/15 text-success' : 'bg-primary/15 text-primary'}`}
                >
                  {engine.name} · {engine.cited ? t.cited : t.mentioned}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto px-3 pb-3">
            <div className="flex items-center justify-around rounded-full border border-hairline bg-surface/95 px-1 py-1.5 text-[8.5px] text-muted-foreground backdrop-blur">
              {t.tabs.map((tab, index) => (
                <span key={tab} className={`flex flex-col items-center gap-0.5 rounded-full px-2.5 py-1 ${index === 0 ? 'bg-primary/12 font-semibold text-primary' : ''}`}>
                  <span className={`block size-3 rounded-[4px] ${index === 0 ? 'bg-primary' : 'bg-foreground/25'}`} />
                  {tab}
                </span>
              ))}
            </div>
            <div className="mx-auto mt-2 h-[4px] w-[96px] rounded-full bg-foreground/30" />
          </div>
        </div>
      </div>

      {/* Floating notifications around the phone. */}
      <Float className="right-0 top-0 sm:-right-2 lg:right-0 lg:top-0 xl:right-[-2.5rem]" delay={0}>
        <Notification
          title={t.appName}
          time={t.now}
          body={sample.notifyClicks}
          icon={<AppIcon />}
        />
      </Float>
      <Float className="left-0 top-[40%] hidden sm:block xl:left-[-3.5rem]" delay={900}>
        <Notification
          title="ChatGPT"
          time={t.minutesAgo}
          body={sample.notifyAi}
          icon={
            <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-[#10A37F] text-white">
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
                <path d="M22.3 9.8a5.9 5.9 0 0 0-.5-4.9 6 6 0 0 0-6.5-2.9A6 6 0 0 0 4.9 4.2a5.9 5.9 0 0 0-4 2.9 6 6 0 0 0 .8 7 5.9 5.9 0 0 0 .5 4.9 6 6 0 0 0 6.5 2.9 5.9 5.9 0 0 0 4.5 2 6 6 0 0 0 5.7-4.2 5.9 5.9 0 0 0 4-2.9 6 6 0 0 0-.7-7Zm-9 12.6a4.4 4.4 0 0 1-2.8-1l.1-.1 4.7-2.7a.8.8 0 0 0 .4-.7v-6.6l2 1.1v5.5a4.5 4.5 0 0 1-4.4 4.5Zm-9.5-4.1a4.4 4.4 0 0 1-.5-3l.1.1 4.7 2.7a.8.8 0 0 0 .8 0l5.7-3.3v2.3l-4.8 2.7a4.5 4.5 0 0 1-6-1.6ZM2.6 8a4.4 4.4 0 0 1 2.3-2V11.6a.8.8 0 0 0 .4.7l5.7 3.3-2 1.1-4.7-2.7A4.5 4.5 0 0 1 2.6 8Zm16.3 3.8-5.7-3.3 2-1.1 4.7 2.7a4.5 4.5 0 0 1-.7 8.1v-5.6a.8.8 0 0 0-.3-.8Zm2-3-.1-.1-4.7-2.7a.8.8 0 0 0-.8 0L9.6 9.3V7l4.8-2.7a4.5 4.5 0 0 1 6.6 4.6ZM8.3 12.9l-2-1.1V6.2a4.5 4.5 0 0 1 7.3-3.4l-.1.1-4.7 2.7a.8.8 0 0 0-.4.7Zm1.1-2.4L12 9l2.6 1.5v3L12 15l-2.6-1.5Z" />
              </svg>
            </span>
          }
        />
      </Float>
      <Float className="bottom-[24%] right-0 hidden sm:block xl:right-[-2.5rem]" delay={1800}>
        <Notification
          title={t.appName}
          time={t.minutesAgo}
          body={sample.notifyLead}
          icon={
            <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-success text-white">
              <Bell className="size-4" aria-hidden />
            </span>
          }
        />
      </Float>
      <Float className="bottom-0 left-0 lg:left-[-0.5rem]" delay={2700}>
        <div className="w-[248px] rounded-[20px] border border-hairline bg-surface/95 p-3 shadow-[0_24px_60px_-20px_oklch(0_0_0/55%)] backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--signal))] text-[12px] font-bold text-primary-foreground">A</span>
            <span className="text-[12.5px] font-semibold text-foreground">Aster AI</span>
            <span className="ml-auto flex gap-0.5" aria-hidden>
              <span className="size-1.5 animate-pulse rounded-full bg-primary/70" />
              <span className="size-1.5 animate-pulse rounded-full bg-primary/50 [animation-delay:150ms]" />
              <span className="size-1.5 animate-pulse rounded-full bg-primary/30 [animation-delay:300ms]" />
            </span>
          </div>
          <p key={sample.aster} className="hero-swap mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{sample.aster}</p>
        </div>
      </Float>
    </figure>
  );
}
