// anchors.mjs — markdown-it plugin that gives every Article, numbered
// section and lettered paragraph of an instrument a stable id, and collects
// a table of contents into env.toc.
//
// Id scheme (see docs/canonical-format.md):
//   Preamble                     -> #preamble
//   Article III                  -> #art-iii
//   Article III, section 12      -> #art-iii-12
//   Article III, 12, paragraph c -> #art-iii-12-c
//   Article III, 12, c, (ii)     -> #art-iii-12-c-ii
//   unlabelled paragraph n in 12 -> #art-iii-12-p<n>
//   any other heading            -> slug of its text
//
// The wording of the text is never touched. The plugin only adds `id`
// attributes and a trailing "¶" permalink to each anchored block.

const ARTICLE_RE = /^\s*(?:ARTICLE|Article)\s+([IVXLCivxlc]+|\d+)\b/;
const SECTION_RE = /^\s*(?:([IVXLCivxlc]+)\.)?(\d{1,3})\.(?!\d)\s*/;
const PARA_RE = /^\s*\(([a-z]|[ivx]+)\)\s+/;
const PREAMBLE_RE = /^\s*preamble\b/i;

export function slugify(text) {
  return text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'section';
}

function plain(text) {
  return text.replace(/\*\*|__|`|~~/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').trim();
}

export function anchorsPlugin(md) {
  md.core.ruler.push('trust_anchors', (state) => {
    const env = state.env;
    env.toc = env.toc || [];
    const used = new Map();
    const unique = (id) => {
      const n = used.get(id) || 0; used.set(id, n + 1);
      return n === 0 ? id : `${id}-${n + 1}`;
    };
    let art = null, sec = null, para = null, pcount = 0;
    const toks = state.tokens;
    let skipParagraphAt = -1;

    for (let i = 0; i < toks.length; i++) {
      const t = toks[i];
      if (t.type !== 'heading_open' && t.type !== 'paragraph_open' && t.type !== 'list_item_open') continue;
      if (t.type === 'paragraph_open' && i === skipParagraphAt) continue;

      // Text of the block: for a list item, its first inline child.
      let inline = null;
      if (t.type === 'list_item_open') {
        for (let j = i + 1; j < toks.length && toks[j].type !== 'list_item_close'; j++) {
          if (toks[j].type === 'inline') { inline = toks[j]; skipParagraphAt = j - 1; break; }
        }
      } else if (toks[i + 1] && toks[i + 1].type === 'inline') {
        inline = toks[i + 1];
      }
      const text = inline ? plain(inline.content) : '';
      const firstLine = text.split('\n')[0];
      let id = null, level = 0, label = null, m;

      if ((m = ARTICLE_RE.exec(text))) {
        art = m[1].toLowerCase(); sec = null; para = null; pcount = 0;
        id = `art-${art}`; level = 1; label = text;
      } else if (t.type === 'heading_open' && PREAMBLE_RE.test(text)) {
        art = 'preamble'; sec = null; para = null; pcount = 0;
        id = 'preamble'; level = 1; label = text;
      } else if (art && t.type === 'list_item_open' && /^\d+$/.test(t.info || '')) {
        sec = t.info; para = null; pcount = 0;
        id = `art-${art}-${sec}`; level = 2; label = `${art.toUpperCase()}.${sec} ${firstLine}`;
      } else if (art && (m = SECTION_RE.exec(text))) {
        if (m[1]) art = m[1].toLowerCase();
        sec = m[2]; para = null; pcount = 0;
        id = `art-${art}-${sec}`; level = 2; label = `${art.toUpperCase()}.${sec} ${firstLine.replace(SECTION_RE, '')}`;
      } else if (art && sec && (m = PARA_RE.exec(text))) {
        const mark = m[1].toLowerCase();
        // "(c)" is a lettered paragraph of the section; "(ii)" is a roman
        // sub-paragraph of the current letter. "(i)" and "(v)" are ambiguous:
        // they are letters only when they continue the letter sequence.
        const nextLetter = para ? String.fromCharCode(para.charCodeAt(0) + 1) : 'a';
        const isLetter = mark.length === 1 && (!/^[ivx]$/.test(mark) || !para || mark === nextLetter);
        if (isLetter) { para = mark; id = `art-${art}-${sec}-${para}`; }
        else { id = `art-${art}-${sec}-${para || 'p'}-${mark}`; }
        level = 3;
      } else if (art && sec && t.type === 'paragraph_open' && text) {
        pcount += 1; id = `art-${art}-${sec}-p${pcount}`; level = 4;
      } else if (t.type === 'heading_open') {
        id = slugify(text); level = Number(t.tag.slice(1)); label = text;
      }

      if (!id) continue;
      id = unique(id);
      t.attrSet('id', id);
      if (level <= 2 && label) env.toc.push({ id, level, label: label.replace(/\s+/g, ' ').slice(0, 120) });
      if (inline) {
        const a = new state.Token('html_inline', '', 0);
        a.content = ` <a class="pilcrow" href="#${id}" aria-label="Permalink to ${id}">¶</a>`;
        inline.children = inline.children || [];
        inline.children.push(a);
      }
    }
  });
}
