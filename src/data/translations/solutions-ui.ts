export const solutionsUi = {
  en: {
    home: 'Home',
    solutions: 'Solutions',
    websiteSolutionsFor: 'Website Solutions for',
    getQuoteFor: (name: string) => `Get ${name} Quote`,
    viewServices: 'View Services',
    whatWebsitesNeed: (name: string) => `What ${name} Websites Need`,
    painIntro: (name: string) =>
      `We understand the unique challenges and requirements of ${name.toLowerCase()} businesses.`,
    servicesFor: (name: string) => `Services for ${name}`,
    servicesIntro: (name: string) =>
      `Choose the service that best fits your ${name.toLowerCase()} business needs.`,
    learnMore: 'Learn more →',
    byCity: (name: string) => `${name} Websites by City`,
    locationsIntro: (name: string, _isEl: boolean) =>
      `Local ${name.toLowerCase()} website services across the USA.`,
    relatedIndustries: 'Related Industries',
    readyCta: (name: string) => `Ready to Build Your ${name} Website?`,
    readySub: (name: string) => `Get a custom quote for your ${name.toLowerCase()} business.`,
    freeQuote: 'Get Free Quote',
    // Industry × service page
    serviceForIndustry: (service: string, industry: string) => `${service} for ${industry}`,
    serviceHeroDesc: (service: string, industry: string) =>
      `Looking for professional ${service.toLowerCase()} tailored specifically for ${industry.toLowerCase()} businesses? We build fast, SEO-optimized websites that address the unique needs of the ${industry.toLowerCase()} industry.`,
    getIndustryQuote: (industry: string) => `Get ${industry} Quote`,
    allIndustryServices: (industry: string) => `All ${industry} Services`,
    whatsIncluded: (industry: string) => `What's Included for ${industry}`,
    whatsIncludedDesc: (service: string, industry: string) =>
      `Our ${service.toLowerCase()} for ${industry.toLowerCase()} includes everything needed for a high-performing, industry-specific website.`,
    builtFor: (industry: string) => `Built for ${industry} Needs`,
    builtForDesc: (industry: string) => `We understand the unique challenges of ${industry.toLowerCase()} businesses.`,
    byCityService: (service: string, industry: string) => `${service} for ${industry} by City`,
    byCityServiceDesc: (industry: string, isEl: boolean) =>
      isEl
        ? `Τοπικές υπηρεσίες για επιχειρήσεις ${industry} σε όλη την Ελλάδα.`
        : `Local services for ${industry.toLowerCase()} businesses across the USA.`,
    otherServicesFor: (industry: string) => `Other Services for ${industry}`,
    serviceForOtherIndustries: (service: string) => `${service} for Other Industries`,
    readyForService: (service: string) => `Ready for ${service}?`,
    readyForServiceSub: (industry: string) => `Get a custom quote for your ${industry.toLowerCase()} business today.`,
  },
  el: {
    home: 'Αρχική',
    solutions: 'Κλάδοι',
    websiteSolutionsFor: 'Ιστοσελίδες για',
    getQuoteFor: (name: string) => `Προσφορά — ${name}`,
    viewServices: 'Δείτε υπηρεσίες',
    whatWebsitesNeed: (name: string) => `Τι χρειάζεται μια ιστοσελίδα ${name}`,
    painIntro: (name: string) =>
      `Κατανοούμε τις προκλήσεις και τις απαιτήσεις των επιχειρήσεων στον κλάδο ${name}.`,
    servicesFor: (name: string) => `Υπηρεσίες για ${name}`,
    servicesIntro: (name: string) =>
      `Επιλέξτε την υπηρεσία που ταιριάζει στην επιχείρησή σας (${name}).`,
    learnMore: 'Μάθετε περισσότερα →',
    byCity: (name: string) => `${name} — ανά πόλη / νησί`,
    locationsIntro: (name: string, isEl: boolean) =>
      isEl
        ? `Τοπικές υπηρεσίες ιστοσελίδας και SEO για ${name} σε όλη την Ελλάδα.`
        : `Local ${name.toLowerCase()} website services.`,
    relatedIndustries: 'Σχετικοί κλάδοι',
    readyCta: (name: string) => `Έτοιμοι για ιστοσελίδα ${name};`,
    readySub: (name: string) => `Ζητήστε προσφορά για την επιχείρησή σας (${name}).`,
    freeQuote: 'Δωρεάν προσφορά',
    serviceForIndustry: (service: string, industry: string) => `${service} για ${industry}`,
    serviceHeroDesc: (service: string, industry: string) =>
      `Αναζητάτε επαγγελματικό ${service.toLowerCase()} προσαρμοσμένο για επιχειρήσεις ${industry}; Σχεδιάζουμε γρήγορες, SEO-ready ιστοσελίδες που καλύπτουν τις ανάγκες του κλάδου.`,
    getIndustryQuote: (industry: string) => `Προσφορά — ${industry}`,
    allIndustryServices: (industry: string) => `Όλες οι υπηρεσίες ${industry}`,
    whatsIncluded: (industry: string) => `Τι περιλαμβάνεται για ${industry}`,
    whatsIncludedDesc: (service: string, industry: string) =>
      `Το ${service.toLowerCase()} για ${industry} περιλαμβάνει ό,τι χρειάζεται μια υψηλής απόδοσης ιστοσελίδα για τον κλάδο.`,
    builtFor: (industry: string) => `Σχεδιασμένο για ${industry}`,
    builtForDesc: (industry: string) => `Κατανοούμε τις προκλήσεις των επιχειρήσεων στον κλάδο ${industry}.`,
    byCityService: (service: string, industry: string) => `${service} — ${industry} ανά πόλη`,
    byCityServiceDesc: (industry: string, isEl: boolean) =>
      isEl
        ? `Τοπικές υπηρεσίες για επιχειρήσεις ${industry} σε όλη την Ελλάδα.`
        : `Τοπικές υπηρεσίες για ${industry}.`,
    otherServicesFor: (industry: string) => `Άλλες υπηρεσίες για ${industry}`,
    serviceForOtherIndustries: (service: string) => `${service} — άλλοι κλάδοι`,
    readyForService: (service: string) => `Έτοιμοι για ${service};`,
    readyForServiceSub: (industry: string) => `Ζητήστε προσφορά για την επιχείρησή σας (${industry}).`,
  },
} as const;
