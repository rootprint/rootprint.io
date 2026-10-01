import type { RequestHandler } from "@sveltejs/kit";
import { WebsiteBaseUrl } from "$lib/config";
import { comparisonLinks } from "$lib/data/comparison-links";

const routes = [
  "/",
  "/privacy/",
  "/compare/",
  ...comparisonLinks.map(({ slug }) => `/compare/${slug}/`),
];

export const prerender = true;

export const GET: RequestHandler = () => {
  const urls = routes
    .map((route) => `<url><loc>${WebsiteBaseUrl}${route}</loc></url>`)
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
