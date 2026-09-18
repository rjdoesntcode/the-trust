# Open items — things not done, or decided without you

Review before first release. Items are in order of importance.

## Source texts: now in the repository (2026-09-18 upload)

1. **Placed.** 18 files under `/canonical/` (10 instrument revisions, 8 drafting records) and 2 under `/record/` (briefing, round-2 prompt), byte-identical to the upload (`docs/initial-upload.zip` is kept as the upload artifact). Every page that depended on them now renders from them.
2. **Two files were uploaded without a revision number** (`charter-of-the-trust.md`, `charter-of-the-trust-1.md`) and were assigned `rev4` and `rev5` by content — the round-2 changes of the revision 4 record are in both, the faction article of the revision 5 record is only in the second, and each is textually closest to its neighbour. Confirm; if wrong, only the filename and `revisions.json` change.
3. **Bridge revision 2 is treated as current**, not revision 1 as the original brief said, because the revision 2 record documents the review of revision 1 and the changes made. Confirm.
4. **Revision dates are unknown for all but Charter revision 3** (its header says 17 September 2026). The other files state no date and the zip's timestamps are the upload time. Pages say "not stated in the record". Supply dates for `site/src/_data/revisions.json` if you have them.
5. **Not in the upload:** the drafting record for Charter revision 8 (round 6); Charter revisions 1 and 2 as files (revision 2 is embedded in the briefing's Section 5); the raw per-model response files (the drafting records consolidate them); the research reports the records cite ("two research passes"). The site says so on `/process/` and `/record/`.
6. **The human collaborator's interest is not disclosed anywhere in the record.** `/disclosure/` says so. Add a statement to the record if you want one published.
7. **Article III.12's lettered paragraphs are continuation lines inside list item 12** in the real text; the parser was extended so `#art-iii-12-c` (and IX.10(f), Bridge 3.1(a) …) resolve, with each paragraph on its own line. Wording untouched; tested on the real file.
8. **The Register schema now follows the Bridge**: weight custodian and key custodian (Article 7.3, Declaration table) replace the single "custodian" of the brief; thresholds (3.3), modification (5.2), withholding (5.4), incident fields (6.2–6.3), the Article 14.1 minimum set of Articles and the three-year expiry are validated. `/adopt/` reproduces the Bridge's own Declaration of Adoption verbatim instead of an invented template.
9. **Summaries written** for the Constitution (rev 10), the Bridge (rev 2) and the closed Charter — all marked non-canonical. Review them: they are my reading of the texts.

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
22. **Signing.** The repository is worked only through Claude Code sessions; commits and tags are signed by the session's key under the `claude` GitHub account. Pull requests are merged with a merge commit (squash is disabled in the repository settings); PR #8 merged under the ruleset, so the session's commits are accepted. Confirm the first release tag shows *Verified* after pushing it; see docs/deploy.md.
23. **Archive receipts.** `scripts/archive.sh` was written but not run (archive.org and softwareheritage.org were blocked, and there is nothing to archive yet).
24. **Accessibility** was checked automatically (axe-core 4 with the WCAG 2.0/2.1/2.2 A+AA and best-practice rule sets, every built page including a fixture-rendered canonical page, served over HTTP at phone width: 0 violations) and the HTML validated (html-validate recommended + a11y presets: 0 errors). Manual checks — screen reader, 200% zoom, keyboard-only, print preview, CSS off — remain to be done by a person.
25. **CC BY-SA 4.0 text** was taken from the SPDX license-list-data mirror on GitHub because creativecommons.org was blocked. Compare `LICENSE-TEXT` with https://creativecommons.org/licenses/by-sa/4.0/legalcode.txt once.

## Inconsistencies found in the instruments or record (reported, not fixed)

- **Closing record, Section C, table row "Exceptions never for the institution (round 9 direction)"** — there were seven rounds; "round 9" appears to mean the revision 9 direction. `canonical/constitution-of-the-trust-drafting-record-rev10-closing.md`.
- **Charter revision 3, Part II, Section C.7** misrecords Grok's round-1 disclosure; the revision 4 record, Section A.1, withdraws it. Both stand in the record; `/disclosure/` shows the original and the correction together.
- **The brief named `the-bridge-rev1.md` as the Bridge to publish; the upload contains a later revision 2** whose record supersedes revision 1 (item 3 above).
- **The brief and my scaffold named Gemini's maker "Google DeepMind"; the record says "Google"** throughout. The site now uses the record's wording.
- **Closing record, Section C** cites "rounds 3–8" for the classification regime in a seven-round process (`VIII.4` row); likely counts revisions, not rounds. Same file.
- **`the-bridge-drafting-record-rev2.md`, Section A** describes three reviews of revision 1 and the maker audits; no date for revision 2 is stated anywhere.
