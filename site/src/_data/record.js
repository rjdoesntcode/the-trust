// Reads /record/ (never writes) and the drafting records kept under
// /canonical/. Every file must be attributed in record-index.json; an
// unattributed file under /record/ fails the build.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { canonicalMarkdown, proseMarkdown } from '../../lib/markdown.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '../../..');
const REC = path.join(ROOT, 'record');
const CANON = path.join(ROOT, 'canonical');
const index = JSON.parse(fs.readFileSync(path.join(here, 'record-index.json'), 'utf8'));
const KINDS = ['research-report', 'briefing', 'model-response', 'drafting-record', 'dissent', 'vote', 'other'];
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const slugOf = (rel) => rel.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function walk(dir, base = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const rel = path.posix.join(base, d.name);
    if (d.name === '.gitkeep') return [];
    return d.isDirectory() ? walk(path.join(dir, d.name), rel) : [rel];
  }).sort();
}

function check(meta, rel) {
  for (const k of ['title', 'kind', 'author', 'maker']) if (!(k in meta)) throw new Error(`record-index.json entry for ${rel} lacks '${k}'`);
  if (!KINDS.includes(meta.kind)) throw new Error(`record-index.json entry for ${rel}: kind must be one of ${KINDS.join(', ')}`);
}

export default function () {
  const prose = proseMarkdown();
  const items = [];
  const slugs = new Set();
  const uniq = (s) => { let n = 1, out = s; while (slugs.has(out)) out = `${s}-${++n}`; slugs.add(out); return out; };
  const render = (rel, buf, md) => /\.(md|markdown)$/i.test(rel) ? md.render(buf.toString('utf8'), {}) : /\.(txt|text)$/i.test(rel) ? `<pre class="record-text">${esc(buf.toString('utf8'))}</pre>` : null;
  const digests = (buf) => ({ bytes: buf.length, sha512: crypto.createHash('sha512').update(buf).digest('hex'), sha3_512: crypto.createHash('sha3-512').update(buf).digest('hex') });

  // 1. Files under /record/.
  const byFile = new Map(index.filter((e) => e.source !== 'canonical').map((e) => [e.file, e]));
  for (const rel of walk(REC)) {
    const meta = byFile.get(rel);
    if (!meta) throw new Error(`record/${rel} is not attributed in site/src/_data/record-index.json. Every record must name its author (for a model, its name and maker).`);
    check(meta, rel);
    const buf = fs.readFileSync(path.join(REC, rel));
    const slug = uniq(slugOf(rel));
    items.push({ ...meta, source: 'record', raw: `/record/${rel}`, url: `/record/${slug}/`, slug, html: render(rel, buf, prose), ...digests(buf) });
  }
  for (const e of index) if (e.source !== 'canonical' && !fs.existsSync(path.join(REC, e.file))) console.warn(`[record] WARNING: record-index.json lists missing file record/${e.file}`);

  // 2. Drafting records kept under /canonical/ (immutable, hashed there),
  //    attributed here so that they are readable on the record pages.
  for (const e of index.filter((x) => x.source === 'canonical')) {
    const abs = path.join(CANON, e.file);
    if (!fs.existsSync(abs)) { console.warn(`[record] WARNING: record-index.json lists missing file canonical/${e.file}`); continue; }
    check(e, `canonical/${e.file}`);
    const buf = fs.readFileSync(abs);
    const slug = uniq(slugOf(e.file));
    items.push({ ...e, raw: `/canonical/${e.file}`, url: `/record/${slug}/`, slug, html: render(e.file, buf, canonicalMarkdown()), ...digests(buf) });
  }
  const unattributedDrafting = walk(CANON).filter((f) => /-drafting-record-/.test(f) && !index.some((e) => e.source === 'canonical' && e.file === f));
  if (unattributedDrafting.length) throw new Error(`Drafting records under /canonical/ are not attributed in record-index.json: ${unattributedDrafting.join(', ')}`);

  items.sort((a, b) => (a.round ?? 99) - (b.round ?? 99) || a.title.localeCompare(b.title));
  const byRound = {};
  for (const it of items) { const r = it.round == null ? 'unassigned' : String(it.round); (byRound[r] ||= []).push(it); }
  return { items, byRound, kinds: KINDS };
}
