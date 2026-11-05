import type { Metadata } from "next";
import { FileCheck2 } from "lucide-react";

import { DocumentList, type DocumentItem } from "@/components/document-list";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Javne nabavke",
  description: "Dokumentacija i informacije o javnim nabavkama OŠ Drago Milović.",
};

async function getDocuments(): Promise<DocumentItem[]> {
  try {
    const snapshot = await adminDb
      .collection("documents")
      .where("category", "==", "procurement")
      .get();

    return snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title ?? "",
          description: data.description ?? "",
          publishedAt: data.publishedAt ?? "",
          fileUrl: data.fileUrl ?? "",
          fileName: data.fileName ?? "",
          createdAt: data.createdAt?.toDate?.() ?? new Date(0),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("Greška pri učitavanju javnih nabavki:", error);
    return [];
  }
}

export default async function PublicProcurementsPage() {
  const documents = await getDocuments();

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#fbfaf6]">
        <PageIntro
          eyebrow="Transparentno poslovanje"
          title="Javne nabavke"
          description="Dokumentacija i informacije vezane za postupke javnih nabavki naše škole."
          icon={FileCheck2}
          tone="yellow"
        />
        <section className="paper-grid py-16 sm:py-20">
          <div className="site-container max-w-5xl">
            <DocumentList documents={documents} tone="yellow" />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
