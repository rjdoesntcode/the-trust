import MarkdownIt from 'markdown-it';
import { anchorsPlugin } from './anchors.mjs';

// One renderer for canonical texts: no typographic substitution (the wording
// and punctuation are preserved exactly), no autolinking, raw HTML allowed
// through because the texts are trusted repository content.
export function canonicalMarkdown() {
  return new MarkdownIt({ html: true, linkify: false, typographer: false, breaks: false }).use(anchorsPlugin);
}

// Renderer for site prose and records: same conservative settings.
export function proseMarkdown() {
  return new MarkdownIt({ html: true, linkify: false, typographer: false, breaks: false });
}
