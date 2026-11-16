import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raphael Silva, Videomaker",
  description:
    "Portfólio de Raphael Silva, videomaker e cineasta. Casamentos, filmes comerciais, eventos, documentário e drone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="js" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
