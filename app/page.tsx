import { Navbar } from "@/components/clinic/Navbar";
import { Hero } from "@/components/clinic/Hero";
import { Services } from "@/components/clinic/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <p className="container section-y text-body text-muted-foreground">
          Demais seções serão adicionadas em breve.
        </p>
      </main>
    </>
  );
}
