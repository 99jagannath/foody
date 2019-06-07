const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-static-v1'
const assets=[
  '/foody/',
  '/foody/index.html',
  '/foody/pages/fallback.html',
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
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !==dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    }).catch(()=>caches.match('pages/fallback.html'));
  );
});
