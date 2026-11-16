export type Item = { title: string; seed: number; video: string };

export const filters = [
  { f: "todos", label: "Todos" },
  { f: "casamento", label: "Casamento" },
  { f: "comercial", label: "Comercial" },
  { f: "evento", label: "Eventos" },
  { f: "doc", label: "Documentário" },
  { f: "drone", label: "Drone" },
];

// Para trocar o vídeo: preencha `video` com a URL de embed (YouTube/Vimeo).
export const cards = [
  { cat: "casamento", video: "", title: "Ana & Pedro, Itatiba", seed: 11, dur: "02:14", tags: ["Casamento", "4K · 24p", "Gimbal", "2025"] },
  { cat: "comercial", video: "", title: "Cervejaria Aurora, campanha", seed: 23, dur: "00:45", tags: ["Comercial", "6K", "Produto", "Color"] },
  { cat: "evento", video: "", title: "Festival Nova Luz, aftermovie", seed: 31, dur: "03:02", tags: ["Evento", "Multicâmera", "60 fps", "Som direto"] },
  { cat: "doc", video: "", title: "Mãos de Barro, mini doc", seed: 47, dur: "08:30", tags: ["Documentário", "24p", "Entrevista", "Edição"] },
  { cat: "drone", video: "", title: "Serra Acima, aéreas", seed: 59, dur: "01:20", tags: ["Drone", "4K", "FPV", "Nascer do sol"] },
  { cat: "comercial", video: "", title: "Studio Linha, lançamento", seed: 71, dur: "01:05", tags: ["Comercial", "Macro", "Motion", "2026"] },
];

export const reels = [
  { video: "", title: "Making of da noiva", seed: 83, cat: "Casamento" },
  { video: "", title: "Show ao vivo", seed: 97, cat: "Eventos" },
  { video: "", title: "Aurora, 15 segundos", seed: 103, cat: "Comercial" },
  { video: "", title: "Pôr do sol em FPV", seed: 113, cat: "Drone" },
  { video: "", title: "Bastidores Nova Luz", seed: 127, cat: "Eventos" },
  { video: "", title: "Mãos de Barro, teaser", seed: 131, cat: "Documentário" },
];

export const services = [
  { t: "Casamentos", p: "Cobertura do making of à pista de dança, com teaser pronto em 48 horas." },
  { t: "Filmes comerciais", p: "Roteiro, captação e finalização para marcas que querem ser lembradas." },
  { t: "Eventos e shows", p: "Multicâmera, aftermovie e cortes verticais para redes no mesmo dia." },
  { t: "Documentário", p: "Histórias reais com som direto, entrevista e fotografia contida." },
  { t: "Drone e aéreas", p: "Planos aéreos em 4K e passagens FPV para dar escala à narrativa." },
];

export const clients = ["Aurora", "Nova Luz", "Linha", "Barro", "Serra", "Cobalto"];

export const marquee = ["Casamentos", "Comerciais", "Eventos", "Documentário", "Drone", "Color grading"];

export const sections = ["topo", "sobre", "trabalhos", "servicos", "contato"];
export const sectionNames = ["Início", "Sobre", "Trabalhos", "Serviços", "Contato"];
