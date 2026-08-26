"use client";

import Link from "next/link";
import { motion, MotionConfig, type Transition } from "motion/react";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const whatsappNumber = clinic.whatsapp.replace(/\D/g, "");

function serviceWhatsappHref(serviceName: string) {
  const message = `Olá, gostaria de saber mais sobre ${serviceName}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const gridColsClass =
  clinic.services.length >= 3
    ? "sm:grid-cols-2 lg:grid-cols-3"
    : clinic.services.length === 2
      ? "sm:grid-cols-2"
      : "";

export function Services() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="especialidades"
        aria-labelledby="services-heading"
        className="container pt-18 pb-18 md:pt-30 md:pb-30"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE },
          }}
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col gap-4 md:max-w-2xl"
        >
          <span className="text-small font-medium tracking-[0.2em] text-muted-foreground">
            ESPECIALIDADES
          </span>
          <h2 id="services-heading" className="text-h2 text-primary">
            Serviços pensados para o seu cuidado.
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Conheça as áreas de atendimento da {clinic.name}, combinando
            especialização médica e cuidado próximo.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className={`mt-12 grid grid-cols-1 gap-6 md:mt-16 ${gridColsClass}`}
        >
          {clinic.services.map((service, index) => (
            <motion.article
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE },
                },
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group flex flex-col gap-6 rounded-xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-primary/40"
            >
              <span className="flex flex-col gap-2">
                <span className="text-h3 text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px w-6 bg-gold" />
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="text-h3 text-primary">{service.name}</h3>
                <p className="text-body text-muted-foreground">
                  {service.description}
                </p>
              </div>

              <Link
                href={serviceWhatsappHref(service.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-body font-medium text-primary transition-all duration-200 group-hover:gap-3"
              >
                Conhecer serviço <span aria-hidden>→</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
