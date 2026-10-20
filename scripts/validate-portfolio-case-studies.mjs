#!/usr/bin/env node
import assert from 'node:assert/strict';
import {portfolioProjects,projectResearch} from './portfolio-data.mjs';
const slugs=portfolioProjects.map(p=>p.slug);
assert.equal(new Set(slugs).size,slugs.length,'Duplicate project slugs');
assert.equal(Object.keys(projectResearch).length,slugs.length,'Brief coverage differs from project coverage');
const seen={en:new Set(),el:new Set()};
for(const p of portfolioProjects){
 const r=projectResearch[p.slug];assert.ok(r,`${p.slug}: missing reviewed brief`);
 for(const locale of ['en','el']){
  for(const key of ['overview','audience','journey'])assert.ok(typeof r[key][locale]==='string'&&r[key][locale].length>=40,`${p.slug}: missing ${key}.${locale}`);
  assert.ok(r.features[locale].length>=3&&r.keywords[locale].length>=2,`${p.slug}: incomplete ${locale} detail`);
  assert.ok(!seen[locale].has(r.overview[locale]),`${p.slug}: duplicate ${locale} overview`);seen[locale].add(r.overview[locale]);
  const summary=locale==='el'?p.summaryEl:p.summary;assert.equal(summary,r.overview[locale],`${p.slug}: stale ${locale} summary`);
  assert.equal(locale==='el'?p.seoDescriptionEl:p.seoDescription,summary,`${p.slug}: stale metadata`);
 }
 const greek=JSON.stringify(r).toLowerCase();assert.doesNotMatch(greek,/rankάρει|generic template|buyer journey|mobile ux|ιστοσελίδα ιστοσελίδα/);
}
assert.match(projectResearch['navos-ai'].overview.en,/business strategy/);
assert.match(projectResearch['project-shadow-ai'].overview.en,/WooCommerce/);
assert.match(projectResearch['ktima-orion'].overview.en,/wedding.*baptism/i);
assert.match(projectResearch['rethemnos'].overview.en,/news/);
assert.match(projectResearch['vwanaki'].overview.en,/cocktail/);
assert.equal(portfolioProjects.find(p=>p.slug==='project-shadow-ai').liveStatus,undefined);
console.log(`${slugs.length} complete, unique EN/EL project briefs match their card copy and metadata. Known business-identity regressions checked.`);
