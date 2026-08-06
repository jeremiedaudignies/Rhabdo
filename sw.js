/* RHABDO — cache hors connexion.
   Change CACHE à chaque nouvelle version pour forcer la mise à jour. */
const CACHE = 'rhabdo-v3';
const FICHIERS = ['./', './index.html', './manifest.json',
                  './icone-180.png', './icone-192.png', './icone-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(cles => Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* réseau d'abord, cache en secours : l'app reste à jour quand il y a
   du réseau, et fonctionne quand même dans une salle sans signal */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        if (r && r.status === 200 && r.type === 'basic') {
          const copie = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copie));
        }
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
