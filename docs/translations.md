# Translations

English is the only language now. To add a language (example: Spanish, `/es/`):

1. Add the language to `site/src/_data/site.json` → `languages`: `{ "code": "es", "name": "Español", "path": "/es/" }`.
2. Add UI strings under `"es"` in `site/src/_data/i18n.json`. Missing keys fall back to English.
3. Create `site/src/es/` with a directory data file `site/src/es/es.json` containing `{ "lang": "es", "layout": "layouts/page.njk" }`, and copies of the pages from `site/src/pages/` translated, each with a `permalink` under `/es/…`.
4. A translated instrument is **not canonical**. Put it under `site/translations/es/the-bridge-rev1.md`, render it at `/es/bridge/rev1/` with `noncanonical: true`, and state the tag and SHA-512 of the English revision it translates. `/canonical/` is untouched; `HASHES.txt` and `/index.json` list only canonical files.

Nothing in this procedure writes to `/canonical/` or `/record/`.
