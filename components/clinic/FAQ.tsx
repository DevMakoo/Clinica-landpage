"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import { motion, MotionConfig, type Transition } from "motion/react";
import { clinic } from "@/data/clinic";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

function joinWithAnd(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

const specialtiesList = joinWithAnd(clinic.services.map((service) => service.name));
const hoursList = clinic.hours
  .map((entry) => `${entry.day}: ${entry.open} às ${entry.close}`)
  .join(" · ");

const faqItems = [
  {
    id: "agendamento",
    question: "Como posso agendar uma consulta?",
    answer: `Você pode agendar pelo WhatsApp (${clinic.whatsapp}), por telefone (${clinic.phone}) ou por e-mail em ${clinic.email}.`,
  },
  {
    id: "especialidades",
    question: "Quais especialidades estão disponíveis?",
    answer: `A ${clinic.name} atende nas áreas de ${specialtiesList}.`,
  },
  {
    id: "whatsapp",
    question: "A clínica atende pelo WhatsApp?",
    answer: `Sim. Você pode entrar em contato pelo WhatsApp: ${clinic.whatsapp}.`,
  },
  {
    id: "horario",
    question: "Qual o horário de atendimento?",
    answer: hoursList,
  },
  {
    id: "endereco",
    question: "Onde fica a clínica?",
    answer: clinic.address,
  },
];

export function FAQ() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="faq"
        aria-labelledby="faq-heading"
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
          className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          <span className="text-small font-medium tracking-[0.2em] text-muted-foreground">
            DÚVIDAS FREQUENTES
          </span>
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE, delay: 0.1 },
            }}
            viewport={{ once: true, amount: 0.6 }}
            className="text-h2 text-primary"
          >
            Antes da sua consulta, algumas respostas.
          </motion.h2>
          <p className="text-body-lg text-muted-foreground">
            Reunimos as informações mais importantes para facilitar o seu
            primeiro contato com a {clinic.name}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: EASE, delay: 0.2 },
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-12 max-w-2xl md:mt-16"
        >
          <Accordion.Root className="flex flex-col">
            {faqItems.map((item, index) => (
              <Accordion.Item
                key={item.id}
                value={item.id}
                className={`border-b border-border ${index === 0 ? "border-t" : ""}`}
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 bg-transparent py-6 text-left md:py-7">
                    <span className="text-[18px] font-medium text-primary">
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-data-[panel-open]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-all duration-300 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                  <p className="pb-6 text-body leading-[1.6] text-muted-foreground md:pb-7">
                    {item.answer}
                  </p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
