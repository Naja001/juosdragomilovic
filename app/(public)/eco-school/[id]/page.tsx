import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/article-detail";
import { getArticle } from "@/lib/news-content";

export const dynamic = "force-dynamic";

interface EcoArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EcoArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id, "eco");

  if (!article) return { title: "Objava nije pronađena" };
  return {
    title: article.title,
    description: article.excerpt || "Eko aktivnost OŠ Drago Milović Tivat.",
  };
}

export default async function EcoArticlePage({ params }: EcoArticlePageProps) {
  const { id } = await params;
  const article = await getArticle(id, "eco");
  if (!article) notFound();

  return <ArticleDetail article={article} kind="eco" />;
}
