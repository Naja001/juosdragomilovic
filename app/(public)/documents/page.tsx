import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { DocumentList, type DocumentItem } from "@/components/document-list";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dokumenti",
  description: "Pregled i preuzimanje zvaničnih dokumenata OŠ Drago Milović.",
};

async function getDocuments(): Promise<DocumentItem[]> {
  try {
    const snapshot = await adminDb
      .collection("documents")
      .where("category", "==", "document")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title ?? "",
        description: data.description ?? "",
        publishedAt: data.publishedAt ?? "",
        fileUrl: data.fileUrl ?? "",
        fileName: data.fileName ?? "",
      };
    });
  } catch (error) {
    console.error("Greška pri učitavanju dokumenata:", error);
    return [];
  }
}

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#fbfaf6]">
        <PageIntro
          eyebrow="Dokumentacija"
          title="Dokumenti"
          description="Zvanična školska dokumenta uredno organizovana na jednom mjestu, spremna za pregled i preuzimanje."
          icon={FileText}
          tone="blue"
        />
        <section className="paper-grid py-16 sm:py-20">
          <div className="site-container max-w-5xl">
            <DocumentList documents={documents} />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
