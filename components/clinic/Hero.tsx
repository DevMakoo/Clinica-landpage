"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Transition } from "motion/react";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const whatsappHref = `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`;

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="inicio"
        aria-labelledby="hero-heading"
        className="container grid gap-12 pt-28 pb-18 md:grid-cols-2 md:items-center md:gap-16 md:pt-36 md:pb-30 lg:gap-20"
      >
        <div className="flex flex-col items-start gap-6 md:gap-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE },
            }}
            className="flex items-center gap-3 text-small font-medium tracking-[0.2em] text-muted-foreground"
          >
            <span aria-hidden className="h-px w-8 bg-gold" />
            CLÍNICA • CUIDADO ESPECIALIZADO
          </motion.span>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE, delay: 0.1 },
            }}
            className="text-h1 text-primary"
          >
            Cuidado que começa com confiança.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE, delay: 0.2 },
            }}
            className="max-w-[520px] text-body-lg text-muted-foreground"
          >
            Atendimento especializado, tecnologia e acolhimento para cuidar de
            você.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE, delay: 0.3 },
            }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 text-body font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Agendar consulta <span aria-hidden>→</span>
            </a>
            <Link
              href="#a-clinica"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-7 py-3.5 text-body font-medium text-primary transition-colors duration-200 hover:border-primary"
            >
              Conhecer a clínica
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE, delay: 0.4 },
            }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-muted-foreground"
          >
            <li>Atendimento personalizado</li>
            <li aria-hidden>•</li>
            <li>Equipe especializada</li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: EASE, delay: 0.15 },
          }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-surface shadow-soft md:aspect-[3/4]"
        >
          <Image
            src={clinic.images.hero.src}
            alt={clinic.images.hero.alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
