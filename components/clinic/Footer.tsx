"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { motion, MotionConfig, type Transition } from "motion/react";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const FOOTER_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#a-clinica", label: "A Clínica" },
  { href: "#equipe", label: "Equipe" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
  { href: "#localizacao", label: "Localização" },
];

const whatsappHref = `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`;
const phoneHref = `tel:${clinic.phone.replace(/[^\d+]/g, "")}`;

const socialLinks = (
  [
    clinic.social.instagram && { label: "Instagram", href: clinic.social.instagram },
    clinic.social.facebook && { label: "Facebook", href: clinic.social.facebook },
    clinic.social.linkedin && { label: "LinkedIn", href: clinic.social.linkedin },
  ] as const
).filter((link): link is { label: string; href: string } => Boolean(link));

const focusRing = "focus-visible:outline-primary-foreground";

export function Footer() {
  return (
    <MotionConfig reducedMotion="user">
      <footer className="bg-primary-dark text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE },
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="container grid grid-cols-1 gap-10 pt-18 pb-12 md:grid-cols-3 md:gap-12 md:pt-30 md:pb-16"
        >
          <div className="flex flex-col gap-3">
            <span className="font-heading text-xl text-primary-foreground">
              {clinic.name}
            </span>
            {clinic.tagline && (
              <p className="max-w-[280px] text-body text-primary-foreground/70">
                {clinic.tagline}
              </p>
            )}
            {clinic.specialty && (
              <span className="text-small text-primary-foreground/50">
                {clinic.specialty}
              </span>
            )}
          </div>

          <nav aria-label="Links do rodapé" className="flex flex-col gap-3">
            <span className="text-small font-medium tracking-[0.2em] text-primary-foreground/50">
              NAVEGAÇÃO
            </span>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-body text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-small font-medium tracking-[0.2em] text-primary-foreground/50">
              CONTATO
            </span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-body text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground ${focusRing}`}
                >
                  WhatsApp
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a
                  href={phoneHref}
                  className={`text-body text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground ${focusRing}`}
                >
                  {clinic.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clinic.email}`}
                  className={`text-body text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground ${focusRing}`}
                >
                  {clinic.email}
                </a>
              </li>
              <li className="text-body text-primary-foreground/80">
                {clinic.address}
              </li>
            </ul>

            {socialLinks.length > 0 && (
              <ul className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 text-small text-primary-foreground/60 transition-colors duration-200 hover:text-primary-foreground ${focusRing}`}
                    >
                      {social.label}
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>

        <div className="border-t border-primary-foreground/10">
          <div className="container flex flex-col items-center gap-4 py-6 text-center md:flex-row md:justify-between md:text-left">
            <span className="text-small text-primary-foreground/50">
              © 2026 {clinic.name}
            </span>

            <a
              href="#inicio"
              className={`group inline-flex items-center gap-2 text-small font-medium text-primary-foreground/70 transition-colors duration-200 hover:text-primary-foreground ${focusRing}`}
            >
              Voltar ao topo
              <ArrowUp
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}
