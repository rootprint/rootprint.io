import { $ as head, X as escape_html, V as ensure_array_like, G as attr, aa as stringify, J as attr_class, N as clsx, K as attr_style, Q as derived } from "../../../../../chunks/renderer.js";
import { b as WebsiteName, W as WebsiteBaseUrl } from "../../../../../chunks/config.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const c = derived(() => data.competitor);
    const docsUrl = "https://docs.rootprint.io";
    const githubUrl = "https://github.com/rootprint/rootprint";
    const capabilities = [
      "Hosting model",
      "License",
      "Ingest path",
      "Index & query",
      "Storage",
      "Retention pricing",
      "Operational surface",
      "Beyond logs (APM/RUM)",
      "Data sovereignty",
      "Lock-in risk"
    ];
    const rpColumn = [
      { mark: "r:YES", text: "Self-host on your infra", tone: "win" },
      { mark: "r:Apache-2.0", text: "Open source", tone: "win" },
      { text: "OTLP · HTTP · Vector · Fluent Bit", tone: "" },
      { text: "Full-text + structured fields", tone: "" },
      { text: "Your S3 / R2 / MinIO bucket", tone: "win" },
      { text: "Object-storage rates ($/GB/month)", tone: "win" },
      { text: "Compose stack + object storage", tone: "win" },
      { mark: "x:NO", text: "Logs only", tone: "lose" },
      { text: "Stays inside your VPC", tone: "win" },
      { text: "NDJSON exports, readable segments", tone: "win" }
    ];
    const pickBullets = [
      "Long retention is the budget killer.",
      "Compliance / sovereignty requires logs stay in your perimeter.",
      "You already operate object storage and OpenTelemetry collectors.",
      "You want a stack you can read, audit, and fork."
    ];
    function mark(m) {
      if (!m) return null;
      const idx = m.indexOf(":");
      return { cls: m.slice(0, idx), label: m.slice(idx + 1) };
    }
    const canonical = derived(() => `${WebsiteBaseUrl}/compare/${c().slug}/`);
    head("wo09fe", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(WebsiteName)} vs ${escape_html(c().competitor)} — Compare</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", `Rootprint compared to ${stringify(c().competitor)}: hosting, licensing, storage economics, query model, and where each one wins.`)}/> <link rel="canonical"${attr("href", canonical())}/> <meta property="og:title"${attr("content", `${stringify(WebsiteName)} vs ${stringify(c().competitor)}`)}/> <meta property="og:type" content="article"/> <meta property="og:url"${attr("content", canonical())}/>`);
    });
    $$renderer2.push(`<main class="wrap" style="padding-top:48px;padding-bottom:80px;"><div class="hairline-b" style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;padding-bottom:20px;"><span class="mono faint" style="font-size:11px;letter-spacing:.1em;">/ compare / <span style="color:var(--base-content);">${escape_html(c().slug)}</span></span> <div style="flex:1;display:flex;gap:20px;justify-content:flex-end;flex-wrap:wrap;font-size:13px;"><!--[-->`);
    const each_array = ensure_array_like(data.all);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr("href", `/compare/${stringify(item.slug)}/`)}${attr_class(clsx(item.slug === c().slug ? "" : "muted"))}${attr_style(item.slug === c().slug ? "color:var(--primary-strong);" : "")}>vs ${escape_html(item.navLabel)}</a>`);
    }
    $$renderer2.push(`<!--]--></div></div> <section class="cmp-hero" style="margin-top:48px;"><div><p class="eyebrow"><span class="bracket">[</span> COMPARE · ${escape_html(c().versus)} <span class="bracket">]</span></p> <h1 style="margin-top:20px;">Rootprint<br/> <span class="faint" style="font-size:0.5em;letter-spacing:-0.01em;">vs</span><br/> ${escape_html(c().competitor)}</h1> <div class="cmp-versus" style="margin-top:28px;"><span class="pill brand">rootprint · self-hosted</span> <span>vs</span> <span class="pill">${escape_html(c().competitorPill)}</span></div></div> <div><p class="muted" style="font-size:16px;line-height:1.6;max-width:46ch;">${escape_html(c().tagline)}</p> <p class="cmp-fineprint">Last updated <span class="mono">${escape_html(c().updated)}</span> · written by the rootprint
        team</p></div></section> <section class="cmp-tldr"><div><div class="lbl">TL;DR — COST</div> <div class="val">${escape_html(c().tldrCost)}</div></div> <div><div class="lbl">TL;DR — DATA</div> <div class="val">${escape_html(c().tldrData)}</div></div> <div><div class="lbl">TL;DR — TRADEOFF</div> <div class="val">${escape_html(c().tldrTrade)}</div></div></section> <section class="cmp-section"><p class="eyebrow"><span class="bracket">[</span> MATRIX <span class="bracket">]</span></p> <h2 style="margin-top:20px;">Feature-by-feature</h2> <p class="lead">A direct comparison on the surfaces most teams care about when picking a
      logging platform.</p> <p class="cmp-scroll-hint mono" aria-hidden="true">scroll horizontally →</p> <table class="cmp-table"><thead><tr><th>Capability</th><th>Rootprint</th><th>${escape_html(c().competitorCol)}</th></tr></thead><tbody><!--[-->`);
    const each_array_1 = ensure_array_like(capabilities);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let capability = each_array_1[i];
      const rp = rpColumn[i];
      const comp = c().column[i];
      const rpMark = mark(rp.mark);
      const compMark = mark(comp.mark);
      $$renderer2.push(`<tr><td>${escape_html(capability)}</td><td${attr_class(clsx(rp.tone ?? ""))}>`);
      if (rpMark) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span${attr_class(`mark ${stringify(rpMark.cls)}`)}>${escape_html(rpMark.label)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->${escape_html(rp.text)}</td><td${attr_class(clsx(comp.tone ?? ""))}>`);
      if (compMark) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span${attr_class(`mark ${stringify(compMark.cls)}`)}>${escape_html(compMark.label)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->${escape_html(comp.text)}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section> <section class="cmp-section cmp-decision"><div><p class="eyebrow" style="color:var(--primary-strong);">PICK ROOTPRINT IF…</p> <h2 style="margin-top:16px;font-size:30px;max-width:18ch;">You'd rather own the storage line item.</h2> <ul><!--[-->`);
    const each_array_2 = ensure_array_like(pickBullets);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let bullet = each_array_2[$$index_2];
      $$renderer2.push(`<li><span style="color:var(--primary);font-family:var(--font-mono);">●</span>${escape_html(bullet)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div><p class="eyebrow muted">STAY WITH ${escape_html(c().competitorStay)} IF…</p> <h2 style="margin-top:16px;font-size:30px;max-width:18ch;">${escape_html(c().stayTitle)}</h2> <ul><!--[-->`);
    const each_array_3 = ensure_array_like(c().stayBullets);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let bullet = each_array_3[$$index_3];
      $$renderer2.push(`<li><span class="faint mono">○</span>${escape_html(bullet)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></section> <section style="padding:64px 0;"><div class="hairline rounded-box" style="background:var(--base-200);padding:48px;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;"><div><p class="eyebrow"><span class="bracket">[</span> NEXT <span class="bracket">]</span></p> <h3 style="margin-top:14px;font-size:28px;max-width:22ch;">Try Rootprint side-by-side with your current pipeline.</h3> <p class="muted" style="margin-top:10px;font-size:14px;">Dual-ship for a week and compare the storage line item for yourself.</p></div> <div style="display:flex;gap:12px;flex-wrap:wrap;"><a${attr("href", docsUrl)} class="btn btn-primary">Read the docs →</a> <a${attr("href", githubUrl)} class="btn btn-ghost">★ Star on GitHub</a></div></div></section></main>`);
  });
}
export {
  _page as default
};
