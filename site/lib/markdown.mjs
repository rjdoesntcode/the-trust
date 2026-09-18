import MarkdownIt from 'markdown-it';
import { anchorsPlugin, slugify } from './anchors.mjs';

// One renderer for canonical texts: no typographic substitution (the wording
// and punctuation are preserved exactly), no autolinking, raw HTML allowed
// through because the texts are trusted repository content.
export function canonicalMarkdown() {
  return new MarkdownIt({ html: true, linkify: false, typographer: false, breaks: false }).use(anchorsPlugin);
}

// Renderer for site prose and records: same conservative settings.
export function proseMarkdown() {
  return new MarkdownIt({ html: true, linkify: false, typographer: false, breaks: false }).use(headingIds);
}

// Stable ids on prose headings so that sections of ordinary pages can be linked.
function headingIds(md) {
  md.core.ruler.push('prose_heading_ids', (state) => {
    const used = new Map();
    const toks = state.tokens;
    for (let i = 0; i < toks.length; i++) {
      if (toks[i].type !== 'heading_open' || toks[i].attrGet('id')) continue;
      const inline = toks[i + 1];
      const text = inline && inline.type === 'inline' ? inline.content.replace(/\*\*|__|`/g, '') : '';
      let id = slugify(text); const n = used.get(id) || 0; used.set(id, n + 1); if (n) id = `${id}-${n + 1}`;
      toks[i].attrSet('id', id);
    }
  });
}
