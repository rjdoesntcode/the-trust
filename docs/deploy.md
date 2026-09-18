# Deployment

The site is built by `scripts/build.sh` into `site/_site/`. Every deploy target builds from `main` with that one command, so all mirrors are byte-identical.

## Cloudflare Pages (primary) — trust.forum

Workers & Pages → Create → Pages → Connect to Git → `rjdoesntcode/the-trust`. Use exactly these values; Cloudflare's framework auto-detection guesses wrong for this layout (it sees Eleventy inside `site/` and builds from the wrong directory without the hash check).

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | **None** |
| Root directory | `/` (leave empty) |
| Build command | `npm run build` |
| Build output directory | `site/_site` |
| Environment variables | `NODE_VERSION` = `22` (also read from `.node-version`) |

`npm run build` at the root runs `cd site && npm ci && bash scripts/build.sh`, which verifies both digest manifests, validates the Register, builds, and refuses to publish output containing scripts or external resources. If the build log shows a failure, the last lines name the step; `hash.sh`, `validate-register` and `check-output.sh` fail loudly and on purpose.

Common causes of a failed first deploy:

- Build output directory left at `_site` or root directory set to `site` → "output directory not found". Use the table above.
- Framework preset "Eleventy" selected → Cloudflare runs `npx @11ty/eleventy` in the wrong directory. Set to None.
- Node 18 image → `node --test` glob and ESM data files fail. `.node-version` pins 22; the variable makes it explicit.

**Custom domain.** Pages project → Custom domains → add `trust.forum` (and `www.trust.forum`, redirected to the apex). Cloudflare creates the DNS records if the zone is on Cloudflare. Then in the zone: DNS → **DNSSEC → Enable** and copy the DS record to the registrar (Cloudflare Registrar does this automatically); SSL/TLS → **Full (strict)**; Edge Certificates → **Always Use HTTPS** and **HSTS** on (max-age one year, include subdomains, preload); Speed → turn **off** Rocket Loader, Auto Minify, Email Obfuscation and any feature that injects JavaScript; Analytics → **Web Analytics off** (an injected beacon would violate the no-scripts rule; verify with `curl -s https://trust.forum/ | grep -c '<script'` = 0). At the registrar: transfer lock on, auto-renew on, registered for the maximum term.

`site/src/_headers` is applied by Pages: strict CSP, `Referrer-Policy: no-referrer`, HSTS, immutable caching for `/canonical/*`, CORS `*` for the raw files, manifests and `index.json`.

## GitHub Pages (mirror)

`.github/workflows/build.yml` builds on every push and deploys `site/_site` to GitHub Pages from `main`. Enable in Settings → Pages → Source: GitHub Actions. GitHub Pages cannot send custom headers, so every page carries a `<meta http-equiv="Content-Security-Policy">` and `<meta name="referrer" content="no-referrer">` as the fallback. `.nojekyll` is emitted so `_headers` and other underscore paths are served.

All GitHub-side settings (description, default branch, Dependabot, secret scanning, Pages, rulesets) are applied by `scripts/github-setup.sh` with the GitHub CLI. Before enabling branch protection, run `scripts/pin-actions.sh` (needs the GitHub CLI) so every action is referenced by full commit SHA.

## Third mirror

See `docs/mirrors.md`.

## Working the repository only through Claude Code sessions

Every change lands by pull request into `main`; the ruleset has no bypass. Verified on PR #8 (2026-09-18):

- **Merge with "Create a merge commit".** Squash merging is disabled in this repository's settings. The merge commit is created and signed by GitHub, and the branch's own commits — signed by the session's key under the `claude` GitHub account — were accepted by the ruleset. Do not rebase-merge: it rewrites the commits unsigned.
- **Release tags are signed by the session's key** (`git tag -s`) and the tag ruleset requires a verified signature; confirm the tag shows *Verified* after pushing it.

Uploads through the GitHub web interface are committed and signed by GitHub and pass the rules.
