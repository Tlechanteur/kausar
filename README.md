# Kausar

Le site de [Kausar](https://www.kausar.be) : six magasins d'alimentation du monde à Liège, Verviers et Alleur.

Site statique fait avec [Astro](https://astro.build), sans base de données ni CMS.

## Pages

- **Accueil** (`src/pages/index.astro`) :
  - mosaïque de photos animée ;
  - la liste courte des magasins, qui indique en direct lesquels sont ouverts ;
  - les chiffres ;
  - le bandeau des marques Kausar ;
  - « À propos » ;
  - le renvoi vers les promotions sur Facebook ;
  - la visite virtuelle Google Street View, chargée seulement au clic.
- **Nos magasins** (`src/pages/contact.astro`) : une fiche par magasin, avec photos, horaires, téléphone et itinéraire.

Les anciennes adresses du site WordPress (`/ethnic-supermarket`, `/promotions`, etc.) redirigent vers les nouvelles pages (`astro.config.mjs`).

## Modifier le contenu

| Quoi | Où |
|---|---|
| Magasins : adresses, horaires, téléphones, photos, logos | `src/data/magasins.ts` |
| Lien Facebook (promotions) | `src/data/magasins.ts`, constante `facebook` |
| Textes de l'accueil, marques, visite virtuelle | `src/pages/index.astro` |
| En-tête, menu, pied de page | `src/layouts/Base.astro` |
| Couleurs, typographie, mise en page | `src/styles/kausar.css` |
| État ouvert ou fermé, apparitions, compteurs | `src/scripts/vivant.ts` |

Les horaires sont saisis jour par jour, dans le champ `semaine` de chaque magasin. L'état « ouvert » ou « fermé » est calculé dans le navigateur, à l'heure de Bruxelles.

Les logos ne se modifient pas : ce sont les fichiers d'origine, avec leurs couleurs.

| Logo | Couleur |
|---|---|
| Kausar | marine `#03387c` |
| Group | bleu `#0098e0` |
| Supermarket | rouge `#e00010` |
| Markets | vert `#90c018` |
| Librairie | magenta `#901880` |

## Commandes

Il faut Node 22 ou plus récent.

| Commande | Effet |
|---|---|
| `npm install` | installe les dépendances |
| `npm run dev` | serveur local sur `http://localhost:4321` |
| `npm run build` | compile le site pour www.kausar.be dans `dist/` (c'est ce que fait Cloudflare) |
| `npm run build:test` | compile la version de test pour `test.lechanteur.be/kausar` dans `dist-test/` |
| `npm run preview` | affiche le site compilé |

## Mise en ligne

Le site est hébergé sur Cloudflare Workers (fichiers statiques), dans le Worker `kausar` (`wrangler.jsonc`). Cloudflare est relié à ce dépôt GitHub : chaque envoi sur la branche `main` lance `npm run build` puis `npx wrangler deploy`, et le site est en ligne une minute plus tard.

Adresse de travail : https://kausar.thierry-lechanteur.workers.dev, en attendant le domaine kausar.be.

`public/_headers` fixe les en-têtes de sécurité et le cache long des fichiers de `/_astro`.

Pour une mise en ligne dans un sous-dossier ailleurs, deux variables d'environnement changent la base des liens : `KAUSAR_SITE` et `KAUSAR_BASE`. Voir le script `build:test` dans `package.json`.

---

Photos et site : [lechanteur.be](https://www.lechanteur.be) pour Alchimie srl.
