#!/usr/bin/env bash
# check-output.sh — fail if the built site violates its own rules:
# no client-side JavaScript, no external resources, no cookies, headers present.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/site/_site"
[ -d "$OUT" ] || { echo "check-output.sh: $OUT missing; build first" >&2; exit 1; }
fail=0
if grep -rIl --include='*.html' -E '<script|javascript:|on(load|click|error)=' "$OUT" >/dev/null; then
  echo "check-output.sh: client-side JavaScript found:"; grep -rIl --include='*.html' -E '<script|javascript:|on(load|click|error)=' "$OUT"; fail=1
fi
if grep -rIl --include='*.html' -E '(src|href)="(https?:)?//[^"]*\.(css|js|woff2?|png|jpg|svg|gif)' "$OUT" >/dev/null; then
  echo "check-output.sh: external resource references found:"; grep -rIn --include='*.html' -E '(src|href)="(https?:)?//[^"]*\.(css|js|woff2?|png|jpg|svg|gif)' "$OUT"; fail=1
fi
if grep -rIl --include='*.html' -iE '<(iframe|embed|object)' "$OUT" >/dev/null; then echo "check-output.sh: embeds found"; fail=1; fi
if grep -rIl --include='*.css' -E '@import|url\((https?:)?//' "$OUT" >/dev/null; then echo "check-output.sh: external CSS resources found"; fail=1; fi
for f in _headers .nojekyll index.json robots.txt HASHES.txt HASHES.sha3-512.txt; do [ -e "$OUT/$f" ] || { echo "check-output.sh: missing $OUT/$f"; fail=1; }; done
if ! grep -q "Content-Security-Policy" "$OUT/index.html"; then echo "check-output.sh: meta CSP missing"; fail=1; fi
python3 - "$OUT/index.json" <<'PY' || fail=1
import json,sys; json.load(open(sys.argv[1])); print("check-output.sh: index.json is valid JSON")
PY
[ "$fail" -eq 0 ] && echo "check-output.sh: OK — no scripts, no external resources, no embeds" || exit 1
