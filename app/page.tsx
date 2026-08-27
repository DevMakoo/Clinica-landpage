import { Navbar } from "@/components/clinic/Navbar";
import { Hero } from "@/components/clinic/Hero";
import { Services } from "@/components/clinic/Services";
import { About } from "@/components/clinic/About";
import { Team } from "@/components/clinic/Team";
import { Testimonials } from "@/components/clinic/Testimonials";
import { FAQ } from "@/components/clinic/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <Testimonials />
        <FAQ />
        <p className="container section-y text-body text-muted-foreground">
          Demais seções serão adicionadas em breve.
        </p>
      </main>
    </>
  );
}
