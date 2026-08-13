# Brand-kit generic banner — design

**Date:** 2026-06-04
**Scope:** A reusable, on-brand "generic banner" — Rootprint logo + tagline on the
blueprint background — rendered to PNG at four social/sharing sizes. First piece
of an eventual wider brand kit (blog covers, feature cards) that are out of scope
for now.

## Goal

Produce four finished PNGs an operator can drop into LinkedIn / Reddit / link
previews as an all-purpose Rootprint promo backdrop. Must read as unmistakably
Rootprint by reusing the website's "engineering blueprint" visual system.

## Deliverables

Four PNGs, all rendered at 2× then delivered at target pixel size:

| File | Target px | Use |
|---|---|---|
| `banner-og.png` | 1200×630 | Open Graph / link preview (LinkedIn, Slack, X, Discord) |
| `banner-square.png` | 1200×1200 | Square feed posts (Reddit, LinkedIn, IG) |
| `banner-landscape.png` | 1600×900 | 16:9 in-feed image / blog hero |
| `banner-linkedin.png` | 1584×396 | LinkedIn personal profile background |

## Visual language (from `src/app.css`)

Exact brand tokens, used verbatim (WebKit honors `oklch()`):

- **Canvas:** `--base-100` `oklch(97.2% 0.004 255)` — cold mineral gray. Zero corner radius.
- **Ink:** `--base-content` `oklch(20% 0.012 255)`.
- **Brand green:** `#27f795` (`--primary`) for the accent dot; deep green
  `--secondary` `oklch(42% 0.12 155.5)` for the mono kicker.
- **Hairline frame:** 1px ink @ 12% opacity, inset from the edges.
- **Crosshair registration marks** at the four frame corners (the `.bp-corners`
  SVG motif).
- **Faint blueprint grid:** 135° repeating hairlines (the `.shot` texture) behind
  content, very low contrast.
- **Type:** Geist Sans (wordmark/tagline) + Geist Mono (kicker/meta), embedded as
  base64 woff2 from `static/fonts/`.
- Green used sparingly, as on the site.

## Composition

Shared elements on every size: blueprint frame + crosshair corners + faint grid;
the angular **R mark** + **"Rootprint"** wordmark lockup; a mono kicker with green
dot; the tagline **"Open-source, self-hosted log management"**; a mono meta footer
**`rootprint.io · Apache-2.0 · self-hosted`**.

Per-ratio layout:

- **OG (1.9:1) & Landscape (16:9):** left-aligned editorial lockup — mark+wordmark
  upper-left, large tagline below, mono meta bottom-left; faint grid fills the field.
- **Square (1:1):** centered lockup — mark above wordmark, kicker above, tagline
  below, meta at the bottom edge.
- **LinkedIn (1584×396, ~4:1):** horizontal lockup. The profile avatar overlaps the
  lower-left on LinkedIn, so the logo+tagline sit center/right and the lower-left
  quadrant is kept clear.

## Rendering pipeline (no installs required)

Confirmed working in a spike (embedded Geist + brand green render correctly):

1. One self-contained HTML template per size, sized to a **square** of the largest
   dimension with the banner artwork vertically centered, brand colors as `oklch()`,
   fonts embedded as base64.
2. `qlmanage -t -s <2× largest side> -o out template.html` → WebKit renders a square
   PNG with the artwork centered.
3. `sips -c <2×H> <2×W>` center-crops to the exact 2× aspect ratio.
4. `sips -z <H> <W>` (or deliver at 2×) for the final target pixel size.

A `render.sh` drives all four. Logo: embed `static/logo.png` (R mark) — verify it
has a transparent background; if opaque, recreate the mark as inline SVG.

## Output location

New `brand-kit/` at repo root, **not** under `static/` (so the assets are not
published on the live site):

```
brand-kit/
  templates/   # the four HTML templates
  render.sh    # qlmanage + sips pipeline
  out/         # the four rendered PNGs (the deliverable)
```

## Out of scope

Blog-post covers, feature/announcement cards, dark "terminal" treatment, and a
text-parameterized template system — all deferred.
