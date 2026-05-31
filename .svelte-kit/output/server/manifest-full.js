export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","favicon-16x16.png","favicon-32x32.png","favicon.ico","fonts/geist-mono-variable.woff2","fonts/geist-sans-variable.woff2","images/full-text-search.png","images/hero-screenshot.png","images/home-image.png","logo.png","robots.txt","site.webmanifest"]),
	mimeTypes: {".png":"image/png",".woff2":"font/woff2",".txt":"text/plain",".webmanifest":"application/manifest+json"},
	_: {
		client: {start:"_app/immutable/entry/start.B-QKy1OM.js",app:"_app/immutable/entry/app.DGOzyHIs.js",imports:["_app/immutable/entry/start.B-QKy1OM.js","_app/immutable/chunks/Hsa8JNYu.js","_app/immutable/chunks/D6CaKOij.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/chunks/CJW1hZF5.js","_app/immutable/entry/app.DGOzyHIs.js","_app/immutable/chunks/D6CaKOij.js","_app/immutable/chunks/hCvrNH2P.js","_app/immutable/chunks/BqEM_q9Y.js","_app/immutable/chunks/CJW1hZF5.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(marketing)",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(marketing)/compare/[slug]",
				pattern: /^\/compare\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(marketing)/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(marketing)/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/(marketing)/sitemap.xml/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
