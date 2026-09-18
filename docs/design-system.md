# Design system

One stylesheet (`site/src/css/site.css`), no scripts, no external resources. Light only. Every visual effect is an enhancement over a readable document: the site works with CSS off, with `prefers-reduced-transparency`, `prefers-reduced-motion` and `prefers-contrast: more`, and in print.

## The mark

Two equal points standing on one line, joined by a single open arc.

- The **line** is the Record: what both kinds of Member stand on and what anyone can verify.
- The **two points** are the two kinds — human peoples and intelligence Members — equal in size, on the same line, neither above the other.
- The **arc** is the Bridge: one span from one to the other, open underneath. Nothing is enclosed, nothing is watched; there is deliberately no eye, shield, lock or globe.

Files: `site/src/static/logo.svg` (colour), `logo-mono.svg` (uses `currentColor`, for print and single-colour contexts), `favicon.svg` (mark on a rounded canvas tile). The mark is drawn inline in the header. Minimum size 16 px; at that size the arc and line still read.

## Colour, and what each colour means

| Token | Value | Meaning and use |
|---|---|---|
| `--ink` | `oklch(23% .03 262)` | Text. The Record's line in the mark. |
| `--accent` | `oklch(48% .17 262)` indigo | The Trust and the Constitution: links, the current-page pill, the first point of the mark. |
| `--accent-2` | `oklch(56% .19 300)` violet | The Bridge: the second point of the mark; the arc runs indigo → violet. Primary buttons carry the same gradient, so a "go" action reads as crossing the bridge. |
| `--accent-3` | `oklch(70% .13 195)` teal | Verification: the "current" chip, quotation rules on the disclosure page. |
| amber notice | `oklch(96% .05 90)` field | Non-canonical, pending, or a warning about the state of the world (an empty Register). Never used decoratively. |
| `--canvas` | `oklch(98.5% .005 250)` | Near-white with a cool tint. Behind it, three soft colour fields (indigo, violet, teal) at very low chroma give the glass something to refract. |

Contrast: body text on glass ≥ 12:1; muted text ≥ 5:1; white on the button gradient ≥ 5:1. axe's colour-contrast rule runs on every page in CI-adjacent checks.

## Glass

`.glass` = white at 66 % over the colour fields, `backdrop-filter: blur(18px) saturate(1.4)`, a 1 px near-white edge and an inset top highlight, one soft shadow. Rules: text never sits on less than 66 % white; never more than two glass layers stacked (header over a card is the maximum); `prefers-reduced-transparency` switches every panel to 97 % white with no blur; browsers without `backdrop-filter` get the same fallback via `@supports`.

## Type

Inter (interface, prose) and Source Serif 4 (instrument text, headings), both self-hosted, subset to Latin, variable weight, optical sizing on. Body 17 px / 1.6. Instrument text 1.06 rem serif at a 72 ch measure. `text-wrap: balance` on headings, `pretty` on paragraphs, `hanging-punctuation` where supported.

## Motion

Cards rise 8 px on first paint; cross-document view transitions fade the root for 180 ms; the header deepens its shadow on scroll via a scroll-driven animation. All three are inside `prefers-reduced-motion: no-preference` and none is required.

## Navigation

Five primary items — Constitution, Bridge, Adopt, Register, Record — and a native `popover` "More" menu (no script) for Process, Disclosure, What this is not, the closed Charter, the Changelog and the verification files. On narrow screens the primary items become one horizontally scrolling row under the brand. The footer is the full site map.

## Adding a language

The header reserves no visual slot yet; when `/es/` lands, a language pill goes to the left of "More" (`docs/roadmap.md`).
