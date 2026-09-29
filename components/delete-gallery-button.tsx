"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Loader2,
  Trash2,
} from "lucide-react";

import { auth } from "@/lib/firebase";

import {
  Button,
} from "@/components/ui/button";

interface DeleteGalleryButtonProps {
  id: string;
  title: string;
}

export function DeleteGalleryButton({
  id,
  title,
}: DeleteGalleryButtonProps) {
  const router =
    useRouter();

  const [
    isDeleting,
    setIsDeleting,
  ] = useState(false);

  async function handleDelete() {
    const confirmed =
      window.confirm(
        `Da li ste sigurni da želite obrisati "${title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      const currentUser =
        auth.currentUser;

      if (!currentUser) {
        throw new Error(
          "Morate biti prijavljeni."
        );
      }

      const token =
        await currentUser.getIdToken();

      const response =
        await fetch(
          `/api/gallery/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Fotografija nije mogla biti obrisana."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "GALLERY DELETE ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Fotografija nije mogla biti obrisana."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isDeleting}
      onClick={
        handleDelete
      }
    >
      {isDeleting ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />

          Brisanje...
        </>
      ) : (
        <>
          <Trash2 className="mr-2 size-4" />

          Obriši
        </>
      )}
    </Button>
  );
}