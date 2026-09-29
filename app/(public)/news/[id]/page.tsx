import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/article-detail";
import { getArticle } from "@/lib/news-content";

export const dynamic = "force-dynamic";

interface NewsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id, "school");

  if (!article) return { title: "Objava nije pronađena" };
  return {
    title: article.title,
    description: article.excerpt || "Novost iz OŠ Drago Milović Tivat.",
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { id } = await params;
  const article = await getArticle(id, "school");
  if (!article) notFound();

  return <ArticleDetail article={article} kind="school" />;
}
