export const GA_MEASUREMENT_ID = 'G-FGFJEKZHB1';
export const AW_CONVERSION_ID = 'AW-18400993971';
export const COOKIE_CONSENT_KEY = 'cookie-consent';

/**
 * Google Ads conversion destination. Replace with `AW-18400993971/LABEL`
 * when Google Ads provides a conversion label for lead form submits.
 */
export const AW_LEAD_SEND_TO = AW_CONVERSION_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const CONSENT_GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
} as const;

const CONSENT_DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
} as const;

/**
 * Inline Google tag bootstrap for every page `<head>`.
 * Defines gtag, Consent Mode defaults (restored from localStorage), then
 * configs Google Ads + GA4. Pageviews are sent manually so SPA navigations count.
 */
export const GOOGLE_TAG_INIT_SCRIPT = `(function(){window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=gtag;var granted=false;try{granted=localStorage.getItem('${COOKIE_CONSENT_KEY}')==='accepted';}catch(e){}gtag('consent','default',{ad_storage:granted?'granted':'denied',ad_user_data:granted?'granted':'denied',ad_personalization:granted?'granted':'denied',analytics_storage:granted?'granted':'denied',wait_for_update:500});gtag('js',new Date());gtag('config','${AW_CONVERSION_ID}',{send_page_view:false});gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true,send_page_view:false});})();`;

export function loadGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  // gtag.js only processes `arguments` objects pushed to dataLayer, a plain
  // array is silently ignored, so this must NOT use rest parameters.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as Window['gtag'];
  window.gtag!('js', new Date());
  // Pageviews are sent manually (trackPageView) so SPA route changes count.
  window.gtag!('config', AW_CONVERSION_ID, { send_page_view: false });
  window.gtag!('config', GA_MEASUREMENT_ID, { anonymize_ip: true, send_page_view: false });

  if (document.getElementById('google-tag-gtag-js') || document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'google-tag-gtag-js';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${AW_CONVERSION_ID}`;
  document.head.appendChild(script);
}

export function grantTrackingConsent(): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', CONSENT_GRANTED);
}

export function denyTrackingConsent(): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', CONSENT_DENIED);
}

/** Grant consent (or load the tag as a fallback) and record the current URL. */
export function enableGoogleAnalytics(): void {
  loadGoogleAnalytics();
  grantTrackingConsent();
  if (typeof window === 'undefined') return;
  trackPageView(window.location.href);
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

export function trackGoogleAdsConversion(
  extra?: Record<string, string | number | boolean | undefined>,
): void {
  trackEvent('conversion', {
    send_to: AW_LEAD_SEND_TO,
    ...extra,
  });
}

export function trackLead(formName: string, extra?: Record<string, string>): void {
  trackEvent('generate_lead', { form_name: formName, ...extra });
  trackGoogleAdsConversion({ form_name: formName, ...extra });
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
