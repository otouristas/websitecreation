import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Container } from '@/components/kit';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { SEO_LAUNCH_INCLUDED_EL, SEO_LAUNCH_INCLUDED_EN } from '@/data/commercial/seo-launch';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === 'el';
  return buildMetadata({
    title: isEl ? 'SEO Launch: 3 ή 6 μήνες μετά τη δημοσίευση' : 'SEO Launch: 3 or 6 months after go-live',
    description: isEl
      ? 'Ανθρώπινο πρόγραμμα SEO για μία ιστοσελίδα, μία γλώσσα και μία αγορά. Έως 2 ώρες τον ενεργό μήνα, χωρίς αυτόματη ανανέωση και χωρίς εγγύηση κατάταξης.'
      : 'A human SEO programme for one site, one language and one market. Up to 2 hours each active month, no automatic renewal and no ranking guarantee.',
    path: localizedPath(locale as SiteLocale, '/seo-launch'),
    hreflangPath: '/seo-launch',
  });
}

export default async function SeoLaunchPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
  const included = isEl ? SEO_LAUNCH_INCLUDED_EL : SEO_LAUNCH_INCLUDED_EN;

  const blocks = isEl
    ? [
        ['Τι είναι', 'Πραγματική ανθρώπινη υπηρεσία για 1 ιστοσελίδα, 1 γλώσσα και 1 αγορά. Professional: 3 μήνες, 6 ώρες σύνολο. Business: 6 μήνες, 12 ώρες σύνολο. Έως 2 ώρες ανθρώπινης SEO εργασίας ανά ενεργό μήνα.'],
        ['Κάθε μήνα', 'Έλεγχος πραγματικών δεδομένων, μία στοχευμένη δέσμη σε έως 2 υπάρχουσες σελίδες και σύντομη αναφορά που ελέγχει άνθρωπος.'],
        ['Πρώτος μήνας', 'Baseline, παρακολούθηση και χάρτης στόχευσης.'],
        ['Δεν περιλαμβάνει', 'Νέα άρθρα ή σελίδες, επιπλέον γλώσσες, ανασχεδιασμό, backlinks, PR, διαφημιστικό budget και απεριόριστες συναντήσεις.'],
        ['Πότε ξεκινά', 'Μετά τη δημοσίευση και την παράδοση προσβάσεων. Καθυστέρηση δική μας δεν ξοδεύει μήνες. Καθυστέρηση δική σας σημαίνει καταγεγραμμένη παύση.'],
        ['Ανανέωση', `auto_renew είναι ψευδές. Δεν μετατρέπεται μόνο του σε μηνιαίο SEO. ${included}.`],
        ['Εγγυήσεις', 'Δεν υπάρχει εγγύηση κατάταξης, εσόδων ή αναφορών σε AI.'],
      ]
    : [
        ['What it is', 'A real human service for 1 website, 1 language and 1 market. Professional: 3 months, 6 hours in total. Business: 6 months, 12 hours in total. Up to 2 hours of human SEO work per active month.'],
        ['Each month', 'A review of real data, one targeted batch on up to 2 existing pages, and a short report a person has checked.'],
        ['Month 1', 'Baseline, tracking and a targeting map.'],
        ['Not included', 'New articles or pages, extra languages, a redesign, backlinks, PR, ad budget and unlimited meetings.'],
        ['When it starts', 'After go-live and access. Delays on our side do not consume months. Delays on your side are a documented pause.'],
        ['Renewal', `auto_renew is false. It never converts itself into a paid retainer. ${included}.`],
        ['Guarantees', 'No ranking, revenue or AI-mention guarantee.'],
      ];

  return (
    <>
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        <Container className="hero-below-header max-w-3xl pb-24">
          <h1 className="font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[48px]">
            {isEl ? 'SEO Launch' : 'SEO Launch'}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            {isEl
              ? 'Πρόγραμμα μετά τη δημοσίευση, μέσα στην προσφορά κατασκευής Professional και Business.'
              : 'A post-launch programme inside the Professional and Business website offer.'}
          </p>
          <div className="mt-10 space-y-8">
            {blocks.map(([title, body]) => (
              <section key={title}>
                <h2 className="font-display text-[22px] font-semibold text-foreground">{title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
              </section>
            ))}
          </div>
          <p className="mt-10 text-[15px]">
            <Link href={lp('/offer-terms')} className="font-medium text-link underline-offset-4 hover:underline">
              {isEl ? 'Όροι προσφοράς' : 'Offer terms'}
            </Link>
          </p>
        </Container>
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
