"use client";

import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  FilePlus2,
  FileText,
  Images,
  LayoutDashboard,
  Leaf,
  Newspaper,
  PlusCircle,
} from "lucide-react";

import { LogoutButton } from "@/components/logout-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sections = [
  {
    label: "Pregled",
    items: [{ title: "Dashboard", url: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Sadržaj",
    items: [
      { title: "Novosti", url: "/dashboard/news", icon: Newspaper },
      { title: "Eko škola", url: "/dashboard/eco-school", icon: Leaf },
      { title: "Galerija", url: "/dashboard/gallery", icon: Images },
      { title: "Dokumenti", url: "/dashboard/documents", icon: FileText },
    ],
  },
  {
    label: "Brze akcije",
    items: [
      { title: "Nova objava", url: "/dashboard/news/new", icon: PlusCircle },
      { title: "Dodaj fotografije", url: "/dashboard/gallery/new", icon: PlusCircle },
      { title: "Novi dokument", url: "/dashboard/documents/new", icon: FilePlus2 },
    ],
  },
];

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border px-2 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-auto rounded-2xl px-2 py-2.5"
              render={<Link href="/dashboard" transitionTypes={["nav-back"]} />}
            >
              <span className="relative flex size-11 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-white/15">
                <Image
                  src="/images/logoOsDragoM.png"
                  alt=""
                  fill
                  sizes="44px"
                  className="scale-[1.55] object-cover"
                />
              </span>
              <span className="min-w-0 text-left">
                <span className="block truncate text-sm font-black text-white">Drago Milović</span>
                <span className="mt-0.5 block text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#4ec5ee]">
                  Administracija
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-3">
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-[0.58rem] font-black uppercase tracking-[0.17em] text-sidebar-foreground/40">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.url);

                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={active}
                        className={`h-10 rounded-xl font-bold transition-all ${
                          active
                            ? "bg-[#158bd2]! text-white! shadow-[0_10px_24px_-15px_rgb(21_139_210/80%)]"
                            : "text-sidebar-foreground/68 hover:bg-white/7! hover:text-white!"
                        }`}
                        render={
                          <Link href={item.url} transitionTypes={["nav-forward"]} />
                        }
                      >
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="mb-2 rounded-2xl bg-white/6 p-3">
          <p className="text-[0.6rem] font-black uppercase tracking-[0.15em] text-[#4ec5ee]">Javni sajt</p>
          <Link
            href="/"
            target="_blank"
            className="focus-ring group mt-2 flex items-center justify-between text-xs font-bold text-white/70 hover:text-white"
          >
            Otvori početnu
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
