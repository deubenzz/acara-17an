// Nama cache
const CACHE_NAME = 'gebyar-kemerdekaan-cache-v2';
// Daftar file yang akan di-cache
const urlsToCache = [
  '/'
];

self.addEventListener('install', function(event) {
  // Perintahkan service worker baru untuk aktif segera
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Hapus cache lama saat service worker baru aktif
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Perintahkan service worker untuk mengambil alih semua halaman yang terbuka
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
