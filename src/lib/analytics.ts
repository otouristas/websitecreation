export const GA_MEASUREMENT_ID = 'G-FGFJEKZHB1';
// Verified in Google Ads account 265-537-3296, conversion action 7727965390.
export const GOOGLE_ADS_ID = 'AW-18400993971';
export const GOOGLE_ADS_LEAD_DESTINATION = `${GOOGLE_ADS_ID}/FwkvCM7J_eQcELPFo8ZE`;
export const ADS_CONSENT_KEY = 'ads-measurement-consent';
let adsConfigured = false;
const measuredLeads = new Set<string>();

function hasAdsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try { return localStorage.getItem(ADS_CONSENT_KEY) === 'accepted'; } catch { return false; }
}

/** Keep only Google click identifiers, after a separate advertising-measurement opt-in. */
function adsMeasurementUrl(): string {
  const safe = new URL(window.location.origin + window.location.pathname);
  if (!hasAdsConsent()) return safe.href;
  const query = new URLSearchParams(window.location.search);
  for (const key of ['gclid', 'gbraid', 'wbraid']) {
    try {
      const current = query.get(key);
      if (current && /^[A-Za-z0-9_-]{10,512}$/.test(current)) sessionStorage.setItem(`ads-${key}`, current);
      const stored = sessionStorage.getItem(`ads-${key}`);
      if (stored && /^[A-Za-z0-9_-]{10,512}$/.test(stored)) safe.searchParams.set(key, stored);
    } catch { /* Optional storage must not affect the form. */ }
  }
  return safe.href;
}

function configureAdsMeasurement(): void {
  const accepted = hasAdsConsent();
  window.gtag?.('consent', 'update', { ad_storage: accepted ? 'granted' : 'denied', ad_user_data: accepted ? 'granted' : 'denied', ad_personalization: 'denied' });
  window.gtag?.('set', 'page_location', accepted ? adsMeasurementUrl() : window.location.origin + window.location.pathname);
  if (!accepted || adsConfigured) return;
  window.gtag?.('config', GOOGLE_ADS_ID, { send_page_view: false, allow_enhanced_conversions: false, allow_ad_personalization_signals: false, page_location: adsMeasurementUrl(), page_referrer: '' });
  adsConfigured = true;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function loadGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;
  try { if (localStorage.getItem('cookie-consent') !== 'accepted') return; } catch { return; }
  Object.assign(window, { [`ga-disable-${GA_MEASUREMENT_ID}`]: false });
  if (document.getElementById('ga-script')) {
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    configureAdsMeasurement();
    return;
  }

  window.dataLayer = window.dataLayer || [];
  // gtag.js only processes `arguments` objects pushed to dataLayer, a plain
  // array is silently ignored, so this must NOT use rest parameters.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as Window['gtag'];
  // Pageviews are sent manually (trackPageView) so SPA route changes count.
  window.gtag!('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag!('set', 'allow_ad_personalization_signals', false);
  window.gtag!('set', 'ads_data_redaction', true);
  window.gtag!('set', 'page_referrer', '');
  window.gtag!('set', 'page_location', window.location.origin + window.location.pathname);
  window.gtag!('js', new Date());
  window.gtag!('config', GA_MEASUREMENT_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: window.location.origin + window.location.pathname, page_referrer: '' });
  configureAdsMeasurement();

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Load gtag and record the current URL. Used when the visitor accepts cookies. */
export function enableGoogleAnalytics(): void {
  loadGoogleAnalytics();
  if (typeof window === 'undefined') return;
  trackPageView(window.location.href);
}

export function trackPageView(url: string): void {
  trackEvent('page_view', {
    page_location: new URL(url, window.location.origin).origin + new URL(url, window.location.origin).pathname,
    page_referrer: '',
    page_path: new URL(url, window.location.origin).pathname,
    page_title: document.title,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  try { if (localStorage.getItem('cookie-consent') !== 'accepted') return; } catch { return; }
  window.gtag('event', eventName, { ...params, send_to: GA_MEASUREMENT_ID });
}

export function trackLead(formName: string, extra?: Record<string, string>, transactionId?: string): void {
  if (typeof window === 'undefined') return;
  try { if (localStorage.getItem('cookie-consent') !== 'accepted') return; } catch { return; }
  if (!['contact', 'get-started', 'instant_scan', 'free_audit'].includes(formName)) return;
  const id = transactionId ?? window.crypto.randomUUID();
  if (!/^[a-f0-9-]{36}$/i.test(id) || measuredLeads.has(id)) return;
  loadGoogleAnalytics();
  measuredLeads.add(id);
  const safeExtra = Object.fromEntries(Object.entries(extra ?? {}).filter(([key, value]) =>
    (key === 'service' && ['seo', 'webdesign', 'both', 'unspecified'].includes(value)) ||
    (key === 'locale' && ['en', 'el'].includes(value)),
  ));
  trackEvent('generate_lead', { form_name: formName, ...safeExtra });
  if (hasAdsConsent()) window.gtag?.('event', 'conversion', {
    send_to: GOOGLE_ADS_LEAD_DESTINATION, transaction_id: id,
    page_location: adsMeasurementUrl(), page_referrer: '',
  });
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

/** Revocation stops future events and removes analytics cookies, not historical server data. */
export function disableGoogleAnalytics(): void {
  Object.assign(window, { [`ga-disable-${GA_MEASUREMENT_ID}`]: true });
  window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (!/^_ga(?:_|$)|^_gcl_/.test(name)) continue;
    for (const domain of ['', '; domain=.anotherseoguru.com'])
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
  }
}

/** Previous analytics consent never implies permission to measure advertising. */
export function applyMeasurementConsent(analytics: boolean, ads: boolean): void {
  try {
    localStorage.setItem('cookie-consent', analytics ? 'accepted' : 'declined');
    localStorage.setItem(ADS_CONSENT_KEY, analytics && ads ? 'accepted' : 'declined');
  } catch { return; }
  if (!ads || !analytics) {
    window.gtag?.('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    for (const key of ['gclid', 'gbraid', 'wbraid']) {
      try { sessionStorage.removeItem(`ads-${key}`); } catch { /* Storage may be unavailable. */ }
    }
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^_gcl_/.test(name)) continue;
      for (const domain of ['', '; domain=.anotherseoguru.com']) document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
  if (analytics) enableGoogleAnalytics(); else disableGoogleAnalytics();
}
