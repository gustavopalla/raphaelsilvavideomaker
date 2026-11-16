"use client";
import { useEffect, useRef } from "react";
import type { Item } from "@/lib/data";
import Shot from "./Shot";
import { usePlay } from "./LightboxProvider";

type Reel = Item & { cat: string };

export default function ReelsTrack({ reels }: { reels: Reel[] }) {
  const play = usePlay();
  const track = useRef<HTMLDivElement>(null);
  const moved = useRef(0);

  const step = (d: number) => {
    const t = track.current!;
    const w = t.querySelector<HTMLElement>(".reel")!.offsetWidth + 16;
    t.scrollBy({ left: d * w * 1.5, behavior: "smooth" });
  };

  useEffect(() => {
    const t = track.current!;
    let down = false, sx = 0, sl = 0, m = 0;
    const pd = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true; m = 0; sx = e.clientX; sl = t.scrollLeft;
    };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - sx;
      m = Math.max(m, Math.abs(dx));
      if (m > 6) t.classList.add("drag");
      t.scrollLeft = sl - dx;
    };
    const pu = () => {
      if (!down) return;
      down = false;
      setTimeout(() => t.classList.remove("drag"), 0);
      moved.current = m;
      setTimeout(() => (moved.current = 0), 50);
    };
    t.addEventListener("pointerdown", pd);
    addEventListener("pointermove", pm);
    addEventListener("pointerup", pu);
    return () => {
      t.removeEventListener("pointerdown", pd);
      removeEventListener("pointermove", pm);
      removeEventListener("pointerup", pu);
    };
  }, []);

  return (
    <div className="reels">
      <div className="reels-head">
        <h2>Reels <span className="serif">&amp; stories</span></h2>
        <div className="arrows">
          <button type="button" id="prev" aria-label="Anterior" onClick={() => step(-1)}>←</button>
          <button type="button" id="next" aria-label="Próximo" onClick={() => step(1)}>→</button>
        </div>
      </div>
      <div className="track" id="track" ref={track}>
        {reels.map((r, i) => (
          <div key={r.seed} className="reel" {...play(r, () => moved.current > 6)}>
            <Shot seed={r.seed} />
            <span className="idx">{String(i + 1).padStart(2, "0")}</span>
            <span className="ring">{"▶\uFE0E"}</span>
            <div className="cap"><small>{r.cat}</small>{r.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
