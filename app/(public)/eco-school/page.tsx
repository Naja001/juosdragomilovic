import type { Metadata } from "next";

import NewsCategoryPage from "@/components/news-category-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eko škola",
  description: "Ekološke aktivnosti, projekti i inicijative OŠ Drago Milović.",
};

interface EcoSchoolPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function EcoSchoolPage({
  searchParams,
}: EcoSchoolPageProps) {
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
      category="eco"
      currentPage={
        currentPage
      }
      title="Eko škola"
      description="Aktivnosti, projekti i inicijative naše škole posvećene zaštiti životne sredine i razvoju ekološke svijesti."
      basePath="/eco-school"
    />
  );
}
