import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import LightboxProvider from "@/components/LightboxProvider";
import ScrollEffects from "@/components/ScrollEffects";
import { About, Clients, Contact, Header, Marquee, Services } from "@/components/Sections";
import SiteChrome from "@/components/SiteChrome";
import Work from "@/components/Work";

export default function Home() {
  return (
    <LightboxProvider>
      <div className="cols" aria-hidden="true" />
      <Cursor />
      <Header />
      <SiteChrome />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Clients />
        <Contact />
      </main>
      <ScrollEffects />
    </LightboxProvider>
  );
}
