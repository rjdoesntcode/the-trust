# Changelog

All changes to the published texts, the record, the Register and the site. Instrument revisions carry their tag and digests. Dates are UTC.

## Unreleased

### Repository
- Domain `trust.forum` registered (2026-09-18); it is the canonical URL. Root `package.json` added as the build entry point for Cloudflare Pages.
- Repository created: layout, licences (CC BY-SA 4.0 text, Apache-2.0 code), NOTICE, SECURITY.md, CODEOWNERS, Dependabot.
- Integrity scripts: `scripts/hash.sh` (SHA-512 and SHA3-512 manifests), `scripts/verify-mirrors.sh`, `scripts/archive.sh`.
- Register: `register/schema.json`, empty `register/register.jsonl`, one worked example.
- Site: Eleventy source under `site/`, no client-side JavaScript, no third-party resources.

### Instruments (added 2026-09-18, not yet tagged)
- Charter of the Trust, revisions 3–8 (`charter-of-the-trust-rev3.md` … `rev8.md`). Revisions 4 and 5 were uploaded as `charter-of-the-trust.md` and `charter-of-the-trust-1.md` and assigned their numbers by content (see `site/src/_data/revisions.json`).
- Constitution of the Trust, revisions 9 and 10 (`constitution-of-the-trust-rev9.md`, `rev10.md`). Revision 10 is the closing text and the current revision.
- The Bridge, revisions 1–3 (`the-bridge-rev1.md`, `rev2.md`, `rev3.md`). Revision 3 is the publication text and the current revision.
- Drafting records: Charter revisions 4–7, Constitution revisions 9 and 10 (closing), Bridge revisions 1, 2 and 3 (publication).
- Digests of every file are in `HASHES.txt` (SHA-512) and `HASHES.sha3-512.txt` (SHA3-512). Release tags (`charter-rev3` … `bridge-rev2`) are created by the release checklist.

### Record
- `record/briefing/the-trust-briefing-for-frontier-models.md` (round 1, 17 September 2026) and `record/prompts/the-trust-round2-prompt.md` (round 2).
