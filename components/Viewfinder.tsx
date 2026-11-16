"use client";
import { useEffect, useRef } from "react";

const p2 = (n: number) => (n < 10 ? "0" : "") + n;
const t0 = typeof performance !== "undefined" ? performance.now() : 0;

export default function Viewfinder({ spec = "16:9 · 4K · 24" }: { spec?: string }) {
  const tc = useRef<HTMLElement>(null);
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    (function tick() {
      const f = Math.floor(((performance.now() - t0) / 1000) * 24);
      const fr = f % 24, s = Math.floor(f / 24), m = Math.floor(s / 60), h = Math.floor(m / 60);
      if (tc.current) tc.current.textContent = `${p2(h)}:${p2(m % 60)}:${p2(s % 60)}:${p2(fr)}`;
      id = setTimeout(tick, 80);
    })();
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="vf">
      <i className="c tl" /><i className="c tr" /><i className="c bl" /><i className="c br" />
      <span className="tc">TC <b ref={tc}>00:00:00:00</b></span>
      <span className="rec"><i />REC</span>
      <span className="af" />
      <span className="mic">MIC <u><s /><s /><s /><s /><s /></u></span>
      <span className="spec">{spec}</span>
      <span className="play">{"▶\uFE0E"} Showreel 26</span>
    </div>
  );
}
