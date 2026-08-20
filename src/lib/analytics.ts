export const GA_MEASUREMENT_ID = 'G-FGFJEKZHB1';
export const GOOGLE_ADS_ID = 'AW-18400993971';

/**
 * gtag.js is loaded once with the Ads ID and both destinations are configured
 * from it, so a single request serves GA4 and Google Ads on every page.
 */
export const GOOGLE_TAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
export const GOOGLE_TAG_ORIGIN = 'https://www.googletagmanager.com';
const GOOGLE_TAG_SCRIPT_ID = 'google-tag-script';

export const CONSENT_STORAGE_KEY = 'cookie-consent';

export type ConsentChoice = 'accepted' | 'declined';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Optional Google Ads conversion action label (the part after the slash in
 * `AW-18400993971/AbC-D_efG`). Without it, Ads still receives the GA4 events
 * below and they can be imported as conversions from the Ads UI.
 */
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;

/**
 * Inline head script, rendered on every page.
 *
 * Consent Mode v2: ad and analytics storage start denied, so no Google cookies
 * are written until the visitor accepts the banner, while the tag itself is
 * still present site-wide for Ads conversion measurement. `wait_for_update` is
 * omitted on purpose - the stored choice is read synchronously here, so there
 * is no async CMP for gtag to wait on.
 *
 * The loader is appended from this script rather than written as a
 * `<script async src>` tag because React 19 hoists async scripts to the top of
 * <head>, which would let gtag.js run before the consent defaults are set.
 */
export const GOOGLE_TAG_BOOTSTRAP = `(function(){
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=gtag;
var granted=false;
try{granted=localStorage.getItem('${CONSENT_STORAGE_KEY}')==='accepted';}catch(e){}
var storage=granted?'granted':'denied';
gtag('consent','default',{ad_storage:storage,ad_user_data:storage,ad_personalization:storage,analytics_storage:storage});
gtag('set','ads_data_redaction',!granted);
gtag('set','url_passthrough',true);
gtag('js',new Date());
gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true,send_page_view:false});
gtag('config','${GOOGLE_ADS_ID}');
if(!document.getElementById('${GOOGLE_TAG_SCRIPT_ID}')){
var s=document.createElement('script');
s.id='${GOOGLE_TAG_SCRIPT_ID}';
s.async=true;
s.src='${GOOGLE_TAG_SRC}';
document.head.appendChild(s);
}
})();`;

export function readConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'accepted' || stored === 'declined' ? stored : null;
  } catch {
    return null;
  }
}

export function hasConsent(): boolean {
  return readConsent() === 'accepted';
}

/**
 * Persist the visitor's banner choice and tell gtag about it. Accepting also
 * records the current page, which the initial page_view skipped.
 */
export function setConsent(choice: ConsentChoice): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Private browsing modes can reject writes; consent stays denied.
  }

  const storage = choice === 'accepted' ? 'granted' : 'denied';
  window.gtag?.('consent', 'update', {
    ad_storage: storage,
    ad_user_data: storage,
    ad_personalization: storage,
    analytics_storage: storage,
  });
  window.gtag?.('set', 'ads_data_redaction', choice !== 'accepted');

  if (choice === 'accepted') trackPageView(window.location.href);
}

export function trackPageView(url: string): void {
  trackEvent('page_view', {
    page_location: url,
    page_path: new URL(url, window.location.origin).pathname,
    page_title: document.title,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

/** Fire a Google Ads conversion action. No-op until a label is configured. */
export function trackAdsConversion(
  label: string | undefined,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!label) return;
  trackEvent('conversion', { send_to: `${GOOGLE_ADS_ID}/${label}`, ...params });
}

export function trackLead(formName: string, extra?: Record<string, string>): void {
  trackEvent('generate_lead', { form_name: formName,
    ...extra });
  trackAdsConversion(ADS_LEAD_LABEL, { form_name: formName });
}

export function trackFormStart(formName: string): void {
  trackEvent('form_start', { form_name: formName });
}

export function trackFormSubmit(formName: string): void {
  trackEvent('form_submit', { form_name: formName });
}

export function trackCtaClick(ctaName: string): void {
  trackEvent('cta_click', { cta_name: ctaName });
}


export function captureUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}
