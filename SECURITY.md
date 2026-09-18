# Security policy

The security posture of this repository is **integrity, not secrecy**.
Everything here is public. What must be protected is that the texts a
reader sees are the texts that were published, unchanged, and that every
change is attributable.

## What is enforced

- **Signed commits.** Every commit on `main` is GPG- or SSH-signed by the
  maintainer. Unsigned commits are rejected by branch protection.
- **Signed release tags.** Each revision of each instrument has exactly one
  signed tag: `constitution-rev10`, `bridge-rev1`, and so on. A tag is
  never moved or deleted. Tags are the citation unit (see README, "How to
  cite").
- **Branch protection on `main`.** Direct pushes are disabled. Changes
  arrive by pull request, require review by a code owner, require the
  build check (which verifies canonical hashes) to pass, and require signed
  commits. Force pushes and branch deletion are disabled.
- **CODEOWNERS.** Every path requires the maintainer's review.
- **Pinned dependencies.** `site/package.json` pins exact versions;
  `site/package-lock.json` is committed; CI installs with `npm ci`.
  GitHub Actions are pinned to full commit SHAs.
- **Dependabot.** Enabled for npm and GitHub Actions, weekly.
- **No secrets in the repository.** The build needs none. Deploy
  credentials live only in the deploy platforms' own settings, never in
  files here. `.gitignore` excludes `.env`.
- **Content hashes.** `HASHES.txt` (SHA-512) and `HASHES.sha3-512.txt` (SHA3-512) list two independent digests of every file in
  `/canonical/`. `scripts/hash.sh --check` fails the build if any existing
  canonical file's hash changes. A canonical text may only ever be added
  as a new file with a new revision number.

## What is not a goal

- Confidentiality. Nothing in this repository is secret.
- Availability guarantees beyond mirroring. The site is served from
  several mirrors and archived to the Internet Archive and Software
  Heritage on every release so that it can be verified even if every
  mirror disappears.

## Verifying what you are reading

1. Take the SHA-512 and SHA3-512 printed at the foot of any canonical page.
2. Fetch the raw file linked from that page and run `sha512sum` (and `openssl dgst -sha3-512`) on it.
3. Compare against `HASHES.txt` at the signed tag named on the page:
   `git verify-tag constitution-rev10` then `git show constitution-rev10:HASHES.txt`.
4. Optionally compare against the Internet Archive or Software Heritage
   snapshot listed in `docs/archive-receipts/` for that tag.

If any of these disagree, the text you are reading is not the published
text.

## Reporting

If you find that a mirror is serving a text whose hash does not match the
signed tag, or any other integrity problem, open a public issue in this
repository. There is nothing here that needs private disclosure. If you
believe a signing key has been compromised, say so in a public issue as
well; the response will be a public key rotation recorded in the
changelog.
