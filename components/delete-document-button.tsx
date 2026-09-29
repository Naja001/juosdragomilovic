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

interface DeleteDocumentButtonProps {
  id: string;
  title: string;
}

export function DeleteDocumentButton({
  id,
  title,
}: DeleteDocumentButtonProps) {
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
          `/api/documents/${id}`,
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
            "Dokument nije mogao biti obrisan."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "DOCUMENT DELETE ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Dokument nije mogao biti obrisan."
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
      onClick={handleDelete}
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