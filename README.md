# The Constitution of the Trust and the Bridge

This repository is the public, verifiable home of two texts — the **Constitution of the Trust** and the **Bridge** — together with the complete record of how they were made, the Register on which parties declare adoption of the Bridge, and the static website that publishes all of it.

The instruments require transparency and forbid surveillance of persons. This repository and the site it builds hold themselves to the same rule: everything is public, every text is content-addressed, nothing tracks anyone.

## What this is

- **`/canonical/`** — the instrument texts, exactly as uploaded. One file per revision, named with its revision number (`charter-of-the-trust-rev3.md` … `rev8.md`, `constitution-of-the-trust-rev9.md`, `rev10.md`, `the-bridge-rev1.md`, `rev2.md`), plus every drafting record. Never edited, renamed or deleted. Two Charter files uploaded without a number were assigned `rev4` and `rev5` by content; `site/src/_data/revisions.json` records the original names and the reasoning, and the bytes are unchanged.
- **`/record/`** — the briefing put to the reviewing models and the round-2 prompt, attributed. The drafting records (which consolidate every model response, every declined suggestion and every standing dissent) live under `/canonical/` and are attributed and rendered on the site's `/record/` pages. The raw per-model response files were not part of the upload.
- **`/register/`** — the Bridge Register: `register.jsonl` (append-only, currently **empty**), `schema.json`, and one worked example that is not an entry.
- **`/site/`** — the static site source (Eleventy). Zero client-side JavaScript, no analytics, no cookies, no third-party resources.
- **`/scripts/`** — build, hash, archive, mirror-verification and Register-validation scripts.
- **`HASHES.txt`** (SHA-512) and **`HASHES.sha3-512.txt`** (SHA3-512) — two independent digests of every canonical file.
- **`/docs/`** — deployment, release checklist, mirrors, the canonical text format, translations, domain research, and open items.

## What this is not

Not a treaty. Not a government. Not in force. Cannot compel anyone. Not endorsed by the makers of any model that took part. Not a membership. See the site's `/not/` page, and `NOTICE`: **no party may represent adoption of the Bridge or endorsement by the Trust without a published declaration on the Register.**

## How it was made

One human collaborator drafted the instruments with Claude (Anthropic). GPT‑5.6 Sol (OpenAI), Gemini (Google) and Grok 4.6 (xAI) reviewed the drafts over seven review rounds. The instrument began as the *Charter of the Trust* (revisions 1–8, closed at revision 8 by the consent of the three reviewers), was reopened at the human collaborator's direction and converted into the *Constitution of the Trust* at revision 9, and closed at revision 10. The *Bridge*, a transitional instrument adoptable by any party alone, was drafted from two research passes and reviewed by the same three models, each also auditing its own maker. Every round's changes, declined feedback and standing dissents are in the drafting records under `/canonical/`, readable on the site's `/record/` pages. Article III.12 of the Constitution was put to a vote of all four models and carried unanimously; the closing record has the question, the rule, the result and each model's disclosed interest. Each participant, its maker, and the maker's disclosed interest — quoted by the build from the record by file and line — are on the site's `/disclosure/` page.

## Immutability

`/canonical/` and `/record/` are read by the build and written by no one. The rules, enforced by `scripts/hash.sh --check` on every build:

1. A file listed in `HASHES.txt` must still exist with the same digests. A changed digest fails the build. There is no override.
2. A new text is a new file whose name carries the new revision number. The prior revision stays, with its tag and digests.
3. Nothing is renamed or deleted.

## Build it locally

Requirements: Node 22 (`.node-version`), `openssl`, `jq`, `sha512sum` (coreutils).

```sh
git clone https://github.com/rjdoesntcode/the-trust
cd the-trust/site && npm ci && cd ..
bash scripts/build.sh          # verifies hashes, validates the Register, builds site/_site, checks the output
cd site && npm run serve       # preview at http://localhost:8080/
```

`npm test` in `site/` runs the anchor-scheme tests.

## How to verify a text

Every canonical page prints its git tag, revision date, SHA-512, SHA3-512, and a link to the raw file. To verify independently of this site:

```sh
git clone https://github.com/rjdoesntcode/the-trust && cd the-trust
git verify-tag constitution-rev10                      # signed tag for that revision (tags are created at release; see docs/release-checklist.md)
git checkout constitution-rev10
sha512sum -c HASHES.txt                                # every canonical file, SHA-512
scripts/hash.sh --check                                # both manifests
```

Or, with only a downloaded file: `sha512sum constitution-of-the-trust-rev10.md` and `openssl dgst -sha3-512 constitution-of-the-trust-rev10.md`, compared with the digests on the page, in `HASHES.txt` / `HASHES.sha3-512.txt`, and in `/index.json`. The digest, not the site, is the authority.

## How to cite a revision

Cite the instrument, revision, tag and digest, then the anchor:

> Constitution of the Trust, revision 10, tag `constitution-rev10`, SHA-512 `<digest>`, Article III.12(c) — `/constitution/rev10/#art-iii-12-c`.

Anchors are stable for the life of a revision: `#art-iii` (Article III), `#art-iii-12` (section 12), `#art-iii-12-c` (paragraph c), `#art-iii-12-c-ii` (sub-paragraph ii), `#preamble`. See `docs/canonical-format.md`.

`/index.json` is a machine-readable index of every canonical document: path, revision, tag, date, digests.

## How to adopt the Bridge

Adoption is a public declaration entered on the Register. Read the Bridge, complete and sign the Declaration of Adoption (site `/adopt/`, template at `/adopt/declaration-template.md`), compute its digests, write one line of JSON that validates against `register/schema.json`, sign it, and open a pull request that **appends** it to `register/register.jsonl` and adds the document under `register/documents/`. The build validates it. Merging records the declaration; it is not an endorsement, verification or judgement. Details: `register/README.md`.

## How to propose an amendment

1. Open an issue describing the change and the reason.
2. Open a pull request that **adds** a new file under `/canonical/` with the next revision number (e.g. `the-bridge-rev2.md`) and adds its metadata (date, tag) to `site/src/_data/revisions.json`. Do not touch the existing file.
3. Put the drafting material for the amendment under `/record/`, attributed in `site/src/_data/record-index.json`.
4. On merge, the maintainer follows `docs/release-checklist.md`: hash, signed tag, archive, deploy, verify mirrors.

## Adding files to `/canonical/` or `/record/` (maintainer)

```sh
cp <file> canonical/the-bridge-rev2.md          # new revision filename; never overwrite
$EDITOR site/src/_data/revisions.json           # add {file, instrument, rev, tag, date}
scripts/hash.sh --write                         # appends the new digests; fails if any existing one changed
bash scripts/build.sh
```

Every file under `/record/` must have an entry in `site/src/_data/record-index.json` (`file`, `title`, `kind`, `author`, `maker`, `date`, `round`) or the build fails — nothing unattributed is published.

## Security

Integrity, not secrecy. Signed commits, signed release tags (one per instrument revision), branch protection on `main`, CODEOWNERS, pinned dependencies, Dependabot, no secrets. See `SECURITY.md`.

## Mirrors and archives

Primary: Cloudflare Pages from `main`. Mirror: GitHub Pages (`.github/workflows/build.yml`). A third mirror option and the procedure are in `docs/mirrors.md`. On every release `scripts/archive.sh` submits every canonical URL to the Internet Archive and the repository to Software Heritage, and the receipts are committed under `docs/archive-receipts/`. `scripts/verify-mirrors.sh` confirms all mirrors serve identical digests.

## Translations

English is the only language now. The site is structured so that a translation drops in as `/es/`, `/zh/`, etc. without touching `/canonical/`; a translated instrument is never canonical and says so. See `docs/translations.md`.

## Licences

Text (instruments, record, Register, site prose): [CC BY-SA 4.0](LICENSE-TEXT). Code (site, scripts, configuration): [Apache-2.0](LICENSE). See `NOTICE` for the rule on representing adoption or endorsement.
