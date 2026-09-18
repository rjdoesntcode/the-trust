// Resolves every disclosure quote from the immutable record by file and line,
// so the text on /disclosure/ is the record's text and nothing else. A quote
// whose file, line or trim words cannot be found fails the build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '../../..');
const spec = JSON.parse(fs.readFileSync(path.join(here, 'disclosure.json'), 'utf8'));

function resolve(q) {
  const abs = path.join(ROOT, q.file);
  if (!fs.existsSync(abs)) throw new Error(`disclosure: missing file ${q.file}`);
  const lines = fs.readFileSync(abs, 'utf8').split('\n');
  let text = lines[q.line - 1];
  if (text === undefined) throw new Error(`disclosure: ${q.file} has no line ${q.line}`);
  if (q.trim) {
    const a = text.indexOf(q.trim.from); if (a < 0) throw new Error(`disclosure: '${q.trim.from}' not found at ${q.file}:${q.line}`);
    const b = text.indexOf(q.trim.to, a); if (b < 0) throw new Error(`disclosure: '${q.trim.to}' not found at ${q.file}:${q.line}`);
    text = text.slice(a, b + q.trim.to.length);
  }
  // Presentation only: strip list markers and bold markup from the quoted line.
  text = text.replace(/^\s*\d+\.\s+/, '').replace(/\*\*/g, '').trim();
  const raw = '/' + q.file;
  const rel = q.file.replace(/^canonical\//, '');
  const slug = rel.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { ...q, text, raw, rendered: `/record/${slug}/`, partial: !!q.trim };
}

export default function () {
  return { ...spec, participants: spec.participants.map((p) => ({ ...p, quotes: (p.quotes || []).map(resolve) })) };
}
