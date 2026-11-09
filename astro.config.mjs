// @ts-check
import { defineConfig } from 'astro/config';

// Production : www.kausar.be, à la racine.
// Test : KAUSAR_SITE=https://test.lechanteur.be KAUSAR_BASE=/kausar npm run build  (voir « npm run build:test »)
const site = process.env.KAUSAR_SITE || 'https://www.kausar.be';
const base = process.env.KAUSAR_BASE || '/';
const b = base.replace(/\/$/, '');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  // les anciennes adresses de l'ancien site WordPress pointent vers la fiche du magasin, page Contact
  redirects: {
    '/ethnic-supermarket': `${b}/contact#coronmeuse`,
    '/kausar-ethnic-market-cathedrale': `${b}/contact#cathedrale`,
    '/ethnic-market': `${b}/contact#place-du-marche`,
    '/librairie-market': `${b}/contact#librairie`,
    '/kausar-exotic-market-verviers': `${b}/contact#verviers`,
    '/promotions': `${b}/`,
    '/news': `${b}/`,
    '/politique-de-cookies-ue': `${b}/`,
  },
});
