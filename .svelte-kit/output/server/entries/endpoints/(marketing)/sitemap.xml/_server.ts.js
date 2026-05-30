import { W as WebsiteBaseUrl } from "../../../../chunks/config.js";
const langRegex = /\/?\[(\[lang(=[a-z]+)?\]|lang(=[a-z]+)?)\]/;
const langRegexNoPath = /\[(\[lang(=[a-z]+)?\]|lang(=[a-z]+)?)\]/;
async function response({ additionalPaths = [], defaultChangefreq, defaultPriority, excludeRoutePatterns, headers = {}, lang, maxPerPage = 5e4, origin, page, paramValues, processPaths, sort = false }) {
  let paths = [
    ...generatePaths({
      defaultChangefreq,
      defaultPriority,
      excludeRoutePatterns,
      lang,
      paramValues
    }),
    ...generateAdditionalPaths({
      additionalPaths,
      defaultChangefreq,
      defaultPriority
    })
  ];
  if (processPaths) {
    paths = processPaths(paths);
  }
  paths = deduplicatePaths(paths);
  if (sort === "alpha") {
    paths.sort((a, b) => a.path.localeCompare(b.path));
  }
  const totalPages = Math.ceil(paths.length / maxPerPage);
  let body;
  if (!page) {
    if (paths.length <= maxPerPage) {
      body = generateBody(origin, paths);
    } else {
      body = generateSitemapIndex(origin, totalPages);
    }
  } else {
    if (!/^[1-9]\d*$/.test(page)) {
      return new Response("Invalid page param", { status: 400 });
    }
    const pageInt = Number(page);
    if (pageInt > totalPages) {
      return new Response("Page does not exist", { status: 404 });
    }
    const pathsOnThisPage = paths.slice((pageInt - 1) * maxPerPage, pageInt * maxPerPage);
    body = generateBody(origin, pathsOnThisPage);
  }
  const newHeaders = {
    "cache-control": "max-age=0, s-maxage=3600",
    "content-type": "application/xml",
    ...Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]))
  };
  return new Response(body, { headers: newHeaders });
}
function generateBody(origin, pathObjs) {
  const urlElements = pathObjs.map((pathObj) => {
    const { alternates, changefreq, lastmod, path, priority } = pathObj;
    let url = "\n  <url>\n";
    url += `    <loc>${origin}${path}</loc>
`;
    url += lastmod ? `    <lastmod>${lastmod}</lastmod>
` : "";
    url += changefreq ? `    <changefreq>${changefreq}</changefreq>
` : "";
    url += priority ? `    <priority>${priority}</priority>
` : "";
    if (alternates) {
      url += alternates.map(({ lang, path: path2 }) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${origin}${path2}" />
`).join("");
    }
    url += "  </url>";
    return url;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>${urlElements}
</urlset>`;
}
function generateSitemapIndex(origin, pages) {
  let str = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (let i = 1; i <= pages; i++) {
    str += `
  <sitemap>
    <loc>${origin}/sitemap${i}.xml</loc>
  </sitemap>`;
  }
  str += `
</sitemapindex>`;
  return str;
}
function generatePaths({ defaultChangefreq, defaultPriority, excludeRoutePatterns = [], lang = { default: "en", alternates: [] }, paramValues = {} }) {
  const svelteRoutes = Object.keys({ "/src/routes/(marketing)/+page.svelte": 0, "/src/routes/(marketing)/compare/[slug]/+page.svelte": 0, "/src/routes/(marketing)/privacy/+page.svelte": 0 });
  const mdRoutes = Object.keys({});
  const svxRoutes = Object.keys({});
  const allRoutes = svelteRoutes.concat(mdRoutes, svxRoutes);
  let routesContainLangParam = false;
  for (const route of allRoutes) {
    if (route.match(langRegex)?.length) {
      routesContainLangParam = true;
      break;
    }
  }
  if (routesContainLangParam && (!lang?.default || !lang?.alternates.length)) {
    throw Error("Must specify `lang` property within the sitemap config because one or more routes contain [[lang]].");
  }
  const filteredRoutes = filterRoutes(allRoutes, excludeRoutePatterns);
  const processedRoutes = processRoutesForOptionalParams(filteredRoutes);
  const { pathsWithLang, pathsWithoutLang } = generatePathsWithParamValues(processedRoutes, paramValues, defaultChangefreq, defaultPriority);
  const pathsWithLangAlternates = processPathsWithLang(pathsWithLang, lang);
  return pathsWithoutLang.concat(pathsWithLangAlternates);
}
function filterRoutes(routes, excludeRoutePatterns) {
  return routes.map((x) => {
    x = x.substring(11);
    x = x.replace(/\/\+page.*\.(svelte|md|svx)$/, "");
    return !x ? "/" : x;
  }).filter((x) => !excludeRoutePatterns.some((pattern) => new RegExp(pattern).test(x))).map((x) => {
    x = x.replaceAll(/\/\([^)]+\)/g, "");
    return !x ? "/" : x;
  }).sort();
}
function generatePathsWithParamValues(routes, paramValues, defaultChangefreq, defaultPriority) {
  for (const paramValueKey in paramValues) {
    if (!routes.includes(paramValueKey)) {
      throw new Error(`Sitemap: paramValues were provided for a route that does not exist within src/routes/: '${paramValueKey}'. Remove this property from your paramValues.`);
    }
  }
  const defaults = {
    changefreq: defaultChangefreq,
    lastmod: void 0,
    priority: defaultPriority
  };
  let pathsWithLang = [];
  let pathsWithoutLang = [];
  const PARAM_TOKEN_REGEX = /(\[\[.+?\]\]|\[.+?\])/g;
  for (const paramValuesKey in paramValues) {
    const hasLang = langRegex.exec(paramValuesKey);
    const routeSansLang = paramValuesKey.replace(langRegex, "");
    const paramValue = paramValues[paramValuesKey];
    let pathObjs = [];
    if (typeof paramValue[0] === "object" && !Array.isArray(paramValue[0])) {
      const objArray = paramValue;
      for (const item of objArray) {
        let i = 0;
        pathObjs.push({
          changefreq: item.changefreq ?? defaults.changefreq,
          lastmod: item.lastmod,
          path: routeSansLang.replace(PARAM_TOKEN_REGEX, () => item.values[i++] || ""),
          priority: item.priority ?? defaults.priority
        });
      }
    } else if (Array.isArray(paramValue[0])) {
      const array2D = paramValue;
      pathObjs = array2D.map((data) => {
        let i = 0;
        return {
          ...defaults,
          path: routeSansLang.replace(PARAM_TOKEN_REGEX, () => data[i++] || "")
        };
      });
    } else {
      const array1D = paramValue;
      pathObjs = array1D.map((paramValue2) => ({
        ...defaults,
        path: routeSansLang.replace(/\[.*\]/, paramValue2)
      }));
    }
    if (hasLang) {
      const lang = hasLang?.[0];
      const langPaths = [];
      for (const pathObj of pathObjs) {
        langPaths.push({
          ...pathObj,
          path: pathObj.path.slice(0, hasLang?.index) + lang + pathObj.path.slice(hasLang?.index)
        });
      }
      pathsWithLang = pathsWithLang.concat(langPaths);
    } else {
      pathsWithoutLang = pathsWithoutLang.concat(pathObjs);
    }
    routes.splice(routes.indexOf(paramValuesKey), 1);
  }
  const staticWithLang = [];
  const staticWithoutLang = [];
  for (const route of routes) {
    const hasLang = route.match(langRegex);
    if (hasLang) {
      staticWithLang.push({ ...defaults, path: route });
    } else {
      staticWithoutLang.push({ ...defaults, path: route });
    }
  }
  pathsWithLang = staticWithLang.concat(pathsWithLang);
  pathsWithoutLang = staticWithoutLang.concat(pathsWithoutLang);
  for (const route of routes) {
    const regex = /.*(\[\[.+\]\]|\[.+\]).*/;
    const routeSansLang = route.replace(langRegex, "") || "/";
    if (regex.test(routeSansLang)) {
      throw new Error(`Sitemap: paramValues not provided for: '${route}'
Update your sitemap's excludeRoutePatterns to exclude this route OR add data for this route's param(s) to the paramValues object of your sitemap config.`);
    }
  }
  return { pathsWithLang, pathsWithoutLang };
}
function processRoutesForOptionalParams(routes) {
  const processedRoutes = routes.flatMap((route) => {
    const routeWithoutLangIfAny = route.replace(langRegex, "");
    return /\[\[.*\]\]/.test(routeWithoutLangIfAny) ? processOptionalParams(route) : route;
  });
  return Array.from(new Set(processedRoutes));
}
function processOptionalParams(originalRoute) {
  const hasLang = langRegex.exec(originalRoute);
  const route = hasLang ? originalRoute.replace(langRegex, "") : originalRoute;
  let results = [];
  results.push(route.slice(0, route.indexOf("[[") - 1));
  const remaining = route.slice(route.indexOf("[["));
  const segments = remaining.split("/").filter(Boolean);
  let j = 1;
  for (const segment of segments) {
    if (!results[j])
      results[j] = results[j - 1];
    results[j] = `${results[j]}/${segment}`;
    if (segment.startsWith("[[")) {
      j++;
    }
  }
  if (hasLang) {
    const lang = hasLang?.[0];
    results = results.map((result) => `${result.slice(0, hasLang?.index)}${lang}${result.slice(hasLang?.index)}`);
  }
  if (!results[0].length)
    results[0] = "/";
  return results;
}
function processPathsWithLang(pathObjs, langConfig) {
  if (!pathObjs.length)
    return [];
  let processedPathObjs = [];
  for (const pathObj of pathObjs) {
    const path = pathObj.path;
    const hasLangRequired = /\/?\[lang(=[a-z]+)?\](?!\])/.exec(path);
    const _path = hasLangRequired ? path.replace(langRegex, `/${langConfig.default}`) : path.replace(langRegex, "") || "/";
    const variations = [
      {
        lang: langConfig.default,
        path: _path
      }
    ];
    for (const lang of langConfig.alternates) {
      variations.push({
        lang,
        path: path.replace(langRegexNoPath, lang)
      });
    }
    const pathObjs2 = [];
    for (const x of variations) {
      pathObjs2.push({
        ...pathObj,
        alternates: variations,
        path: x.path
      });
    }
    processedPathObjs = processedPathObjs.concat(pathObjs2);
  }
  return processedPathObjs;
}
function deduplicatePaths(pathObjs) {
  const uniquePaths = /* @__PURE__ */ new Map();
  for (const pathObj of pathObjs) {
    uniquePaths.set(pathObj.path, pathObj);
  }
  return Array.from(uniquePaths.values());
}
function generateAdditionalPaths({ additionalPaths, defaultChangefreq, defaultPriority }) {
  const defaults = {
    changefreq: defaultChangefreq,
    lastmod: void 0,
    priority: defaultPriority
  };
  return additionalPaths.map((path) => ({
    ...defaults,
    path: path.startsWith("/") ? path : `/${path}`
  }));
}
const prerender = true;
const GET = async () => {
  return await response({
    origin: WebsiteBaseUrl,
    excludeRoutePatterns: [],
    paramValues: {
      "/compare/[slug]": ["datadog", "elastic", "loki"]
    }
  });
};
export {
  GET,
  prerender
};
