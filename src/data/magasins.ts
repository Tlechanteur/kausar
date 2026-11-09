import type { ImageMetadata } from 'astro';
import coromeuse from '../assets/photos/coromeuse.jpg';
import kausar02bs from '../assets/photos/kausar02bs.jpg';
import coro3 from '../assets/photos/3C6A3354-2s.jpg';
import cathedrale from '../assets/photos/kausarcat-s-1.jpg';
import c1 from '../assets/photos/c1.jpg';
import c2 from '../assets/photos/c2.jpg';
import c3 from '../assets/photos/c3.jpg';
import em01 from '../assets/photos/em01.jpg';
import m1 from '../assets/photos/m1.jpg';
import m2 from '../assets/photos/m2.jpg';
import m3 from '../assets/photos/m3.jpg';
import lm02 from '../assets/photos/lm02xs.jpg';
import lib02 from '../assets/photos/librairie02s.jpg';
import lib03 from '../assets/photos/librairie03s.jpg';
import k01 from '../assets/photos/k01.jpg';
import k03 from '../assets/photos/k03.jpg';
import k04 from '../assets/photos/k04.jpg';
import k08 from '../assets/photos/k08.jpg';
import logoSupermarket from '../assets/logos/logosite02XS.jpg';
import logoEthnic from '../assets/logos/logosite04XS.jpg';
import logoLibrairie from '../assets/logos/logosite05XS.jpg';
import logoExotic from '../assets/logos/logosite03XS.jpg';
import logoExoticCity from '../assets/logos/exotic-city-logo-1552147387.png';

/**
 * Horaires repris de l'ancien site kausar.be (pages magasins et Contact, 2024).
 * Une ligne par jour, dimanche = 0. Heures en décimal ; une fermeture après minuit dépasse 24 (2h = 26).
 * À VÉRIFIER avec les magasins avant mise en ligne : « le W-E » est lu comme samedi et dimanche.
 * Exotic City : horaires inconnus, rien n'est affiché tant qu'ils ne sont pas donnés.
 */
export type Plage = [ouverture: number, fermeture: number] | null;

export interface Photo {
  src: ImageMetadata;
  alt: string;
  pos?: string;
}

export interface Magasin {
  slug: string;
  /** L'adresse de la page du magasin : celle de l'ancien site WordPress, pour garder les liens et Google. */
  page: string;
  /** Le texte de la page du magasin, repris de l'ancien site et resserré. */
  texte: string[];
  /** Les rayons, en étiquettes sur la page du magasin. */
  rayons?: string[];
  /** Le lien d'intégration Google Street View de la visite virtuelle, s'il y en a une. */
  visite?: string;
  nom: string;
  /** Le nom court, dans la liste de l'accueil. */
  enseigne: string;
  /** Une ligne sous le nom, dans la liste de l'accueil. */
  sousTitre: string;
  /** Deux phrases pour la grande fiche (page Contact), tirées de l'ancien site. */
  description: string;
  rue: string;
  ville: string;
  tel: string;
  telHref: string;
  email?: string;
  web?: string;
  tva: string;
  /** Les horaires en toutes lettres ; absent quand on ne les connaît pas. */
  horaires?: string;
  /** La version courte, dans la liste de l'accueil. */
  horairesCourt?: string;
  semaine?: Plage[];
  photos: Photo[];
  logo: ImageMetadata;
  /** La couleur de l'enseigne, prise sur le carré du logo. */
  couleur: string;
  pro?: boolean;
}

const septJours = (o: number, f: number, we = f): Plage[] => [
  [o, we], [o, f], [o, f], [o, f], [o, f], [o, f], [o, we],
];

// le texte commun aux trois Ethnic et Exotic Market, repris de leurs anciennes pages
const texteMarket = (ou: string) => [
  `Un vrai supermarché de proximité ${ou} : des produits d’Afrique et d’Asie (Inde, Pakistan, Bangladesh, Sri Lanka), et tous les produits de consommation courante.`,
  'Dès l’entrée, les fruits et légumes frais : bananes, agrumes, grenades, figues, avocats, gingembre, poivrons, poireaux… Plus loin, les épices, les huiles, le riz et la semoule, des plats préparés et des poissons surgelés, et un grand choix de boissons.',
  'Et les meilleures marques de cosmétiques, de soins pour la peau et les cheveux, des mèches et des perruques. Les cartes téléphoniques sont au comptoir.',
];
const rayonsMarket = ['Fruits et légumes', 'Épices, riz et semoule', 'Surgelés', 'Boissons', 'Cosmétiques et soins', 'Mèches et perruques', 'Produits ménagers', 'Cartes téléphoniques'];

export const magasins: Magasin[] = [
  {
    slug: 'coronmeuse',
    page: 'ethnic-supermarket',
    texte: [
      'Avec ses 900 m², le Kausar Ethnic Supermarket est le plus grand magasin Kausar de Liège : le plus vaste choix de produits d’Afrique et d’Asie (Inde, Pakistan, Bangladesh, Sri Lanka), et tous les produits de consommation courante.',
      'Au rayon fruits et légumes, faites le plein de soleil : agrumes, bananes plantain, noix de coco, patates douces, gingembre, gombo, pili-pili. Riz, pâtes, épices, bouillons, semoules, huiles et sauces pour vos préparations, et au rayon surgelés, des produits parmi les plus rares en Europe.',
      'Côté beauté, les nouveautés et les nouvelles marques : soins du corps, crèmes et huiles pour tous les types de peau, shampoings et soins pour les cheveux. Et tout pour l’entretien de la maison.',
    ],
    rayons: ['Fruits et légumes', 'Riz, épices et sauces', 'Surgelés rares', 'Boissons', 'Cosmétiques et soins', 'Entretien de la maison'],
    visite: 'https://www.google.com/maps/embed?pb=!4v1794242536862!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0UtcWJCSkE.!2m2!1d50.65221724117803!2d5.604085754931399!3f282.53659767950313!4f-11.194089771591337!5f0.7820865974627469',
    nom: 'Kausar Ethnic Supermarket',
    enseigne: 'Ethnic Supermarket',
    sousTitre: '900 m², le plus grand',
    description: 'Le plus grand magasin Kausar de Liège : 900 m² de produits d’Afrique et d’Asie (Inde, Pakistan, Bangladesh, Sri Lanka). Fruits et légumes, riz, épices, surgelés rares en Europe, cosmétiques et soins pour la peau et les cheveux.',
    rue: 'Quai de Coronmeuse 37',
    ville: '4000 Liège',
    tel: '04 227 35 55',
    telHref: '+3242273555',
    tva: 'BE0518881209',
    horaires: '7 jours sur 7, de 9h à 20h',
    horairesCourt: '7 j/7, 9h à 20h',
    semaine: septJours(9, 20),
    photos: [
      { src: coromeuse, alt: 'La façade du Kausar Ethnic Supermarket, quai de Coronmeuse' },
      { src: kausar02bs, alt: 'Une allée du supermarché, les huiles au premier plan' },
      { src: coro3, alt: 'Les rayons maison et cuisine du supermarché' },
    ],
    logo: logoSupermarket,
    couleur: '#e00010',
  },
  {
    slug: 'cathedrale',
    page: 'kausar-ethnic-market-cathedrale',
    texte: texteMarket('en plein centre de Liège, rue de la Cathédrale'),
    rayons: rayonsMarket,
    nom: 'Kausar Ethnic Market Cathédrale',
    enseigne: 'Ethnic Market Cathédrale',
    sousTitre: 'Fruits et légumes frais',
    description: 'Un supermarché de proximité en plein centre. Dès l’entrée, des fruits et légumes frais ; plus loin, épices, riz, semoule, surgelés, boissons, cosmétiques, mèches et perruques.',
    rue: 'Rue de la Cathédrale 7',
    ville: '4000 Liège',
    tel: '04 221 36 35',
    telHref: '+3242213635',
    tva: 'BE0661981448',
    horaires: '7 jours sur 7, de 9h à 20h, 21h le week-end',
    horairesCourt: '7 j/7, 9h à 20h (21h le week-end)',
    semaine: septJours(9, 20, 21),
    photos: [
      { src: cathedrale, alt: 'La devanture rue de la Cathédrale, les cageots de fruits sur le trottoir', pos: '50% 60%' },
      { src: c1, alt: 'Le rayon fruits et légumes du magasin' },
      { src: c2, alt: 'Lait, conserves et riz basmati en rayon' },
      { src: c3, alt: 'Le rayon cosmétiques et soins' },
    ],
    logo: logoEthnic,
    couleur: '#90c018',
  },
  {
    slug: 'place-du-marche',
    page: 'ethnic-market',
    texte: texteMarket('sur la place du Marché, au cœur de Liège'),
    rayons: rayonsMarket,
    nom: 'Kausar Ethnic Market Place du Marché',
    enseigne: 'Ethnic Market Place du Marché',
    sousTitre: 'Mèches, perruques, cosmétiques',
    description: 'Un supermarché de proximité sur la place du Marché. Fruits et légumes frais dès l’entrée, épices, riz, surgelés, boissons, et les meilleures marques de cosmétiques, de mèches et de perruques.',
    rue: 'Place du Marché 12',
    ville: '4000 Liège',
    tel: '04 222 98 49',
    telHref: '+3242229849',
    tva: 'BE0661981448',
    horaires: '7 jours sur 7, de 9h à 20h, 21h le week-end',
    horairesCourt: '7 j/7, 9h à 20h (21h le week-end)',
    semaine: septJours(9, 20, 21),
    photos: [
      { src: em01, alt: 'La façade place du Marché, les fruits et légumes à l’entrée' },
      { src: m3, alt: 'Une allée du magasin, jusqu’à la caisse' },
      { src: m1, alt: 'Riz, haricots et fruits secs en rayon' },
      { src: m2, alt: 'Le rayon cosmétiques et mèches' },
    ],
    logo: logoEthnic,
    couleur: '#90c018',
  },
  {
    slug: 'librairie',
    page: 'librairie-market',
    texte: [
      'La librairie du coin et le magasin d’alimentation réunis, en plein centre de Liège, sur la place du Marché.',
      'Au rayon presse, les quotidiens (La Meuse, La DH, Le Soir, La Libre Belgique) et toute la presse belge et étrangère : magazines, programmes télé, lectures pour enfants, jeux et passe-temps.',
      'Pour les petits creux : pâtes, riz, plats préparés, pain, fruits, pizzas, glaces et confiseries, boissons, bières et vins. Le tabac au comptoir et, au fond du magasin, un espace droguerie : beauté, hygiène et entretien.',
    ],
    rayons: ['Presse belge et étrangère', 'Loterie Nationale', 'Photocopies', 'Cartes téléphoniques', 'Alimentation', 'Boissons', 'Tabac', 'Droguerie'],
    nom: 'Kausar Librairie Market',
    enseigne: 'Librairie Market',
    sousTitre: 'Presse et loterie, ouvert tard',
    description: 'La librairie du coin et l’alimentation générale réunies. Presse belge et étrangère, Loterie Nationale, photocopies et cartes téléphoniques ; boissons, petits creux et droguerie au fond du magasin.',
    rue: 'Place du Marché 16-18',
    ville: '4000 Liège',
    tel: '04 250 69 65',
    telHref: '+3242506965',
    tva: 'BE0750532154',
    horaires: '7 jours sur 7, de 7h à minuit, 2h le week-end',
    horairesCourt: '7 j/7, 7h à minuit (2h le week-end)',
    semaine: septJours(7, 24, 26),
    photos: [
      { src: lm02, alt: 'La vitrine du Kausar Librairie Market, place du Marché' },
      { src: lib03, alt: 'Le rayon presse et magazines' },
      { src: lib02, alt: 'L’intérieur de la librairie' },
    ],
    logo: logoLibrairie,
    couleur: '#901880',
  },
  {
    slug: 'verviers',
    page: 'kausar-exotic-market-verviers',
    texte: texteMarket('à Verviers, rue de l’Harmonie'),
    rayons: rayonsMarket,
    visite: 'https://www.google.com/maps/embed?pb=!4v1610107510444!6m8!1m7!1sCAoSLEFGMVFpcE40clFBTzRWNTMzV3U0U29xY2VBMmJMTHBMYlBRSFA0VmVWUEJv!2m2!1d50.5920348993238!2d5.856423205847332!3f40!4f0!5f0.7820865974627469',
    nom: 'Kausar Exotic Market Verviers',
    enseigne: 'Exotic Market Verviers',
    sousTitre: 'Fermé le dimanche',
    description: 'Le Kausar de Verviers : fruits et légumes frais, épices, riz et semoule, surgelés, boissons, cosmétiques, mèches et perruques.',
    rue: 'Rue de l’Harmonie 40',
    ville: '4800 Verviers',
    tel: '087 31 29 53',
    telHref: '+3287312953',
    tva: 'BE0751511161',
    horaires: 'Du lundi au samedi, de 9h à 20h, fermé le dimanche',
    horairesCourt: 'Lun. au sam., 9h à 20h',
    semaine: [null, [9, 20], [9, 20], [9, 20], [9, 20], [9, 20], [9, 20]],
    photos: [
      { src: k01, alt: 'La façade du Kausar Exotic Market, rue de l’Harmonie', pos: '50% 70%' },
      { src: k08, alt: 'Les cageots de fruits et légumes' },
      { src: k04, alt: 'Le rayon boissons' },
      { src: k03, alt: 'Une allée d’épicerie' },
    ],
    logo: logoExotic,
    couleur: '#90c018',
  },
  {
    slug: 'exotic-city',
    page: 'exotic-city',
    texte: [
      'Exotic City, c’est Kausar pour les professionnels : des produits africains et asiatiques exclusifs, hors du centre-ville, à Alleur.',
      'Pour les horaires, les conditions et les commandes, contactez Exotic City par téléphone ou par e-mail, ou rendez-vous sur son site.',
    ],
    nom: 'Exotic City',
    enseigne: 'Exotic City',
    sousTitre: 'Pour les professionnels',
    description: 'Des produits africains et asiatiques exclusifs, pour les professionnels. Hors du centre-ville, à Alleur.',
    rue: 'Avenue de l’Expansion 1',
    ville: '4432 Alleur',
    tel: '04 228 04 00',
    telHref: '+3242280400',
    email: 'info@exoticcity.be',
    web: 'https://www.exoticcity.be',
    tva: 'BE0882540147',
    photos: [],
    logo: logoExoticCity,
    couleur: '#e81820',
    pro: true,
  },
];

export const itineraire = (m: Magasin) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${m.nom}, ${m.rue}, ${m.ville}, Belgique`)}`;

/** Une heure en toutes lettres : 9 → « 9h », 24 → « minuit », 26 → « 2h ». */
export const heure = (h: number) => {
  const v = h % 24, m = Math.round((v % 1) * 60);
  return v === 0 ? 'minuit' : `${Math.floor(v)}h${m ? String(m).padStart(2, '0') : ''}`;
};

export const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export const facebook ='https://www.facebook.com/KausarCity/';
