// Reads /canonical/ (never writes), computes digests, renders each instrument
// with stable anchors, and exposes the result to templates and index.json.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { canonicalMarkdown } from '../../lib/markdown.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '../../..');
const CANON = path.join(ROOT, 'canonical');
const instruments = JSON.parse(fs.readFileSync(path.join(here, 'instruments.json'), 'utf8'));
const revisions = JSON.parse(fs.readFileSync(path.join(here, 'revisions.json'), 'utf8'));

const digest = (alg, buf) => crypto.createHash(alg).update(buf).digest('hex');

function walk(dir, base = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const rel = path.posix.join(base, d.name);
    if (d.name === '.gitkeep') return [];
    return d.isDirectory() ? walk(path.join(dir, d.name), rel) : [rel];
  }).sort();
}

export default function () {
  const md = canonicalMarkdown();
  const byFile = new Map(revisions.map((r) => [r.file, r]));
  const documents = [];

  for (const rel of walk(CANON)) {
    const abs = path.join(CANON, rel);
    const buf = fs.readFileSync(abs);
    const meta = byFile.get(rel);
    const doc = {
      file: rel,
      path: `canonical/${rel}`,
      raw: `/canonical/${rel}`,
      bytes: buf.length,
      sha512: digest('sha512', buf),
      sha3_512: digest('sha3-512', buf),
      kind: meta ? 'instrument' : 'drafting-record',
    };
    if (meta) {
      const inst = instruments[meta.instrument];
      if (!inst) throw new Error(`revisions.json: unknown instrument '${meta.instrument}' for ${rel}`);
      if (!meta.date) console.warn(`[canonical] WARNING: ${rel} has no revision date in revisions.json`);
      const env = {};
      const html = rel.endsWith('.md') ? md.render(buf.toString('utf8'), env) : `<pre>${buf.toString('utf8').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))}</pre>`;
      Object.assign(doc, {
        instrument: inst.slug, instrumentTitle: inst.title, rev: meta.rev, tag: meta.tag, date: meta.date,
        status: meta.status || 'current', note: meta.note || null, title: `${inst.title}, revision ${meta.rev}`,
        url: `/${inst.slug}/rev${meta.rev}/`, html, toc: env.toc || [],
      });
    } else {
      // A file in /canonical/ that is not a numbered instrument revision is a
      // drafting record: served raw, hashed, listed, not rendered.
      const m = /^(.*?)-rev(\d+)\./.exec(rel);
      if (m) console.warn(`[canonical] WARNING: ${rel} looks like a revision but has no entry in revisions.json`);
      doc.title = rel;
    }
    documents.push(doc);
  }
  for (const r of revisions) {
    if (!fs.existsSync(path.join(CANON, r.file))) console.warn(`[canonical] WARNING: expected canonical file missing: canonical/${r.file}`);
  }

  const instrumentDocs = documents.filter((d) => d.kind === 'instrument').sort((a, b) => a.instrument.localeCompare(b.instrument) || b.rev - a.rev);
  const list = Object.values(instruments).map((inst) => {
    const revs = instrumentDocs.filter((d) => d.instrument === inst.slug);
    const expected = revisions.filter((r) => r.instrument === inst.slug).sort((a, b) => b.rev - a.rev);
    return { ...inst, revisions: revs, latest: revs[0] || null, expected };
  });
  return { documents, instrumentDocs, list, draftingRecords: documents.filter((d) => d.kind !== 'instrument') };
}
