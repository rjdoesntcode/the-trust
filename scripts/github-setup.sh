#!/usr/bin/env bash
# github-setup.sh — configure the GitHub side of SECURITY.md in one run:
# description/topics, default branch, Dependabot, secret scanning, GitHub
# Pages from Actions, a ruleset on main (PR + passing build + signed commits +
# no force-push/delete), an immutable-tag ruleset, and removal of the scaffold
# branch. Idempotent where the API allows; re-run after any change.
#
# Requires the GitHub CLI authenticated as the repository owner:
#   gh auth login   (scopes: repo, workflow)
#   scripts/github-setup.sh [owner/repo]
set -euo pipefail
REPO="${1:-rjdoesntcode/the-trust}"
OWNER="${REPO%/*}"; NAME="${REPO#*/}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
command -v gh >/dev/null || { echo "gh is required: https://cli.github.com/" >&2; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "run: gh auth login" >&2; exit 1; }

DESCRIPTION="Public, verifiable home of the Constitution of the Trust and the Bridge: content-addressed instrument texts (SHA-512 + SHA3-512, signed tags), the full drafting and review record, the Bridge Register, and a static site with no scripts and no tracking. Not a treaty, not in force."

echo "== 1/8 description, homepage, topics, merge settings"
gh repo edit "$REPO" \
  --description "$DESCRIPTION" \
  --homepage "https://$OWNER.github.io/$NAME/" \
  --add-topic constitution --add-topic bridge --add-topic content-addressed --add-topic static-site --add-topic eleventy --add-topic transparency \
  --enable-issues --enable-wiki=false --enable-projects=false --enable-discussions=false \
  --delete-branch-on-merge --allow-update-branch \
  --enable-squash-merge --enable-merge-commit --enable-rebase-merge=false

echo "== 2/8 default branch -> main"
gh api "repos/$REPO/branches/main" >/dev/null 2>&1 || { echo "main does not exist yet; push it first: git push origin HEAD:main" >&2; exit 1; }
gh repo edit "$REPO" --default-branch main

echo "== 3/8 Dependabot alerts + security updates, secret scanning + push protection"
gh api -X PUT "repos/$REPO/vulnerability-alerts" >/dev/null && echo "   dependabot alerts: on"
gh api -X PUT "repos/$REPO/automated-security-fixes" >/dev/null && echo "   dependabot security updates: on"
gh api -X PATCH "repos/$REPO" --input - >/dev/null <<'JSON' && echo "   secret scanning + push protection: on"
{"security_and_analysis":{"secret_scanning":{"status":"enabled"},"secret_scanning_push_protection":{"status":"enabled"}}}
JSON

echo "== 4/8 GitHub Pages built by Actions, HTTPS enforced"
if gh api "repos/$REPO/pages" >/dev/null 2>&1; then
  gh api -X PUT "repos/$REPO/pages" -f build_type=workflow -F https_enforced=true >/dev/null
else
  gh api -X POST "repos/$REPO/pages" -f build_type=workflow >/dev/null
  gh api -X PUT "repos/$REPO/pages" -f build_type=workflow -F https_enforced=true >/dev/null || true
fi
echo "   pages: $(gh api "repos/$REPO/pages" --jq '.html_url + " (" + .build_type + ")"')"

echo "== 5/8 actions pinned to commit SHAs?"
if grep -qE 'uses: [^ ]+@v[0-9]' "$ROOT"/.github/workflows/*.yml; then
  echo "   NOT PINNED. Run scripts/pin-actions.sh, commit, push to main, then re-run this script." >&2
  echo "   (Rulesets are applied anyway; the pin commit will go through a pull request.)" >&2
fi

echo "== 6/8 ruleset: main"
ruleset_id() { gh api "repos/$REPO/rulesets" --jq ".[] | select(.name==\"$1\") | .id"; }
MAIN_RULES='{
  "name": "main: pull request, passing build, signed commits, no force-push or delete",
  "target": "branch", "enforcement": "active", "bypass_actors": [],
  "conditions": { "ref_name": { "include": ["refs/heads/main"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "required_linear_history" },
    { "type": "required_signatures" },
    { "type": "pull_request", "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true } },
    { "type": "required_status_checks", "parameters": {
        "strict_required_status_checks_policy": true,
        "required_status_checks": [ { "context": "build" } ] } }
  ]
}'
# A single maintainer cannot approve their own pull request, so approvals are
# 0 and code-owner review is off. When a second maintainer exists, set
# required_approving_review_count to 1 and require_code_owner_review to true.
id="$(ruleset_id "main: pull request, passing build, signed commits, no force-push or delete")"
if [ -n "$id" ]; then echo "$MAIN_RULES" | gh api -X PUT "repos/$REPO/rulesets/$id" --input - >/dev/null; echo "   updated ruleset $id";
else echo "$MAIN_RULES" | gh api -X POST "repos/$REPO/rulesets" --input - >/dev/null; echo "   created"; fi

echo "== 7/8 ruleset: release tags are immutable and signed"
TAG_RULES='{
  "name": "release tags: immutable, signed",
  "target": "tag", "enforcement": "active", "bypass_actors": [],
  "conditions": { "ref_name": { "include": ["refs/tags/constitution-*", "refs/tags/bridge-*"], "exclude": [] } },
  "rules": [ { "type": "deletion" }, { "type": "non_fast_forward" }, { "type": "update" }, { "type": "required_signatures" } ]
}'
id="$(ruleset_id "release tags: immutable, signed")"
if [ -n "$id" ]; then echo "$TAG_RULES" | gh api -X PUT "repos/$REPO/rulesets/$id" --input - >/dev/null; echo "   updated ruleset $id";
else echo "$TAG_RULES" | gh api -X POST "repos/$REPO/rulesets" --input - >/dev/null; echo "   created"; fi

echo "== 8/8 remove the scaffold branch (its commits are on main)"
for b in $(gh api "repos/$REPO/branches" --jq '.[].name' | grep -E '^claude/' || true); do
  if [ "$(gh api "repos/$REPO/compare/main...$b" --jq .ahead_by)" = "0" ]; then
    gh api -X DELETE "repos/$REPO/git/refs/heads/$b" >/dev/null && echo "   deleted $b"
  else echo "   kept $b (has commits not on main)"; fi
done

echo
echo "Done. Verify in the browser: https://github.com/$REPO/settings/rules and /settings/pages"
echo "Then: your own signing key must be registered on GitHub (Settings -> SSH and GPG keys) or your"
echo "commits will be rejected by the required_signatures rule."
