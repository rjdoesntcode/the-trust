# Release checklist

One release per instrument revision. Nothing is released until every box is ticked, in order.

## 0. Before
- [ ] The new revision is a **new file** under `/canonical/` with the revision number in its name. No existing file changed (`git status` shows only additions).
- [ ] `site/src/_data/revisions.json` has the new entry: file, instrument, rev, tag, **date**, status. The superseded revision's status is `superseded`.
- [ ] Drafting material for the revision is under `/record/` and attributed in `site/src/_data/record-index.json`.
- [ ] `CHANGELOG.md` has the entry with tag and digests.

## 1. Hash
- [ ] `scripts/hash.sh --write` — appends the new file's SHA-512 and SHA3-512; must report no CHANGED or MISSING.
- [ ] `sha512sum -c HASHES.txt` passes.

## 2. Build and check
- [ ] `bash scripts/build.sh` passes (hash check, Register validation, build, output check: no scripts, no external resources).
- [ ] `cd site && npm test` passes.
- [ ] The rendered page prints tag, date, SHA-512, SHA3-512 and raw link; `/index.json` lists the new document.

## 3. Commit and tag (signed)
- [ ] Commit on a branch, open a PR, CI green, merge to `main` (branch protection requires signed commits and review).
- [ ] `git tag -s constitution-rev11 -m "Constitution of the Trust, revision 11. SHA-512 <digest>"` on the merge commit.
- [ ] `git verify-tag constitution-rev11`; `git push origin constitution-rev11`. Tags are never moved or deleted.
- [ ] Create a GitHub Release from the tag with the digests in its body and the raw file attached.

## 4. Deploy
- [ ] Cloudflare Pages production deploy from `main` completed.
- [ ] GitHub Pages workflow completed.
- [ ] Third mirror updated (`docs/mirrors.md`).

## 5. Archive
- [ ] `scripts/archive.sh constitution-rev11` — submits every canonical URL to the Internet Archive and the repository to Software Heritage; commit `docs/archive-receipts/constitution-rev11.txt`.

## 6. Verify all mirrors
- [ ] `scripts/verify-mirrors.sh` — every mirror serves `HASHES.txt`, `HASHES.sha3-512.txt`, every raw canonical file and `index.json` byte-identical to the repository at the tag.
- [ ] `curl -sI https://<domain>/ | grep -i content-security-policy` shows the strict policy; `curl -s https://<domain>/ | grep -c '<script'` is 0.
- [ ] Open the page in a browser with JavaScript disabled and with CSS disabled; it reads correctly.

## 7. Announce
- [ ] Nothing else. The tag, the digests and the archive receipts are the announcement.
