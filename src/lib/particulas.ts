// Animação da primeira tela: as partículas que formam a casa.
// Lê a imagem de cv.dataset.src, monta a casa no canvas e reage ao cursor.
// Respeita prefers-reduced-motion e pausa fora da tela ou com a aba oculta.

type P = {
  tx: number; ty: number; tz: number;   // alvo (espaço do logo, centrado)
  sx: number; sy: number; sz: number;   // origem espalhada
  ox: number; oy: number;               // deslocamento causado pelo cursor (tela)
  d: number;                            // atraso de montagem
  c: string;                            // cor
};

export async function iniciarParticulas(cv: HTMLCanvasElement, { legenda }: { legenda?: HTMLElement | null } = {}) {
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = cv.getContext('2d');
  if (!ctx) return;

  const img = new Image();
  img.src = cv.dataset.src!;
  try { await img.decode(); } catch { return; }

  let W = 0, H = 0, dpr = 1, cx = 0, cy = 0, escala = 1, mobile = false;
  let ps: P[] = [];
  const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, ativo: false };

  function amostrar() {
    mobile = W < 1024;
    const S = mobile ? 84 : 132;
    const h = Math.round(S * (img.height / img.width));
    const off = document.createElement('canvas');
    off.width = S; off.height = h;
    const o = off.getContext('2d', { willReadFrequently: true })!;
    o.drawImage(img, 0, 0, S, h);
    const dados = o.getImageData(0, 0, S, h).data;
    const novos: P[] = [];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < S; x++) {
        const i = (y * S + x) * 4;
        if (dados[i + 3] < 140) continue;
        // quantiza a cor para poucos tons (desenho mais rápido)
        const q = (v: number) => Math.min(255, Math.round(v / 20) * 20);
        const c = `rgb(${q(dados[i])},${q(dados[i + 1])},${q(dados[i + 2])})`;
        const r = 600 + Math.random() * 500;
        const a = Math.random() * Math.PI * 2, b = Math.random() * Math.PI - Math.PI / 2;
        novos.push({
          tx: x - S / 2, ty: y - h / 2, tz: (Math.random() - 0.5) * 10,
          sx: Math.cos(a) * Math.cos(b) * r, sy: Math.sin(b) * r * 0.6, sz: Math.sin(a) * Math.cos(b) * r,
          ox: 0, oy: 0, d: Math.random() * 0.9, c,
        });
      }
    }
    novos.sort((p, q) => (p.c < q.c ? -1 : 1));
    ps = novos;
    const vh = window.innerHeight;
    const lado = mobile ? Math.min(W * 0.6, vh * 0.3) : Math.min(W * 0.36, H * 0.62);
    escala = lado / S;
    cx = mobile ? W * 0.5 : W * 0.74;
    cy = mobile ? 64 + vh * 0.2 : H * 0.5;
    if (legenda) legenda.textContent = `${ps.length.toLocaleString('pt-BR')} partículas formam a casa. Passe o cursor.`;
  }

  function medir() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    amostrar();
  }

  const ease = (t: number) => 1 - Math.pow(1 - t, 4);
  let t0 = performance.now();
  let rodando = true;
  let raf = 0;

  function quadro(agora: number) {
    const t = (agora - t0) / 1000;
    ctx!.clearRect(0, 0, W, H);

    const giro = reduz ? 0 : Math.sin(t * 0.35) * 0.38 + mouse.nx * 0.35;
    const incl = reduz ? 0 : mouse.ny * 0.12;
    const cg = Math.cos(giro), sg = Math.sin(giro);
    const ci = Math.cos(incl), si = Math.sin(incl);
    const foco = 900;
    const tam = Math.max(1.4, escala * 0.62);
    const raio = mobile ? 0 : 110;
    let cor = '';

    for (let k = 0; k < ps.length; k++) {
      const p = ps[k];
      const pr = reduz ? 1 : ease(Math.min(1, Math.max(0, (t - p.d) / 1.8)));
      let x = (p.sx + (p.tx * escala - p.sx) * pr);
      let y = (p.sy + (p.ty * escala - p.sy) * pr);
      let z = (p.sz + (p.tz * escala - p.sz) * pr);
      // respiração sutil depois de montada
      if (!reduz && pr >= 1) z += Math.sin(t * 1.4 + p.tx * 0.15 + p.ty * 0.1) * escala * 1.2;
      // rotação Y e X
      const xr = x * cg - z * sg;
      let zr = x * sg + z * cg;
      const yr = y * ci - zr * si;
      zr = y * si + zr * ci;
      const f = foco / (foco + zr);
      let px = cx + xr * f, py = cy + yr * f;

      if (raio && mouse.ativo && pr >= 1) {
        const dx = px + p.ox - mouse.x, dy = py + p.oy - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < raio * raio) {
          const d = Math.sqrt(d2) || 1, forca = (1 - d / raio) * 9;
          p.ox += (dx / d) * forca; p.oy += (dy / d) * forca;
        }
      }
      p.ox *= 0.9; p.oy *= 0.9;
      px += p.ox; py += p.oy;

      if (p.c !== cor) { cor = p.c; ctx!.fillStyle = cor; }
      const s = tam * f;
      ctx!.globalAlpha = (mobile ? 0.55 : 1) * Math.min(1, 0.35 + pr * 0.65) * Math.min(1, Math.max(0.35, f));
      ctx!.fillRect(px - s / 2, py - s / 2, s, s);
    }
    ctx!.globalAlpha = 1;
    if (rodando && !reduz) raf = requestAnimationFrame(quadro);
  }

  medir();
  if (reduz) { quadro(performance.now()); }
  else raf = requestAnimationFrame(quadro);

  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = window.setTimeout(() => { medir(); if (reduz) quadro(performance.now()); }, 150);
  });

  if (!reduz) {
    const hero = cv.parentElement!;
    hero.addEventListener('pointermove', (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.ativo = true;
      mouse.nx = (mouse.x / W - 0.5) * 2; mouse.ny = (mouse.y / H - 0.5) * 2;
    });
    hero.addEventListener('pointerleave', () => { mouse.ativo = false; mouse.nx = 0; mouse.ny = 0; });

    const liga = (sim: boolean) => {
      if (sim && !rodando) { rodando = true; raf = requestAnimationFrame(quadro); }
      if (!sim && rodando) { rodando = false; cancelAnimationFrame(raf); }
    };
    new IntersectionObserver(([e]) => liga(e.isIntersecting)).observe(cv);
    document.addEventListener('visibilitychange', () => liga(!document.hidden));
  }
}
