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
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function walk(dir, base = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const rel = path.posix.join(base, d.name);
    if (d.name === '.gitkeep') return [];
    return d.isDirectory() ? walk(path.join(dir, d.name), rel) : [rel];
  }).sort();
}

// The Bridge carries its own Declaration of Adoption as its last section. It
// is extracted verbatim (markdown and rendered HTML) for the /adopt/ page.
function extractSection(markdown, headingRe) {
  const lines = markdown.split('\n');
  const start = lines.findIndex((l) => headingRe.test(l));
  if (start < 0) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) if (/^##? /.test(lines[i])) { end = i; break; }
  return lines.slice(start, end).join('\n').trim() + '\n';
}

// Group level-2 entries under the preceding level-1 entry for the sidebar.
function tree(toc) {
  const out = [];
  for (const e of toc) {
    if (e.level <= 1 || out.length === 0) out.push({ ...e, children: [] });
    else out[out.length - 1].children.push(e);
  }
  return out;
}

export default function () {
  const md = canonicalMarkdown();
  const byFile = new Map(revisions.map((r) => [r.file, r]));
  const documents = [];

  for (const rel of walk(CANON)) {
    const abs = path.join(CANON, rel);
    const buf = fs.readFileSync(abs);
    const meta = byFile.get(rel);
    const isDraftingRecord = /-drafting-record-/.test(rel);
    const doc = {
      file: rel, path: `canonical/${rel}`, raw: `/canonical/${rel}`, bytes: buf.length,
      sha512: digest('sha512', buf), sha3_512: digest('sha3-512', buf),
      kind: meta ? 'instrument' : (isDraftingRecord ? 'drafting-record' : 'other'),
    };
    if (meta) {
      const inst = instruments[meta.instrument];
      if (!inst) throw new Error(`revisions.json: unknown instrument '${meta.instrument}' for ${rel}`);
      if (!meta.date) console.warn(`[canonical] WARNING: ${rel} has no revision date in revisions.json`);
      const text = buf.toString('utf8');
      const env = {};
      const html = rel.endsWith('.md') ? md.render(text, env) : `<pre>${esc(text)}</pre>`;
      Object.assign(doc, {
        instrument: inst.slug, instrumentTitle: meta.title || inst.title, rev: meta.rev, tag: meta.tag, date: meta.date,
        status: meta.status || 'current', note: meta.note || null, uploadedAs: meta.uploaded_as || null,
        title: `${meta.title || inst.title}, revision ${meta.rev}`, url: `/${inst.slug}/rev${meta.rev}/`, html, toc: env.toc || [],
        tocTree: tree(env.toc || []),
      });
      if (inst.slug === 'bridge') {
        const decl = extractSection(text, /^## Declaration of Adoption\s*$/);
        if (decl) doc.declaration = { markdown: decl, html: canonicalMarkdown().render(decl, {}) };
      }
    } else if (!isDraftingRecord && /-rev\d+\./.test(rel)) {
      console.warn(`[canonical] WARNING: ${rel} looks like a revision but has no entry in revisions.json`);
      doc.title = rel;
    } else {
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
    const latest = revs.find((d) => d.status === 'current') || revs[0] || null;
    const missing = expected.filter((e) => !revs.some((d) => d.file === e.file));
    return { ...inst, revisions: revs, latest, expected, missing };
  });
  const bySlug = Object.fromEntries(list.map((i) => [i.slug, i]));
  return { documents, instrumentDocs, list, bySlug, draftingRecords: documents.filter((d) => d.kind === 'drafting-record'), others: documents.filter((d) => d.kind === 'other') };
}
