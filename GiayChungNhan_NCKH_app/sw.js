const CACHE = "gcn-nckh-v10";
const FILES = ["./", "assets/laurel-l.png", "assets/logo-huph.png", "assets/laurel-r.png", "assets/nen.webp", "assets/rank-rule.png", "assets/thumb-1.jpg", "assets/thumb-10.jpg", "assets/thumb-11.jpg", "assets/thumb-12.jpg", "assets/thumb-13.jpg", "assets/thumb-14.jpg", "assets/thumb-15.jpg", "assets/thumb-16.jpg", "assets/thumb-17.jpg", "assets/thumb-18.jpg", "assets/thumb-19.jpg", "assets/thumb-2.jpg", "assets/thumb-20.jpg", "assets/thumb-3.jpg", "assets/thumb-4.jpg", "assets/thumb-5.jpg", "assets/thumb-6.jpg", "assets/thumb-7.jpg", "assets/thumb-8.jpg", "assets/thumb-9.jpg", "assets/toa-nha.webp", "assets/tpl-10.webp", "assets/tpl-11.webp", "assets/tpl-12.webp", "assets/tpl-13.webp", "assets/tpl-14.webp", "assets/tpl-15.webp", "assets/tpl-16.webp", "assets/tpl-17.webp", "assets/tpl-18.webp", "assets/tpl-19.webp", "assets/tpl-20.webp", "assets/tpl-3.webp", "assets/tpl-4.webp", "assets/tpl-5.webp", "assets/tpl-6.webp", "assets/tpl-7.webp", "assets/tpl-8.webp", "assets/tpl-9.webp", "fonts/PlayfairDisplay.woff2", "fonts/Serif-Bold.woff2", "fonts/Serif-BoldItalic.woff2", "fonts/Serif-Italic.woff2", "fonts/Serif-Regular.woff2", "icons/apple-touch-icon.png", "icons/favicon.png", "icons/icon-192.png", "icons/icon-512.png", "index.html", "vendor/html2canvas.min.js", "vendor/jspdf.umd.min.js", "manifest.webmanifest"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => req.mode === "navigate" ? caches.match("./") : undefined)));
});
