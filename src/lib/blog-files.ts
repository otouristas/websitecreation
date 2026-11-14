import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** The Next.js site reads its content on disk. The Worker bundles these same files. */
export function getBlogFiles(): [string, string][] {
  const folder = join(process.cwd(), 'content/blog');
  return readdirSync(folder).filter((file) => file.endsWith('.md')).sort().map((file) => [
    file.slice(0, -3), readFileSync(join(folder, file), 'utf8'),
  ]);
}
