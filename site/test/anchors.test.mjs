import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { canonicalMarkdown } from '../lib/markdown.mjs';

const src = fs.readFileSync(new URL('./fixtures/instrument-sample.md', import.meta.url), 'utf8');

test('articles, sections and paragraphs get stable ids', () => {
  const env = {};
  const html = canonicalMarkdown().render(src, env);
  for (const id of ['preamble', 'art-i', 'art-i-1', 'art-i-2', 'art-iii', 'run-in-sub-heading',
    'art-iii-12', 'art-iii-12-a', 'art-iii-12-b', 'art-iii-12-c', 'art-iii-12-c-i', 'art-iii-12-d', 'art-iii-13',
    'art-iii-14', 'art-iii-14-a', 'art-iii-14-b', 'art-iii-14-p1',
    'art-3', 'art-3-1', 'art-3-1-a', 'art-3-1-b', 'signature', 'annex-a-protocols', 'protocol-7']) {
    assert.ok(html.includes(`id="${id}"`), `missing #${id}`);
  }
  assert.ok(!html.includes('id="art-iii-12-c-2"'), 'no duplicate ids');
  assert.ok(!/id="art-[a-z]+-1"[^]*Signature/.test(html.split('id="signature"')[1] || ''), 'no article ids after the Articles end');
  assert.ok(env.toc.some((e) => e.id === 'art-iii-12'), 'toc lists III.12');
  assert.ok(env.toc.some((e) => e.id === 'protocol-7'), 'toc lists Protocol 7');
});

test('continuation-line paragraphs break onto their own lines and keep their wording', () => {
  const html = canonicalMarkdown().render(src, {});
  assert.ok(html.includes('<br>\n<span class="para" id="art-iii-12-c">(c) Paragraph c, the one everyone cites.'));
  assert.ok(html.includes('(a) Paragraph a, written as a continuation block.'));
  assert.ok(!html.includes('&rsquo;'), 'no typographic substitution');
});
