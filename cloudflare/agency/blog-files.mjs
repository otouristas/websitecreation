const sources = import.meta.glob('../../content/blog/*.md', { eager: true, import: 'default', query: '?raw' });
const files = Object.entries(sources).map(([path, text]) => [path.split('/').pop().slice(0, -3), text]);
export function getBlogFiles() {
  return files;
}
