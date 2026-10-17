import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Owner copy for the Website Launch Offer, 17 Oct 2026.
 * Greek strings that the brief marked as exact are stored verbatim.
 * English strings are the full translations of the same messages.
 */

export interface LaunchCopy {
  readonly stripDesktop: string;
  readonly stripCta: string;
  readonly stripTerms: string;
  readonly stripMobile: string;
  readonly heroTitle: string;
  readonly heroLead: string;
  readonly heroPrimaryCta: string;
  readonly heroSecondaryCta: string;
  readonly scarcityAsk: string;
  readonly scarcityCount: (remaining: number, total: number) => string;
  readonly scarcityConfirm: string;
  readonly ended: string;
  readonly afterDelivery: string;
  readonly termsNearPrice: string;
  readonly cards: Readonly<Record<'starter' | 'professional' | 'business', {
    readonly priceLine: string;
    readonly offerLine: string;
    readonly detail: string;
    readonly cta: string;
  }>>;
  readonly chooseQuote: string;
  readonly approveQuote: string;
  readonly softwareNotice: string;
}

const el: LaunchCopy = {
  stripDesktop: '−30% στην κατασκευή ιστοσελίδας. Με 3 μήνες SEO στο Professional ή 6 μήνες στο Business.',
  stripCta: 'Δες τα πακέτα',
  stripTerms: 'Όροι προσφοράς',
  stripMobile: 'Ιστοσελίδα από 1.050€ + ΦΠΑ · −30%',
  heroTitle: 'Νέα ιστοσελίδα. Με πλάνο και για την επόμενη μέρα.',
  heroLead:
    'Ξεκίνα από 1.050€ + ΦΠΑ με την προσφορά −30%. Στα Professional και Business περιλαμβάνεται πρόγραμμα SEO 3 ή 6 μηνών, αντίστοιχα, με συγκεκριμένες εργασίες και μηνιαία αναφορά.',
  heroPrimaryCta: 'Δες τι περιλαμβάνεται',
  heroSecondaryCta: 'Δες έργα μας',
  scarcityAsk: 'Ζήτησε προσφορά και διαθεσιμότητα.',
  scarcityCount: (remaining, total) => `Απομένουν ${remaining} από τις ${total} θέσεις της προσφοράς.`,
  scarcityConfirm:
    'Η θέση επιβεβαιώνεται με αποδοχή προσφοράς και προκαταβολή. Η έναρξη του έργου προγραμματίζεται ξεχωριστά.',
  ended: 'Η προσφορά ολοκληρώθηκε. Ζήτησε την τρέχουσα προσφορά για το έργο σου.',
  afterDelivery:
    'Η ιστοσελίδα παραδίδεται με ξεκάθαρα συμφωνημένα. Για ό,τι χρειαστείς στη συνέχεια, επιλέγεις χρέωση ανά εργασία ή πακέτο φροντίδας. Κάθε πρόσθετο κόστος εγκρίνεται πριν ξεκινήσουμε.',
  termsNearPrice:
    'Η έκπτωση αφορά το βασικό κόστος κατασκευής. Το SEO Launch περιλαμβάνεται στα Professional/Business για 3/6 μήνες, αντίστοιχα, στο συμφωνημένο εύρος. Hosting, υπηρεσίες τρίτων και πρόσθετες εργασίες δεν περιλαμβάνονται, εκτός αν αναφέρονται στην προσφορά.',
  cards: {
    starter: {
      priceLine: 'Από 1.500€ → από 1.050€ + ΦΠΑ',
      offerLine: '−30% στην κατασκευή',
      detail: 'Έως 5 σελίδες, 1 γλώσσα, φόρμα, τεχνικό SEO και μία εκπαίδευση έως 60 λεπτά. Χωρίς SEO Launch και χωρίς υποχρεωτική φροντίδα.',
      cta: 'Ζήτησε προσφορά',
    },
    professional: {
      priceLine: 'Από 2.500€ → από 1.750€ + ΦΠΑ',
      offerLine: '−30% στην κατασκευή + SEO Launch 3 μηνών',
      detail: 'Στοχευμένες βελτιώσεις μετά τη δημοσίευση και μηνιαία αναφορά. Έως 2 ώρες SEO εργασίας ανά μήνα. Χωρίς αυτόματη ανανέωση.',
      cta: 'Επιλέγω Professional',
    },
    business: {
      priceLine: 'Από 4.000€ → από 2.800€ + ΦΠΑ',
      offerLine: '−30% στην κατασκευή + SEO Launch 6 μηνών',
      detail: 'Έξι μήνες στοχευμένης SEO φροντίδας και μηνιαίων αναφορών. Έως 2 ώρες SEO εργασίας ανά μήνα. Χωρίς αυτόματη ανανέωση.',
      cta: 'Επιλέγω Business',
    },
  },
  chooseQuote: 'Ζήτησε προσφορά',
  approveQuote: 'Εγκρίνω την προσφορά',
  softwareNotice:
    'Η συνδρομή λογισμικού δεν περιλαμβάνει ανθρώπινη υλοποίηση SEO ή αλλαγές ιστοσελίδας, εκτός αν αναφέρεται ρητά σε ξεχωριστή συμφωνία υπηρεσιών.',
};

const en: LaunchCopy = {
  stripDesktop: '30% off your website build. Professional includes 3 months of SEO Launch. Business includes 6.',
  stripCta: 'See the packages',
  stripTerms: 'Offer terms',
  stripMobile: 'Websites from €1,050 + VAT · 30% off',
  heroTitle: 'A new website. With a plan for the day after.',
  heroLead:
    'Start from €1,050 + VAT with 30% off the build. Professional and Business include a 3- or 6-month SEO programme, respectively, with specific tasks and a monthly report.',
  heroPrimaryCta: 'See what’s included',
  heroSecondaryCta: 'See our work',
  scarcityAsk: 'Ask for a quote and availability.',
  scarcityCount: (remaining, total) => `${remaining} of ${total} offer places are left.`,
  scarcityConfirm:
    'A place is confirmed when the quote is accepted and the deposit is paid. The project start is scheduled separately.',
  ended: 'This offer has ended. Ask for the current quote for your project.',
  afterDelivery:
    'The website is delivered against what we agreed. For anything after that, you choose hourly work or a care plan. Every extra cost is approved before we start.',
  termsNearPrice:
    'The discount applies to the base build cost. SEO Launch is included with Professional and Business for 3 and 6 months respectively, within the agreed scope. Hosting, third-party services and extra work are not included unless the quote names them.',
  cards: {
    starter: {
      priceLine: 'From €1,500 → from €1,050 + VAT',
      offerLine: '30% off the build',
      detail: 'Up to 5 pages, 1 language, a form, technical SEO and one training session of up to 60 minutes. No SEO Launch and no mandatory care plan.',
      cta: 'Request a quote',
    },
    professional: {
      priceLine: 'From €2,500 → from €1,750 + VAT',
      offerLine: '30% off the build + 3 months of SEO Launch',
      detail: 'Targeted improvements after publication and a monthly report. Up to 2 hours of SEO work per month. No automatic renewal.',
      cta: 'Choose Professional',
    },
    business: {
      priceLine: 'From €4,000 → from €2,800 + VAT',
      offerLine: '30% off the build + 6 months of SEO Launch',
      detail: 'Six months of targeted SEO care and monthly reports. Up to 2 hours of SEO work per month. No automatic renewal.',
      cta: 'Choose Business',
    },
  },
  chooseQuote: 'Request a quote',
  approveQuote: 'I accept the quote',
  softwareNotice:
    'A software subscription does not include human SEO implementation or website changes, unless a separate services agreement says so explicitly.',
};

export function launchCopy(locale: SiteLocale): LaunchCopy {
  return locale === 'el' ? el : en;
}
