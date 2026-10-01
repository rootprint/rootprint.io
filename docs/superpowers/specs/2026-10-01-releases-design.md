# Releases table and release pages

## Goal

A `/releases/` table of every Rootprint version and a hosted page per release
(`/releases/0.4.4/`), modeled on crystal-lang.org/releases. Each page carries an
AI-written announcement plus that version's changelog, pasted verbatim. Pages
are prerendered; a release appears after the site is rebuilt.

## Authoring workflow

Per release, the maintainer supplies the CHANGELOG section; AI writes
`src/content/releases/<version>.md`; the maintainer reviews and deploys. No
build-time fetching from GitHub.

## Content model

One file per release with internal page, named by version: `src/content/releases/0.4.4.md`.
The filename is the version; it is not repeated in frontmatter.

```md
---
date: "2026-09-22"
title: OpenID Connect SSO
summary: Sign in through any OIDC provider, turn off password sign-in, and fold repeated log lines.
---

Announcement prose: what is new, why it matters, upgrade notes when needed.

## Changelog

### ⚠️ Breaking

...pasted CHANGELOG section, verbatim...
```

- `date` is quoted so YAML keeps it a string (unquoted, it parses to a `Date`).
  Dates come from the CHANGELOG heading, not the GitHub release timestamp.
- `title` is a short headline (used in table and page `<h1>`).
- `summary` is one sentence (page lede and meta description).

Backfill: one file each for 0.2.0 through 0.4.4 (15 files), written from the
existing CHANGELOG.

A file with a missing `title` or `summary`, an unquoted or malformed `date`, or a
filename that is not `X.Y.Z.md` fails the build with a message naming the file.

Versions 0.1.0 through 0.1.11 have no usable notes. They are table rows only,
from a hard-coded list in `$lib/releases.ts`, linking to their GitHub tags:

| Version | Date       |
| ------- | ---------- |
| 0.1.11  | 2026-04-13 |
| 0.1.10  | 2026-04-07 |
| 0.1.9   | 2026-04-07 |
| 0.1.8   | 2026-03-28 |
| 0.1.7   | 2026-03-26 |
| 0.1.6   | 2026-03-26 |
| 0.1.5   | 2026-03-26 |
| 0.1.4   | 2026-03-25 |
| 0.1.3   | 2026-03-25 |
| 0.1.2   | 2026-03-24 |
| 0.1.1   | 2026-03-24 |
| 0.1.0   | 2026-03-24 |

## Setup

- Add `mdsvex` as a dev dependency.
- In `svelte.config.js`: `extensions: [".svelte", ".md"]` and
  `preprocess: [mdsvex({ extensions: [".md"] }), vitePreprocess()]` (mdsvex
  must run first). No separate `mdsvex.config.js` and no mdsvex layout; the
  release route wraps the rendered body.

## Code

`src/lib/releases.ts`

- `import.meta.glob("/src/content/releases/*.md", { eager: true })` gives each
  module's `metadata` and `default` component. Version is the filename stem.
- Exports `releases`: page releases plus legacy rows, sorted newest first with
  `b.version.localeCompare(a.version, undefined, { numeric: true })` (dates
  collide, e.g. 0.3.1 and 0.3.2; numeric compare puts 0.1.10 above 0.1.9).
- Each entry: `{ version, date, title?, summary?, component? }`. Entries without
  `component` are legacy and link to `${githubUrl}/releases/tag/v<version>`.
- The first entry is the latest.

`src/routes/(marketing)/releases/+page.svelte`

- Intro (heading + one-line description) in the compare-index style.
- A hairline-boxed list with a Version | Date | Release header row. Each row is
  one link, so the whole row is clickable in every browser (a stretched link
  over a `<tr>` breaks in Safari). Rows with a page open `/releases/<version>/`;
  legacy rows open their GitHub tag in a new tab and show `version ↗` and `—`.
- The newest row has a green border and a green version; there is no badge
  (screen readers get "(latest)").
- 10 rows per page with `← Newer`, page numbers, and `Older →` buttons.
  Client-side only; a SvelteKit snapshot restores the page on browser back.
- Under 640px each row stacks: version and date on one line, title below
  (hidden for legacy rows).

`src/routes/(marketing)/releases/[version]/+page.ts`

- `prerender = true`; `entries()` from page releases only.
- Universal load (not `+page.server.ts`): it returns the mdsvex component,
  which a server load cannot serialize.
- Unknown version → `error(404, "Release not found")`.
- Returns the release, its previous/next page releases, and the version
  immediately older in the full list (for the diff link).

`src/routes/(marketing)/releases/[version]/+page.svelte`

```
← All releases
┌──────────────────────────────────────────────────────────┐  green border when latest
│ OpenID Connect SSO                              (h1)     │
│ <summary, muted>                                         │
├─────────────┬─────────────┬──────────────────┬───────────┤
│ VERSION     │ RELEASED    │ SOURCE           │ CHANGES   │
│ 0.4.4 latest│ 2026-09-22  │ GitHub release ↗ │ 0.4.3…0.4.4 ↗
└─────────────┴─────────────┴──────────────────┴───────────┘

<rendered markdown, full content width: announcement, then ## Changelog>

┌─────────────────────────┐ ┌─────────────────────────┐
│ ← PREVIOUS              │ │                  NEXT → │
│ 0.4.3 · <title>         │ │         <title> · 0.4.5 │
└─────────────────────────┘ └─────────────────────────┘
```

- No free-standing divider lines; every line belongs to a closed box.
- Prev/next walk page releases only (0.2.0 has no previous card).
- Source: `${githubUrl}/releases/tag/v<version>`.
- Changes: `${githubUrl}/compare/v<older>...v<version>`, where `<older>` is the
  next-older entry in the full list (0.2.0 diffs against 0.1.11).
- Scoped prose styles for the markdown body: `h2`, `h3`, paragraphs, lists,
  inline `code`, `pre`, links, `strong`. Terminal-mono tokens only.
- `<svelte:head>` matches the compare pages: title
  `Rootprint <version>: <title>`, description = `summary`, canonical,
  OG/Twitter tags, shared social image.

Dates render as ISO `2026-09-22`, as stored. `Intl` with `en-GB` prints
"Sept", and locale output can differ between the build and the browser.

## Wiring

- Sitemap: add `/releases/` and `/releases/<version>/` for each page release.
- Header nav: add "Releases" → `/releases/`.
- Footer: "Changelog" → `/releases/` (was the GitHub CHANGELOG).
- Home FAQ "Is it production-ready?": its changelog link → `/releases/`.
- `AGENTS.md`: a "Releases" section stating the file naming, the three
  frontmatter fields (quoted date), announcement tone and length, and that the
  changelog is pasted verbatim under `## Changelog`.

## Out of scope

Grouping by minor version, RSS, versioned docs links, breaking-change badges,
a fixed upgrade-command box, build-time fetching from GitHub, automatic
rebuild on product release.

## Verification

- `bun run check` and `bun run build` pass.
- Build output has `releases/index.html` and 15 `releases/<version>/index.html`.
- Sitemap lists those 16 URLs.
- `/releases/9.9.9/` is not generated; visiting it in preview shows the 404 page.
- Screenshots of the table and one release page at 1280px and 390px: no
  horizontal overflow, table stacks on mobile.
