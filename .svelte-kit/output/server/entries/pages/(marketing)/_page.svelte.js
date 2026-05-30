import { $ as head, G as attr, V as ensure_array_like, X as escape_html, aa as stringify } from "../../../chunks/renderer.js";
import { W as WebsiteBaseUrl, b as WebsiteName, a as WebsiteDescription } from "../../../chunks/config.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const docsUrl = "https://docs.rootprint.io";
    const githubUrl = "https://github.com/oleksandr-zhyhalo/rootprint";
    const capabilities = [
      {
        num: "01",
        kicker: "OPENTELEMETRY FIRST",
        name: "Ingest",
        description: "OTLP/HTTP endpoint, NDJSON gateway, per-index bearer tokens.",
        items: ["OTLP Native", "HTTP / JSON", "Vector, Fluent Bit"]
      },
      {
        num: "02",
        kicker: "INCIDENT FLOW",
        name: "Query",
        description: "Field filters, full-text, histograms.",
        items: ["Lucene-flavored DSL", "Live tail", "CSV / NDJSON export"]
      },
      {
        num: "03",
        kicker: "STORAGE",
        name: "Store",
        description: "Store data on the object store you already operate. No vendor lock-in.",
        items: ["S3 / R2 / MinIO", "Quickwit index", "NDJSON exports"]
      },
      {
        num: "04",
        kicker: "SELF-HOSTED",
        name: "Control",
        description: "Inside your network, behind your SSO.",
        items: ["Google OAuth", "Domain allowlist", "Per-index access"]
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
        meta: "−90% INFRA PATTERN",
        title: "Less Cluster Tax",
        body: "Avoid managing expensive Elasticsearch-style storage just to search logs. Rootprint pairs Quickwit with object storage for a calmer cost curve."
      },
      {
        meta: "INCIDENT READY",
        title: "Readable Under Pressure",
        body: "Severity, service, trace fields, and raw messages stay visible. The UI is tuned for production debugging, not dashboard theater."
      },
      {
        meta: "SELF-HOSTED",
        title: "Own The Footprint",
        body: "Logs often carry the shape of your systems. Rootprint keeps that operational fingerprint on infrastructure you control."
      }
    ];
    const compare = [
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
    const ldJson = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: WebsiteName,
      url: WebsiteBaseUrl
    };
    const jsonldScript = `<script type="application/ld+json">${JSON.stringify(ldJson) + "<"}/script>`;
    const socialImageUrl = `${WebsiteBaseUrl}/images/home-image.png`;
    head("skv6c4", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(WebsiteName)} — Own Your Log Footprint</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", WebsiteDescription)}/> <link rel="canonical"${attr("href", WebsiteBaseUrl)}/> <meta property="og:title"${attr("content", WebsiteName)}/> <meta property="og:description"${attr("content", WebsiteDescription)}/> <meta property="og:url"${attr("content", WebsiteBaseUrl)}/> <meta property="og:type" content="website"/> <meta property="og:image"${attr("content", socialImageUrl)}/> <meta property="og:image:alt" content="Rootprint product interface preview"/> <meta property="og:site_name"${attr("content", WebsiteName)}/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", WebsiteName)}/> <meta name="twitter:description"${attr("content", WebsiteDescription)}/> <meta name="twitter:image"${attr("content", socialImageUrl)}/> <meta name="twitter:image:alt" content="Rootprint product interface preview"/> ${html(jsonldScript)}`);
    });
    $$renderer2.push(`<section class="wrap" style="position:relative;min-height:calc(100svh - 57px);display:flex;flex-direction:column;justify-content:center;"><div class="bar-field" aria-hidden="true"><div class="bar-layer bar-base"></div> <div class="bar-layer bar-hi"></div></div> <div style="position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding:48px 0;"><p class="eyebrow"><span class="dot"></span>SELF-HOSTED · OPENTELEMETRY · APACHE-2.0</p> <h1 style="margin-top:20px;font-size:clamp(40px,5vw,68px);">Own Your<br/>Log Footprint</h1> <p class="muted" style="margin-top:20px;max-width:54ch;font-size:15px;line-height:1.6;">Logs carry the shape of your systems. Rootprint keeps that operational
      fingerprint on infrastructure you control — fast search, OTLP-native,
      object-storage-backed, Apache-2.0-licensed.</p> <div style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap;justify-content:center;"><a${attr("href", docsUrl)} class="btn btn-primary">Try Rootprint <span aria-hidden="true">→</span></a> <a${attr("href", githubUrl)} class="btn btn-ghost">View on GitHub</a></div></div></section> <div class="section-divider" aria-hidden="true"></div> <section id="capabilities" style="scroll-margin-top:72px;"><div class="rail-wrap"><div style="padding:96px 32px 48px;display:grid;grid-template-columns:1.05fr 1fr;gap:64px;align-items:start;"><div><p class="eyebrow"><span class="bracket">[</span> CAPABILITIES <span class="bracket">]</span></p> <h2 style="margin-top:20px;">Log Search Without<br/>The SaaS Tax</h2></div></div> <div class="caps-grid"><!--[-->`);
    const each_array = ensure_array_like(capabilities);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let cap = each_array[$$index_1];
      $$renderer2.push(`<div class="caps-cell"><div class="mono faint" style="font-size:11px;letter-spacing:.12em;">${escape_html(cap.num)} / ${escape_html(cap.kicker)}</div> <h3 style="margin-top:18px;font-size:30px;">${escape_html(cap.name)}</h3> <p class="muted" style="margin-top:14px;font-size:13px;line-height:1.6;">${escape_html(cap.description)}</p> <ul class="caps-list"><!--[-->`);
      const each_array_1 = ensure_array_like(cap.items);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let item = each_array_1[$$index];
        $$renderer2.push(`<li>→ ${escape_html(item)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <div class="section-divider" aria-hidden="true"></div> <section id="developers" style="scroll-margin-top:72px;"><div class="rail-wrap"><div style="padding:96px 32px 64px;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;"><div><p class="eyebrow"><span class="bracket">[</span> ARCHITECTURE <span class="bracket">]</span></p> <h2 style="margin-top:20px;">A Small Surface<br/>Area For<br/>Serious Logs</h2> <p class="muted" style="margin-top:24px;max-width:46ch;font-size:14px;line-height:1.6;">Rootprint is intentionally compact: collect with standards, index with
          Quickwit, store on commodity object storage, and search from a UI your
          team can understand at 3 a.m.</p></div> <div style="padding:20px 0;display:flex;flex-direction:column;gap:8px;"><!--[-->`);
    const each_array_2 = ensure_array_like(pipeline);
    for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
      let node = each_array_2[i];
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
    const each_array_3 = ensure_array_like(valueCards);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let card = each_array_3[$$index_3];
      $$renderer2.push(`<div class="why-cell"><p class="eyebrow" style="color:var(--primary-strong);">${escape_html(card.meta)}</p> <h4 style="margin-top:14px;font-size:24px;">${escape_html(card.title)}</h4> <p class="muted" style="margin-top:12px;font-size:13px;line-height:1.6;">${escape_html(card.body)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <div class="section-divider" aria-hidden="true"></div> <section id="start" style="scroll-margin-top:72px;"><div class="rail-wrap"><div class="start-grid"><div style="padding:64px 48px;"><p class="eyebrow"><span class="bracket">[</span> GET STARTED <span class="bracket">]</span></p> <h2 style="margin-top:20px;font-size:54px;">Deploy<br/>Rootprint<br/>In Minutes</h2> <p class="muted" style="margin-top:24px;max-width:42ch;font-size:14px;line-height:1.6;">Spin up the stack, point your collectors at Rootprint.</p> <div style="display:flex;gap:12px;margin-top:32px;flex-wrap:wrap;"><a${attr("href", docsUrl)} class="btn btn-primary">Read the docs <span aria-hidden="true">→</span></a> <a${attr("href", githubUrl)} class="btn btn-ghost">★ Star on GitHub</a></div></div> <div class="hairline-l" style="padding:48px;background:var(--base-100);display:flex;flex-direction:column;gap:14px;justify-content:center;"><div class="code" style="font-size:12px;"><span class="c">$</span><span class="ok">curl</span> -O <span class="v">https://raw.githubusercontent.com/oleksandr-zhyhalo/rootprint/main/docs-site/files/docker-compose.yml</span> <span class="c">$</span><span class="ok">docker</span> compose up -d <span class="c"># open the UI</span> <span class="c">$</span><span class="ok">open</span> <span class="v">http://localhost:8282</span></div> <div class="start-mini"><div><div class="mono faint" style="font-size:10px;letter-spacing:.12em;">SETUP</div> <div class="mono" style="font-size:18px;margin-top:4px;">~3 min</div></div> <div><div class="mono faint" style="font-size:10px;letter-spacing:.12em;">DOCKER</div> <div class="mono" style="font-size:18px;margin-top:4px;">1 file</div></div> <div><div class="mono faint" style="font-size:10px;letter-spacing:.12em;">DEPS</div> <div class="mono" style="font-size:18px;margin-top:4px;">0</div></div></div></div></div></div></section> <div class="section-divider" aria-hidden="true"></div> <section id="compare" style="scroll-margin-top:72px;"><div class="rail-wrap"><div style="padding:64px 32px 32px;"><p class="eyebrow"><span class="bracket">[</span> COMPARE <span class="bracket">]</span></p> <h2 style="margin-top:16px;font-size:44px;">If You're Coming From…</h2></div> <div class="compare-grid"><!--[-->`);
    const each_array_4 = ensure_array_like(compare);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let c = each_array_4[$$index_4];
      $$renderer2.push(`<a${attr("href", `/compare/${stringify(c.slug)}/`)} class="compare-card"><div class="mono faint" style="font-size:11px;letter-spacing:.12em;">${escape_html(c.tag)}</div> <div style="font-size:32px;letter-spacing:-0.02em;margin-top:14px;">${escape_html(c.name)}</div> <p class="muted" style="margin-top:10px;font-size:13px;line-height:1.6;">${escape_html(c.body)}</p> <div class="compare-cta mono">Read comparison →</div></a>`);
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
  });
}
export {
  _page as default
};
