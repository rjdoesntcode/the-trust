# Roadmap

Items in order. Nothing below changes a canonical text; every item is site, tooling or process.

## 1. Design (in progress, 2026-09-18)

Light glassmorphism redesign, pure CSS, zero client-side JavaScript, no external resources. Self-hosted open-licensed typefaces (OFL) subset to Latin. Progressive enhancement only: `backdrop-filter`, `popover`, container queries, `text-wrap`, `@starting-style`, cross-document view transitions, each with a working fallback, and solid panels under `prefers-reduced-transparency`. Navigation reduced to five primary items plus a native popover "More" menu; a full site map in the footer.

## 2. Globalization (next)

Goal: a visitor arriving from a browser whose preferred language is Spanish lands on the Spanish site, automatically, with the canonical English text always one click away and never displaced.

**Architecture already in place.** Every page carries `lang`; UI strings live in `site/src/_data/i18n.json`; the site is structured so a language drops in as `/es/`, `/zh/`, … (`docs/translations.md`). Canonical files are never touched; a translated instrument is rendered with a non-canonical notice, the English tag and its SHA-512.

**Automatic language selection without client-side JavaScript.** Static hosting cannot read `Accept-Language`; the edge can. The Cloudflare Worker that serves the assets (`wrangler.toml`) gains a ~40-line script: for a request to `/` (and only `/`), read `Accept-Language`, match against the published language list, and answer `302` to `/<lang>/` when a match exists and the visitor has not chosen otherwise. The choice is remembered with one cookie holding only the language code (no identifier, no expiry beyond a year, no tracking; the privacy page says so), or, to avoid a cookie entirely, with no memory and a visible language switcher on every page. Every language page carries `<link rel="alternate" hreflang>` for every other language and `x-default` for English. GitHub Pages, which cannot run the redirect, serves English with the switcher.

**Translation pipeline.** Machine-translate each non-canonical page and summary with a model, then have a second model review against the English, and record both in `/record/translations/` with attribution, exactly as the instruments' own review was recorded. Instrument translations are marked as translations of a specific revision by tag and digest, and a change in the English revision invalidates the translation until it is redone. Right-to-left languages (Arabic, Hebrew, Persian, Urdu) need `dir="rtl"` and logical CSS properties; the stylesheet already uses logical properties where it matters. CJK typography needs its own font stack (system fonts; no CJK webfont is shipped).

**Order of languages.** By speakers and by the working languages the Bridge's Register would need: Spanish, Chinese (Simplified and Traditional), Hindi, Arabic, French, Portuguese, Russian, Japanese, German, Indonesian, Korean, then onward.

**Not in scope here.** Translating the canonical texts themselves into canonical status: a translated instrument is never canonical unless the amendment procedure adopts it as such.

## 3. Release and archive

Signed tags per revision; `scripts/archive.sh` receipts; `scripts/verify-mirrors.sh` weekly.

## 4. How registration works

Today: a submitter files the **Register entry** issue form (`.github/ISSUE_TEMPLATE/register-entry.yml`), which asks for every field of the schema and the submitter's representations, and attaches the signed declaration. The maintainer (or a session) turns it into one line of `register/register.jsonl` and the document under `register/documents/`, opens a pull request, and the build validates the line against `schema.json` and Bridge Article 14. Merge publishes it within seventy-two hours (Article 11.2). Nothing is edited; a mistake is a `correction` entry.

Later: the same form served from the site itself is impossible without a server, so the honest options are (a) keep GitHub as the front door, which also gives Section 230 posture for third-party content, or (b) a minimal Cloudflare Worker endpoint that accepts a signed JSON entry, verifies the signature against the published key, and opens the pull request automatically. Option (b) adds an attack surface and a place where visitor data could accrue; it is not started.

## 5. Register custodians

Bridge Article 11.2 requires three unaffiliated custodians, one a public institute or non-profit. Find them; mirror `register/register.jsonl` to each on every merge.
