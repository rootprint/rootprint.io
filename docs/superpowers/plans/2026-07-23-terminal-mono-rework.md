# Terminal-Mono Website Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework rootprint.io into the terminal-mono style family of openstatus.dev / opencode.ai — mono-first typography, near-monochrome palette with green accents, boxed 1px-bordered sections — with a restructured landing narrative.

**Architecture:** Rewrite `src/app.css` as the new design system while keeping the CSS variable and utility class *names* that secondary pages already consume (`--base-content`, `--hairline`, `.eyebrow`, `.btn`, `.cmp-*`), so blog/compare/privacy restyle via token ripple. Rebuild the home page as seven new data-driven components; delete the six blueprint-era ones plus their actions and test.

**Tech Stack:** SvelteKit 2 (Svelte 5 runes), Tailwind CSS 4 (+ typography plugin), adapter-static, bun. DaisyUI is removed.

**Spec:** `docs/superpowers/specs/2026-07-23-terminal-mono-rework-design.md`

## Global Constraints

- **NO git commands of any kind** (user's global rule). No commit steps in this plan — the user commits manually. Task boundaries end at verification instead.
- Geist Mono for everything: headlines, nav, body, buttons. No serif, no Geist Sans.
- Green `#27f795` = `oklch(86% 0.204 155.5)` is never a button/background fill — only status dots, `[*]` checklist markers, `::selection`, log-level tokens.
- Primary CTAs are black (ink) filled buttons. Radius 0 everywhere. No box-shadows, no gradients.
- Content column: 1080px (`.wrap`).
- Keep these CSS var names (used by untouched pages): `--base-content`, `--base-content-muted`, `--base-content-faint`, `--hairline`, `--hairline-strong`, `--primary`, `--primary-strong`, `--primary-content`, `--font-mono`, `--radius-field`, `--radius-box`, `--neutral`, `--neutral-content`, `--error`, `--warning`, `--accent`.
- Keep these class names (used by untouched pages): `.wrap`, `.mono`, `.muted`, `.faint`, `.tabular`, `.eyebrow` (+ `.bracket`, `.dot`), `.hairline`/`.hairline-t/b/l/r`/`.hairline-strong`, `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-sm`, `.btn-lift`, `.code` (+ token classes `.ln .k .v .c .e .w .b .ok`), `.section-divider`, `.skip-to-content`, `.anchor`, `.cmp-*` block, prose overrides.
- Run commands with bun: `bun run check`, `bun run build`, `bun test`.
- Home page is transiently broken between Task 1 and Task 7 (old components reference deleted classes). Verify Task 1 on `/privacy/` and `/blog/`, not `/`.
- External links: `docsUrl` / `githubUrl` from `src/lib/links.ts`.

---

### Task 1: Design system — rewrite `app.css`, drop DaisyUI

**Files:**
- Modify: `src/app.css` (full rewrite)
- Modify: `src/app.html` (remove Geist Sans preload, update theme-color)
- Modify: `package.json` (remove daisyui via bun)
- Delete: `static/fonts/geist-sans-variable.woff2`

**Interfaces:**
- Produces: every token/class in Global Constraints, plus new primitives used by later tasks: `.box`, `.check-list`, `.install`, `.install-tabs`, `.install-cmd`, `.copy-btn`, `.frame`, `.faq`, `.feature`, `.stack-strip`, `.section`, `.footer-grid`, `.footer-cell`, `.footer-h`, `.footer-link`, `.footer-meta`, `.site-nav`, `.site-nav-links`, `.site-nav-actions`.

- [ ] **Step 1: Remove DaisyUI**

Run: `bun remove daisyui`
Expected: `package.json` devDependencies no longer contain `daisyui`.

- [ ] **Step 2: Replace `src/app.css` entirely with:**

```css
@import "tailwindcss";

@plugin "@tailwindcss/typography";

/* ───────────────────────────────────────────────────────────────────────
   Rootprint — terminal-mono theme.
   Family: openstatus.dev / opencode.ai. Mono-first type, near-monochrome,
   1px boxed sections, zero radius, zero shadows. Brand green survives only
   as status accents. Legacy var/class names are kept where secondary pages
   (blog, compare, privacy) consume them.
   ─────────────────────────────────────────────────────────────────────── */

/* Tailwind color utilities used by secondary pages (text-base-content,
   text-neutral, decoration-neutral/40 …) — previously supplied by DaisyUI. */
@theme {
  --color-base-100: oklch(98.5% 0.002 255);
  --color-base-200: oklch(100% 0 0);
  --color-base-300: oklch(94.5% 0.004 255);
  --color-base-content: oklch(20% 0.01 255);
  --color-neutral: oklch(45% 0.01 255); /* muted text (daisy-era name) */
  --color-primary: oklch(86% 0.204 155.5);
  --font-mono:
    "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --font-sans:
    "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
}

/* Geist Mono — variable weight */
@font-face {
  font-family: "Geist Mono";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/geist-mono-variable.woff2") format("woff2");
}

/* ── Design tokens ───────────────────────────────────────────────────── */
:root {
  --base-100: oklch(98.5% 0.002 255); /* page canvas — cool off-white */
  --base-200: oklch(100% 0 0); /* boxes / cards — pure white */
  --base-300: oklch(94.5% 0.004 255); /* subtle fills, hovers */
  --base-content: oklch(20% 0.01 255);
  --base-content-muted: oklch(45% 0.01 255);
  --base-content-faint: oklch(58% 0.008 255);

  --hairline: oklch(89% 0.004 255); /* solid gray, no alpha */
  --hairline-strong: oklch(80% 0.006 255);

  --primary: oklch(86% 0.204 155.5); /* brand green #27f795 */
  --primary-strong: oklch(50% 0.14 155.5); /* readable green for text */
  --primary-content: oklch(24% 0.06 155.5);

  --ink: oklch(16% 0.01 255); /* black CTA fill */
  --ink-content: oklch(98% 0 0);

  --neutral: oklch(17% 0.01 255); /* dark terminal surface (.code) */
  --neutral-content: oklch(96% 0.002 255);

  --accent: oklch(54% 0.16 248);
  --error: oklch(58% 0.21 25);
  --warning: oklch(72% 0.15 75);

  --radius-field: 0px;
  --radius-box: 0px;

  --font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --font-sans: var(--font-mono); /* mono-first: sans is an alias */
}

* {
  box-sizing: border-box;
}

@layer base {
  html {
    font-family: var(--font-mono);
    scroll-behavior: smooth;
    background: var(--base-100);
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background: var(--base-100);
    color: var(--base-content);
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    font-family: inherit;
    cursor: pointer;
  }
  ::selection {
    background: var(--primary);
    color: var(--primary-content);
  }

  code,
  pre,
  kbd {
    font-family: var(--font-mono);
  }

  /* Headings — bold mono, modest scale (openstatus-sized, not billboard) */
  h1,
  h2,
  h3,
  h4 {
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
    text-wrap: balance;
    color: var(--base-content);
  }
  h1 {
    font-size: clamp(28px, 4vw, 44px);
  }
  h2 {
    font-size: clamp(22px, 3vw, 30px);
  }
  h3 {
    font-size: 17px;
  }
  h4 {
    font-size: 15px;
  }
  p {
    margin: 0;
    text-wrap: pretty;
  }
}

a {
  @apply cursor-pointer;
}

/* ── Text utilities ──────────────────────────────────────────────────── */
.mono {
  font-family: var(--font-mono);
}
.muted {
  color: var(--base-content-muted);
}
.faint {
  color: var(--base-content-faint);
}
.tabular {
  font-variant-numeric: tabular-nums;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--base-content-muted);
  font-weight: 500;
}
.eyebrow.muted {
  color: var(--base-content-muted);
}
.eyebrow .bracket {
  color: var(--base-content-faint);
}
.eyebrow .dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  vertical-align: middle;
  margin-right: 8px;
}

/* ── Hairlines ───────────────────────────────────────────────────────── */
.hairline {
  border: 1px solid var(--hairline);
}
.hairline-strong {
  border: 1px solid var(--hairline-strong);
}
.hairline-t {
  border-top: 1px solid var(--hairline);
}
.hairline-b {
  border-bottom: 1px solid var(--hairline);
}
.hairline-l {
  border-left: 1px solid var(--hairline);
}
.hairline-r {
  border-right: 1px solid var(--hairline);
}

.section-divider {
  height: 1px;
  width: 100%;
  border: 0;
  background: var(--hairline);
}

/* ── Buttons ─────────────────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 18px;
  border-radius: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  border: 1px solid transparent;
  background: transparent;
  color: var(--base-content);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  white-space: nowrap;
}
.btn:active {
  transform: translateY(0.5px);
}
.btn-primary {
  background: var(--ink);
  color: var(--ink-content);
  border-color: var(--ink);
}
.btn-primary:hover {
  background: oklch(28% 0.01 255);
  border-color: oklch(28% 0.01 255);
}
.btn-ghost {
  border-color: var(--hairline-strong);
  background: var(--base-200);
}
.btn-ghost:hover {
  border-color: var(--base-content);
}
.btn-sm {
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
}
@media (hover: hover) and (pointer: fine) {
  .btn-lift:hover {
    transform: translateY(-1px);
  }
  .btn-lift:active {
    transform: scale(0.97) translateY(0);
  }
}

/* ── Layout ──────────────────────────────────────────────────────────── */
.wrap {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (max-width: 720px) {
  .wrap {
    padding: 0 16px;
  }
}

.section {
  padding: 72px 0;
  border-top: 1px solid var(--hairline);
}
@media (max-width: 720px) {
  .section {
    padding: 48px 0;
  }
}

/* ── Boxes & lists ───────────────────────────────────────────────────── */
.box {
  border: 1px solid var(--hairline);
  background: var(--base-200);
}

/* Checklist with green [*] markers (opencode-style) */
.check-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
}
.check-list li {
  display: flex;
  gap: 10px;
  align-items: baseline;
}
.check-list li::before {
  content: "[*]";
  color: var(--primary-strong);
  font-weight: 700;
  flex-shrink: 0;
}

/* Bordered product screenshot */
.frame {
  border: 1px solid var(--hairline-strong);
  background: var(--base-200);
}
.frame img {
  display: block;
  width: 100%;
  height: auto;
}

/* ── Install command widget (hero) ───────────────────────────────────── */
.install {
  border: 1px solid var(--hairline-strong);
  background: var(--base-200);
  max-width: 640px;
}
.install-tabs {
  display: flex;
  border-bottom: 1px solid var(--hairline);
}
.install-tabs button {
  padding: 10px 16px;
  font-size: 13px;
  color: var(--base-content-faint);
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.install-tabs button[aria-selected="true"] {
  color: var(--base-content);
  border-bottom-color: var(--base-content);
}
.install-cmd {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  font-size: 13px;
}
.install-cmd code {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
}
.install-cmd .prompt {
  color: var(--base-content-faint);
  user-select: none;
}
.copy-btn {
  border: 1px solid var(--hairline-strong);
  background: var(--base-200);
  font-size: 11px;
  padding: 4px 8px;
  color: var(--base-content-muted);
  flex-shrink: 0;
}
.copy-btn:hover {
  border-color: var(--base-content);
  color: var(--base-content);
}

/* ── Ecosystem strip ─────────────────────────────────────────────────── */
.stack-strip {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--hairline);
  background: var(--base-200);
}
.stack-strip > div {
  flex: 1 1 auto;
  padding: 16px 20px;
  text-align: center;
  font-size: 13px;
  color: var(--base-content-faint);
  border-right: 1px solid var(--hairline);
}
.stack-strip > div:last-child {
  border-right: 0;
}
@media (max-width: 720px) {
  .stack-strip > div {
    flex-basis: 50%;
    border-bottom: 1px solid var(--hairline);
  }
}

/* ── Feature split (text | screenshot) ───────────────────────────────── */
.feature {
  display: grid;
  grid-template-columns: 5fr 6fr;
  gap: 48px;
  align-items: center;
}
.feature.flip {
  grid-template-columns: 6fr 5fr;
}
.feature.flip > :first-child {
  order: 2;
}
@media (max-width: 880px) {
  .feature,
  .feature.flip {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .feature.flip > :first-child {
    order: 0;
  }
}

/* ── FAQ (native details) ────────────────────────────────────────────── */
.faq details {
  border: 1px solid var(--hairline);
  border-bottom: 0;
  background: var(--base-200);
}
.faq details:last-child {
  border-bottom: 1px solid var(--hairline);
}
.faq summary {
  cursor: pointer;
  padding: 16px 18px;
  font-weight: 600;
  font-size: 14px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.faq summary::-webkit-details-marker {
  display: none;
}
.faq summary::after {
  content: "+";
  color: var(--base-content-faint);
}
.faq details[open] summary::after {
  content: "−";
}
.faq .answer {
  padding: 0 18px 18px;
  color: var(--base-content-muted);
  font-size: 14px;
  max-width: 70ch;
}
.faq .answer a {
  color: var(--primary-strong);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ── Code block — dark terminal with green log tokens ────────────────── */
.code {
  position: relative;
  background: var(--neutral);
  color: var(--neutral-content);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  padding: 20px 22px;
  border: 1px solid oklch(0% 0 0 / 0.3);
  overflow-x: auto;
}
.code .ln {
  white-space: nowrap;
}
.code .k {
  color: var(--primary);
}
.code .v {
  color: oklch(72% 0.008 95);
}
.code .c {
  color: oklch(55% 0.008 95);
}
.code .e {
  color: var(--error);
}
.code .w {
  color: var(--warning);
}
.code .b {
  color: var(--accent);
}
.code .ok {
  color: var(--primary);
}

/* ── Site nav ────────────────────────────────────────────────────────── */
.site-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 56px;
}
.site-nav .brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.site-nav-links {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  font-size: 13px;
}
.site-nav-links a {
  padding: 8px 12px;
  color: var(--base-content-muted);
  transition: color 0.15s ease;
}
.site-nav-links a:hover {
  color: var(--base-content);
}
.site-nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ── Footer ──────────────────────────────────────────────────────────── */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.footer-cell {
  padding: 28px 24px 36px;
  border-right: 1px solid var(--hairline);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer-cell:last-child {
  border-right: 0;
}
.footer-h {
  font-size: 11px;
  letter-spacing: 0.14em;
  margin-bottom: 8px;
  color: var(--base-content-faint);
}
.footer-link {
  font-size: 13px;
  color: var(--base-content-muted);
  padding: 4px 0;
  transition: color 0.15s ease;
  width: fit-content;
}
.footer-link:hover {
  color: var(--base-content);
}
.footer-link.faint {
  color: var(--base-content-faint);
}
.footer-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 24px;
  border-top: 1px solid var(--hairline);
  font-size: 12px;
  color: var(--base-content-faint);
}
@media (max-width: 720px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-cell:nth-child(2n) {
    border-right: 0;
  }
}

/* ── Misc ────────────────────────────────────────────────────────────── */
.skip-to-content {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--ink);
  color: var(--ink-content);
  font-weight: 600;
  font-size: 0.875rem;
}
.skip-to-content:focus {
  left: 0;
}

.anchor {
  scroll-margin-top: 72px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Append the `.cmp-*` compare-page block**

Copy the entire `/* ── Compare pages ── */` block **verbatim** from the old `app.css` (the section starting at `.cmp-hero` and ending with its `@media (max-width: 720px)` rules, old lines 1065–1253) to the end of the new file, with exactly two edits:
- In `.cmp-hero h1`, change `font-size: clamp(48px, 5vw, 76px);` → `font-size: clamp(28px, 4vw, 44px);`
- In `.cmp-section h2`, change `font-size: 40px;` → `font-size: clamp(22px, 3vw, 30px);`
- In `.cmp-tldr`, delete the line `box-shadow: var(--shadow-card);`

(All its `var(--hairline)` / `var(--primary…)` / `var(--radius-box)` references resolve against the new tokens.)

- [ ] **Step 4: Append the prose block**

Copy the `/* Blog prose */` block verbatim from the old file (old lines 1266–1303, `.prose` rules), changing only `.prose :where(h1, h2, h3, h4) { font-family: var(--font-sans); …` → `font-family: var(--font-mono);`.

- [ ] **Step 5: Update `src/app.html`**

- Delete the whole `<link rel="preload" … geist-sans-variable.woff2 …/>` element (lines 25–31).
- Change `<meta name="theme-color" content="#f7f5ef" />` → `<meta name="theme-color" content="#fafafa" />`.

- [ ] **Step 6: Delete the sans font file**

Run: `rm static/fonts/geist-sans-variable.woff2`

- [ ] **Step 7: Verify**

Run: `bun run check` → expect 0 errors (warnings about unused classes are fine).
Start the dev preview and load `/privacy/`, `/blog/`, and `/compare/datadog/` — all mono type, off-white canvas, black CTA buttons, no server errors. `/` will look broken (old components, deleted classes) — expected until Task 7.

---

### Task 2: Home data model — rewrite `src/lib/data/home.ts`

**Files:**
- Modify: `src/lib/data/home.ts` (full rewrite)

**Interfaces:**
- Produces (imported by Tasks 3–6):
  - `installTabs: { label: string; command: string }[]`
  - `stack: string[]`
  - `whatIs: { title: string; body: string }[]`
  - `features: Feature[]` where `interface Feature { eyebrow: string; title: string; body: string; points: string[]; img: string; alt: string }`
  - `devWays: { name: string; body: string }[]`
  - `terminalLines: { cls: string; text: string }[]`
  - `faq: { q: string; a: string }[]` (`a` is an HTML string — may contain `<a>` links)

- [ ] **Step 1: Replace the file contents with:**

```ts
/** Content for the marketing home page sections. Kept out of the markup so
 *  copy can be edited without touching layout. */

export interface Feature {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  img: string;
  alt: string;
}

/* NOTE: verify these commands against docs.rootprint.io before launch —
   image/chart names are the expected published locations. */
export const installTabs: { label: string; command: string }[] = [
  {
    label: "docker",
    command: "docker run -p 8080:8080 ghcr.io/rootprint/rootprint:latest",
  },
  {
    label: "compose",
    command:
      "curl -fsSL https://rootprint.io/docker-compose.yml -o docker-compose.yml && docker compose up -d",
  },
  {
    label: "helm",
    command: "helm install rootprint oci://ghcr.io/rootprint/charts/rootprint",
  },
];

export const stack: string[] = [
  "OpenTelemetry",
  "Docker",
  "Kubernetes",
  "S3 / MinIO",
  "Grafana",
  "Vector",
];

export const whatIs: { title: string; body: string }[] = [
  {
    title: "Full-text search",
    body: "Query every field of every log line — filters, free text, histograms.",
  },
  {
    title: "OpenTelemetry native",
    body: "OTLP endpoint and HTTP gateway with per-index bearer tokens.",
  },
  {
    title: "Object-storage economics",
    body: "Retention scales with $/GB on your S3, not with cluster node count.",
  },
  {
    title: "Self-hosted",
    body: "Runs inside your network, behind your SSO. Logs never leave your VPC.",
  },
  {
    title: "Stateless search tier",
    body: "Query nodes hold no data — scale up for an incident, back down after.",
  },
  {
    title: "Apache-2.0, end to end",
    body: "The whole path is open — no proprietary formats, no per-seat pricing.",
  },
];

export const features: Feature[] = [
  {
    eyebrow: "SEARCH",
    title: "Find the line, not the needle-shaped bill",
    body: "Full-text and structured field filters over your indexed logs, with a frequency histogram to find the spike fast. Expand any match to see the lines before and after it.",
    points: [
      "Free-text and field queries in one query string",
      "Level and service facets, saved queries",
      "Frequency histogram over any time range",
      "Context view: the log lines around any match",
    ],
    img: "/images/full-text-search.png",
    alt: "Rootprint full-text search: a query filtering by service_name with a frequency histogram and a live result table.",
  },
  {
    eyebrow: "INGEST",
    title: "Point your OpenTelemetry pipeline at it",
    body: "Rootprint speaks OTLP natively. Keep your existing collectors, SDKs, and processors — swap the exporter endpoint and logs start flowing, authenticated per index.",
    points: [
      "OTLP/gRPC and OTLP/HTTP endpoints",
      "HTTP gateway for anything that can POST JSON",
      "Per-index bearer tokens",
      "Works with Vector, Fluentd, and the OTel Collector",
    ],
    img: "/images/context.png",
    alt: "Rootprint context view: a selected payment-service log line surrounded by the events before and after it, with a service_name filter applied.",
  },
  {
    eyebrow: "STORE",
    title: "Your S3 is the database",
    body: "Instead of a stateful Elasticsearch-style cluster, Rootprint pairs Quickwit with object storage. Index splits live on S3; search nodes are stateless and disposable.",
    points: [
      "Retention priced by $/GB of object storage",
      "No shard rebalancing, no hot/warm tiers",
      "Scale the search tier independently of storage",
      "Any S3-compatible store: AWS, GCS, MinIO",
    ],
    img: "/images/filters-histogram.png",
    alt: "Rootprint filters: a level facet (DEBUG, INFO, WARN, ERROR, CRITICAL) and service_name filter beside a frequency histogram of matching logs.",
  },
];

export const devWays: { name: string; body: string }[] = [
  { name: "OTLP", body: "Native gRPC + HTTP log ingestion" },
  { name: "HTTP API", body: "Search and manage indexes programmatically" },
  { name: "Query language", body: "Full-text + field syntax, one line" },
  { name: "Docker", body: "Single container, config by env vars" },
];

export const terminalLines: { cls: string; text: string }[] = [
  { cls: "c", text: "$ curl -s $ROOTPRINT/api/v1/logs/search \\" },
  { cls: "c", text: "    -H \"Authorization: Bearer $TOKEN\" \\" },
  { cls: "c", text: "    -d 'query=level:ERROR AND service_name:payments'" },
  { cls: "ok", text: "200 OK · 3 hits · 41ms" },
  { cls: "e", text: "ERROR payments  charge failed: card_declined" },
  { cls: "e", text: "ERROR payments  retry 1/3 failed: card_declined" },
  { cls: "e", text: "ERROR payments  giving up after 3 retries" },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "What is Rootprint?",
    a: "Open-source, self-hosted log management: OpenTelemetry-native ingestion, full-text search built on Quickwit, and your own object storage as the database.",
  },
  {
    q: "How do I self-host it?",
    a: 'One container next to an S3-compatible bucket. Start with the <a href="https://docs.rootprint.io/quickstart">quickstart</a> — Docker, Compose, and Helm are all supported.',
  },
  {
    q: "What does it cost?",
    a: "The software is free (Apache-2.0). Your running costs are the compute you give it plus $/GB on your object storage — there is no per-host, per-seat, or per-GB-ingested pricing.",
  },
  {
    q: "What storage do I need?",
    a: "Any S3-compatible object store: AWS S3, Google Cloud Storage, MinIO, Ceph. Index splits are written there; search nodes stay stateless.",
  },
  {
    q: "How is it different from Datadog?",
    a: 'Rootprint is self-hosted — logs stay in your VPC and retention is priced by your storage, not a SaaS bill. See the full <a href="/compare/datadog/">comparison</a>.',
  },
  {
    q: "How is it different from Elastic?",
    a: 'No stateful cluster to operate: storage is your S3 and the search tier is stateless. See the full <a href="/compare/elastic/">comparison</a>.',
  },
  {
    q: "How is it different from Grafana Loki?",
    a: 'Full-text search and structured field filters are first-class — no label-cardinality budgeting. See the full <a href="/compare/loki/">comparison</a>.',
  },
  {
    q: "Is it production-ready?",
    a: 'Rootprint builds on Quickwit, which runs petabyte-scale log search in production. Check the <a href="https://github.com/rootprint/rootprint">GitHub repo</a> for current status and roadmap.',
  },
];
```

- [ ] **Step 2: Verify**

Run: `bun run check`
Expected: errors only in the old home components that still import the removed exports (`capabilities`, `pipeline`, `valueCards`, `compareCards`, `screens`) — those files are deleted in Task 7. No errors in `home.ts` itself.

Note: if you prefer zero transient check errors, leave the old exports in place at the bottom of the file and delete them in Task 7 instead. Either way, Task 7's verification must show a clean `bun run check`.

---

### Task 3: Hero with install tabs

**Files:**
- Modify: `src/lib/components/home/Hero.svelte` (full rewrite)
- Delete: `src/lib/actions/barField.ts`
- Delete: `tests/hero-overlay.test.mjs`

**Interfaces:**
- Consumes: `installTabs` from `$lib/data/home`; `docsUrl`, `githubUrl` from `$lib/links`; `.install*`, `.copy-btn`, `.frame`, `.btn*`, `.chip` from Task 1.
- Produces: `<Hero />` (no props).

- [ ] **Step 1: Replace `Hero.svelte` with:**

```svelte
<script lang="ts">
  import { docsUrl, githubUrl } from "$lib/links";
  import GithubIcon from "$lib/components/GithubIcon.svelte";
  import { installTabs } from "$lib/data/home";

  let active = $state(0);
  let copied = $state(false);
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try {
      await navigator.clipboard.writeText(installTabs[active].command);
      copied = true;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copied = false), 1500);
    } catch {
      /* clipboard unavailable — command stays selectable as text */
    }
  }
</script>

<section style="padding: 64px 0 72px;">
  <div class="wrap">
    <h1 style="max-width: 22ch;">Own your logs. Search them fast.</h1>
    <p
      class="muted"
      style="margin-top: 16px; max-width: 62ch; font-size: 15px;"
    >
      Rootprint is open-source, self-hosted log management — OpenTelemetry-native
      ingestion, full-text search, and retention priced by your object storage,
      not per GB ingested.
    </p>

    <div class="install" style="margin-top: 32px;">
      <div class="install-tabs" role="tablist" aria-label="Install method">
        {#each installTabs as tab, i}
          <button
            role="tab"
            aria-selected={active === i}
            onclick={() => (active = i)}
          >
            {tab.label}
          </button>
        {/each}
      </div>
      <div class="install-cmd">
        <span class="prompt" aria-hidden="true">$</span>
        <code>{installTabs[active].command}</code>
        <button class="copy-btn" onclick={copy}>
          {copied ? "copied" : "copy"}
        </button>
      </div>
    </div>

    <div
      style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;"
    >
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
      >
        Get Started
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost"
      >
        <GithubIcon />
        GitHub
      </a>
    </div>
    <p class="faint" style="margin-top: 16px; font-size: 12px;">
      Apache-2.0 · Self-hosted · Your S3
    </p>

    <div class="frame" style="margin-top: 48px;">
      <img
        src="/images/hero-screenshot.png"
        alt="Rootprint interface: full-text log search with field filters and a frequency histogram."
        width="2530"
        height="1269"
        fetchpriority="high"
      />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Delete dead files**

Run: `rm src/lib/actions/barField.ts tests/hero-overlay.test.mjs`

- [ ] **Step 3: Verify**

Run: `bun run check` — no errors in `Hero.svelte`.
Run: `bun test` — passes (no test files is an acceptable result).

---

### Task 4: Stack strip + "What is Rootprint?"

**Files:**
- Create: `src/lib/components/home/Stack.svelte`
- Create: `src/lib/components/home/WhatIs.svelte`

**Interfaces:**
- Consumes: `stack`, `whatIs` from `$lib/data/home`; `docsUrl` from `$lib/links`; `.stack-strip`, `.check-list`, `.box`, `.eyebrow` from Task 1.
- Produces: `<Stack />`, `<WhatIs />` (no props).

- [ ] **Step 1: Create `Stack.svelte`:**

```svelte
<script lang="ts">
  import { stack } from "$lib/data/home";
</script>

<section style="padding: 0 0 64px;">
  <div class="wrap">
    <p class="eyebrow" style="margin-bottom: 14px;">
      <span class="bracket">[</span> works with your stack
      <span class="bracket">]</span>
    </p>
    <div class="stack-strip">
      {#each stack as name}
        <div>{name}</div>
      {/each}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `WhatIs.svelte`:**

```svelte
<script lang="ts">
  import { whatIs } from "$lib/data/home";
  import { docsUrl } from "$lib/links";
</script>

<section class="section" id="capabilities">
  <div class="wrap">
    <h2>What is Rootprint?</h2>
    <p class="muted" style="margin-top: 12px; max-width: 62ch;">
      An open-source log platform that pairs Quickwit's search engine with the
      object storage you already operate.
    </p>
    <ul class="check-list" style="margin-top: 28px; max-width: 72ch;">
      {#each whatIs as item}
        <li>
          <span>
            <strong>{item.title}</strong>
            <span class="muted"> — {item.body}</span>
          </span>
        </li>
      {/each}
    </ul>
    <a
      href={docsUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-ghost"
      style="margin-top: 28px;"
    >
      Read docs →
    </a>
  </div>
</section>
```

- [ ] **Step 3: Verify**

Run: `bun run check` — no errors in the two new files.

---

### Task 5: Feature sections + Developers section

**Files:**
- Create: `src/lib/components/home/Feature.svelte`
- Create: `src/lib/components/home/Developers.svelte`

**Interfaces:**
- Consumes: `Feature` type, `features`, `devWays`, `terminalLines` from `$lib/data/home`; `docsUrl` from `$lib/links`; `.feature`, `.frame`, `.check-list`, `.code` from Task 1.
- Produces: `<Feature feature={f} flip={boolean} />`; `<Developers />` (no props).

- [ ] **Step 1: Create `Feature.svelte`:**

```svelte
<script lang="ts">
  import type { Feature } from "$lib/data/home";

  interface Props {
    feature: Feature;
    flip?: boolean;
  }

  let { feature, flip = false }: Props = $props();
</script>

<section class="section">
  <div class="wrap">
    <div class="feature" class:flip>
      <div>
        <p class="eyebrow">
          <span class="dot"></span>{feature.eyebrow}
        </p>
        <h2 style="margin-top: 14px;">{feature.title}</h2>
        <p class="muted" style="margin-top: 14px; max-width: 55ch;">
          {feature.body}
        </p>
        <ul class="check-list" style="margin-top: 22px;">
          {#each feature.points as point}
            <li>{point}</li>
          {/each}
        </ul>
      </div>
      <div class="frame">
        <img src={feature.img} alt={feature.alt} loading="lazy" />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `Developers.svelte`:**

```svelte
<script lang="ts">
  import { devWays, terminalLines } from "$lib/data/home";
  import { docsUrl } from "$lib/links";
</script>

<section class="section" id="developers">
  <div class="wrap">
    <div class="feature">
      <div>
        <p class="eyebrow">
          <span class="dot"></span>DEVELOPERS
        </p>
        <h2 style="margin-top: 14px;">Every way in is programmable</h2>
        <p class="muted" style="margin-top: 14px; max-width: 55ch;">
          Everything the UI does goes through the same API. Ship logs over
          OTLP, search them over HTTP, script the rest.
        </p>
        <ul class="check-list" style="margin-top: 22px;">
          {#each devWays as way}
            <li>
              <span>
                <strong>{way.name}</strong>
                <span class="muted"> — {way.body}</span>
              </span>
            </li>
          {/each}
        </ul>
        <a
          href="{docsUrl}/api/overview"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-ghost"
          style="margin-top: 28px;"
        >
          API reference →
        </a>
      </div>
      <div class="code" role="img" aria-label="Terminal: searching error logs with the Rootprint HTTP API">
        {#each terminalLines as line}
          <div class="ln {line.cls}">{line.text}</div>
        {/each}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify**

Run: `bun run check` — no errors in the two new files.

---

### Task 6: FAQ + final CTA

**Files:**
- Create: `src/lib/components/home/Faq.svelte`
- Create: `src/lib/components/home/Cta.svelte`

**Interfaces:**
- Consumes: `faq` from `$lib/data/home`; `docsUrl`, `githubUrl` from `$lib/links`; `.faq`, `.btn*` from Task 1.
- Produces: `<Faq />`, `<Cta />` (no props).

- [ ] **Step 1: Create `Faq.svelte`:**

```svelte
<script lang="ts">
  import { faq } from "$lib/data/home";
</script>

<section class="section anchor" id="faq">
  <div class="wrap">
    <h2>Frequently asked questions</h2>
    <div class="faq" style="margin-top: 28px; max-width: 760px;">
      {#each faq as item}
        <details>
          <summary>{item.q}</summary>
          <!-- eslint-disable-next-line svelte/no-at-html-tags — trusted local copy -->
          <p class="answer">{@html item.a}</p>
        </details>
      {/each}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create `Cta.svelte`:**

```svelte
<script lang="ts">
  import { docsUrl, githubUrl } from "$lib/links";
  import GithubIcon from "$lib/components/GithubIcon.svelte";
</script>

<section class="section">
  <div class="wrap" style="text-align: center;">
    <h2>Run it on your own terms</h2>
    <p class="muted" style="margin-top: 12px;">
      One container, your S3 bucket, ten minutes.
    </p>
    <div
      style="margin-top: 24px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;"
    >
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
      >
        Get Started
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost"
      >
        <GithubIcon />
        Star on GitHub
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify**

Run: `bun run check` — no errors in the two new files.

---

### Task 7: Rewire the home page, delete the old components

**Files:**
- Modify: `src/routes/(marketing)/+page.svelte` (imports + composition only; `<svelte:head>` block untouched)
- Delete: `src/lib/components/home/Capabilities.svelte`, `Interface.svelte`, `Architecture.svelte`, `GetStarted.svelte`, `Compare.svelte`
- Delete: `src/lib/components/Eyebrow.svelte`
- Delete: `src/lib/actions/inView.ts`, `src/lib/actions/reveal.ts`

**Interfaces:**
- Consumes: all components from Tasks 3–6.

- [ ] **Step 1: In `+page.svelte`, replace the component imports (lines 3–8) with:**

```ts
import Hero from "$lib/components/home/Hero.svelte";
import Stack from "$lib/components/home/Stack.svelte";
import WhatIs from "$lib/components/home/WhatIs.svelte";
import Feature from "$lib/components/home/Feature.svelte";
import Developers from "$lib/components/home/Developers.svelte";
import Faq from "$lib/components/home/Faq.svelte";
import Cta from "$lib/components/home/Cta.svelte";
import { features } from "$lib/data/home";
```

- [ ] **Step 2: Replace the component composition (the block after `</svelte:head>`) with:**

```svelte
<Hero />
<Stack />
<WhatIs />
{#each features as feature, i}
  <Feature {feature} flip={i % 2 === 1} />
{/each}
<Developers />
<Faq />
<Cta />
```

- [ ] **Step 3: Delete dead files**

Run:
```bash
rm src/lib/components/home/{Capabilities,Interface,Architecture,GetStarted,Compare}.svelte \
   src/lib/components/Eyebrow.svelte \
   src/lib/actions/{inView,reveal}.ts
```

- [ ] **Step 4: If Task 2 kept the old `home.ts` exports, delete them now** (`capabilities`, `pipeline`, `valueCards`, `compareCards`, `screens` and their interfaces — `Screen`, `Capability`, `PipelineNode`, `ValueCard`, `CompareCard`).

- [ ] **Step 5: Verify**

Run: `bun run check` → 0 errors, 0 warnings about missing imports.
Run: `grep -rn "Eyebrow\|inView\|reveal\|barField" src/` → no matches.
Load `/` in the dev preview: hero with working install tabs (click each tab, click copy → "copied"), stack strip, checklist section, three feature sections with alternating layout, dark terminal block, FAQ accordions open/close, CTA band.

---

### Task 8: Nav + footer chrome

**Files:**
- Modify: `src/routes/(marketing)/+layout.svelte` (full rewrite)

**Interfaces:**
- Consumes: `.site-nav*`, `.footer-*`, `.btn*`, `.hairline-b` from Task 1; `docsUrl`, `githubUrl`; `GithubIcon`.

- [ ] **Step 1: Replace `+layout.svelte` with:**

```svelte
<script lang="ts">
  import { docsUrl, githubUrl } from "$lib/links";
  import GithubIcon from "$lib/components/GithubIcon.svelte";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
  let mobileMenuOpen = $state(false);
  const mobileMenuId = "mobile-navigation";

  const navLinks = [
    { label: "Docs", href: docsUrl, external: true },
    { label: "Blog", href: "/blog/", external: false },
    { label: "FAQ", href: "/#faq", external: false },
  ];
</script>

<a href="#main-content" class="skip-to-content">Skip to content</a>

<header
  class="hairline-b sticky top-0 z-40"
  style="background: color-mix(in oklch, var(--base-100) 92%, transparent); backdrop-filter: blur(8px);"
>
  <nav class="wrap site-nav">
    <a href="/" class="brand">
      <img
        src="/rootprint-wordmark.png"
        alt="Rootprint"
        style="height: 24px; width: auto; display: block;"
      />
    </a>

    <!-- Desktop links + actions -->
    <div class="site-nav-links" style="display: none;" data-nav-desktop>
      {#each navLinks as link}
        <a
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
        >
          {link.label}
        </a>
      {/each}
    </div>
    <div class="site-nav-actions" style="display: none;" data-nav-desktop>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-sm btn-ghost"
        aria-label="GitHub"
      >
        <GithubIcon />
        GitHub
      </a>
      <a
        href={docsUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-sm btn-primary"
      >
        Get Started
      </a>
    </div>

    <!-- Mobile toggle -->
    <button
      class="mono"
      type="button"
      style="margin-left: auto; border: 1px solid var(--hairline-strong); padding: 6px 10px; background: transparent; font-size: 12px;"
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      aria-controls={mobileMenuId}
      aria-expanded={mobileMenuOpen}
      data-nav-mobile
    >
      {mobileMenuOpen ? "[ close ]" : "[ menu ]"}
    </button>
  </nav>

  {#if mobileMenuOpen}
    <nav
      id={mobileMenuId}
      aria-label="Mobile navigation"
      class="hairline-t mono"
      style="background: var(--base-100);"
      data-nav-mobile
    >
      <div
        class="wrap"
        style="display: flex; flex-direction: column; gap: 4px; padding-top: 12px; padding-bottom: 16px; font-size: 13px;"
      >
        {#each navLinks as link}
          <a
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            style="padding: 8px 0; color: var(--base-content);"
            onclick={() => (mobileMenuOpen = false)}>{link.label}</a
          >
        {/each}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style="padding: 8px 0; color: var(--base-content);"
          onclick={() => (mobileMenuOpen = false)}>GitHub</a
        >
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-sm btn-primary"
          style="margin-top: 8px;"
        >
          Get Started
        </a>
      </div>
    </nav>
  {/if}
</header>

<main id="main-content" inert={mobileMenuOpen}>
  {@render children?.()}
</main>

<div class="grow"></div>

<footer class="hairline-t" inert={mobileMenuOpen}>
  <div class="wrap" style="padding-left: 0; padding-right: 0;">
    <div class="footer-grid">
      <div class="footer-cell">
        <div class="mono faint footer-h">PRODUCT</div>
        <a href={docsUrl} class="footer-link">Docs</a>
        <a href="/#capabilities" class="footer-link">Capabilities</a>
        <a href="/blog/" class="footer-link">Blog</a>
        <a href="{githubUrl}/releases" class="footer-link">Changelog</a>
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">DEVELOPERS</div>
        <a href="{docsUrl}/api/overview" class="footer-link">API reference</a>
        <a href="{docsUrl}/quickstart" class="footer-link">Quickstart</a>
        <a href="{docsUrl}/send-logs/otlp" class="footer-link">OTLP setup</a>
        <a href="{docsUrl}/search/query-language" class="footer-link"
          >Query language</a
        >
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">COMPARE</div>
        <a href="/compare/datadog/" class="footer-link">vs Datadog</a>
        <a href="/compare/elastic/" class="footer-link">vs Elastic</a>
        <a href="/compare/loki/" class="footer-link">vs Loki</a>
      </div>
      <div class="footer-cell">
        <div class="mono faint footer-h">PROJECT</div>
        <a href={githubUrl} class="footer-link">GitHub</a>
        <a href="{githubUrl}/issues" class="footer-link">Issues</a>
        <a href="{githubUrl}/blob/main/CONTRIBUTING.md" class="footer-link"
          >Contributing</a
        >
        <a href="https://quickwit.io" class="footer-link">Quickwit</a>
      </div>
    </div>
    <div class="footer-meta">
      <span>© Rootprint · Apache-2.0</span>
      <a href="{githubUrl}/blob/main/LICENSE" class="footer-link faint"
        >License</a
      >
      <a href="/privacy/" class="footer-link faint">Privacy</a>
      <a href="{githubUrl}/blob/main/SECURITY.md" class="footer-link faint"
        >Security</a
      >
    </div>
  </div>
</footer>

<style>
  @media (min-width: 760px) {
    [data-nav-desktop] {
      display: flex !important;
    }
    [data-nav-mobile] {
      display: none !important;
    }
  }
</style>
```

- [ ] **Step 2: Verify**

Run: `bun run check` → 0 errors.
Dev preview: nav shows Docs/Blog/FAQ + GitHub + black Get Started; footer 4 columns + meta line. Resize to 375px: `[ menu ]` toggle opens/closes; footer collapses to 2 columns.

---

### Task 9: Secondary-page ripple + full verification

**Files:**
- Modify (only if a check below fails): `src/routes/(marketing)/blog/+page.svelte`, `src/routes/(marketing)/blog/[slug]/+page.svelte`, `src/lib/components/blog/BlogPost.svelte`, `src/routes/(marketing)/compare/[slug]/+page.svelte`, `src/routes/(marketing)/privacy/+page.svelte`, `src/routes/+error.svelte`

**Interfaces:** none — visual/QA pass.

- [ ] **Step 1: Static checks**

Run: `bun run check` → 0 errors.
Run: `bun test` → passes.
Run: `bun run build` → completes; sitemap route prerenders without error.
Run: `grep -rn "display-serif\|grad-text\|vrail\|bp-corners\|rail-wrap\|wrap-tight\|split-2\|caps-\|shot-\|why-\|start-\|arch-\|compare-grid\|compare-card\|nav-path\|kbd" src/ --include='*.svelte'` → expect **no matches**; fix any stragglers by swapping to surviving classes (`.box`, `.wrap`, `.feature`) with equivalent inline layout.

- [ ] **Step 2: Browser pass — desktop (1280px)**

Load each page in the dev preview and check: `/`, `/blog/`, the one published blog post, `/compare/datadog/`, `/privacy/`, and a bogus URL for the 404 page.
For each: mono typography everywhere, off-white canvas, black CTAs, no serif, no green button fills, no console errors (`read_console_messages`).

- [ ] **Step 3: Browser pass — mobile (375px)**

Same pages at mobile width: no horizontal scroll, install tabs usable, stack strip wraps 2-up, feature sections stack text-first, compare table shows its scroll hint.

- [ ] **Step 4: Fix and re-check**

Anything broken: fix in the page's own file (prefer deleting stale classes over adding CSS), then re-run the failed check. Done when Steps 1–3 all pass.
```
