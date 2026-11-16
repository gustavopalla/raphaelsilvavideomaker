"use client";
import { useEffect, useState } from "react";

const fmt = () =>
  new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });

export default function Clock() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = fmt();
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <>{t}</>;
}
