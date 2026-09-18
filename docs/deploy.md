# Deployment

The site is built by `scripts/build.sh` into `site/_site/`. Every deploy target builds from `main` with that one command, so all mirrors are byte-identical.

## Cloudflare Pages (primary)

Create a Pages project connected to this repository (Workers & Pages → Create → Pages → Connect to Git):

| Setting | Value |
|---|---|
| Production branch | `main` |
| Root directory | `/` |
| Build command | `cd site && npm ci --no-audit --no-fund && cd .. && bash scripts/build.sh` |
| Build output directory | `site/_site` |
| Node version | read from `.node-version` (22) |
| Environment variables | none |

`site/src/_headers` is copied to the output root and Cloudflare Pages applies it: strict CSP, `Referrer-Policy: no-referrer`, HSTS, immutable caching for `/canonical/*`, CORS `*` for the raw files, manifests and `index.json` so verification tools can fetch them from anywhere.

After a custom domain is attached: enable DNSSEC at the registrar and in Cloudflare DNS; set SSL/TLS to Full (strict); turn **off** every analytics feature (Web Analytics, RUM, beacons) — the site must not carry a Cloudflare beacon script (Pages does not inject one unless Web Analytics is enabled; `scripts/check-output.sh` catches any `<script>` in the built output, but the injection would happen at the edge, so keep the feature off and verify with `curl -s https://<domain>/ | grep -c '<script'` = 0).

## GitHub Pages (mirror)

`.github/workflows/build.yml` builds on every push and deploys `site/_site` to GitHub Pages from `main`. Enable in Settings → Pages → Source: GitHub Actions. GitHub Pages cannot send custom headers, so every page carries a `<meta http-equiv="Content-Security-Policy">` and `<meta name="referrer" content="no-referrer">` as the fallback. `.nojekyll` is emitted so `_headers` and other underscore paths are served.

All GitHub-side settings (description, default branch, Dependabot, secret scanning, Pages, rulesets) are applied by `scripts/github-setup.sh` with the GitHub CLI. Before enabling branch protection, run `scripts/pin-actions.sh` (needs the GitHub CLI) so every action is referenced by full commit SHA.

## Third mirror

See `docs/mirrors.md`.

## Working the repository only through Claude Code sessions

Every change lands by pull request into `main`; the ruleset has no bypass. Two consequences:

- **Merge with "Squash and merge".** The squash commit is created and signed by GitHub, so it satisfies the signed-commit rule and keeps history linear. A merge commit would carry the branch's own commits onto `main` (they must all be *Verified*); a rebase merge rewrites them unsigned and is rejected.
- **Release tags are signed by the session's key** (`git tag -s`), and the tag ruleset requires a verified signature. The commit and tag author is the `claude` GitHub account the sessions run as; if GitHub does not show *Verified* on its commits, the tag push will be refused and a key must be registered on that account first.

Uploads through the GitHub web interface are committed and signed by GitHub and pass both rules.
