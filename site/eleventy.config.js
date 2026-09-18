// Eleventy configuration. The site is fully static: no client-side
// JavaScript is emitted, no external resources are referenced.
import { proseMarkdown } from './lib/markdown.mjs';

export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory('src');
  eleventyConfig.setOutputDirectory('_site');
  eleventyConfig.setIncludesDirectory('_includes');
  eleventyConfig.setDataDirectory('_data');
  eleventyConfig.setTemplateFormats(['njk', 'md', 'html']);
  eleventyConfig.setLibrary('md', proseMarkdown());

  // Immutable sources are copied through byte-for-byte; the build never
  // writes into them.
  eleventyConfig.addPassthroughCopy({
    '../canonical': 'canonical',
    '../record': 'record',
    '../register': 'register',
    '../HASHES.txt': 'HASHES.txt',
    '../HASHES.sha3-512.txt': 'HASHES.sha3-512.txt',
    'src/css': 'css',
    'src/_headers': '_headers',
    'src/.nojekyll': '.nojekyll',
    'src/static': '/',
  });

  // Files under src/static are copied verbatim, never rendered as templates.
  eleventyConfig.ignores.add('src/static/**');
  eleventyConfig.ignores.add('src/summaries/**');

  eleventyConfig.addFilter('json', (v) => JSON.stringify(v, null, 2));
  eleventyConfig.addFilter('isoDate', (v) => (v ? String(v).slice(0, 10) : ''));
  eleventyConfig.addFilter('t', function (key) {
    // UI strings by language; translations add a file under src/_data/i18n/.
    const lang = (this.ctx && this.ctx.lang) || 'en';
    const table = this.ctx.i18n || {};
    return (table[lang] && table[lang][key]) || (table.en && table.en[key]) || key;
  });
  eleventyConfig.addFilter('wordcount', (s) => String(s || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);

  // Deterministic, tidy output: strip trailing whitespace and collapse runs of
  // blank lines in HTML so mirrors can be compared byte for byte.
  eleventyConfig.addTransform('tidy', function (content) {
    if (!(this.page.outputPath || '').endsWith('.html')) return content;
    return content.split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\n{3,}/g, '\n\n');
  });

  return { htmlTemplateEngine: 'njk', markdownTemplateEngine: 'njk' };
}
