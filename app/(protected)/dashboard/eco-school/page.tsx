import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  Leaf,
  Newspaper,
  PlusCircle,
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

import {
  DeleteNewsButton,
} from "@/components/delete-news-button";

import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: "school" | "eco";
  imageUrl?: string;
}

async function getNews(): Promise<NewsItem[]> {
  const snapshot = await adminDb
    .collection("news")
    .where(
      "category",
      "==",
      "eco"
    )
    .get();

  const news: NewsItem[] =
    snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        publishedAt:
          data.publishedAt ?? "",
        category: "eco",
        imageUrl:
          data.imageUrl ?? "",
      };
    });

  return news.sort((a, b) =>
    b.publishedAt.localeCompare(
      a.publishedAt
    )
  );
}

function formatDate(date: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(
    `${date}T00:00:00`
  );

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "sr-Latn-ME",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  ).format(parsedDate);
}

export default async function NewsPage() {
  const news =
    await getNews();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">

        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

          {/* HEADER */}
          <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Eko škola
              </h1>

              <p className="mt-1 text-muted-foreground">
                Pregled svih objava i aktivnosti Eko škole.
              </p>
            </div>

            <Link
              href="/dashboard/news/new"
              className={cn(
                buttonVariants()
              )}
            >
              <PlusCircle className="mr-2 size-4" />

              Dodaj novost
            </Link>

          </div>

          {/* EMPTY STATE */}
          {news.length === 0 && (
            <div className="px-4 lg:px-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">

                  <Leaf className="size-12 text-muted-foreground/40" />

                  <h2 className="mt-4 text-lg font-semibold">
                    Trenutno nema Eko objava
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Kreirajte prvu Eko objavu.
                  </p>

                </CardContent>
              </Card>
            </div>
          )}

          {/* NEWS LIST */}
          {news.length > 0 && (
            <div className="grid gap-4 px-4 md:grid-cols-2 lg:px-6 xl:grid-cols-3">

              {news.map((item) => {
                const isEco =
                  item.category ===
                  "eco";

                return (
                  <Card
                    key={item.id}
                    className="overflow-hidden"
                  >
                    {/* IMAGE */}
                    {item.imageUrl ? (
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">

                        <Image
                          src={
                            item.imageUrl
                          }
                          alt={
                            item.title
                          }
                          fill
                          className="object-cover"
                          sizes="
                            (max-width: 768px) 100vw,
                            (max-width: 1280px) 50vw,
                            33vw
                          "
                        />

                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-muted">

                        <Leaf className="size-10 text-muted-foreground/30" />

                      </div>
                    )}

                    <CardHeader>

                      {/* CATEGORY */}
                      <div
                        className={
                          isEco
                            ? "mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800"
                            : "mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800"
                        }
                      >
                        {isEco ? (
                          <Leaf className="size-3.5" />
                        ) : (
                          <Newspaper className="size-3.5" />
                        )}

                        {isEco
                          ? "Eko škola"
                          : "Školska novost"}
                      </div>

                      <CardTitle className="line-clamp-2 text-lg">
                        {item.title}
                      </CardTitle>

                      {item.publishedAt && (
                        <p className="text-sm text-muted-foreground">
                          {formatDate(
                            item.publishedAt
                          )}
                        </p>
                      )}

                    </CardHeader>

                    <CardContent>

                      <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {item.excerpt}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-2">

                        {/* PREVIEW */}
                        <Link
                          href={`/eco-school/${item.id}`}
                          className={cn(
                            buttonVariants({
                              variant:
                                "outline",
                              size:
                                "sm",
                            })
                          )}
                        >
                          <Eye className="mr-2 size-4" />

                          Pregled
                        </Link>

                        {/* DELETE */}
                        <DeleteNewsButton
                          id={item.id}
                          title={
                            item.title
                          }
                        />

                      </div>

                    </CardContent>

                  </Card>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
