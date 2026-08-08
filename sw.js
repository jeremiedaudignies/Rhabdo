/* RHABDO — cache hors connexion.

   Deux niveaux, volontairement séparés :

   1. LE NOYAU. index.html, le manifeste et les icônes. Mis en cache à
      l'installation, avec obligation de réussir. Six fichiers.

   2. LES ILLUSTRATIONS. Soixante images. Mises en cache au fil de la
      navigation, jamais à l'installation.

   Le motif est important : cache.addAll échoue en bloc dès qu'un seul
   fichier manque ou renvoie une erreur. Avec 66 fichiers listés à
   l'installation, un seul incident privait l'application de TOUT son
   cache hors connexion. Le noyau seul est bien plus sûr, et les images
   se cachent d'elles-mêmes dès la première consultation d'une fiche.
*/
const CACHE = 'rhabdo-v15';
const NOYAU = ['./', './index.html', './manifest.json',
               './icone-180.png', './icone-192.png', './icone-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(NOYAU.map(u =>
        c.add(u).catch(err => console.warn('RHABDO : ' + u + ' non mis en cache', err)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(cles => Promise.all(cles.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* Réseau d'abord pour le code, cache d'abord pour les images :
   une illustration ne change jamais, inutile de la retélécharger. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const estImage = /\.webp$/.test(url.pathname);

  if (estImage) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(rep => {
        if (rep && rep.status === 200 && rep.type === 'basic') {
          const copie = rep.clone();
          caches.open(CACHE).then(c => c.put(e.request, copie));
        }
        return rep;
      }))
    );
    return;
  }

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
