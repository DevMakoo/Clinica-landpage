"use client";

import { motion, MotionConfig, type Transition } from "motion/react";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");
}

export function Team() {
  const [featured, ...secondary] = clinic.professionals;

  if (!featured) {
    return null;
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="equipe"
        aria-labelledby="team-heading"
        className="container pt-18 pb-18 md:pt-30 md:pb-30"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE },
          }}
          viewport={{ once: true, amount: 0.6 }}
          className="flex flex-col gap-4 md:max-w-2xl"
        >
          <span className="text-small font-medium tracking-[0.2em] text-muted-foreground">
            EQUIPE
          </span>
          <h2 id="team-heading" className="text-h2 text-primary">
            Profissionais que cuidam de cada detalhe.
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Conheça quem acompanha de perto o seu cuidado na {clinic.name}.
          </p>
        </motion.div>

        <div
          className={`mt-12 grid grid-cols-1 gap-8 md:mt-16 ${
            secondary.length > 0 ? "md:grid-cols-5 md:gap-12" : ""
          }`}
        >
          <motion.article
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.7, ease: EASE },
            }}
            viewport={{ once: true, amount: 0.3 }}
            className={secondary.length > 0 ? "md:col-span-3" : "max-w-md"}
          >
            <motion.div
              initial="rest"
              whileHover="hover"
              variants={{
                rest: { scale: 1 },
                hover: {
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              role="img"
              aria-label={`Espaço reservado para fotografia de ${featured.name}`}
              className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-soft"
            >
              <span
                aria-hidden
                className="font-heading text-[5rem] text-primary/15"
              >
                {initials(featured.name)}
              </span>
            </motion.div>

            <div className="mt-6 flex flex-col gap-2">
              <h3 className="text-h3 text-primary">{featured.name}</h3>
              <p className="text-body text-muted-foreground">
                {featured.role}
              </p>
              {featured.bio && (
                <p className="mt-2 max-w-md text-small text-muted-foreground">
                  {featured.bio}
                </p>
              )}
            </div>
          </motion.article>

          {secondary.length > 0 && (
            <div className="flex flex-col gap-10 md:col-span-2 md:justify-center">
              {secondary.map((professional, index) => (
                <motion.article
                  key={professional.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: EASE,
                      delay: 0.1 * (index + 1),
                    },
                  }}
                  viewport={{ once: true, amount: 0.4 }}
                  className="flex items-center gap-5"
                >
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={{
                      rest: { scale: 1 },
                      hover: {
                        scale: 1.03,
                        transition: { duration: 0.4, ease: "easeOut" },
                      },
                    }}
                    role="img"
                    aria-label={`Espaço reservado para fotografia de ${professional.name}`}
                    className="flex aspect-[3/4] w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-soft sm:w-28"
                  >
                    <span
                      aria-hidden
                      className="font-heading text-2xl text-primary/15"
                    >
                      {initials(professional.name)}
                    </span>
                  </motion.div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-body-lg font-medium text-primary">
                      {professional.name}
                    </h3>
                    <p className="text-body text-muted-foreground">
                      {professional.role}
                    </p>
                    {professional.bio && (
                      <p className="text-small text-muted-foreground">
                        {professional.bio}
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
