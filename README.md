# RHABDO — lot d’illustrations fitness

Ce dossier contient **132 fichiers WebP** prêts à être utilisés dans le programme HTML/JavaScript :

- 60 fichiers existants normalisés, dont 28 fichiers entièrement reconstruits
  pour remettre 14 exercices au gabarit commun ;
- 72 nouveaux fichiers correspondant à 36 exercices, dont les trois ajouts
  `developpe-couche`, `face-pull` et `rowing-landmine` ;
- les paires `traction-supination-large` et `traction-supination-serree`
  corrigées avec une prise supinée explicite ;
- `demi-squat-barre`, `sauts-verticaux` et `corde-a-sauter` corrigés sur
  l’amplitude, la continuité d’échelle et la réalité du mouvement ;
- les fragments de bord supprimés sur les cinq phases 1 signalées.

## Standard technique

- Dimensions : `440 × 590 px`
- Format : WebP RVB
- Fond : blanc plein cadre, sans arrondi incrusté
- Nommage : `<slug>-phase-1.webp` et `<slug>-phase-2.webp`
- Badge de phase et légende musculaire intégrés dans l’image
- Aucune flèche de mouvement ni chronomètre incrusté
- Couleurs : `#FF5B3A`, `#FF8F1F`, `#F2C400`

## Intégration

Copier les fichiers dans `assets/guides/` en conservant strictement leurs noms. Les 36 nouveaux slugs figurent dans `manifest.json` avec l’inventaire complet du dossier.

Le fichier HTML/JavaScript n’ayant pas été joint à ce lot, les entrées `GUIDE_IMAGES` et `guideTitres()` ne sont pas modifiées ici.
