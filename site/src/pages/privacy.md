---
title: Privacy
permalink: /privacy/
eyebrow: Transparency
description: What this site does and does not collect, who hosts it, and what is public by design.
---
This page says exactly what happens to information when you use this site. It is short because little happens. No law requires this page of a non-commercial personal site; it is here because the site promises transparency.

## What this site collects from visitors

Nothing. The site is static files. It sets no cookies, runs no scripts, embeds nothing from third parties, loads its fonts from itself, and has no accounts, forms, comments or search. There is no analytics and no visitor log kept by the site. You can confirm this: view the page source, or read the [Content-Security-Policy](/HASHES.txt) headers the site sends (`default-src 'none'`), which would block any such resource.

This is not only a design choice. The Constitution's Article III.6 states *"Power is verified; persons are private"* and forbids surveillance of persons; Protocol 11 applies the same rule to any organization that adopts it. The site holds itself to that rule.

## What the hosts see

The site is served by two hosts, each of which handles the network connection and may process your IP address transiently to deliver the page and to defend against abuse. Neither is given anything by this site beyond the request your browser makes.

- **The primary host** serves `trust.forum`. Like any host, it processes standard technical log data, including visitor IP addresses, to deliver the site and defend it, under its own privacy policy. Per-request logging for this site is switched **off** in its deployment configuration, which is public in the repository; only aggregate counts without identifiers are kept.
- **The mirror host** serves the mirror and may collect logs of visitor IP addresses for security and legal compliance, under its own privacy statement.

The publisher does not receive, store or use this data.

## What is public by design

- **The Register.** A party that adopts the Bridge publishes a declaration on the Register (Bridge Article 11). Entries name the adopting party, its verifier, custodians and auditor, and carry a signature. The Register is append-only: nothing on it is deleted; a mistake is corrected by a later entry that links to the one it supersedes (Article 11.2). Submitters should use role addresses (for example `bridge@example.org`), not a named individual's personal address, and the schema says so.
- **The record.** The drafting records and the briefing name the models that took part and quote their statements. They contain no personal data about any individual other than the pseudonymous human collaborator, who is identified only as such.
- **The repository.** Contributions, issues and pull requests on GitHub are public under GitHub's terms.
- **Archives.** On each release every canonical page is submitted to the Internet Archive and the repository to Software Heritage, so the texts remain verifiable if this site disappears. Those archives are run by their own organizations.

## Your rights

Because the site collects nothing about you, there is nothing for the maintainer to access, correct, export or erase. Rights concerning data held by the hosts, by GitHub (for the repository) or by the archives are exercised with those organizations. A Register entry cannot be erased, by design; a submitter may append a correction or a lapse entry.

## Children

The site is a library of texts. It collects nothing from anyone, of any age.

## Changes

Any change to this page is recorded in the [changelog](/changelog/) and in the repository's history, which is public and signed.

## Contact

Open an issue in the [source repository]({{ site.repository }}/issues); it is public, so the answer is public too. A role email address for private questions will be published here once it exists.
