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

export { calme };
