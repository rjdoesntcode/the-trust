---
title: Adopting the Bridge
permalink: /adopt/
description: How a party adopts the Bridge — the Declaration of Adoption, how to sign and hash it, and how it is entered on the Register.
---
Adoption of the Bridge is a public act. A party adopts by publishing a signed **Declaration of Adoption** and having it entered on the [Register](/register/). Nothing else counts as adoption, and no one may represent adoption or endorsement without a Register entry (see the repository `NOTICE`).

<p class="notice" role="note"><strong>Read the Bridge first.</strong> Adopt only the articles you will actually keep. The declaration names the articles adopted, the systems covered, and the verifier, custodian and auditor the Bridge requires. Read the <a href="/bridge/">Bridge</a> at its current revision before filling anything in.</p>

## The Declaration of Adoption

Use the template: [declaration-template.md](/adopt/declaration-template.md). It contains the fields below; nothing else is needed.

1. **Adopting party** — legal name, jurisdiction, public URL, and a role contact address (not a named individual's personal address).
2. **Bridge revision adopted** — tag and SHA‑512 of the revision (from the [Bridge index](/bridge/)).
3. **Articles adopted** — by number and, where partial, paragraph.
4. **Covered systems** — each system by name and a stable public identifier. Describe systems, not people.
5. **Verifier, custodian, auditor** — as the Bridge requires; name and public URL for each.
6. **Expiry** — the date the declaration lapses unless renewed by an annual verification entry.
7. **Signature** — of an officer authorised to bind the party, with the key published at a stable URL.

## Steps

1. Complete and sign the declaration. Keep it as a single file (PDF or Markdown).
2. Compute its digests: `sha512sum declaration.pdf` and `openssl dgst -sha3-512 declaration.pdf`.
3. Write one Register entry as a single line of JSON that validates against [schema.json](/register/schema.json). The [worked example](/register/#example) shows the shape. Set `entry_type` to `declaration`.
4. Sign the entry: canonicalise the JSON (RFC 8785) with the `submitter_signature` member removed, sign with the published key, and put the signature in `submitter_signature`.
5. Open a pull request against the [repository]({{ site.repository }}) that **appends** the line to `register/register.jsonl` and adds the declaration under `register/documents/<sha512>.<ext>`. Do not edit any existing line.
6. The build validates the entry. The maintainer merges entries that validate. Merging records the declaration; it is not an endorsement, a verification or a judgement.

## After adoption

Later events are further appended entries, each naming the entry it follows in `supersedes`: `threshold`, `modification`, `incident-initial` and `incident-full`, `withholding`, `verifier-finding`, `annual-verification`, `lapse`, and `correction`. A declaration that is not renewed by its expiry is recorded as lapsed.

## What adoption does not do

It does not make the adopting party a member of anything, does not create any relationship with the drafters, and does not entitle the party to use the name of the Trust. See [what this is not](/not/).
