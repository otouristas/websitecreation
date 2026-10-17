/**
 * Offer groups on /pricing. Ids match the existing section anchors
 * (`#websites`, `#seo`, `#software`) so older links still open the right group.
 *
 * Visibility is CSS, driven by `data-pricing-tab` on <html> and by :target.
 * Every panel stays in the server HTML. The inline script runs before those
 * panels are parsed, so a shared `?tab=` or hash link paints the right group
 * without a post-load swap.
 */

export const PRICING_TABS = ["websites", "seo", "software"] as const;

export type PricingTabId = (typeof PRICING_TABS)[number];

export const DEFAULT_PRICING_TAB: PricingTabId = "websites";

const TAB_ALIASES: Record<string, PricingTabId> = {
  websites: "websites",
  website: "websites",
  seo: "seo",
  "seo-services": "seo",
  compare: "seo",
  software: "software",
  app: "software",
  platform: "software",
};

export function tabFromLocation(search: string, hash: string): PricingTabId | null {
  const query = new URLSearchParams(search).get("tab");
  if (query && TAB_ALIASES[query]) return TAB_ALIASES[query];
  const id = hash.replace(/^#/, "");
  return TAB_ALIASES[id] ?? null;
}

export const PRICING_TAB_SCRIPT = `(function(){var map={websites:"websites",website:"websites",seo:"seo","seo-services":"seo",compare:"seo",software:"software",app:"software",platform:"software"};var q="";try{q=new URLSearchParams(location.search).get("tab")||"";}catch(e){}var h=(location.hash||"").replace(/^#/,"");var tab=map[q]||map[h]||"";if(tab)document.documentElement.setAttribute("data-pricing-tab",tab);})();`;

export const PRICING_TAB_CSS = `
#pricing-offers [data-pricing-panel] { display: none; }
html:not([data-pricing-tab]) #pricing-offers [data-pricing-panel="websites"],
html[data-pricing-tab="websites"] #pricing-offers [data-pricing-panel="websites"],
html[data-pricing-tab="seo"] #pricing-offers [data-pricing-panel="seo"],
html[data-pricing-tab="software"] #pricing-offers [data-pricing-panel="software"] { display: block; }
#pricing-offers:has(:target) [data-pricing-panel] { display: none; }
#pricing-offers:has(:target) [data-pricing-panel]:target,
#pricing-offers:has(:target) [data-pricing-panel]:has(:target) { display: block; }

#pricing-offers [data-pricing-tab-btn] {
  background: transparent;
  color: var(--muted-foreground);
  font-weight: 500;
  text-decoration: none;
}
#pricing-offers [data-pricing-tab-btn]:hover { color: var(--foreground); }
html:not([data-pricing-tab]) #pricing-offers [data-pricing-tab-btn="websites"],
html[data-pricing-tab="websites"] #pricing-offers [data-pricing-tab-btn="websites"],
html[data-pricing-tab="seo"] #pricing-offers [data-pricing-tab-btn="seo"],
html[data-pricing-tab="software"] #pricing-offers [data-pricing-tab-btn="software"] {
  background: var(--foreground);
  color: var(--background);
  font-weight: 600;
}
html #pricing-offers:has(:target) [data-pricing-tab-btn] {
  background: transparent;
  color: var(--muted-foreground);
  font-weight: 500;
}
html #pricing-offers:has(#websites:target) [data-pricing-tab-btn="websites"],
html #pricing-offers:has(#seo:target) [data-pricing-tab-btn="seo"],
html #pricing-offers:has(#compare:target) [data-pricing-tab-btn="seo"],
html #pricing-offers:has(#software:target) [data-pricing-tab-btn="software"] {
  background: var(--foreground);
  color: var(--background);
  font-weight: 600;
}

/* Unlayered, so it wins over the button's outline-none utility. The selected
   tab is an inverted pill; the offset ring stays visible on that fill in both themes. */
#pricing-offers [data-pricing-tab-btn]:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
`;
