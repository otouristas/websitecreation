import { readFileSync, writeFileSync, cpSync } from 'node:fs';

// Run in a disposable checkout. The product's package and lock stay independent.
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const app = readJson('package.json');
const tools = readJson('cloudflare/agency/toolchain.json');
Object.assign(app.dependencies, tools);
writeFileSync('package.json', JSON.stringify(app, null, 2) + '\n');
cpSync('cloudflare/agency/package-lock.json', 'package-lock.json');
