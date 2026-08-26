import { Navbar } from "@/components/clinic/Navbar";
import { Hero } from "@/components/clinic/Hero";
import { Services } from "@/components/clinic/Services";
import { About } from "@/components/clinic/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <p className="container section-y text-body text-muted-foreground">
          Demais seções serão adicionadas em breve.
        </p>
      </main>
    </>
  );
}
