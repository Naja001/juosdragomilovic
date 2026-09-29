import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";

import { adminDb } from "@/lib/firebase-admin";
import type { NewsListItem } from "@/components/news-list";
import { SectionReveal } from "@/components/section-reveal";

async function getLatestNews(): Promise<NewsListItem[]> {
  try {
    const snapshot = await adminDb
      .collection("news")
      .where("category", "==", "school")
      .get();

    return snapshot.docs
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
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, 4);
  } catch (error) {
    console.error("Greška pri učitavanju novosti:", error);
    return [];
  }
}

function formatDate(date: string) {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "";

  return new Intl.DateTimeFormat("sr-Latn-ME", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export default async function LatestNews() {
  const news = await getLatestNews();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="site-container">
        <SectionReveal className="mb-12 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#158bd2]">
              <Newspaper className="size-4" />
              Aktuelno
            </div>
            <h2 className="text-balance mt-5 text-4xl font-black leading-none tracking-[-0.05em] text-[#071f32] sm:text-5xl lg:text-6xl">
              Najnovije
              <span className="font-editorial ml-2 font-normal italic text-[#158bd2]">
                vijesti.
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Pogledajte najnovije informacije, aktivnosti i događaje iz naše
              škole.
            </p>
          </div>

          <Link
            href="/news"
            transitionTypes={["nav-forward"]}
            className="focus-ring group inline-flex w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-[#071f32] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#158bd2]"
          >
            Sve novosti
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </SectionReveal>

        {news.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-[#fbfaf6] px-6 py-16 text-center">
            <Newspaper className="mx-auto size-8 text-[#158bd2]/40" />
            <p className="mt-4 font-black text-[#071f32]">Trenutno nema objavljenih vijesti.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {news.map((item, index) => (
              <article
                key={item.id}
                className={`group overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_24px_65px_-48px_rgb(7_31_50/45%)] ${
                  index === 0
                    ? "md:col-span-3 md:grid md:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]"
                    : ""
                }`}
              >
                <Link
                  href={`/news/${item.id}`}
                  transitionTypes={["nav-forward"]}
                  className={`focus-ring block ${index === 0 ? "md:h-full" : ""}`}
                >
                  <ViewTransition
                    name={`news-image-${item.id}`}
                    share="image-morph"
                    default="none"
                  >
                    <div
                      className={`relative isolate overflow-hidden ${
                        index === 0
                          ? "aspect-[4/3] bg-white"
                          : "aspect-[16/10] bg-[#e4f7fa]"
                      }`}
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          priority={index < 2}
                          sizes={
                            index === 0
                              ? "(max-width: 768px) 100vw, 65vw"
                              : "(max-width: 768px) 100vw, 33vw"
                          }
                          className={
                            index === 0
                              ? "object-contain"
                              : "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                          }
                        />
                      ) : (
                        <div className="paper-grid flex size-full items-center justify-center">
                          <Newspaper className="size-9 text-[#158bd2]/30" />
                        </div>
                      )}
                      <span className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-white text-[#071f32] opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </ViewTransition>
                </Link>

                <div
                  className={
                    index === 0
                      ? "flex flex-col justify-center p-7 sm:p-9"
                      : "p-6"
                  }
                >
                  {item.publishedAt ? (
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                      <CalendarDays className="size-3.5 text-[#158bd2]" />
                      {formatDate(item.publishedAt)}
                    </p>
                  ) : null}
                  <h3
                    className={`text-balance mt-3 font-black leading-snug tracking-[-0.03em] text-[#071f32] transition-colors group-hover:text-[#158bd2] ${
                      index === 0
                        ? "text-3xl sm:text-4xl"
                        : "text-xl sm:text-2xl"
                    }`}
                  >
                    <Link href={`/news/${item.id}`} transitionTypes={["nav-forward"]}>
                      {item.title}
                    </Link>
                  </h3>
                  {item.excerpt ? (
                    <p
                      className={`mt-3 leading-7 text-slate-600 ${
                        index === 0 ? "line-clamp-3" : "line-clamp-2"
                      }`}
                    >
                      {item.excerpt}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
