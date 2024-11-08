const CACHE_NAME = 'delicias-da-cozinha-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/massas.html',
    '/doces.html',
    '/carnes.html',
    '/css/styles.css',
    '/js/app.js',
    '/images/espaguete.jpg',
    '/images/brigadeiro.jpg',
    '/images/bife_parmegiana.jpg',
    '/images/costela.jpg',
    '/images/frango_curry.jpg',
    '/images/lasanha.jpg',
    '/images/pudim.jpg',
    '/images/ravioli.jpg',
    '/images/torta_limao.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});