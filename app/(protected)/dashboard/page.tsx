import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Images,
  Leaf,
  Newspaper,
  PlusCircle,
  Sparkles,
} from "lucide-react";

const contentAreas = [
  {
    title: "Školske novosti",
    description: "Pregledajte i upravljajte svim objavama škole.",
    label: "Novosti",
    href: "/dashboard/news",
    icon: Newspaper,
    accent: "bg-[#4ec5ee]",
    tint: "bg-[#e4f7fa]",
  },
  {
    title: "Eko škola",
    description: "Aktivnosti, projekti i sadržaj Eko škole.",
    label: "Eko",
    href: "/dashboard/eco-school",
    icon: Leaf,
    accent: "bg-[#65d6a0]",
    tint: "bg-[#e8f8ef]",
  },
  {
    title: "Fotografije",
    description: "Upravljajte fotografijama školske galerije.",
    label: "Galerija",
    href: "/dashboard/gallery",
    icon: Images,
    accent: "bg-[#ef513f] text-white",
    tint: "bg-[#fff0ed]",
  },
  {
    title: "Dokumentacija",
    description: "Dokumenti škole i javne nabavke.",
    label: "Dokumenti",
    href: "/dashboard/documents",
    icon: FileText,
    accent: "bg-[#f5c64d]",
    tint: "bg-[#fff8df]",
  },
];

const quickActions = [
  { label: "Dodaj novost", href: "/dashboard/news/new", icon: Newspaper },
  { label: "Dodaj fotografije", href: "/dashboard/gallery/new", icon: Images },
  { label: "Dodaj dokument", href: "/dashboard/documents/new", icon: FileText },
];

export default function DashboardPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#071f32] p-7 text-white shadow-[0_28px_80px_-42px_rgb(7_31_50/70%)] sm:p-10">
          <div className="ink-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="absolute -right-24 -top-32 size-96 rounded-full bg-[#158bd2]/30 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#bdeef8]">
                <Sparkles className="size-3.5 text-[#f5c64d]" />
                Administrativni panel
              </p>
              <h1 className="mt-6 text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">Dobrodošli.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
                Upravljajte školskim novostima, sadržajem Eko škole, galerijom i dokumentacijom sa jednog mjesta.
              </p>
            </div>
            <Link
              href="/dashboard/news/new"
              transitionTypes={["nav-forward"]}
              className="focus-ring group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#f5c64d] px-6 py-3.5 text-sm font-black text-[#071f32] transition-transform hover:-translate-y-0.5"
            >
              <PlusCircle className="size-4" />
              Nova objava
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-5">
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.17em] text-[#158bd2]">Sadržaj</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.035em] text-[#071f32]">Pregled upravljanja</h2>
            </div>
            <span className="hidden text-sm text-slate-400 sm:inline">4 glavne cjeline</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contentAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Link
                  key={area.href}
                  href={area.href}
                  transitionTypes={["nav-forward"]}
                  className={`focus-ring group relative overflow-hidden rounded-[1.6rem] border border-slate-200/80 p-6 text-[#071f32] shadow-[0_20px_60px_-48px_rgb(7_31_50/50%)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_70px_-44px_rgb(7_31_50/55%)] ${area.tint}`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className={`flex size-11 items-center justify-center rounded-2xl ${area.accent}`}>
                      <Icon className="size-5" />
                    </span>
                    <ArrowUpRight className="size-4 text-[#071f32]/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#071f32]" />
                  </div>
                  <p className="mt-8 text-[0.61rem] font-black uppercase tracking-[0.15em] text-[#071f32]/42">{area.label}</p>
                  <h3 className="mt-2 text-xl font-black tracking-[-0.03em]">{area.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#071f32]/60">{area.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.55fr]">
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 sm:p-8">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.17em] text-[#ef513f]">Brze akcije</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#071f32]">Kreirajte novi sadržaj</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    transitionTypes={["nav-forward"]}
                    className="focus-ring group flex min-h-28 flex-col justify-between rounded-2xl border border-slate-200 bg-[#fbfaf6] p-4 font-black text-[#071f32] transition-all hover:border-[#158bd2] hover:bg-[#e4f7fa]"
                  >
                    <Icon className="size-5 text-[#158bd2]" />
                    <span className="flex items-end justify-between gap-3 text-sm">
                      {action.label}
                      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-[#158bd2] p-6 text-white sm:p-8">
            <p className="text-[0.62rem] font-black uppercase tracking-[0.17em] text-[#bdeef8]">Objavljivanje</p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">Izmjene su odmah vidljive.</h2>
            <p className="mt-4 text-sm leading-6 text-white/68">
              Sve izmjene napravljene u administraciji automatski se prikazuju na javnom sajtu.
            </p>
            <Link
              href="/"
              target="_blank"
              className="focus-ring group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-black text-[#071f32]"
            >
              Pogledaj sajt
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
