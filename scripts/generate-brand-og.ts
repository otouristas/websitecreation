import { readFile, writeFile } from "node:fs/promises";
import { strict as assert } from "node:assert";
import OpenGraphImage from "../src/app/opengraph-image";

async function generate() {
  const response = OpenGraphImage();
  const bytes = Buffer.from(await response.arrayBuffer());
  if (process.argv.includes("--check")) {
    assert.deepEqual(await readFile("src/app/opengraph-image.png"), bytes, "Static social card differs from the shared image route");
    console.log("Static and dynamic social cards match.");
  } else {
    await writeFile("src/app/opengraph-image.png", bytes);
    console.log(`Generated the static social card from the shared image route (${bytes.length} bytes).`);
  }
}

void generate();
