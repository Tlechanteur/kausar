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
  // les pages magasins et /promotions/ gardent les adresses de l'ancien site WordPress ;
  // l'ancienne page News (le fil Facebook) renvoie vers Promotions, la page cookies vers l'accueil
  redirects: {
    '/news': `${b}/promotions/`,
    '/politique-de-cookies-ue': `${b}/`,
  },
});
