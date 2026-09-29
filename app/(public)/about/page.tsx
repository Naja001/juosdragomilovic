import type { Metadata } from "next";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Landmark,
  Quote,
  School,
  Users,
} from "lucide-react";

import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { SectionReveal } from "@/components/section-reveal";

export const metadata: Metadata = {
  title: "O našoj školi",
  description: "Priča o 180 godina obrazovanja, tradicije i zajedništva OŠ Drago Milović u Tivtu.",
};

const timeline = [
  {
    year: "1842",
    title: "Prvi zahtjev za osnivanje škole",
    description:
      "Tivatska opština uputila je Pokrajinskoj komisiji za osnovne škole Dalmacije u Zadru zahtjev za otvaranje osnovne škole na narodnom jeziku.",
  },
  {
    year: "1845",
    title: "Početak rada škole",
    description:
      "Dana 19. novembra 1845. godine počela je nastava u maloj crkvenoj kući. Prvi učitelj bio je Jakov Zarbarini, a školu je pohađalo 28 učenika.",
  },
  {
    year: "1869–1870",
    title: "Obavezno školovanje",
    description:
      "Donošenjem Temeljnog i Pokrajinskog zakona uvedeno je obavezno školovanje djece oba pola na području Dalmacije.",
  },
  {
    year: "1875",
    title: "Otvoreno drugo odjeljenje",
    description:
      "Zbog sve većeg broja učenika škola se preselila u privatnu kuću Antona Goluba, gdje je otvoreno i drugo odjeljenje.",
  },
  {
    year: "1893",
    title: "Odjeljenje za žensku djecu",
    description:
      "Otvoreno je posebno odjeljenje za žensku djecu, a za učiteljicu je postavljena Ana Žeželjić.",
  },
  {
    year: "1898",
    title: "Nova školska zgrada",
    description:
      "U novembru 1898. godine završena je nova školska zgrada, čija je gradnja započeta na inicijativu učitelja Antuna Žeželjića.",
  },
  {
    year: "1926/27",
    title: "Mješovita građanska škola",
    description:
      "Zalaganjem upravitelja Šime Rajčevića otvorena je Mješovita građanska škola u Tivtu.",
  },
  {
    year: "1929",
    title: "Proširenje školske zgrade",
    description:
      "Počela je gradnja drugog krila postojeće školske zgrade u kojem je bila smještena i Građanska škola.",
  },
  {
    year: "1943",
    title: "Drago Milović",
    description:
      "Drago Milović, dugogodišnji direktor škole i istaknuti prosvjetni radnik, strijeljan je na Troici 17. decembra 1943. godine. Škola danas nosi njegovo ime.",
  },
];

const people = [
  {
    name: "Antun Žeželjić",
    icon: Landmark,
    accent: "bg-[#4ec5ee]",
    description:
      "Učitelj koji je dao snažan doprinos kulturnom životu Tivta. Osnovao je orkestar i bio jedan od inicijatora izgradnje nove školske zgrade.",
  },
  {
    name: "Šime Rajčević",
    icon: Users,
    accent: "bg-[#f5c64d]",
    description:
      "Upravitelj škole od 1920. godine, poznat kao uzoran pedagog i poznavalac muzike. Njegovim zalaganjem otvorena je Mješovita građanska škola.",
  },
  {
    name: "Drago Milović",
    icon: GraduationCap,
    accent: "bg-[#ef513f] text-white",
    description:
      "Dugogodišnji direktor i prosvjetni radnik po kojem škola danas nosi ime. Strijeljan je na Troici 17. decembra 1943. godine.",
  },
];

export default function AboutUsPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-[#fbfaf6]">
        <PageIntro
          eyebrow="180 godina obrazovanja"
          title="O našoj školi"
          description="Od prvog školskog odjeljenja otvorenog 1845. godine do moderne obrazovne ustanove kakva je danas, istorija naše škole dio je istorije Tivta i generacija koje su u njoj odrastale."
          icon={CalendarDays}
          tone="yellow"
          aside={
            <div className="font-editorial text-right text-5xl italic text-[#f5c64d] sm:text-6xl">
              1845—2025
            </div>
          }
        />

        <section className="paper-grid py-20 sm:py-28">
          <div className="site-container grid items-center gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
            <SectionReveal>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#158bd2]">
                1845 — 2025
              </p>
              <h2 className="text-balance mt-4 text-4xl font-black leading-[1.02] tracking-[-0.045em] text-[#071f32] sm:text-5xl">
                180 godina školstva u Tivtu
              </h2>
              <div className="mt-7 space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
                <p>
                  U novembru 2025. godine navršilo se <strong className="text-[#071f32]">180 godina od otvaranja prvog odjeljenja Osnovne škole u Tivtu.</strong>
                </p>
                <p>
                  Put do osnivanja škole počeo je još 1842. godine, kada je tivatska opština zatražila dozvolu za otvaranje škole na svom području. Stanovnici Tivta insistirali su da nastava bude na narodnom jeziku, zbog čega je zahtjev nekoliko godina prolazio kroz tadašnje administrativne institucije.
                </p>
                <p>
                  Konačno, 1845. godine odobren je rad osnovne škole, tada na italijanskom jeziku. Nastava je zvanično počela <strong className="text-[#071f32]">19. novembra 1845. godine</strong> u maloj crkvenoj kući u kojoj se nalazilo i sjedište opštine.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1} className="relative">
              <div className="absolute -inset-6 -rotate-3 rounded-[2.5rem] bg-[#4ec5ee]/14" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] bg-[#071f32] p-8 text-white shadow-[0_35px_90px_-42px_rgb(7_31_50/75%)] sm:p-10">
                <School className="size-7 text-[#4ec5ee]" />
                <p className="font-editorial mt-10 text-[6rem] italic leading-none text-[#f5c64d] sm:text-[8rem]">180</p>
                <p className="mt-2 text-xl font-black tracking-tight">godina tradicije i znanja</p>
                <p className="mt-5 leading-7 text-white/62">
                  Generacije učenika i prosvjetnih radnika gradile su školu koja je tokom skoro dva vijeka ostala jedno od važnih mjesta obrazovanja, kulture i zajedništva u Tivtu.
                </p>
                <dl className="mt-9 grid grid-cols-2 border-t border-white/12 pt-7">
                  <div>
                    <dt className="text-2xl font-black">1845.</dt>
                    <dd className="mt-1 text-xs uppercase tracking-[0.13em] text-white/45">Prva nastava</dd>
                  </div>
                  <div className="border-l border-white/12 pl-6">
                    <dt className="text-2xl font-black">28</dt>
                    <dd className="mt-1 text-xs uppercase tracking-[0.13em] text-white/45">Prvih učenika</dd>
                  </div>
                </dl>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#158bd2] py-20 text-white sm:py-24">
          <div className="pointer-events-none absolute -right-10 -top-16 font-editorial text-[16rem] italic leading-none text-white/[0.07]" aria-hidden="true">“</div>
          <SectionReveal className="site-container relative max-w-5xl text-center">
            <Quote className="mx-auto size-8 text-[#f5c64d]" />
            <blockquote className="font-editorial mt-7 text-balance text-3xl italic leading-[1.25] sm:text-4xl lg:text-5xl">
              „Škola nije samo mjesto u kojem se stiče znanje — ona je mjesto gdje generacije uče da stvaraju budućnost.“
            </blockquote>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-white/55">180 godina obrazovanja u Tivtu</p>
          </SectionReveal>
        </section>

        <section className="py-20 sm:py-28">
          <SectionReveal className="site-container grid gap-8 lg:grid-cols-[0.46fr_1fr] lg:gap-20">
            <div>
              <span className="flex size-14 items-center justify-center rounded-2xl bg-[#e4f7fa] text-[#158bd2]">
                <BookOpen className="size-6" />
              </span>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-[#071f32]">Počeci obrazovanja</h2>
            </div>
            <div className="space-y-5 text-lg leading-9 text-slate-600">
              <p>
                Prvi učitelj tivatske opštine bio je Jakov Zarbarini, tadašnji sekretar opštine. Za svoj rad primao je sto fijorina godišnje. Školske 1845/1846. godine nastavu je pohađalo 28 učenika, isključivo dječaka, jer se ženska djeca u tom periodu nijesu slala u školu.
              </p>
              <p>
                Nastava se do 1869. godine održavala na italijanskom jeziku. Nakon Zarbarinija za učitelja je izabran tadašnji župnik Don Niko Zoti. Promjene u zakonodavstvu krajem šezdesetih i početkom sedamdesetih godina 19. vijeka donijele su obavezno školovanje djece oba pola.
              </p>
            </div>
          </SectionReveal>
        </section>

        <section className="bg-[#eef8f9] py-20 sm:py-28">
          <div className="site-container">
            <SectionReveal className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#158bd2]">Kroz vrijeme</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-[#071f32] sm:text-5xl">Istorija naše škole</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Najvažniji događaji koji su oblikovali razvoj osnovnog obrazovanja u Tivtu.</p>
            </SectionReveal>

            <div className="relative mt-14 sm:mt-18">
              <div className="absolute bottom-5 left-[4.15rem] top-5 hidden w-px bg-[#158bd2]/20 sm:block" aria-hidden="true" />
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <SectionReveal key={`${item.year}-${item.title}`} delay={(index % 3) * 0.04}>
                    <article className="group grid overflow-hidden rounded-[1.5rem] border border-[#071f32]/8 bg-white transition-all hover:-translate-y-0.5 hover:border-[#158bd2]/35 hover:shadow-[0_22px_65px_-42px_rgb(7_31_50/45%)] sm:grid-cols-[8.3rem_1fr]">
                      <div className="relative flex items-center justify-between bg-[#071f32] px-5 py-5 text-white sm:justify-center sm:bg-transparent sm:text-[#158bd2]">
                        <span className="font-mono text-xs font-black">{item.year}</span>
                        <span className="size-2.5 rounded-full bg-[#4ec5ee] ring-8 ring-[#e4f7fa] sm:absolute sm:right-[-0.34rem]" />
                      </div>
                      <div className="p-6 sm:p-7 sm:pl-10">
                        <h3 className="text-xl font-black tracking-[-0.025em] text-[#071f32]">{item.title}</h3>
                        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{item.description}</p>
                      </div>
                    </article>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="site-container">
            <SectionReveal className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ef513f]">Ljudi škole</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-[#071f32] sm:text-5xl">Prosvjetni i kulturni radnici</h2>
            </SectionReveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {people.map((person, index) => {
                const Icon = person.icon;
                return (
                  <SectionReveal key={person.name} delay={index * 0.07} className="h-full">
                    <article className="h-full rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-[0_24px_65px_-48px_rgb(7_31_50/45%)] sm:p-8">
                      <span className={`flex size-12 items-center justify-center rounded-2xl text-[#071f32] ${person.accent}`}>
                        <Icon className="size-5" />
                      </span>
                      <h3 className="mt-8 text-2xl font-black tracking-[-0.035em] text-[#071f32]">{person.name}</h3>
                      <p className="mt-4 leading-7 text-slate-600">{person.description}</p>
                    </article>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="site-container pb-24 sm:pb-32">
          <SectionReveal className="relative overflow-hidden rounded-[2rem] bg-[#071f32] p-8 text-white sm:p-12 lg:p-16">
            <div className="ink-grid absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="absolute -right-20 -top-24 size-80 rounded-full bg-[#ef513f]/25 blur-3xl" aria-hidden="true" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f5c64d]">Tradicija koja traje</p>
              <h2 className="text-balance mt-5 text-4xl font-black leading-[1.04] tracking-[-0.05em] sm:text-5xl">Čuvamo prošlost. Obrazujemo za budućnost.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                Od 1845. godine do danas škola ostaje mjesto susreta znanja, prijateljstva i novih ideja. Na temeljima bogate tradicije nastavljamo da stvaramo podsticajno i sigurno okruženje za svaku novu generaciju učenika.
              </p>
            </div>
          </SectionReveal>
        </section>
      </main>
    </PageTransition>
  );
}
