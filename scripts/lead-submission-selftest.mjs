import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { parseTeamProgress } from '../src/lib/lead-progress.ts';

const source = readFileSync(new URL('../src/lib/leads.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
let response = 'accepted';
const requests = [], events = [];
const module = { exports: {} };
vm.runInNewContext(code, {
  module, exports: module.exports,
  require: name => {
    if (name === '@/lib/app-links') return { getAppPath: path => `https://app.example${path}` };
    if (name === '@/lib/analytics') return { trackLead: (...args) => events.push(args) };
    if (name === '@/lib/lead-progress') return { parseTeamProgress };
    throw new Error(`Unapproved delivery dependency: ${name}`);
  },
  performance: { now: () => 9000 }, window: { crypto: { randomUUID: () => 'test-event-id' } },
  fetch: async (url, options) => {
    requests.push({ url, options });
    assert.equal(url, 'https://app.example/api/leads', 'the authoritative intake is the only destination');
    if (response === 'offline') throw new Error('network unavailable');
    return { ok: ['accepted', 'missing-ok', 'malformed'].includes(response), json: async () => {
      if (response === 'malformed') throw new Error('invalid JSON');
      return { ...(response === 'accepted' ? { ok: true } : {}), token: 'status-token' };
    } };
  },
});
const lead = { name: 'Fixture', email: 'fixture@example.test', website: 'https://example.test', service: 'seo', locale: 'el', source: 'website-free-audit' };
const legacy = { email: lead.email, estimate: 'EUR 11890', offer_url: 'https://unapproved.example/offer' };
let result = await module.exports.submitLead(legacy, lead);
assert.equal(result.ok, true);
assert.equal(result.token, 'status-token');
assert.equal(requests.length, 1);
assert.equal(events.length, 1);
const payload = JSON.parse(requests[0].options.body);
assert.equal(payload.service, 'seo');
assert.equal(payload.source, 'website-free-audit');
assert.equal(payload.estimate, undefined);
assert.equal(payload.offer_url, undefined);
response = 'rejected'; requests.length = 0;
result = await module.exports.submitLead(legacy, lead);
assert.equal(result.ok, false);
assert.equal(requests.length, 1, 'no backup auto-responder is called after an intake error');
assert.equal(events.length, 1, 'a rejected lead is not counted as successful');
for (const mode of ['missing-ok', 'malformed']) {
  response = mode; requests.length = 0;
  result = await module.exports.submitLead(legacy, lead);
  assert.equal(result.ok, false, 'HTTP 200 alone does not prove that an enquiry was stored');
  assert.equal(events.length, 1);
}
response = 'offline'; requests.length = 0;
result = await module.exports.submitLead(legacy, lead);
assert.equal(result.ok, false);
assert.equal(requests.length, 1);
response = 'accepted'; requests.length = 0;
result = await module.exports.submitLead(legacy, { ...lead, email: '', phone: '' });
assert.equal(result.ok, false);
assert.equal(requests.length, 0);
console.log('Authoritative submission, rejected/offline intake, invalid contact and no parallel reply verified; no real network/email.');
