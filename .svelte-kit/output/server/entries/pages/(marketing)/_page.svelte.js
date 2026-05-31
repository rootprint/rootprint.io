import { G as attr, X as escape_html, V as ensure_array_like, J as attr_class, aa as stringify, $ as head } from "../../../chunks/renderer.js";
import { W as WebsiteBaseUrl, b as WebsiteName, a as WebsiteDescription } from "../../../chunks/config.js";
import { d as docsUrl, g as githubUrl } from "../../../chunks/links.js";
import "clsx";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Hero($$renderer) {
  $$renderer.push(`<section class="wrap hero svelte-tc3uts"><div class="bar-field" aria-hidden="true"><div class="bar-layer bar-base"></div> <div class="bar-layer bar-hi"></div></div> <div class="hero-copy svelte-tc3uts"><p class="eyebrow"><span class="dot"></span>SELF-HOSTED · OPENTELEMETRY · APACHE-2.0</p> <h1 class="display-serif hero-title svelte-tc3uts">Own Your<br/><span class="grad-text">Log Footprint</span></h1> <p class="muted hero-lede svelte-tc3uts">Logs carry the shape of your systems. Rootprint keeps that operational
      fingerprint on infrastructure you control — fast search, OTLP-native,
      object-storage-backed, Apache-2.0-licensed.</p> <div class="hero-actions svelte-tc3uts"><a${attr("href", docsUrl)} class="btn btn-primary">Try Rootprint <span aria-hidden="true">→</span></a> <a${attr("href", githubUrl)} class="btn btn-ghost">View on GitHub</a></div></div> <div class="shot-frame hero-shot hero-shot-img svelte-tc3uts"><div class="shot" style="aspect-ratio:2530/1268;background:var(--base-100);"><img src="/images/hero-screenshot.png" alt="Rootprint log explorer showing OpenTelemetry logs with severity histogram, faceted filters, and a live result table" width="2530" height="1268" loading="eager" decoding="async" style="display:block;width:100%;height:100%;object-fit:cover;object-position:top center;"/></div></div></section>`);
}
function Eyebrow($$renderer, $$props) {
  let { label } = $$props;
  $$renderer.push(`<p class="eyebrow"><span class="bracket">[</span> ${escape_html(label)} <span class="bracket">]</span></p>`);
}
const capabilities = [
  {
    num: "01",
    kicker: "OPENTELEMETRY FIRST",
    name: "Ingest",
    description: "OTLP endpoint, HTTP gateway, per-index bearer tokens."
  },
  {
    num: "02",
    kicker: "FULL-TEXT SEARCH",
    name: "Query",
    description: "Field filters, full-text, histograms."
  },
  {
    num: "03",
    kicker: "STORAGE",
    name: "Store",
    description: "Store data on the object store you already operate. No vendor lock-in."
  },
  {
    num: "04",
    kicker: "SELF-HOSTED",
    name: "Control",
    description: "Inside your network, behind your SSO."
  }
];
const pipeline = [
  { num: "01", label: "App / SDK", side: "otel-sdk" },
  { num: "02", label: "Rootprint API", side: "auth" },
  { num: "03", label: "OTEL Collector", side: "batching" },
  { num: "04", label: "Quickwit", side: "splits" },
  { num: "05", label: "S3", side: "storage" }
];
const valueCards = [
  {
    meta: "STORAGE ECONOMICS",
    title: "Lighter Cluster Footprint",
    body: "Instead of running a stateful Elasticsearch-style cluster just to search logs, Rootprint pairs Quickwit with object storage — so retention scales with $/GB rather than node count."
  },
  {
    meta: "STATELESS SEARCH",
    title: "Scale Search, Not State",
    body: "Query nodes hold no data of their own — every index split lives in object storage. Scale the search tier up during an incident and back down after, with no cluster to rebalance."
  },
  {
    meta: "OPEN SOURCE",
    title: "Apache-2.0, End To End",
    body: "The whole path is open, from the collector to the query API. Read it, audit it, run it anywhere — no proprietary formats and no per-host or per-seat pricing to model."
  }
];
const compareCards = [
  {
    slug: "datadog",
    tag: "vs · HOSTED SaaS",
    name: "Datadog",
    body: "Self-host the search surface, cut retention bills, keep evidence inside your VPC."
  },
  {
    slug: "elastic",
    tag: "vs · SEARCH ENGINE",
    name: "Elastic",
    body: "Object-storage economics and a focused UI without managing a heavy cluster."
  },
  {
    slug: "loki",
    tag: "vs · LABEL-FIRST",
    name: "Grafana Loki",
    body: "Full-text search and structured filters as first-class — not label cardinality math."
  }
];
const screens = [
  {
    tag: "FULL-TEXT SEARCH",
    title: "Search across every field",
    body: "Full-text and structured field filters over your indexed logs.",
    img: "/images/full-text-search.png",
    alt: "Rootprint full-text search: a query filtering by service_name with a frequency histogram and a live result table."
  },
  {
    tag: "FILTERS + HISTOGRAM",
    title: "Slice by field, text, and time",
    body: "Query string, saved queries, and a histogram to find the spike fast."
  },
  {
    tag: "CONTEXT",
    title: "See what happened around it",
    body: "Expand any match to the log lines before and after to trace what led to the error."
  }
];
function Capabilities($$renderer) {
  $$renderer.push(`<div class="section-divider" aria-hidden="true"></div> <section id="capabilities" class="anchor"><div class="rail-wrap"><div class="caps-head svelte-175tm9e">`);
  Eyebrow($$renderer, { label: "CAPABILITIES" });
  $$renderer.push(`<!----> <h2 class="svelte-175tm9e">Log Search On<br/>Storage You Own</h2></div> <div class="caps-grid"><!--[-->`);
  const each_array = ensure_array_like(capabilities);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let cap = each_array[i];
    $$renderer.push(`<div class="caps-cell"><div class="mono faint caps-kicker svelte-175tm9e">${escape_html(cap.num)} / ${escape_html(cap.kicker)}</div> <h3 class="caps-name svelte-175tm9e">${escape_html(cap.name)}</h3> <p class="muted caps-body svelte-175tm9e">${escape_html(cap.description)}</p></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section>`);
}
function Interface($$renderer) {
  $$renderer.push(`<div class="section-divider" aria-hidden="true"></div> <section id="interface" class="anchor"><div class="rail-wrap"><div class="if-head svelte-gm9wnl">`);
  Eyebrow($$renderer, { label: "INTERFACE" });
  $$renderer.push(`<!----> <h2 class="svelte-gm9wnl">Built To Read<br/>Under Pressure</h2> <p class="muted if-intro svelte-gm9wnl">The UI is for reading logs during an incident — not building dashboards.
        Severity, service, fields, and raw messages stay visible.</p></div> <div class="shot-grid"><!--[-->`);
  const each_array = ensure_array_like(screens);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let screen = each_array[i];
    $$renderer.push(`<div class="shot-cell"><div${attr_class("shot svelte-gm9wnl", void 0, { "shot-img": screen.img })}>`);
    if (screen.img) {
      $$renderer.push("<!--[0-->");
      $$renderer.push(`<img class="shot-screenshot svelte-gm9wnl"${attr("src", screen.img)}${attr("alt", screen.alt)} loading="lazy" decoding="async"/>`);
    } else {
      $$renderer.push("<!--[-1-->");
      $$renderer.push(`<span class="shot-tag">${escape_html(screen.tag)}</span>`);
    }
    $$renderer.push(`<!--]--></div> <div class="shot-cap"><h4 class="if-title svelte-gm9wnl">${escape_html(screen.title)}</h4> <p class="muted if-body svelte-gm9wnl">${escape_html(screen.body)}</p></div></div>`);
  }
  $$renderer.push(`<!--]--></div></div></section>`);
}
function Architecture($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="section-divider" aria-hidden="true"></div> <section id="developers" class="anchor"><div class="rail-wrap"><div class="split-2 arch-head svelte-1eiludb"><div>`);
    Eyebrow($$renderer2, { label: "ARCHITECTURE" });
    $$renderer2.push(`<!----> <h2 class="svelte-1eiludb">A Small Surface<br/>Area For<br/>Serious Logs</h2> <p class="muted arch-intro svelte-1eiludb">Rootprint is intentionally compact: collect with open standards, index
          for fast full-text search, store on commodity object storage, and read
          it all from a UI your team can understand at 3 a.m.</p></div> <div class="arch-pipeline svelte-1eiludb"><!--[-->`);
    const each_array = ensure_array_like(pipeline);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let node = each_array[i];
      $$renderer2.push(`<div class="arch-row"><div class="arch-num mono">${escape_html(node.num)}</div> <div>${escape_html(node.label)}</div> <div class="mono faint arch-side">${escape_html(node.side)}</div></div> `);
      if (i < pipeline.length - 1) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="arch-arrow"></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="why-grid"><!--[-->`);
    const each_array_1 = ensure_array_like(valueCards);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let card = each_array_1[i];
      $$renderer2.push(`<div class="why-cell"><p class="eyebrow why-meta svelte-1eiludb">${escape_html(card.meta)}</p> <h4 class="why-title svelte-1eiludb">${escape_html(card.title)}</h4> <p class="muted why-body svelte-1eiludb">${escape_html(card.body)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
  });
}
function GetStarted($$renderer) {
  const stats = [
    { label: "SETUP", value: "~3 min" },
    { label: "DOCKER", value: "1 file" },
    { label: "DEPS", value: "0" }
  ];
  $$renderer.push(`<div class="section-divider" aria-hidden="true"></div> <section id="start" class="anchor"><div class="rail-wrap"><div class="start-grid"><div class="start-copy svelte-1krl7l5">`);
  Eyebrow($$renderer, { label: "GET STARTED" });
  $$renderer.push(`<!----> <h2 class="start-title svelte-1krl7l5">Deploy<br/>Rootprint<br/>In Minutes</h2> <p class="muted start-lede svelte-1krl7l5">Spin up the stack, point your collectors at Rootprint.</p> <div class="start-actions svelte-1krl7l5"><a${attr("href", docsUrl)} class="btn btn-primary">Read the docs <span aria-hidden="true">→</span></a> <a${attr("href", githubUrl)} class="btn btn-ghost">★ Star on GitHub</a></div></div> <div class="hairline-l start-panel svelte-1krl7l5"><div class="code start-code svelte-1krl7l5"><div class="ln"><span class="c">$</span><span class="ok">curl</span> -O <span class="v">https://raw.githubusercontent.com/rootprint/rootprint/main/docs-site/files/docker-compose.yml</span></div> <div class="ln"><span class="c">$</span><span class="ok">docker</span> compose up -d</div> <div class="ln"> </div> <div class="ln"><span class="c"># open the UI</span></div> <div class="ln"><span class="c">$</span><span class="ok">open</span> <span class="v">http://localhost:8282</span></div></div> <div class="start-mini"><!--[-->`);
  const each_array = ensure_array_like(stats);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let stat = each_array[$$index];
    $$renderer.push(`<div><div class="mono faint start-mini-label svelte-1krl7l5">${escape_html(stat.label)}</div> <div class="mono start-mini-value svelte-1krl7l5">${escape_html(stat.value)}</div></div>`);
  }
  $$renderer.push(`<!--]--></div></div></div></div></section>`);
}
function Compare($$renderer) {
  $$renderer.push(`<div class="section-divider" aria-hidden="true"></div> <section id="compare" class="anchor"><div class="rail-wrap"><div class="cmp-head svelte-131fj0p">`);
  Eyebrow($$renderer, { label: "COMPARE" });
  $$renderer.push(`<!----> <h2 class="cmp-title svelte-131fj0p">If You're Coming From…</h2></div> <div class="compare-grid"><!--[-->`);
  const each_array = ensure_array_like(compareCards);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let card = each_array[i];
    $$renderer.push(`<a${attr("href", `/compare/${stringify(card.slug)}/`)} class="compare-card"><div class="mono faint cmp-tag svelte-131fj0p">${escape_html(card.tag)}</div> <div class="cmp-name svelte-131fj0p">${escape_html(card.name)}</div> <p class="muted cmp-body svelte-131fj0p">${escape_html(card.body)}</p> <div class="compare-cta mono">Read comparison →</div></a>`);
  }
  $$renderer.push(`<!--]--></div></div></section>`);
}
function _page($$renderer) {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl
  };
  const jsonldScript = `<script type="application/ld+json">${JSON.stringify(ldJson) + "<"}/script>`;
  const socialImageUrl = `${WebsiteBaseUrl}/images/home-image.png`;
  head("skv6c4", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>${escape_html(WebsiteName)} — Own Your Log Footprint</title>`);
    });
    $$renderer2.push(`<meta name="description"${attr("content", WebsiteDescription)}/> <link rel="canonical"${attr("href", WebsiteBaseUrl)}/> <meta property="og:title"${attr("content", WebsiteName)}/> <meta property="og:description"${attr("content", WebsiteDescription)}/> <meta property="og:url"${attr("content", WebsiteBaseUrl)}/> <meta property="og:type" content="website"/> <meta property="og:image"${attr("content", socialImageUrl)}/> <meta property="og:image:alt" content="Rootprint product interface preview"/> <meta property="og:site_name"${attr("content", WebsiteName)}/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", WebsiteName)}/> <meta name="twitter:description"${attr("content", WebsiteDescription)}/> <meta name="twitter:image"${attr("content", socialImageUrl)}/> <meta name="twitter:image:alt" content="Rootprint product interface preview"/> ${html(jsonldScript)}`);
  });
  Hero($$renderer);
  $$renderer.push(`<!----> `);
  Capabilities($$renderer);
  $$renderer.push(`<!----> `);
  Interface($$renderer);
  $$renderer.push(`<!----> `);
  Architecture($$renderer);
  $$renderer.push(`<!----> `);
  GetStarted($$renderer);
  $$renderer.push(`<!----> `);
  Compare($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _page as default
};
