import { getAppPath } from '@/lib/app-links';
import { submitToFormspree } from '@/lib/formspree';

/**
 * Every enquiry the site collects goes to two places at once:
 *
 *   1. the agency pipeline in the app (POST app.anotherseoguru.com/api/leads), so it shows up under
 *      Leads in the owner's account with an audit and a draft proposal attached;
 *   2. Formspree, which emails it, as the safety net while the app endpoint is new.
 *
 * The visitor sees success when either one accepted it, so a lead is never lost to one outage.
 * The app endpoint answers CORS for anotherseoguru.com only; previews fall back to Formspree.
 */

export type LeadSource = 'website-contact' | 'website-get-started' | 'website-scan';
export type LeadService = 'seo' | 'webdesign' | 'both';

export interface AppLead {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  company?: string;
  service: LeadService;
  message?: string;
  locale: 'en' | 'el';
  source: LeadSource;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "maria.k@hotel.gr" -> "Maria K"; used when a form only asked for an email. */
function nameFromEmail(email: string): string {
  const local = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
  return local.replace(/\b\w/g, (c) => c.toUpperCase()) || email;
}

function clip(value: string | undefined, max: number): string | undefined {
  const v = value?.trim();
  return v ? v.slice(0, max) : undefined;
}

/**
 * Post to the app's lead endpoint. It needs a name, an email and a website to start the audit, so a
 * lead missing the email or website stays with Formspree only. Returns whether the app accepted it.
 */
export async function sendLeadToApp(lead: AppLead): Promise<boolean> {
  const email = lead.email?.trim().toLowerCase();
  const website = lead.website?.trim();
  if (!email || !EMAIL.test(email) || !website || website.length < 3) return false;

  const body = {
    name: clip(lead.name, 120) ?? nameFromEmail(email),
    email,
    website: website.slice(0, 300),
    phone: clip(lead.phone, 40),
    company: clip(lead.company, 160),
    service: lead.service,
    message: clip(lead.message, 4000),
    locale: lead.locale,
    source: lead.source,
    // Time on page; the endpoint treats instant posts as bots.
    elapsed: typeof performance !== 'undefined' ? Math.round(performance.now()) : undefined,
  };

  try {
    const res = await fetch(getAppPath('/api/leads'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Send to the app and to Formspree together; succeed when either accepted the lead. */
export async function submitLead(
  formspreeData: Record<string, string>,
  lead: AppLead,
): Promise<{ ok: boolean; error?: string }> {
  const [email, app] = await Promise.allSettled([submitToFormspree(formspreeData), sendLeadToApp(lead)]);
  const emailResult = email.status === 'fulfilled' ? email.value : { ok: false, error: undefined };
  const appOk = app.status === 'fulfilled' && app.value;
  if (emailResult.ok || appOk) return { ok: true };
  return { ok: false, error: emailResult.error };
}

/** Plain-text summary of labelled answers for the lead's message field, skipping empty ones. */
export function describeAnswers(answers: Record<string, string | undefined>): string {
  return Object.entries(answers)
    .filter(([, v]) => v && v.trim() && !/^(none|not provided|not selected|not specified)$/i.test(v.trim()))
    .map(([k, v]) => `${k}: ${v!.trim()}`)
    .join('\n');
}
