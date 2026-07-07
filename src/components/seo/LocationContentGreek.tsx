'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Location } from '@/data/locations';
import { Service } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { formatLocationNameEl } from '@/data/locations';
import { localizedPath, siteLocaleFromPath, type SiteLocale } from '@/lib/i18n/locale';

interface LocationContentGreekProps {
  location: Location;
  service?: Service;
  locale?: SiteLocale;
}

/** City-specific intro copy: tourism/hotel angle for islands, commercial angle for mainland hubs. */
const CITY_INTROS: Record<string, { intro: string; tourism: boolean }> = {
  'athens-gr': {
    tourism: false,
    intro:
      'Η Αθήνα είναι η πιο ανταγωνιστική ψηφιακή αγορά της Ελλάδας: δικηγορικά γραφεία, ιατρεία, e-shop, εστίαση και B2B εταιρείες διεκδικούν τις ίδιες πρώτες θέσεις. Για να ξεχωρίσετε δεν αρκεί μια όμορφη ιστοσελίδα - χρειάζεστε τεχνικό SEO, ταχύτητα και περιεχόμενο που απαντά στις αναζητήσεις των Αθηναίων πελατών σας. Δουλεύουμε με δεδομένα από το Google Search Console και χτίζουμε σελίδες που στοχεύουν συγκεκριμένες συνοικίες και προθέσεις αγοράς.',
  },
  'thessaloniki-gr': {
    tourism: false,
    intro:
      'Η Θεσσαλονίκη συνδυάζει ισχυρή τοπική αγορά με χαμηλότερο διαφημιστικό κόστος από την Αθήνα - ιδανική συνθήκη για οργανική ανάπτυξη. Καταστήματα, φροντιστήρια, ιατρεία και εταιρείες υπηρεσιών στη Θεσσαλονίκη κερδίζουν σταθερά πελάτες από αναζητήσεις όπως «κατασκευή ιστοσελίδων Θεσσαλονίκη» και «SEO Θεσσαλονίκη». Σχεδιάζουμε ιστοσελίδες και στρατηγική τοπικού SEO που σας βάζουν μπροστά από τον ανταγωνισμό της πόλης.',
  },
  'patras-gr': {
    tourism: false,
    intro:
      'Η Πάτρα είναι το εμπορικό κέντρο της δυτικής Ελλάδας και οι επιχειρήσεις της ανταγωνίζονται όλο και περισσότερο online. Λιγότερος ψηφιακός ανταγωνισμός σημαίνει μεγαλύτερη ευκαιρία: με σωστό τεχνικό SEO και τοπικές σελίδες, μια πατρινή επιχείρηση μπορεί να κυριαρχήσει στις αναζητήσεις της περιοχής μέσα σε λίγους μήνες.',
  },
  'heraklion-gr': {
    tourism: true,
    intro:
      'Το Ηράκλειο είναι η μεγαλύτερη αγορά της Κρήτης με έντονη τουριστική και εμπορική δραστηριότητα. Ξενοδοχεία, ενοικιάσεις αυτοκινήτων και εστιατόρια χρειάζονται ιστοσελίδες που πουλάνε απευθείας - χωρίς προμήθειες σε πλατφόρμες. Παράλληλα, τοπικές επιχειρήσεις κερδίζουν από αναζητήσεις «κοντά μου» που αυξάνονται κάθε χρόνο.',
  },
  'larissa-gr': {
    tourism: false,
    intro:
      'Η Λάρισα είναι από τις πιο δυναμικές αγορές της κεντρικής Ελλάδας, με χαμηλό online ανταγωνισμό σε πολλούς κλάδους. Αυτό σημαίνει ότι μια σωστά βελτιστοποιημένη ιστοσελίδα μπορεί να φτάσει στην πρώτη σελίδα της Google γρήγορα - πριν το κάνουν οι ανταγωνιστές σας.',
  },
  'corinth-gr': {
    tourism: false,
    intro:
      'Η Κόρινθος, με την εγγύτητά της στην Αθήνα και τη δική της τοπική αγορά, προσφέρει σημαντική ευκαιρία για επιχειρήσεις που θέλουν να κυριαρχήσουν στις τοπικές αναζητήσεις. Ο ψηφιακός ανταγωνισμός είναι ακόμα χαμηλός - όσοι επενδύσουν τώρα σε κατασκευή ιστοσελίδας και τοπικό SEO θα έχουν το προβάδισμα.',
  },
  'santorini-gr': {
    tourism: true,
    intro:
      'Η Σαντορίνη είναι από τους πιο ανταγωνιστικούς τουριστικούς προορισμούς παγκοσμίως - και οι κρατήσεις κερδίζονται online. Ξενοδοχεία, βίλες, τουριστικά γραφεία και ενοικιάσεις σκαφών που επενδύουν σε δική τους ιστοσελίδα με σωστό SEO μειώνουν την εξάρτηση από Booking και Airbnb και κρατούν τις προμήθειες στην τσέπη τους. Στοχεύουμε αναζητήσεις σε ελληνικά και αγγλικά, με GEO/AEO ώστε να εμφανίζεστε και στις απαντήσεις των AI βοηθών.',
  },
  'mykonos-gr': {
    tourism: true,
    intro:
      'Στη Μύκονο το premium κοινό ψάχνει βίλες, ξενοδοχεία, εστιατόρια και υπηρεσίες online - συχνά σε αγγλικά και μέσω AI αναζήτησης. Μια γρήγορη, πολυγλωσσική ιστοσελίδα με σωστή στρατηγική SEO φέρνει απευθείας κρατήσεις υψηλής αξίας χωρίς προμήθειες τρίτων.',
  },
  'paros-gr': {
    tourism: true,
    intro:
      'Η Πάρος αναπτύσσεται ραγδαία ως προορισμός και οι επιχειρήσεις φιλοξενίας που χτίζουν τώρα τη δική τους online παρουσία κερδίζουν το μέλλον. Ιστοσελίδες για ξενοδοχεία, ενοικιάσεις και τουριστικές υπηρεσίες με τοπικό SEO φέρνουν άμεσες κρατήσεις από Έλληνες και ξένους επισκέπτες.',
  },
  'naxos-gr': {
    tourism: true,
    intro:
      'Η Νάξος προσελκύει οικογένειες και ταξιδιώτες που ψάχνουν αυθεντικές εμπειρίες - και κάνουν την έρευνά τους στη Google και σε AI βοηθούς. Ξενοδοχεία, ενοικιαζόμενα και rent-a-car με σωστά δομημένη ιστοσελίδα κερδίζουν τις κρατήσεις πριν καν ο επισκέπτης φτάσει στις πλατφόρμες.',
  },
  'crete-gr': {
    tourism: true,
    intro:
      'Η Κρήτη είναι η μεγαλύτερη τουριστική αγορά της Ελλάδας με χιλιάδες καταλύματα και υπηρεσίες να ανταγωνίζονται online. Η διαφορά ανάμεσα σε γεμάτη και άδεια σεζόν κρίνεται συχνά στην πρώτη σελίδα της Google - και στις απαντήσεις των AI. Χτίζουμε ιστοσελίδες και SEO που φέρνουν απευθείας κρατήσεις σε όλο το νησί.',
  },
  'rethymno-gr': {
    tourism: true,
    intro:
      'Το Ρέθυμνο συνδυάζει τουριστική κίνηση με ζωντανή τοπική αγορά. Καταλύματα και εστίαση κερδίζουν από δίγλωσσες ιστοσελίδες με SEO, ενώ τοπικές επιχειρήσεις κυριαρχούν εύκολα στις αναζητήσεις της πόλης λόγω χαμηλού ανταγωνισμού.',
  },
  'chania-gr': {
    tourism: true,
    intro:
      'Τα Χανιά είναι από τους πιο αγαπημένους προορισμούς της Κρήτης και ο online ανταγωνισμός στη φιλοξενία μεγαλώνει κάθε χρόνο. Ξενοδοχεία, βίλες και τουριστικές υπηρεσίες με δική τους SEO-ready ιστοσελίδα παίρνουν τις κρατήσεις απευθείας - με καλύτερο περιθώριο κέρδους.',
  },
  'kos-gr': {
    tourism: true,
    intro:
      'Η Κως ζει από τον τουρισμό και οι κρατήσεις ξεκινούν από την αναζήτηση. Καταλύματα, rent-a-car και δραστηριότητες με γρήγορη, δίγλωσση ιστοσελίδα και τοπικό SEO εμφανίζονται εκεί που ψάχνουν οι επισκέπτες - στη Google και πλέον στα AI chatbots.',
  },
};

export function LocationContentGreek({ location, service, locale: localeProp }: LocationContentGreekProps) {
  const pathname = usePathname() ?? '/el';
  const locale = localeProp ?? siteLocaleFromPath(pathname);
  const lp = (path: string) => localizedPath(locale, path);
  const city = location.cityLocal ?? location.city;
  const place = formatLocationNameEl(location);
  const serviceEl = service ? getServiceEl(service.slug) : null;
  const target = serviceEl?.name ?? (service?.name ?? 'SEO');

  return (
    <div className="prose prose-lg max-w-none text-gray-700" lang="el">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Η έξυπνη επιλογή για επιχειρήσεις στην {city}
        </h2>
        <p className="mb-4">
          Στην AnotherSEOGuru συνδυάζουμε πλατφόρμα SEO με Google Search Console, GEO (Generative Engine
          Optimization) και AEO (Answer Engine Optimization) για την {place}. Δεν χρησιμοποιούμε παλιές
          τακτικές - αναλύουμε τα πραγματικά σήματα κατάταξης και εφαρμόζουμε στρατηγική {target.toLowerCase()}{' '}
          με μετρήσιμο ROI.
        </p>
        <p>
          Έχουμε εμπειρία με ελληνικές αγορές φιλοξενίας και τουρισμού (π.χ. ξενοδοχεία, ενοικιάσεις
          οχημάτων) - κατανοούμε πώς η τοπική αναζήτηση και η ορατότητα σε AI αλλάζουν τις κρατήσεις και
          τα leads στην {city}.
        </p>
        {CITY_INTROS[location.slug] ? (
          <>
            <p className="mt-4">{CITY_INTROS[location.slug].intro}</p>
            {CITY_INTROS[location.slug].tourism ? (
              <p className="mt-4">
                Εξειδικευόμαστε σε{' '}
                <Link href={lp('/solutions/hotels/website-creation')} className="text-blue-600 underline">
                  κατασκευή ιστοσελίδας ξενοδοχείου
                </Link>{' '}
                και{' '}
                <Link href={lp('/solutions/hotels')} className="text-blue-600 underline">
                  SEO για ξενοδοχεία
                </Link>{' '}
                - δείτε και τον{' '}
                <Link href={lp('/blog/kataskevi-istoselidas-xenodoxeia')} className="text-blue-600 underline">
                  οδηγό μας για ιστοσελίδες ξενοδοχείων
                </Link>
                .
              </p>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">1. Έρευνα με δεδομένα</h3>
          <p className="text-gray-600">
            Αναλύουμε ανταγωνιστές στην {city}: keywords, σελίδες που φέρνουν traffic και ευκαιρίες
            «striking distance» από το Search Console - όχι εικασίες.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">2. Τεχνική βάση</h3>
          <p className="text-gray-600">
            Core Web Vitals, indexability και καθαρή αρχιτεκτονική ώστε το site να φορτώνει γρήγορα για
            χρήστες στην {city} και σε κινητά.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">3. GEO &amp; AEO</h3>
          <p className="text-gray-600">
            Δομημένο περιεχόμενο, schema και οντότητες για ChatGPT Search, Perplexity και Gemini - ώστε η
            μάρκα σας να εμφανίζεται στις απαντήσεις AI, όχι μόνο στα blue links.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-xl font-bold text-blue-600 mb-3">4. Τοπική ανάπτυξη</h3>
          <p className="text-gray-600">
            Google Business Profile, τοπικές σελίδες και εσωτερική σύνδεση με γειτονικές περιοχές - κρίσιμο
            για ελληνικές αναζητήσεις «κοντά μου».
          </p>
        </div>
      </div>

      {location.neighborhoods && location.neighborhoods.length > 0 && (
        <div className="mb-12 bg-blue-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Καλύπτουμε όλη την {city} και τις γειτονιές
          </h3>
          <p className="mb-6">
            Η τοπική SEO δεν είναι μόνο «{target.toLowerCase()} {city}» - στοχεύουμε γειτονιές και
            micro-intent όπου βρίσκονται οι πελάτες σας.
          </p>
          <div className="flex flex-wrap gap-3">
            {location.neighborhoods.map((hood) => (
              <span
                key={hood}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-blue-800 shadow-sm border border-blue-100"
              >
                {hood}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Συχνές ερωτήσεις - {city}</h3>
        <div className="space-y-4 not-prose">
          <details className="card p-6 group">
            <summary className="font-semibold cursor-pointer">
              Πόσο κοστίζει {target.toLowerCase()} στην {city};
            </summary>
            <p className="mt-3 text-muted-foreground text-sm">
              Εξαρτάται από εμβέλεια και ανταγωνισμό. Δίνουμε προσφορά σε {location.currency} με σαφή
              πακέτα - χωρίς κρυφές χρεώσεις.
            </p>
          </details>
          <details className="card p-6 group">
            <summary className="font-semibold cursor-pointer">
              Υποστηρίζετε ελληνικό και αγγλικό περιεχόμενο;
            </summary>
            <p className="mt-3 text-muted-foreground text-sm">
              Ναι. Για διεθνή τουρισμό στην {city} συνδυάζουμε ελληνικές landing σελίδες, hreflang και
              στρατηγική για ξένες αγορές.
            </p>
          </details>
          <details className="card p-6 group">
            <summary className="font-semibold cursor-pointer">
              Τι είναι GEO/AEO και γιατί μετράει στην Ελλάδα;
            </summary>
            <p className="mt-3 text-muted-foreground text-sm">
              Όλο και περισσότεροι χρήστες ρωτούν AI βοηθούς αντί να ψάχνουν στη Google. Το GEO φέρνει
              αναφορές (citations) στα μοντέλα, το AEO κερδίζει τις έτοιμες απαντήσεις - κρίσιμο για
              τουρισμό, υγεία και B2B υπηρεσίες.
            </p>
          </details>
        </div>
      </div>

      <div className="text-center py-12 border-t border-gray-100 mt-12">
        <h3 className="text-2xl font-bold mb-4">Έτοιμοι να αναπτύξετε την επιχείρησή σας στην {city};</h3>
        <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
          Ζητήστε δωρεάν προσφορά - ή ξεκινήστε δοκιμή 7 ημερών της πλατφόρμας SEO μας.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={lp('/contact')}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Δωρεάν προσφορά - {city}
          </Link>
          <Link href={lp('/blog/geo-aeo-ellada')} className="btn btn-outline text-lg px-8 py-4">
            Οδηγός GEO &amp; AEO Ελλάδα
          </Link>
        </div>
      </div>
    </div>
  );
}
