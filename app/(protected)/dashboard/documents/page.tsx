import Link from "next/link";

import {
  FileText,
  PlusCircle,
} from "lucide-react";

import {
  adminDb,
} from "@/lib/firebase-admin";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  DeleteDocumentButton,
} from "@/components/delete-document-button";

import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category:
    | "document"
    | "procurement";
  publishedAt: string;
  fileUrl: string;
}

async function getDocuments(): Promise<
  DocumentItem[]
> {
  const snapshot =
    await adminDb
      .collection("documents")
      .orderBy(
        "publishedAt",
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

        category:
          data.category ===
          "procurement"
            ? "procurement"
            : "document",

        publishedAt:
          data.publishedAt ?? "",

        fileUrl:
          data.fileUrl ?? "",
      };
    }
  );
}

function formatDate(
  date: string
) {
  if (!date) {
    return "";
  }

  const parsedDate =
    new Date(
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

export default async function DashboardDocumentsPage() {
  const documents =
    await getDocuments();

  return (
    <div className="flex flex-1 flex-col">

      <div className="flex flex-col gap-6 p-4 lg:p-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Dokumenti
            </h1>

            <p className="mt-1 text-muted-foreground">
              Upravljajte dokumentima
              i javnim nabavkama.
            </p>
          </div>

          <Link
            href="/dashboard/documents/new"
            className={cn(
              buttonVariants()
            )}
          >
            <PlusCircle className="mr-2 size-4" />

            Dodaj dokument
          </Link>

        </div>

        {/* EMPTY STATE */}
        {documents.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">

              <FileText className="size-12 text-muted-foreground/30" />

              <h2 className="mt-4 text-lg font-semibold">
                Trenutno nema dokumenata
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Dodajte prvi dokument ili javnu nabavku.
              </p>

            </CardContent>
          </Card>
        )}

        {/* DOCUMENTS */}
        {documents.length > 0 && (
          <div className="space-y-3">

            {documents.map(
              (item) => (
                <Card
                  key={item.id}
                  className="transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">

                    {/* ICON */}
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <FileText className="size-5" />
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">

                      {/* TITLE */}
                      <p className="font-semibold">
                        {item.title}
                      </p>

                      {/* DESCRIPTION */}
                      {item.description && (
                        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      )}

                      {/* META */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">

                        <span
                          className={
                            item.category ===
                            "procurement"
                              ? "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
                              : "inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800"
                          }
                        >
                          {item.category ===
                          "procurement"
                            ? "Javna nabavka"
                            : "Dokument"}
                        </span>

                        {item.publishedAt && (
                          <span className="text-xs text-muted-foreground">
                            {formatDate(
                              item.publishedAt
                            )}
                          </span>
                        )}

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap items-center gap-2">

                      <Link
                        href={
                          item.fileUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({
                            variant:
                              "outline",
                            size:
                              "sm",
                          })
                        )}
                      >
                        Preuzmi
                      </Link>

                      <DeleteDocumentButton
                        id={item.id}
                        title={item.title}
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
  );
}
