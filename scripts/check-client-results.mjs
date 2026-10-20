import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const report = JSON.parse(await readFile(new URL('../src/data/client-search-results.json', import.meta.url)));
assert.equal(report.measurement, 'observed');
for (const site of report.sites) {
  assert.equal(site.points.length, 28, `${site.slug}: require 28 observed days`);
  assert.equal(new Set(site.points.map(p=>p.date)).size,28);
  assert.equal(site.coverageDays,28);
  for (let i=0;i<28;i++) {
    assert.equal(site.points[i].date,new Date(Date.parse(site.from+'T00:00:00Z')+i*86400000).toISOString().slice(0,10));
    for(const key of ['clicks','impressions'])assert.ok(Number.isSafeInteger(site.points[i][key])&&site.points[i][key]>=0);
  }
  assert.equal(site.points.at(-1).date,site.to);
  for(const key of ['clicks','impressions'])assert.equal(site[key],site.points.reduce((sum,p)=>sum+p[key],0),`${site.slug}: ${key} totals`);
  const csv=await readFile(new URL('../public'+site.csv,import.meta.url),'utf8');
  for(const p of site.points)assert.ok(csv.includes(`${p.date},${p.clicks},${p.impressions}`),`${site.slug}: source CSV mismatch`);
  if(site.comparison)assert.equal(site.comparison.coverageDays,28,'Only complete comparison windows may be published');
}
console.log(`${report.sites.length} client charts verified: complete 28-day coverage, unique dates, exact totals and source CSVs.`);
