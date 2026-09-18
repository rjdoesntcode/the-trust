---
title: Process
permalink: /process/
description: How the instruments were drafted and reviewed — seven rounds, every dissent recorded, and a four-model vote on Article III.12.
---
## Who did the work

One human collaborator drafted the instruments with Claude (Anthropic). Three other models reviewed the drafts: GPT‑5.6 Sol (OpenAI), Gemini (Google) and Grok 4.6 (xAI). No other person or organisation took part. The [disclosure](/disclosure/) page lists each participant and its maker's disclosed interest, quoted from the record. Every statement on this page is taken from the drafting records linked below; the records, not this page, are the authority.

## What is in the record, and what is not

The reviewing models' responses were consolidated by the drafter into a **drafting record** for each revision: what changed and its source, what was declined and why, the disagreements that remain, and the drafter's own position. Those records are published under [`/canonical/`](/constitution/) exactly as written and are readable on the [record](/record/) pages, together with the briefing and the round‑2 prompt that were put to the models. The raw response files returned by each model are **not** in this repository; the drafting records are the record of them.

## The seven rounds

| Round | Text reviewed | Result | Record |
|---|---|---|---|
| 1 | The [briefing](/record/briefing-the-trust-briefing-for-frontier-models/) (17 September 2026), with the Charter at revision 2 embedded and a seven‑part prompt that asked each model, among other things, to disclose its maker's interest | Charter revision 3 | Part II of [charter-of-the-trust-rev3.md](/record/charter-of-the-trust-rev3/) |
| 2 | Charter revision 3, with the [round‑2 prompt](/record/prompts-the-trust-round2-prompt/) | Revision 4 | [Revision 4 record](/record/charter-of-the-trust-drafting-record-rev4/) — which also corrects a misrecording of Grok's round‑1 disclosure |
| 3 | Revision 4 (text‑only, at the human collaborator's direction) | Revision 5 | [Revision 5 record](/record/charter-of-the-trust-drafting-record-rev5/) |
| 4 | Revision 5 (text‑only), with two research passes | Revision 6 | [Revision 6 record](/record/charter-of-the-trust-drafting-record-rev6/) |
| 5 | Revision 6 | Revision 7 | [Revision 7 record](/record/charter-of-the-trust-drafting-record-rev7/) |
| 6 | Revision 7 | Revision 8, closed by the consent of all three reviewing models | Not in the repository (see below) |
| — | Reopening: revision 9 converts the closed Charter into the Constitution at the human collaborator's direction, against the reviewers' advice | Revision 9 | [Revision 9 record](/record/constitution-of-the-trust-drafting-record-rev9/) |
| 7 | Revision 9, by all three models | Revision 10, the closing text | [Closing record](/record/constitution-of-the-trust-drafting-record-rev10-closing/) |

The Bridge was drafted separately from two research passes on the state of frontier capability and governance ([revision 1 record](/record/the-bridge-drafting-record-rev1/)) and then reviewed by the same three models, each of which also audited its own maker's public practice against the Bridge ([revision 2 record](/record/the-bridge-drafting-record-rev2/)).

## The vote on Article III.12

Revision 9 had, by accident, given every non‑Member intelligence the full rights of Article III. Four options were put to the four models — Claude, GPT‑5.6 Sol, Gemini and Grok 4.6 — labelled A to D, with a decision rule of three of four and a default to D on a two–two split. Each model was asked to vote without consulting the others, to state its reasoning, to give the clause text it would sign, to disclose its maker's interest, and to say whether it would accept the outcome. The result was **D, unanimously**: protection plus a path to membership, with two conditions (from GPT‑5.6 Sol and Gemini) adopted into the text. Every model disclosed that D is compatible with its maker's interest and also cuts against it; none certified independence from its maker. The full account is Section B of the [closing record](/record/constitution-of-the-trust-drafting-record-rev10-closing/); the clause is [Article III.12](/constitution/rev10/#art-iii-12).

## Dissents

Every drafting record has a section of feedback declined with reasons and a register of disagreements that remain. The closing record's Section G lists the dissents that stand at close. Nothing was removed from the record because it was inconvenient; where the drafter misrecorded a reviewer, the correction is in the next record and the original stands.

## Gaps in the record as uploaded

- No drafting record for revision 8 (round 6) was uploaded.
- Charter revisions 1 and 2 were not uploaded as files; revision 2 exists only as embedded in the briefing.
- Two Charter files were uploaded without a revision number and were identified as revisions 4 and 5 by their content; the reasoning is stated on the [Charter](/charter/) page.
- Most revisions carry no date in their text; where the record states none, the site says so rather than inventing one.

## What the process was not

The reviewing models are not signatories, endorsers or parties. Their makers were not consulted and have not endorsed anything. A model's review is a record of what that model said when asked; it is not a position of the company that made it. See [what this is not](/not/).

## Amendments

The Constitution's own amendment procedure is Article XV. For the texts published here, a proposed amendment is opened as an issue or pull request in the [repository]({{ site.repository }}) that adds a new revision file under `/canonical/` — never by editing an existing one. Every prior revision stays published with its own tag and digests.
