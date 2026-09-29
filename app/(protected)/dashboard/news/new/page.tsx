"use client";

import Image from "next/image";
import {
  useState,
  type ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import {
  ImagePlus,
  Leaf,
  Loader2,
  Newspaper,
  Save,
  School,
} from "lucide-react";

import {
  newsSchema,
  type NewsFormValues,
} from "@/lib/schemas/news-schema";

import { auth } from "@/lib/firebase";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function getToday(): string {
  return new Date()
    .toISOString()
    .split("T")[0];
}

export default function CreateNewsPage() {
  const router = useRouter();

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),

    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      publishedAt: getToday(),
      category: "school",
    },
  });

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0] ?? null;

    setImageFile(file);

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageFile(null);
      setPreviewUrl(null);
      event.target.value = "";

      setSubmitError(
        "Dozvoljeni formati slike su JPG, PNG i WEBP."
      );

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setImageFile(null);
      setPreviewUrl(null);
      event.target.value = "";

      setSubmitError(
        "Slika može imati maksimalno 5 MB."
      );

      return;
    }

    setSubmitError(null);

    setPreviewUrl(
      URL.createObjectURL(file)
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

    const response = await fetch(
      "/api/upload-news-image",
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
          data.error ||
          "Upload slike nije uspio."
      );
    }

    if (!data.url) {
      throw new Error(
        "cPanel nije vratio URL slike."
      );
    }

    return data.url;
  }

  async function onSubmit(
    values: NewsFormValues
  ) {
    setSubmitError(null);

    try {
      const currentUser =
        auth.currentUser;

      if (!currentUser) {
        throw new Error(
          "Morate biti prijavljeni da biste dodali novost."
        );
      }

      if (!imageFile) {
        throw new Error(
          "Naslovna slika je obavezna."
        );
      }

      const token =
        await currentUser.getIdToken();

      // 1. Upload slike na cPanel
      const imageUrl =
        await uploadImage(
          imageFile
        );

      console.log(
        "IMAGE UPLOADED:",
        imageUrl
      );

      // 2. Kreiranje news dokumenta
      const response = await fetch(
        "/api/news",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            title:
              values.title,

            excerpt:
              values.excerpt,

            content:
              values.content,

            publishedAt:
              values.publishedAt,

            category:
              values.category,

            imageUrl,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Novost nije mogla biti sačuvana."
        );
      }

      console.log(
        "NEWS CREATED:",
        data.id
      );

      /*
       * Poslije objave idi na odgovarajuću stranicu.
       */
      if (
        values.category === "eco"
      ) {
        router.push(
          `/eco-school/${data.id}`
        );
      } else {
        router.push(
          `/news/${data.id}`
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Greška pri dodavanju novosti:",
        error
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Novost nije mogla biti sačuvana."
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
            <Newspaper className="size-4" />

            Administracija novosti
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Dodaj novu objavu
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Odaberite vrstu novosti i unesite
            naslov, opis, tekst, datum i
            naslovnu fotografiju.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="grid gap-8 lg:grid-cols-[1fr_340px]"
        >

          {/* LEFT SIDE */}
          <Card>

            <CardHeader>

              <CardTitle>
                Sadržaj novosti
              </CardTitle>

              <CardDescription>
                Podaci će se prikazivati
                na odgovarajućoj javnoj
                stranici škole.
              </CardDescription>

            </CardHeader>

            <CardContent className="space-y-6">

              {/* CATEGORY */}
              <div className="space-y-3">

                <Label>
                  Vrsta novosti
                </Label>

                <input
                  type="hidden"
                  {...register("category")}
                />

                <div className="grid gap-3 sm:grid-cols-2">

                  {/* SCHOOL */}
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "category",
                        "school",
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                    className={
                      selectedCategory ===
                      "school"
                        ? "rounded-2xl border-2 border-blue-500 bg-blue-50 p-4 text-left transition"
                        : "rounded-2xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/50"
                    }
                  >
                    <div className="flex items-center gap-3">

                      <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <School className="size-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          Školska novost
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Prikazuje se na
                          stranici Novosti
                        </p>
                      </div>

                    </div>
                  </button>

                  {/* ECO */}
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "category",
                        "eco",
                        {
                          shouldValidate: true,
                        }
                      )
                    }
                    className={
                      selectedCategory ===
                      "eco"
                        ? "rounded-2xl border-2 border-green-500 bg-green-50 p-4 text-left transition"
                        : "rounded-2xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-green-300 hover:bg-green-50/50"
                    }
                  >
                    <div className="flex items-center gap-3">

                      <div className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                        <Leaf className="size-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          Eko škola
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Prikazuje se na
                          Eko škola stranici
                        </p>
                      </div>

                    </div>
                  </button>

                </div>

                {errors.category && (
                  <p className="text-sm text-destructive">
                    {
                      errors.category
                        .message
                    }
                  </p>
                )}

              </div>

              {/* TITLE */}
              <div className="space-y-2">

                <Label htmlFor="title">
                  Naslov
                </Label>

                <Input
                  id="title"
                  placeholder="Dobro došli u novu školsku godinu"
                  aria-invalid={
                    Boolean(
                      errors.title
                    )
                  }
                  {...register(
                    "title"
                  )}
                />

                {errors.title && (
                  <p className="text-sm text-destructive">
                    {
                      errors.title
                        .message
                    }
                  </p>
                )}

              </div>

              {/* EXCERPT */}
              <div className="space-y-2">

                <Label htmlFor="excerpt">
                  Kratak opis
                </Label>

                <Textarea
                  id="excerpt"
                  rows={4}
                  placeholder="Kratak opis koji će se prikazivati na kartici novosti."
                  aria-invalid={
                    Boolean(
                      errors.excerpt
                    )
                  }
                  {...register(
                    "excerpt"
                  )}
                />

                {errors.excerpt && (
                  <p className="text-sm text-destructive">
                    {
                      errors.excerpt
                        .message
                    }
                  </p>
                )}

              </div>

              {/* CONTENT */}
              <div className="space-y-2">

                <Label htmlFor="content">
                  Detaljan tekst
                </Label>

                <Textarea
                  id="content"
                  rows={14}
                  placeholder="Napišite detaljniji tekst novosti..."
                  aria-invalid={
                    Boolean(
                      errors.content
                    )
                  }
                  {...register(
                    "content"
                  )}
                />

                {errors.content && (
                  <p className="text-sm text-destructive">
                    {
                      errors.content
                        .message
                    }
                  </p>
                )}

              </div>

              {/* DATE */}
              <div className="space-y-2">

                <Label htmlFor="publishedAt">
                  Datum objave
                </Label>

                <Input
                  id="publishedAt"
                  type="date"
                  aria-invalid={
                    Boolean(
                      errors.publishedAt
                    )
                  }
                  {...register(
                    "publishedAt"
                  )}
                />

                {errors.publishedAt && (
                  <p className="text-sm text-destructive">
                    {
                      errors
                        .publishedAt
                        .message
                    }
                  </p>
                )}

              </div>

              {/* ERROR */}
              {submitError && (
                <div
                  role="alert"
                  className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3"
                >
                  <p className="text-sm font-medium text-destructive">
                    {submitError}
                  </p>
                </div>
              )}

              {/* SUBMIT */}
              <div className="flex justify-end">

                <Button
                  type="submit"
                  size="lg"
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

                      Objavi novost
                    </>
                  )}

                </Button>

              </div>

            </CardContent>

          </Card>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            <Card>

              <CardHeader>

                <CardTitle>
                  Naslovna slika
                </CardTitle>

                <CardDescription>
                  JPG, PNG ili WEBP,
                  maksimalno 5 MB.
                </CardDescription>

              </CardHeader>

              <CardContent>

                <Label
                  htmlFor="image"
                  className="group block cursor-pointer"
                >

                  <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition group-hover:border-blue-500 group-hover:bg-blue-50">

                    {previewUrl ? (
                      <Image
                        src={
                          previewUrl
                        }
                        alt="Pregled naslovne slike"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="px-6 text-center">

                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                          <ImagePlus className="size-6" />
                        </div>

                        <p className="mt-4 font-semibold text-slate-800">
                          Odaberite fotografiju
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Kliknite za izbor slike
                        </p>

                      </div>
                    )}

                  </div>

                </Label>

                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="mt-4"
                  onChange={
                    handleImageChange
                  }
                />

                {imageFile && (
                  <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">

                    <p className="font-medium text-slate-800">
                      {imageFile.name}
                    </p>

                    <p className="mt-1">
                      {(
                        imageFile.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </p>

                  </div>
                )}

              </CardContent>

            </Card>

            <Card>

              <CardContent className="p-5">

                <p className="text-sm font-semibold text-slate-900">
                  Kako radi upload
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Slika se uploaduje na
                  cPanel, a njen URL i vrsta
                  novosti čuvaju se u
                  Firestore-u.
                </p>

              </CardContent>

            </Card>

          </div>

        </form>

      </div>
    </main>
  );
}
