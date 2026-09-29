"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

import { auth } from "@/lib/firebase";

import {
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);

    router.replace("/login");
    router.refresh();
  }

  return (
    <SidebarMenuButton
      type="button"
      tooltip="Odjavi se"
      onClick={handleLogout}
      className="text-red-600 hover:bg-red-50 hover:text-red-700"
    >
      <LogOut className="size-4" />

      <span>Odjavi se</span>
    </SidebarMenuButton>
  );
}