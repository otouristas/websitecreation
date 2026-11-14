import type { SiteLocale } from '@/lib/i18n/locale';

/**
 * Optional hand-written copy for industry hubs rendered by IndustryPageView.
 *
 * Industries without an entry keep the generic template. An entry can replace
 * the H1 and lead, rename the template's headings (the generic Greek strings
 * do not inflect every industry name correctly), add topic sections with real
 * H2s and add an FAQ block with FAQPage schema. Prices are `{{TOKEN}}`
 * placeholders resolved against src/data/pricing.ts at render.
 */

export interface IndustryTopicSection {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly bullets?: readonly string[];
  readonly link?: { readonly href: string; readonly label: string };
}

export interface IndustryPageCopy {
  /** Exact H1. The last `accentWords` words get the serif accent. */
  readonly h1?: string;
  readonly accentWords?: number;
  readonly lead?: string;
  readonly needsTitle?: string;
  readonly needsBody?: string;
  /** Replaces the sample-hotel preview beside the needs list with a checklist card. */
  readonly checklist?: { readonly title: string; readonly items: readonly string[] };
  readonly servicesTitle?: string;
  readonly ctaTitle?: string;
  readonly ctaBody?: string;
  readonly topicsEyebrow?: string;
  readonly topicsTitle?: string;
  readonly topics?: readonly IndustryTopicSection[];
  readonly faqTitle?: string;
  readonly faqs?: readonly { readonly question: string; readonly answer: string }[];
}

const COPY: Record<string, Partial<Record<SiteLocale, IndustryPageCopy>>> = {
  lawyers: {
    el: {
      h1: 'Ιστοσελίδες και τοπικό SEO για δικηγορικά γραφεία',
      accentWords: 2,
      lead: 'Ο άνθρωπος που χρειάζεται δικηγόρο θέλει να ξέρει αν αναλαμβάνετε τη δική του υπόθεση, ποιος θα μιλήσει μαζί του και πώς θα κλείσει την πρώτη συνάντηση. Φτιάχνουμε την ιστοσελίδα του γραφείου σας γύρω από αυτές τις ερωτήσεις.',
      needsTitle: 'Τι χρειάζεται να γνωρίζει κανείς πριν σας καλέσει',
      needsBody: 'Ξεκινάμε με τους τομείς δικαίου που πράγματι ασκείτε και τις πόλεις όπου δέχεστε εντολείς. Ο δικηγόρος που αναλαμβάνει τον κάθε τομέα ελέγχει τη διατύπωση πριν δημοσιευτεί.',
      checklist: {
        title: 'Έλεγχος πριν από τη δημοσίευση',
        items: ['Διακριτή σελίδα για κάθε βασικό τομέα δικαίου', 'Βιογραφικό και στοιχεία επικοινωνίας του υπεύθυνου δικηγόρου', 'Ωράριο, ακριβής διεύθυνση και τρόπος να κλείσει κάποιος ραντεβού', 'Σύντομη φόρμα για την πρώτη επικοινωνία'],
      },
      servicesTitle: 'Υπηρεσίες για το δικηγορικό σας γραφείο',
      topicsTitle: 'Τι να γράψετε για τις υπηρεσίες του γραφείου',
      topics: [{
        eyebrow: 'Πρώτη επικοινωνία',
        title: 'Από την αναζήτηση στο πρώτο ραντεβού',
        body: 'Αν αναλαμβάνετε μισθωτικές διαφορές, ο ενδιαφερόμενος πρέπει να το βλέπει πριν σας τηλεφωνήσει. Εξηγούμε πώς προγραμματίζεται η πρώτη συζήτηση και ποιος θα επικοινωνήσει μαζί του. Η αρχική φόρμα ζητά μόνο τα στοιχεία που χρειάζονται για να τον καλέσετε, χωρίς να τον υποχρεώνει να περιγράψει την υπόθεσή του.',
      }],
      ctaTitle: 'Πώς βρίσκουν σήμερα το γραφείο σας;',
      ctaBody: 'Στείλτε μας την ιστοσελίδα σας, την πόλη και τους τομείς δικαίου που αναλαμβάνετε. Θα δούμε πού συναντά δυσκολία κάποιος που θέλει να κλείσει ραντεβού.',
    },
    en: {
      h1: 'Websites and local SEO for law firms',
      accentWords: 2,
      lead: 'Someone looking for a lawyer wants to know whether you handle their matter, who they will speak to and how to arrange a first meeting. Those questions shape the site we build for your firm.',
      needsTitle: 'What a prospective client needs before calling',
      checklist: {
        title: 'Before your site goes live',
        items: ['A clear page for each practice area', 'The responsible lawyer’s background and contact details', 'Office location, opening hours and appointment options', 'A short enquiry form that does not require confidential case details'],
      },
      ctaTitle: 'How do clients find your firm?',
      ctaBody: 'Send us your current site, office location and practice areas. We will check how easily a prospective client can arrange a first meeting.',
    },
  },
  'real-estate': {
    el: {
      h1: 'Ιστοσελίδες και SEO για μεσιτικά γραφεία',
      accentWords: 2,
      lead:
        'Οι αγοραστές αναζητούν ακίνητα με βάση την περιοχή και τα χαρακτηριστικά τους. Σχεδιάζουμε την ιστοσελίδα του μεσιτικού σας γραφείου ώστε να βλέπουν τις διαθέσιμες καταχωρήσεις και να ζητούν επίσκεψη μέσα από τη σελίδα του ακινήτου.',
      needsTitle: 'Τι χρειάζεται η ιστοσελίδα ενός μεσιτικού γραφείου',
      servicesTitle: 'Υπηρεσίες για μεσιτικά γραφεία',
      ctaTitle: 'Έτοιμοι για νέα ιστοσελίδα μεσιτικού γραφείου;',
      ctaBody: 'Στείλτε μας το site σας και τις περιοχές που καλύπτετε. Θα σας πούμε τι λείπει για να σας βρίσκουν αγοραστές.',
    },
  },

  doctors: {
    en: {
      h1: 'SEO for doctors and medical practices',
      accentWords: 3,
      lead:
        'Help a patient find the right specialty near home and see how to book a first visit. We work on your practice pages, Google Business Profile and reviews with patient confidentiality and medical ethics in mind.',
      needsTitle: 'What a medical practice website needs',
      needsBody:
        'Patients choose a doctor on trust, distance and how easy it is to book. The site has to answer all three before they pick up the phone.',
      checklist: {
        title: 'Practice SEO checklist',
        items: [
          'Google Business Profile: specialty category, hours, photos',
          'One page per specialty and procedure',
          'Doctor bio with credentials and registration',
          'Medical review date on every clinical page',
          'Booking that collects only what is needed',
          'Review replies that never confirm someone is a patient',
        ],
      },
      servicesTitle: 'Services for doctors and practices',
      ctaTitle: 'Ready to be found by patients nearby?',
      ctaBody: 'Send us your practice website and specialty. We will show you what patients search in your area and what the site is missing.',
      topicsEyebrow: 'Medical SEO',
      topicsTitle: 'How SEO works for a medical practice',
      topics: [
        {
          eyebrow: 'Search intent',
          title: 'SEO for medical practices: what patients search',
          body:
            'Patients search in three ways: by specialty and area («cardiologist athens»), by symptom or condition, and by the doctor’s name after a referral. Each needs a different page. We map the searches in your specialty and area first, then decide which pages the site needs.',
          bullets: [
            'Specialty plus area searches go to the practice and Google Maps',
            'Symptom and condition searches go to clear, reviewed information pages',
            'Name searches go to a complete doctor profile, not a directory listing',
          ],
        },
        {
          eyebrow: 'Local SEO',
          title: 'Local SEO and Google Maps for doctors',
          body:
            'Most patient searches are local, so the Google Business Profile matters as much as the site. We set the correct primary category for your specialty, keep name, address, phone and hours identical everywhere, add real photos of the practice and link each location to its own page on the site.',
          bullets: [
            'Correct specialty category and services on the profile',
            'Consistent details across the profile, the site and medical directories',
            'A separate page for each practice location',
          ],
          link: { href: '/services/local-seo', label: 'Local SEO service' },
        },
        {
          eyebrow: 'E-E-A-T',
          title: 'Specialty pages and medical E-E-A-T',
          body:
            'Google holds health content to a higher standard because it can affect people’s wellbeing. Clinical pages need a named author with real credentials, a visible review date and sources a patient can check. We write with you, and every medical text is approved by the doctor before it goes live.',
          bullets: [
            'Author bio with specialty, training and medical association registration',
            'Medically reviewed date and references on clinical pages',
            'Plain language that explains, without promising outcomes',
            'MedicalClinic, Physician and FAQ structured data where it applies',
          ],
        },
        {
          eyebrow: 'Booking and privacy',
          title: 'Online booking and patient privacy (GDPR)',
          body:
            'Health information is special category data under GDPR, so the site should collect as little of it as possible. We connect the booking system you already use or add a simple appointment request, keep forms to what is needed to arrange a visit, and make sure consent, the privacy notice and cookie settings are in place.',
          bullets: [
            'Booking or request form without free-text symptom fields by default',
            'HTTPS, a clear privacy notice and cookie consent',
            'No patient data in analytics, URLs or email subject lines',
          ],
        },
        {
          eyebrow: 'Reviews and ethics',
          title: 'Reviews within medical ethics rules',
          body:
            'Reviews influence both rankings and the patient’s decision, but a practice cannot handle them like a shop. We help you ask for reviews in a way that is allowed, reply without revealing that anyone is a patient, and keep the site free of claims that medical ethics rules restrict, such as guaranteed results or comparisons with colleagues.',
          bullets: [
            'No incentives for reviews and no filtering of who is asked',
            'Replies that never disclose treatment or confirm a patient relationship',
            'No guaranteed outcomes or superlatives about treatment',
          ],
        },
      ],
      faqTitle: 'Questions doctors ask about SEO',
      faqs: [
        {
          question: 'Are doctors allowed to advertise on Google?',
          answer:
            'SEO is not paid advertising: it is the accurate, well-structured presentation of your practice so patients can find it. Paid ads are a separate matter: Google’s healthcare ad policies apply, and medical ethics rules restrict how medical services are promoted. Check with your medical association before running any campaign. On the site we avoid promises of outcomes, comparisons with colleagues and anything else those rules restrict.',
        },
        {
          question: 'How much does SEO cost for a medical practice?',
          answer:
            'Monthly SEO starts at {{ENTRY_SEO}} and a new website starts at {{ENTRY_WEBSITE}}, both excluding VAT. A single practice in one area usually needs the entry scope; several locations or specialties in a competitive city need more. The pricing page lists what each package includes.',
        },
        {
          question: 'Can I publish patient reviews on my website?',
          answer:
            'Only with care. Republishing reviews can reveal that someone is a patient, and medical ethics rules limit how testimonials are used. The safer route is to let reviews live on your Google Business Profile and to link to it, rather than copying them onto the site.',
        },
        {
          question: 'Who writes the medical content?',
          answer:
            'We draft the structure and the search-focused parts, you provide the clinical substance, and nothing medical is published until you have approved it. The page then names you as the author or reviewer, with the review date, which is what both patients and Google look for.',
        },
        {
          question: 'How long until patients find the practice through Google?',
          answer:
            'Google Business Profile fixes can show up within weeks. Specialty pages usually take a few months to rank, depending on competition in your area and the current state of the site. These are typical phases, not guarantees.',
        },
      ],
    },
    el: {
      h1: 'Ιατρικό SEO για γιατρούς και ιατρεία',
      accentWords: 3,
      lead:
        'Ο ασθενής που ψάχνει γιατρό κοντά του θέλει να δει την ειδικότητα, πού βρίσκεται το ιατρείο και πώς θα κλείσει ραντεβού. Δουλεύουμε τις σελίδες του ιατρείου σας, το Google Business Profile και τις κριτικές, με σεβασμό στο ιατρικό απόρρητο και τη δεοντολογία.',
      needsTitle: 'Τι χρειάζεται η ιστοσελίδα ενός ιατρείου',
      needsBody:
        'Ο ασθενής διαλέγει γιατρό με βάση την εμπιστοσύνη, την απόσταση και το πόσο εύκολα κλείνει ραντεβού. Η ιστοσελίδα πρέπει να απαντά και στα τρία πριν σηκώσει το τηλέφωνο.',
      checklist: {
        title: 'Λίστα ελέγχου SEO ιατρείου',
        items: [
          'Google Business Profile: κατηγορία ειδικότητας, ωράριο, φωτογραφίες',
          'Μία σελίδα για κάθε ειδικότητα και πράξη',
          'Βιογραφικό γιατρού με τίτλους και αριθμό μητρώου',
          'Ημερομηνία ιατρικού ελέγχου σε κάθε κλινική σελίδα',
          'Ραντεβού που ζητά μόνο τα απαραίτητα στοιχεία',
          'Απαντήσεις σε κριτικές που δεν επιβεβαιώνουν ότι κάποιος είναι ασθενής',
        ],
      },
      servicesTitle: 'Υπηρεσίες για γιατρούς και ιατρεία',
      ctaTitle: 'Θέλετε να σας βρίσκουν οι ασθενείς της περιοχής σας;',
      ctaBody: 'Στείλτε μας την ιστοσελίδα και την ειδικότητά σας. Θα σας δείξουμε τι αναζητούν οι ασθενείς στην περιοχή σας και τι λείπει από το site.',
      topicsEyebrow: 'Ιατρικό SEO',
      topicsTitle: 'Πώς δουλεύει το SEO για ένα ιατρείο',
      topics: [
        {
          eyebrow: 'Αναζητήσεις',
          title: 'SEO για ιατρεία: τι αναζητούν οι ασθενείς',
          body:
            'Οι ασθενείς ψάχνουν με τρεις τρόπους: με ειδικότητα και περιοχή («καρδιολόγος Αθήνα»), με σύμπτωμα ή πάθηση, και με το όνομα του γιατρού μετά από σύσταση. Κάθε τρόπος θέλει διαφορετική σελίδα. Πρώτα χαρτογραφούμε τις αναζητήσεις στην ειδικότητα και την περιοχή σας και μετά αποφασίζουμε ποιες σελίδες χρειάζεται το site.',
          bullets: [
            'Οι αναζητήσεις ειδικότητας και περιοχής οδηγούν στο ιατρείο και στο Google Maps',
            'Οι αναζητήσεις συμπτωμάτων οδηγούν σε σαφείς, ελεγμένες ενημερωτικές σελίδες',
            'Οι αναζητήσεις με το όνομά σας οδηγούν σε πλήρες προφίλ γιατρού, όχι σε κατάλογο',
          ],
        },
        {
          eyebrow: 'Τοπικό SEO',
          title: 'Τοπικό SEO και Google Maps για γιατρούς',
          body:
            'Οι περισσότερες αναζητήσεις ασθενών είναι τοπικές, οπότε το Google Business Profile μετράει όσο και η ιστοσελίδα. Ορίζουμε τη σωστή κύρια κατηγορία για την ειδικότητά σας, κρατάμε ίδια παντού επωνυμία, διεύθυνση, τηλέφωνο και ωράριο, προσθέτουμε πραγματικές φωτογραφίες του ιατρείου και συνδέουμε κάθε σημείο με τη δική του σελίδα στο site.',
          bullets: [
            'Σωστή κατηγορία ειδικότητας και υπηρεσίες στο προφίλ',
            'Ίδια στοιχεία σε προφίλ, ιστοσελίδα και ιατρικούς καταλόγους',
            'Ξεχωριστή σελίδα για κάθε ιατρείο ή σημείο εξέτασης',
          ],
          link: { href: '/services/local-seo', label: 'Υπηρεσία τοπικού SEO' },
        },
        {
          eyebrow: 'E-E-A-T',
          title: 'Σελίδες ειδικοτήτων και ιατρικό E-E-A-T',
          body:
            'Η Google κρίνει αυστηρότερα το περιεχόμενο υγείας, γιατί μπορεί να επηρεάσει την υγεία των ανθρώπων. Οι κλινικές σελίδες χρειάζονται επώνυμο συντάκτη με πραγματικούς τίτλους, εμφανή ημερομηνία ελέγχου και πηγές που μπορεί να ελέγξει ο ασθενής. Γράφουμε μαζί σας και κάθε ιατρικό κείμενο το εγκρίνει ο γιατρός πριν δημοσιευτεί.',
          bullets: [
            'Βιογραφικό με ειδικότητα, εκπαίδευση και εγγραφή στον ιατρικό σύλλογο',
            'Ημερομηνία ιατρικού ελέγχου και βιβλιογραφία στις κλινικές σελίδες',
            'Απλή γλώσσα που εξηγεί, χωρίς υποσχέσεις αποτελέσματος',
            'Structured data MedicalClinic, Physician και FAQ όπου ταιριάζουν',
          ],
        },
        {
          eyebrow: 'Ραντεβού και απόρρητο',
          title: 'Online ραντεβού και απόρρητο ασθενών (GDPR)',
          body:
            'Τα δεδομένα υγείας είναι ειδική κατηγορία δεδομένων κατά τον GDPR, οπότε η ιστοσελίδα πρέπει να συλλέγει όσο το δυνατόν λιγότερα. Συνδέουμε το σύστημα ραντεβού που ήδη χρησιμοποιείτε ή προσθέτουμε απλό αίτημα ραντεβού, κρατάμε τις φόρμες σε ό,τι χρειάζεται για να κλειστεί η επίσκεψη και φροντίζουμε για συγκατάθεση, πολιτική απορρήτου και ρυθμίσεις cookies.',
          bullets: [
            'Φόρμα ραντεβού χωρίς ελεύθερο πεδίο συμπτωμάτων εξ ορισμού',
            'HTTPS, σαφής πολιτική απορρήτου και συγκατάθεση για cookies',
            'Κανένα στοιχείο ασθενή σε analytics, διευθύνσεις URL ή θέματα email',
          ],
        },
        {
          eyebrow: 'Κριτικές και δεοντολογία',
          title: 'Κανόνες δεοντολογίας για την προβολή γιατρών',
          body:
            'Οι κριτικές επηρεάζουν και την κατάταξη και την απόφαση του ασθενούς, αλλά ένα ιατρείο δεν μπορεί να τις χειριστεί σαν κατάστημα. Σας βοηθάμε να ζητάτε κριτικές με τρόπο που επιτρέπεται, να απαντάτε χωρίς να αποκαλύπτετε ότι κάποιος είναι ασθενής σας και να μένει η ιστοσελίδα μακριά από ό,τι περιορίζει ο Κώδικας Ιατρικής Δεοντολογίας, όπως υποσχέσεις αποτελέσματος ή συγκρίσεις με συναδέλφους.',
          bullets: [
            'Καμία ανταμοιβή για κριτικές και κανένα φιλτράρισμα του ποιος ερωτάται',
            'Απαντήσεις που δεν αναφέρουν θεραπεία ούτε επιβεβαιώνουν σχέση ασθενή',
            'Καμία εγγύηση αποτελέσματος και κανένας υπερθετικός ισχυρισμός για θεραπείες',
          ],
        },
      ],
      faqTitle: 'Συχνές ερωτήσεις γιατρών για το SEO',
      faqs: [
        {
          question: 'Επιτρέπεται η διαφήμιση γιατρών στη Google;',
          answer:
            'Το SEO δεν είναι πληρωμένη διαφήμιση: είναι η σωστή και τεκμηριωμένη παρουσίαση του ιατρείου, ώστε να το βρίσκουν οι ασθενείς. Οι πληρωμένες καταχωρήσεις είναι άλλο θέμα: ισχύουν οι πολιτικές της Google για διαφημίσεις υγείας, ενώ ο Κώδικας Ιατρικής Δεοντολογίας περιορίζει τον τρόπο προβολής ιατρικών υπηρεσιών. Πριν από οποιαδήποτε καμπάνια, ελέγξτε με τον ιατρικό σύλλογό σας. Στην ιστοσελίδα αποφεύγουμε υποσχέσεις αποτελέσματος, συγκρίσεις με συναδέλφους και ό,τι άλλο περιορίζουν οι κανόνες.',
        },
        {
          question: 'Πόσο κοστίζει το SEO για ένα ιατρείο;',
          answer:
            'Το μηνιαίο SEO ξεκινά από {{ENTRY_SEO}} και η κατασκευή ιστοσελίδας από {{ENTRY_WEBSITE}}, προ ΦΠΑ. Ένα ιατρείο σε μία περιοχή συνήθως χρειάζεται το βασικό εύρος εργασιών. Περισσότερα σημεία ή ειδικότητες σε ανταγωνιστική πόλη χρειάζονται περισσότερα. Στη σελίδα τιμών θα δείτε τι περιλαμβάνει κάθε πακέτο.',
        },
        {
          question: 'Μπορώ να δημοσιεύσω κριτικές ασθενών στην ιστοσελίδα μου;',
          answer:
            'Μόνο με προσοχή. Η αναδημοσίευση μιας κριτικής μπορεί να αποκαλύψει ότι κάποιος είναι ασθενής σας, και οι κανόνες δεοντολογίας περιορίζουν τη χρήση μαρτυριών. Ο ασφαλέστερος δρόμος είναι οι κριτικές να μένουν στο Google Business Profile και η ιστοσελίδα να παραπέμπει εκεί, αντί να τις αντιγράφει.',
        },
        {
          question: 'Ποιος γράφει το ιατρικό περιεχόμενο;',
          answer:
            'Εμείς στήνουμε τη δομή και το κομμάτι που αφορά την αναζήτηση, εσείς δίνετε την κλινική ουσία, και τίποτα ιατρικό δεν δημοσιεύεται πριν το εγκρίνετε. Η σελίδα αναφέρει εσάς ως συντάκτη ή ελεγκτή, με ημερομηνία ελέγχου, που είναι αυτό που αναζητούν και οι ασθενείς και η Google.',
        },
        {
          question: 'Σε πόσο καιρό θα με βρίσκουν ασθενείς από τη Google;',
          answer:
            'Οι διορθώσεις στο Google Business Profile μπορεί να φανούν μέσα σε λίγες εβδομάδες. Οι σελίδες ειδικοτήτων συνήθως χρειάζονται μερικούς μήνες για να κατατάσσονται, ανάλογα με τον ανταγωνισμό στην περιοχή σας και την κατάσταση της ιστοσελίδας. Πρόκειται για ενδεικτικές φάσεις, όχι για εγγυήσεις.',
        },
      ],
    },
  },
};

export function getIndustryPageCopy(slug: string, locale: SiteLocale): IndustryPageCopy | undefined {
  return COPY[slug]?.[locale];
}
