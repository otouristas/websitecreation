/**
 * Service-aware Greek copy for service × location pages.
 *
 * Why this exists
 * ---------------
 * The city packs in `packs-el.ts` carry one `intro` per city, and that intro was
 * rendered on all twelve service pages for that city. It had been written for
 * website creation, so `/el/services/seo-audits/athens-gr` opened by advertising
 * website builds and construction packages - the wrong offer, on a page whose H1
 * promises a technical SEO audit.
 *
 * The fix is not to swap the service noun into the same sentence. Each block
 * below describes what that service actually delivers, and every claim maps to
 * the feature list already published for the service in `services-i18n.ts`.
 * The city-specific half comes from real entity data (locative form, neighbourhood
 * names, tourism flag) rather than from invented local facts.
 *
 * Rules for editing:
 *  - Never state a price here. Prices live in `data/pricing.ts` and are rendered
 *    through `{{TOKEN}}` substitution so they follow the live offer window.
 *  - Never claim a deliverable the service does not list in `services-i18n.ts`.
 *  - Never assert local presence, client names, results or statistics.
 */

export interface ServiceCopyContext {
  /** "στην Αθήνα" / "στο Ηράκλειο" / "στα Χανιά" */
  readonly inCity: string;
  /** Nominative city name, for quoted search queries. */
  readonly city: string;
  /** Localized neighbourhood names, already Greek. */
  readonly neighborhoods: readonly string[];
  /** Pack flag: this is a tourism/hospitality market. */
  readonly tourism: boolean;
}

export interface ServiceCopyBlock {
  /** Section heading, specific to the service. */
  readonly heading: string;
  /** 2-3 paragraphs describing the service as delivered in this market. */
  readonly paragraphs: readonly string[];
  /** What the engagement actually produces. Maps to services-i18n features. */
  readonly deliverables: readonly string[];
}

type Builder = (c: ServiceCopyContext) => ServiceCopyBlock;

/** "Κολωνάκι, Γλυφάδα και Κηφισιά" from the localized neighbourhood list. */
function hoodList(c: ServiceCopyContext, limit = 3): string {
  const h = c.neighborhoods.slice(0, limit);
  if (h.length === 0) return '';
  if (h.length === 1) return h[0];
  return `${h.slice(0, -1).join(', ')} και ${h[h.length - 1]}`;
}

/** Sentence naming neighbourhoods only when the location actually has them. */
function hoodSentence(c: ServiceCopyContext, lead: string): string[] {
  const list = hoodList(c);
  return list ? [`${lead} ${list}.`] : [];
}

const BUILDERS: Record<string, Builder> = {
  'website-creation': (c) => ({
    heading: `Τι περιλαμβάνει η κατασκευή ιστοσελίδας ${c.inCity}`,
    paragraphs: [
      `Ξεκινάμε από τον σκοπό του site και όχι από ένα έτοιμο θέμα: ποιες ενέργειες θέλετε να κάνει ο επισκέπτης, ποιες σελίδες υπηρεσιών χρειάζονται και πώς φτάνει κάποιος από την αναζήτηση στη φόρμα ή στο τηλέφωνο. Ο σχεδιασμός UX/UI γίνεται πάνω σε αυτή τη διαδρομή.`,
      `Η τεχνική βάση μπαίνει από την πρώτη μέρα, όχι εκ των υστέρων: γρήγορες σελίδες, πλήρης προσαρμογή σε κινητά, καθαρή δομή URL και ενσωματωμένες βάσεις SEO, ώστε το site να μπορεί να κατακτήσει θέσεις αντί να χρειάζεται ξαναχτίσιμο σε έναν χρόνο.`,
      ...hoodSentence(c, `Όπου η ζήτηση είναι σαφώς τοπική, χτίζουμε ξεχωριστές σελίδες ανά περιοχή αντί για μία γενική σελίδα «περιοχές εξυπηρέτησης» - για παράδειγμα`),
    ],
    deliverables: [
      'Σχεδιασμός UX/UI στα μέτρα σας',
      'Απόλυτα προσαρμοσμένο σε κινητά',
      'Ενσωματωμένες βάσεις SEO',
      'Ρύθμιση Google Analytics',
    ],
  }),

  'website-redesign': (c) => ({
    heading: `Ανασχεδιασμός χωρίς απώλεια θέσεων ${c.inCity}`,
    paragraphs: [
      `Ο κίνδυνος σε κάθε ανασχεδιασμό δεν είναι το γούστο, είναι η μεταφορά. Καταγράφουμε πρώτα ποιες URL φέρνουν ήδη επισκεψιμότητα και μετατροπές, ώστε ο νέος σχεδιασμός να μη σβήσει σελίδες που αποδίδουν και να μη σπάσει τις διευθύνσεις τους.`,
      `Στη συνέχεια γίνεται η ίδια η ανανέωση: σύγχρονος σχεδιασμός, αναδόμηση περιεχομένου γύρω από πραγματικά θέματα αναζήτησης, βελτιστοποίηση για κινητά και ταχύτητα. Οι ανακατευθύνσεις σχεδιάζονται 1:1 όπου υπάρχει αντίστοιχη σελίδα, ώστε η αξία των συνδέσμων να ακολουθήσει.`,
      `Μετά τη μετάβαση παρακολουθούμε ευρετηρίαση, θέσεις και επιδόσεις για να πιαστούν έγκαιρα τυχόν απώλειες, αντί να ανακαλυφθούν μήνες αργότερα.`,
    ],
    deliverables: [
      'Ασφαλής μεταφορά SEO',
      'Αναδόμηση περιεχομένου',
      'Βελτιστοποίηση ταχύτητας',
      'Έλεγχος επιδόσεων',
    ],
  }),

  'seo-web-design': (c) => ({
    heading: `Σχεδιασμός με SEO ${c.inCity}`,
    paragraphs: [
      `Ο σχεδιασμός και το SEO αποφασίζονται μαζί. Η αρχιτεκτονική της ιστοσελίδας - ποιες σελίδες υπάρχουν, πώς ομαδοποιούνται και πώς συνδέονται μεταξύ τους - καθορίζει τι μπορεί να καταταγεί, πολύ πριν γραφτεί το πρώτο κείμενο.`,
      `Πρακτικά αυτό σημαίνει τεχνικό έλεγχο SEO πάνω στο ίδιο το σχέδιο, schema markup για τις οντότητες της επιχείρησης, μελετημένη στρατηγική εσωτερικών συνδέσμων και meta ετικέτες γραμμένες ανά σελίδα αντί για αυτόματα πρότυπα.`,
      `Το αποτέλεσμα είναι ένα site που δεν χρειάζεται δεύτερο έργο «SEO βελτιστοποίησης» μετά την παράδοση.`,
    ],
    deliverables: [
      'Αρχιτεκτονική ιστοσελίδας',
      'Schema markup',
      'Στρατηγική εσωτερικών συνδέσμων',
      'Βελτιστοποίηση meta ετικετών',
    ],
  }),

  'speed-optimization': (c) => ({
    heading: `Βελτιστοποίηση ταχύτητας ${c.inCity}`,
    paragraphs: [
      `Ξεκινάμε με μέτρηση, όχι με εικασίες: έλεγχο επιδόσεων στα πραγματικά πρότυπα σελίδων σας για να φανεί τι κρατάει τον χρόνο φόρτωσης - εικόνες, scripts τρίτων, render-blocking πόροι ή ο ίδιος ο διακομιστής.`,
      `Οι παρεμβάσεις γίνονται στη σειρά που έχει σημασία: βελτιστοποίηση εικόνων, ρύθμιση caching, βελτιστοποίηση κώδικα και ιδιαίτερη προσοχή στην ταχύτητα σε κινητά, όπου γίνεται η μεγάλη πλειονότητα των τοπικών αναζητήσεων.`,
      `Μετράμε ξανά μετά την υλοποίηση, ώστε το κέρδος να είναι τεκμηριωμένο και όχι θεωρητικό.`,
    ],
    deliverables: [
      'Έλεγχος επιδόσεων',
      'Βελτιστοποίηση εικόνων',
      'Ρύθμιση caching',
      'Ταχύτητα σε κινητά',
    ],
  }),

  'ai-visibility': (c) => ({
    heading: `Ορατότητα σε AI αναζήτηση ${c.inCity}`,
    paragraphs: [
      `Όλο και περισσότερες αναζητήσεις απαντώνται μέσα στο αποτέλεσμα - σε AI Overviews, στο ChatGPT Search, στο Perplexity και στο Gemini - χωρίς κλικ σε ιστοσελίδα. Το ζητούμενο αλλάζει: δεν αρκεί να κατατάσσεστε, πρέπει να αναφέρεστε.`,
      `Δουλεύουμε σε δύο επίπεδα. GEO (generative engine optimization) για το πώς παρουσιάζεται η επιχείρηση ως οντότητα, με καθαρισμό οντοτήτων και schema. AEO για το να απαντούν οι σελίδες σας ευθέως στις ερωτήσεις που κάνουν οι χρήστες, σε μορφή που μια μηχανή μπορεί να παραθέσει.`,
      `Παρακολουθούμε αναφορές (AI mentions) ώστε να φαίνεται τι αλλάζει, και εφαρμόζουμε playbooks για τουρισμό και τοπικά brands όπου ταιριάζουν.`,
    ],
    deliverables: [
      'GEO / generative engine optimization',
      'AEO για AI Overviews & chat απαντήσεις',
      'Schema + καθαρισμός οντοτήτων',
      'Παρακολούθηση AI mentions',
    ],
  }),

  'logo-design': (c) => ({
    heading: `Σχεδιασμός λογοτύπου και εταιρικής ταυτότητας ${c.inCity}`,
    paragraphs: [
      `Το λογότυπο είναι το ένα στοιχείο που εμφανίζεται παντού: στο site, στο Google Business Profile, στα social, στα οχήματα, στα έντυπα. Σχεδιάζεται για να δουλεύει σε όλα αυτά τα μεγέθη, όχι μόνο σε μια παρουσίαση.`,
      `Παραδίδεται με τα βασικά στοιχεία που κάνουν την ταυτότητα εφαρμόσιμη: παλέτα χρωμάτων, τυπογραφία και οδηγό χρήσης, ώστε ο επόμενος σχεδιαστής ή τυπογράφος να μη χρειάζεται να μαντέψει.`,
      `Τα αρχεία δίνονται σε πολλαπλές μορφές, για ψηφιακή και για εκτυπωτική χρήση.`,
    ],
    deliverables: [
      'Σχεδιασμός λογοτύπου στα μέτρα σας',
      'Κιτ εταιρικής ταυτότητας',
      'Οδηγός χρήσης ταυτότητας',
      'Πολλαπλές μορφές αρχείων',
    ],
  }),

  'content-creation': (c) => ({
    heading: `Δημιουργία περιεχομένου ${c.inCity}`,
    paragraphs: [
      `Το περιεχόμενο ξεκινά από τη ζήτηση: ποιες ερωτήσεις κάνουν πραγματικά οι πελάτες σας πριν αγοράσουν και ποιες από αυτές δεν απαντά σήμερα καμία σελίδα σας. Από εκεί προκύπτει η στρατηγική περιεχομένου, όχι από ένα ημερολόγιο δημοσιεύσεων.`,
      `Γράφουμε τις σελίδες υπηρεσιών ώστε να εξηγούν τι ακριβώς προσφέρετε και σε ποιον, τοπικό περιεχόμενο όπου η αναζήτηση είναι γεωγραφική, και άρθρα blog για τα ερωτήματα που προηγούνται της αγοράς.`,
      `Κάθε κείμενο γράφεται με SEO αλλά με στόχο τη μετατροπή - μια σελίδα που κατατάσσεται και δεν πείθει δεν έχει κάνει τη δουλειά της.`,
    ],
    deliverables: [
      'Στρατηγική περιεχομένου',
      'Περιεχόμενο σελίδων υπηρεσιών',
      'Τοπικό περιεχόμενο',
      'Κείμενα που μετατρέπουν',
    ],
  }),

  'local-seo': (c) => ({
    heading: `Τοπικό SEO και Google Business Profile ${c.inCity}`,
    paragraphs: [
      `Οι τοπικές αναζητήσεις κρίνονται σε δύο σημεία: στον χάρτη της Google (map pack) και στα οργανικά αποτελέσματα κάτω από αυτόν. Το προφίλ σας και το site σας πρέπει να δουλεύουν μαζί για να εμφανίζεστε και στα δύο.`,
      `Ξεκινάμε από τη βελτιστοποίηση του Google Business Profile - κατηγορίες, υπηρεσίες, φωτογραφίες, ερωτήσεις - και από τη συνέπεια των τοπικών καταχωρήσεων και του NAP, γιατί οι αντιφάσεις σε επωνυμία, διεύθυνση και τηλέφωνο κοστίζουν εμπιστοσύνη στους αλγορίθμους.`,
      ...hoodSentence(c, `Παράλληλα χτίζουμε τοπικές λέξεις-κλειδιά και landing pages με στόχευση ανά περιοχή, όπου η ζήτηση το δικαιολογεί - για παράδειγμα`),
      `Η στρατηγική κριτικών κλείνει τον κύκλο: σταθερή ροή αξιολογήσεων και απαντήσεις σε αυτές, που μετράνε τόσο για την κατάταξη όσο και για το ποσοστό κλήσεων.`,
    ],
    deliverables: [
      'Βελτιστοποίηση Google Business Profile',
      'Τοπικές καταχωρήσεις (citations) & NAP',
      'Τοπικές λέξεις-κλειδιά & landing pages',
      'Στρατηγική κριτικών',
    ],
  }),

  'link-building': (c) => ({
    heading: `Δημιουργία backlinks ${c.inCity}`,
    paragraphs: [
      `Οι σύνδεσμοι μετράνε ακόμη, αλλά η ποιότητα έχει αντικαταστήσει τον όγκο. Στόχος είναι αναφορές από ιστοσελίδες που έχουν πραγματική σχέση με τον κλάδο σας ή με την περιοχή σας, όχι καταχωρήσεις σε καταλόγους χωρίς αναγνώστες.`,
      `Δουλεύουμε με guest posts σε ιστοσελίδες υψηλού κύρους, digital PR για αφορμές που αξίζει να καλυφθούν, και αξιοποίηση σπασμένων συνδέσμων όπου υπάρχει ήδη σχετικό περιεχόμενο που δείχνει σε νεκρή σελίδα.`,
      `Το anchor text σχεδιάζεται ώστε να μοιάζει φυσικό, και το προφίλ παρακολουθείται για spam συνδέσμους που θα μπορούσαν να βλάψουν αντί να βοηθήσουν.`,
    ],
    deliverables: [
      'Guest posts σε ιστοσελίδες υψηλού κύρους',
      'Digital PR',
      'Στρατηγική anchor text',
      'Παρακολούθηση για spam συνδέσμους',
    ],
  }),

  'seo-audits': (c) => ({
    heading: `Τι ελέγχει ο τεχνικός έλεγχος SEO ${c.inCity}`,
    paragraphs: [
      `Ο έλεγχος ξεκινά από τα θεμέλια: μπορεί η Google να διαβάσει και να ευρετηριάσει τις σελίδες που θέλετε, και μόνο αυτές. Εκεί εντοπίζονται τα προβλήματα που ακυρώνουν κάθε επόμενη προσπάθεια - διπλότυπα, λάθος canonical, σελίδες εκτός ευρετηρίου, σπασμένη εσωτερική δομή.`,
      `Ακολουθεί το on-page και το περιεχόμενο: ποιες σελίδες στοχεύουν το ίδιο ερώτημα και ανταγωνίζονται μεταξύ τους, πού λείπει κάλυψη, τι διορθώνεται σε τίτλους και επικεφαλίδες. Η έρευνα λέξεων-κλειδιών και η ανάλυση ανταγωνισμού δείχνουν πού υπάρχει ρεαλιστικό περιθώριο.`,
      `Τα Core Web Vitals και η ταχύτητα ελέγχονται ως ξεχωριστό κεφάλαιο, γιατί επηρεάζουν και την κατάταξη και τη μετατροπή.`,
      `Παραδίδουμε πλάνο προώθησης με ιεραρχημένες ενέργειες - τι πρώτο, τι μετά και γιατί - και μηνιαία αναφορά προόδου, όχι μια λίστα προειδοποιήσεων από εργαλείο.`,
    ],
    deliverables: [
      'Πλήρης τεχνικός SEO audit',
      'Core Web Vitals & ταχύτητα',
      'Έρευνα λέξεων-κλειδιών & ανάλυση ανταγωνισμού',
      'Πλάνο προώθησης & μηνιαία αναφορά',
    ],
  }),

  'eshop-woocommerce': (c) => ({
    heading: `Κατασκευή e-shop WooCommerce ${c.inCity}`,
    paragraphs: [
      `Ένα e-shop κρίνεται στα σημεία που δεν φαίνονται στην αρχική: πόσο γρήγορα βρίσκει κανείς το προϊόν, πόσα βήματα έχει το ταμείο και τι γίνεται όταν κάτι λείπει από το απόθεμα. Η εγκατάσταση και ρύθμιση WooCommerce γίνεται γύρω από αυτά.`,
      `Σχεδιάζουμε τις σελίδες προϊόντων ώστε να απαντούν τις ερωτήσεις που εμποδίζουν την αγορά, συνδέουμε πύλες πληρωμών και ρυθμίζουμε μεταφορικά και ολοκλήρωση παραγγελίας για τον τρόπο που στέλνετε πραγματικά.`,
      `Η δομή κατηγοριών σχεδιάζεται με SEO λογική από την αρχή, γιατί οι κατηγορίες - όχι η αρχική - είναι αυτές που κατατάσσονται για τις εμπορικές αναζητήσεις.`,
    ],
    deliverables: [
      'Εγκατάσταση & ρύθμιση WooCommerce',
      'Σύνδεση με πύλες πληρωμών',
      'Ρύθμιση μεταφορικών & ολοκλήρωσης παραγγελίας',
      'SEO δομή κατηγοριών',
    ],
  }),

  'eshop-seo': (c) => ({
    heading: `SEO για ηλεκτρονικό κατάστημα ${c.inCity}`,
    paragraphs: [
      `Το SEO σε e-shop είναι διαφορετικό πρόβλημα από το SEO σε εταιρικό site: εκατοντάδες σελίδες προϊόντων, φίλτρα που παράγουν διπλότυπα, κατηγορίες που ανταγωνίζονται μεταξύ τους και προϊόντα που εξαντλούνται. Ο τεχνικός έλεγχος για e-shop ξεκινά από εκεί.`,
      `Η βελτιστοποίηση εστιάζει στις σελίδες που πραγματικά φέρνουν εμπορική κίνηση - κατηγορίες και προϊόντα - με έρευνα λέξεων-κλειδιών e-commerce και schema markup προϊόντων (JSON-LD) ώστε τιμή και διαθεσιμότητα να εμφανίζονται στα αποτελέσματα.`,
      `Ταχύτητα και βελτιστοποίηση για κινητά μετράνε δυσανάλογα εδώ, γιατί επηρεάζουν άμεσα το ποσοστό εγκατάλειψης καλαθιού. Το CRO δουλεύεται μαζί με το SEO, όχι μετά.`,
    ],
    deliverables: [
      'Τεχνικός έλεγχος για e-shop',
      'Βελτιστοποίηση κατηγοριών & προϊόντων',
      'Schema markup προϊόντων (JSON-LD)',
      'Βελτιστοποίηση ποσοστού μετατροπής (CRO)',
    ],
  }),
};

/** Extra paragraph for tourism markets, appended only where the service benefits. */
const TOURISM_SERVICES = new Set([
  'website-creation',
  'website-redesign',
  'seo-web-design',
  'local-seo',
  'ai-visibility',
  'content-creation',
  'seo-audits',
]);

const TOURISM_PARAGRAPH =
  'Σε αγορές φιλοξενίας και τουρισμού η αναζήτηση είναι εποχική και συχνά ξενόγλωσση: η ζήτηση χτίζεται μήνες πριν την άφιξη και μεγάλο μέρος της περνά από OTA. Δουλεύουμε ώστε οι απευθείας κρατήσεις να μη χάνονται σε αυτή τη διαδρομή, με πολυγλωσσική στόχευση εκεί που υπάρχει πραγματική ζήτηση.';

/**
 * Service-specific Greek copy for a service × location page.
 * Returns `null` for services with no authored block, so the caller can fall
 * back rather than render a generic paragraph with the name swapped in.
 */
export function getServiceCopyEl(
  serviceSlug: string,
  ctx: ServiceCopyContext,
): ServiceCopyBlock | null {
  const build = BUILDERS[serviceSlug];
  if (!build) return null;
  const block = build(ctx);
  const paragraphs =
    ctx.tourism && TOURISM_SERVICES.has(serviceSlug)
      ? [...block.paragraphs, TOURISM_PARAGRAPH]
      : block.paragraphs;
  return { ...block, paragraphs };
}

/** Slugs with authored service copy, for the indexability gate. */
export const SERVICES_WITH_EL_COPY = new Set(Object.keys(BUILDERS));
