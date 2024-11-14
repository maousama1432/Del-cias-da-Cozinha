// Nome do cache e arquivos para armazenar no cache
let cacheName = "delicias-da-cozinha-v1";
let filesToCache = [
  '/',
  '/index',
  '/massas',
  '/doces',
  '/carnes',
  '/css/styles.css',
  '/js/main.js',
  '/images/logo.png',
  '/images/icon.png',
  '/images/espaguete.jpg',
  '/images/brigadeiro.jpg',
  '/images/bife_parmegiana.jpg',
  '/images/costela.jpg',
  '/images/frango_curry.jpg',
  '/images/lasanha.jpg',
  '/images/pudim.jpg',
  '/images/ravioli.jpg',
  '/images/torta_limao.jpg',
  '/offline' 
];


// let filesToCache = [
//   '/',
//   '/index.html',
//   '/massas.html',
//   '/doces.html',
//   '/carnes.html',
//   '/css/styles.css',
//   '/images/icon.png',
//   '/images/logo.png',
//   '/images/espaguete.jpg',
//   '/images/brigadeiro.jpg',
//   '/images/bife_parmegiana.jpg',
//   '/images/costela.jpg',
//   '/images/frango_curry.jpg',
//   '/images/lasanha.jpg',
//   '/images/pudim.jpg',
//   '/images/ravioli.jpg',
//   '/images/torta_limao.jpg',
//   '/offline.html' 
// ];
// let filesToCache2 =  [ '/',
//   '/index.html',
//   '/massas.html',
//   '/doces.html',
//   '/carnes.html',
//   '/css/styles.css',
//   '/images/icon.png',
//   '/images/logo.png',
//   '/images/espaguete.jpg',
//   '/images/brigadeiro.jpg',
//   '/images/bife_parmegiana.jpg',
//   '/images/costela.jpg',
//   '/images/frango_curry.jpg',
//   '/images/lasanha.jpg',
//   '/images/pudim.jpg',
//   '/images/ravioli.jpg',
//   '/images/torta_limao.jpg'];

// Instalando a service worker e armazenando arquivos no cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Cache aberto e arquivos armazenados!");
      return cache.addAll(filesToCache);
    })
  );
});

// Ativando a service worker e limpando caches antigos
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [cacheName];
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            console.log(`Cache removido: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Buscando conteúdo do cache ou da rede, com fallback para quando offline
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Se o arquivo estiver no cache, retorna ele, senão faz o fetch da rede
      return (
        response ||
        fetch(e.request).catch(() => {
          // Fallback para página offline quando não houver rede
          return caches.match("/offline.html");
        })
      );
    })
  );
});
