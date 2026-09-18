# Changelog

All changes to the published texts, the record, the Register and the site. Instrument revisions carry their tag and digests. Dates are UTC.

## Unreleased

### Site
- Home page carries one background image (a person and an intelligence facing the world, created with Grok, credited on the legal notice) as a semi-transparent, decorative layer behind the hero; absent in print, with CSS off, and under reduced-transparency or high-contrast preferences. Footer fine print reduced to the copyright line and links, full width. Site prose, summaries and documentation spelled in US English (instruments and record untouched). Pending-contact notes on the legal notice and privacy page rendered as plain sentences or a block note, no inline styles. Display audit of every page: the disclosure page no longer lists each participant twice (its quote specification moved out of the data directory); the changelog page no longer repeats its heading; long documents no longer use a backdrop blur, which Chromium stops painting on very tall elements; wide tables scroll inside their own keyboard-focusable box; tables on the record, process and revisions pages use the full card width; the contents panel no longer overflows narrow screens; host names removed from the privacy page and legal notice.
- Navigation: Constitution and Bridge open the current text directly; revisions, digests, citation and verification moved to /constitution/revisions/ and /bridge/revisions/. The Charter is folded into the Constitution's lineage (revisions 3 to 8, published as the Charter of the Trust); /charter/ URLs redirect. Wordmark capitalized consistently; mark recentered; nav baseline fixed; footer at half size and muted with distinct headings; compact More menu; branded scrollbars; host names removed from the site's copy; a structured GitHub issue form for Register submissions.
- Legal notice rewritten on the basis of a legal-compliance review dated 2026-09-18: Virginia governing law and forum; AI-provenance statement (also in the footer and on /process/); per-company trademark lines with entity names; models' assessments framed as attributed opinion with a correction procedure (notice at the head of /disclosure/ and of the record pages that carry maker audits); Register submission policy; license line 'to the extent protectable by copyright'; xAI and Google attribution requests honored. Designated copyright agent and contact address pending.
- Privacy, Terms of use and Accessibility pages added (`/privacy/`, `/terms/`, `/accessibility/`); LICENSE, LICENSE-TEXT and NOTICE served at the site root. Terms carry a visible pending note for governing law and a contact address.
- Redesign: light glass design system (`docs/design-system.md`), self-hosted Inter and Source Serif 4 (OFL, Latin subsets), new mark, five-item primary navigation with a native popover menu, no client-side JavaScript. axe 0 violations and html-validate 0 errors on every page.
- Roadmap for globalization (`docs/roadmap.md`): language directories, `Accept-Language` routing at the edge, translation pipeline.
- Hosting: production default hostname off, preview URLs on, observability on without per-request invocation logs.

### Repository
- Domain `trust.forum` registered (2026-09-18); it is the canonical URL. Root `package.json` added as the build entry point for the host's build.
- Repository created: layout, licenses (CC BY-SA 4.0 text, Apache-2.0 code), NOTICE, SECURITY.md, CODEOWNERS, Dependabot.
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
- `record/briefing/the-trust-briefing-for-frontier-models.md` (round 1, September 17, 2026) and `record/prompts/the-trust-round2-prompt.md` (round 2).
