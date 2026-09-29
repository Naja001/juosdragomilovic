"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, MoveDown, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const initialUp = reduceMotion ? false : { opacity: 0, y: 28 };

  return (
    <section className="relative isolate overflow-hidden bg-[#071f32] text-white">
      <div className="ink-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgb(21_139_210/28%),transparent_36%),radial-gradient(circle_at_82%_62%,rgb(78_197_238/18%),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="absolute -right-20 -top-28 size-[32rem] rounded-full border border-white/10" aria-hidden="true" />
      <div className="absolute -right-2 -top-8 size-[20rem] rounded-full border border-white/10" aria-hidden="true" />

      <div className="site-container relative grid min-h-[calc(100svh-6.9rem)] items-center gap-12 pb-16 pt-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={initialUp}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/7 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#bdeef8] backdrop-blur"
          >
            <Sparkles className="size-3.5 text-[#f5c64d]" />
            Škola koja raste sa Tivtom
          </motion.div>

          <motion.h1
            initial={initialUp}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.08, ease }}
            className="text-balance text-[clamp(3.35rem,7vw,6.9rem)] font-black leading-[0.88] tracking-[-0.065em]"
          >
            Znanje koje
            <span className="font-editorial mt-2 block font-normal italic tracking-[-0.045em] text-[#4ec5ee]">
              pokreće.
            </span>
          </motion.h1>

          <motion.p
            initial={initialUp}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.16, ease }}
            className="text-pretty mt-7 max-w-xl text-lg leading-8 text-white/70 sm:text-xl"
          >
            U OŠ Drago Milović gradimo sigurno, podsticajno i kreativno
            okruženje u kojem svako dijete može da uči, istražuje, razvija
            talente i stvara prijateljstva.
          </motion.p>

          <motion.div
            initial={initialUp}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.24, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/about"
              transitionTypes={["nav-forward"]}
              className="focus-ring group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f5c64d] px-6 text-sm font-black text-[#071f32] shadow-[0_16px_36px_-18px_rgb(245_198_77/75%)] transition-transform hover:-translate-y-0.5"
            >
              Upoznajte našu školu
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/news"
              transitionTypes={["nav-forward"]}
              className="focus-ring inline-flex min-h-12 items-center rounded-full border border-white/20 bg-white/7 px-6 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/13"
            >
              Najnovije vijesti
            </Link>
          </motion.div>

          <motion.div
            initial={initialUp}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.32, ease }}
            className="mt-10 flex items-center gap-5 border-t border-white/12 pt-6"
          >
            <span className="font-editorial text-4xl italic text-[#f5c64d]">180</span>
            <span className="max-w-44 text-xs font-bold uppercase leading-5 tracking-[0.15em] text-white/60">
              godina obrazovanja i zajedništva
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, x: 45, clipPath: "inset(0 0 100% 0 round 2rem)" }
          }
          animate={{ opacity: 1, x: 0, clipPath: "inset(0 0 0% 0 round 2rem)" }}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.12, ease }}
          className="relative mx-auto w-full max-w-2xl lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-800 shadow-[0_40px_100px_-45px_rgb(0_0_0/80%)] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
            <Image
              src="/images/slider1.jpg"
              alt="Učenici OŠ Drago Milović na školskoj manifestaciji u Tivtu"
              fill
              priority
              sizes="(max-width: 1024px) 94vw, 56vw"
              className="object-cover object-[52%_45%] transition-transform duration-1000 ease-out hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#071f32]/88 via-transparent to-[#071f32]/10" />

            <div className="absolute left-4 top-4 rounded-2xl bg-[#ef513f] px-4 py-3 text-white shadow-xl sm:left-6 sm:top-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/70">Osnovana</span>
              </div>
              <p className="mt-1 text-xl font-black">1845.</p>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#bdeef8]">Tivat · Crna Gora</p>
                <p className="mt-2 max-w-md text-xl font-bold tracking-tight sm:text-2xl">Zajedno učimo, stvaramo i rastemo.</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[0.62rem] font-black uppercase tracking-[0.13em] text-white/75 backdrop-blur">
                  <span className="size-2 rounded-full bg-[#65d6a0]" />
                  Znanje · prijateljstvo · razvoj
                </div>
              </div>
              <span className="hidden size-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur sm:flex">
                <MoveDown className="size-4" />
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10 bg-white/[0.035] py-4">
        <div className="site-container flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-white/48 sm:justify-between">
          <span>Sigurno okruženje</span>
          <span className="text-[#4ec5ee]">•</span>
          <span>Podrška svakom učeniku</span>
          <span className="text-[#f5c64d]">•</span>
          <span>Razvoj talenata</span>
        </div>
      </div>
    </section>
  );
}
