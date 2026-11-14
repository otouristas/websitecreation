import { getAppPath } from '@/lib/app-links';
import { trackLead } from '@/lib/analytics';
import { parseTeamProgress, type TeamProgress } from '@/lib/lead-progress';
export type { TeamAgent, TeamProgress } from '@/lib/lead-progress';

/**
 * Every enquiry goes to the app's persisted agency pipeline. That endpoint
 * owns measured reports, acknowledgements and the existing owner notification.
 * A single delivery path avoids a second provider's unrelated auto-response.
 * On the agency Worker, the browser posts to its own origin. Both paths use the same app intake.
 */

export type LeadSource = 'website-contact' | 'website-get-started' | 'website-scan' | 'website-free-audit';
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

function leadEndpoint(): string {
  return process.env.NEXT_PUBLIC_AGENCY_WORKER === '1' ? '/api/agency-leads' : getAppPath('/api/leads');
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
 * Post to the app's lead endpoint. It needs an email or a phone number; the name defaults on the app
 * side, and without a website the lead is stored without an audit. Returns whether the app accepted it, plus the
 * token that lets the page follow the SEO team's progress on the lead (leads with a website only).
 */
export async function sendLeadToApp(lead: AppLead): Promise<{ ok: boolean; token?: string }> {
  const email = lead.email?.trim().toLowerCase();
  const validEmail = email && EMAIL.test(email) ? email : undefined;
  const phone = clip(lead.phone, 40);
  if (!validEmail && (phone?.replace(/\D/g, '').length ?? 0) < 6) return { ok: false };

  const body = {
    name: clip(lead.name, 120) ?? (validEmail ? nameFromEmail(validEmail) : undefined),
    email: validEmail,
    website: clip(lead.website, 300),
    phone,
    company: clip(lead.company, 160),
    service: lead.service,
    message: clip(lead.message, 4000),
    locale: lead.locale,
    source: lead.source,
    // Time on page; the endpoint treats instant posts as bots.
    elapsed: typeof performance !== 'undefined' ? Math.round(performance.now()) : undefined,
  };

  try {
    const res = await fetch(leadEndpoint(), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json().catch(() => null)) as { ok?: unknown; token?: unknown } | null;
    if (!data || data.ok !== true) return { ok: false };
    return { ok: true, token: typeof data.token === 'string' ? data.token : undefined };
  } catch {
    return { ok: false };
  }
}

/** The SEO team's progress on a lead (statuses only, never findings); null when it can't be read. */
export async function fetchTeamProgress(token: string): Promise<TeamProgress | null> {
  try {
    const res = await fetch(`${leadEndpoint()}?token=${encodeURIComponent(token)}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return parseTeamProgress(await res.json());
  } catch {
    return null;
  }
}

/** Only a successful primary intake acknowledges an enquiry. No parallel auto-reply. */
export async function submitLead(
  legacyFormData: Record<string, string>,
  lead: AppLead,
): Promise<{ ok: boolean; error?: string; token?: string }> {
  // Keep existing forms source-compatible; their former backup-email fields
  // never leave the browser. The structured lead carries the actual enquiry.
  void legacyFormData;
  const app = await sendLeadToApp(lead);
  if (app.ok) {
    // An accepted enquiry counts once; failed submissions never count.
    try {
      const formNames: Record<LeadSource, string> = {
        'website-contact': 'contact', 'website-get-started': 'get-started',
        'website-scan': 'instant_scan', 'website-free-audit': 'free_audit',
      };
      trackLead(formNames[lead.source], { service: lead.service, locale: lead.locale }, window.crypto.randomUUID());
    } catch { /* Optional measurement must not prevent the success screen. */ }
    return { ok: true, token: app.token };
  }
  return { ok: false };
}

/** Plain-text summary of labelled answers for the lead's message field, skipping empty ones. */
export function describeAnswers(answers: Record<string, string | undefined>): string {
  return Object.entries(answers)
    .filter(([, v]) => v && v.trim() && !/^(none|not provided|not selected|not specified)$/i.test(v.trim()))
    .map(([k, v]) => `${k}: ${v!.trim()}`)
    .join('\n');
}
