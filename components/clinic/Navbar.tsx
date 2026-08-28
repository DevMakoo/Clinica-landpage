"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { clinic } from "@/data/clinic";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#a-clinica", label: "A Clínica" },
  { href: "#equipe", label: "Equipe" },
  { href: "#faq", label: "FAQ" },
];

const whatsappHref = `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-[16px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="container flex items-center justify-between py-5"
        aria-label="Navegação principal"
      >
        <Link
          href="/"
          className="font-heading text-xl text-primary md:text-2xl"
        >
          {clinic.name}
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-small font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark lg:inline-flex"
        >
          Agendar consulta <span aria-hidden>→</span>
        </a>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:text-primary lg:hidden"
          >
            <Menu aria-hidden className="size-6" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/30 opacity-100 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
            <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm translate-x-0 flex-col gap-8 bg-background px-8 py-8 shadow-soft transition-transform duration-300 data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full lg:hidden">
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg text-primary">
                  {clinic.name}
                </span>
                <Dialog.Close
                  aria-label="Fechar menu"
                  className="inline-flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:text-primary"
                >
                  <X aria-hidden className="size-6" />
                </Dialog.Close>
              </div>

              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-h3 text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-body font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Agendar consulta <span aria-hidden>→</span>
              </a>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </nav>
    </header>
  );
}
