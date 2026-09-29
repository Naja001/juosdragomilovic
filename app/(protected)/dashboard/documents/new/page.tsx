"use client";

import {
  useState,
  type ChangeEvent,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  FileText,
  Loader2,
  Save,
  Upload,
} from "lucide-react";

import { auth } from "@/lib/firebase";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Textarea,
} from "@/components/ui/textarea";

function getToday() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

type DocumentCategory =
  | "document"
  | "procurement";

export default function NewDocumentPage() {
  const router =
    useRouter();

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    publishedAt,
    setPublishedAt,
  ] = useState(
    getToday()
  );

  const [
    category,
    setCategory,
  ] =
    useState<DocumentCategory>(
      "document"
    );

  const [
    file,
    setFile,
  ] =
    useState<File | null>(
      null
    );

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  function handleFileChange(
    event:
      ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile =
      event.target.files?.[0] ??
      null;

    setError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (
      selectedFile.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Dokument može imati maksimalno 10 MB."
      );

      event.target.value =
        "";

      setFile(null);

      return;
    }

    setFile(
      selectedFile
    );
  }

  async function uploadFile(
    selectedFile: File
  ) {
    const formData =
      new FormData();

    formData.append(
      "file",
      selectedFile
    );

    const response =
      await fetch(
        "/api/upload-document",
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Upload dokumenta nije uspio."
      );
    }

    return data;
  }

  async function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    try {
      setIsSubmitting(true);

      const currentUser =
        auth.currentUser;

      if (!currentUser) {
        throw new Error(
          "Morate biti prijavljeni."
        );
      }

      if (!title.trim()) {
        throw new Error(
          "Naslov je obavezan."
        );
      }

      if (!file) {
        throw new Error(
          "Dokument je obavezan."
        );
      }

      const token =
        await currentUser.getIdToken();

      // Upload na cPanel
      const upload =
        await uploadFile(
          file
        );

      // Firestore
      const response =
        await fetch(
          "/api/documents",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify({
                title,
                description,
                category,
                publishedAt,

                fileUrl:
                  upload.url,

                fileName:
                  upload.fileName,
              }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Dokument nije mogao biti sačuvan."
        );
      }

      router.push(
        "/dashboard/documents"
      );

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Došlo je do greške."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-6 p-4 lg:p-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dodaj dokument
          </h1>

          <p className="mt-1 text-muted-foreground">
            Dodajte novi dokument ili
            javnu nabavku.
          </p>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="grid gap-6 lg:grid-cols-[1fr_360px]"
        >

          {/* LEFT */}
          <Card>
            <CardHeader>
              <CardTitle>
                Podaci dokumenta
              </CardTitle>

              <CardDescription>
                Unesite osnovne podatke
                dokumenta.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* CATEGORY */}
              <div className="space-y-3">

                <Label>
                  Vrsta dokumenta
                </Label>

                <div className="grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() =>
                      setCategory(
                        "document"
                      )
                    }
                    className={
                      category ===
                      "document"
                        ? "rounded-xl border-2 border-blue-500 bg-blue-50 p-4 text-left"
                        : "rounded-xl border-2 border-border p-4 text-left hover:bg-muted/50"
                    }
                  >
                    <FileText className="mb-2 size-5" />

                    <p className="font-semibold">
                      Dokument
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Opšti školski dokument
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCategory(
                        "procurement"
                      )
                    }
                    className={
                      category ===
                      "procurement"
                        ? "rounded-xl border-2 border-amber-500 bg-amber-50 p-4 text-left"
                        : "rounded-xl border-2 border-border p-4 text-left hover:bg-muted/50"
                    }
                  >
                    <FileText className="mb-2 size-5" />

                    <p className="font-semibold">
                      Javna nabavka
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Dokumentacija javnih
                      nabavki
                    </p>
                  </button>

                </div>

              </div>

              {/* TITLE */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Naslov
                </Label>

                <Input
                  id="title"
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value
                    )
                  }
                  placeholder="Naziv dokumenta"
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Opis
                </Label>

                <Textarea
                  id="description"
                  value={
                    description
                  }
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder="Kratak opis dokumenta..."
                />
              </div>

              {/* DATE */}
              <div className="space-y-2">
                <Label htmlFor="publishedAt">
                  Datum objave
                </Label>

                <Input
                  id="publishedAt"
                  type="date"
                  value={
                    publishedAt
                  }
                  onChange={(event) =>
                    setPublishedAt(
                      event.target.value
                    )
                  }
                  required
                />
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />

                    Čuvanje...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 size-4" />

                    Sačuvaj dokument
                  </>
                )}
              </Button>

            </CardContent>
          </Card>

          {/* FILE */}
          <Card>
            <CardHeader>
              <CardTitle>
                Fajl
              </CardTitle>

              <CardDescription>
                PDF, DOC, DOCX, XLS ili
                XLSX do 10 MB.
              </CardDescription>
            </CardHeader>

            <CardContent>

              <Label
                htmlFor="document"
                className="block cursor-pointer"
              >
                <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted/30 p-6 text-center transition hover:border-primary">

                  <Upload className="size-10 text-muted-foreground" />

                  {file ? (
                    <>
                      <p className="mt-4 max-w-full truncate font-semibold">
                        {file.name}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {(
                          file.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-4 font-semibold">
                        Odaberite dokument
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Kliknite za izbor fajla
                      </p>
                    </>
                  )}

                </div>
              </Label>

              <Input
                id="document"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                className="mt-4"
                onChange={
                  handleFileChange
                }
              />

            </CardContent>
          </Card>

        </form>

      </div>
    </div>
  );
}