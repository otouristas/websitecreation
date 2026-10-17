import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { localProse } from '@/components/seo/location-styles';
import { CtaBand, KitHeading, KitSection } from '@/components/kit';
import { AccentTitle, FaqBlock, LinkCards, ServiceHero } from '@/components/service-kit';
import {
  buildHubSchemas,
  HUB_FAQS,
  PLACE_PAGES,
  PLACE_REGION_LABEL,
  PLACE_REGION_ORDER,
  placesInRegion,
  type PlaceRegionId,
} from '@/data/place-seo';

const EN_ALTERNATE = '/en/seo-services';

const RETHYMNO = {
  href: '/el/services/seo-audits/rethymno-gr',
  title: 'Ρέθυμνο',
  body: 'Η σελίδα που ήδη υπάρχει για το Ρέθυμνο. Η διεύθυνση δεν αλλάζει.',
};

const SERVICES: readonly { href: string; title: string; body: string }[] = [
  { href: '/el/seo-services', title: 'Υπηρεσίες SEO', body: 'Μηνιαία προώθηση, τεχνική δουλειά και περιεχόμενο.' },
  { href: '/el/services/website-creation', title: 'Κατασκευή ιστοσελίδων', body: 'Όταν η σελίδα δεν υπάρχει ακόμη ή δεν αντέχει την προώθηση.' },
  { href: '/el/services/local-seo', title: 'Τοπικό SEO', body: 'Google Business Profile, χάρτης και στοιχεία ανά σημείο.' },
  { href: '/el/services/seo-audits', title: 'Έλεγχος SEO', body: 'Τι κρατά την ιστοσελίδα πίσω, με σειρά διορθώσεων.' },
  { href: '/el/services/eshop-woocommerce', title: 'Κατασκευή e-shop', body: 'Κατάστημα όταν πουλάτε προϊόντα, όχι ραντεβού.' },
  { href: '/el/pricing', title: 'Τιμές', body: 'Μηνιαίο SEO από το πακέτο Foundations και πακέτα ιστοσελίδας.' },
];

function regionCards(region: PlaceRegionId) {
  const cards = placesInRegion(region).map((place) => ({
    href: `/el/seo/${place.slug}`,
    title: place.name,
    body: place.blurb,
  }));
  if (region === 'crete') cards.push(RETHYMNO);
  return cards;
}

export function HubView() {
  return (
    <>
      <SchemaMarkup schemas={buildHubSchemas()} />
      <Header locale="el" alternateHref={EN_ALTERNATE} />
      <main className="blueprint-grid relative z-0">
        <ServiceHero
          locale="el"
          breadcrumbs={[
            { name: 'Αρχική', url: '/el' },
            { name: 'SEO σε όλη την Ελλάδα', url: '/el/seo' },
          ]}
          pill={{ kind: 'live', tag: 'Ελλάδα', text: 'Μία σελίδα για κάθε τόπο', href: '/el/services' }}
          h1="SEO σε όλη την Ελλάδα"
          h1Accent="Ελλάδα"
          lead="Υπηρεσίες SEO και προώθηση ιστοσελίδων ανά πόλη και νησί. Διαλέξτε τον τόπο όπου πουλάτε. Η κατασκευή ιστοσελίδας, όταν χρειάζεται, συνδέεται από κάθε σελίδα."
          primaryLabel="Δωρεάν έλεγχος"
          primaryHref="/el/get-started"
          links={[
            { href: '/el/seo-services', label: 'Υπηρεσίες SEO' },
            { href: '/el/services/website-creation', label: 'Κατασκευή ιστοσελίδων' },
            { href: '/el/pricing', label: 'Τιμές' },
          ]}
        />

        <KitSection>
          <div className={localProse}>
            <p>
              Κάθε τόπος έχει μία σελίδα. Δεν ξανανοίγουμε τέσσερις διευθύνσεις για την ίδια πόλη, μία ανά υπηρεσία, με το ίδιο κείμενο και αλλαγμένο τον τίτλο. Αν πουλάτε στο Ηράκλειο, διαβάζετε το Ηράκλειο. Αν πουλάτε σε όλη την Κρήτη, ξεκινάτε από τη σελίδα του νησιού και συνεχίζετε στις πόλεις.
            </p>
            <p>
              Το Ρέθυμνο μένει στη διεύθυνση που ήδη έχει,{' '}
              <Link href={RETHYMNO.href} className="font-medium text-link underline-offset-4 hover:underline">
                SEO στο Ρέθυμνο
              </Link>
              . Οι υπόλοιποι τόποι αυτής της φάσης είναι παρακάτω, ομαδοποιημένοι ανά περιοχή.
            </p>
          </div>
        </KitSection>

        {PLACE_REGION_ORDER.map((region, index) => {
          const cards = regionCards(region);
          if (cards.length === 0) return null;
          return (
            <KitSection key={region} tinted={index % 2 === 0} id={region}>
              <KitHeading eyebrow="Περιοχή" title={<AccentTitle text={PLACE_REGION_LABEL[region]} />} />
              <LinkCards className="mt-10" items={cards} />
            </KitSection>
          );
        })}

        <KitSection id="services">
          <KitHeading
            eyebrow="Υπηρεσίες"
            title={<AccentTitle text="Τι συνδέεται με κάθε τόπο" />}
            description="Οι σελίδες τόπου δεν αντικαθιστούν τις υπηρεσίες. Στέλνουν σε αυτές."
          />
          <LinkCards className="mt-10" items={SERVICES} />
          <p className="mt-8 text-[14px] text-muted-foreground">
            {PLACE_PAGES.length} τόποι σε αυτή τη φάση, συν το Ρέθυμνο στην υπάρχουσα διεύθυνσή του.
          </p>
        </KitSection>

        <FaqBlock locale="el" title={<AccentTitle text="Συχνές ερωτήσεις" />} faqs={HUB_FAQS} />

        <CtaBand
          locale="el"
          source="place-seo-hub"
          title={<AccentTitle text="Πείτε μας τον τόπο και την ιστοσελίδα" />}
          description="Ο έλεγχος κοιτάζει τη δική σας σελίδα και τους ανταγωνιστές του τόπου σας. Η τιμή βγαίνει μετά, όχι από μια λίστα λέξεων."
        />
      </main>
      <Footer locale="el" />
    </>
  );
}
