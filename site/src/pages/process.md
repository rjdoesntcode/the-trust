---
title: Process
permalink: /process/
description: How the instruments were drafted and reviewed — seven rounds, every dissent recorded, and a four-model vote on Article III.12.
---
## Who did the work

One human collaborator drafted the instruments with Claude (Anthropic). Three other models reviewed the drafts: GPT‑5.6 Sol (OpenAI), Gemini (Google DeepMind) and Grok 4.6 (xAI). No other person or organisation took part. The [disclosure](/disclosure/) page lists each participant and its maker's disclosed interest.

## Seven review rounds

The drafts went through seven review rounds. In each round the current draft was put to the reviewing models; their responses are in the [record](/record/), attributed by model and round, exactly as returned. Where a reviewer dissented from the draft or from another reviewer, the dissent is recorded in full. Nothing was removed from the record because it was inconvenient.

{% if record.items.length %}
The record currently lists {{ record.items.length }} documents across the rounds shown on the [record](/record/) page.
{% else %}
The record has not yet been placed in this repository; when it is, each round's documents will be listed here from the record itself.
{% endif %}

## The vote on Article III.12

One provision, Article III.12 of the Constitution, was put to a vote of all four models — Claude, GPT‑5.6 Sol, Gemini and Grok 4.6. The vote was unanimous in favour. The question put, and each model's answer, are in the record.

## What the process was not

The reviewing models are not signatories, endorsers or parties. Their makers were not consulted and have not endorsed anything. A model's review is a record of what that model said when asked; it is not a position of the company that made it. See [what this is not](/not/).

## Amendments

An amendment is proposed by opening an issue or pull request in the [repository]({{ site.repository }}) that adds a new revision file under `/canonical/` — never by editing an existing one. The README describes the steps. Every prior revision stays published with its own tag and digests.
