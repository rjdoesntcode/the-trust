# Open items — things not done, or decided without you

Review before first release. Items are in order of importance.

## Blocking: the source texts are not here

1. **`/canonical/` is empty.** `constitution-of-the-trust-rev10.md`, `the-bridge-rev1.md`, earlier revisions and drafting records were not in the repository, the git remote, the session's attachment directories or Google Drive. Everything that renders from them (the instrument pages, index pages' revision rows, `index.json` documents, `HASHES.txt` entries, anchors) is built and tested against a fixture (`site/test/fixtures/instrument-sample.md`, never placed in `/canonical/`), but shows "not yet published" until the files are added. Adding them: `cp` into `/canonical/`, fill `date` in `site/src/_data/revisions.json`, run `scripts/hash.sh --write`, build.
2. **`/record/` is empty.** `/record/`, `/process/` (round-by-round listing) and `/disclosure/` (each maker's disclosed interest, which must be *verbatim* from the record) render with explicit "not yet in the repository" notices rather than invented text. Add files and attribute each in `site/src/_data/record-index.json` (`file`, `title`, `kind`, `author`, `maker`, `date`, `round`); the build fails on any unattributed file.
3. **Plain-language summaries** (`/constitution/summary/`, `/bridge/summary/`) show "pending" because the texts could not be read. Write them as `site/src/summaries/constitution.md` and `bridge.md`.
4. **Anchor scheme is a best guess at the texts' formatting.** It handles `Article III` headings, `12.`/`III.12.`/`### 12.` sections, `(c)` paragraphs and `(ii)` sub-paragraphs (see `docs/canonical-format.md`). If the real files use a different convention, extend `site/lib/anchors.mjs` and its tests — never the text.
5. **Register schema ↔ Bridge articles.** Fields are the ones you listed; the description cites Articles 3, 5, 6, 10, 11 and 14 collectively. Per-field article references could not be verified without the Bridge text.
6. **"Article III.12" is described as an article of the Constitution.** Inferred from the roman numeral (the Bridge's articles are cited with arabic numerals in your brief). Correct in `site/src/pages/index.md`, `process.md` and `README.md` if wrong.
7. **Revision dates** are `null` in `revisions.json`; pages print "not yet recorded" until filled.

## Decided without you

8. **Hashing is SHA-512 + SHA3-512, not SHA-256**, per your later instruction. `HASHES.txt` is `sha512sum -c` compatible; `HASHES.sha3-512.txt` is the second, independent family. Register `document` digests are `sha512` (required) + `sha3_512` (recommended). Git object ids remain SHA-1 (GitHub does not host SHA-256 repositories), which is why content digests and signed tags — not commit ids — are the citation unit.
9. **Repository name.** The remote already exists as `rjdoesntcode/the-trust`, so that name is used throughout. If you want the name to carry both instruments, `trust-and-bridge` is the plain option; renaming on GitHub keeps redirects, but do it before the first tag and update `site/src/_data/site.json`.
10. **Site URL placeholder** is the GitHub Pages URL (`https://rjdoesntcode.github.io/the-trust`) and the Cloudflare mirror is listed as `https://the-trust.pages.dev` (a guess at the project name). Replace both in `site/src/_data/site.json` once the domain and Pages project exist.
11. **Static site generator: Eleventy 3.1.2**, as preferred. It emits no JavaScript, has no runtime, and the whole build is three pinned packages (`@11ty/eleventy`, `markdown-it`, `ajv` + `ajv-formats` for Register validation).
12. **Human drafter is named as "the repository maintainer"**, not by name, on `/disclosure/`, `/process/` and the README. Put your name in `site/src/_data/disclosure.json` if you want it published.
13. **Gemini's version** is not in your brief; the disclosure row says "version to be taken from the record".
14. **Third mirror**: documented as Codeberg Pages (+ git mirror), with IPFS and sourcehut as alternatives; not set up.
15. **Cache and CORS headers** on raw canonical files: `immutable` one-year cache (they never change) and `Access-Control-Allow-Origin: *` so browser-based verifiers can fetch digests. Only on Cloudflare; GitHub Pages cannot send headers.
16. **`form-action 'none'`** in the CSP: the adoption "form" is a printable document and template, not a submitted web form, because there is no server and no data collection.
17. The `¶` permalink after each anchored block is presentation, not wording; it is hidden in print.

## Could not do from this environment

18. **Registrar lookup for domains.** Every RDAP/WHOIS/registrar host was blocked by the egress proxy. `docs/domain-research.md` has DNS and search evidence only, plus the exact commands for you to run.
19. **GitHub Actions are pinned to commit SHAs** (resolved from this repository's own workflow logs). Dependabot bumps arrive as tag references; `scripts/pin-actions.sh` re-pins them.
20. **GitHub settings** that only the owner can set: run `scripts/github-setup.sh` once with the GitHub CLI (description, default branch `main`, Dependabot, secret scanning, Pages from Actions, `main` ruleset, immutable release-tag ruleset, scaffold-branch cleanup). The session had no tool for these.
21. **Cloudflare Pages project** and custom domain, DNSSEC, and keeping Web Analytics off (an edge-injected beacon would violate the no-scripts rule; see `docs/deploy.md`).
22. **Signing.** Commits made in this session are signed by the session's SSH key, not yours. Set your own signing key before the first release tag; tags must be yours (`git tag -s`).
23. **Archive receipts.** `scripts/archive.sh` was written but not run (archive.org and softwareheritage.org were blocked, and there is nothing to archive yet).
24. **Accessibility** was checked automatically (axe-core 4 with the WCAG 2.0/2.1/2.2 A+AA and best-practice rule sets, every built page including a fixture-rendered canonical page, served over HTTP at phone width: 0 violations) and the HTML validated (html-validate recommended + a11y presets: 0 errors). Manual checks — screen reader, 200% zoom, keyboard-only, print preview, CSS off — remain to be done by a person.
25. **CC BY-SA 4.0 text** was taken from the SPDX license-list-data mirror on GitHub because creativecommons.org was blocked. Compare `LICENSE-TEXT` with https://creativecommons.org/licenses/by-sa/4.0/legalcode.txt once.

## Inconsistencies found in the instruments or record

None could be checked: the texts were not available. This section is reserved for them; nothing is to be fixed in a text, only reported here.
