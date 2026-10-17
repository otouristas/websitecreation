import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Container } from '@/components/kit';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { CARE_PLANS, NO_PLAN_FIRST_RESPONSE_BUSINESS_DAYS, SUPPORT_WINDOW, extraWorkCents } from '@/data/commercial/care';
import { formatPrice } from '@/data/pricing';
import { centsToEuros } from '@/data/commercial/money';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === 'el';
  return buildMetadata({
    title: isEl ? 'Φροντίδα ιστοσελίδας και υποστήριξη' : 'Website care and support',
    description: isEl
      ? 'Επιπλέον εργασία 80€/ώρα. Technical Care 99€, Care Plus 250€, Partner 490€ τον μήνα, προ ΦΠΑ. Ώρες Δευτέρα–Παρασκευή 10:00–18:00 ώρα Ελλάδας. Χωρίς 24/7.'
      : 'Extra work at €80/hour. Technical Care €99, Care Plus €250, Partner €490 a month, before VAT. Hours Monday–Friday 10:00–18:00 Europe/Athens. Not a 24/7 service.',
    path: localizedPath(locale as SiteLocale, '/care'),
    hreflangPath: '/care',
  });
}

export default async function CarePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isEl = locale === 'el';
  const siteLocale = locale as SiteLocale;
  const lp = (path: string) => localizedPath(siteLocale, path);
  const money = (cents: number) => `€${formatPrice(centsToEuros(cents), siteLocale)}`;

  return (
    <>
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <Container className="hero-below-header max-w-3xl pb-24">
          <h1 className="font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[48px]">
            {isEl ? 'Φροντίδα και υποστήριξη' : 'Care and support'}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            {isEl
              ? 'Η επίσημη ουρά είναι το email και η πύλη πελάτη. Το WhatsApp είναι για ερωτήσεις πώλησης, όχι για αιτήματα πελατών. Η αυτόματη επιβεβαίωση δεν μετράει ως απάντηση.'
              : 'The official queue is email and the client portal. WhatsApp is for sales enquiries, not client requests. An automatic acknowledgement is not a response.'}
          </p>
          <p className="mt-4 text-[15px] text-foreground">
            {SUPPORT_WINDOW.days} {SUPPORT_WINDOW.opens}–{SUPPORT_WINDOW.closes} ({SUPPORT_WINDOW.timezone})
          </p>

          <h2 className="mt-10 font-display text-[22px] font-semibold">{isEl ? 'Επιπλέον εργασία' : 'Extra work'}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            {isEl
              ? `80€/ώρα προ ΦΠΑ. Ελάχιστο 30 λεπτά (${money(extraWorkCents(30))}), μετά βήματα 15 λεπτών. Υπέρβαση μόνο με νέα έγκριση.`
              : `€80/hour before VAT. Minimum 30 minutes (${money(extraWorkCents(30))}), then 15-minute steps. Overage only with a new approval.`}
          </p>

          <h2 className="mt-10 font-display text-[22px] font-semibold">{isEl ? 'Μηνιαία πακέτα' : 'Monthly plans'}</h2>
          <ul className="mt-4 space-y-3">
            {CARE_PLANS.map((plan) => (
              <li key={plan.id} className="rounded-2xl border border-hairline p-4">
                <p className="font-medium text-foreground">
                  {plan.id} · {money(plan.monthlyNetCents)}/{isEl ? 'μήνα' : 'mo'} + {isEl ? 'ΦΠΑ' : 'VAT'}
                </p>
                <p className="mt-1 text-[14px] text-muted-foreground">
                  {plan.includedMinutes} {isEl ? 'λεπτά προπληρωμένα' : 'prepaid minutes'}
                  {plan.id === 'technical-care'
                    ? isEl
                      ? ' · μόνο τεχνικά, χωρίς περιεχόμενο'
                      : ' · technical only, no content'
                    : ''}
                  {plan.priority ? (isEl ? ' · προτεραιότητα' : ' · priority') : ''}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
            {isEl
              ? 'Οι ώρες καταγράφονται σε πραγματικά λεπτά. Δεν υπάρχει ελάχιστο ανά αίτημα μέσα στο πακέτο και δεν μεταφέρονται στον επόμενο μήνα, εκτός από δική μας καθυστέρηση που καταγράφεται. Ειδοποίηση στο 80% και πριν την εξάντληση. Διαχείριση, τιμολόγηση και δικά μας σφάλματα δεν χρεώνονται.'
              : 'Hours are logged in real minutes. There is no per-request minimum inside a plan and no rollover, except a delay on our side, which is documented. Alerts at 80% and before the hours run out. Admin, billing and our own bugs are not charged.'}
          </p>

          <h2 className="mt-10 font-display text-[22px] font-semibold">{isEl ? 'Πρώτη απάντηση' : 'First response'}</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] text-muted-foreground">
            <li>
              {isEl
                ? `Χωρίς πλάνο: ${NO_PLAN_FIRST_RESPONSE_BUSINESS_DAYS} εργάσιμες`
                : `No plan: ${NO_PLAN_FIRST_RESPONSE_BUSINESS_DAYS} business days`}
            </li>
            <li>{isEl ? 'Care και Care Plus: 1 εργάσιμη' : 'Care and Care Plus: 1 business day'}</li>
            <li>{isEl ? 'Partner: 4 εργάσιμες ώρες' : 'Partner: 4 business hours'}</li>
          </ul>
          <p className="mt-2 text-[13px] text-muted-foreground">
            {isEl ? 'Στόχοι πρώτης απάντησης, όχι χρόνοι επίλυσης. Όχι 24/7.' : 'First-response targets, not resolution times. Not 24/7.'}
          </p>
          <p className="mt-8 text-[15px]">
            <Link href={lp('/offer-terms')} className="text-link underline-offset-4 hover:underline">
              {isEl ? 'Όροι προσφοράς' : 'Offer terms'}
            </Link>
          </p>
        </Container>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
