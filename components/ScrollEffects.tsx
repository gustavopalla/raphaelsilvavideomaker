"use client";
import { useEffect } from "react";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Revelações, contadores, parallax, texto que acende, fio SVG e marquee. */
export default function ScrollEffects() {
  useEffect(() => {
    const D = document, R = D.documentElement;
    const $ = <T extends Element = HTMLElement>(s: string) => D.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(D.querySelectorAll<T>(s));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Contadores */
    function countUp(el: HTMLElement) {
      const to = +(el.dataset.to ?? 0), pad = +(el.dataset.pad ?? 0), suf = el.dataset.suf ?? "";
      const st = performance.now(), dur = 1300;
      (function step(now: number) {
        const k = clamp((now - st) / dur, 0, 1), e = 1 - Math.pow(1 - k, 3);
        let s = String(Math.round(to * e));
        while (s.length < pad) s = "0" + s;
        el.textContent = s + suf;
        if (k < 1) requestAnimationFrame(step);
      })(st);
    }

    /* Revelações */
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("in");
            const c = e.target.querySelector<HTMLElement & { done?: number }>("[data-to]");
            if (c && !c.done && !reduce) { c.done = 1; countUp(c); }
            io!.unobserve(e.target);
          }),
        { threshold: 0.15 }
      );
      $$(".rv").forEach((e) => io!.observe(e));
    } else $$(".rv").forEach((e) => e.classList.add("in"));

    /* Loop de scroll */
    const hero = $(".hero")!, frame = $("#frame")!, lns = $$(".hero-h .ln");
    const thr = $<SVGPathElement>("#thr")!, thrDot = $("#thrDot")!, thrBox = $(".thread")!;
    const serv = $("#servicos")!, fill = $("#railFill")!, marq = $("#marq")!, wEl = $("#words")!;
    const words = $$(".words .w");
    if (reduce) words.forEach((w) => (w.style.opacity = "1"));

    const thrLen = thr.getTotalLength();
    let lastY = scrollY, vel = 0, ticking = false;
    let marqAnim: Animation | null = null;
    if (!reduce && marq.animate)
      marqAnim = marq.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], { duration: 38000, iterations: Infinity });

    function frameLoop() {
      ticking = false;
      const y = scrollY, vh = innerHeight, doc = R.scrollHeight - vh;
      fill.style.transform = `scaleY(${clamp(y / Math.max(doc, 1), 0, 1)})`;
      if (reduce) return;

      lns.forEach((l) => l.style.setProperty("--px", (y * parseFloat(l.dataset.sp ?? "0")).toFixed(1)));
      frame.style.setProperty("--py", (y * 0.12).toFixed(1));

      const wr = wEl.getBoundingClientRect();
      const p = clamp((vh * 0.85 - wr.top) / (vh * 0.35 + wr.height), 0, 1), n = words.length;
      for (let i = 0; i < n; i++) words[i].style.opacity = (0.2 + 0.8 * clamp(p * (n + 3) - i, 0, 1)).toFixed(2);

      const sr = serv.getBoundingClientRect();
      const sp = clamp((vh * 0.8 - sr.top) / (sr.height * 0.8 + vh * 0.1), 0, 1);
      thr.style.strokeDashoffset = (1000 * (1 - sp)).toFixed(1);
      const pt = thr.getPointAtLength(thrLen * sp), k = thrBox.getBoundingClientRect().width / 1000;
      thrDot.style.left = pt.x * k + "px";
      thrDot.style.top = pt.y * k + "px";
      thrDot.style.opacity = sp > 0.01 && sp < 0.995 ? "1" : "0";

      vel = y - lastY; lastY = y;
      if (marqAnim) marqAnim.playbackRate = clamp(1 + Math.abs(vel) * 0.25, 1, 9) * (vel < 0 ? -1 : 1) || 1;
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(frameLoop); }
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    const iv = setInterval(() => {
      if (marqAnim && Math.abs(vel) < 1) marqAnim.playbackRate = 1;
      vel *= 0.5;
    }, 120);
    frameLoop();

    return () => {
      io?.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      clearInterval(iv);
      marqAnim?.cancel();
    };
  }, []);

  return null;
}
