import "server-only";

import { cache } from "react";

import type { ArticleItem } from "@/components/article-detail";
import { adminDb } from "@/lib/firebase-admin";

export type ArticleCategory = "school" | "eco";

export const getArticle = cache(
  async (id: string, category: ArticleCategory): Promise<ArticleItem | null> => {
    try {
      const document = await adminDb.collection("news").doc(id).get();
      if (!document.exists) return null;

      const data = document.data();
      if (!data || (data.category && data.category !== category)) return null;

      return {
        id: document.id,
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        content: data.content ?? "",
        publishedAt: data.publishedAt ?? "",
        imageUrl: data.imageUrl ?? "",
      };
    } catch (error) {
      console.error("Greška pri učitavanju objave:", error);
      return null;
    }
  },
);
