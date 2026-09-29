"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Circle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const pageNames: Record<string, { title: string; section: string }> = {
  "/dashboard": { title: "Pregled", section: "Administracija" },
  "/dashboard/news": { title: "Novosti", section: "Sadržaj" },
  "/dashboard/news/new": { title: "Nova objava", section: "Sadržaj" },
  "/dashboard/eco-school": { title: "Eko škola", section: "Sadržaj" },
  "/dashboard/gallery": { title: "Galerija", section: "Mediji" },
  "/dashboard/gallery/new": { title: "Dodaj fotografije", section: "Mediji" },
  "/dashboard/documents": { title: "Dokumenti", section: "Dokumentacija" },
  "/dashboard/documents/new": { title: "Novi dokument", section: "Dokumentacija" },
};

export function SiteHeader() {
  const pathname = usePathname();
  const page = pageNames[pathname] ?? { title: "Administracija", section: "OŠ Drago Milović" };

  return (
    <header className="sticky top-0 z-40 flex h-(--header-height) shrink-0 items-center border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full min-w-0 items-center gap-2 px-4 lg:px-6">
        <SidebarTrigger className="-ml-1 rounded-full" />
        <Separator orientation="vertical" className="mx-2 h-4 data-vertical:self-auto" />
        <div className="min-w-0">
          <p className="truncate text-[0.58rem] font-black uppercase tracking-[0.18em] text-[#158bd2]">
            {page.section}
          </p>
          <h1 className="truncate text-sm font-black tracking-[-0.02em] text-[#071f32]">{page.title}</h1>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden items-center gap-2 text-xs font-bold text-slate-400 sm:flex">
            <Circle className="size-2 fill-[#43a978] text-[#43a978]" />
            Sistem aktivan
          </span>
          <Link
            href="/"
            target="_blank"
            className="focus-ring group inline-flex items-center gap-2 rounded-full bg-[#071f32] px-4 py-2 text-xs font-black text-white transition-transform hover:-translate-y-0.5"
          >
            <span className="hidden sm:inline">Pogledaj sajt</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
