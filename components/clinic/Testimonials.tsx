"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, MotionConfig, type Transition } from "motion/react";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

export function Testimonials() {
  const testimonials = clinic.testimonials;
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[index];
  const hasMultiple = testimonials.length > 1;

  function goToPrevious() {
    setIndex((previousIndex) => (previousIndex - 1 + testimonials.length) % testimonials.length);
  }

  function goToNext() {
    setIndex((previousIndex) => (previousIndex + 1) % testimonials.length);
  }

  function handleControlsKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="depoimentos"
        aria-labelledby="testimonials-heading"
        className="container pt-18 pb-18 md:pt-30 md:pb-30"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASE },
          }}
          viewport={{ once: true, amount: 0.6 }}
          className="flex flex-col gap-4 md:max-w-2xl"
        >
          <span className="text-small font-medium tracking-[0.2em] text-muted-foreground">
            DEPOIMENTOS
          </span>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE, delay: 0.1 },
            }}
            viewport={{ once: true, amount: 0.6 }}
            className="text-h2 text-primary"
          >
            O cuidado que permanece.
          </motion.h2>
          <p className="text-body-lg text-muted-foreground">
            Histórias de quem confia na {clinic.name} para cuidar da própria saúde.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE, delay: 0.2 },
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-12 overflow-hidden rounded-xl border border-border bg-surface p-8 shadow-soft md:mt-16 md:p-16"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-2 select-none font-heading text-[6rem] leading-none text-gold/30 md:left-10 md:top-4 md:text-[8rem]"
          >
            &ldquo;
          </span>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="font-heading text-[24px] font-medium leading-[1.35] text-foreground md:text-[34px]">
                  {current.quote}
                </p>

                <footer className="mt-8 flex flex-col gap-0.5">
                  <span className="text-body font-medium text-primary">
                    {current.author}
                  </span>
                  {current.role && (
                    <span className="text-small text-muted-foreground">
                      {current.role}
                    </span>
                  )}
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {hasMultiple && (
              <div
                onKeyDown={handleControlsKeyDown}
                className="mt-10 flex items-center gap-6"
              >
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Depoimento anterior"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary transition-colors duration-200 hover:bg-muted focus-visible:outline-none"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                <span
                  className="text-small tabular-nums text-muted-foreground"
                  aria-live="polite"
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Próximo depoimento"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary transition-colors duration-200 hover:bg-muted focus-visible:outline-none"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
