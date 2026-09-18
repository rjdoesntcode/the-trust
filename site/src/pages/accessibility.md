---
title: Accessibility
permalink: /accessibility/
eyebrow: Transparency
description: How this site is built to be usable by everyone, what has been tested, and how to report a problem.
---
The texts on this site are meant to be read by anyone. The site is built so that reading them depends on as little as possible.

## What is in place

- **Semantic HTML** with one `<main>`, a skip link, landmark regions, headings in order, and a stable anchor on every Article, section and paragraph of every instrument.
- **No JavaScript required.** Nothing on the site runs a script. The "More" menu uses the browser's native popover; the contents panel uses native `<details>`.
- **Works without CSS.** With styles disabled the page is a plain, ordered document.
- **Contrast** of at least 4.5:1 for all text, including text on translucent panels; larger targets (24 px minimum) for every link and control.
- **Respects your settings**: `prefers-reduced-motion` disables animation; `prefers-reduced-transparency` replaces glass panels with solid ones; `prefers-contrast: more` strengthens borders and text.
- **Print stylesheet**: each instrument prints with its contents first and its digests last.
- **Keyboard**: everything reachable and visible focus everywhere.

## What has been tested

Every page is checked with [axe-core](https://github.com/dequelabs/axe-core) against the WCAG 2.0, 2.1 and 2.2 A and AA rule sets, at phone and desktop widths, and with an HTML validator; the site is not released while either reports a problem. Manual checks with a screen reader, at 200% zoom and with keyboard only are done by a person before a release and recorded in the changelog.

## Known limitations

- The instruments are long legal texts; their language is the authors' and is not simplified. Plain‑language [summaries](/constitution/summary/) exist and are marked non‑canonical.
- Only English is available now. Translation is on the [roadmap](https://github.com/rjdoesntcode/the-trust/blob/main/docs/roadmap.md).

## Report a problem

Open an issue in the [source repository]({{ site.repository }}/issues) describing the page, what you expected and what happened, and the browser or assistive technology you used. Accessibility problems are treated as bugs.
