/** Greek agency articles served on the agency domain when its domain switch is enabled. */
export const AGENCY_GUIDE_GROUPS = [
  {
    title: "Πριν αναθέσετε την ιστοσελίδα σας",
    description: "Τι να βάλετε στον προϋπολογισμό, τι να ζητήσετε στην προσφορά και τι να προσέξετε αν έχετε ήδη ιστότοπο.",
    slugs: [
      "poso-kostizei-mia-istoselida",
      "dimiourgia-istoselidas",
      "etaireia-kataskevis-istoselidon",
      "anasxediasmos-istoselidas",
    ],
    related: { label: "Δείτε τι περιλαμβάνουν τα πακέτα κατασκευής", href: "/el/ypiresies/times" },
  },
  {
    title: "Πριν ανοίξετε ηλεκτρονικό κατάστημα",
    description: "Από τον κατάλογο προϊόντων μέχρι την πρώτη παραγγελία, δείτε τι χρειάζεται να οργανώσετε πριν ζητήσετε προσφορά.",
    slugs: ["kataskevi-eshop-odigos", "ti-xreiazetai-gia-eshop"],
    related: { label: "Ζητήστε προσφορά για το ηλεκτρονικό σας κατάστημα", href: "/el/get-started?service=website" },
  },
  {
    title: "Όταν σκέφτεστε να επενδύσετε στο SEO",
    description: "Συγκρίνετε το SEO με τις διαφημίσεις, δείτε πώς διαμορφώνεται μια αμοιβή και ποιες ερωτήσεις αξίζει να κάνετε στον επόμενο συνεργάτη σας.",
    slugs: [
      "poso-kostizei-to-seo",
      "pos-na-epilexete-etaireia-seo",
      "seo-i-google-ads",
      "seo-stratigiki-mikres-epicheiriseis",
    ],
    related: { label: "Συγκρίνετε τα μηνιαία πακέτα SEO", href: "/el/ypiresies/times" },
  },
  {
    title: "Για κρατήσεις από τον δικό σας ιστότοπο",
    description: "Τι χρειάζεται να βρει ένας ταξιδιώτης πριν κλείσει δωμάτιο ή αυτοκίνητο και πώς θα φτάσει από την αναζήτηση στη δική σας σελίδα.",
    slugs: [
      "kataskevi-istoselidas-xenodoxeia",
      "seo-gia-xenodoxeia",
      "istoselida-enikiasis-autokinitou-seo",
      "sxediasmos-istoselidas-tourismos-2026",
      "topiko-seo-kykladon",
      "topiko-seo-kriti",
    ],
    related: { label: "Δείτε έργα που έχουμε παραδώσει", href: "/el/work" },
  },
  {
    title: "Για να σας βρίσκουν οι πελάτες της περιοχής σας",
    description: "Πώς παρουσιάζετε σωστά την επιχείρησή σας στους Χάρτες Google και ποιες πληροφορίες ψάχνει ο πελάτης πριν σας καλέσει ή σας επισκεφθεί.",
    slugs: [
      "epixeirisi-sto-google-maps",
      "topiko-seo-athina",
      "topiko-seo-thessaloniki",
      "seo-gia-estiatoria",
      "seo-gia-odontiatrous",
      "seo-gia-akinita",
      "seo-gia-dikigorous",
      "seo-gia-gymnastiria",
    ],
    related: { label: "Ζητήστε έναν πρώτο έλεγχο του ιστότοπού σας", href: "/el/get-started#free-audit" },
  },
] as const;

const agencyGuideSlugs = new Set<string>([
  ...AGENCY_GUIDE_GROUPS.flatMap((group) => [...group.slugs]),
  // This agency campaign stays accessible without entering the evergreen guide directory.
  "black-month-istoselides-seo-2026",
]);

export function isAgencyGuideSlug(slug: string): boolean {
  return agencyGuideSlugs.has(slug);
}
