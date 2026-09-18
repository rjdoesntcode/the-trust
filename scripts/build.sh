#!/usr/bin/env bash
# build.sh — the only build entry point. Verifies canonical integrity, then
# builds the static site into site/_site/. Used locally and by CI.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "== 1/4 verify canonical hashes"
"$ROOT/scripts/hash.sh" --check

echo "== 2/4 validate the Register"
"$ROOT/scripts/validate-register.sh"

echo "== 3/4 build site"
cd "$ROOT/site"
rm -rf _site   # never publish stale output
if [ ! -d node_modules ]; then npm ci --no-audit --no-fund; fi
npx @11ty/eleventy

echo "== 4/4 check output"
"$ROOT/scripts/check-output.sh"
echo "build.sh: done — output in site/_site/"
