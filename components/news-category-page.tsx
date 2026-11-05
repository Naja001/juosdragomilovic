import { Leaf, Newspaper } from "lucide-react";

import { adminDb } from "@/lib/firebase-admin";
import NewsList, { type NewsListItem } from "@/components/news-list";
import Pagination from "@/components/pagination";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";

const NEWS_PER_PAGE = 7;
type NewsCategory = "school" | "eco";

interface NewsCategoryPageProps {
  category: NewsCategory;
  currentPage?: number;
  title?: string;
  description?: string;
  basePath?: "/news" | "/eco-school";
}

async function getNews(category: NewsCategory, page: number) {
  try {
    const snapshot = await adminDb
      .collection("news")
      .where("category", "==", category)
      .get();

    const allNews: NewsListItem[] = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title ?? "",
          excerpt: data.excerpt ?? "",
          publishedAt: data.publishedAt ?? "",
          imageUrl: data.imageUrl ?? "",
        };
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

    const totalPages = Math.max(1, Math.ceil(allNews.length / NEWS_PER_PAGE));
    const validPage = Math.min(Math.max(page, 1), totalPages);
    const start = (validPage - 1) * NEWS_PER_PAGE;

    return {
      news: allNews.slice(start, start + NEWS_PER_PAGE),
      totalPages,
      currentPage: validPage,
    };
  } catch (error) {
    console.error("Greška pri učitavanju novosti:", error);
    return { news: [], totalPages: 1, currentPage: 1 };
  }
}

export default async function NewsCategoryPage({
  category,
  currentPage = 1,
  title,
  description,
  basePath,
}: NewsCategoryPageProps) {
  const isEco = category === "eco";
  const path = basePath ?? (isEco ? "/eco-school" : "/news");
  const result = await getNews(category, currentPage);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <PageIntro
          eyebrow={isEco ? "Odgovorno prema prirodi" : "Aktuelno iz škole"}
          title={title ?? (isEco ? "Eko škola" : "Novosti")}
          description={
            description ??
            (isEco
              ? "Pratite aktivnosti, projekte i inicijative naše Eko škole."
              : "Pratite najnovije informacije, aktivnosti, projekte i uspjehe učenika naše škole.")
          }
          icon={isEco ? Leaf : Newspaper}
          tone={isEco ? "green" : "blue"}
          
        />

        <section className="paper-grid py-16 sm:py-20">
          <div className="site-container">
            <NewsList news={result.news} basePath={path} />
            <Pagination
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              basePath={path}
            />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
