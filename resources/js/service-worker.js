const CACHE_NAME = 'sms-offline';
const OFFLINE_URL = 'resources/offline.html';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.add(new Request(OFFLINE_URL, {cache: 'reload'})))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(async () => {
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    });
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match(event.request)
                .then((response) => response || event.preloadResponse)
                .then((response) => response || fetch(event.request))
                .catch(() => caches.match(OFFLINE_URL))
        );
    }
});
