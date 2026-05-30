import { V as ensure_array_like, G as attr, X as escape_html } from "../../../chunks/renderer.js";
import { b as WebsiteName } from "../../../chunks/config.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    let mobileMenuOpen = false;
    const mobileMenuId = "mobile-navigation";
    const docsUrl = "https://docs.rootprint.io";
    const githubUrl = "https://github.com/oleksandr-zhyhalo/rootprint";
    const version = "v0.2.2";
    const navLinks = [
      { label: "/capabilities", href: "/#capabilities" },
      { label: "/developers", href: "/#developers" },
      { label: "/docs", href: docsUrl, external: true },
      { label: "/compare", href: "/#compare" },
      { label: "/github", href: githubUrl, external: true }
    ];
    $$renderer2.push(`<a href="#main-content" class="skip-to-content">Skip to content</a> <div class="vrail vrail-l" aria-hidden="true"></div> <div class="vrail vrail-r" aria-hidden="true"></div> <header class="hairline-b sticky top-0 z-40" style="background: color-mix(in oklch, var(--base-100) 85%, transparent); backdrop-filter: blur(8px);"><nav class="wrap nav-path"><a href="/" style="display:flex;align-items:center;gap:8px;"><img src="/favicon.png" alt="" style="width:24px;height:24px;display:block;"/> <span style="font-size:13px;letter-spacing:-0.01em;">rootprint</span> <span class="faint">v0.2.2</span></a> <div class="nav-path-links svelte-3qm88h" style="display:none;" data-nav-desktop=""><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<a${attr("href", link.href)}${attr("target", link.external ? "_blank" : void 0)}${attr("rel", link.external ? "noopener noreferrer" : void 0)}>${escape_html(link.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></div> <a${attr("href", docsUrl)} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary mono svelte-3qm88h" style="display:none;" data-nav-desktop="">$ get-started</a> <button class="mono svelte-3qm88h" type="button" style="margin-left:auto;border:1px solid var(--hairline-strong);border-radius:var(--radius-field);padding:6px 10px;background:transparent;font-size:12px;"${attr("aria-label", "Open menu")}${attr("aria-controls", mobileMenuId)}${attr("aria-expanded", mobileMenuOpen)} data-nav-mobile="">${escape_html("[ menu ]")}</button></nav> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header> <main id="main-content"${attr("inert", mobileMenuOpen, true)}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></main> <div class="grow"></div> <div class="section-divider" aria-hidden="true"></div> <footer${attr("inert", mobileMenuOpen, true)}><div class="rail-wrap"><div class="footer-grid"><div class="footer-cell"><div class="mono faint footer-h">PRODUCT</div> <a${attr("href", docsUrl)} class="footer-link">Docs</a> <a href="/#capabilities" class="footer-link">Capabilities</a> <a href="https://github.com/oleksandr-zhyhalo/rootprint/releases" class="footer-link">Changelog</a> <a href="https://github.com/oleksandr-zhyhalo/rootprint/blob/main/CHANGELOG.md" class="footer-link">Roadmap</a></div> <div class="footer-cell"><div class="mono faint footer-h">PROJECT</div> <a${attr("href", githubUrl)} class="footer-link">GitHub</a> <a href="https://github.com/oleksandr-zhyhalo/rootprint/issues" class="footer-link">Issues</a> <a href="https://github.com/oleksandr-zhyhalo/rootprint/discussions" class="footer-link">Discussions</a> <a href="https://github.com/oleksandr-zhyhalo/rootprint/releases" class="footer-link">Releases</a></div> <div class="footer-cell"><div class="mono faint footer-h">COMPARE</div> <a href="/compare/datadog/" class="footer-link">vs Datadog</a> <a href="/compare/elastic/" class="footer-link">vs Elastic</a> <a href="/compare/loki/" class="footer-link">vs Loki</a> <a href="/#compare" class="footer-link faint">All comparisons</a></div> <div class="footer-cell"><div class="mono faint footer-h">DEVELOPERS</div> <a${attr("href", docsUrl)} class="footer-link">Quickstart</a> <a href="https://docs.rootprint.io/install/docker-compose" class="footer-link">OTLP setup</a> <a${attr("href", docsUrl)} class="footer-link">Query DSL</a> <a${attr("href", docsUrl)} class="footer-link">API reference</a></div> <div class="footer-cell"><div class="mono faint footer-h">COMMUNITY</div> <a href="https://github.com/oleksandr-zhyhalo/rootprint/discussions" class="footer-link">Discussions</a> <a href="https://github.com/oleksandr-zhyhalo/rootprint/blob/main/CONTRIBUTING.md" class="footer-link">Contributing</a> <a href="https://quickwit.io" class="footer-link">Quickwit</a> <a${attr("href", githubUrl)} class="footer-link">Star us</a></div> <div class="footer-cell"><div class="mono faint footer-h">LEGAL</div> <a href="https://github.com/oleksandr-zhyhalo/rootprint/blob/main/LICENSE" class="footer-link">License</a> <a href="/privacy/" class="footer-link">Privacy</a> <a href="https://github.com/oleksandr-zhyhalo/rootprint/blob/main/SECURITY.md" class="footer-link">Security</a></div></div> <div class="hairline-t mono" style="padding:18px 32px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;font-size:11px;"><span class="faint">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())}
        ${escape_html(WebsiteName)} contributors · Apache-2.0 · log/${escape_html(version.replace("v", ""))}</span> <span class="faint">made for teams that own their data</span></div></div></footer>`);
  });
}
export {
  _layout as default
};
