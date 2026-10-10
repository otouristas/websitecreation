'use client';

import { useEffect, useId, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Briefcase, Check, Clock3, MapPin, MonitorSmartphone, Search, Trophy } from 'lucide-react';
import { cn } from '@/lib/cn';
import { describeAnswers, submitLead } from '@/lib/leads';
import { captureUtmParams, trackFormStart, trackLead } from '@/lib/analytics';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { FreeAuditForm } from '@/components/landing/FreeAuditForm';
import { primaryBtnClass } from '@/components/landing/primitives';
import {
  FetchDetailsButton,
  FetchDetailsNote,
  SiteDetailsCard,
  looksLikeUrl,
  siteDetailsFields,
  siteDetailsMessage,
  useSiteDetails,
} from '@/components/landing/SiteDetailsFetch';
import { TrustLine, kitSecondaryBtn } from '@/components/kit';
import { PageHero, accentTail } from '@/components/page-kit';
import { PROJECTS_DELIVERED_LABEL, RESPONSE_HOURS } from '@/data/company-facts';
import { FOUNDER, FOUNDER_YEARS } from '@/data/founder';

/**
 * /get-started: one short page with two doors.
 *
 *   SEO      -> the free audit form (instant homepage check + live SEO team board)
 *   Website  -> a short brief for a new site, a redesign or an e-shop
 *
 * The door comes from `?service=`: `seo` / `website`, or a service slug from the
 * service pages (website slugs open the Website door, everything else SEO).
 * Switching updates the URL in place. Both forms post to the app's lead
 * pipeline with Formspree as the backup (submitLead).
 */

type Service = 'seo' | 'website';

/** Service-page slugs that are about building a site rather than ranking one. */
const WEBSITE_SLUGS = new Set([
  'website',
  'websites',
  'webdesign',
  'web-design',
  'website-creation',
  'website-redesign',
  'seo-web-design',
  'eshop',
  'e-shop',
  'eshop-woocommerce',
  'logo-design',
]);

function serviceFromParam(value: string | null): Service {
  return value && WEBSITE_SLUGS.has(value.toLowerCase()) ? 'website' : 'seo';
}

const COPY = {
  en: {
    title: 'Get started with SEO or a new website',
    lead: `Pick what you need. It takes two minutes, there is no commitment, and you hear back within ${RESPONSE_HOURS} working hours.`,
    tabsLabel: 'What do you need?',
    tabs: {
      seo: { label: 'Free SEO audit', sub: 'I have a site and want more customers from Google' },
      website: { label: 'New website', sub: 'A new site, a redesign or an e-shop' },
    },
    trust: [`${PROJECTS_DELIVERED_LABEL} projects delivered`, `${FOUNDER_YEARS}+ years in SEO`, `Based in ${FOUNDER.city}`, `Reply within ${RESPONSE_HOURS} hours`],
  },
  el: {
    title: 'Ξεκινήστε με SEO ή νέα ιστοσελίδα',
    lead: `Διαλέξτε τι χρειάζεστε. Θέλει δύο λεπτά, χωρίς δέσμευση, και σας απαντάμε μέσα σε ${RESPONSE_HOURS} εργάσιμες ώρες.`,
    tabsLabel: 'Τι χρειάζεστε;',
    tabs: {
      seo: { label: 'Δωρεάν έλεγχος SEO', sub: 'Έχω ιστοσελίδα και θέλω περισσότερους πελάτες από το Google' },
      website: { label: 'Νέα ιστοσελίδα', sub: 'Νέα ιστοσελίδα, ανανέωση ή e-shop' },
    },
    trust: [`${PROJECTS_DELIVERED_LABEL} έργα`, `${FOUNDER_YEARS}+ χρόνια στο SEO`, `Με έδρα την ${FOUNDER.cityEl}`, `Απάντηση σε ${RESPONSE_HOURS} ώρες`],
  },
} as const;

const TRUST_ICONS = [Briefcase, Trophy, MapPin, Clock3];

/* ------------------------------------------------------------------ website brief */

type ProjectType = 'has-site' | 'new-site' | 'eshop';

const WEBSITE_COPY = {
  en: {
    eyebrow: 'New website',
    title: 'Tell us about the site you need. We reply with ideas and a quote.',
    body: 'A few details are enough. If you already have a site, we read it first so you do not have to repeat yourself.',
    types: { 'has-site': 'I have a website', 'new-site': 'I need a new website', eshop: 'I need an e-shop' } as Record<ProjectType, string>,
    typesLabel: 'Where are you now?',
    website: 'Your current website',
    websitePh: 'your-business.com',
    business: 'Business name',
    name: 'Your name',
    email: 'Email',
    phone: 'Phone or WhatsApp (optional)',
    need: 'What do you need? (optional)',
    needPh: 'e.g. A bilingual site for our 8-room guesthouse with direct booking, ready before the summer.',
    submit: 'Send my brief',
    sending: 'Sending...',
    doneTitle: (first: string) => (first ? `Thanks, ${first}. We have your brief.` : 'Thanks. We have your brief.'),
    doneBody: `We will reply within ${RESPONSE_HOURS} working hours with first ideas and a quote. Keep an eye on your inbox, and your spam folder just in case.`,
    seeWork: 'See websites we have built',
    errors: {
      website: 'Enter your website address, like your-business.com.',
      business: 'Add your business name.',
      name: 'Add your name.',
      email: 'Enter a valid email address.',
      generic: 'Something went wrong. Please try again or message us on WhatsApp.',
    },
  },
  el: {
    eyebrow: 'Νέα ιστοσελίδα',
    title: 'Πείτε μας τι ιστοσελίδα χρειάζεστε. Σας στέλνουμε ιδέες και προσφορά.',
    body: 'Λίγα στοιχεία αρκούν. Αν έχετε ήδη ιστοσελίδα, τη διαβάζουμε πρώτα, για να μη χρειαστεί να τα γράψετε ξανά.',
    types: { 'has-site': 'Έχω ιστοσελίδα', 'new-site': 'Χρειάζομαι νέα ιστοσελίδα', eshop: 'Χρειάζομαι e-shop' } as Record<ProjectType, string>,
    typesLabel: 'Πού βρίσκεστε τώρα;',
    website: 'Η τωρινή σας ιστοσελίδα',
    websitePh: 'h-epixeirisi-sas.gr',
    business: 'Όνομα επιχείρησης',
    name: 'Το όνομά σας',
    email: 'Email',
    phone: 'Τηλέφωνο ή WhatsApp (προαιρετικό)',
    need: 'Τι χρειάζεστε; (προαιρετικό)',
    needPh: 'π.χ. Δίγλωσση ιστοσελίδα για τον ξενώνα μας με 8 δωμάτια και απευθείας κρατήσεις, έτοιμη πριν το καλοκαίρι.',
    submit: 'Στείλτε το αίτημα',
    sending: 'Αποστολή...',
    doneTitle: (first: string) => (first ? `Ευχαριστούμε, ${first}. Λάβαμε το αίτημά σας.` : 'Ευχαριστούμε. Λάβαμε το αίτημά σας.'),
    doneBody: `Θα σας απαντήσουμε μέσα σε ${RESPONSE_HOURS} εργάσιμες ώρες με πρώτες ιδέες και προσφορά. Ρίξτε μια ματιά στο email σας, και στα ανεπιθύμητα για σιγουριά.`,
    seeWork: 'Δείτε ιστοσελίδες που έχουμε φτιάξει',
    errors: {
      website: 'Γράψτε τη διεύθυνση της ιστοσελίδας σας, π.χ. h-epixeirisi-sas.gr.',
      business: 'Προσθέστε το όνομα της επιχείρησής σας.',
      name: 'Προσθέστε το όνομά σας.',
      email: 'Γράψτε ένα έγκυρο email.',
      generic: 'Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μας μήνυμα στο WhatsApp.',
    },
  },
} as const;

/** English labels for the lead record, whatever language the visitor used. */
const TYPE_EN: Record<ProjectType, string> = WEBSITE_COPY.en.types;

const inputClass =
  'h-12 w-full min-w-0 rounded-2xl border border-hairline bg-background/60 px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-brand/60 focus:outline-none';

function WebsiteBriefForm({
  locale,
  initialWebsite,
  context,
  className,
}: {
  locale: SiteLocale;
  initialWebsite: string;
  context?: Record<string, string>;
  className?: string;
}) {
  const t = WEBSITE_COPY[locale];
  const details = useSiteDetails();
  const [projectType, setProjectType] = useState<ProjectType>(initialWebsite ? 'has-site' : 'new-site');
  const [website, setWebsite] = useState(initialWebsite);
  const [business, setBusiness] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState('');
  const [gotcha, setGotcha] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const typesId = useId();
  const showWebsite = projectType !== 'new-site';

  function markStarted() {
    if (started) return;
    setStarted(true);
    trackFormStart('get-started');
  }

  async function handleFetchDetails() {
    markStarted();
    const found = await details.fetchFor(website);
    if (!found) return;
    // Only empty fields: whatever the visitor typed wins.
    if (found.siteName) setBusiness((v) => v || (found.siteName as string));
    if (found.email) setEmail((v) => v || (found.email as string));
    if (found.phone) setPhone((v) => v || (found.phone as string));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const site = showWebsite ? website.trim() : '';
    const mail = email.trim();
    if (projectType === 'has-site' && !looksLikeUrl(site)) return setError(t.errors.website);
    if (site && !looksLikeUrl(site)) return setError(t.errors.website);
    if (!business.trim()) return setError(t.errors.business);
    if (!name.trim()) return setError(t.errors.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) return setError(t.errors.email);
    if (gotcha) {
      // Bot filled the honeypot: pretend success, send nothing.
      setDone(true);
      return;
    }
    setError(null);
    setSending(true);
    const utm = captureUtmParams();
    const info = showWebsite ? details.info : null;
    const answers = {
      Request: 'New website',
      'Project type': TYPE_EN[projectType],
      'What they need': need.trim(),
      ...context,
      ...utm,
    };
    const res = await submitLead(
      {
        form: 'get_started_website',
        'Form Type': 'Get Started - Website',
        _subject: `New website request from ${business.trim()}`,
        'Project Type': TYPE_EN[projectType],
        'Business Name': business.trim(),
        'Current Website': site || 'None',
        'What They Need': need.trim() || 'Not provided',
        'Full Name': name.trim(),
        Email: mail,
        Phone: phone.trim() || 'Not provided',
        ...siteDetailsFields(info),
        ...context,
        locale,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        ...utm,
      },
      {
        name: name.trim(),
        email: mail,
        phone: phone.trim() || undefined,
        website: site || undefined,
        company: business.trim() || info?.siteName || undefined,
        service: 'webdesign',
        message: [describeAnswers(answers), siteDetailsMessage(info)].filter(Boolean).join('\n\n'),
        locale,
        source: 'website-get-started',
      },
    );
    setSending(false);
    if (res.ok) {
      trackLead('get-started', { project_type: projectType, ...(context?.Industry ? { industry: context.Industry } : {}) });
      setDone(true);
    } else {
      setError(res.error ?? t.errors.generic);
    }
  }

  if (done) {
    return (
      <div className={cn('glass rounded-3xl p-6 text-center sm:p-8', className)} role="status">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Check className="size-7" strokeWidth={2.5} aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">{t.doneTitle(name.trim().split(/\s+/)[0] ?? '')}</h2>
        <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{t.doneBody}</p>
        <Link href={localizedPath(locale, '/work')} className={cn(kitSecondaryBtn, 'mt-6')}>
          {t.seeWork}
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('glass rounded-3xl p-5 text-left sm:p-6', className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{t.eyebrow}</p>
      <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.02em] text-foreground">{t.title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.body}</p>

      <p id={typesId} className="sr-only">
        {t.typesLabel}
      </p>
      <div role="radiogroup" aria-labelledby={typesId} className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(t.types) as ProjectType[]).map((id) => {
          const active = projectType === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                markStarted();
                setProjectType(id);
              }}
              className={cn(
                'inline-flex min-h-10 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                active ? 'border-brand/70 bg-brand/15 text-foreground' : 'border-hairline bg-background/40 text-muted-foreground hover:border-brand/40 hover:text-foreground',
              )}
            >
              {active && <Check className="size-3.5 shrink-0 text-brand" aria-hidden />}
              {t.types[id]}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {showWebsite && (
          <div className="grid min-w-0 gap-2 sm:col-span-2">
            <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
              <label className="grid min-w-0 flex-1 gap-1">
                <span className="sr-only">{t.website}</span>
                <input name="website" type="text" inputMode="url" autoComplete="url" placeholder={`${t.website}: ${t.websitePh}`} value={website} onFocus={markStarted} onChange={(e) => setWebsite(e.target.value)} className={inputClass} />
              </label>
              <FetchDetailsButton locale={locale} state={details.state} onClick={handleFetchDetails} />
            </div>
            <FetchDetailsNote locale={locale} state={details.state} />
            {details.info && <SiteDetailsCard locale={locale} info={details.info} onDismiss={details.dismiss} />}
          </div>
        )}
        <label className="grid min-w-0 gap-1">
          <span className="sr-only">{t.business}</span>
          <input name="company" type="text" autoComplete="organization" placeholder={t.business} value={business} onFocus={markStarted} onChange={(e) => setBusiness(e.target.value)} className={inputClass} />
        </label>
        <label className="grid min-w-0 gap-1">
          <span className="sr-only">{t.name}</span>
          <input name="name" type="text" autoComplete="name" placeholder={t.name} value={name} onFocus={markStarted} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
        <label className="grid min-w-0 gap-1">
          <span className="sr-only">{t.email}</span>
          <input name="email" type="email" inputMode="email" autoComplete="email" placeholder={t.email} value={email} onFocus={markStarted} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </label>
        <label className="grid min-w-0 gap-1">
          <span className="sr-only">{t.phone}</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={t.phone} value={phone} onFocus={markStarted} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
        </label>
        <label className="grid min-w-0 gap-1 sm:col-span-2">
          <span className="text-[13px] text-muted-foreground">{t.need}</span>
          <textarea name="need" rows={3} maxLength={2000} placeholder={t.needPh} value={need} onFocus={markStarted} onChange={(e) => setNeed(e.target.value)} className={cn(inputClass, 'h-auto min-h-24 resize-y py-3')} />
        </label>
        {/* Honeypot: humans never see or fill this. */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={sending} className={cn(primaryBtnClass, 'w-full shrink-0 disabled:opacity-80 sm:w-auto')}>
          {sending ? t.sending : t.submit}
          {!sending && <ArrowRight className="size-4 shrink-0" aria-hidden />}
        </button>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ page */

function ServiceSwitch({ locale, value, onChange }: { locale: SiteLocale; value: Service; onChange: (next: Service) => void }) {
  const t = COPY[locale];
  const options: Array<{ id: Service; icon: typeof Search }> = [
    { id: 'seo', icon: Search },
    { id: 'website', icon: MonitorSmartphone },
  ];
  return (
    <div role="tablist" aria-label={t.tabsLabel} className="grid grid-cols-2 gap-1.5 rounded-3xl border border-hairline bg-surface/70 p-1.5 backdrop-blur">
      {options.map(({ id, icon: Icon }) => {
        const active = value === id;
        return (
          <button
            key={id}
            id={`gs-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`gs-panel-${id}`}
            onClick={() => onChange(id)}
            className={cn(
              'flex min-w-0 flex-col items-center gap-1 rounded-[20px] px-3 py-3 text-center transition-colors sm:flex-row sm:gap-3 sm:px-5 sm:py-4 sm:text-left',
              active
                ? 'bg-[linear-gradient(180deg,var(--primary),var(--primary-deep))] text-primary-foreground shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--primary)_80%,transparent)]'
                : 'text-foreground hover:bg-background/60',
            )}
          >
            <Icon className={cn('size-5 shrink-0', active ? 'text-primary-foreground' : 'text-brand')} aria-hidden />
            <span className="min-w-0">
              <span className="block font-display text-[15px] font-semibold leading-tight tracking-[-0.01em] sm:text-[17px]">{t.tabs[id].label}</span>
              <span className={cn('mt-0.5 hidden text-[13px] leading-snug sm:block', active ? 'text-primary-foreground/80' : 'text-muted-foreground')}>{t.tabs[id].sub}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function GetStartedClient({ locale }: { locale: SiteLocale }) {
  const t = COPY[locale];
  const [service, setService] = useState<Service>('seo');
  const [initial, setInitial] = useState<{ website: string; context?: Record<string, string> }>({ website: '' });

  useEffect(() => {
    // The page is static, so the query string is only known in the browser: the first paint is the
    // SEO door and this corrects it. `website` arrives from the homepage scan, `project` from industry pages.
    const params = new URLSearchParams(window.location.search);
    const project = params.get('project')?.slice(0, 60);
    /* eslint-disable react-hooks/set-state-in-effect */
    setService(window.location.hash === '#free-audit' ? 'seo' : serviceFromParam(params.get('service')));
    setInitial({ website: params.get('website')?.slice(0, 200) ?? '', context: project ? { Industry: project } : undefined });
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function switchService(next: Service) {
    setService(next);
    const url = new URL(window.location.href);
    url.searchParams.set('service', next);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <main className="blueprint-grid relative z-0">
      <PageHero
        locale={locale}
        size="md"
        title={accentTail(t.title, 2)}
        lead={t.lead}
        actions={
          <div className="mx-auto w-full max-w-4xl">
            <ServiceSwitch locale={locale} value={service} onChange={switchService} />
            <div id="gs-panel-seo" role="tabpanel" aria-labelledby="gs-tab-seo" hidden={service !== 'seo'} className="mt-4">
              <FreeAuditForm key={`seo-${initial.website}`} locale={locale} initialWebsite={initial.website} context={initial.context} />
            </div>
            <div id="gs-panel-website" role="tabpanel" aria-labelledby="gs-tab-website" hidden={service !== 'website'} className="mt-4">
              <WebsiteBriefForm key={`web-${initial.website}`} locale={locale} initialWebsite={initial.website} context={initial.context} />
            </div>
          </div>
        }
        trust={<TrustLine items={t.trust.map((label, i) => ({ icon: TRUST_ICONS[i], label }))} />}
        className="pb-20"
      />
    </main>
  );
}
