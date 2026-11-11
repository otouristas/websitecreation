import assert from 'node:assert/strict';
import { auditPhase, parseTeamProgress } from '../src/lib/lead-progress.ts';

// A failed audit used to be converted to a green Done state by the component.
const failed = parseTeamProgress({ agents: [{ agent: 'auditor', status: 'failed' }], done: true });
assert.equal(auditPhase(failed), 'failed');
// Finishing other jobs cannot prove an audit happened.
assert.equal(auditPhase(parseTeamProgress({ agents: [{ agent: 'strategist', status: 'done' }], done: true })), 'unavailable');
// A completed crawl does not imply that an email was accepted.
const legacy = parseTeamProgress({ agents: [{ agent: 'auditor', status: 'done' }], done: true });
assert.equal(auditPhase(legacy), 'completed');
assert.equal(legacy.report_email_status, undefined);
// The two observed outcomes remain independent, even for a failed-check notification.
const notified = parseTeamProgress({ agents: [], audit_status: 'failed', report_email_status: 'sent', done: true });
assert.equal(auditPhase(notified), 'failed');
assert.equal(notified.report_email_status, 'sent');
const sending = parseTeamProgress({ agents: [], audit_status: 'completed', report_email_status: 'sending', done: false });
assert.equal(auditPhase(sending), 'completed');
assert.equal(sending.done, false);
assert.equal(sending.report_email_status, 'sending');
// Invalid wire fields must not become an invented success.
assert.equal(parseTeamProgress({ agents: [], done: 'yes' }), null);
assert.deepEqual(parseTeamProgress({ agents: [{ agent: 'auditor', status: 'complete-ish' }], done: true, audit_status: 'success', report_email_status: 'delivered-ish' }), { agents: [], done: true });
assert.equal(auditPhase(parseTeamProgress({ agents: [], done: true, audit_status: 'not_requested', report_email_status: 'not_requested' })), 'unavailable');
console.log('12 lead-progress assertions passed; no network requests or emails.');
