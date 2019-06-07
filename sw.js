const staticCacheName = 'site-static';
const assets=[
  '/foody/',
  '/foody/index.html',
  '/foody/pages/about.html',
  '/foody/pages/contact.html',	
  '/foody/manifest.json',
  '/foody/app.js',
  '/foody/js/ui.js',
  '/foody/js/materialize.min.js',
  '/foody/css/materialize.min.css',
  '/foody/css/styles.css',
  '/foody/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener('install', evt => {

  evt.waitUntil(
        caches.open(staticCacheName).then(cache=>{
        	console.log('caching all assets');
        	cache.addAll(assets);
        })
  	);

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
