import type { Metadata } from "next";
import { Images } from "lucide-react";

import { GalleryGrid } from "@/components/gallery-grid";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import Pagination from "@/components/pagination";
import { adminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galerija",
  description: "Fotografije školskih aktivnosti, događaja, radionica i projekata OŠ Drago Milović.",
};

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const GALLERY_PER_PAGE = 9;

interface GalleryPageProps {
  searchParams?: Promise<{ page?: string }>;
}

async function getGallery(page: number): Promise<{
  gallery: GalleryItem[];
  totalPages: number;
  currentPage: number;
}> {
  try {
    const countSnapshot = await adminDb.collection("gallery").count().get();
    const totalItems = countSnapshot.data().count;
    const totalPages = Math.max(1, Math.ceil(totalItems / GALLERY_PER_PAGE));
    const validPage = Math.min(Math.max(page, 1), totalPages);
    const offset = (validPage - 1) * GALLERY_PER_PAGE;
    const snapshot = await adminDb
      .collection("gallery")
      .orderBy("createdAt", "desc")
      .offset(offset)
      .limit(GALLERY_PER_PAGE)
      .get();

    return {
      gallery: snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title ?? "",
          description: data.description ?? "",
          imageUrl: data.imageUrl ?? "",
        };
      }),
      totalPages,
      currentPage: validPage,
    };
  } catch (error) {
    console.error("Greška pri učitavanju galerije:", error);
    return { gallery: [], totalPages: 1, currentPage: 1 };
  }
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const parsedPage = Number(params?.page ?? "1");
  const requestedPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const { gallery, totalPages, currentPage } = await getGallery(requestedPage);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#fbfaf6]">
        <PageIntro
          eyebrow="Život naše škole"
          title="Galerija"
          description="Trenuci iz učionica, sa radionica, događaja i projekata — sačuvani kao vizuelni dnevnik naše školske zajednice."
          icon={Images}
          tone="coral"
          aside={
            <p className="max-w-56 text-sm leading-6 text-white/55">
              Izaberite fotografiju za veliki prikaz i krećite se strelicama kroz kolekciju.
            </p>
          }
        />

        <section className="paper-grid py-16 sm:py-20">
          <div className="site-container">
            {gallery.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/65 px-6 py-20 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-rose-50 text-[#ef513f]">
                  <Images className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-black tracking-tight text-[#071f32]">
                  Galerija je trenutno prazna
                </h2>
                <p className="mt-2 text-slate-500">Nove fotografije će se prikazati ovdje.</p>
              </div>
            ) : (
              <>
                <GalleryGrid gallery={gallery} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath="/gallery"
                />
              </>
            )}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
