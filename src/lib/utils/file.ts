import fs from 'node:fs';

export function getFileContents(path: string) {
  const fileUrl = new URL(path, import.meta.url);
  return fs.readFileSync(fileUrl.pathname, 'utf8');
}
