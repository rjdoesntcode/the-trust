#!/usr/bin/env bash
# archive.sh — on each release, submit every canonical URL to the Internet
# Archive (Wayback Machine) and the repository to Software Heritage, and record
# the receipts under docs/archive-receipts/<tag>.txt.
#
#   scripts/archive.sh <tag>            e.g. scripts/archive.sh constitution-rev10
#
# Reads the site URL and repository URL from site/src/_data/site.json and the
# list of canonical documents from the built site/_site/index.json (run the
# build first). No credentials are required: the Wayback "save" endpoint and
# the Software Heritage "save code now" endpoint both accept anonymous
# requests, rate-limited. Nothing about the person running this script is sent
# beyond what an ordinary HTTP request carries.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TAG="${1:?usage: $0 <release-tag>}"
INDEX="$ROOT/site/_site/index.json"
SITEJSON="$ROOT/site/src/_data/site.json"
RECEIPTS="$ROOT/docs/archive-receipts"

command -v jq >/dev/null || { echo "archive.sh: jq is required" >&2; exit 1; }
[ -f "$INDEX" ] || { echo "archive.sh: $INDEX not found; run the build first" >&2; exit 1; }

SITE_URL="$(jq -r .url "$SITEJSON")"
REPO_URL="$(jq -r .repository "$SITEJSON")"
mkdir -p "$RECEIPTS"
OUT="$RECEIPTS/$TAG.txt"

# Every URL worth preserving for this release: the rendered page, the raw
# file, HASHES.txt and index.json, plus the site root.
mapfile -t URLS < <(
  {
    echo "$SITE_URL/"
    echo "$SITE_URL/index.json"
    echo "$SITE_URL/HASHES.txt"
    jq -r '.documents[] | "\(.url)", "\(.raw)"' "$INDEX" | sed "s#^/#$SITE_URL/#"
  } | sort -u
)

{
  echo "# Archive receipts for release $TAG"
  echo "# Generated $(date -u +%Y-%m-%dT%H:%M:%SZ) by scripts/archive.sh"
  echo
  echo "## Internet Archive (Wayback Machine)"
  for u in "${URLS[@]}"; do
    # The save endpoint answers with a redirect whose Location (or the
    # Content-Location header) is the archived snapshot URL.
    loc="$(curl -sS -o /dev/null -w '%{redirect_url}' --max-time 120 "https://web.archive.org/save/$u" || echo "FAILED")"
    echo "$u -> ${loc:-FAILED}"
    sleep 5   # be polite; the endpoint is rate-limited
  done
  echo
  echo "## Software Heritage (save code now)"
  # SWH archives the whole git repository, including every tag.
  resp="$(curl -sS -X POST --max-time 120 "https://archive.softwareheritage.org/api/1/origin/save/git/url/$REPO_URL/" || echo '{"error":"FAILED"}')"
  echo "$REPO_URL -> $(echo "$resp" | jq -c '{save_request_status, save_task_status, save_request_date, visit_status}' 2>/dev/null || echo "$resp")"
  echo "browse: https://archive.softwareheritage.org/browse/origin/directory/?origin_url=$REPO_URL"
} | tee "$OUT"

echo
echo "archive.sh: receipts written to $OUT — commit this file."
