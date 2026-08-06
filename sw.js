RHABDO — version rhabdo-v11

CORRECTIONS APPLIQUÉES

1. Polices embarquées et mise en page bureau
   Inter et IBM Plex Mono sont intégrées à index.html en base64, réduites
   aux 168 caractères réellement utilisés. Plus aucune requête réseau :
   le rendu est identique dès le premier lancement hors connexion.
   Au-delà de 720 px de large, l'application s'affiche centrée en largeur
   fixe de 480 px, avec survol à la souris.

2. Légende musculaire dédoublonnée
   Les illustrations portent leur propre légende incrustée ; l'application
   en dessinait une seconde. Un drapeau LEGENDE_DANS_IMAGE, en tête du
   script, tranche la question. À true (valeur actuelle), seule celle de
   l'image s'affiche. Quand les illustrations seront régénérées SANS
   légende incrustée, passer ce drapeau à false : celle de l'application
   reprend le relais, complète et toujours exacte. Aucune autre
   modification n'est nécessaire.

5. Double encadrement supprimé
   Chaque image porte déjà son cadre blanc arrondi. L'application n'en
   ajoute plus.

Service worker : noyau séparé
   L'ancienne version listait 66 fichiers dans cache.addAll à
   l'installation. Ce mécanisme échoue EN BLOC dès qu'un seul fichier
   manque : une image absente privait l'application de tout son cache
   hors connexion. Désormais deux niveaux :
   - le noyau (index.html, manifeste, 3 icônes) est mis en cache à
     l'installation, chaque fichier indépendamment des autres ;
   - les 60 illustrations sont mises en cache au fil de la navigation,
     en cache-d'abord puisqu'une image ne change jamais.

Références externes
   Toutes les mentions de louismove.com ont été supprimées : 21 URL dans
   les fiches et le bloc d'affichage de la source.

INSTALLATION
Décompresser dans un même dossier en conservant assets/guides.
Servir par HTTPS pour l'installation sur l'écran d'accueil.
