import { glossaryCategories, type GlossaryCategory, type GlossaryTerm } from "@/data/glossary-data";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

/** Each term has its own page at /glossary/<id>; the id is the slug. */
export const glossaryPath = (locale: SiteLocale, id?: string) => localizedPath(locale, id ? `/glossary/${id}` : "/glossary");

export interface TermRef {
  readonly category: GlossaryCategory;
  readonly term: GlossaryTerm;
}

export function allTerms(): TermRef[] {
  return glossaryCategories.flatMap((category) => category.terms.map((term) => ({ category, term })));
}

export function findTerm(id: string): TermRef | null {
  return allTerms().find((r) => r.term.id === id) ?? null;
}

const pick = (el: boolean, gr: string | undefined, en: string) => (el ? (gr ?? en) : en);

/** A term's copy in the page language, falling back to English per field. */
export function termCopy(term: GlossaryTerm, locale: SiteLocale) {
  const el = locale === "el";
  return {
    name: pick(el, term.termEl, term.term),
    short: pick(el, term.shortDefinitionEl, term.shortDefinition),
    full: pick(el, term.fullDefinitionEl, term.fullDefinition),
    example: term.example ? pick(el, term.exampleEl, term.example) : undefined,
    technique: term.technique ? pick(el, term.techniqueEl, term.technique) : undefined,
    proTip: term.proTip ? pick(el, term.proTipEl, term.proTip) : undefined,
  };
}

export const glossaryTermName = (term: GlossaryTerm, locale: SiteLocale) => termCopy(term, locale).name;
