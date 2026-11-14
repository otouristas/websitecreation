/**
 * Differentiating copy for the industry × service pages that survive the
 * indexability review.
 *
 * The template previously produced ~227 words per page from the same six
 * headings with the industry noun swapped in, which is the definition of a page
 * that does not deserve independent search existence. Padding it to 1,200 words
 * of the same substance would not fix that.
 *
 * So this file composes on two real axes instead:
 *
 *  - the **service** axis: how this service is actually delivered when the
 *    client is a sector rather than a single site. Authored once per service,
 *    grounded in the deliverables already published in `services-i18n.ts` and
 *    `services.ts`.
 *  - the **industry** axis: what shapes demand in that sector, taken from the
 *    authored `painPoints` in `industries.ts` / `industries-i18n.ts` and the
 *    demand rationale in `industry-service-relevance.ts`.
 *
 * Nothing here asserts a statistic, a benchmark, a regulation, a client, a
 * result or a price. Every claim is either a description of our own process or
 * a statement about how search behaves that holds without citation.
 */

import type { SiteLocale } from '@/lib/i18n/locale';

export interface ServiceAngle {
  /** How this service changes when it is bought for a whole sector. */
  readonly approach: string;
  /** What the first weeks concretely involve. */
  readonly process: string;
  /** What the client is left holding. */
  readonly outcome: string;
}

/** EN service angles. Keyed by service slug. */
const EN: Record<string, ServiceAngle> = {
  'website-creation': {
    approach:
      'We start with the questions a customer has before contacting you. Those decide which services need their own page and how customers get from that page to a booking or enquiry.',
    process:
      'We map the enquiry path first - which page someone lands on, what they need answered before they will contact you, and what removes the last hesitation - then build the page structure around that path rather than around an org chart.',
    outcome:
      'A site with a page for each genuine buying intent, technically sound from launch, and structured so new service or location pages can be added without rebuilding.',
  },
  'website-redesign': {
    approach:
      'A redesign can affect pages that already bring work. We identify them early and plan where each old address should lead when the new site goes live.',
    process:
      'We inventory what currently earns traffic and conversions before anything is designed, map old URLs to new ones, then rebuild the templates that matter most first.',
    outcome:
      'A new site with each old address directed to its replacement wherever an equivalent page exists. You can monitor how those pages perform after launch.',
  },
  'web-design': {
    approach:
      'We work out how customers choose between your services and locations. That gives the designer a clear menu to build and helps people find the right page on a phone.',
    process:
      'Technical review runs against the design itself - URL structure, internal linking, schema for the entities that matter in this sector - rather than after handover.',
    outcome:
      'A site structure, page titles and internal links your team can use as you add services.',
  },
  'content-creation': {
    approach:
      'We start with questions people ask before deciding to buy. Your team often knows the wording already from calls and emails, and we check it against real searches.',
    process:
      'We start from the questions your team already answers on the phone, check which ones have real search demand, and write the pages that are missing.',
    outcome:
      'Service pages that explain what you actually do, plus supporting content that reaches buyers earlier in the decision.',
  },
  'local-seo': {
    approach:
      'Customers can find you in Google Maps or through a local service page. We check whether both give the same contact details and explain which neighbourhoods you cover.',
    process:
      'Google Business Profile is brought up to standard first - categories, services, photos, questions - alongside consistent citations and NAP, because contradictions there cost trust before any content work can pay off.',
    outcome:
      'Accurate listings, clear directions for customers and a way to ask everyone who used the service for a review.',
  },
  'seo-audits': {
    approach:
      'When a fault repeats across many pages, one change to the template can fix the source. We find those patterns and give your developers a practical order for the work.',
    process:
      'We check crawlability and indexation first, then canonical and duplicate handling, then on-page and content overlap, then Core Web Vitals - in that order, because a fast page that is excluded from the index is worth nothing.',
    outcome:
      'A prioritised plan that says what to fix first and why, with monthly reporting against it, instead of a export of every warning a crawler produced.',
  },
  'ai-visibility': {
    approach:
      'We check how AI services describe what you do. When details are missing or inconsistent, we work on the facts and answers customers can verify on your own site.',
    process:
      'We work on entity clarity and schema so the business is unambiguous to a model, and restructure key pages so they answer questions directly enough to be used.',
    outcome:
      'A record of which answers mentioned you, which cited a page and what information needs correcting. Referral visits are measured separately.',
  },
  'eshop-woocommerce': {
    approach:
      'An online shop has to fit the way you take payment, deliver orders and track stock. We plan those decisions alongside the catalogue so a shopper can complete a purchase.',
    process:
      'WooCommerce is configured around how you actually sell and ship, with product pages built to answer the questions that otherwise stop the purchase.',
    outcome:
      'A catalogue organised around what shoppers look for, with delivery options and order costs visible at checkout.',
  },
  'eshop-seo': {
    approach:
      'A shopper might search for a product code or a whole category. We check which page Google shows and whether its filters, product details and stock information help the shopper choose.',
    process:
      'Technical work comes first to stop the duplication, then category and product optimisation with product schema so price and availability can show in results.',
    outcome:
      'A prioritised set of category and product improvements with baseline search data for the affected pages.',
  },
  'speed-optimization': {
    approach:
      'A fast homepage says little about a slow product page or booking form. We measure the pages people actually use on a phone before deciding what to change.',
    process:
      'We profile the real templates to find what is actually holding the load - images, third-party scripts, render-blocking resources - and fix in that order.',
    outcome:
      'Before-and-after checks on the pages customers use, with real-user Core Web Vitals where enough data is available.',
  },
  'link-building': {
    approach:
      'We look for publications and websites with a reason to cover your work. A relevant reference can introduce your business to readers who may need the service.',
    process:
      'We look for genuine reasons to be covered - expertise, data you already hold, relationships you already have - and pursue those rather than buying placements.',
    outcome:
      'A record of the publications approached and any coverage and links they choose to publish.',
  },
  'logo-design': {
    approach:
      'Your logo has to work on a phone screen as well as a printed sign. We prepare the versions and files your team needs for each use.',
    process:
      'Design is delivered with the essentials that make it usable - colour palette, typography, usage guide - so the next supplier does not have to guess.',
    outcome:
      'A complete identity kit in the formats digital and print work both require.',
  },
};

/** EL service angles. Authored, not translated mechanically. */
const EL: Record<string, ServiceAngle> = {
  'website-creation': {
    approach:
      'Πριν σχεδιάσουμε την ιστοσελίδα, εντοπίζουμε τι ρωτά ο πελάτης πριν σας καλέσει. Έτσι ξεχωρίζουμε ποιες υπηρεσίες χρειάζονται δική τους σελίδα και πώς θα προχωρά ο επισκέπτης σε κράτηση ή αίτημα.',
    process:
      'Σχεδιάζουμε τη διαδρομή από την πρώτη επίσκεψη μέχρι το αίτημα. Δοκιμάζουμε στο κινητό αν ο πελάτης βρίσκει την υπηρεσία, το τηλέφωνο ή τη φόρμα που χρειάζεται.',
    outcome:
      'Παραλαμβάνετε ιστοσελίδα με τις συμφωνημένες σελίδες και τη μέτρηση που χρειάζεστε για να δείτε ποιες φέρνουν επικοινωνίες.',
  },
  'website-redesign': {
    approach:
      'Πριν αλλάξουμε την εμφάνιση, βρίσκουμε τις σελίδες που ήδη φέρνουν αιτήματα. Για καθεμία ετοιμάζουμε την αντίστοιχη νέα διεύθυνση, ώστε να συνεχίζουν να λειτουργούν οι σύνδεσμοί της.',
    process:
      'Ελέγχουμε ποιες σελίδες φέρνουν σήμερα επισκέψεις ή αιτήματα. Για όσες αλλάξουν διεύθυνση, βρίσκουμε την αντίστοιχη νέα σελίδα και δοκιμάζουμε την ανακατεύθυνση.',
    outcome:
      'Έχετε αντιστοίχιση παλιών και νέων διευθύνσεων και μπορείτε να συγκρίνετε τα στοιχεία της αναζήτησης πριν και μετά τη μετάβαση.',
  },
  'web-design': {
    approach:
      'Εξετάζουμε πώς επιλέγουν οι πελάτες ανάμεσα στις υπηρεσίες σας και ποια περιοχή τους ενδιαφέρει. Με βάση αυτές τις επιλογές οργανώνουμε το μενού, ώστε να λειτουργεί καλά και στο κινητό.',
    process:
      'Σχεδιάζουμε το μενού με τα ονόματα που χρησιμοποιούν οι πελάτες σας. Ελέγχουμε αν από κάθε σελίδα υπηρεσίας βρίσκουν εύκολα το επόμενο βήμα.',
    outcome:
      'Έχετε σαφή δομή σελίδων, τίτλους και εσωτερικούς συνδέσμους που μπορείτε να διατηρήσετε καθώς προσθέτετε υπηρεσίες.',
  },
  'content-creation': {
    approach:
      'Ποιες ερωτήσεις επανέρχονται στο τηλέφωνο πριν ζητήσει ο πελάτης προσφορά; Χρησιμοποιούμε τη γλώσσα των πελατών σας και ελέγχουμε στο Search Console αν ψάχνουν τα ίδια πράγματα.',
    process:
      'Συγκρίνουμε όσα ρωτούν οι πελάτες σας στο τηλέφωνο με τις αναζητήσεις που βλέπετε στο Search Console. Εκεί που λείπει απάντηση, γράφουμε ή αναθεωρούμε τη σχετική σελίδα.',
    outcome:
      'Έχετε κείμενα που εξηγούν σε ποιον απευθύνεται κάθε υπηρεσία, τι περιλαμβάνει και πώς μπορεί κάποιος να προχωρήσει.',
  },
  'local-seo': {
    approach:
      'Ο πελάτης μπορεί να σας βρει από τον χάρτη ή από μια τοπική σελίδα. Ελέγχουμε αν βρίσκει τα ίδια στοιχεία επικοινωνίας και αν καταλαβαίνει ποιες περιοχές εξυπηρετείτε.',
    process:
      'Ελέγχουμε κατηγορία, ωράριο, τηλέφωνο και περιοχή εξυπηρέτησης στο Google Business Profile. Τα συγκρίνουμε με την ιστοσελίδα σας όπως θα έκανε κάποιος που ετοιμάζεται να έρθει.',
    outcome:
      'Ο πελάτης βλέπει πού και πότε σας βρίσκει. Εσείς έχετε συγκεντρωμένες τις διορθώσεις και έναν απλό τρόπο να ζητάτε κριτική από τους πελάτες σας.',
  },
  'seo-audits': {
    approach:
      'Αν το ίδιο πρόβλημα επαναλαμβάνεται σε πολλές σελίδες, μια διόρθωση στο κοινό τους πρότυπο μπορεί να το λύσει συνολικά. Βρίσκουμε αυτά τα μοτίβα και δίνουμε προτεραιότητες για την υλοποίηση.',
    process:
      'Ελέγχουμε πρώτα αν η Google μπορεί να επισκεφθεί και να καταχωρίσει τις σημαντικές σελίδες σας. Εξετάζουμε ενδεικτικές διευθύνσεις για διπλότυπα, λάθος συνδέσμους ή προβλήματα σε κινητό.',
    outcome:
      'Παραλαμβάνετε λίστα με τη σειρά των διορθώσεων, συγκεκριμένες σελίδες όπου φαίνεται το πρόβλημα και τρόπο να ελέγξετε αν λύθηκε.',
  },
  'ai-visibility': {
    approach:
      'Ελέγχουμε πώς περιγράφουν οι υπηρεσίες AI την επιχείρησή σας. Όταν λείπουν στοιχεία ή υπάρχουν ασυμφωνίες, ξεκαθαρίζουμε τις πληροφορίες που μπορεί να επιβεβαιώσει ο πελάτης στην ιστοσελίδα σας.',
    process:
      'Δοκιμάζουμε ερωτήσεις πελατών, καταγράφουμε την απάντηση και ανοίγουμε τις πηγές που παραθέτει. Αν υπάρχει ανακρίβεια, ελέγχουμε πρώτα τι πληροφορίες δίνετε στη δική σας ιστοσελίδα.',
    outcome:
      'Βλέπετε πότε έγινε η δοκιμή, τι απάντησε κάθε υπηρεσία AI και αν έδωσε σύνδεσμο προς εσάς. Τα καταγεγραμμένα κλικ εξετάζονται χωριστά.',
  },
  'eshop-woocommerce': {
    approach:
      'Πώς θα πληρώνει ο πελάτης και με ποιον τρόπο θα παραλαμβάνει; Σχεδιάζουμε αυτές τις επιλογές μαζί με τον κατάλογο και το απόθεμα, ώστε ο αγοραστής να μπορεί να ολοκληρώσει την παραγγελία.',
    process:
      'Δοκιμάζουμε μια παραγγελία με τα δικά σας μεταφορικά, τρόπους πληρωμής και επιλογές παραλαβής. Ελέγχουμε τι βλέπει ο πελάτης όταν αλλάζει μέγεθος ή εξαντλείται ένα προϊόν.',
    outcome:
      'Έχετε κατάλογο ανά κατηγορία και ταμείο που εξηγεί στον πελάτη πόσο θα πληρώσει και πώς θα παραλάβει.',
  },
  'eshop-seo': {
    approach:
      'Άλλος ψάχνει έναν συγκεκριμένο κωδικό και άλλος θέλει να συγκρίνει μια κατηγορία. Ελέγχουμε ποια σελίδα εμφανίζεται και αν τα φίλτρα, οι περιγραφές και η διαθεσιμότητα βοηθούν την επιλογή.',
    process:
      'Ελέγχουμε αν τα φίλτρα δημιουργούν περιττές διευθύνσεις και αν τα στοιχεία προϊόντος συμφωνούν με την τιμή και τη διαθεσιμότητα που βλέπει ο αγοραστής.',
    outcome:
      'Γνωρίζετε ποιες κατηγορίες και ποια προϊόντα χρειάζονται διορθώσεις και πώς θα παρακολουθήσετε τις επισκέψεις τους από την αναζήτηση.',
  },
  'speed-optimization': {
    approach:
      'Μια γρήγορη αρχική σελίδα δεν αρκεί αν αργεί η φόρμα κράτησης ή η σελίδα προϊόντος. Μετράμε τις σελίδες που χρησιμοποιεί ο πελάτης στο κινητό πριν προτείνουμε αλλαγές.',
    process:
      'Δοκιμάζουμε τις βασικές σελίδες σε κινητό. Ελέγχουμε αν η καθυστέρηση οφείλεται σε φωτογραφίες, γραμματοσειρές ή εξωτερικές υπηρεσίες πριν επέμβουμε.',
    outcome:
      'Συγκρίνετε τις ίδιες σελίδες πριν και μετά τις αλλαγές. Όπου υπάρχουν αρκετά δεδομένα χρήσης, εξετάζουμε και τα Core Web Vitals πραγματικών επισκεπτών.',
  },
  'link-building': {
    approach:
      'Βρίσκουμε μέσα και ιστοσελίδες που έχουν λόγο να γράψουν για τη δουλειά σας και κοινό που ενδιαφέρεται γι’ αυτή. Τους προτείνουμε συγκεκριμένο περιεχόμενο για δημοσίευση.',
    process:
      'Αναζητούμε συγκεκριμένη αφορμή για δημοσίευση, όπως πρωτότυπα στοιχεία σας ή μια ειδικότητα για την οποία μπορεί να σας ρωτήσει ένας συντάκτης. Η τελική επιλογή ανήκει στο μέσο.',
    outcome:
      'Βλέπετε ποια μέσα προσεγγίσαμε και πού δημοσιεύτηκε αναφορά ή σύνδεσμος προς την επιχείρησή σας.',
  },
  'logo-design': {
    approach:
      'Το λογότυπο πρέπει να διαβάζεται στην οθόνη ενός κινητού και στην επιγραφή σας. Ετοιμάζουμε τις εκδοχές και τα αρχεία που χρειάζεστε για κάθε χρήση.',
    process:
      'Συμφωνούμε πού θα χρησιμοποιείτε το λογότυπο και ελέγχουμε αν διαβάζεται σε μικρή οθόνη, σε έντυπο και στα χρώματα της επιχείρησής σας.',
    outcome:
      'Παίρνετε αρχεία για οθόνη και εκτύπωση, μαζί με τα χρώματα, τις γραμματοσειρές και οδηγίες για τον επόμενο συνεργάτη σας.',
  },
};

const websiteAngles: Record<string, Record<SiteLocale, ServiceAngle>> = {
  hotels: {
    el: {
      approach: 'Πριν κλείσει, μια οικογένεια θέλει να ξέρει αν χωράει στο δωμάτιο, τι περιλαμβάνει η τιμή και τι ισχύει αν ακυρώσει. Οργανώνουμε τις σελίδες των δωματίων γύρω από αυτές τις αποφάσεις.',
      process: 'Δοκιμάζουμε μια κράτηση στο κινητό, από την επιλογή δωματίου μέχρι τη μηχανή κρατήσεων. Ελέγχουμε αν ο επισκέπτης βρίσκει διαθέσιμες ημερομηνίες και αν διατηρείται η γλώσσα του στη διαδρομή.',
      outcome: 'Παραλαμβάνετε σελίδες με τη χωρητικότητα και τις παροχές κάθε δωματίου, τους δικούς σας όρους και σαφή πρόσβαση στη διαθεσιμότητα. Μετράμε ολοκληρωμένες κρατήσεις όταν η μηχανή σας παρέχει επιβεβαίωση.',
    },
    en: {
      approach: 'Before booking, a family needs to know who fits in the room, what the rate covers and when they can cancel. Those questions shape each room page.',
      process: 'We try booking on a phone, from choosing a room to opening your booking engine. We check that guests can find dates and continue in their chosen language.',
      outcome: 'Guests get room details, your booking terms and a clear way to check availability. We measure completed bookings when your booking engine supplies confirmation.',
    },
  },
  'real-estate': {
    el: {
      approach: 'Άλλες πληροφορίες χρειάζεται ο αγοραστής που ψάχνει διαμέρισμα και άλλες ο ιδιοκτήτης που θέλει να σας αναθέσει το ακίνητό του. Σχεδιάζουμε ξεχωριστή διαδρομή για τον καθένα.',
      process: 'Δοκιμάζουμε μια αναζήτηση με περιοχή, προϋπολογισμό και τύπο ακινήτου. Στην αγγελία ελέγχουμε αν φαίνονται τα τετραγωνικά, ο όροφος και πώς κλείνει κάποιος επίσκεψη για το συγκεκριμένο ακίνητο.',
      outcome: 'Κάθε αίτημα επίσκεψης συνδέεται με την αγγελία που είδε ο ενδιαφερόμενος. Ο ιδιοκτήτης βρίσκει χωριστή φόρμα για να συζητήσει ανάθεση με το γραφείο σας.',
    },
    en: {
      approach: 'A buyer looking for a flat needs a different page from an owner ready to list a property. We give each a clear route to your agency.',
      process: 'We try a search by location, budget and property type, then check whether someone can find the floor area, see the particulars and ask to view that specific listing.',
      outcome: 'Viewing enquiries identify the listing the buyer saw. Owners can contact your team separately about listing their own property.',
    },
  },
};

export function getServiceAngle(serviceSlug: string, locale: SiteLocale, industrySlug?: string): ServiceAngle | undefined {
  if (serviceSlug === 'website-creation' && industrySlug && websiteAngles[industrySlug]) {
    return websiteAngles[industrySlug][locale];
  }
  return (locale === 'el' ? EL : EN)[serviceSlug];
}

/** Section headings for the composed block. */
export const ANGLE_HEADINGS = {
  en: { approach: 'How this works for your sector', process: 'What the first weeks look like', outcome: 'What you end up with' },
  el: { approach: 'Πώς προσεγγίζουμε τη δουλειά', process: 'Τι γίνεται τις πρώτες εβδομάδες', outcome: 'Τι παραλαμβάνετε' },
} as const;

export interface AngleFaq {
  readonly question: string;
  readonly answer: string;
}

/**
 * Service-level FAQs for industry × service pages.
 *
 * These answer the questions that actually precede this purchase. They are
 * authored per service rather than per industry pairing, because the honest
 * differentiator on the industry axis is the pain points and demand shape
 * already rendered above them. Inventing 31 variants of each answer would be
 * padding, which is the thing this whole exercise is meant to remove.
 *
 * No prices: `/ypiresies/times` owns those and follows the live offer window.
 */
const EN_FAQS: Record<string, readonly AngleFaq[]> = {
  'website-creation': [
    { question: 'How long does a build take?', answer: 'Most projects run two to eight weeks once content and approvals are ready. The variable is almost never development. It is how quickly copy, photography and sign-off arrive.' },
    { question: 'Do I need a separate SEO project afterwards?', answer: 'No. Technical foundations, URL structure and analytics are part of the build. A separate optimisation project after launch usually means they were skipped.' },
    { question: 'Can the site grow into more pages later?', answer: 'Yes, that is the point of settling the architecture first. New service or location pages slot into the existing structure without a rebuild.' },
  ],
  'website-redesign': [
    { question: 'Will a redesign lose my rankings?', answer: 'It can, and that is the main risk to manage. We inventory which URLs currently earn traffic before design starts and map them one-to-one to new equivalents, so the redirects preserve what is already working.' },
    { question: 'Can you redesign in stages?', answer: 'Yes. Rebuilding the highest-value templates first limits the blast radius and lets you verify each stage before the next.' },
    { question: 'What happens to my old URLs?', answer: 'Where an equivalent page exists, the old URL redirects to it permanently. Where none does, we decide deliberately whether to recreate the page or let it go.' },
  ],
  'web-design': [
    { question: 'How is this different from a normal website project?', answer: 'The architecture and technical review happen during design rather than after handover, so the structure that decides what can rank is settled before any copy is written.' },
    { question: 'Do you work with an existing design?', answer: 'Yes, provided the structure can carry it. If the page hierarchy is the problem, changing the visuals alone will not fix the rankings.' },
    { question: 'Is schema markup included?', answer: 'Yes, for the entities that matter on the site: the organisation, its services, and page-level markup such as breadcrumbs and FAQs where they reflect visible content.' },
  ],
  'content-creation': [
    { question: 'Who writes the content?', answer: 'We do, starting from the questions your team already answers day to day, then checking which of them have real search demand before anything is commissioned.' },
    { question: 'How much content do we actually need?', answer: 'Fewer pages than most plans assume. One page per genuine intent. Any more than that and your own pages start competing with each other.' },
    { question: 'Will it sound like our business?', answer: 'That depends on access. The pages that read as authentic are the ones informed by how your team actually explains the work, which is why the process starts there.' },
  ],
  'local-seo': [
    { question: 'How long before local rankings move?', answer: 'Profile and citation work can show up within weeks because the signals are direct. Competitive organic terms take longer, and anyone promising a date is guessing.' },
    { question: 'Do I need a physical address?', answer: 'For the map pack, yes. Google requires a real presence in the area served. Service-area businesses can rank without a storefront but still need a verifiable base.' },
    { question: 'Do reviews really matter?', answer: 'Google lists review count and positive ratings among the factors that can help local ranking. We help you ask all genuine customers for their feedback and answer the issues they raise.' },
  ],
  'seo-audits': [
    { question: 'What do I actually receive?', answer: 'A prioritised plan: what to fix first, why it ranks above the rest, and how you will know it worked. Not an export of every warning a crawler produced.' },
    { question: 'Can you implement the fixes too?', answer: 'Yes. The audit is scoped separately from implementation so you are free to hand the plan to your own developers instead.' },
    { question: 'How often should we re-audit?', answer: 'A site under active development benefits from a check each release, since most technical regressions arrive with a deploy. A stable site needs it after migrations and redesigns.' },
  ],
  'ai-visibility': [
    { question: 'Is this different from normal SEO?', answer: 'The same search fundamentals apply to Google’s AI features. We also test questions from your customers and record the sources and details in the answers they see.' },
    { question: 'Can you guarantee mentions in AI answers?', answer: 'No, and neither can anyone else, because these systems are not deterministic. What can be done is remove the reasons you are not citable, and track mentions so the effect is visible.' },
    { question: 'Does this replace traditional rankings?', answer: 'No. Both matter, and the technical groundwork largely serves both.' },
  ],
  'eshop-woocommerce': [
    { question: 'Why WooCommerce rather than a hosted platform?', answer: 'Control over URL structure, templates and integrations, which is what makes category-level SEO possible. Hosted platforms trade some of that for convenience.' },
    { question: 'Can you migrate an existing store?', answer: 'Yes. We map old product and category URLs before the move, test their redirects and check the new pages after launch.' },
    { question: 'What about payments and shipping?', answer: 'Configured around how you actually sell and ship, including checkout flow and stock handling, rather than left on defaults.' },
  ],
  'eshop-seo': [
    { question: 'Why are my category pages not ranking?', answer: 'Usually duplication from filters and parameters, categories competing with each other, or thin category copy. The technical layer comes first because optimisation on top of duplication does not hold.' },
    { question: 'What happens to out-of-stock products?', answer: 'They need a deliberate policy (keep, redirect or remove), because letting them silently 404 wastes the links and rankings they accumulated.' },
    { question: 'Is conversion work included?', answer: 'It is treated as part of the same job. Traffic to a page that does not convert is a cost, not a result.' },
  ],
  'speed-optimization': [
    { question: 'Which pages do you optimise?', answer: 'The templates that carry revenue, not the homepage. The homepage is usually the fastest page on any site and the least representative.' },
    { question: 'Will this improve my rankings?', answer: 'Speed is one signal among many, and the honest answer is that its effect on conversion is usually larger and more immediate than its effect on position.' },
    { question: 'How do you prove the improvement?', answer: 'The same templates are measured before and after, so the change is documented rather than asserted.' },
  ],
  'link-building': [
    { question: 'How many links will I get?', answer: 'Volume is the wrong unit. A handful of relevant, genuinely earned mentions outperforms a large number of placements nobody reads, and we scope on relevance rather than count.' },
    { question: 'Do you buy links?', answer: 'We do not buy links to influence rankings. A paid advertisement should be identified with a sponsored or nofollow link attribute under Google’s guidelines.' },
    { question: 'What if I already have spam links?', answer: 'The profile is reviewed as part of the work. Most unsolicited spam is ignored by search engines and needs no action; disavowal is a last resort, not a routine step.' },
  ],
  'logo-design': [
    { question: 'What do I receive?', answer: 'The mark in the formats digital and print both need, plus the essentials that make it usable: colour palette, typography and a usage guide.' },
    { question: 'Do you redraw an existing logo?', answer: 'Yes, where the mark is sound but the files are not. Recovering a usable vector from a low-resolution image is a common starting point.' },
    { question: 'Can this be done alongside a website build?', answer: 'Yes, and it is usually cheaper that way since the identity decisions feed straight into the design.' },
  ],
};

const EL_FAQS: Record<string, readonly AngleFaq[]> = {
  'website-creation': [
    { question: 'Πόσο διαρκεί η κατασκευή;', answer: 'Τα περισσότερα έργα ολοκληρώνονται σε δύο έως οκτώ εβδομάδες μόλις είναι έτοιμο το υλικό. Η μεταβλητή σχεδόν ποτέ δεν είναι η ανάπτυξη, αλλά το πόσο γρήγορα έρχονται κείμενα, φωτογραφίες και εγκρίσεις.' },
    { question: 'Θα χρειαστεί ξεχωριστό έργο SEO μετά;', answer: 'Η κατασκευή καλύπτει την τεχνική βάση, τις διευθύνσεις των σελίδων και τη μέτρηση. Αν χρειάζεστε τακτικά νέο περιεχόμενο, έλεγχο ανταγωνισμού ή δουλειά μετά από μια αλλαγή, συζητάμε χωριστά το εύρος.' },
    { question: 'Μπορεί το site να επεκταθεί αργότερα;', answer: 'Ναι, γι᾽ αυτό αποφασίζεται πρώτα η αρχιτεκτονική. Νέες σελίδες υπηρεσιών ή περιοχών προστίθενται χωρίς ξαναχτίσιμο.' },
  ],
  'website-redesign': [
    { question: 'Θα χάσω θέσεις με τον ανασχεδιασμό;', answer: 'Υπάρχει τέτοιος κίνδυνος και αυτός είναι που διαχειριζόμαστε. Καταγράφουμε ποιες URL αποδίδουν πριν ξεκινήσει ο σχεδιασμός και τις αντιστοιχίζουμε 1:1, ώστε οι ανακατευθύνσεις να κρατήσουν ό,τι ήδη δουλεύει.' },
    { question: 'Μπορεί να γίνει σταδιακά;', answer: 'Ναι. Ξεκινώντας από τα πρότυπα με τη μεγαλύτερη αξία, κάθε στάδιο επαληθεύεται πριν προχωρήσει το επόμενο.' },
    { question: 'Τι γίνεται με τις παλιές διευθύνσεις;', answer: 'Όπου υπάρχει αντίστοιχη σελίδα, η παλιά URL ανακατευθύνεται μόνιμα σε αυτήν. Όπου δεν υπάρχει, αποφασίζουμε συνειδητά αν θα αναδημιουργηθεί.' },
  ],
  'web-design': [
    { question: 'Σε τι διαφέρει από ένα κανονικό έργο ιστοσελίδας;', answer: 'Η αρχιτεκτονική και ο τεχνικός έλεγχος γίνονται κατά τον σχεδιασμό και όχι μετά την παράδοση, ώστε η δομή που καθορίζει τι μπορεί να καταταγεί να έχει κλειδώσει πριν γραφτεί το πρώτο κείμενο.' },
    { question: 'Δουλεύετε πάνω σε υπάρχον σχέδιο;', answer: 'Ναι, εφόσον η δομή το αντέχει. Αν το πρόβλημα είναι η ιεραρχία των σελίδων, η αλλαγή μόνο της εμφάνισης δεν θα το λύσει.' },
    { question: 'Περιλαμβάνεται schema markup;', answer: 'Ναι, για τις οντότητες που έχουν σημασία: την επιχείρηση, τις υπηρεσίες της και σήμανση σε επίπεδο σελίδας όπου αντιστοιχεί σε ορατό περιεχόμενο.' },
  ],
  'content-creation': [
    { question: 'Ποιος γράφει το περιεχόμενο;', answer: 'Εμείς, ξεκινώντας από τις ερωτήσεις που ήδη απαντά καθημερινά η ομάδα σας και ελέγχοντας ποιες έχουν πραγματική ζήτηση πριν ανατεθεί οτιδήποτε.' },
    { question: 'Πόσο περιεχόμενο χρειαζόμαστε πραγματικά;', answer: 'Λιγότερες σελίδες απ᾽ όσες υποθέτουν τα περισσότερα πλάνα. Μία σελίδα ανά πρόθεση - παραπάνω και οι σελίδες σας αρχίζουν να ανταγωνίζονται μεταξύ τους.' },
    { question: 'Θα ακούγεται σαν την επιχείρησή μας;', answer: 'Εξαρτάται από την πρόσβαση. Οι σελίδες που διαβάζονται ως αυθεντικές είναι εκείνες που πατάνε στο πώς εξηγεί τη δουλειά η ίδια η ομάδα σας.' },
  ],
  'local-seo': [
    { question: 'Πόσο γρήγορα κινούνται οι τοπικές θέσεις;', answer: 'Η ίδια αναζήτηση μπορεί να δώσει διαφορετικά αποτελέσματα λίγους δρόμους πιο πέρα. Καταγράφουμε πού έγινε ο έλεγχος και παρακολουθούμε κλήσεις ή οδηγίες πρόσβασης όπου υπάρχουν διαθέσιμα στοιχεία.' },
    { question: 'Χρειάζομαι φυσική διεύθυνση;', answer: 'Για τον χάρτη, ναι - η Google απαιτεί πραγματική παρουσία στην περιοχή. Οι επιχειρήσεις περιοχής εξυπηρέτησης μπορούν να εμφανίζονται χωρίς κατάστημα, αλλά χρειάζονται επαληθεύσιμη έδρα.' },
    { question: 'Μετράνε πραγματικά οι κριτικές;', answer: 'Η Google αναφέρει ότι το πλήθος των κριτικών και οι θετικές βαθμολογίες μπορούν να βοηθήσουν την τοπική κατάταξη. Ζητάμε από όλους τους πραγματικούς πελάτες να πουν τη γνώμη τους, χωρίς δώρο ή έκπτωση.' },
  ],
  'seo-audits': [
    { question: 'Τι ακριβώς παραλαμβάνω;', answer: 'Ιεραρχημένο πλάνο: τι διορθώνεται πρώτα, γιατί προηγείται και πώς θα ξέρετε ότι έπιασε. Όχι εξαγωγή όλων των προειδοποιήσεων ενός εργαλείου.' },
    { question: 'Αναλαμβάνετε και την υλοποίηση;', answer: 'Ναι. Ο έλεγχος τιμολογείται ξεχωριστά από την υλοποίηση, ώστε να μπορείτε να δώσετε το πλάνο στους δικούς σας προγραμματιστές.' },
    { question: 'Κάθε πότε χρειάζεται νέος έλεγχος;', answer: 'Ένα site σε ενεργή ανάπτυξη κερδίζει από έλεγχο σε κάθε release, γιατί οι περισσότερες τεχνικές παλινδρομήσεις έρχονται με τα deploy. Ένα σταθερό site τον χρειάζεται μετά από μεταφορές και ανασχεδιασμούς.' },
  ],
  'ai-visibility': [
    { question: 'Διαφέρει από το κανονικό SEO;', answer: 'Το SEO καλύπτει και την τεχνική βάση που χρειάζεται η αναζήτηση AI της Google. Με το AEO και το GEO εξετάζουμε επίσης συγκεκριμένες ερωτήσεις πελατών, ποιες πηγές παραθέτουν οι απαντήσεις και αν περιγράφουν σωστά τη δουλειά σας.' },
    { question: 'Εγγυάστε αναφορές σε απαντήσεις AI;', answer: 'Όχι. Οι απαντήσεις αλλάζουν και κάθε υπηρεσία AI επιλέγει τις δικές της πηγές. Μπορούμε να βελτιώσουμε την ακρίβεια των στοιχείων στις σελίδες σας και να παρακολουθούμε τις αναφορές.' },
    { question: 'Αντικαθιστά τις παραδοσιακές θέσεις;', answer: 'Όχι. Και τα δύο μετράνε, και η τεχνική βάση εξυπηρετεί σε μεγάλο βαθμό και τα δύο.' },
  ],
  'eshop-woocommerce': [
    { question: 'Γιατί WooCommerce και όχι έτοιμη πλατφόρμα;', answer: 'Έλεγχος στη δομή των URL, στα πρότυπα και στις ενσωματώσεις - αυτό είναι που κάνει εφικτό το SEO σε επίπεδο κατηγορίας. Οι έτοιμες πλατφόρμες ανταλλάσσουν μέρος αυτού με ευκολία.' },
    { question: 'Μπορείτε να μεταφέρετε υπάρχον κατάστημα;', answer: 'Ναι. Πριν από τη μεταφορά αντιστοιχίζουμε τις παλιές διευθύνσεις προϊόντων και κατηγοριών στις νέες, ώστε οι σύνδεσμοι να οδηγούν στη σωστή σελίδα.' },
    { question: 'Τι γίνεται με πληρωμές και μεταφορικά;', answer: 'Ρυθμίζονται με βάση το πώς πραγματικά πουλάτε και στέλνετε, μαζί με τη ροή ταμείου και τη διαχείριση αποθέματος, αντί να μείνουν στις προεπιλογές.' },
  ],
  'eshop-seo': [
    { question: 'Γιατί δεν κατατάσσονται οι κατηγορίες μου;', answer: 'Συνήθως λόγω διπλότυπων από φίλτρα και παραμέτρους, κατηγοριών που ανταγωνίζονται μεταξύ τους ή ελλιπούς κειμένου. Η τεχνική δουλειά προηγείται, γιατί η βελτιστοποίηση πάνω σε διπλοεγγραφή δεν κρατάει.' },
    { question: 'Τι γίνεται με τα εξαντλημένα προϊόντα;', answer: 'Χρειάζονται συνειδητή πολιτική - διατήρηση, ανακατεύθυνση ή αφαίρεση - γιατί το να τα αφήνετε σιωπηλά σε 404 πετάει τους συνδέσμους και τις θέσεις που είχαν συγκεντρώσει.' },
    { question: 'Περιλαμβάνεται δουλειά μετατροπών;', answer: 'Αντιμετωπίζεται ως μέρος της ίδιας δουλειάς. Επισκεψιμότητα σε σελίδα που δεν μετατρέπει είναι κόστος, όχι αποτέλεσμα.' },
  ],
  'speed-optimization': [
    { question: 'Ποιες σελίδες βελτιστοποιείτε;', answer: 'Επιλέγουμε μαζί τις σελίδες που χρησιμοποιούν οι πελάτες σας. Μπορεί να είναι η αρχική, μια κατηγορία προϊόντων ή η φόρμα κράτησης. Μετράμε καθεμία σε κινητό πριν αποφασίσουμε τι θα αλλάξει.' },
    { question: 'Θα ανέβουν οι θέσεις μου;', answer: 'Η Google χρησιμοποιεί τα Core Web Vitals μαζί με πολλά άλλα κριτήρια. Μπορούμε να μετρήσουμε αν η σελίδα φορτώνει ή ανταποκρίνεται ταχύτερα. Η βελτίωση αυτή δεν εγγυάται συγκεκριμένη θέση.' },
    { question: 'Πώς αποδεικνύεται η βελτίωση;', answer: 'Τα ίδια πρότυπα μετριούνται πριν και μετά, ώστε η αλλαγή να τεκμηριώνεται αντί να δηλώνεται.' },
  ],
  'link-building': [
    { question: 'Πόσους συνδέσμους θα πάρω;', answer: 'Ο όγκος είναι λάθος μονάδα. Λίγες σχετικές, πραγματικά κερδισμένες αναφορές αποδίδουν περισσότερο από πολλές τοποθετήσεις που δεν διαβάζει κανείς.' },
    { question: 'Αγοράζετε συνδέσμους;', answer: 'Δεν αγοράζουμε συνδέσμους για να επηρεάσουμε την κατάταξη. Αν πληρώσετε ένα μέσο για διαφήμιση, η Google ζητά ο σύνδεσμος να επισημανθεί ως χορηγούμενος ή με nofollow.' },
    { question: 'Τι γίνεται αν έχω ήδη spam συνδέσμους;', answer: 'Το προφίλ ελέγχεται ως μέρος της δουλειάς. Το περισσότερο απρόσκλητο spam αγνοείται από τις μηχανές και δεν χρειάζεται ενέργεια - το disavow είναι έσχατη λύση, όχι ρουτίνα.' },
  ],
  'logo-design': [
    { question: 'Τι παραλαμβάνω;', answer: 'Το σήμα στις μορφές που χρειάζονται ψηφιακή και εκτυπωτική χρήση, μαζί με όσα το κάνουν εφαρμόσιμο: παλέτα, τυπογραφία και οδηγό χρήσης.' },
    { question: 'Ξανασχεδιάζετε υπάρχον λογότυπο;', answer: 'Ναι. Αν θέλετε να κρατήσετε το σημερινό σήμα αλλά έχετε μόνο μια μικρή εικόνα, μπορούμε να το σχεδιάσουμε ξανά σε αρχείο κατάλληλο για εκτύπωση.' },
    { question: 'Μπορεί να γίνει μαζί με την ιστοσελίδα;', answer: 'Ναι, και συνήθως κοστίζει λιγότερο έτσι, αφού οι αποφάσεις ταυτότητας τροφοδοτούν απευθείας τον σχεδιασμό.' },
  ],
};

export function getServiceFaqs(serviceSlug: string, locale: SiteLocale): readonly AngleFaq[] {
  return (locale === 'el' ? EL_FAQS : EN_FAQS)[serviceSlug] ?? [];
}

export const FAQ_HEADING = { en: 'Common questions', el: 'Συχνές ερωτήσεις' } as const;
