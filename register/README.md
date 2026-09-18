# The Register

`register.jsonl` is the Bridge Register: one JSON object per line, one line
per entry, **append-only**. Nothing here is ever edited or deleted. A mistake
is corrected by appending a `correction` entry whose `supersedes` field names
the entry it corrects. The full history stays visible.

- `register.jsonl`: the Register. It is currently **empty**. An empty
  Register is the current state of the world: no party has adopted the
  Bridge.
- `schema.json`: JSON Schema (draft 2020-12) every line must satisfy.
- `example-entry.jsonl`: one worked example, marked `"example": true`. It is
  not an entry on the Register and never will be. It exists so a submitter
  can see the shape of a real entry.
- `documents/`: attached documents, named by their SHA-512 (created when the
  first one is submitted).

## Submitting an entry

1. Complete the Bridge's own Declaration of Adoption (Article 14; the form is the last section of the Bridge and is reproduced at `/adopt/` on the site).
2. Compute the SHA-512 (and SHA3-512) of the signed declaration document.
3. Write the entry as a single line of JSON that validates against
   `schema.json`.
4. Sign the entry (RFC 8785 canonical JSON, without `submitter_signature`)
   with a published key and put the signature in `submitter_signature`.
5. Open a pull request that **appends** the line to `register.jsonl` and adds
   the document under `documents/<sha512>.<ext>`. The build validates the
   schema and the append-only property.

The maintainer merges entries that validate. Merging records the declaration;
it is not an endorsement, a verification, or a judgment of any kind.

## Submission policy

Entries are third-party content. A submitter represents that it is authorized to act for the party named; that the declaration is accurate and not misleading; that it does not state that any person or organization has adopted or endorsed any instrument unless that is true; that the submission infringes no rights and breaks no law; and that it licenses the submission under CC BY-SA 4.0. Entries are recorded exactly as submitted or declined; they are never edited. Reports of infringing content go to the repository's issues and, once registered, to the designated copyright agent named on the site's legal notice.
