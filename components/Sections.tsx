import { Fragment } from "react";
import { clients, marquee, services } from "@/lib/data";
import Clock from "./Clock";

const ABOUT =
  "Filmo casamentos, marcas e eventos com *olhar de cinema* e o ritmo de quem entrega no prazo. Cada plano nasce da luz, do silêncio e do *instante que não volta*.";

export function Header() {
  return (
    <header className="top">
      <a className="brand" href="#topo" aria-label="Raphael Silva, início">
        <b>Raphael Silva</b>
        <span>Videomaker &amp; Cineasta</span>
      </a>
      <div className="clock"><i />São Paulo <span><Clock /></span></div>
    </header>
  );
}

export function Marquee() {
  const item = (
    <div className="it">
      {marquee.map((m) => (
        <Fragment key={m}><span>{m}</span><em>●</em></Fragment>
      ))}
    </div>
  );
  return (
    <div className="marq" aria-hidden="true">
      <div className="tr" id="marq">{item}{item}</div>
    </div>
  );
}

export function About() {
  const words = ABOUT.split("*").flatMap((part, idx) =>
    part.split(/(\s+)/).filter(Boolean).map((tok, j) =>
      /^\s+$/.test(tok) ? " " : <span key={`${idx}-${j}`} className={`w${idx % 2 ? " s" : ""}`}>{tok}</span>
    )
  );
  return (
    <section className="about" id="sobre" data-sec="Sobre">
      <div className="wrap grid grid-cols-12">
        <p className="lbl">[ Sobre ]</p>
        <div className="about-main">
          <p className="words" id="words">{words}</p>
          <div className="stats">
            <div className="stat rv"><b data-to="8" data-pad="2">08</b><span className="lbl">Anos de estrada</span></div>
            <div className="stat rv"><b data-to="120" data-suf="+">120+</b><span className="lbl">Projetos entregues</span></div>
            <div className="stat rv"><b>4K·60</b><span className="lbl">Padrão de captação</span></div>
            <div className="stat rv"><b data-to="48" data-suf="h">48h</b><span className="lbl">Teaser no ar</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="serv" id="servicos" data-sec="Serviços">
      <div className="thread" aria-hidden="true">
        <svg viewBox="0 0 1000 760" preserveAspectRatio="xMidYMin meet">
          <path id="thr" pathLength="1000" d="M-20 60 C 240 -10, 430 190, 330 330 S 80 520, 400 610 S 860 560, 790 700 S 1010 740, 1040 770" />
        </svg>
        <i className="dot" id="thrDot" />
      </div>
      <div className="wrap">
        <p className="lbl">[ O que eu faço ]</p>
        <ol className="rows">
          {services.map((s, i) => (
            <li key={s.t} className="row rv">
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
              <span className="go">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Clients() {
  return (
    <section className="clients" data-sec="Clientes">
      <div className="wrap">
        <p className="lbl">[ Já filmei para ]</p>
        <div className="orbs rv">
          {clients.map((c) => <span key={c} className="orb">{c}</span>)}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contato" data-sec="Contato">
      <div className="cols2" aria-hidden="true" />
      <div className="wrap">
        <h2 className="display light rv">Vamos filmar<span className="sq" /></h2>
        <div className="c-row">
          <p>Tem um projeto em mente? Conte o que você precisa e eu respondo em até 24 horas.</p>
          <div className="mail">
            <a className="big" href="mailto:contato@seudominio.com.br">contato@seudominio.com.br</a>
            <div className="soc">
              <a href="#contato">Instagram</a><a href="#contato">Vimeo</a><a href="#contato">YouTube</a><a href="#contato">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="c-foot">
          <span>São Paulo, SP · <b className="font-normal"><Clock /></b></span>
          <span>23°33&apos;02&quot; S · 46°38&apos;00&quot; O</span>
          <span>© 2026 Raphael Silva</span>
        </div>
      </div>
    </section>
  );
}
