
const CACHE_NAME = 'ai-study-assistant-cache-v2'; // Incremented version
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// Install event: cache the application shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event: remove old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: handle network requests
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Don't cache requests to Clerk's authentication services.
  if (requestUrl.origin.includes('clerk.')) {
    return; // Let the browser handle the request directly.
  }
  // For third-party scripts (like Clerk), use a Network First strategy.
  if (requestUrl.origin !== self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request).then(response => {
          // If we get a valid response, cache it for offline use and return it.
          if(response && response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch(() => {
          // If the network fails, try the cache.
          return cache.match(event.request);
        });
      })
    );
    return;
  }

  // For your own assets, use a Cache First, then Network strategy.
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return from cache if found
      if (response) {
        return response;
      }
      // Otherwise, fetch from network
      return fetch(event.request);
    })
  );
});
