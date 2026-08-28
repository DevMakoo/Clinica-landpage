"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { motion, MotionConfig, type Transition } from "motion/react";
import Image from "next/image";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const mapHref = clinic.address
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`
  : null;

const phoneHref = clinic.phone
  ? `tel:${clinic.phone.replace(/[^\d+]/g, "")}`
  : null;

export function Location() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="localizacao"
        aria-labelledby="location-heading"
        className="container grid gap-12 pt-18 pb-18 md:grid-cols-2 md:items-center md:gap-16 md:pt-30 md:pb-30 lg:gap-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE },
          }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-start gap-6"
        >
          <span className="text-small font-medium tracking-[0.2em] text-muted-foreground">
            ONDE ESTAMOS
          </span>

          <h2
            id="location-heading"
            className="text-h2 text-primary"
          >
            Encontre a clínica.
          </h2>

          <p className="max-w-[480px] text-body-lg text-muted-foreground">
            Confira o endereço da {clinic.name} e planeje sua visita.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 text-body text-foreground">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-gold"
              />
              <span>{clinic.address}</span>
            </div>

            {clinic.phone && (
              <div className="flex items-center gap-3 text-body text-foreground">
                <Phone
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-gold"
                />
                {phoneHref ? (
                  <a
                    href={phoneHref}
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    {clinic.phone}
                  </a>
                ) : (
                  <span>{clinic.phone}</span>
                )}
              </div>
            )}

            {clinic.email && (
              <div className="flex items-center gap-3 text-body text-foreground">
                <Mail
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-gold"
                />
                <a
                  href={`mailto:${clinic.email}`}
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {clinic.email}
                </a>
              </div>
            )}
          </div>

          {mapHref && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: EASE, delay: 0.2 },
              }}
              viewport={{ once: true, amount: 0.6 }}
            >
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body font-medium text-primary transition-all duration-200 hover:gap-3"
              >
                Ver no mapa
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </motion.div>
          )}
        </motion.div>

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
          <span
            aria-hidden="true"
            className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-lg border border-gold/40 md:block"
          />

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-surface shadow-soft md:aspect-[16/12]">
            <Image
              src={clinic.images.location.src}
              alt={clinic.images.location.alt}
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
