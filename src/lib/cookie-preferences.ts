/** Footer (and any other in-page control) asks CookieConsent to reopen the dialog. */
export const OPEN_COOKIE_PREFERENCES_EVENT = 'asg:open-cookie-preferences';

export function openCookiePreferences(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
}
