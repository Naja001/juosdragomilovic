import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  ImagePlus,
  Images,
} from "lucide-react";

import { adminDb } from "@/lib/firebase-admin";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  buttonVariants,
} from "@/components/ui/button";



import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";
import { DeleteGalleryButton } from "@/components/delete-gallery-button";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

async function getGallery(): Promise<
  GalleryItem[]
> {
  const snapshot =
    await adminDb
      .collection("gallery")
      .orderBy(
        "createdAt",
        "desc"
      )
      .get();

  return snapshot.docs.map(
    (doc) => {
      const data =
        doc.data();

      return {
        id: doc.id,

        title:
          data.title ?? "",

        description:
          data.description ?? "",

        imageUrl:
          data.imageUrl ?? "",
      };
    }
  );
}

export default async function GalleryDashboardPage() {
  const gallery =
    await getGallery();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">

        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

          {/* HEADER */}
          <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Galerija
              </h1>

              <p className="mt-1 text-muted-foreground">
                Pregledajte i upravljajte
                fotografijama školske galerije.
              </p>
            </div>

            <Link
              href="/dashboard/gallery/new"
              className={cn(
                buttonVariants()
              )}
            >
              <ImagePlus className="mr-2 size-4" />

              Dodaj sliku
            </Link>

          </div>

          {/* EMPTY */}
          {gallery.length === 0 && (
            <div className="px-4 lg:px-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">

                  <Images className="size-12 text-muted-foreground/30" />

                  <h2 className="mt-4 text-lg font-semibold">
                    Galerija je prazna
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Dodajte prvu fotografiju.
                  </p>

                </CardContent>
              </Card>
            </div>
          )}

          {/* GALLERY */}
          {gallery.length > 0 && (
            <div className="grid gap-4 px-4 sm:grid-cols-2 lg:px-6 xl:grid-cols-3">

              {gallery.map(
                (item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden p-0"
                  >

                    {/* IMAGE */}
                    {item.imageUrl ? (
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">

                        <Image
                          src={
                            item.imageUrl
                          }
                          alt={
                            item.title ||
                            "Slika iz galerije"
                          }
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1280px) 50vw,
                            33vw
                          "
                        />

                      </div>
                    ) : (
                      <div className="flex aspect-4/3 items-center justify-center bg-muted">

                        <Images className="size-10 text-muted-foreground/30" />

                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-lg">
                        {item.title ||
                          "Bez naslova"}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>

                      {item.description && (
                        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                          {
                            item.description
                          }
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap items-center gap-2">

                        {/* PUBLIC PREVIEW */}
                        <Link
                          href="/gallery"
                          className={cn(
                            buttonVariants({
                              variant:
                                "outline",
                              size: "sm",
                            })
                          )}
                        >
                          <Eye className="mr-2 size-4" />

                          Pregled
                        </Link>

                        {/* DELETE */}
                        <DeleteGalleryButton
                          id={item.id}
                          title={
                            item.title ||
                            "fotografiju"
                          }
                        />

                      </div>

                    </CardContent>

                  </Card>
                )
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
