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
  url: '/news.html',
  revision: '1'
},
{
  url: '/menu.html',
  revision: '1'
},
{
  url: '/video.html',
  revision: '1'
},
{
  url: '/faq.html',
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
  url: '/pages/chartnav.html',
  revision: '1'
},
{
  url: '/pages/home.html',
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
  url: '/js/chartCovid.js',
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
	new RegExp('/nav.html'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'nav'
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
);

workbox.routing.registerRoute(
  new RegExp('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAKA06eqVlySx2Q4W-iGAAArBp1lIv-uqo&order=viewCount&type=video&maxResults=10&q=edukasi corona&part=snippet'),
  workbox.strategies.staleWhileRevalidate()
)




