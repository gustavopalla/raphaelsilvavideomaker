/* Imagens de exemplo (bokeh cinematográfico), geradas de forma determinística */
function rng(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function background(seed: number) {
  const r = rng(seed * 9973 + 17);
  const L: string[] = [];
  const n = 8 + Math.floor(r() * 7);
  for (let i = 0; i < n; i++) {
    const x = r() * 100, y = r() * 100, s = 2.5 + r() * 10, a = 0.12 + r() * 0.5;
    L.push(
      `radial-gradient(circle at ${x.toFixed(1)}% ${y.toFixed(1)}%,rgba(255,255,255,${a.toFixed(2)}) 0,rgba(255,255,255,${(a * 0.75).toFixed(2)}) ${(s * 0.7).toFixed(1)}%,rgba(255,255,255,0) ${s.toFixed(1)}%)`
    );
  }
  const lx = 15 + r() * 70, ly = 10 + r() * 60;
  L.push(
    `radial-gradient(ellipse at ${lx.toFixed(0)}% ${ly.toFixed(0)}%,rgba(255,255,255,${(0.28 + r() * 0.3).toFixed(2)}) 0,rgba(255,255,255,0) 58%)`
  );
  const c1 = Math.round(34 + r() * 40), c2 = Math.round(6 + r() * 10);
  L.push(`linear-gradient(${Math.round(120 + r() * 100)}deg,rgb(${c1},${c1},${c1}),rgb(${c2},${c2},${c2}))`);
  return L.join(",");
}

export default function Shot({ seed, scope = false }: { seed: number; scope?: boolean }) {
  return (
    <div className={`shot${scope ? " scope" : ""}`} data-seed={seed}>
      <div className="bk" style={{ background: background(seed) }} />
    </div>
  );
}
