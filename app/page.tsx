import { Navbar } from "@/components/clinic/Navbar";
import { Hero } from "@/components/clinic/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <p className="container section-y text-body text-muted-foreground">
          Especialidades e demais seções serão adicionadas em breve.
        </p>
      </main>
    </>
  );
}
