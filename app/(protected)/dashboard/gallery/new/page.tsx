"use client";

import Image from "next/image";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useRouter } from "next/navigation";

import {
  ImagePlus,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";

import { auth } from "@/lib/firebase";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE =
  5 * 1024 * 1024;

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function NewGalleryPage() {
  const router = useRouter();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    imageFiles,
    setImageFiles,
  ] = useState<File[]>([]);

  const [
    previewUrls,
    setPreviewUrls,
  ] = useState<string[]>([]);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  /*
   * Oslobodi blob preview URL-ove.
   */
  useEffect(() => {
    return () => {
      previewUrls.forEach(
        (url) =>
          URL.revokeObjectURL(
            url
          )
      );
    };
  }, [previewUrls]);

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles =
      Array.from(
        event.target.files ?? []
      );

    if (
      selectedFiles.length === 0
    ) {
      return;
    }

    setError(null);

    const validFiles: File[] =
      [];

    for (const file of selectedFiles) {
      if (
        !allowedTypes.includes(
          file.type
        )
      ) {
        setError(
          `Fajl "${file.name}" nije dozvoljen. Dozvoljeni formati su JPG, PNG i WEBP.`
        );

        event.target.value =
          "";

        return;
      }

      if (
        file.size >
        MAX_FILE_SIZE
      ) {
        setError(
          `Slika "${file.name}" je veća od 5 MB.`
        );

        event.target.value =
          "";

        return;
      }

      validFiles.push(file);
    }

    /*
     * Dodaj nove slike na već odabrane.
     */
    setImageFiles(
      (current) => [
        ...current,
        ...validFiles,
      ]
    );

    setPreviewUrls(
      (current) => [
        ...current,
        ...validFiles.map(
          (file) =>
            URL.createObjectURL(
              file
            )
        ),
      ]
    );

    /*
     * Omogućava ponovni izbor
     * istog fajla.
     */
    event.target.value = "";
  }

  function removeImage(
    index: number
  ) {
    const previewUrl =
      previewUrls[index];

    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setImageFiles(
      (current) =>
        current.filter(
          (_, i) => i !== index
        )
    );

    setPreviewUrls(
      (current) =>
        current.filter(
          (_, i) => i !== index
        )
    );
  }

  async function uploadImage(
    file: File
  ): Promise<string> {
    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    const response =
      await fetch(
        "/api/upload-gallery-image",
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
          `Upload slike "${file.name}" nije uspio.`
      );
    }

    if (!data.url) {
      throw new Error(
        `Nije vraćen URL za sliku "${file.name}".`
      );
    }

    return data.url;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
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

      if (
        imageFiles.length === 0
      ) {
        throw new Error(
          "Odaberite najmanje jednu fotografiju."
        );
      }

      const token =
        await currentUser.getIdToken();

      /*
       * 1. Upload svih slika na cPanel.
       */
      const imageUrls =
        await Promise.all(
          imageFiles.map(
            (file) =>
              uploadImage(file)
          )
        );

      /*
       * 2. Pošalji sve URL-ove
       * u Firestore API.
       */
      const response =
        await fetch(
          "/api/gallery",
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
                imageUrls,
              }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Fotografije nisu mogle biti sačuvane."
        );
      }

      router.push(
        "/dashboard/gallery"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "GALLERY CREATE ERROR:",
        error
      );

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
            Dodaj fotografije
          </h1>

          <p className="mt-1 text-muted-foreground">
            Dodajte jednu ili više
            fotografija u školsku
            galeriju.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_420px]"
        >
          {/* DATA */}
          <Card>
            <CardHeader>
              <CardTitle>
                Podaci galerije
              </CardTitle>

              <CardDescription>
                Naslov i opis biće
                primijenjeni na sve
                odabrane fotografije.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

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
                      event.target
                        .value
                    )
                  }
                  placeholder="Školska priredba"
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
                      event.target
                        .value
                    )
                  }
                  rows={6}
                  placeholder="Kratak opis fotografija..."
                />
              </div>

              {/* INFO */}
              {imageFiles.length >
                0 && (
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm font-semibold">
                    Odabrano fotografija:{" "}
                    {
                      imageFiles.length
                    }
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Svaka fotografija
                    može imati maksimalno
                    5 MB.
                  </p>
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />

                    Upload fotografija...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 size-4" />

                    Dodaj u galeriju
                  </>
                )}
              </Button>

            </CardContent>
          </Card>

          {/* IMAGES */}
          <Card>
            <CardHeader>
              <CardTitle>
                Fotografije
              </CardTitle>

              <CardDescription>
                JPG, PNG ili WEBP,
                maksimalno 5 MB po
                fotografiji.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

              {/* UPLOAD AREA */}
              <Label
                htmlFor="images"
                className="group block cursor-pointer"
              >
                <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted/30 p-6 text-center transition group-hover:border-primary group-hover:bg-muted/50">

                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ImagePlus className="size-6" />
                  </div>

                  <p className="mt-4 font-semibold">
                    Odaberite fotografije
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Možete odabrati više
                    slika odjednom
                  </p>

                </div>
              </Label>

              <Input
                id="images"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={
                  handleImageChange
                }
              />

              {/* PREVIEWS */}
              {previewUrls.length >
                0 && (
                <div className="grid grid-cols-2 gap-3">

                  {previewUrls.map(
                    (
                      previewUrl,
                      index
                    ) => (
                      <div
                        key={
                          previewUrl
                        }
                        className="group relative aspect-square overflow-hidden rounded-xl border bg-muted"
                      >
                        <Image
                          src={
                            previewUrl
                          }
                          alt={`Preview ${
                            index +
                            1
                          }`}
                          fill
                          unoptimized
                          className="object-cover"
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                        {/* DELETE */}
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          className="absolute right-2 top-2 size-8 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                          aria-label="Ukloni fotografiju"
                        >
                          <Trash2 className="size-4" />
                        </Button>

                        {/* NUMBER */}
                        <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white">
                          {index + 1}
                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

            </CardContent>
          </Card>

        </form>

      </div>
    </div>
  );
}