export const solutionsUi = {
  en: {
    home: 'Home',
    getQuote: 'Request a quote',
    customerNeeds: 'What your customers need to know',
    projectQuote: 'A quote for your website',
    quoteInstructions: 'Send us your site and tell us what you would like customers to do there. We can suggest where to start and price the work.',
    solutions: 'Solutions',
    websiteSolutionsFor: 'Website Solutions for',
    viewServices: 'View Services',
    servicesFor: (name: string) => `Services for ${name}`,
    learnMore: 'Learn more →',
    byCity: (name: string) => `${name} Websites by City`,
    locationsIntro: (name: string) =>
      `Website services by location for ${name.toLowerCase()}.`,
    relatedIndustries: 'Related Industries',
    freeQuote: 'Get Free Quote',
    // Industry × service page
    serviceForIndustry: (service: string, industry: string) => `${service} for ${industry}`,
    allIndustryServices: (industry: string) => `All ${industry} Services`,
    whatsIncluded: (industry: string) => `What's Included for ${industry}`,
    builtFor: (industry: string) => `Customer priorities for ${industry}`,
    byCityService: (service: string, industry: string) => `${service} for ${industry} by City`,
    byCityServiceDesc: (industry: string, isEl: boolean) =>
      isEl
        ? `Υπηρεσίες για ${industry} ανά περιοχή.`
        : `Explore this service by area.`,
    otherServicesFor: (industry: string) => `Other Services for ${industry}`,
    serviceForOtherIndustries: (service: string) => `${service} for Other Industries`,
    readyForService: (service: string) => `Ready for ${service}?`,
  },
  el: {
    home: 'Αρχική',
    getQuote: 'Ζητήστε προσφορά',
    customerNeeds: 'Τι χρειάζεται να γνωρίζει ο πελάτης',
    projectQuote: 'Προσφορά για την ιστοσελίδα σας',
    quoteInstructions: 'Στείλτε μας την ιστοσελίδα σας και πείτε μας τι θα θέλατε να κάνει ο πελάτης όταν τη βρίσκει. Θα σας προτείνουμε από πού να ξεκινήσετε και θα υπολογίσουμε το κόστος.',
    solutions: 'Κλάδοι',
    websiteSolutionsFor: 'Ιστοσελίδες για',
    viewServices: 'Δείτε υπηρεσίες',
    servicesFor: (name: string) => `Υπηρεσίες για ${name}`,
    learnMore: 'Μάθετε περισσότερα →',
    byCity: (name: string) => `${name} - ανά πόλη / νησί`,
    locationsIntro: (name: string) => `Τοπικές υπηρεσίες ιστοσελίδας και SEO για ${name} σε όλη την Ελλάδα.`,
    relatedIndustries: 'Σχετικοί κλάδοι',
    freeQuote: 'Δωρεάν προσφορά',
    serviceForIndustry: (service: string, industry: string) => `${service} για ${industry}`,
    allIndustryServices: (industry: string) => `Όλες οι υπηρεσίες για ${industry}`,
    whatsIncluded: (industry: string) => `Τι περιλαμβάνεται για ${industry}`,
    builtFor: () => `Τι χρειάζονται οι πελάτες σας`,
    byCityService: (service: string, industry: string) => `${service} - ${industry} ανά πόλη`,
    byCityServiceDesc: (industry: string, isEl: boolean) =>
      isEl
        ? `Υπηρεσίες για ${industry} ανά περιοχή.`
        : `Τοπικές υπηρεσίες για ${industry}.`,
    otherServicesFor: (industry: string) => `Άλλες υπηρεσίες για ${industry}`,
    serviceForOtherIndustries: (service: string) => `${service} - άλλοι κλάδοι`,
    readyForService: (service: string) => `Έτοιμοι για ${service};`,
  },
} as const;
