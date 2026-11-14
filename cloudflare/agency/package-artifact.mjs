import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve, relative, sep } from 'node:path';

const [output] = process.argv.slice(2);
if (!output) throw new Error('Pass the destination directory');
const pointer = JSON.parse(readFileSync('.wrangler/deploy/config.json', 'utf8'));
const absoluteConfig = resolve('.wrangler/deploy', pointer.configPath);
const dist = resolve('dist');
if (!absoluteConfig.startsWith(dist + sep)) throw new Error(`Expected a build config inside dist, received ${absoluteConfig}`);
mkdirSync(output, { recursive: true });
cpSync(dist, resolve(output, 'dist'), { recursive: true });
const config = JSON.parse(readFileSync(absoluteConfig, 'utf8'));
const bundlePath = (p) => relative(process.cwd(), resolve(dirname(absoluteConfig), p)).split(sep).join('/');
const main = bundlePath(config.main);
const assets = bundlePath(config.assets.directory);
if (!main.startsWith('dist/') || !assets.startsWith('dist/') || !existsSync(main) || !existsSync(assets)) {
  throw new Error('The artifact must include both the Worker entry and its assets');
}
// Preserve Vite's module rules and exact ES module bundle. Relocation only changes paths.
const artifact = { ...config, main, assets: { ...config.assets, directory: assets } };
delete artifact.$schema;
if (artifact.rules?.length) {
  // Keep main and its sibling chunks together to preserve Wrangler's module glob base.
  artifact.base_dir = relative(process.cwd(), resolve(dirname(absoluteConfig), config.base_dir || '.'));
}
writeFileSync(resolve(output, 'wrangler.jsonc'), JSON.stringify(artifact, null, 2) + '\n');
writeFileSync(resolve(output, 'SOURCE_COMMIT'), process.env.GITHUB_SHA + '\n');
console.log('Packaged entry', main, 'and assets', assets);
