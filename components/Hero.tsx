"use client";
import type { CSSProperties } from "react";
import Shot from "./Shot";
import Viewfinder from "./Viewfinder";
import { usePlay } from "./LightboxProvider";

const ln = (i: number): CSSProperties => ({ ["--i" as string]: i });

export default function Hero() {
  const play = usePlay();
  return (
    <section className="hero" id="topo" data-sec="Início">
      <div
        className="hero-frame"
        id="frame"
        aria-label="Assistir showreel 2026"
        {...play({ title: "Showreel 2026", seed: 7, video: "" })}
      >
        <Shot seed={7} />
        <Viewfinder spec="4:5 · 4K · 24" />
      </div>

      <h1 className="display hero-h" aria-label="Histórias em 24 quadros.">
        <span className="ln" style={ln(0)} data-sp="-.05"><span>Histórias</span></span>
        <span className="ln" style={ln(1)} data-sp=".07">
          <span>em 24{" "}<span className="chip"><b>120+</b>projetos<br />entregues</span></span>
        </span>
        <span className="ln" style={ln(2)} data-sp="-.03"><span>quadros.</span></span>
      </h1>

      <div className="hero-foot">
        <p>Videomaker e cineasta. Filmo casamentos, marcas e eventos com luz natural, som limpo e montagem no ritmo certo.</p>
        <div className="sc lbl"><i />Role para ver o trabalho</div>
      </div>
    </section>
  );
}
