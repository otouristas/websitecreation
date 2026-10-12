const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const ts = require('typescript');
const { randomUUID } = require('node:crypto');

const storage = () => {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
};
function fixture() {
  const localStorage = storage();
  const sessionStorage = storage();
  const scripts = [];
  const window = { crypto: { randomUUID }, location: {
    origin: 'https://anotherseoguru.com', pathname: '/el/contact',
    search: '?gclid=verified_google_click_1234&email=private@example.com&token=secret',
    href: 'https://anotherseoguru.com/el/contact?email=private@example.com#secret',
  } };
  const document = { title: 'Contact', cookie: '', getElementById: id => scripts.find(s => s.id === id), createElement: () => ({}), head: { appendChild: el => scripts.push(el) } };
  let emailOk = false, appOk = false, analyticsThrows = false;
  const shared = { window, document, localStorage, sessionStorage, URL, URLSearchParams, Date, performance: {now: () => 4000} };
  function module(path, dependencies = {}) {
    const exports = {};
    const compiled = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(compiled, { ...shared, exports, require: name => {
      if (!(name in dependencies)) throw new Error(`Unstubbed import: ${name}`);
      return dependencies[name];
    }, fetch: async () => ({ ok: appOk, json: async () => ({ token: 'private-lead-token' }) }) });
    return exports;
  }
  const analytics = module('src/lib/analytics.ts');
  const leads = module('src/lib/leads.ts', {
    '@/lib/app-links': { getAppPath: path => `https://app.anotherseoguru.com${path}` },
    '@/lib/formspree': { submitToFormspree: async () => ({ ok: emailOk, error: emailOk ? undefined : 'offline' }) },
    '@/lib/analytics': { trackLead: (...args) => { if (analyticsThrows) throw new Error('blocked tag'); analytics.trackLead(...args); } },
  });
  const commands = () => (window.dataLayer ?? []).map(args => Array.from(args));
  const conversions = () => commands().filter(a => a[0] === 'event' && a[1] === 'conversion');
  return { window, localStorage, sessionStorage, scripts, analytics, leads, commands, conversions,
    outcome: (email, app, throws = false) => { emailOk = email; appOk = app; analyticsThrows = throws; } };
}
const enquiry = { name: 'Private Person', email: 'private@example.com', phone: '+301234567890', company: 'Private Hotel', website: 'https://private-hotel.example', message: 'Private details', service: 'webdesign', locale: 'el', source: 'website-contact' };
const payload = { form: 'contact', email: enquiry.email };

(async () => {
  let f = fixture();
  f.outcome(true, true);
  assert.equal((await f.leads.submitLead(payload, enquiry)).ok, true);
  assert.equal(f.scripts.length, 0, 'Accepted forms do not enable unconsented measurement');
  f.localStorage.setItem('cookie-consent', 'accepted');
  await f.leads.submitLead(payload, enquiry);
  assert.equal(f.conversions().length, 0, 'Legacy analytics consent never enables Google Ads');
  assert.ok(!f.commands().some(a => a[0] === 'config' && a[1] === 'AW-18400993971'));

  f = fixture();
  f.analytics.applyMeasurementConsent(true, true);
  f.outcome(true, true);
  assert.equal((await f.leads.submitLead(payload, enquiry)).ok, true);
  assert.equal(f.conversions().length, 1, 'Both accepting endpoints count one accepted enquiry');
  const params = f.conversions()[0][2];
  assert.equal(params.send_to, 'AW-18400993971/FwkvCM7J_eQcELPFo8ZE');
  assert.match(params.transaction_id, /^[a-f0-9-]{36}$/i);
  assert.equal(params.page_location, 'https://anotherseoguru.com/el/contact?gclid=verified_google_click_1234');
  assert.equal(params.value, undefined, 'An enquiry must not be reported as paid revenue');
  f.analytics.trackLead('contact', { email: enquiry.email, website: enquiry.website }, params.transaction_id);
  assert.equal(f.conversions().length, 1, 'Replaying one transaction ID does not count twice');
  const events = f.commands().filter(a => a[0] === 'event');
  for (const value of ['private@example.com', 'private-hotel.example', 'Private Person', 'Private details', 'private-lead-token', 'token=secret']) assert.ok(!JSON.stringify(events).includes(value), `No private enquiry data: ${value}`);
  assert.equal(f.commands().find(a => a[0] === 'config' && a[1] === 'AW-18400993971')[2].allow_enhanced_conversions, false);
  f.outcome(false, false);
  assert.equal((await f.leads.submitLead(payload, enquiry)).ok, false);
  assert.equal(f.conversions().length, 1, 'Failed submissions never count as leads');
  f.outcome(true, false);
  assert.equal((await f.leads.submitLead(payload, enquiry)).ok, true);
  assert.equal(f.conversions().length, 2, 'Email fallback acceptance still counts');
  f.outcome(false, true);
  await f.leads.submitLead(payload, enquiry);
  assert.equal(f.conversions().length, 3, 'App fallback acceptance still counts');
  f.analytics.applyMeasurementConsent(true, false);
  await f.leads.submitLead(payload, enquiry);
  assert.equal(f.conversions().length, 3, 'Revoking advertising consent immediately blocks conversions');
  assert.equal(f.sessionStorage.getItem('ads-gclid'), null);
  f.analytics.applyMeasurementConsent(false, false);
  const eventCount = f.commands().filter(a => a[0] === 'event').length;
  await f.leads.submitLead(payload, enquiry);
  assert.equal(f.commands().filter(a => a[0] === 'event').length, eventCount);
  f.analytics.applyMeasurementConsent(true, true);
  assert.equal(f.scripts.length, 1, 'Reaccepting does not add a second tag');
  f.outcome(true, false, true);
  assert.equal((await f.leads.submitLead(payload, enquiry)).ok, true, 'A blocked tag cannot break an accepted enquiry');
  console.log('PASS: accepted-only leads, dual-endpoint deduplication, consent separation/revocation, attribution, no PII or false revenue, graceful tag failure');
})().catch(error => { console.error(error); process.exitCode = 1; });
