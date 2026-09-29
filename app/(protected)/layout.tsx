"use client";

import {
  ViewTransition,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  onAuthStateChanged,
  type User,
} from "firebase/auth";

import { Loader2 } from "lucide-react";

import { auth } from "@/lib/firebase";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] =
    useState<User | null>(null);

  const [
    isCheckingAuth,
    setIsCheckingAuth,
  ] = useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (firebaseUser) => {
          if (!firebaseUser) {
            const redirectTo =
              encodeURIComponent(
                pathname
              );

            router.replace(
              `/login?redirectTo=${redirectTo}`
            );

            setUser(null);
            setIsCheckingAuth(false);

            return;
          }

          setUser(firebaseUser);
          setIsCheckingAuth(false);
        }
      );

    return unsubscribe;
  }, [pathname, router]);

  if (
    isCheckingAuth ||
    !user
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-6 animate-spin text-primary" />

          <p className="text-sm text-muted-foreground">
            Provjera prijave...
          </p>
        </div>
      </main>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width":
            "calc(var(--spacing) * 72)",

          "--header-height":
            "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset className="admin-shell min-w-0 bg-[#f2f6f7]">
        <SiteHeader />

        <ViewTransition enter="page-shift" exit="page-shift" default="none">
          <div className="min-h-[calc(100svh-var(--header-height))]">{children}</div>
        </ViewTransition>
      </SidebarInset>
    </SidebarProvider>
  );
}
