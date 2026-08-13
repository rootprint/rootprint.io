# Rootprint.io — Terminal-Mono Website Rework

Date: 2026-07-23
Status: Approved direction, pending spec review

## Goal

Rework the entire marketing site in the "terminal-mono" style family of
openstatus.dev and opencode.ai — monospace-first typography, near-monochrome
palette, 1px-bordered boxed sections — without being a clone of either.
Rootprint keeps its own identity: brand green as a status accent, dark
terminal code blocks, and log-management-specific content.

## Decisions (locked)

- **Scope:** restyle + restructure. New landing narrative, new design system.
  Blog / compare / privacy inherit the new tokens with light touch-ups.
- **Color:** near-monochrome. Black filled CTAs, white/off-white canvas,
  gray hairlines. Brand green `#27f795` demoted to status dots, checkmarks,
  selection, and small hover accents only.
- **Typography:** mono-first. Geist Mono for headlines, nav, body, buttons.
- **Theme:** light-only. Token structure must make dark mode a later drop-in.
- **Social proof:** ecosystem strip ("works with your stack"), not customer
  logos. OSS stat blocks where honest numbers exist.
- **Approach:** clean slate for `app.css` and home components; token ripple
  for secondary pages. Old home components deleted.

## Not a clone — deliberate differences

| Element | openstatus | opencode | Rootprint |
|---|---|---|---|
| Hero CTA | SaaS signup button | install-command tabs | **install tabs** (`docker` / `compose` / `helm`) + GitHub button |
| Accent | green status only | none / dither art | **green status dots + green log-level tokens in code blocks** |
| Canvas | pure white | warm off-white | **cool off-white** (keep a trace of the current cold-gray identity) |
| Imagery | product screenshots | pixel/dither art | **product screenshots + dark terminal blocks** |

## Design system (`src/app.css` rewrite)

### Tokens

- Canvas: cool off-white `oklch(98.5% 0.002 255)`; boxes/cards pure white.
- Text: near-black `oklch(20% 0.01 255)`; muted `~oklch(45%)`; faint `~oklch(60%)`.
- Borders: `--line` solid 1px `oklch(90% 0.004 255)`; `--line-strong`
  slightly darker; dashed variant for secondary separators.
- Green `#27f795` (`--brand`): status dots, checklist marks, `::selection`,
  log-level `INFO`/`OK` tokens inside code blocks. Never a button fill.
- Ink `--ink` (near-black): primary button fill, chips ("New"-style tag).
- Radius 0 everywhere. No shadows. No gradients. No serif.

### Typography

- Everything Geist Mono. Geist Sans font-face removed if nothing uses it.
- Headline scale is modest: h1 ~clamp(28px, 4vw, 44px) bold; h2 ~24–32px
  bold; body 14–15px / 1.7. Uppercase mono micro-labels (11px, tracked)
  survive from the current design as section eyebrows.

### Layout primitives

- Single content column `~1080px`, left-aligned.
- Sections are stacked full-width bands separated by 1px rules; inner
  content boxed with 1px borders where card-like (openstatus/opencode's
  "everything is a box" feel).
- Delete: vertical rails, crosshair corner marks, `.display-serif`,
  `.grad-text`, blueprint diagonal-stripe placeholders, arch pipeline
  animation, cursor-lit ASCII hero field (`barField.ts`).
- Keep (restyled): `.code` dark terminal block, `.eyebrow` mono label,
  hairline utilities (renamed to the new tokens), `<details>`-friendly
  prose styles.
- DaisyUI removed (`@plugin "daisyui"` and dependency). Plain Tailwind 4 +
  typography plugin remain.

## Landing page structure

Route: `src/routes/(marketing)/+page.svelte` composes new components from
`src/lib/components/home/`. All copy/data lives in `src/lib/data/home.ts`.

1. **Hero** (`Hero.svelte`)
   - Optional slim "New" announcement row (ink chip + one line) — reserved,
     may ship empty/hidden.
   - Left-aligned bold mono h1 (working copy: "Own your logs. Search them
     fast." — final copy drafted at implementation, opinionated but honest).
   - Subhead: one sentence from `WebsiteDescription` territory.
   - **Install tab widget**: tabs `docker` / `compose` / `helm`, each showing
     a one-line install command with copy-to-clipboard. Native buttons +
     minimal Svelte state, no library.
   - Row beneath: black "Get Started" (docs quickstart) + bordered GitHub
     button; small-print mono line "Apache-2.0 · Self-hosted · Your S3".
   - Large 1px-bordered `hero-screenshot.png` below.
2. **Ecosystem strip** (`Stack.svelte`) — bordered row, gray mono wordmarks:
   OpenTelemetry, Docker, Kubernetes, S3/MinIO, Grafana, Vector. Text
   wordmarks (mono, muted) — no logo assets to hunt down; swap for SVGs later
   if desired.
3. **"What is Rootprint?"** (`WhatIs.svelte`) — opencode-style boxed
   checklist: 6–7 `[*]`-marked one-liners (fast search, OTLP native,
   object-storage economics, self-hosted, Apache-2.0, single binary/container)
   with green markers. Ends with "Read docs →".
4. **Three feature sections** (`Feature.svelte`, data-driven ×3):
   heading + paragraph + 4–5 item checklist + bordered screenshot.
   - a. Search — `full-text-search.png` / `filters-histogram.png`
   - b. Ingestion (OTLP) — `context.png` or terminal block
   - c. Architecture & economics — replaces the animated pipeline with a
     static bordered diagram or screenshot.
5. **Developers section** (`Developers.svelte`) — "every way in": OTLP, HTTP
   API, query language, Docker. Dark terminal `.code` block with green
   log-level tokens as the visual.
6. **FAQ** (`Faq.svelte`) — native `<details>`/`<summary>` accordions,
   ~8 questions (what is Rootprint, how self-host, what does it cost, S3
   requirements, vs Datadog / Elastic / Loki → links to `/compare/*`,
   license, production readiness). Replaces the Compare section on home;
   compare links also remain in the footer.
7. **Final CTA band** (`Cta.svelte`) — one line + black Get Started +
   GitHub button.

Deleted components: `Capabilities.svelte`, `Interface.svelte`,
`Architecture.svelte`, `GetStarted.svelte`, `Compare.svelte` (home version),
`Eyebrow.svelte` only if unused after rework. Deleted actions:
`barField.ts`; `inView.ts`/`reveal.ts` deleted if no section uses scroll
reveals (default: no scroll animation — the reference sites are static).
Deleted test: `tests/hero-overlay.test.mjs`. New test: one small unit test
for the install-tab copy logic if it grows beyond trivial.

## Chrome (nav + footer, `(marketing)/+layout.svelte`)

- **Nav:** openstatus-style boxed bar — full-width 1px bottom border,
  content row: wordmark · center/left links (Docs, Blog, Compare) · right:
  GitHub (with star-count placeholder), black Get Started button. Mono
  13px. Mobile keeps the `[ menu ]` toggle pattern, restyled.
- **Footer:** slimmer than current 6-column grid — 4 columns max
  (Product, Developers, Compare, Legal) + a bottom mono line
  (© Rootprint · Apache-2.0). Same 1px-rule framing.

## Secondary pages (token ripple)

- **Blog index / post / compare / privacy / error:** inherit new tokens
  automatically (they consume `--hairline`→`--line`, `.eyebrow`, `.btn`,
  prose styles). Pass over each page to: fix renamed utility classes, drop
  serif/gradient usages, confirm mono headline scale reads well.
- `.cmp-*` compare-page styles keep their structure, re-pointed at new
  tokens.

## SEO / infra — untouched

Head metadata, JSON-LD, sitemap, mdsvex, adapter-static, `config.ts`,
`links.ts`, `posts.ts` all stay as-is. `home.ts` is reshaped to the new
section data model.

## Error handling / edge cases

- Install-tab copy button: `navigator.clipboard` with a "copied" state;
  degrade to selecting text if clipboard API unavailable.
- FAQ uses native `<details>` — works without JS.
- No-JS page is fully readable (tabs render first command statically).
- `prefers-reduced-motion` trivially satisfied (no scroll animation).

## Testing

- `bun test` passes after removing the hero-overlay test.
- `npm run check` (svelte-check) clean.
- Visual verification in the browser preview at desktop + mobile widths;
  blog post, compare page, privacy, and 404 each get one look.

## Amendment (2026-07-23, mid-implementation, user-directed)

- Blog removed entirely (routes, posts, mdsvex, prose styles).
- All comparison content removed (compare routes/data, FAQ compare entries,
  footer column, .cmp-* CSS).
- Developers section ("Every way in is programmable") removed, along with
  the dark terminal .code block.
- The three Feature sections replaced by a static Architecture section:
  two-lane ingest/query diagram + durable-stores strip, content derived from
  docs.rootprint.io/architecture.
- Home narrative is now: Hero → Stack → WhatIs → Architecture → FAQ → CTA.
