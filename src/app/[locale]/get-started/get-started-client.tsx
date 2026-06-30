'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { industries } from '@/data/industries';
import { industriesEl } from '@/data/industries-i18n';
import { submitToFormspree } from '@/lib/formspree';
import { captureUtmParams, trackFormStart, trackLead } from '@/lib/analytics';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

const packagesEn = [
  { id: 'starter', name: 'Starter', price: 899, originalPrice: 1499, pages: 5 },
  { id: 'professional', name: 'Professional', price: 1799, originalPrice: 2999, pages: 10 },
  { id: 'business', name: 'Business', price: 2999, originalPrice: 4999, pages: 20 },
];

const packagesEl = [
  { id: 'starter', name: 'Starter', price: 899, originalPrice: 1499, pages: 5 },
  { id: 'professional', name: 'Professional', price: 1799, originalPrice: 2999, pages: 10 },
  { id: 'business', name: 'Business', price: 2999, originalPrice: 4999, pages: 20 },
];

const addOnsEn = [
  { id: 'logo', name: 'Logo Design', price: 299 },
  { id: 'content', name: 'Content Writing (5 pages)', price: 399 },
  { id: 'ecommerce', name: 'E-commerce Setup', price: 499 },
  { id: 'maintenance', name: '3 Months Maintenance', price: 499 },
];

const addOnsEl = [
  { id: 'logo', name: 'Σχεδιασμός Λογοτύπου', price: 299 },
  { id: 'content', name: 'Συγγραφή Κειμένων (5 σελίδες)', price: 399 },
  { id: 'ecommerce', name: 'Ρύθμιση E-commerce', price: 499 },
  { id: 'maintenance', name: '3 Μήνες Συντήρηση', price: 499 },
];

const featureOptionsEn = [
  { id: 'contact-form', label: 'Contact Form' },
  { id: 'booking', label: 'Booking / Scheduling' },
  { id: 'ecommerce', label: 'E-commerce / Online Store' },
  { id: 'blog', label: 'Blog' },
  { id: 'gallery', label: 'Gallery / Portfolio' },
  { id: 'social', label: 'Social Media Integration' },
  { id: 'chat', label: 'Live Chat' },
  { id: 'multilang', label: 'Multi-language' },
  { id: 'members', label: 'Member Login Area' },
  { id: 'animations', label: 'Custom Animations' },
];

const featureOptionsEl = [
  { id: 'contact-form', label: 'Φόρμα Επικοινωνίας' },
  { id: 'booking', label: 'Σύστημα Κρατήσεων / Ραντεβού' },
  { id: 'ecommerce', label: 'Ηλεκτρονικό Κατάστημα (E-shop)' },
  { id: 'blog', label: 'Ιστολόγιο (Blog)' },
  { id: 'gallery', label: 'Γκαλερί / Portfolio' },
  { id: 'social', label: 'Σύνδεση με Social Media' },
  { id: 'chat', label: 'Live Chat / WhatsApp' },
  { id: 'multilang', label: 'Πολυγλωσσικό site' },
  { id: 'members', label: 'Περιοχή Μελών (Login)' },
  { id: 'animations', label: 'Προσαρμοσμένα Animations' },
];

const existingAssetsEn = [
  { id: 'logo', label: 'Logo / Branding' },
  { id: 'brand-guidelines', label: 'Brand Guidelines' },
  { id: 'photos', label: 'Professional Photos' },
  { id: 'content', label: 'Written Content' },
  { id: 'social', label: 'Social Media Accounts' },
  { id: 'domain', label: 'Domain Name' },
];

const existingAssetsEl = [
  { id: 'logo', label: 'Λογότυπο / Branding' },
  { id: 'brand-guidelines', label: 'Οδηγός Brand (Guidelines)' },
  { id: 'photos', label: 'Επαγγελματικές Φωτογραφίες' },
  { id: 'content', label: 'Έτοιμα Κείμενα' },
  { id: 'social', label: 'Λογαριασμοί Social Media' },
  { id: 'domain', label: 'Domain Name' },
];

function OnboardingWizard({ locale }: { locale: SiteLocale }) {
  const searchParams = useSearchParams();
  const lp = (path: string) => localizedPath(locale, path);
  const isEl = locale === 'el';

  const packages = isEl ? packagesEl : packagesEn;
  const addOns = isEl ? addOnsEl : addOnsEn;
  const featureOptions = isEl ? featureOptionsEl : featureOptionsEn;
  const existingAssets = isEl ? existingAssetsEl : existingAssetsEn;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const [formData, setFormData] = useState({
    package: '',
    addOns: [] as string[],
    businessName: '',
    industry: '',
    website: '',
    description: '',
    hasDomain: '' as '' | 'yes' | 'no' | 'need-help',
    domainName: '',
    competitors: '',
    designReferences: '',
    targetAudience: '',
    features: [] as string[],
    timeline: '' as '' | 'asap' | '2-4-weeks' | '1-2-months' | 'flexible',
    existingAssets: [] as string[],
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    additionalNotes: '',
    fullName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setUtmParams(captureUtmParams());
    const pkg = searchParams.get('package');
    const project = searchParams.get('project');
    setFormData((prev) => {
      let next = { ...prev };
      if (pkg && packages.some((p) => p.id === pkg)) {
        next = { ...next, package: pkg };
      }
      if (project) {
        next = { ...next, industry: project };
      }
      return next;
    });
  }, [searchParams, packages]);

  const selectedPackage = packages.find(p => p.id === formData.package);
  const selectedAddOns = addOns.filter(a => formData.addOns.includes(a.id));
  const totalPrice = (selectedPackage?.price || 0) + selectedAddOns.reduce((sum, a) => sum + a.price, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!hasTrackedStart) {
      trackFormStart('get-started');
      setHasTrackedStart(true);
    }
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOnToggle = (addOnId: string) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId],
    }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const handleAssetToggle = (assetId: string) => {
    setFormData(prev => ({
      ...prev,
      existingAssets: prev.existingAssets.includes(assetId)
        ? prev.existingAssets.filter(id => id !== assetId)
        : [...prev.existingAssets, assetId],
    }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!formData.package;
      case 2:
        return !!formData.businessName && !!formData.industry;
      case 3:
        return !!formData.hasDomain && !!formData.timeline;
      case 4:
        return !!formData.fullName && !!formData.email;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid() && step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const submissionData = {
      'Package': selectedPackage?.name || 'Not selected',
      'Package Price': selectedPackage ? `€${selectedPackage.price}` : 'N/A',
      'Add-ons': selectedAddOns.map(a => a.name).join(', ') || 'None',
      'Total Estimated Price': `€${totalPrice}`,
      'Business Name': formData.businessName,
      'Industry': formData.industry,
      'Current Website': formData.website || 'None',
      'Business Description': formData.description || 'Not provided',
      'Has Domain': formData.hasDomain === 'yes' ? `Yes - ${formData.domainName}` : formData.hasDomain === 'no' ? 'No, needs to register' : 'Needs help choosing',
      'Competitors': formData.competitors || 'Not provided',
      'Design Inspiration': formData.designReferences || 'Not provided',
      'Target Audience': formData.targetAudience || 'Not provided',
      'Features Needed': formData.features.map(f => featureOptions.find(o => o.id === f)?.label).filter(Boolean).join(', ') || 'None selected',
      'Timeline': formData.timeline === 'asap' ? 'ASAP' : formData.timeline === '2-4-weeks' ? '2-4 Weeks' : formData.timeline === '1-2-months' ? '1-2 Months' : 'Flexible',
      'Existing Assets': formData.existingAssets.map(a => existingAssets.find(o => o.id === a)?.label).filter(Boolean).join(', ') || 'None',
      'Facebook': formData.facebookUrl || 'Not provided',
      'Instagram': formData.instagramUrl || 'Not provided',
      'LinkedIn': formData.linkedinUrl || 'Not provided',
      'Twitter': formData.twitterUrl || 'Not provided',
      'Additional Notes': formData.additionalNotes || 'None',
      'Full Name': formData.fullName,
      'Email': formData.email,
      'Phone': formData.phone || 'Not provided',
      '_subject': `New Website Project Request from ${formData.businessName}`,
      'Form Type': 'Get Started Wizard',
      ...utmParams,
    };

    const result = await submitToFormspree(submissionData);

    if (result.ok) {
      trackLead('get-started', {
        package: selectedPackage?.name ?? 'unknown',
        industry: formData.industry,
      });
      setIsComplete(true);
    } else {
      setSubmitError(result.error ?? (isEl ? 'Παρουσιάστηκε σφάλμα κατά την υποβολή. Παρακαλώ δοκιμάστε ξανά.' : 'There was an error submitting your request. Please try again.'));
    }
    setIsSubmitting(false);
  };

  const t = isEl
    ? {
        title: "Ξεκινήστε το Project Σας",
        subtitle: "Συμπληρώστε τον οδηγό για να λάβετε μια προσαρμοσμένη προσφορά σε 24 ώρες.",
        stepLabels: ['Πακέτο', 'Επιχείρηση', 'Project', 'Επικοινωνία'],
        currency: "€",
        choosePkg: "Επιλέξτε Πακέτο",
        choosePkgSub: "Επιλέξτε το πακέτο που ταιριάζει στις ανάγκες σας",
        pagesCount: (count: number) => `Έως ${count} σελίδες`,
        optionalAddons: "Προαιρετικά Add-ons",
        bizInfoTitle: "Πείτε μας για την Επιχείρησή σας",
        bizInfoSub: "Βοηθήστε μας να κατανοήσουμε τις ανάγκες σας",
        bizName: "Όνομα Επιχείρησης *",
        bizNamePlaceholder: "Η Εταιρεία Σας",
        industryLabel: "Κλάδος *",
        industrySelect: "Επιλέξτε κλάδο",
        currWeb: "Τρέχουσα Ιστοσελίδα (αν υπάρχει)",
        bizDesc: "Σύντομη Περιγραφή",
        bizDescPlaceholder: "Πείτε μας λίγα λόγια για την επιχείρησή σας και τους στόχους της νέας ιστοσελίδας...",
        projDetailsTitle: "Λεπτομέρειες Project",
        projDetailsSub: "Βοηθήστε μας να κατανοήσουμε καλύτερα τις απαιτήσεις",
        hasDomain: "Έχετε domain name; *",
        domainOptions: [
          { value: 'yes', label: 'Ναι, έχω ήδη domain' },
          { value: 'no', label: 'Όχι, θέλω να κατοχυρώσω νέο' },
          { value: 'need-help', label: 'Χρειάζομαι βοήθεια στην επιλογή' },
        ],
        competitors: "Ανταγωνιστές (προαιρετικά)",
        competitorsPlaceholder: "Καταγράψτε 1-3 ιστοσελίδες ανταγωνιστών (μία ανά σειρά)",
        designRefs: "Έμπνευση & Σχεδιασμός (προαιρετικά)",
        designRefsPlaceholder: "Προσθέστε ιστοσελίδες που σας αρέσει το design τους (μία ανά σειρά)",
        targetAudience: "Κοινό-Στόχος (προαιρετικά)",
        targetAudiencePlaceholder: "π.χ. Ιδιοκτήτες σκαφών, ηλικίες 30-60, τουρίστες",
        featuresTitle: "Ποια χαρακτηριστικά χρειάζεστε;",
        timelineTitle: "Χρονοδιάγραμμα Project *",
        timelineOptions: [
          { value: 'asap', label: 'Άμεσα (ASAP)' },
          { value: '2-4-weeks', label: '2-4 Εβδομάδες' },
          { value: '1-2-months', label: '1-2 Μήνες' },
          { value: 'flexible', label: 'Ευέλικτο' },
        ],
        assetsTitle: "Τι έχετε ήδη έτοιμο;",
        socialsTitle: "Λογαριασμοί Social Media (προαιρετικά)",
        addNotes: "Επιπλέον Σημειώσεις (προαιρετικά)",
        contactTitle: "Στοιχεία Επικοινωνίας",
        contactSub: "Θα τα χρησιμοποιήσουμε για να σας στείλουμε την προσφορά",
        fullName: "Ονοματεπώνυμο *",
        email: "Email *",
        phone: "Τηλέφωνο",
        back: "Πίσω",
        cancel: "Ακύρωση",
        continue: "Συνέχεια",
        submitting: "Υποβολή...",
        submitBtn: "Υποβολή Αιτήματος",
        summaryTitle: "Σύνοψη Αιτήματος",
        summaryEstimated: "Εκτιμώμενο Σύνολο",
        summaryFinalQuote: "Η τελική προσφορά θα διαμορφωθεί μετά τον έλεγχο",
        noPkgSelected: "Επιλέξτε πακέτο για εκτίμηση",
        freeConsult: "Δωρεάν διαβούλευση",
        customProposal: "Προσαρμοσμένη πρόταση σε 24 ώρες",
        noCommitment: "Χωρίς καμία δέσμευση",
        submittedTitle: "Το αίτημα υποβλήθηκε!",
        submittedSub: (name: string) => `Ευχαριστούμε, ${name}! Λάβαμε τις λεπτομέρειες του project σας.`,
        nextStepsTitle: "Τι γίνεται στη συνέχεια;",
        nextSteps: [
          "Ελέγξτε το email σας για την επιβεβαίωση υποβολής",
          "Η ομάδα μας θα εξετάσει το project σας εντός 24 ωρών",
          "Θα σας στείλουμε μια προσαρμοσμένη πρόταση βάσει των αναγκών σας",
          "Μόλις συμφωνήσουμε, ξεκινάμε την κατασκευή!"
        ],
        backHome: "Επιστροφή στην Αρχική",
        estBudget: "Εκτιμώμενο Budget",
        pkgLabel: "Πακέτο",
        bizLabel: "Επιχείρηση",
        other: "Άλλο",
        beforeAfterTitle: "Η Διαφορά της AnotherSEOGuru",
        beforeAfterSub: "Σύγκριση της ιστοσελίδας σας πριν και μετά τη συνεργασία μας",
        metrics: [
          {
            title: "Ταχύτητα (Core Web Vitals)",
            before: "24/100 Mobile",
            beforeDesc: "Κόκκινο, αργό φόρτωμα. Χάνετε το 50% των επισκεπτών.",
            after: "99/100 Mobile",
            afterDesc: "Πράσινο, ακαριαίο φόρτωμα. 0% χαμένοι πελάτες.",
            status: "speed"
          },
          {
            title: "Κατάταξη στο Google (SEO)",
            before: "3η Σελίδα",
            beforeDesc: "Αόρατοι για εμπορικές αναζητήσεις, μηδενικά leads.",
            after: "1η Θέση & Snippet",
            afterDesc: "Κυριαρχία στα local searches και organic leads.",
            status: "seo"
          },
          {
            title: "Ορατότητα σε AI & LLMs",
            before: "Μηδενική πρόταση",
            beforeDesc: "Το ChatGPT και το Gemini προτείνουν ανταγωνιστές.",
            after: "Πρώτη Πρόταση με Links",
            afterDesc: "GEO/AEO optimized δομημένος κώδικας για AI Engines.",
            status: "ai"
          },
          {
            title: "Μετατροπή σε Πελάτες",
            before: "Κάτω από 0.5%",
            beforeDesc: "Ξεπερασμένο UI/UX, μη λειτουργικές φόρμες.",
            after: "4.8% - 8.2%",
            afterDesc: "Premium UI, Dynamic Forms, Sticky Mobile CTAs.",
            status: "conversion"
          }
        ]
      }
    : {
        title: "Start Your Project",
        subtitle: "Complete our wizard to receive a custom quote in 24 hours.",
        stepLabels: ['Package', 'Business', 'Project', 'Contact'],
        currency: "$",
        choosePkg: "Choose Your Package",
        choosePkgSub: "Select the package that fits your needs",
        pagesCount: (count: number) => `Up to ${count} pages`,
        optionalAddons: "Optional Add-ons",
        bizInfoTitle: "Tell Us About Your Business",
        bizInfoSub: "Help us understand your needs",
        bizName: "Business Name *",
        bizNamePlaceholder: "Your Company Name",
        industryLabel: "Industry *",
        industrySelect: "Select your industry",
        currWeb: "Current Website (if any)",
        bizDesc: "Brief Description",
        bizDescPlaceholder: "Tell us about your business and what you want to achieve with your new website...",
        projDetailsTitle: "Project Details",
        projDetailsSub: "Help us better understand your project requirements",
        hasDomain: "Do you have a domain name? *",
        domainOptions: [
          { value: 'yes', label: 'Yes, I have a domain' },
          { value: 'no', label: 'No, I need to register one' },
          { value: 'need-help', label: 'I need help choosing a domain' },
        ],
        competitors: "Competitor Websites (optional)",
        competitorsPlaceholder: "List 1-3 competitor websites we should look at (one per line)",
        designRefs: "Design Inspiration (optional)",
        designRefsPlaceholder: "Share websites you like the design of (one per line)",
        targetAudience: "Target Audience (optional)",
        targetAudiencePlaceholder: "e.g., Small business owners, ages 35-55, local area",
        featuresTitle: "What features do you need?",
        timelineTitle: "Project Timeline *",
        timelineOptions: [
          { value: 'asap', label: 'ASAP' },
          { value: '2-4-weeks', label: '2-4 Weeks' },
          { value: '1-2-months', label: '1-2 Months' },
          { value: 'flexible', label: 'Flexible' },
        ],
        assetsTitle: "What do you already have?",
        socialsTitle: "Social Media Accounts (optional)",
        addNotes: "Additional Notes (optional)",
        contactTitle: "Your Contact Information",
        contactSub: "We'll use this to send you a custom proposal",
        fullName: "Full Name *",
        email: "Email Address *",
        phone: "Phone Number",
        back: "Back",
        cancel: "Cancel",
        continue: "Continue",
        submitting: "Submitting...",
        submitBtn: "Submit Request",
        summaryTitle: "Request Summary",
        summaryEstimated: "Estimated Total",
        summaryFinalQuote: "Final quote provided after review",
        noPkgSelected: "Select a package to see estimate",
        freeConsult: "Free consultation",
        customProposal: "Custom proposal in 24h",
        noCommitment: "No commitment required",
        submittedTitle: "Request Submitted!",
        submittedSub: (name: string) => `Thank you, ${name}! We've received your project request.`,
        nextStepsTitle: "What happens next?",
        nextSteps: [
          "Check your email for confirmation",
          "Our team will review your project details within 24 hours",
          "We'll send you a custom proposal based on your requirements",
          "Once approved, we'll kick off your project!"
        ],
        backHome: "Back to Home",
        estBudget: "Estimated Budget",
        pkgLabel: "Package",
        bizLabel: "Business",
        other: "Other",
        beforeAfterTitle: "The AnotherSEOGuru Difference",
        beforeAfterSub: "Compare your website performance before and after working with us",
        metrics: [
          {
            title: "Performance (Core Web Vitals)",
            before: "24/100 Mobile",
            beforeDesc: "Red zone. Slow load times. Losing 50%+ of mobile visitors.",
            after: "99/100 Mobile",
            afterDesc: "Green zone. Instant loads. Zero lost traffic.",
            status: "speed"
          },
          {
            title: "Google Ranking (SEO)",
            before: "Page 3 or lower",
            beforeDesc: "Invisible to prospective buyers searching for services.",
            after: "Page 1 Position 1",
            afterDesc: "Dominating local search results with featured snippets.",
            status: "seo"
          },
          {
            title: "AI Search & LLM Presence",
            before: "Not Recommended",
            beforeDesc: "ChatGPT & Gemini recommend competitor websites instead.",
            after: "Top Recommendation",
            afterDesc: "AEO/GEO structured schemas optimized for LLM search agents.",
            status: "ai"
          },
          {
            title: "Conversion Rates",
            before: "Under 0.5%",
            beforeDesc: "Outdated design, broken contact forms, no trust elements.",
            after: "4.8% - 8.2%",
            afterDesc: "Premium interactive UX, mobile-friendly forms, sticky CTAs.",
            status: "conversion"
          }
        ]
      };

  if (isComplete) {
    return (
      <main className="main-below-header flex min-h-[80vh] items-center">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/20">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold mb-4">{t.submittedTitle}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {t.submittedSub(formData.fullName.split(' ')[0])}
            </p>

            <div className="glass-card card p-6 text-left mb-8">
              <h2 className="font-semibold mb-4">{t.nextStepsTitle}</h2>
              <ul className="space-y-3 text-sm">
                {t.nextSteps.map((stepText, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">{idx + 1}</span>
                    <span className="text-foreground/90">{stepText}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card card p-4 bg-muted/10 text-sm text-muted-foreground mb-8">
              <strong>{t.estBudget}:</strong> {t.currency}{totalPrice.toLocaleString()} •
              <strong> {t.pkgLabel}:</strong> {selectedPackage?.name} •
              <strong> {t.bizLabel}:</strong> {formData.businessName}
            </div>

            <Link href={lp("/")} className="btn btn-gradient">
              {t.backHome}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-below-header pb-24">
      {/* Hero Section */}
      <section className="section-compact gradient-hero mb-8">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <div className="container max-w-6xl px-4">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Column: Before / After Marketing Comparison */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card card p-6 bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03]">
              <h3 className="text-xl font-bold mb-2 text-foreground">{t.beforeAfterTitle}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t.beforeAfterSub}</p>

              <div className="space-y-6">
                {t.metrics.map((metric) => (
                  <div key={metric.title} className="border-b border-border/60 pb-6 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-sm mb-3 text-foreground/90">{metric.title}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Before (Red) */}
                      <div className="p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-destructive">
                            {isEl ? "ΠΡΙΝ" : "BEFORE"}
                          </span>
                        </div>
                        <div className="font-bold text-xs text-destructive mb-1">{metric.before}</div>
                        <p className="text-[10px] text-muted-foreground leading-snug">{metric.beforeDesc}</p>
                      </div>

                      {/* After (Green) */}
                      <div className="p-3 rounded-xl bg-success/5 border border-success/10">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-success" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-success">
                            {isEl ? "ΜΕΤΑ" : "AFTER"}
                          </span>
                        </div>
                        <div className="font-bold text-xs text-success mb-1">{metric.after}</div>
                        <p className="text-[10px] text-muted-foreground leading-snug">{metric.afterDesc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form Wizard */}
          <div className="lg:col-span-3 space-y-6">
            {/* Step Progress indicators */}
            <div className="glass-card card p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                {t.stepLabels.map((label, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 ${i + 1 <= step ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i + 1 < step ? 'gradient-primary text-white' :
                      i + 1 === step ? 'border-2 border-primary text-primary' :
                        'border-2 border-muted-foreground/30'
                      }`}>
                      {i + 1 < step ? '✓' : i + 1}
                    </div>
                    <span className="hidden sm:block text-xs font-semibold">{label}</span>
                  </div>
                ))}
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            <div className="glass-card card p-6 sm:p-8 relative">
              {/* Step 1: Package Selection */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">{t.choosePkg}</h2>
                  <p className="text-muted-foreground mb-6 text-sm">{t.choosePkgSub}</p>

                  <div className="space-y-3 mb-8">
                    {packages.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-smooth ${formData.package === pkg.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="package"
                            value={pkg.id}
                            checked={formData.package === pkg.id}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-primary focus:ring-primary focus:ring-2"
                          />
                          <div>
                            <div className="font-semibold text-foreground">{pkg.name}</div>
                            <div className="text-xs text-muted-foreground">{t.pagesCount(pkg.pages)}</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground line-through decoration-destructive/50 decoration-1">
                            {t.currency}{pkg.originalPrice?.toLocaleString()}
                          </span>
                          <span className="font-bold text-lg text-primary">
                            {t.currency}{pkg.price.toLocaleString()}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <h3 className="font-semibold text-sm mb-3">{t.optionalAddons}</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {addOns.map((addon) => (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-smooth text-sm ${formData.addOns.includes(addon.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={formData.addOns.includes(addon.id)}
                            onChange={() => handleAddOnToggle(addon.id)}
                            className="w-4 h-4 text-primary rounded focus:ring-primary focus:ring-2"
                          />
                          <span className="text-foreground/90">{addon.name}</span>
                        </div>
                        <span className="font-semibold text-primary">+{t.currency}{addon.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Business Info */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">{t.bizInfoTitle}</h2>
                  <p className="text-muted-foreground mb-6 text-sm">{t.bizInfoSub}</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.bizName}</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder={t.bizNamePlaceholder}
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.industryLabel}</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
                      >
                        <option value="">{t.industrySelect}</option>
                        {industries.map((ind) => {
                          const name = isEl && industriesEl[ind.slug] ? industriesEl[ind.slug].name : ind.name;
                          return (
                            <option key={ind.slug} value={ind.slug}>{name}</option>
                          );
                        })}
                        <option value="other">{t.other}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.currWeb}</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.bizDesc}</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder={t.bizDescPlaceholder}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Project Details */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">{t.projDetailsTitle}</h2>
                  <p className="text-muted-foreground mb-6 text-sm">{t.projDetailsSub}</p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t.hasDomain}</label>
                      <div className="space-y-2">
                        {t.domainOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth ${formData.hasDomain === option.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                          >
                            <input
                              type="radio"
                              name="hasDomain"
                              value={option.value}
                              checked={formData.hasDomain === option.value}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                            />
                            <span className="text-sm font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {formData.hasDomain === 'yes' && (
                        <input
                          type="text"
                          name="domainName"
                          value={formData.domainName}
                          onChange={handleInputChange}
                          placeholder="yourdomain.com"
                          className="w-full mt-3 px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.competitors}</label>
                      <textarea
                        name="competitors"
                        value={formData.competitors}
                        onChange={handleInputChange}
                        placeholder={t.competitorsPlaceholder}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.designRefs}</label>
                      <textarea
                        name="designReferences"
                        value={formData.designReferences}
                        onChange={handleInputChange}
                        placeholder={t.designRefsPlaceholder}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.targetAudience}</label>
                      <input
                        type="text"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        placeholder={t.targetAudiencePlaceholder}
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t.featuresTitle}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {featureOptions.map((feature) => (
                          <label
                            key={feature.id}
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-smooth text-xs ${formData.features.includes(feature.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.features.includes(feature.id)}
                              onChange={() => handleFeatureToggle(feature.id)}
                              className="w-3.5 h-3.5 text-primary rounded focus:ring-primary focus:ring-2"
                            />
                            <span>{feature.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t.timelineTitle}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {t.timelineOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-smooth ${formData.timeline === option.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                          >
                            <input
                              type="radio"
                              name="timeline"
                              value={option.value}
                              checked={formData.timeline === option.value}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                            />
                            <span className="text-sm font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t.assetsTitle}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {existingAssets.map((asset) => (
                          <label
                            key={asset.id}
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-smooth text-xs ${formData.existingAssets.includes(asset.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.existingAssets.includes(asset.id)}
                              onChange={() => handleAssetToggle(asset.id)}
                              className="w-3.5 h-3.5 text-primary rounded focus:ring-primary focus:ring-2"
                            />
                            <span>{asset.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t.socialsTitle}</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="url"
                          name="facebookUrl"
                          value={formData.facebookUrl}
                          onChange={handleInputChange}
                          placeholder="Facebook URL"
                          className="px-3 py-2 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-xs"
                        />
                        <input
                          type="url"
                          name="instagramUrl"
                          value={formData.instagramUrl}
                          onChange={handleInputChange}
                          placeholder="Instagram URL"
                          className="px-3 py-2 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-xs"
                        />
                        <input
                          type="url"
                          name="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={handleInputChange}
                          placeholder="LinkedIn URL"
                          className="px-3 py-2 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-xs"
                        />
                        <input
                          type="url"
                          name="twitterUrl"
                          value={formData.twitterUrl}
                          onChange={handleInputChange}
                          placeholder="Twitter / X URL"
                          className="px-3 py-2 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.addNotes}</label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder={isEl ? "Κάτι άλλο που θα θέλατε να μοιραστείτε μαζί μας..." : "Anything else we should know about your project?"}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Info */}
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">{t.contactTitle}</h2>
                  <p className="text-muted-foreground mb-6 text-sm">{t.contactSub}</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.fullName}</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.email}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t.phone}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+30 690 000 0000"
                        className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-smooth text-sm"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                      {submitError}
                    </div>
                  )}
                </div>
              )}

              {/* Wizard Form Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
                {step > 1 ? (
                  <button onClick={handleBack} className="btn btn-outline py-2.5 text-xs font-bold">
                    {t.back}
                  </button>
                ) : (
                  <Link href={lp("/pricing")} className="btn btn-outline py-2.5 text-xs font-bold">{t.cancel}</Link>
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="btn btn-gradient disabled:opacity-50 py-2.5 text-xs font-bold"
                  >
                    {t.continue}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isStepValid()}
                    className="btn btn-gradient disabled:opacity-50 py-2.5 text-xs font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t.submitting}
                      </>
                    ) : (
                      <>
                        {t.submitBtn}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Quote Summary Sidebar / Panel */}
            <div className="glass-card card p-6">
              <h3 className="font-bold text-sm mb-4 text-foreground/90">{t.summaryTitle}</h3>

              {selectedPackage ? (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between font-medium">
                    <span>{selectedPackage.name} {isEl ? "Πακέτο" : "Package"}</span>
                    <span>{t.currency}{selectedPackage.price.toLocaleString()}</span>
                  </div>

                  {selectedAddOns.map((addon) => (
                    <div key={addon.id} className="flex justify-between text-muted-foreground">
                      <span>{addon.name}</span>
                      <span>+{t.currency}{addon.price}</span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border/60">
                    <div className="flex justify-between text-base font-bold text-foreground">
                      <span>{t.summaryEstimated}</span>
                      <span className="gradient-text">{t.currency}{totalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5">{t.summaryFinalQuote}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">{t.noPkgSelected}</p>
              )}

              <div className="mt-6 pt-4 border-t border-border/60 text-[10px] text-muted-foreground space-y-2.5">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.freeConsult}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.customProposal}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t.noCommitment}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export function GetStartedClient({ locale }: { locale: SiteLocale }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <OnboardingWizard locale={locale} />
    </Suspense>
  );
}
