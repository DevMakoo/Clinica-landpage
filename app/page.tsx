import { Navbar } from "@/components/clinic/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container section-y pt-32 md:pt-40">
        <p className="text-body text-muted-foreground">
          Hero, Especialidades e demais seções serão adicionadas em breve.
        </p>
      </main>
    </>
  );
}
