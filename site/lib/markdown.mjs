import MarkdownIt from 'markdown-it';
import { anchorsPlugin, slugify } from './anchors.mjs';

// One renderer for canonical texts: no typographic substitution (the wording
// and punctuation are preserved exactly), no autolinking, raw HTML allowed
// through because the texts are trusted repository content.
export function canonicalMarkdown() {
  return new MarkdownIt({ html: true, linkify: false, typographer: false, breaks: false }).use(anchorsPlugin).use(tableWrap);
}

// Renderer for site prose and records: same conservative settings.
export function proseMarkdown() {
  return new MarkdownIt({ html: true, linkify: false, typographer: false, breaks: false }).use(headingIds).use(tableWrap);
}

// Wide tables scroll inside their own box instead of overflowing the page.
// Presentation only: the table markup and its content are unchanged.
function tableWrap(md) {
  const open = md.renderer.rules.table_open, close = md.renderer.rules.table_close;
  md.renderer.rules.table_open = (t, i, o, e, self) => '<div class="table-wrap" role="group" aria-label="Table" tabindex="0">' + (open ? open(t, i, o, e, self) : self.renderToken(t, i, o));
  md.renderer.rules.table_close = (t, i, o, e, self) => (close ? close(t, i, o, e, self) : self.renderToken(t, i, o)) + '</div>';
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
