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
		client: {start:"_app/immutable/entry/start.kdfm5Y1o.js",app:"_app/immutable/entry/app.sHN3YfZw.js",imports:["_app/immutable/entry/start.kdfm5Y1o.js","_app/immutable/chunks/DSuBhiY7.js","_app/immutable/chunks/D6CaKOij.js","_app/immutable/chunks/OA8UcISh.js","_app/immutable/chunks/CJW1hZF5.js","_app/immutable/entry/app.sHN3YfZw.js","_app/immutable/chunks/D6CaKOij.js","_app/immutable/chunks/hCvrNH2P.js","_app/immutable/chunks/BqEM_q9Y.js","_app/immutable/chunks/CJW1hZF5.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/sitemap.xml","/compare/datadog/","/compare/elastic/","/compare/loki/","/privacy/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
