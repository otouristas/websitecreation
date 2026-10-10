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
 * The app endpoint answers CORS for anotherseoguru.com and this project's Vercel previews.
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
    const res = await fetch(getAppPath('/api/leads'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json().catch(() => ({}))) as { token?: unknown };
    return { ok: true, token: typeof data.token === 'string' ? data.token : undefined };
  } catch {
    return { ok: false };
  }
}

export type TeamAgent = 'auditor' | 'keywords' | 'competitors' | 'content' | 'strategist';
export interface TeamProgress {
  agents: Array<{ agent: TeamAgent; status: 'queued' | 'running' | 'done' | 'failed' }>;
  done: boolean;
}

/** The SEO team's progress on a lead (statuses only, never findings); null when it can't be read. */
export async function fetchTeamProgress(token: string): Promise<TeamProgress | null> {
  try {
    const res = await fetch(`${getAppPath('/api/leads')}?token=${encodeURIComponent(token)}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = (await res.json()) as Partial<TeamProgress>;
    return Array.isArray(data.agents) ? { agents: data.agents, done: Boolean(data.done) } : null;
  } catch {
    return null;
  }
}

/** Send to the app and to Formspree together; succeed when either accepted the lead. */
export async function submitLead(
  formspreeData: Record<string, string>,
  lead: AppLead,
): Promise<{ ok: boolean; error?: string; token?: string }> {
  const [email, app] = await Promise.allSettled([submitToFormspree(formspreeData), sendLeadToApp(lead)]);
  const emailResult = email.status === 'fulfilled' ? email.value : { ok: false, error: undefined };
  const appOk = app.status === 'fulfilled' && app.value.ok;
  if (emailResult.ok || appOk) return { ok: true, token: app.status === 'fulfilled' ? app.value.token : undefined };
  return { ok: false, error: emailResult.error };
}

/** Plain-text summary of labelled answers for the lead's message field, skipping empty ones. */
export function describeAnswers(answers: Record<string, string | undefined>): string {
  return Object.entries(answers)
    .filter(([, v]) => v && v.trim() && !/^(none|not provided|not selected|not specified)$/i.test(v.trim()))
    .map(([k, v]) => `${k}: ${v!.trim()}`)
    .join('\n');
}
