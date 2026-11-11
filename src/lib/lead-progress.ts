/** The public progress view reports observed work and accepted email sends separately. */
export type TeamAgent = 'auditor' | 'keywords' | 'competitors' | 'content' | 'strategist';
export type WorkStatus = 'queued' | 'running' | 'done' | 'failed';
export type AuditStatus = 'queued' | 'running' | 'completed' | 'failed' | 'not_requested';
export type ReportEmailStatus = 'pending' | 'sending' | 'sent' | 'failed' | 'not_requested';
export interface TeamProgress {
  agents: Array<{ agent: TeamAgent; status: WorkStatus }>;
  done: boolean;
  audit_status?: AuditStatus;
  report_email_status?: ReportEmailStatus;
}
const AGENTS = new Set(['auditor', 'keywords', 'competitors', 'content', 'strategist']);
const WORK = new Set(['queued', 'running', 'done', 'failed']);
const AUDIT = new Set(['queued', 'running', 'completed', 'failed', 'not_requested']);
const EMAIL = new Set(['pending', 'sending', 'sent', 'failed', 'not_requested']);

export function parseTeamProgress(raw: unknown): TeamProgress | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const data = raw as Record<string, unknown>;
  if (!Array.isArray(data.agents) || typeof data.done !== 'boolean') return null;
  const agents = data.agents.flatMap(item => {
    if (!item || typeof item !== 'object' || !AGENTS.has(item.agent) || !WORK.has(item.status)) return [];
    return [{ agent: item.agent as TeamAgent, status: item.status as WorkStatus }];
  });
  return { agents, done: data.done,
    ...(typeof data.audit_status === 'string' && AUDIT.has(data.audit_status) ? { audit_status: data.audit_status as AuditStatus } : {}),
    ...(typeof data.report_email_status === 'string' && EMAIL.has(data.report_email_status) ? { report_email_status: data.report_email_status as ReportEmailStatus } : {}),
  };
}

export function auditPhase(progress: TeamProgress | null): Exclude<AuditStatus, 'not_requested'> | 'unavailable' {
  if (!progress) return 'queued';
  if (progress.audit_status) return progress.audit_status === 'not_requested' ? 'unavailable' : progress.audit_status;
  const legacy = progress.agents.find(item => item.agent === 'auditor');
  if (!legacy) return 'unavailable';
  return legacy.status === 'done' ? 'completed' : legacy.status;
}
