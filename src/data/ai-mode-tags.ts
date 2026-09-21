/**
 * The AI Mode tag vocabulary, and what a page has to expose to ground it.
 *
 * Source: Dan Petrovic (DEJAN AI), "AI Mode Tags: FollowUp, Generate, Layout,
 * Entity List and @prompt_leaks.ignore", 20 September 2026.
 *
 * Read the direction of this carefully, because it is the whole point: these
 * tags are what the *model* emits so Google's front-end can render a card. A
 * website never writes one. Our only lever is to be the source the card is
 * built from - which turns the article's "required grounding attributes"
 * column into a checklist of what a page must expose for a given card to
 * render at all, and its two render rules into conditions we can measure.
 *
 * The source is reverse-engineered from prompt leaks, not a published spec,
 * and parts of it are visibly the author's own synthesis rather than leaked
 * material. So every row carries a `confidence`, and nothing downstream may
 * state an `inferred` row as fact. The harder rule, which is what makes this
 * safe to ship at all: every attribute listed here has to be worth adding as
 * ordinary structured-data practice even if this vocabulary changes tomorrow.
 * Anything that was only justified by the leak did not get a row.
 *
 * Consumed by the glossary and compare schema, the live audit's `ai` pillar
 * checks, the AI Mode blog post, and `scripts/ai-mode-audit.mjs`.
 */

/**
 * Bilingual copy. Structurally identical to `Localized` in
 * `src/lib/audit/types.ts` on purpose, so audit checks can render these
 * strings straight through without a mapping layer. Declared here rather than
 * imported so `src/data` keeps pointing at nothing in `src/lib`.
 */
export interface Localized {
  readonly en: string;
  readonly el: string;
}

/**
 * Tags observed in the source. `layout:*` flattens the polymorphic
 * `<layout type="...">` wrapper into distinct members, since the three types
 * ask for genuinely different things from a page.
 */
export type AiModeTag =
  | 'FollowUp'
  | 'Generate'
  | 'layout:map'
  | 'layout:comparison'
  | 'layout:inspiration'
  | 'List'
  | 'Carousel'
  | 'ImageGrid'
  | 'Image'
  | 'Product'
  | 'ShoppingOffers'
  | 'Event'
  | 'FlightStatus'
  | 'Video'
  | 'DataViz'
  | 'Widget'
  | 'InlineQuiz'
  | 'Python'
  | 'File';

/** The 30 entity types, verbatim from the source. */
export type AiModeEntityType =
  | 'PhysicalCampusOrSchoolSite'
  | 'LodgingPlace'
  | 'PhysicalStoreOrLocalBusiness'
  | 'FranchiseOrChainLocation'
  | 'LocalServiceOrTradeBusiness'
  | 'PublicVenueOrLandmark'
  | 'Corporation'
  | 'TheatricalWork'
  | 'VisualArtObject'
  | 'RealWorldGeographicArea'
  | 'SkuLevelProduct'
  | 'SpecificPurchasableElectronics'
  | 'SpecificPurchasableEquipment'
  | 'SpecificPurchasableSoftwareSystem'
  | 'FinancialProductOrService'
  | 'ShoppingBrand'
  | 'VehicleModel'
  | 'Book'
  | 'AnimalSpeciesOrBreed'
  | 'SpecificIndividualAnimal'
  | 'Movie'
  | 'TvShow'
  | 'VideoGame'
  | 'SpecificPerson'
  | 'FictionalCharacter'
  | 'SportsTeam'
  | 'VirtualOrFictionalPlace'
  | 'CelestialBody'
  | 'Event'
  | 'Other';

/**
 * How far a claim is from the source.
 *
 * - `observed` - stated outright in the article.
 * - `inferred` - our mapping onto schema.org, or our reading of what a stated
 *   attribute means in practice. Not to be presented as documented fact.
 */
export type SourceConfidence = 'observed' | 'inferred';

/** One thing a page has to expose for a card to have something to render. */
export interface GroundingAttribute {
  readonly id: string;
  readonly label: Localized;
  /** Best-fit schema.org property path, e.g. `geo.latitude`, `offers.price`. */
  readonly schemaProperty: string;
  /** False where the card still renders without it, but renders thinner. */
  readonly required: boolean;
}

export interface EntityTypeSpec {
  readonly type: AiModeEntityType;
  /** The layout the source pairs this entity type with. */
  readonly dominantLayout: AiModeTag;
  /** Our schema.org mapping. Always `inferred` - the source names no schema types. */
  readonly schemaOrgTypes: readonly string[];
  readonly grounding: readonly GroundingAttribute[];
  /**
   * Whether anotherseoguru.com has a page that genuinely is this entity.
   * The 24 falses are kept rather than deleted so the reasoning stays visible:
   * we decided they do not apply, we did not overlook them.
   */
  readonly appliesToOurSite: boolean;
  /** `Category:` values in `docs/portfolio-audits/*.md` this type serves. */
  readonly clientVerticals: readonly string[];
  readonly confidence: SourceConfidence;
  /** Why it does or does not apply. Shown in the rubric, not in page copy. */
  readonly note?: string;
}

/**
 * The two structural rules the source states, and the only two claims in it
 * that are directly measurable on a page.
 */
export const RENDER_RULES = {
  /** `<Carousel>` / `<ImageGrid>` flatten below this many validated children. */
  minChildren: 3,
  /** Mixed entity types in one container degrade it to markdown bullets. */
  requiresHomogeneousType: true,
} as const;

const geoCoordinates: GroundingAttribute = {
  id: 'geo',
  label: { en: 'Geo coordinates', el: 'Γεωγραφικές συντεταγμένες' },
  schemaProperty: 'geo.latitude / geo.longitude',
  required: true,
};

const postalAddress: GroundingAttribute = {
  id: 'address',
  label: { en: 'Postal address', el: 'Ταχυδρομική διεύθυνση' },
  schemaProperty: 'address',
  required: true,
};

const openingHours: GroundingAttribute = {
  id: 'hours',
  label: { en: 'Opening hours', el: 'Ώρες λειτουργίας' },
  schemaProperty: 'openingHoursSpecification',
  required: true,
};

export const AI_MODE_ENTITY_TYPES: readonly EntityTypeSpec[] = [
  {
    type: 'PhysicalCampusOrSchoolSite',
    dominantLayout: 'layout:map',
    schemaOrgTypes: ['EducationalOrganization', 'Place'],
    grounding: [
      geoCoordinates,
      {
        id: 'enrollment',
        label: { en: 'Enrolment size', el: 'Αριθμός φοιτητών' },
        schemaProperty: 'numberOfStudents',
        required: false,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
    note: 'No education clients and no campus pages.',
  },
  {
    type: 'LodgingPlace',
    dominantLayout: 'Carousel',
    schemaOrgTypes: ['Hotel', 'LodgingBusiness', 'VacationRental'],
    grounding: [
      {
        id: 'price_per_night',
        label: { en: 'Price per night', el: 'Τιμή ανά διανυκτέρευση' },
        schemaProperty: 'priceRange / offers.price',
        required: true,
      },
      {
        id: 'review_score',
        label: { en: 'Review score', el: 'Βαθμολογία κριτικών' },
        schemaProperty: 'aggregateRating',
        required: false,
      },
      {
        id: 'images',
        label: { en: 'Three or more images', el: 'Τρεις ή περισσότερες εικόνες' },
        schemaProperty: 'image[]',
        required: true,
      },
      geoCoordinates,
    ],
    appliesToOurSite: false,
    clientVerticals: ['hotel', 'villa'],
    confidence: 'observed',
    note:
      'aggregateRating is legitimate here only from genuine, sourced review data. ' +
      'The no-review-markup rule in this repo is about self-serving first-party ' +
      'markup on our own pages, not about a hotel publishing its real ratings.',
  },
  {
    type: 'PhysicalStoreOrLocalBusiness',
    dominantLayout: 'layout:map',
    schemaOrgTypes: ['LocalBusiness', 'Restaurant', 'Store'],
    grounding: [postalAddress, openingHours, geoCoordinates],
    appliesToOurSite: false,
    clientVerticals: ['restaurant'],
    confidence: 'observed',
  },
  {
    type: 'FranchiseOrChainLocation',
    dominantLayout: 'layout:map',
    schemaOrgTypes: ['LocalBusiness', 'Organization'],
    grounding: [
      {
        id: 'branch_code',
        label: { en: 'Branch or store ID', el: 'Κωδικός καταστήματος' },
        schemaProperty: 'branchCode',
        required: true,
      },
      {
        id: 'parent',
        label: { en: 'Parent organisation', el: 'Μητρικός οργανισμός' },
        schemaProperty: 'parentOrganization',
        required: true,
      },
      postalAddress,
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
    note: 'Clients are independent operators, not chain branches.',
  },
  {
    type: 'LocalServiceOrTradeBusiness',
    dominantLayout: 'List',
    schemaOrgTypes: ['ProfessionalService', 'LocalBusiness', 'Service'],
    grounding: [
      {
        id: 'area_served',
        label: { en: 'Service area', el: 'Περιοχή εξυπηρέτησης' },
        schemaProperty: 'areaServed',
        required: true,
      },
      {
        id: 'service_type',
        label: { en: 'Service type', el: 'Τύπος υπηρεσίας' },
        schemaProperty: 'serviceType',
        required: true,
      },
      {
        id: 'credential',
        label: { en: 'Licence or registration', el: 'Άδεια ή αριθμός μητρώου' },
        schemaProperty: 'hasCredential / identifier',
        required: false,
      },
    ],
    appliesToOurSite: true,
    clientVerticals: ['rent-a-car', 'transfers', 'travel-ai'],
    confidence: 'observed',
    note: 'What every /services/[service] and /services/[service]/[location] page is.',
  },
  {
    type: 'PublicVenueOrLandmark',
    dominantLayout: 'layout:map',
    schemaOrgTypes: ['TouristAttraction', 'Place', 'LandmarksOrHistoricalBuildings'],
    grounding: [geoCoordinates, openingHours],
    appliesToOurSite: false,
    clientVerticals: ['tours'],
    confidence: 'observed',
  },
  {
    type: 'Corporation',
    dominantLayout: 'List',
    schemaOrgTypes: ['Organization', 'Corporation'],
    grounding: [
      {
        id: 'legal_name',
        label: { en: 'Legal name', el: 'Νομική επωνυμία' },
        schemaProperty: 'legalName',
        required: true,
      },
      {
        id: 'hq',
        label: { en: 'Headquarters location', el: 'Έδρα' },
        schemaProperty: 'address',
        required: true,
      },
      {
        id: 'same_as',
        label: { en: 'Profile links', el: 'Σύνδεσμοι προφίλ' },
        schemaProperty: 'sameAs[]',
        required: true,
      },
    ],
    appliesToOurSite: true,
    clientVerticals: [],
    confidence: 'observed',
    note: 'Already satisfied by the sitewide @graph in src/app/[locale]/layout.tsx.',
  },
  {
    type: 'TheatricalWork',
    dominantLayout: 'List',
    schemaOrgTypes: ['TheaterEvent', 'CreativeWork'],
    grounding: [
      {
        id: 'performance_dates',
        label: { en: 'Performance dates', el: 'Ημερομηνίες παραστάσεων' },
        schemaProperty: 'startDate',
        required: true,
      },
      {
        id: 'director',
        label: { en: 'Director', el: 'Σκηνοθεσία' },
        schemaProperty: 'director',
        required: false,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'VisualArtObject',
    dominantLayout: 'ImageGrid',
    schemaOrgTypes: ['VisualArtwork'],
    grounding: [
      {
        id: 'artist',
        label: { en: 'Artist', el: 'Καλλιτέχνης' },
        schemaProperty: 'creator',
        required: true,
      },
      {
        id: 'images',
        label: { en: 'Three or more images', el: 'Τρεις ή περισσότερες εικόνες' },
        schemaProperty: 'image[]',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'RealWorldGeographicArea',
    dominantLayout: 'layout:map',
    schemaOrgTypes: ['Place', 'AdministrativeArea'],
    grounding: [
      geoCoordinates,
      {
        id: 'contained_in',
        label: { en: 'Containing region', el: 'Ευρύτερη περιοχή' },
        schemaProperty: 'containedInPlace',
        required: false,
      },
    ],
    appliesToOurSite: true,
    clientVerticals: [],
    confidence: 'observed',
    note: 'The /locations surface and the service-by-location matrix.',
  },
  {
    type: 'SkuLevelProduct',
    dominantLayout: 'ShoppingOffers',
    schemaOrgTypes: ['Product', 'Offer'],
    grounding: [
      {
        id: 'gtin',
        label: { en: 'GTIN', el: 'GTIN' },
        schemaProperty: 'gtin13',
        required: true,
      },
      {
        id: 'brand',
        label: { en: 'Manufacturer or brand', el: 'Κατασκευαστής ή brand' },
        schemaProperty: 'brand',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
    note: 'We sell services and a subscription, not SKUs.',
  },
  {
    type: 'SpecificPurchasableElectronics',
    dominantLayout: 'ShoppingOffers',
    schemaOrgTypes: ['Product'],
    grounding: [
      {
        id: 'mpn',
        label: { en: 'Model number', el: 'Κωδικός μοντέλου' },
        schemaProperty: 'mpn',
        required: true,
      },
      {
        id: 'warranty',
        label: { en: 'Warranty', el: 'Εγγύηση' },
        schemaProperty: 'warranty',
        required: false,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'SpecificPurchasableEquipment',
    dominantLayout: 'List',
    schemaOrgTypes: ['Product'],
    grounding: [
      {
        id: 'spec',
        label: { en: 'Technical rating', el: 'Τεχνικά χαρακτηριστικά' },
        schemaProperty: 'additionalProperty',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'SpecificPurchasableSoftwareSystem',
    dominantLayout: 'layout:comparison',
    schemaOrgTypes: ['SoftwareApplication'],
    grounding: [
      {
        id: 'feature_list',
        label: { en: 'Feature list', el: 'Λίστα δυνατοτήτων' },
        schemaProperty: 'featureList',
        required: true,
      },
      {
        id: 'license',
        label: { en: 'Licence or plan', el: 'Άδεια ή πλάνο' },
        schemaProperty: 'offers',
        required: true,
      },
      {
        id: 'os',
        label: { en: 'Platform compatibility', el: 'Συμβατότητα πλατφόρμας' },
        schemaProperty: 'operatingSystem',
        required: true,
      },
    ],
    appliesToOurSite: true,
    clientVerticals: [],
    confidence: 'observed',
    note: 'The /platform surface, and what /compare/[slug] is comparing.',
  },
  {
    type: 'FinancialProductOrService',
    dominantLayout: 'layout:comparison',
    schemaOrgTypes: ['FinancialProduct'],
    grounding: [
      {
        id: 'rate',
        label: { en: 'Rate', el: 'Επιτόκιο' },
        schemaProperty: 'interestRate',
        required: true,
      },
      {
        id: 'fees',
        label: { en: 'Fees and disclaimers', el: 'Χρεώσεις και όροι' },
        schemaProperty: 'feesAndCommissionsSpecification',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
    note: 'Agency retainers are priced services, not financial products.',
  },
  {
    type: 'ShoppingBrand',
    dominantLayout: 'Carousel',
    schemaOrgTypes: ['Brand', 'Organization'],
    grounding: [
      {
        id: 'parent',
        label: { en: 'Parent entity', el: 'Μητρική οντότητα' },
        schemaProperty: 'parentOrganization',
        required: false,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'VehicleModel',
    dominantLayout: 'layout:comparison',
    schemaOrgTypes: ['Car', 'Vehicle', 'Product'],
    grounding: [
      {
        id: 'trim',
        label: { en: 'Trim or category', el: 'Έκδοση ή κατηγορία' },
        schemaProperty: 'vehicleConfiguration',
        required: true,
      },
      {
        id: 'efficiency',
        label: { en: 'Fuel or EV efficiency', el: 'Κατανάλωση ή αυτονομία' },
        schemaProperty: 'fuelEfficiency / fuelType',
        required: true,
      },
      {
        id: 'transmission',
        label: { en: 'Transmission and seats', el: 'Κιβώτιο και θέσεις' },
        schemaProperty: 'vehicleTransmission / seatingCapacity',
        required: true,
      },
      {
        id: 'rate',
        label: { en: 'Daily rate', el: 'Ημερήσια τιμή' },
        schemaProperty: 'offers.price',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: ['rent-a-car'],
    confidence: 'observed',
    note:
      'The largest client vertical. A fleet page is a comparison surface whether ' +
      'or not it is marked up as one.',
  },
  {
    type: 'Book',
    dominantLayout: 'List',
    schemaOrgTypes: ['Book'],
    grounding: [
      {
        id: 'isbn',
        label: { en: 'ISBN', el: 'ISBN' },
        schemaProperty: 'isbn',
        required: true,
      },
      {
        id: 'author',
        label: { en: 'Author', el: 'Συγγραφέας' },
        schemaProperty: 'author',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'AnimalSpeciesOrBreed',
    dominantLayout: 'Carousel',
    schemaOrgTypes: ['Taxon'],
    grounding: [
      {
        id: 'taxon',
        label: { en: 'Taxonomic status', el: 'Ταξινομική κατάταξη' },
        schemaProperty: 'taxonRank',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'SpecificIndividualAnimal',
    dominantLayout: 'List',
    schemaOrgTypes: ['Thing'],
    grounding: [
      {
        id: 'registry',
        label: { en: 'Registry identifier', el: 'Αναγνωριστικό μητρώου' },
        schemaProperty: 'identifier',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'Movie',
    dominantLayout: 'Video',
    schemaOrgTypes: ['Movie'],
    grounding: [
      {
        id: 'production',
        label: { en: 'Studio and year', el: 'Παραγωγή και έτος' },
        schemaProperty: 'productionCompany / datePublished',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'TvShow',
    dominantLayout: 'Video',
    schemaOrgTypes: ['TVSeries'],
    grounding: [
      {
        id: 'seasons',
        label: { en: 'Network and season count', el: 'Δίκτυο και αριθμός κύκλων' },
        schemaProperty: 'numberOfSeasons',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'VideoGame',
    dominantLayout: 'Widget',
    schemaOrgTypes: ['VideoGame'],
    grounding: [
      {
        id: 'platform',
        label: { en: 'Developer and platform', el: 'Developer και πλατφόρμα' },
        schemaProperty: 'gamePlatform',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'SpecificPerson',
    dominantLayout: 'List',
    schemaOrgTypes: ['Person'],
    grounding: [
      {
        id: 'name',
        label: { en: 'Name', el: 'Ονοματεπώνυμο' },
        schemaProperty: 'name',
        required: true,
      },
      {
        id: 'role',
        label: { en: 'Role', el: 'Ρόλος' },
        schemaProperty: 'jobTitle',
        required: true,
      },
      {
        id: 'bio',
        label: { en: 'Biography', el: 'Βιογραφικό' },
        schemaProperty: 'description / knowsAbout',
        required: true,
      },
      {
        id: 'same_as',
        label: { en: 'Profile links', el: 'Σύνδεσμοι προφίλ' },
        schemaProperty: 'sameAs[]',
        required: false,
      },
    ],
    appliesToOurSite: true,
    clientVerticals: [],
    confidence: 'observed',
    note:
      'Converges with the open item in docs/seo-2026/README.md: the site has no ' +
      'Person schema, no author bios and no team page.',
  },
  {
    type: 'FictionalCharacter',
    dominantLayout: 'List',
    schemaOrgTypes: ['Person', 'CreativeWork'],
    grounding: [
      {
        id: 'ip_owner',
        label: { en: 'Rights holder', el: 'Κάτοχος δικαιωμάτων' },
        schemaProperty: 'copyrightHolder',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'SportsTeam',
    dominantLayout: 'List',
    schemaOrgTypes: ['SportsTeam'],
    grounding: [
      {
        id: 'league',
        label: { en: 'League', el: 'Πρωτάθλημα' },
        schemaProperty: 'memberOf',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'VirtualOrFictionalPlace',
    dominantLayout: 'List',
    schemaOrgTypes: ['Place', 'CreativeWork'],
    grounding: [
      {
        id: 'origin',
        label: { en: 'Work of origin', el: 'Έργο προέλευσης' },
        schemaProperty: 'isPartOf',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'CelestialBody',
    dominantLayout: 'DataViz',
    schemaOrgTypes: ['Thing'],
    grounding: [
      {
        id: 'orbital',
        label: { en: 'Mass and orbital data', el: 'Μάζα και τροχιακά δεδομένα' },
        schemaProperty: 'additionalProperty',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: [],
    confidence: 'observed',
  },
  {
    type: 'Event',
    dominantLayout: 'Event',
    schemaOrgTypes: ['Event', 'TouristTrip'],
    grounding: [
      {
        id: 'start',
        label: { en: 'Start date and time', el: 'Ημερομηνία και ώρα έναρξης' },
        schemaProperty: 'startDate',
        required: true,
      },
      {
        id: 'location',
        label: { en: 'Venue with coordinates', el: 'Τοποθεσία με συντεταγμένες' },
        schemaProperty: 'location.geo',
        required: true,
      },
      {
        id: 'offers',
        label: { en: 'Ticket price and availability', el: 'Τιμή και διαθεσιμότητα εισιτηρίου' },
        schemaProperty: 'offers.price / offers.availability',
        required: true,
      },
    ],
    appliesToOurSite: false,
    clientVerticals: ['tours'],
    confidence: 'observed',
    note:
      'Scheduled departures are events. Second-largest client vertical, and the ' +
      'one where a missing startDate costs the most.',
  },
  {
    type: 'Other',
    dominantLayout: 'List',
    schemaOrgTypes: ['Thing', 'DefinedTerm', 'DefinedTermSet'],
    grounding: [
      {
        id: 'definition',
        label: { en: 'Definition', el: 'Ορισμός' },
        schemaProperty: 'description',
        required: true,
      },
      {
        id: 'term_set',
        label: { en: 'Parent term set', el: 'Σύνολο όρων' },
        schemaProperty: 'inDefinedTermSet',
        required: false,
      },
    ],
    appliesToOurSite: true,
    clientVerticals: [],
    confidence: 'inferred',
    note:
      'The source treats Other as an unclassified fallback. Mapping it to ' +
      'DefinedTerm is ours, and it is what makes the glossary groundable.',
  },
];

/** Entity types with a page on this site. */
export function ourEntityTypes(): readonly EntityTypeSpec[] {
  return AI_MODE_ENTITY_TYPES.filter((e) => e.appliesToOurSite);
}

/**
 * Reverse lookup from a schema.org `@type` seen on a page. First match wins,
 * so the list order above doubles as precedence.
 */
export function entityTypeForSchemaType(schemaType: string): EntityTypeSpec | undefined {
  const needle = schemaType.toLowerCase();
  return AI_MODE_ENTITY_TYPES.find((e) =>
    e.schemaOrgTypes.some((t) => t.toLowerCase() === needle),
  );
}

/** Entity types serving a `Category:` value from `docs/portfolio-audits/*.md`. */
export function entityTypesForVertical(category: string): readonly EntityTypeSpec[] {
  const needle = category.trim().toLowerCase();
  return AI_MODE_ENTITY_TYPES.filter((e) =>
    e.clientVerticals.some((v) => v.toLowerCase() === needle),
  );
}

/** Required attributes only - what the rubric and the audit checks gate on. */
export function requiredGrounding(spec: EntityTypeSpec): readonly GroundingAttribute[] {
  return spec.grounding.filter((g) => g.required);
}

/**
 * What a portfolio client's business *is*, for the `about` node on its case
 * study at `/work/[slug]`.
 *
 * Read alongside `clientVerticals` above, which answers a different question
 * and so gives different answers. This map says what the business is, and it
 * is the only one of the two that produces markup we publish. `clientVerticals`
 * says which card a client's *own* site could ground if it published the right
 * content - a rental firm is an AutoRental either way, but it only grounds a
 * VehicleModel comparison if it publishes per-model pages, and a tour operator
 * only grounds an Event if it publishes dated departures. Most publish
 * neither, which is why that mapping belongs in a rubric we advise from and
 * not in schema we emit.
 */
export const PORTFOLIO_ENTITY_MAP: Readonly<
  Record<string, { readonly schemaType: string; readonly entity: AiModeEntityType }>
> = {
  hotel: { schemaType: 'LodgingBusiness', entity: 'LodgingPlace' },
  villa: { schemaType: 'LodgingBusiness', entity: 'LodgingPlace' },
  'rent-a-car': { schemaType: 'AutoRental', entity: 'LocalServiceOrTradeBusiness' },
  restaurant: { schemaType: 'Restaurant', entity: 'PhysicalStoreOrLocalBusiness' },
  tours: { schemaType: 'TravelAgency', entity: 'LocalServiceOrTradeBusiness' },
  transfers: { schemaType: 'LocalBusiness', entity: 'LocalServiceOrTradeBusiness' },
  'travel-ai': { schemaType: 'Organization', entity: 'Corporation' },
  other: { schemaType: 'Organization', entity: 'Corporation' },
};

/** Falls back to Organization, which is true of every client. */
export function schemaTypeForPortfolioCategory(category: string): string {
  return PORTFOLIO_ENTITY_MAP[category]?.schemaType ?? 'Organization';
}
