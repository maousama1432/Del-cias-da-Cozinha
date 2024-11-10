let cacheName = "delicias-da-cozinha-v2";
let filesToCache = [ '/',
    '/index.html',
    '/massas.html',
    '/doces.html',
    '/carnes.html',
    '/css/styles.css',
    '/images/icon.png',
    '/images/logo.png',
    '/images/espaguete.jpg',
    '/images/brigadeiro.jpg',
    '/images/bife_parmegiana.jpg',
    '/images/costela.jpg',
    '/images/frango_curry.jpg',
    '/images/lasanha.jpg',
    '/images/pudim.jpg',
    '/images/ravioli.jpg',
    '/images/torta_limao.jpg'];

/* inicializando a service worker e fazendo o 
download do conteúdo da aplicação */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* disponibilizando o conteudo quando estiver offline */
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

