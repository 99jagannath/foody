const staticCacheName = 'site-static-v2';
const assets=[
  '/foody/',
  '/foody/index.html',
  '/foody/manifest.json',
  '/foody/app.js',
  '/foodyjs/ui.js',
  '/foodyjs/materialize.min.js',
  '/foodycss/materialize.min.css',
  '/foodycss/styles.css',
  '/foodyimg/dish.png',
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
	evt.waitUntil(
        caches.keys().then(keys=>{
        	return Promise.all(keys
               .filter(key=>key !==staticCacheName)
               .map(key=> caches.delete(key))
        		);
        })
		);
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
