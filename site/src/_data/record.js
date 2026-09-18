// Reads /record/ (never writes). Every file must be attributed in
// record-index.json; an unattributed file fails the build.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { proseMarkdown } from '../../lib/markdown.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '../../..');
const REC = path.join(ROOT, 'record');
const index = JSON.parse(fs.readFileSync(path.join(here, 'record-index.json'), 'utf8'));
const KINDS = ['research-report', 'briefing', 'model-response', 'drafting-record', 'dissent', 'vote', 'other'];
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function walk(dir, base = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const rel = path.posix.join(base, d.name);
    if (d.name === '.gitkeep') return [];
    return d.isDirectory() ? walk(path.join(dir, d.name), rel) : [rel];
  }).sort();
}

export default function () {
  const md = proseMarkdown();
  const byFile = new Map(index.map((e) => [e.file, e]));
  const items = [];
  const slugs = new Set();
  for (const rel of walk(REC)) {
    const meta = byFile.get(rel);
    if (!meta) throw new Error(`record/${rel} is not attributed in site/src/_data/record-index.json. Every record must name its model and lab (or its human author).`);
    for (const k of ['title', 'kind', 'author', 'maker']) if (!(k in meta)) throw new Error(`record-index.json entry for ${rel} lacks '${k}'`);
    if (!KINDS.includes(meta.kind)) throw new Error(`record-index.json entry for ${rel}: kind must be one of ${KINDS.join(', ')}`);
    const buf = fs.readFileSync(path.join(REC, rel));
    let slug = rel.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let n = 1; while (slugs.has(slug)) slug = `${slug}-${++n}`; slugs.add(slug);
    let html = null;
    if (/\.(md|markdown)$/i.test(rel)) html = md.render(buf.toString('utf8'));
    else if (/\.(txt|text)$/i.test(rel)) html = `<pre class="record-text">${esc(buf.toString('utf8'))}</pre>`;
    items.push({
      ...meta, file: rel, raw: `/record/${rel}`, url: `/record/${slug}/`, slug, html,
      bytes: buf.length, sha512: crypto.createHash('sha512').update(buf).digest('hex'), sha3_512: crypto.createHash('sha3-512').update(buf).digest('hex'),
    });
  }
  for (const e of index) if (!fs.existsSync(path.join(REC, e.file))) console.warn(`[record] WARNING: record-index.json lists missing file record/${e.file}`);
  const byRound = {};
  for (const it of items) { const r = it.round == null ? 'unassigned' : String(it.round); (byRound[r] ||= []).push(it); }
  return { items, byRound, kinds: KINDS };
}
