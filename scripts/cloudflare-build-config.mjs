import fs from 'node:fs';
const p='dist/server/wrangler.json';
const c=JSON.parse(fs.readFileSync(p,'utf8'));
c.rules=(c.rules||[]).filter(r=>r.type!=='Text');
c.rules.push({type:'Text',globs:['**/*.txt','**/*.sql'],fallthrough:false});
fs.writeFileSync(p,JSON.stringify(c,null,2)+'\n');
