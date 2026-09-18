#!/usr/bin/env bash
# verify-mirrors.sh — confirm that every mirror serves byte-identical canonical
# files, by comparing each mirror's raw files against HASHES.txt (SHA-512) and HASHES.sha3-512.txt.
#
#   scripts/verify-mirrors.sh                # mirrors from site/src/_data/site.json
#   scripts/verify-mirrors.sh URL [URL...]   # explicit mirror base URLs
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITEJSON="$ROOT/site/src/_data/site.json"
HASHES="$ROOT/HASHES.txt"; HASHES3="$ROOT/HASHES.sha3-512.txt"

command -v jq >/dev/null || { echo "verify-mirrors.sh: jq is required" >&2; exit 1; }
[ -f "$HASHES" ] || { echo "verify-mirrors.sh: HASHES.txt missing; run scripts/hash.sh --write" >&2; exit 1; }

if [ "$#" -gt 0 ]; then
  MIRRORS=("$@")
else
  mapfile -t MIRRORS < <(jq -r '.mirrors[].url' "$SITEJSON")
fi

fail=0
for m in "${MIRRORS[@]}"; do
  m="${m%/}"
  echo "== $m"
  # 1. The served HASHES.txt must equal the repository's.
  if ! diff -q <(curl -fsS --max-time 60 "$m/HASHES.txt") "$HASHES" >/dev/null 2>&1; then
    echo "   HASHES.txt differs or is unreachable"; fail=1
  fi
  # 2. Each canonical raw file must hash to its recorded value.
  while read -r hash path; do
    [ -z "$hash" ] && continue; case "$hash" in \#*) continue;; esac
    got="$(curl -fsS --max-time 60 "$m/$path" | sha512sum | awk '{print $1}' || echo "unreachable")"
    if [ "$got" = "$hash" ]; then echo "   ok   $path"; else echo "   FAIL $path ($got)"; fail=1; fi
  done < "$HASHES"
  # 3. The SHA3-512 manifest must match too.
  if ! diff -q <(curl -fsS --max-time 60 "$m/HASHES.sha3-512.txt") "$HASHES3" >/dev/null 2>&1; then
    echo "   HASHES.sha3-512.txt differs or is unreachable"; fail=1
  fi
  # 4. index.json must be present and list the same hashes.
  if ! curl -fsS --max-time 60 "$m/index.json" | jq -e '.documents' >/dev/null 2>&1; then
    echo "   index.json missing or invalid"; fail=1
  fi
done

if [ "$fail" -ne 0 ]; then echo "verify-mirrors.sh: FAILED"; exit 1; fi
echo "verify-mirrors.sh: all mirrors serve identical canonical files"
