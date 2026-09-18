#!/usr/bin/env bash
# pin-actions.sh — rewrite every `uses: owner/repo@vN` in .github/workflows to
# the full commit SHA that tag currently points to, keeping the tag as a
# comment. Requires the GitHub CLI (`gh auth login` first). Run after any
# Dependabot bump that leaves a tag reference.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
command -v gh >/dev/null || { echo "pin-actions.sh: gh is required" >&2; exit 1; }
for f in "$ROOT"/.github/workflows/*.yml; do
  grep -oE 'uses: [A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+@v[0-9.]+' "$f" | sort -u | while read -r _ ref; do
    repo="${ref%@*}"; tag="${ref#*@}"
    sha="$(gh api "repos/$repo/git/ref/tags/$tag" --jq .object.sha)"
    # annotated tags point at a tag object; dereference to the commit
    type="$(gh api "repos/$repo/git/ref/tags/$tag" --jq .object.type)"
    if [ "$type" = "tag" ]; then sha="$(gh api "repos/$repo/git/tags/$sha" --jq .object.sha)"; fi
    sed -i "s#uses: $repo@$tag\$#uses: $repo@$sha # $tag#" "$f"
    echo "$f: $repo@$tag -> $sha"
  done
done
