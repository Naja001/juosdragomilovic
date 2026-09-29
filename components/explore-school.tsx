"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, Images, Leaf } from "lucide-react";

const cards = [
  {
    title: "Eko škola",
    description:
      "Projekti i aktivnosti kojima razvijamo svijest o očuvanju prirode i životne sredine.",
    action: "Pogledaj aktivnosti",
    href: "/eco-school",
    icon: Leaf,
    number: "01",
  },
  {
    title: "Galerija",
    description:
      "Zavirite u školske događaje, radionice, takmičenja, izlete i zajedničke trenutke.",
    action: "Pogledaj fotografije",
    href: "/gallery",
    icon: Images,
    number: "02",
  },
  {
    title: "Dokumenta",
    description:
      "Važna školska dokumentacija i informacije dostupne učenicima, roditeljima i javnosti.",
    action: "Otvori dokumenta",
    href: "/documents",
    icon: FileText,
    number: "03",
  },
];

export default function ExploreSchool() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#071f32] py-20 text-white sm:py-28">
      <div className="ink-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="site-container relative">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4ec5ee]">
              Istražite našu školu
            </p>
            <h2 className="text-balance mt-5 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Više od nastavnog
              <span className="font-editorial block font-normal italic text-[#f5c64d]">
                časa.
              </span>
            </h2>
          </div>
          <p className="text-pretty max-w-xl text-lg leading-8 text-white/62 lg:justify-self-end">
            Upoznajte naše aktivnosti, pogledajte trenutke koje bilježimo i
            pronađite korisne informacije i dokumentaciju škole.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.href}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={card.href}
                  transitionTypes={["nav-forward"]}
                  className="focus-ring group relative flex h-full min-h-[21rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/7 p-7 text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#4ec5ee]/60 hover:bg-white/11"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-[#4ec5ee] text-[#071f32]">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-white/35">
                      {card.number}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-3xl font-black tracking-[-0.04em]">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-7 text-white/65">{card.description}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#bdeef8]">
                      {card.action}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
