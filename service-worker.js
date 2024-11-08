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
    '/images/bife_parmegiana.jpg'
];

// Instalando o Service Worker e adicionando os recursos ao cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Recuperando os recursos do cache
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

// Atualizando o Service Worker e limpando o cache antigo
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
