// const CACHE_NAME = "covid19";
// var urlsToCache = [
//   "/",
//   "/nav.html",
//   "/index.html",
//   "/pages/global.html",
//   "/pages/nasional.html",
//   "/pages/doa.html",
//   "/pages/about.html",
//   "/pages/maps.html",
//   "/css/style.css",
//   "/css/bootstrap.min.css",
//   "/js/nav.js",
//   "/js/api.js",
//   "/js/jquery.js",
//   "/js/scroll.js",
//   "/js/cv19live.js",
//   "/js/dateformat.js",
//   "/js/maps.js"
// ];
 
 
// self.addEventListener("install", function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function(cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//       caches
//         .match(event.request, { cacheName: CACHE_NAME })
//         .then(function(response) {
//           if (response) {
//             console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//             return response;
//           }
   
//           console.log(
//             "ServiceWorker: Memuat aset dari server: ",
//             event.request.url
//           );
//           return fetch(event.request);
//         })
//     );
//   });

//   self.addEventListener('activate', function(event){
// 	event.waitUntil(
// 		caches.keys()
// 		.then(function(cacheNames) {
// 			return Promise.all(
// 				cacheNames.map(function(cacheName){
// 					if(cacheName != CACHE_NAME){	
// 						console.log("ServiceWorker: cache " + cacheName + " dihapus");
// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// })

// self.addEventListener("fetch", function(event) {
//   var base_url = "https://api.kawalcorona.com/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//         return response || fetch (event.request);
//     })
//     )
//   }
// });
// self.addEventListener("fetch", function(event) {
//   var base_url = "https://api.kawalcorona.com/indonesia/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function(cache) {
//         return fetch(event.request).then(function(response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//         return response || fetch (event.request);
//     })
//     )
//   }
// });

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);

} else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([{
  url: '/',
  revision: '1'
},
{
  url: '/nav.html',
  revision: '1'
},
{
  url: '/index.html',
  revision: '1'
},
{
  url: '/manifest.json',
  revision: '1'
},
{
  url: '/icon.png',
  revision: '1'
},
{
  url: '/pages/global.html',
  revision: '1'
},
{
  url: '/pages/nasional.html',
  revision: '1'
},
{
  url: '/pages/doa.html',
  revision: '1'
},
{
  url: '/pages/about.html',
  revision: '1'
},
{
  url: '/pages/maps.html',
  revision: '1'
},
{
  url: '/css/style.css',
  revision: '1'
},
{
  url: '/css/bootstrap.min.css',
  revision: '1'
},
{
  url: '/js/nav.js',
  revision: '1'
},
{
  url: '/js/api.js',
  revision: '1'
},
{
  url: '/js/jquery.js',
  revision: '1'
},
{
  url: '/js/scroll.js',
  revision: '1'
},
{
  url: '/js/cv19live.js',
  revision: '1'
},
{
  url: '/js/dateformat.js',
  revision: '1'
},
{
  url: '/js/maps.js',
  revision: '1'
},
{
  url: '/img/load.png',
  revision: '1'
},
{
  url: '/img/virus.svg',
  revision: '1'
},
{
  url: '/img/red.svg',
  revision: '1'
},
{
  url: '/img/virus.png',
  revision: '1'
}
]);

workbox.routing.registerRoute(
	new RegExp('/js/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'js'
	})
);

workbox.routing.registerRoute(
	new RegExp('/css/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'css'
	})
);

workbox.routing.registerRoute(
	new RegExp('/index.html'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'index'
	})
);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.networkFirst({
		networkTimeoutSeconds: 3,
		cacheName: 'pages',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 10,
				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
			}),
		],
	})
);


workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
      ],
  }),
);
workbox.routing.registerRoute(
  new RegExp('https://api.kawalcorona.com/'),
  workbox.strategies.staleWhileRevalidate()
)




