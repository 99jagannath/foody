self.addEventListener('install', evt => {
  console.log('service worker installed');
});
//cheagking
self.addEventListener('activate',evt=>{
	console.log('service worker is activated');
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});