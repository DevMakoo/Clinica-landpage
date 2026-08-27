"use client";

import { motion, MotionConfig, type Transition } from "motion/react";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const whatsappNumber = clinic.whatsapp.replace(/\D/g, "");
const whatsappMessage = "Olá, gostaria de agendar uma consulta.";
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export function CTA() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contato"
        aria-labelledby="cta-heading"
        className="relative overflow-hidden bg-primary py-18 md:py-30"
      >
        <div className="container flex flex-col items-center gap-5 text-center md:gap-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE },
            }}
            viewport={{ once: true, amount: 0.6 }}
            className="flex items-center gap-3 text-small font-medium tracking-[0.2em] text-primary-foreground/70"
          >
            <span aria-hidden className="h-px w-8 bg-gold" />
            PRONTO PARA CUIDAR
          </motion.span>

          <motion.h2
            id="cta-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE, delay: 0.1 },
            }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-3xl font-heading text-[38px] font-medium leading-[1.1] text-primary-foreground md:text-[56px] md:leading-[1.08]"
          >
            O próximo passo começa com uma conversa.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE, delay: 0.2 },
            }}
            viewport={{ once: true, amount: 0.6 }}
            className="max-w-xl text-[17px] leading-[1.6] text-primary-foreground/80 md:text-[18px]"
          >
            Encontre o melhor caminho para o seu atendimento.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.5, ease: EASE, delay: 0.3 },
            }}
            viewport={{ once: true, amount: 0.6 }}
            className="mt-2"
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gold px-8 py-4 text-body font-medium text-primary transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-gold/90 focus-visible:outline-primary-foreground"
            >
              Falar pelo WhatsApp <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
