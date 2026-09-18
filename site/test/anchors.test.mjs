import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { canonicalMarkdown } from '../lib/markdown.mjs';

const src = fs.readFileSync(new URL('./fixtures/instrument-sample.md', import.meta.url), 'utf8');

test('articles, sections and paragraphs get stable ids', () => {
  const env = {};
  const html = canonicalMarkdown().render(src, env);
  for (const id of ['preamble', 'art-i', 'art-i-1', 'art-i-2', 'art-iii', 'art-iii-12', 'art-iii-12-a', 'art-iii-12-c', 'art-iii-12-c-i', 'art-iii-12-p1', 'art-iii-13']) {
    assert.ok(html.includes(`id="${id}"`), `missing #${id}`);
  }
  assert.ok(env.toc.some((e) => e.id === 'art-iii-12'), 'toc lists III.12');
});

test('rendering does not alter the wording', () => {
  const html = canonicalMarkdown().render(src, {});
  assert.ok(html.includes('Paragraph c, the one everyone cites.'));
  assert.ok(!html.includes('&rsquo;'), 'no typographic substitution');
});
