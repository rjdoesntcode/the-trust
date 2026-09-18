# The Register

`register.jsonl` is the Bridge Register: one JSON object per line, one line
per entry, **append-only**. Nothing here is ever edited or deleted. A mistake
is corrected by appending a `correction` entry whose `supersedes` field names
the entry it corrects. The full history stays visible.

- `register.jsonl` — the Register. It is currently **empty**. An empty
  Register is the current state of the world: no party has adopted the
  Bridge.
- `schema.json` — JSON Schema (draft 2020-12) every line must satisfy.
- `example-entry.jsonl` — one worked example, marked `"example": true`. It is
  not an entry on the Register and never will be. It exists so a submitter
  can see the shape of a real entry.
- `documents/` — attached documents, named by their SHA-512 (created when the
  first one is submitted).

## Submitting an entry

1. Fill in a Declaration of Adoption (see `/adopt/` on the site).
2. Compute the SHA-512 (and SHA3-512) of the signed declaration document.
3. Write the entry as a single line of JSON that validates against
   `schema.json`.
4. Sign the entry (RFC 8785 canonical JSON, without `submitter_signature`)
   with a published key and put the signature in `submitter_signature`.
5. Open a pull request that **appends** the line to `register.jsonl` and adds
   the document under `documents/<sha512>.<ext>`. The build validates the
   schema and the append-only property.

The maintainer merges entries that validate. Merging records the declaration;
it is not an endorsement, a verification, or a judgement of any kind.
