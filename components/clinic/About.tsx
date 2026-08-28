"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig, type Transition } from "motion/react";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

export function About() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="a-clinica"
        aria-labelledby="about-heading"
        className="container grid gap-12 pt-18 pb-18 md:grid-cols-2 md:items-center md:gap-16 md:pt-30 md:pb-30 lg:gap-24"
      >
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE },
            }}
            viewport={{ once: true, amount: 0.6 }}
            className="text-small font-medium tracking-[0.2em] text-muted-foreground"
          >
            A CLÍNICA
          </motion.span>

          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE, delay: 0.1 },
            }}
            viewport={{ once: true, amount: 0.5 }}
            className="font-heading text-[36px] font-medium leading-[1.1] text-primary md:text-[56px] md:leading-[1.08]"
          >
            Um espaço criado para cuidar de você.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE, delay: 0.2 },
            }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-[520px] text-base leading-[1.6] text-muted-foreground md:text-[18px]"
          >
            Um ambiente pensado para unir atendimento especializado,
            tecnologia e acolhimento em cada etapa da sua jornada na{" "}
            {clinic.name}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE, delay: 0.3 },
            }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Link
              href="#equipe"
              className="inline-flex items-center gap-2 text-body font-medium text-primary transition-all duration-200 hover:gap-3"
            >
              Conhecer a equipe <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: EASE, delay: 0.15 },
          }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative"
        >
          {/*
            Pequeno detalhe editorial assimétrico atrás do painel principal.
            Puramente decorativo (aria-hidden).
          */}
          <span
            aria-hidden
            className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-lg border border-gold/40 md:block"
          />

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
            <Image
              src={clinic.images.about.src}
              alt={clinic.images.about.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
