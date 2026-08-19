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
      'A sector site is not a brochure with different photographs. The pages that earn enquiries are the ones matching how buyers in that sector actually describe their problem, which is rarely how the business describes its services internally.',
    process:
      'We map the enquiry path first - which page someone lands on, what they need answered before they will contact you, and what removes the last hesitation - then build the page structure around that path rather than around an org chart.',
    outcome:
      'A site with a page for each genuine buying intent, technically sound from launch, and structured so new service or location pages can be added without rebuilding.',
  },
  'website-redesign': {
    approach:
      'The risk in a redesign is never the visual direction, it is the migration. Sector sites usually have a handful of URLs quietly earning most of the enquiries, and a redesign that does not know which ones those are will break them.',
    process:
      'We inventory what currently earns traffic and conversions before anything is designed, map old URLs to new ones, then rebuild the templates that matter most first.',
    outcome:
      'A modern site that keeps the rankings the old one had, with redirects mapped one-to-one wherever an equivalent page exists.',
  },
  'seo-web-design': {
    approach:
      'Architecture decides what can rank long before copy is written. For a sector site that means settling early how services, locations and audiences divide into pages, because that split is expensive to change later.',
    process:
      'Technical review runs against the design itself - URL structure, internal linking, schema for the entities that matter in this sector - rather than after handover.',
    outcome:
      'A site that does not need a second "SEO optimisation" project after launch.',
  },
  'content-creation': {
    approach:
      'Content for a sector works when it answers the questions asked before the buying decision, not the ones asked after. Those questions are specific enough that generic industry writing is visibly wrong to a reader who works in the field.',
    process:
      'We start from the questions your team already answers on the phone, check which ones have real search demand, and write the pages that are missing.',
    outcome:
      'Service pages that explain what you actually do, plus supporting content that reaches buyers earlier in the decision.',
  },
  'local-seo': {
    approach:
      'Local visibility is decided in two places at once: the map pack and the organic results beneath it. For most sector businesses the map pack is where the phone call comes from, and it responds to different signals than the blue links.',
    process:
      'Google Business Profile is brought up to standard first - categories, services, photos, questions - alongside consistent citations and NAP, because contradictions there cost trust before any content work can pay off.',
    outcome:
      'Consistent presence for the near-me and city-qualified searches that produce calls, with reviews handled as an ongoing process rather than a one-off push.',
  },
  'seo-audits': {
    approach:
      'An audit is worth the fee only if it ends in a sequence. For a sector site the same defect usually repeats across a template, so the fix list is shorter and higher-leverage than the raw issue count suggests.',
    process:
      'We check crawlability and indexation first, then canonical and duplicate handling, then on-page and content overlap, then Core Web Vitals - in that order, because a fast page that is excluded from the index is worth nothing.',
    outcome:
      'A prioritised plan that says what to fix first and why, with monthly reporting against it, instead of a export of every warning a crawler produced.',
  },
  'ai-visibility': {
    approach:
      'A growing share of research now ends inside an AI answer rather than on a website. Being cited in that answer is a different problem from ranking, and it depends on whether a machine can identify who you are and quote you cleanly.',
    process:
      'We work on entity clarity and schema so the business is unambiguous to a model, and restructure key pages so they answer questions directly enough to be quoted.',
    outcome:
      'Pages built to be cited in AI answers as well as ranked, with mentions tracked so the effect is visible.',
  },
  'eshop-woocommerce': {
    approach:
      'An online store is judged at the points customers never comment on: how fast they find the product, how many steps checkout takes, and what happens when something is out of stock.',
    process:
      'WooCommerce is configured around how you actually sell and ship, with product pages built to answer the questions that otherwise stop the purchase.',
    outcome:
      'A store whose category structure is designed to rank, because categories - not the homepage - are what commercial searches land on.',
  },
  'eshop-seo': {
    approach:
      'E-commerce SEO is a different problem from site SEO: hundreds of product URLs, filters generating duplicates, categories competing with each other, and products that go out of stock.',
    process:
      'Technical work comes first to stop the duplication, then category and product optimisation with product schema so price and availability can show in results.',
    outcome:
      'Category and product pages that earn commercial traffic, with conversion work treated as part of the same job rather than a later phase.',
  },
  'speed-optimization': {
    approach:
      'Performance is measured on the templates that carry the money, not on the homepage, because the homepage is usually the fastest page on any site.',
    process:
      'We profile the real templates to find what is actually holding the load - images, third-party scripts, render-blocking resources - and fix in that order.',
    outcome:
      'Measured Core Web Vitals improvement on the pages that convert, verified after the work rather than assumed.',
  },
  'link-building': {
    approach:
      'Relevance has replaced volume. A mention from a publication your buyers actually read is worth more than a hundred directory entries nobody visits.',
    process:
      'We look for genuine reasons to be covered - expertise, data you already hold, relationships you already have - and pursue those rather than buying placements.',
    outcome:
      'A link profile that looks like it was earned, monitored for the spam that can arrive uninvited.',
  },
  'logo-design': {
    approach:
      'A mark has to work at the sizes it will actually be used: a profile photo, a van door, a printed form, a favicon.',
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
      'Μια ιστοσελίδα κλάδου δεν είναι ένα φυλλάδιο με άλλες φωτογραφίες. Οι σελίδες που φέρνουν αιτήματα είναι εκείνες που μιλούν όπως περιγράφει το πρόβλημά του ο πελάτης, όχι όπως περιγράφει τις υπηρεσίες της η επιχείρηση εσωτερικά.',
    process:
      'Χαρτογραφούμε πρώτα τη διαδρομή του αιτήματος - σε ποια σελίδα φτάνει κάποιος, τι πρέπει να απαντηθεί πριν επικοινωνήσει και τι αίρει τον τελευταίο δισταγμό - και χτίζουμε τη δομή γύρω από αυτή τη διαδρομή.',
    outcome:
      'Ένα site με ξεχωριστή σελίδα για κάθε πραγματική πρόθεση αγοράς, τεχνικά σωστό από την πρώτη μέρα και δομημένο ώστε να επεκτείνεται χωρίς ξαναχτίσιμο.',
  },
  'website-redesign': {
    approach:
      'Ο κίνδυνος σε έναν ανασχεδιασμό δεν είναι η αισθητική, είναι η μεταφορά. Συνήθως λίγες URL φέρνουν τα περισσότερα αιτήματα, και ένας ανασχεδιασμός που δεν ξέρει ποιες είναι θα τις σπάσει.',
    process:
      'Καταγράφουμε τι αποδίδει σήμερα πριν σχεδιαστεί οτιδήποτε, αντιστοιχίζουμε παλιές με νέες διευθύνσεις και ξαναχτίζουμε πρώτα τα πρότυπα που μετράνε.',
    outcome:
      'Σύγχρονο site που κρατά τις θέσεις του παλιού, με ανακατευθύνσεις 1:1 όπου υπάρχει αντίστοιχη σελίδα.',
  },
  'seo-web-design': {
    approach:
      'Η αρχιτεκτονική καθορίζει τι μπορεί να καταταγεί, πολύ πριν γραφτεί το πρώτο κείμενο. Για μια ιστοσελίδα κλάδου αυτό σημαίνει να αποφασιστεί νωρίς πώς χωρίζονται υπηρεσίες, περιοχές και κοινά σε σελίδες.',
    process:
      'Ο τεχνικός έλεγχος γίνεται πάνω στο ίδιο το σχέδιο - δομή URL, εσωτερικοί σύνδεσμοι, schema για τις οντότητες του κλάδου - και όχι μετά την παράδοση.',
    outcome:
      'Ένα site που δεν χρειάζεται δεύτερο έργο «βελτιστοποίησης SEO» μετά τη δημοσίευση.',
  },
  'content-creation': {
    approach:
      'Το περιεχόμενο για έναν κλάδο πιάνει όταν απαντά στις ερωτήσεις που γίνονται πριν την απόφαση, όχι μετά. Αυτές οι ερωτήσεις είναι αρκετά συγκεκριμένες ώστε το γενικόλογο κείμενο να φαίνεται αμέσως σε όποιον δουλεύει στον χώρο.',
    process:
      'Ξεκινάμε από τις ερωτήσεις που ήδη απαντά η ομάδα σας στο τηλέφωνο, ελέγχουμε ποιες έχουν πραγματική ζήτηση στην αναζήτηση και γράφουμε τις σελίδες που λείπουν.',
    outcome:
      'Σελίδες υπηρεσιών που εξηγούν τι πραγματικά κάνετε, μαζί με περιεχόμενο που φτάνει στον πελάτη νωρίτερα στην απόφαση.',
  },
  'local-seo': {
    approach:
      'Η τοπική ορατότητα κρίνεται σε δύο σημεία ταυτόχρονα: στον χάρτη και στα οργανικά αποτελέσματα από κάτω. Για τις περισσότερες τοπικές επιχειρήσεις η κλήση έρχεται από τον χάρτη, που απαντά σε διαφορετικά σήματα.',
    process:
      'Πρώτα μπαίνει σε τάξη το Google Business Profile - κατηγορίες, υπηρεσίες, φωτογραφίες, ερωτήσεις - μαζί με συνεπείς καταχωρήσεις και NAP, γιατί οι αντιφάσεις εκεί κοστίζουν πριν προλάβει να αποδώσει οτιδήποτε άλλο.',
    outcome:
      'Σταθερή παρουσία στις αναζητήσεις «κοντά μου» και ανά πόλη που παράγουν κλήσεις, με τις κριτικές ως συνεχή διαδικασία και όχι ως εφάπαξ κίνηση.',
  },
  'seo-audits': {
    approach:
      'Ένας έλεγχος αξίζει μόνο αν καταλήγει σε σειρά ενεργειών. Σε ιστοσελίδα κλάδου το ίδιο σφάλμα συνήθως επαναλαμβάνεται σε ένα πρότυπο, οπότε η λίστα διορθώσεων είναι μικρότερη και πιο αποδοτική απ᾽ όσο δείχνει ο αριθμός των ευρημάτων.',
    process:
      'Ελέγχουμε πρώτα σάρωση και ευρετηρίαση, μετά canonical και διπλότυπα, μετά on-page και επικαλύψεις περιεχομένου, και τέλος Core Web Vitals - με αυτή τη σειρά, γιατί μια γρήγορη σελίδα εκτός ευρετηρίου δεν αξίζει τίποτα.',
    outcome:
      'Ιεραρχημένο πλάνο που λέει τι πρώτο και γιατί, με μηνιαία αναφορά προόδου, αντί για εξαγωγή όλων των προειδοποιήσεων ενός εργαλείου.',
  },
  'ai-visibility': {
    approach:
      'Όλο και μεγαλύτερο μέρος της έρευνας τελειώνει μέσα σε μια απάντηση AI και όχι σε μια ιστοσελίδα. Το να αναφέρεστε εκεί είναι διαφορετικό πρόβλημα από το να κατατάσσεστε.',
    process:
      'Δουλεύουμε στη σαφήνεια της οντότητας και στο schema ώστε η επιχείρηση να είναι αναγνωρίσιμη από ένα μοντέλο, και αναδομούμε τις βασικές σελίδες ώστε να απαντούν ευθέως.',
    outcome:
      'Σελίδες φτιαγμένες για να παρατίθενται σε απαντήσεις AI εκτός από το να κατατάσσονται, με παρακολούθηση αναφορών.',
  },
  'eshop-woocommerce': {
    approach:
      'Ένα e-shop κρίνεται σε σημεία που κανείς δεν σχολιάζει: πόσο γρήγορα βρίσκεται το προϊόν, πόσα βήματα έχει το ταμείο και τι γίνεται όταν κάτι εξαντληθεί.',
    process:
      'Το WooCommerce ρυθμίζεται γύρω από τον τρόπο που πραγματικά πουλάτε και στέλνετε, με σελίδες προϊόντων που απαντούν στις ερωτήσεις που αλλιώς σταματούν την αγορά.',
    outcome:
      'Κατάστημα με δομή κατηγοριών σχεδιασμένη να κατατάσσεται, γιατί οι κατηγορίες - όχι η αρχική - δέχονται τις εμπορικές αναζητήσεις.',
  },
  'eshop-seo': {
    approach:
      'Το SEO σε e-shop είναι άλλο πρόβλημα από το SEO σε εταιρικό site: εκατοντάδες σελίδες προϊόντων, φίλτρα που παράγουν διπλότυπα, κατηγορίες που ανταγωνίζονται μεταξύ τους και προϊόντα που εξαντλούνται.',
    process:
      'Πρώτα η τεχνική δουλειά για να σταματήσει η διπλοεγγραφή, μετά βελτιστοποίηση κατηγοριών και προϊόντων με schema ώστε τιμή και διαθεσιμότητα να εμφανίζονται στα αποτελέσματα.',
    outcome:
      'Κατηγορίες και προϊόντα που φέρνουν εμπορική επισκεψιμότητα, με το CRO να δουλεύεται μαζί και όχι σε επόμενη φάση.',
  },
  'speed-optimization': {
    approach:
      'Οι επιδόσεις μετριούνται στα πρότυπα που φέρνουν έσοδα, όχι στην αρχική, που είναι συνήθως η πιο γρήγορη σελίδα κάθε site.',
    process:
      'Μετράμε τα πραγματικά πρότυπα για να βρούμε τι κρατάει τον χρόνο φόρτωσης - εικόνες, scripts τρίτων, render-blocking πόροι - και διορθώνουμε με αυτή τη σειρά.',
    outcome:
      'Μετρημένη βελτίωση Core Web Vitals στις σελίδες που μετατρέπουν, επιβεβαιωμένη μετά τη δουλειά.',
  },
  'link-building': {
    approach:
      'Η συνάφεια αντικατέστησε τον όγκο. Μια αναφορά από ένα μέσο που διαβάζουν πραγματικά οι πελάτες σας αξίζει περισσότερο από εκατό καταχωρήσεις σε καταλόγους.',
    process:
      'Ψάχνουμε πραγματικές αφορμές κάλυψης - τεχνογνωσία, δεδομένα που ήδη έχετε, σχέσεις που ήδη υπάρχουν - αντί να αγοράζουμε τοποθετήσεις.',
    outcome:
      'Προφίλ συνδέσμων που μοιάζει κερδισμένο, με παρακολούθηση για spam που έρχεται απρόσκλητο.',
  },
  'logo-design': {
    approach:
      'Ένα σήμα πρέπει να δουλεύει στα μεγέθη που θα χρησιμοποιηθεί πραγματικά: φωτογραφία προφίλ, πόρτα οχήματος, έντυπο, favicon.',
    process:
      'Παραδίδεται με τα βασικά που το κάνουν εφαρμόσιμο - παλέτα, τυπογραφία, οδηγό χρήσης - ώστε ο επόμενος συνεργάτης να μη μαντεύει.',
    outcome:
      'Πλήρες κιτ ταυτότητας στις μορφές που απαιτούν ψηφιακή και εκτυπωτική χρήση.',
  },
};

export function getServiceAngle(serviceSlug: string, locale: SiteLocale): ServiceAngle | undefined {
  return (locale === 'el' ? EL : EN)[serviceSlug];
}

/** Section headings for the composed block. */
export const ANGLE_HEADINGS = {
  en: { approach: 'How this works for your sector', process: 'What the first weeks look like', outcome: 'What you end up with' },
  el: { approach: 'Πώς δουλεύει για τον κλάδο σας', process: 'Τι γίνεται τις πρώτες εβδομάδες', outcome: 'Τι μένει στα χέρια σας' },
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
 * already rendered above them — inventing 31 variants of each answer would be
 * padding, which is the thing this whole exercise is meant to remove.
 *
 * No prices: `/pricing` owns those and follows the live offer window.
 */
const EN_FAQS: Record<string, readonly AngleFaq[]> = {
  'website-creation': [
    { question: 'How long does a build take?', answer: 'Most projects run two to eight weeks once content and approvals are ready. The variable is almost never development — it is how quickly copy, photography and sign-off arrive.' },
    { question: 'Do I need a separate SEO project afterwards?', answer: 'No. Technical foundations, URL structure and analytics are part of the build. A separate optimisation project after launch usually means they were skipped.' },
    { question: 'Can the site grow into more pages later?', answer: 'Yes, that is the point of settling the architecture first. New service or location pages slot into the existing structure without a rebuild.' },
  ],
  'website-redesign': [
    { question: 'Will a redesign lose my rankings?', answer: 'It can, and that is the main risk to manage. We inventory which URLs currently earn traffic before design starts and map them one-to-one to new equivalents, so the redirects preserve what is already working.' },
    { question: 'Can you redesign in stages?', answer: 'Yes. Rebuilding the highest-value templates first limits the blast radius and lets you verify each stage before the next.' },
    { question: 'What happens to my old URLs?', answer: 'Where an equivalent page exists, the old URL redirects to it permanently. Where none does, we decide deliberately whether to recreate the page or let it go.' },
  ],
  'seo-web-design': [
    { question: 'How is this different from a normal website project?', answer: 'The architecture and technical review happen during design rather than after handover, so the structure that decides what can rank is settled before any copy is written.' },
    { question: 'Do you work with an existing design?', answer: 'Yes, provided the structure can carry it. If the page hierarchy is the problem, changing the visuals alone will not fix the rankings.' },
    { question: 'Is schema markup included?', answer: 'Yes, for the entities that matter on the site — the organisation, its services, and page-level markup such as breadcrumbs and FAQs where they reflect visible content.' },
  ],
  'content-creation': [
    { question: 'Who writes the content?', answer: 'We do, starting from the questions your team already answers day to day, then checking which of them have real search demand before anything is commissioned.' },
    { question: 'How much content do we actually need?', answer: 'Fewer pages than most plans assume. One page per genuine intent — more than that and your own pages start competing with each other.' },
    { question: 'Will it sound like our business?', answer: 'That depends on access. The pages that read as authentic are the ones informed by how your team actually explains the work, which is why the process starts there.' },
  ],
  'local-seo': [
    { question: 'How long before local rankings move?', answer: 'Profile and citation work can show up within weeks because the signals are direct. Competitive organic terms take longer, and anyone promising a date is guessing.' },
    { question: 'Do I need a physical address?', answer: 'For the map pack, yes — Google requires a real presence in the area served. Service-area businesses can rank without a storefront but still need a verifiable base.' },
    { question: 'Do reviews really matter?', answer: 'Yes, for both ranking and click-through. A steady flow with replies outperforms a burst of reviews followed by silence.' },
  ],
  'seo-audits': [
    { question: 'What do I actually receive?', answer: 'A prioritised plan: what to fix first, why it ranks above the rest, and how you will know it worked. Not an export of every warning a crawler produced.' },
    { question: 'Can you implement the fixes too?', answer: 'Yes. The audit is scoped separately from implementation so you are free to hand the plan to your own developers instead.' },
    { question: 'How often should we re-audit?', answer: 'A site under active development benefits from a check each release, since most technical regressions arrive with a deploy. A stable site needs it after migrations and redesigns.' },
  ],
  'ai-visibility': [
    { question: 'Is this different from normal SEO?', answer: 'It overlaps but the target differs. Ranking earns a click; being cited in an AI answer requires the model to identify you unambiguously and find a passage worth quoting.' },
    { question: 'Can you guarantee mentions in AI answers?', answer: 'No, and neither can anyone else — these systems are not deterministic. What can be done is remove the reasons you are not citable, and track mentions so the effect is visible.' },
    { question: 'Does this replace traditional rankings?', answer: 'No. Both matter, and the technical groundwork largely serves both.' },
  ],
  'eshop-woocommerce': [
    { question: 'Why WooCommerce rather than a hosted platform?', answer: 'Control over URL structure, templates and integrations, which is what makes category-level SEO possible. Hosted platforms trade some of that for convenience.' },
    { question: 'Can you migrate an existing store?', answer: 'Yes. Product URLs and category structure are mapped before the move so existing rankings and links survive it.' },
    { question: 'What about payments and shipping?', answer: 'Configured around how you actually sell and ship, including checkout flow and stock handling, rather than left on defaults.' },
  ],
  'eshop-seo': [
    { question: 'Why are my category pages not ranking?', answer: 'Usually duplication from filters and parameters, categories competing with each other, or thin category copy. The technical layer comes first because optimisation on top of duplication does not hold.' },
    { question: 'What happens to out-of-stock products?', answer: 'They need a deliberate policy — keep, redirect or remove — because letting them silently 404 wastes the links and rankings they accumulated.' },
    { question: 'Is conversion work included?', answer: 'It is treated as part of the same job. Traffic to a page that does not convert is a cost, not a result.' },
  ],
  'speed-optimization': [
    { question: 'Which pages do you optimise?', answer: 'The templates that carry revenue, not the homepage — the homepage is usually the fastest page on any site and the least representative.' },
    { question: 'Will this improve my rankings?', answer: 'Speed is one signal among many, and the honest answer is that its effect on conversion is usually larger and more immediate than its effect on position.' },
    { question: 'How do you prove the improvement?', answer: 'The same templates are measured before and after, so the change is documented rather than asserted.' },
  ],
  'link-building': [
    { question: 'How many links will I get?', answer: 'Volume is the wrong unit. A handful of relevant, genuinely earned mentions outperforms a large number of placements nobody reads, and we scope on relevance rather than count.' },
    { question: 'Do you buy links?', answer: 'No. Paid placement is against search engine guidelines and the risk sits with your domain, not ours.' },
    { question: 'What if I already have spam links?', answer: 'The profile is reviewed as part of the work. Most unsolicited spam is ignored by search engines and needs no action; disavowal is a last resort, not a routine step.' },
  ],
  'logo-design': [
    { question: 'What do I receive?', answer: 'The mark in the formats digital and print both need, plus the essentials that make it usable — colour palette, typography and a usage guide.' },
    { question: 'Do you redraw an existing logo?', answer: 'Yes, where the mark is sound but the files are not. Recovering a usable vector from a low-resolution image is a common starting point.' },
    { question: 'Can this be done alongside a website build?', answer: 'Yes, and it is usually cheaper that way since the identity decisions feed straight into the design.' },
  ],
};

const EL_FAQS: Record<string, readonly AngleFaq[]> = {
  'website-creation': [
    { question: 'Πόσο διαρκεί η κατασκευή;', answer: 'Τα περισσότερα έργα ολοκληρώνονται σε δύο έως οκτώ εβδομάδες μόλις είναι έτοιμο το υλικό. Η μεταβλητή σχεδόν ποτέ δεν είναι η ανάπτυξη, αλλά το πόσο γρήγορα έρχονται κείμενα, φωτογραφίες και εγκρίσεις.' },
    { question: 'Θα χρειαστεί ξεχωριστό έργο SEO μετά;', answer: 'Όχι. Τα τεχνικά θεμέλια, η δομή των URL και η μέτρηση είναι μέρος της κατασκευής. Ένα ξεχωριστό έργο βελτιστοποίησης μετά τη δημοσίευση συνήθως σημαίνει ότι παραλείφθηκαν.' },
    { question: 'Μπορεί το site να επεκταθεί αργότερα;', answer: 'Ναι, γι᾽ αυτό αποφασίζεται πρώτα η αρχιτεκτονική. Νέες σελίδες υπηρεσιών ή περιοχών προστίθενται χωρίς ξαναχτίσιμο.' },
  ],
  'website-redesign': [
    { question: 'Θα χάσω θέσεις με τον ανασχεδιασμό;', answer: 'Υπάρχει τέτοιος κίνδυνος και αυτός είναι που διαχειριζόμαστε. Καταγράφουμε ποιες URL αποδίδουν πριν ξεκινήσει ο σχεδιασμός και τις αντιστοιχίζουμε 1:1, ώστε οι ανακατευθύνσεις να κρατήσουν ό,τι ήδη δουλεύει.' },
    { question: 'Μπορεί να γίνει σταδιακά;', answer: 'Ναι. Ξεκινώντας από τα πρότυπα με τη μεγαλύτερη αξία, κάθε στάδιο επαληθεύεται πριν προχωρήσει το επόμενο.' },
    { question: 'Τι γίνεται με τις παλιές διευθύνσεις;', answer: 'Όπου υπάρχει αντίστοιχη σελίδα, η παλιά URL ανακατευθύνεται μόνιμα σε αυτήν. Όπου δεν υπάρχει, αποφασίζουμε συνειδητά αν θα αναδημιουργηθεί.' },
  ],
  'seo-web-design': [
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
    { question: 'Πόσο γρήγορα κινούνται οι τοπικές θέσεις;', answer: 'Η δουλειά στο προφίλ και στις καταχωρήσεις μπορεί να φανεί μέσα σε εβδομάδες, γιατί τα σήματα είναι άμεσα. Οι ανταγωνιστικοί οργανικοί όροι θέλουν περισσότερο, και όποιος υπόσχεται ημερομηνία μαντεύει.' },
    { question: 'Χρειάζομαι φυσική διεύθυνση;', answer: 'Για τον χάρτη, ναι - η Google απαιτεί πραγματική παρουσία στην περιοχή. Οι επιχειρήσεις περιοχής εξυπηρέτησης μπορούν να εμφανίζονται χωρίς κατάστημα, αλλά χρειάζονται επαληθεύσιμη έδρα.' },
    { question: 'Μετράνε πραγματικά οι κριτικές;', answer: 'Ναι, τόσο για την κατάταξη όσο και για το ποσοστό κλικ. Μια σταθερή ροή με απαντήσεις αποδίδει περισσότερο από μια έκρηξη κριτικών και μετά σιωπή.' },
  ],
  'seo-audits': [
    { question: 'Τι ακριβώς παραλαμβάνω;', answer: 'Ιεραρχημένο πλάνο: τι διορθώνεται πρώτο, γιατί προηγείται και πώς θα ξέρετε ότι έπιασε. Όχι εξαγωγή όλων των προειδοποιήσεων ενός εργαλείου.' },
    { question: 'Αναλαμβάνετε και την υλοποίηση;', answer: 'Ναι. Ο έλεγχος τιμολογείται ξεχωριστά από την υλοποίηση, ώστε να μπορείτε να δώσετε το πλάνο στους δικούς σας προγραμματιστές.' },
    { question: 'Κάθε πότε χρειάζεται νέος έλεγχος;', answer: 'Ένα site σε ενεργή ανάπτυξη κερδίζει από έλεγχο σε κάθε release, γιατί οι περισσότερες τεχνικές παλινδρομήσεις έρχονται με τα deploy. Ένα σταθερό site τον χρειάζεται μετά από μεταφορές και ανασχεδιασμούς.' },
  ],
  'ai-visibility': [
    { question: 'Διαφέρει από το κανονικό SEO;', answer: 'Επικαλύπτεται, αλλά ο στόχος αλλάζει. Η κατάταξη κερδίζει ένα κλικ - η αναφορά σε απάντηση AI απαιτεί το μοντέλο να σας αναγνωρίσει με βεβαιότητα και να βρει απόσπασμα που αξίζει να παραθέσει.' },
    { question: 'Εγγυάστε αναφορές σε απαντήσεις AI;', answer: 'Όχι, ούτε μπορεί κανείς - τα συστήματα αυτά δεν είναι ντετερμινιστικά. Αυτό που γίνεται είναι να αρθούν οι λόγοι για τους οποίους δεν είστε παραθέσιμοι, και να παρακολουθούνται οι αναφορές.' },
    { question: 'Αντικαθιστά τις παραδοσιακές θέσεις;', answer: 'Όχι. Και τα δύο μετράνε, και η τεχνική βάση εξυπηρετεί σε μεγάλο βαθμό και τα δύο.' },
  ],
  'eshop-woocommerce': [
    { question: 'Γιατί WooCommerce και όχι έτοιμη πλατφόρμα;', answer: 'Έλεγχος στη δομή των URL, στα πρότυπα και στις ενσωματώσεις - αυτό είναι που κάνει εφικτό το SEO σε επίπεδο κατηγορίας. Οι έτοιμες πλατφόρμες ανταλλάσσουν μέρος αυτού με ευκολία.' },
    { question: 'Μπορείτε να μεταφέρετε υπάρχον κατάστημα;', answer: 'Ναι. Οι URL προϊόντων και η δομή κατηγοριών αντιστοιχίζονται πριν τη μεταφορά, ώστε να επιβιώσουν θέσεις και σύνδεσμοι.' },
    { question: 'Τι γίνεται με πληρωμές και μεταφορικά;', answer: 'Ρυθμίζονται με βάση το πώς πραγματικά πουλάτε και στέλνετε, μαζί με τη ροή ταμείου και τη διαχείριση αποθέματος, αντί να μείνουν στις προεπιλογές.' },
  ],
  'eshop-seo': [
    { question: 'Γιατί δεν κατατάσσονται οι κατηγορίες μου;', answer: 'Συνήθως λόγω διπλότυπων από φίλτρα και παραμέτρους, κατηγοριών που ανταγωνίζονται μεταξύ τους ή ελλιπούς κειμένου. Η τεχνική δουλειά προηγείται, γιατί η βελτιστοποίηση πάνω σε διπλοεγγραφή δεν κρατάει.' },
    { question: 'Τι γίνεται με τα εξαντλημένα προϊόντα;', answer: 'Χρειάζονται συνειδητή πολιτική - διατήρηση, ανακατεύθυνση ή αφαίρεση - γιατί το να τα αφήνετε σιωπηλά σε 404 πετάει τους συνδέσμους και τις θέσεις που είχαν συγκεντρώσει.' },
    { question: 'Περιλαμβάνεται δουλειά μετατροπών;', answer: 'Αντιμετωπίζεται ως μέρος της ίδιας δουλειάς. Επισκεψιμότητα σε σελίδα που δεν μετατρέπει είναι κόστος, όχι αποτέλεσμα.' },
  ],
  'speed-optimization': [
    { question: 'Ποιες σελίδες βελτιστοποιείτε;', answer: 'Τα πρότυπα που φέρνουν έσοδα, όχι την αρχική - είναι συνήθως η πιο γρήγορη και η λιγότερο αντιπροσωπευτική σελίδα κάθε site.' },
    { question: 'Θα ανέβουν οι θέσεις μου;', answer: 'Η ταχύτητα είναι ένα σήμα ανάμεσα σε πολλά, και η ειλικρινής απάντηση είναι ότι η επίδρασή της στη μετατροπή είναι συνήθως μεγαλύτερη και πιο άμεση από την επίδραση στη θέση.' },
    { question: 'Πώς αποδεικνύεται η βελτίωση;', answer: 'Τα ίδια πρότυπα μετριούνται πριν και μετά, ώστε η αλλαγή να τεκμηριώνεται αντί να δηλώνεται.' },
  ],
  'link-building': [
    { question: 'Πόσους συνδέσμους θα πάρω;', answer: 'Ο όγκος είναι λάθος μονάδα. Λίγες σχετικές, πραγματικά κερδισμένες αναφορές αποδίδουν περισσότερο από πολλές τοποθετήσεις που δεν διαβάζει κανείς.' },
    { question: 'Αγοράζετε συνδέσμους;', answer: 'Όχι. Η πληρωμένη τοποθέτηση αντιβαίνει στις οδηγίες των μηχανών αναζήτησης και ο κίνδυνος βαραίνει το δικό σας domain.' },
    { question: 'Τι γίνεται αν έχω ήδη spam συνδέσμους;', answer: 'Το προφίλ ελέγχεται ως μέρος της δουλειάς. Το περισσότερο απρόσκλητο spam αγνοείται από τις μηχανές και δεν χρειάζεται ενέργεια - το disavow είναι έσχατη λύση, όχι ρουτίνα.' },
  ],
  'logo-design': [
    { question: 'Τι παραλαμβάνω;', answer: 'Το σήμα στις μορφές που χρειάζονται ψηφιακή και εκτυπωτική χρήση, μαζί με όσα το κάνουν εφαρμόσιμο: παλέτα, τυπογραφία και οδηγό χρήσης.' },
    { question: 'Ξανασχεδιάζετε υπάρχον λογότυπο;', answer: 'Ναι, όταν το σήμα στέκει αλλά τα αρχεία όχι. Η ανάκτηση χρησιμοποιήσιμου διανυσματικού αρχείου από χαμηλής ανάλυσης εικόνα είναι συχνή αφετηρία.' },
    { question: 'Μπορεί να γίνει μαζί με την ιστοσελίδα;', answer: 'Ναι, και συνήθως κοστίζει λιγότερο έτσι, αφού οι αποφάσεις ταυτότητας τροφοδοτούν απευθείας τον σχεδιασμό.' },
  ],
};

export function getServiceFaqs(serviceSlug: string, locale: SiteLocale): readonly AngleFaq[] {
  return (locale === 'el' ? EL_FAQS : EN_FAQS)[serviceSlug] ?? [];
}

export const FAQ_HEADING = { en: 'Common questions', el: 'Συχνές ερωτήσεις' } as const;
