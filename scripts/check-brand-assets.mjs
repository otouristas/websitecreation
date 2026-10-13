import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const manifest = JSON.parse(readFileSync("src/brand/artwork.manifest.json", "utf8"));
for (const [path, expected] of Object.entries(manifest.files)) {
  const actual = createHash("sha256").update(readFileSync(path)).digest("hex");
  assert.equal(actual, expected, `Approved artwork changed: ${path}`);
}
assert.equal(readFileSync("public/brand/brand.tokens.css", "utf8"), readFileSync("src/brand/tokens/brand.tokens.css", "utf8"), "Middleware token export drifted");
const tokens = JSON.parse(readFileSync("src/brand/tokens/brand.tokens.json", "utf8"));
const pwa = JSON.parse(readFileSync("public/site.webmanifest", "utf8"));
assert.equal(pwa.background_color, tokens.brand.ink);
assert.equal(pwa.theme_color, tokens.brand.ink);
console.log(`${Object.keys(manifest.files).length} approved artwork hashes and public token/manifest parity passed.`);

for (const name of ["Inter-400.ttf", "Inter-700.ttf", "OFL.txt"]) { assert.deepEqual(readFileSync(`public/brand/fonts/${name}`), readFileSync(`src/brand/fonts/${name}`), `410 font mirror drifted: ${name}`); }
