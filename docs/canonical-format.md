# Canonical text format and the anchor scheme

Files under `/canonical/` are published exactly as uploaded. The site renders `.md` files with markdown-it in its most conservative mode: no typographic substitution, no autolinking, no line-break rewriting. The build never rewrites a canonical file; it only adds `id` attributes and a trailing `¶` permalink to rendered blocks.

## Recognised structure

The anchor plugin (`site/lib/anchors.mjs`, tests in `site/test/`) recognises:

| Pattern in the text | Anchor |
|---|---|
| a heading whose text begins `Preamble` | `#preamble` |
| a heading or line beginning `Article III` (roman or arabic numeral) | `#art-iii` |
| a numbered heading `### 12. Title`, or a line/list item beginning `12.` or `III.12.`, inside an article | `#art-iii-12` |
| a paragraph or list item beginning `(c)` inside a section | `#art-iii-12-c` |
| a paragraph beginning `(ii)` after a lettered paragraph | `#art-iii-12-c-ii` |
| an unlabelled paragraph inside a section, nth in order | `#art-iii-12-p<n>` |
| any other heading | slug of its text |

Ambiguity rule: `(i)` and `(v)` are lettered paragraphs only when they continue the letter sequence (`(h)` → `(i)`); otherwise they are roman sub-paragraphs of the current letter.

Limitations: lettered paragraphs written as soft line breaks inside a single list item (rather than as their own paragraphs or list items) do not get their own anchors — the enclosing section anchor applies. If an instrument's formatting is not recognised, extend the plugin and its tests; do not edit the instrument.

## Metadata

Revision date and tag are not derivable from the file and live in `site/src/_data/revisions.json`:

```json
{ "file": "the-bridge-rev1.md", "instrument": "bridge", "rev": 1, "tag": "bridge-rev1", "date": "YYYY-MM-DD", "status": "current" }
```

Files in `/canonical/` that are not numbered instrument revisions (drafting records) are served raw, hashed and listed, not rendered.
