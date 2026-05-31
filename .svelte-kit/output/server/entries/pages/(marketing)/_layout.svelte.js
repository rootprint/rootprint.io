import { V as ensure_array_like, G as attr, X as escape_html, aa as stringify } from "../../../chunks/renderer.js";
import { g as githubUrl, d as docsUrl } from "../../../chunks/links.js";
function _layout($$renderer, $$props) {
  let { children } = $$props;
  let mobileMenuOpen = false;
  const mobileMenuId = "mobile-navigation";
  const navLinks = [
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Developers", href: "/#developers" },
    { label: "Compare", href: "/#compare" }
  ];
  $$renderer.push(`<a href="#main-content" class="skip-to-content">Skip to content</a> <div class="vrail vrail-l" aria-hidden="true"></div> <div class="vrail vrail-r" aria-hidden="true"></div> <header class="hairline-b sticky top-0 z-40" style="background: color-mix(in oklch, var(--base-100) 85%, transparent); backdrop-filter: blur(8px);"><nav class="wrap site-nav"><a href="/" class="brand"><img src="/logo.png" alt="" style="width:24px;height:24px;display:block;"/> <span class="brand-name">Rootprint</span></a> <div class="site-nav-links svelte-3qm88h" style="display:none;" data-nav-desktop=""><!--[-->`);
  const each_array = ensure_array_like(navLinks);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$renderer.push(`<a${attr("href", link.href)}>${escape_html(link.label)}</a>`);
  }
  $$renderer.push(`<!--]--></div> <div class="site-nav-actions svelte-3qm88h" style="display:none;" data-nav-desktop=""><a${attr("href", githubUrl)} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost" aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg> GitHub</a> <a${attr("href", docsUrl)} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost">Docs</a> <a${attr("href", docsUrl)} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">Get Started</a></div> <button class="mono svelte-3qm88h" type="button" style="margin-left:auto;border:1px solid var(--hairline-strong);border-radius:var(--radius-field);padding:6px 10px;background:transparent;font-size:12px;"${attr("aria-label", "Open menu")}${attr("aria-controls", mobileMenuId)}${attr("aria-expanded", mobileMenuOpen)} data-nav-mobile="">${escape_html("[ menu ]")}</button></nav> `);
  {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></header> <main id="main-content"${attr("inert", mobileMenuOpen, true)}>`);
  children?.($$renderer);
  $$renderer.push(`<!----></main> <div class="grow"></div> <div class="section-divider" aria-hidden="true"></div> <footer${attr("inert", mobileMenuOpen, true)}><div class="rail-wrap"><div class="footer-grid"><div class="footer-cell"><div class="mono faint footer-h">PRODUCT</div> <a${attr("href", docsUrl)} class="footer-link">Docs</a> <a href="/#capabilities" class="footer-link">Capabilities</a> <a${attr("href", `${stringify(githubUrl)}/releases`)} class="footer-link">Changelog</a> <a${attr("href", `${stringify(githubUrl)}/blob/main/CHANGELOG.md`)} class="footer-link">Roadmap</a></div> <div class="footer-cell"><div class="mono faint footer-h">PROJECT</div> <a${attr("href", githubUrl)} class="footer-link">GitHub</a> <a${attr("href", `${stringify(githubUrl)}/issues`)} class="footer-link">Issues</a> <a${attr("href", `${stringify(githubUrl)}/discussions`)} class="footer-link">Discussions</a> <a${attr("href", `${stringify(githubUrl)}/releases`)} class="footer-link">Releases</a></div> <div class="footer-cell"><div class="mono faint footer-h">COMPARE</div> <a href="/compare/datadog/" class="footer-link">vs Datadog</a> <a href="/compare/elastic/" class="footer-link">vs Elastic</a> <a href="/compare/loki/" class="footer-link">vs Loki</a> <a href="/#compare" class="footer-link faint">All comparisons</a></div> <div class="footer-cell"><div class="mono faint footer-h">DEVELOPERS</div> <a${attr("href", docsUrl)} class="footer-link">Quickstart</a> <a${attr("href", `${stringify(docsUrl)}/install/docker-compose`)} class="footer-link">OTLP setup</a> <a${attr("href", docsUrl)} class="footer-link">Query DSL</a> <a${attr("href", docsUrl)} class="footer-link">API reference</a></div> <div class="footer-cell"><div class="mono faint footer-h">COMMUNITY</div> <a${attr("href", `${stringify(githubUrl)}/discussions`)} class="footer-link">Discussions</a> <a${attr("href", `${stringify(githubUrl)}/blob/main/CONTRIBUTING.md`)} class="footer-link">Contributing</a> <a href="https://quickwit.io" class="footer-link">Quickwit</a> <a${attr("href", githubUrl)} class="footer-link">Star us</a></div> <div class="footer-cell"><div class="mono faint footer-h">LEGAL</div> <a${attr("href", `${stringify(githubUrl)}/blob/main/LICENSE`)} class="footer-link">License</a> <a href="/privacy/" class="footer-link">Privacy</a> <a${attr("href", `${stringify(githubUrl)}/blob/main/SECURITY.md`)} class="footer-link">Security</a></div></div></div></footer>`);
}
export {
  _layout as default
};
