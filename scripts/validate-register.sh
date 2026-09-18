#!/usr/bin/env bash
# validate-register.sh — check that register/register.jsonl is append-only
# JSON Lines that conforms to register/schema.json, and that every
# `supersedes` points at an earlier entry. Runs in the build.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT/site"
node scripts/validate-register.mjs "$ROOT/register/register.jsonl" "$ROOT/register/schema.json"
node scripts/validate-register.mjs "$ROOT/register/example-entry.jsonl" "$ROOT/register/schema.json"
