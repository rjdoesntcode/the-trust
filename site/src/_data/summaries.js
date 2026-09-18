// Plain-language summaries live in site/src/summaries/<instrument>.md. They
// are written by people, are NOT canonical, and are rendered with that notice.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { proseMarkdown } from '../../lib/markdown.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
export default function () {
  const dir = path.resolve(here, '../summaries');
  const out = {};
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (f.endsWith('.md')) out[f.replace(/\.md$/, '')] = proseMarkdown().render(fs.readFileSync(path.join(dir, f), 'utf8'));
  return out;
}
