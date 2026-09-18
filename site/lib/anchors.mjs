// anchors.mjs — markdown-it plugin that gives every Article, numbered
// section and lettered paragraph of an instrument a stable id, and collects
// a table of contents into env.toc.
//
// Id scheme (see docs/canonical-format.md):
//   Preamble                     -> #preamble
//   Article III                  -> #art-iii      (arabic: Article 3 -> #art-3)
//   Article III, section 12      -> #art-iii-12
//   Article III, 12, paragraph c -> #art-iii-12-c
//   Article III, 12, c, (ii)     -> #art-iii-12-c-ii
//   unlabelled paragraph n in 12 -> #art-iii-12-p<n>
//   bold run-in sub-heading      -> slug of its text (e.g. #operator-co-signature)
//   **Protocol 7 — …**           -> #protocol-7
//   any other heading            -> slug of its text; it also ends the current Article
//
// The wording of the text is never touched. The plugin only adds `id`
// attributes, a trailing "¶" permalink to each anchored block, and — where
// lettered paragraphs are written as continuation lines inside one list item
// ("12. (a) … \n(b) …") — a line break and an anchored <span> at each "(x)".

const ARTICLE_RE = /^\s*(?:ARTICLE|Article)\s+([IVXLCivxlc]+|\d+)\b/;
const SECTION_RE = /^\s*(?:([IVXLCivxlc]+)\.)?(\d{1,3})\.(?!\d)\s*/;
const PARA_RE = /^\s*\(([a-z]|[ivx]+)\)\s+/;
const PREAMBLE_RE = /^\s*preamble\b/i;
const PROTOCOL_RE = /^\s*Protocol\s+(\d+)\b/;

export function slugify(text) {
  const s = text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'section';
  return /^[a-z]/.test(s) ? s : `s-${s}`; // ids begin with a letter
}

function plain(text) {
  return text.replace(/\*\*|__|`|~~/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').trim();
}

// Table-of-contents label for a section: the bold defined term if the section
// opens with one ("**Kind** means …" -> "Kind"), otherwise its first words.
function shortLabel(raw) {
  const first = raw.split('\n')[0].trim();
  const bold = /^\*\*([^*]+)\*\*/.exec(first);
  if (bold) return bold[1].replace(/[.:]\s*$/, '');
  const t = plain(first);
  if (t.length <= 60) return t;
  const cut = t.slice(0, 60);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 30)) + '…';
}

const isBoldRunIn = (raw) => /^\*\*[^*]+\*\*\s*$/.test(raw.trim()) && raw.trim().length <= 120;

export function anchorsPlugin(md) {
  md.core.ruler.push('trust_anchors', (state) => {
    const env = state.env;
    env.toc = env.toc || [];
    const used = new Map();
    const unique = (id) => {
      const n = used.get(id) || 0; used.set(id, n + 1);
      return n === 0 ? id : `${id}-${n + 1}`;
    };
    const Token = state.Token;
    const pilcrow = (id) => {
      const a = new Token('html_inline', '', 0);
      a.content = ` <a class="pilcrow" href="#${id}" aria-label="Permalink to ${id}">¶</a>`;
      return a;
    };
    let art = null, sec = null, para = null, pcount = 0;
    const toks = state.tokens;
    let skipParagraphAt = -1;

    for (let i = 0; i < toks.length; i++) {
      const t = toks[i];
      if (t.type !== 'heading_open' && t.type !== 'paragraph_open' && t.type !== 'list_item_open') continue;
      if (t.type === 'paragraph_open' && i === skipParagraphAt) continue;

      let inline = null;
      if (t.type === 'list_item_open') {
        for (let j = i + 1; j < toks.length && toks[j].type !== 'list_item_close'; j++) {
          if (toks[j].type === 'inline') { inline = toks[j]; skipParagraphAt = j - 1; break; }
        }
      } else if (toks[i + 1] && toks[i + 1].type === 'inline') {
        inline = toks[i + 1];
      }
      const rawText = inline ? inline.content : '';
      const text = plain(rawText);
      const firstLine = text.split('\n')[0];
      let id = null, level = 0, label = null, m;

      if ((m = ARTICLE_RE.exec(text))) {
        art = m[1].toLowerCase(); sec = null; para = null; pcount = 0;
        id = `art-${art}`; level = 1; label = firstLine;
      } else if (t.type === 'heading_open' && PREAMBLE_RE.test(text)) {
        art = 'preamble'; sec = null; para = null; pcount = 0;
        id = 'preamble'; level = 1; label = firstLine;
      } else if (t.type === 'heading_open' && Number(t.tag.slice(1)) <= 2) {
        // Any other top-level heading (Signature, Annex, Part II …) ends the Article.
        art = null; sec = null; para = null; pcount = 0;
        id = slugify(text); level = 1; label = firstLine;
      } else if ((m = PROTOCOL_RE.exec(text)) && t.type === 'paragraph_open') {
        id = `protocol-${m[1]}`; level = 2; label = firstLine.replace(/\.\s.*$/, '');
      } else if (art && t.type === 'list_item_open' && /^\d+$/.test(t.info || '')) {
        sec = t.info; para = null; pcount = 0;
        id = `art-${art}-${sec}`; level = 2; label = `${art.toUpperCase()}.${sec} ${shortLabel(rawText)}`;
      } else if (art && (m = SECTION_RE.exec(text)) && t.type !== 'paragraph_open') {
        if (m[1]) art = m[1].toLowerCase();
        sec = m[2]; para = null; pcount = 0;
        id = `art-${art}-${sec}`; level = 2; label = `${art.toUpperCase()}.${sec} ${shortLabel(firstLine.replace(SECTION_RE, ''))}`;
      } else if (art && sec && (m = PARA_RE.exec(text))) {
        const mark = m[1].toLowerCase();
        const nextLetter = para ? String.fromCharCode(para.charCodeAt(0) + 1) : 'a';
        const isLetter = mark.length === 1 && (!/^[ivx]$/.test(mark) || !para || mark === nextLetter);
        if (isLetter) { para = mark; id = `art-${art}-${sec}-${para}`; }
        else { id = `art-${art}-${sec}-${para || 'p'}-${mark}`; }
        level = 3;
      } else if (t.type === 'paragraph_open' && isBoldRunIn(rawText)) {
        id = slugify(text); level = 2; label = firstLine; para = null;
      } else if (art && sec && t.type === 'paragraph_open' && text) {
        pcount += 1; id = `art-${art}-${sec}-p${pcount}`; level = 4;
      } else if (t.type === 'heading_open') {
        id = slugify(text); level = Number(t.tag.slice(1)); label = firstLine;
      }

      if (!id) continue;
      id = unique(id);
      t.attrSet('id', id);
      if (level <= 2 && label) env.toc.push({ id, level, label: label.replace(/\s+/g, ' ').replace(/^\*\*|\*\*$/g, '').slice(0, 120) });
      if (!inline) continue;

      // Lettered paragraphs written as continuation lines inside this block:
      // "12. (a) … <softbreak> (b) … <softbreak> (c) …". Give each its own
      // anchored span on its own line. The first one may start the block.
      if (art && sec && inline.children) {
        const kids = inline.children;
        const out = [];
        let open = false;
        let localPara = null;
        const startSpan = (mark) => {
          localPara = mark;
          const sid = unique(`art-${art}-${sec}-${mark}`);
          const s = new Token('html_inline', '', 0); s.content = `<span class="para" id="${sid}">`;
          out.push(s); open = true; return sid;
        };
        let currentId = null;
        for (let k = 0; k < kids.length; k++) {
          const c = kids[k];
          const next = kids[k + 1];
          if (c.type === 'text' && k === 0 && /^\d+$/.test(t.info || '')) {
            // "12. (a) …": the item itself opens paragraph (a).
            const mm = PARA_RE.exec(c.content);
            if (mm) currentId = startSpan(mm[1].toLowerCase());
          }
          if (c.type === 'softbreak' && next && next.type === 'text' && PARA_RE.test(next.content)) {
            const mark = PARA_RE.exec(next.content)[1].toLowerCase();
            const nextLetter = localPara ? String.fromCharCode(localPara.charCodeAt(0) + 1) : 'a';
            const isLetter = mark.length === 1 && (!/^[ivx]$/.test(mark) || !localPara || mark === nextLetter);
            closeSpanWith(currentId);
            const br = new Token('html_inline', '', 0); br.content = '<br>\n'; out.push(br);
            if (isLetter) currentId = startSpan(mark);
            else { const sid = unique(`art-${art}-${sec}-${localPara || 'p'}-${mark}`); const s = new Token('html_inline', '', 0); s.content = `<span class="para" id="${sid}">`; out.push(s); open = true; currentId = sid; }
            continue;
          }
          out.push(c);
        }
        function closeSpanWith(cid) { if (open) { out.push(pilcrow(cid)); const c = new Token('html_inline', '', 0); c.content = '</span>'; out.push(c); open = false; } }
        if (open) { closeSpanWith(currentId); inline.children = out; if (localPara) para = localPara; continue; }
        inline.children = out;
      }
      inline.children = inline.children || [];
      inline.children.push(pilcrow(id));
    }
  });
}
