/**
 * Préfixe un chemin du site avec la base de la compilation :
 * « / » en production (www.kausar.be), « /kausar » sur le serveur de test (test.lechanteur.be/kausar).
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const lien = (chemin: string) => `${base}${chemin}`;
