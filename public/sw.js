const CACHE_NAME = "uru-stylemate-v1";
const toCache = ["/", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(toCache)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        return caches.open(CACHE_NAME).then((cache) => {
          try { cache.put(event.request, res.clone()); } catch (e) {}
          return res;
        });
      }).catch(() => new Response("Offline", { status: 503 }));
    })
  );
});
