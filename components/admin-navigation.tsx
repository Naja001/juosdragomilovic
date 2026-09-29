"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Leaf,
  LogOut,
  Newspaper,
  PlusCircle,
  School,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface AdminNavigationProps {
  onLogout?: () => void;
}

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Novosti",
    href: "/dashboard/news",
    icon: Newspaper,
  },
  {
    label: "Dodaj novost",
    href: "/dashboard/news/new",
    icon: PlusCircle,
  },
  {
    label: "Eko škola",
    href: "/dashboard/eco-school",
    icon: Leaf,
  },
];

export function AdminNavigation({
  onLogout,
}: AdminNavigationProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72">
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="border-b bg-slate-950 px-5 py-6 text-white">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-white/10">
                <School className="size-6" />
              </div>

              <div>
                <p className="font-semibold">
                  OŠ Drago Milović
                </p>

                <p className="text-sm text-slate-300">
                  Administracija
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-1 p-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (
                  item.href !== "/dashboard" &&
                  pathname.startsWith(
                    `${item.href}/`
                  )
                );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  )}
                >
                  <Icon className="size-5" />

                  {item.label}
                </Link>
              );
            })}
          </nav>

          {onLogout && (
            <div className="border-t p-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onLogout}
                className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="size-5" />

                Odjava
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}