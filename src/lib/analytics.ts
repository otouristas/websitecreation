export const GA_MEASUREMENT_ID = 'G-FGFJEKZHB1';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function loadGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (document.getElementById('ga-script')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

export function trackLead(formName: string, extra?: Record<string, string>): void {
  trackEvent('generate_lead', { form_name: formName, ...extra });
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

export function trackPlanSelection(planName: string): void {
  trackEvent('plan_selection', { plan_name: planName });
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
