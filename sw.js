    // Nama cache
    const CACHE_NAME = 'gebyar-kemerdekaan-cache-v2';
    // Daftar file yang akan di-cache
    const urlsToCache = [
      '/'
    ];

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
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
    
