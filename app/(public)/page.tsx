import { ViewTransition } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  GraduationCap,
  Users,
} from "lucide-react";

import ExploreSchool from "@/components/explore-school";
import Hero from "@/components/hero";
import LatestNews from "@/components/latest-news";

export const dynamic = "force-dynamic";

const values = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Kvalitetno obrazovanje",
    description:
      "Savremena nastava i posvećeni nastavnici koji učenicima pomažu da razviju znanje i vještine.",
    accent: "bg-[#158bd2]",
  },
  {
    icon: Users,
    number: "02",
    title: "Školska zajednica",
    description:
      "Gradimo snažnu saradnju između učenika, roditelja, nastavnika i lokalne zajednice.",
    accent: "bg-[#ef513f]",
  },
  {
    icon: CalendarDays,
    number: "03",
    title: "Raznovrsne aktivnosti",
    description:
      "Organizujemo sekcije, radionice, takmičenja, izlete i druge aktivnosti za razvoj talenata.",
    accent: "bg-[#43a978]",
  },
];

export default function Home() {
  return (
    <ViewTransition enter="page-shift" exit="page-shift" default="none">
      <main className="min-h-screen overflow-hidden bg-background">
        <Hero />

        <section className="paper-grid relative py-20 sm:py-28">
          <div className="site-container">
            <div className="grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#158bd2]">
                  Zašto naša škola?
                </p>
                <h2 className="text-balance mt-5 max-w-lg text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#071f32] sm:text-5xl lg:text-6xl">
                  Mjesto za učenje, druženje i
                  <span className="font-editorial font-normal italic text-[#158bd2]">
                    {" "}razvoj.
                  </span>
                </h2>
              </div>

              <div className="flex flex-col gap-6 lg:items-end">
                <p className="text-pretty max-w-xl text-lg leading-8 text-slate-600">
                  Podstičemo radoznalost, kreativnost i samopouzdanje svakog
                  učenika — uz ljude koji poznaju svoje učenike i sredinu u
                  kojoj odrastaju.
                </p>
                <Link
                  href="/about"
                  transitionTypes={["nav-forward"]}
                  className="focus-ring group inline-flex w-fit items-center gap-2 rounded-full text-sm font-black text-[#071f32]"
                >
                  Više o školi
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#071f32] text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="mt-14 grid overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white soft-shadow md:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <article
                    key={value.title}
                    className={`group relative min-h-72 p-7 sm:p-9 ${
                      index > 0
                        ? "border-t border-slate-200/80 md:border-l md:border-t-0"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`flex size-12 items-center justify-center rounded-2xl text-white ${value.accent}`}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-300">
                        {value.number}
                      </span>
                    </div>
                    <h3 className="mt-12 text-xl font-black tracking-[-0.025em] text-[#071f32] sm:text-2xl">
                      {value.title}
                    </h3>
                    <p className="mt-4 leading-7 text-slate-600">
                      {value.description}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${value.accent}`}
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ExploreSchool />
        <LatestNews />
      </main>
    </ViewTransition>
  );
}
