"use client";
import { useEffect, useState } from "react";
import { sectionNames, sections } from "@/lib/data";

const p2 = (n: number) => (n < 10 ? "0" : "") + n;
const links = [
  { k: "topo", label: "Início" },
  { k: "sobre", label: "Sobre" },
  { k: "trabalhos", label: "Trabalhos" },
  { k: "servicos", label: "Serviços" },
];

/** Trilho de progresso + dock flutuante (compartilham a seção ativa). */
export default function SiteChrome() {
  const [cur, setCur] = useState("topo");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const so = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && sections.includes(e.target.id)) setCur(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const e = document.getElementById(id);
      if (e) so.observe(e);
    });
    return () => so.disconnect();
  }, []);

  const toggleTheme = () => {
    const R = document.documentElement;
    R.setAttribute("data-theme", R.getAttribute("data-theme") === "dark" ? "light" : "dark");
  };
  const i = Math.max(sections.indexOf(cur), 0);

  return (
    <>
      <aside className="rail" aria-hidden="true">
        <div className="rt"><i id="railFill" /></div>
        <span className="rl" id="railLabel">{p2(i + 1)} / 05 {sectionNames[i]}</span>
      </aside>

      <nav className="dock" aria-label="Principal">
        {links.map((l) => (
          <a key={l.k} className={`nv${cur === l.k ? " on" : ""}`} data-k={l.k} href={`#${l.k}`}>{l.label}</a>
        ))}
        <button className="theme" id="theme" type="button" aria-label="Alternar entre tema claro e escuro" onClick={toggleTheme}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
          </svg>
        </button>
        <a className="cta" href="#contato"><span className="av">RS</span>Vamos conversar</a>
      </nav>
    </>
  );
}
