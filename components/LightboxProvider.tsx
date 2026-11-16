"use client";
import { createContext, KeyboardEvent, MouseEvent, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Item } from "@/lib/data";
import Shot from "./Shot";
import Viewfinder from "./Viewfinder";

type Ctx = { open: (item: Item, el: HTMLElement) => void };
const LB = createContext<Ctx>({ open: () => {} });

/** Props para tornar um elemento "clicável para assistir" (clique, Enter e Espaço). */
export function usePlay() {
  const { open } = useContext(LB);
  return (item: Item, guard?: () => boolean) => ({
    role: "button" as const,
    tabIndex: 0,
    "data-cursor": "ASSISTIR",
    onClick: (e: MouseEvent<HTMLElement>) => {
      if (guard && guard()) return;
      open(item, e.currentTarget);
    },
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
        e.preventDefault();
        open(item, e.currentTarget);
      }
    },
  });
}

export default function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<Item | null>(null);
  const last = useRef<HTMLElement | null>(null);
  const x = useRef<HTMLButtonElement>(null);

  const open = useCallback((it: Item, el: HTMLElement) => {
    last.current = el;
    setItem(it);
  }, []);
  const close = useCallback(() => {
    setItem(null);
    last.current?.focus();
  }, []);

  useEffect(() => {
    if (!item) return;
    document.body.classList.add("lock");
    x.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("lock");
      document.removeEventListener("keydown", onKey);
    };
  }, [item, close]);

  return (
    <LB.Provider value={{ open }}>
      {children}
      {item && (
        <div
          className="lb"
          id="lb"
          role="dialog"
          aria-modal="true"
          aria-label="Player de vídeo"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button className="x" id="lbx" type="button" ref={x} onClick={close}>Fechar ✕</button>
          <div className="stage" id="stage">
            {item.video ? (
              <iframe src={item.video} title={item.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            ) : (
              <>
                <Shot seed={item.seed} scope />
                <Viewfinder spec="16:9 · 4K · 24" />
                <p className="ph">Exemplo visual. Para exibir o vídeo real, preencha o atributo data-video deste item com o link de embed.</p>
              </>
            )}
          </div>
          <p className="cap" id="lbt">{item.title}</p>
        </div>
      )}
    </LB.Provider>
  );
}
