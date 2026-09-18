# Mirrors

Every mirror is built from `main` by `scripts/build.sh` and must serve byte-identical canonical files. `scripts/verify-mirrors.sh` checks that (weekly by `.github/workflows/verify-mirrors.yml`, and on every release).

| Mirror | Status | Notes |
|---|---|---|
| Cloudflare Pages | primary | custom domain, full HTTP headers |
| GitHub Pages | mirror | `rjdoesntcode.github.io/the-trust`; meta-tag CSP fallback |
| Third mirror | documented, not yet set up | options below |

## Third mirror options

**Recommended: Codeberg Pages + git mirror.** Codeberg is run by a German non-profit, is outside the two US platforms already used, and mirrors the git repository itself (tags and history included), not just the built site. Set up: create `codeberg.org/<user>/the-trust` as a pull mirror of the GitHub repository (Codeberg → New Migration → mirror), and a `pages` branch (or a `the-trust` repo with the built `site/_site` pushed to its `pages` branch by a step added to `build.yml`). Served at `https://<user>.codeberg.page/the-trust/`. No custom headers; the meta CSP fallback applies.

**Alternative: IPFS.** Content-addressed by construction, which matches the design of this repository. `ipfs add -r site/_site` yields a CID; publish it with a DNSLink TXT record (`_dnslink.<domain>`) and pin it with at least two independent pinning services. Anyone can then fetch the site by CID from any gateway and compare digests. Downside: gateways send their own headers, and CIDs change with every release, so the DNSLink record must be updated as part of the release checklist.

**Alternative: sourcehut pages** (`srht.site`), minimal, no JavaScript on the platform side, upload the built tarball with `hut pages publish`.

Add each mirror to `site/src/_data/site.json` → `mirrors` so the footer lists it and `verify-mirrors.sh` checks it.
