import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { proseMarkdown } from '../../lib/markdown.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
export default function () {
  const f = path.resolve(here, '../../../CHANGELOG.md');
  return { html: fs.existsSync(f) ? proseMarkdown().render(fs.readFileSync(f, 'utf8').replace(/^# [^\n]*\n+/, '')) : '<p>No changelog yet.</p>' };
}
