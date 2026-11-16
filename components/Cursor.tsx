"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cur = useRef<HTMLDivElement>(null);
  const txt = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    const c = cur.current, t = txt.current;
    if (!fine || reduce || !c || !t) return;
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      c.classList.add("on");
      const h = (e.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (h) { t.textContent = h.dataset.cursor ?? ""; c.classList.add("big"); } else c.classList.remove("big");
    };
    const leave = () => c.classList.remove("on");
    addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    (function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      c.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    })();
    return () => {
      removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cur" id="cur" aria-hidden="true" ref={cur}><span id="curT" ref={txt}>VER</span></div>
  );
}
