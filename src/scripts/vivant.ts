/**
 * Le petit moteur commun aux propositions :
 * l'état ouvert/fermé de chaque magasin (heure de Bruxelles), les apparitions au défilement
 * et les compteurs qui défilent. Tout le contenu reste visible sans JavaScript.
 */
type Plage = [number, number] | null;

const calme = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const heure = (h: number) => {
  const v = h % 24, m = Math.round((v % 1) * 60);
  return v === 0 ? 'minuit' : `${Math.floor(v)}h${m ? String(m).padStart(2, '0') : ''}`;
};

export function etats() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Brussels', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date()).map((p) => [p.type, p.value]),
  );
  const jour = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
  const maintenant = Number(parts.hour) + Number(parts.minute) / 60;
  const fiches = [...document.querySelectorAll<HTMLElement>('[data-semaine]')];
  const vus = new Set<string>();
  let ouverts = 0;
  fiches.forEach((el) => {
    const slug = el.dataset.slug!;
    const semaine: Plage[] = JSON.parse(el.dataset.semaine || '[]');
    const veille = semaine[(jour + 6) % 7], auj = semaine[jour];
    let texte: string, ouvert = false;
    if (veille && veille[1] > 24 && maintenant < veille[1] - 24) { ouvert = true; texte = `Ouvert jusqu’à ${heure(veille[1])}`; }
    else if (!auj) texte = 'Fermé aujourd’hui';
    else if (maintenant < auj[0]) texte = `Ouvre à ${heure(auj[0])}`;
    else if (maintenant < auj[1]) { ouvert = true; texte = `Ouvert jusqu’à ${heure(auj[1])}`; }
    else texte = 'Fermé, rouvre demain';
    if (!vus.has(slug)) { vus.add(slug); if (ouvert) ouverts++; }
    document.querySelectorAll<HTMLElement>(`[data-etat="${slug}"]`).forEach((e) => {
      e.textContent = texte;
      e.classList.toggle('is-open', ouvert);
      e.classList.toggle('is-closed', !ouvert);
    });
  });
  // le jour d'aujourd'hui, dans le tableau des horaires d'une page magasin
  document.querySelectorAll<HTMLElement>(`[data-jour="${jour}"]`).forEach((tr) => {
    tr.classList.add('is-today');
    tr.querySelector('th')?.insertAdjacentHTML('beforeend', '<span class="sr-only"> (aujourd’hui)</span>');
  });
  document.querySelectorAll<HTMLElement>('[data-maintenant]').forEach((now) => {
    now.textContent = ouverts === 0 ? 'À cette heure-ci, nos magasins sont fermés.'
      : ouverts === 1 ? 'En ce moment, 1 magasin est ouvert.'
      : `En ce moment, ${ouverts} magasins sont ouverts.`;
    now.setAttribute('role', 'status');
  });
}

export function reveler() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (calme() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -12% 0px' });
  els.forEach((e) => io.observe(e));
}

export function compter() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-count]')];
  if (calme()) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target as HTMLElement;
    const fin = Number(el.dataset.count), t0 = performance.now(), d = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / d), v = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(fin * v));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  els.forEach((e) => io.observe(e));
}

/**
 * La mosaïque vivante de l'accueil. Deux ambiances qui alternent pour que ça varie :
 *  - au repos, chaque carré change seul, à son propre rythme, en fondu tranquille ;
 *  - de temps en temps, une « grande vague » retourne les 9 carrés presque ensemble,
 *    en diagonale, et tout change d'un coup.
 * Sans JavaScript ou en mouvement réduit, seule la première face de chaque carré reste.
 */
export function diaporama() {
  const tuiles = [...document.querySelectorAll<HTMLElement>('.tuile[data-diapo]')];
  if (calme() || !tuiles.length) return;
  const COLS = 3;

  const carres = tuiles.map((el, idx) => {
    const faces = [...el.querySelectorAll<HTMLElement>('.face')];
    return { el, faces, i: 0, ligne: Math.floor(idx / COLS), col: idx % COLS, minuteur: 0 };
  });

  const changer = (c: typeof carres[number]) => {
    if (c.faces.length < 2) return;
    c.faces[c.i].classList.remove('is-on');
    c.i = (c.i + 1) % c.faces.length;
    c.faces[c.i].classList.add('is-on');
  };

  // fondu simple (ambiance repos)
  const fondu = (c: typeof carres[number]) => changer(c);

  // retournement (ambiance vague) : on bascule, on change à mi-chemin, on revient
  const retourner = (c: typeof carres[number]) => {
    c.el.classList.add('bascule');
    window.setTimeout(() => { changer(c); c.el.classList.remove('bascule'); }, 300);
  };

  const REPOS = 5200; // un carré change environ toutes les 5 s au repos

  const lancerRepos = () => carres.forEach((c, k) => {
    // départ décalé pour que les carrés ne partent pas ensemble
    window.setTimeout(() => {
      fondu(c);
      c.minuteur = window.setInterval(() => fondu(c), REPOS + (k % 3) * 600);
    }, 2000 + k * 700);
  });

  const stopperRepos = () => carres.forEach((c) => c.minuteur && window.clearInterval(c.minuteur));

  const vague = () => {
    stopperRepos();
    // les 9 carrés se retournent en diagonale, presque ensemble
    carres.forEach((c) => window.setTimeout(() => retourner(c), (c.ligne + c.col) * 95));
    // puis on reprend l'ambiance repos
    window.setTimeout(lancerRepos, 1400);
  };

  lancerRepos();
  // une grande vague de temps en temps
  window.setInterval(vague, 21000);
}

export { calme };
