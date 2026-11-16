"use client";
import { useState } from "react";
import { cards, filters, reels } from "@/lib/data";
import Shot from "./Shot";
import { usePlay } from "./LightboxProvider";
import ReelsTrack from "./ReelsTrack";

export default function Work() {
  const play = usePlay();
  const [f, setF] = useState("todos");
  const [n, setN] = useState(0); // reinicia a animação "fade" a cada clique
  const vis = cards.filter((c) => f === "todos" || c.cat === f);

  return (
    <section className="work" id="trabalhos" data-sec="Trabalhos">
      <div className="wrap">
        <h2 className="display light rv">Trabalhos<span className="sq" />26</h2>
        <div className="work-bar">
          <span className="lbl">[ Selecionados, toque para assistir ]</span>
          <div className="chips" id="chips" role="tablist" aria-label="Filtrar por categoria">
            {filters.map((x) => (
              <button
                key={x.f}
                type="button"
                role="tab"
                aria-selected={f === x.f}
                data-f={x.f}
                onClick={() => { setF(x.f); setN((v) => v + 1); }}
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>
        <div className="ruler" aria-hidden="true" />

        <div className="cards" id="cards">
          {vis.map((c, i) => (
            <div
              key={`${c.seed}-${n}`}
              className={`card${i % 2 === 1 ? " b" : ""}${n > 0 ? " fade" : ""}`}
              data-cat={c.cat}
              {...play({ title: c.title, seed: c.seed, video: c.video })}
            >
              <div className="thumb">
                <Shot seed={c.seed} scope />
                <span className="idx">{String(cards.indexOf(c) + 1).padStart(2, "0")}</span>
                <span className="dur">{c.dur}</span>
                <span className="ring">{"▶\uFE0E"}</span>
                <span className="vfc"><i /><i /><i /><i /></span>
              </div>
              <div className="meta">
                <h3>{c.title}</h3>
                <ul>{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>

        <ReelsTrack reels={reels} />
      </div>
    </section>
  );
}
