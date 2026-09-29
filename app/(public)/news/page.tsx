import type { Metadata } from "next";

import NewsCategoryPage from "@/components/news-category-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Novosti",
  description: "Najnovije informacije, aktivnosti, projekti i uspjesi učenika OŠ Drago Milović.",
};

interface NewsPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function NewsPage({
  searchParams,
}: NewsPageProps) {
  const params =
    searchParams
      ? await searchParams
      : undefined;

  const parsedPage =
    Number(
      params?.page ??
        "1"
    );

  const currentPage =
    Number.isInteger(
      parsedPage
    ) &&
    parsedPage > 0
      ? parsedPage
      : 1;

  return (
    <NewsCategoryPage
      category="school"
      currentPage={
        currentPage
      }
      basePath="/news"
    />
  );
}
