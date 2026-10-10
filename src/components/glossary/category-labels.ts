import type { GlossaryCategory, GlossaryTerm } from "@/data/glossary-data";
import type { SiteLocale } from "@/lib/i18n/locale";

/**
 * Greek names for the glossary categories. The data file only carries English
 * category copy, so /el used to show "Link Building" and friends next to Greek
 * terms. Kept here (plain module, no "use client") so the server-rendered term
 * list and the interactive client read the same labels.
 */
const CATEGORY_EL: Record<string, { title: string; description: string }> = {
  "on-page-seo": {
    title: "SEO στη σελίδα",
    description: "Βελτιστοποιήσεις που γίνονται απευθείας μέσα στις σελίδες σας",
  },
  "technical-seo": {
    title: "Τεχνικό SEO",
    description: "Η υποδομή του site, ώστε οι μηχανές να το ανιχνεύουν και να το ευρετηριάζουν σωστά",
  },
  "link-building": {
    title: "Link building",
    description: "Πώς αποκτάτε ποιοτικούς συνδέσμους από άλλα sites",
  },
  "keyword-research": {
    title: "Έρευνα λέξεων-κλειδιών",
    description: "Εντοπισμός και ανάλυση των αναζητήσεων που αξίζει να στοχεύσετε",
  },
  "analytics-metrics": {
    title: "Μετρήσεις & δείκτες",
    description: "Οι δείκτες που δείχνουν αν το SEO αποδίδει",
  },
  "serp-features": {
    title: "Στοιχεία της σελίδας αποτελεσμάτων",
    description: "Οι ειδικοί τύποι αποτελεσμάτων που εμφανίζει η Google",
  },
  "local-seo": {
    title: "Τοπικό SEO",
    description: "Βελτιστοποίηση για τοπικές αναζητήσεις και τοπικές επιχειρήσεις",
  },
  "content-strategy": {
    title: "Στρατηγική περιεχομένου",
    description: "Σχεδιασμός περιεχομένου που κατατάσσεται και φέρνει πελάτες",
  },
  "core-web-vitals": {
    title: "Core Web Vitals",
    description: "Οι μετρικές της Google για την εμπειρία χρήστη και την ταχύτητα",
  },
  "algorithm-updates": {
    title: "Αλγόριθμος & ενημερώσεις",
    description: "Οι αλλαγές στον αλγόριθμο της Google και η επίδρασή τους στις κατατάξεις",
  },
  "ai-seo": {
    title: "AI & SEO",
    description: "Οι τεχνολογίες AI και πώς αλλάζουν την αναζήτηση",
  },
  "tools-platforms": {
    title: "Εργαλεία & πλατφόρμες",
    description: "Τα βασικά εργαλεία για ανάλυση και βελτιστοποίηση",
  },
  "advanced-concepts": {
    title: "Προχωρημένες έννοιες",
    description: "Προχωρημένες στρατηγικές και εξειδικευμένες τεχνικές SEO",
  },
};

export function categoryTitle(category: GlossaryCategory, locale: SiteLocale): string {
  return locale === "el" ? (CATEGORY_EL[category.id]?.title ?? category.title) : category.title;
}

export function categoryDescription(category: GlossaryCategory, locale: SiteLocale): string {
  return locale === "el" ? (CATEGORY_EL[category.id]?.description ?? category.description) : category.description;
}

/** A term reads fully in Greek only when its name and both definitions are translated. */
export function isTermTranslated(term: GlossaryTerm): boolean {
  return Boolean(term.termEl && term.shortDefinitionEl && term.fullDefinitionEl);
}
