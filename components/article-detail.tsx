import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Leaf,
  Newspaper,
} from "lucide-react";

import { PageTransition } from "@/components/page-transition";
import { ReadingProgress } from "@/components/reading-progress";

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  imageUrl?: string;
}

interface ArticleDetailProps {
  article: ArticleItem;
  kind: "school" | "eco";
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

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getParagraphs(content: string) {
  return content
    .split(/\r?\n\s*\r?\n|\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function ArticleDetail({ article, kind }: ArticleDetailProps) {
  const isEco = kind === "eco";
  const basePath = isEco ? "/eco-school" : "/news";
  const sectionLabel = isEco ? "Eko škola" : "Novosti";
  const Icon = isEco ? Leaf : Newspaper;
  const paragraphs = getParagraphs(article.content);
  const readingTime = getReadingTime(article.content);

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#fbfaf6]">
        <ReadingProgress />
        <article>
          <header className="relative isolate overflow-hidden bg-[#071f32] text-white">
            <div className="ink-grid absolute inset-0 opacity-45" aria-hidden="true" />
            <div
              className={`absolute -right-32 -top-40 size-[38rem] rounded-full blur-3xl ${
                isEco ? "bg-[#43a978]/25" : "bg-[#158bd2]/26"
              }`}
              aria-hidden="true"
            />
            <div className="site-container relative pb-28 pt-12 sm:pb-36 sm:pt-16 lg:pb-44">
              <Link
                href={basePath}
                transitionTypes={["nav-back"]}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2.5 text-xs font-black uppercase tracking-[0.13em] text-white/75 backdrop-blur transition-all hover:-translate-x-1 hover:bg-white hover:text-[#071f32]"
              >
                <ArrowLeft className="size-3.5" />
                Sve objave
              </Link>

              <div className="mt-12 max-w-5xl sm:mt-16">
                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.14em]">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[#071f32] ${
                      isEco ? "bg-[#65d6a0]" : "bg-[#4ec5ee]"
                    }`}
                  >
                    <Icon className="size-3.5" />
                    {sectionLabel}
                  </span>
                  {article.publishedAt ? (
                    <span className="inline-flex items-center gap-2 text-white/55">
                      <CalendarDays className="size-3.5" />
                      {formatDate(article.publishedAt)}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-2 text-white/55">
                    <Clock3 className="size-3.5" />
                    {readingTime} min čitanja
                  </span>
                </div>

                <h1 className="text-balance mt-7 text-[clamp(2.8rem,7.2vw,6.6rem)] font-black leading-[0.93] tracking-[-0.06em]">
                  {article.title}
                </h1>
                {article.excerpt ? (
                  <p className="text-pretty mt-7 max-w-3xl text-lg leading-8 text-white/64 sm:text-xl sm:leading-9">
                    {article.excerpt}
                  </p>
                ) : null}
              </div>
            </div>
          </header>

          {article.imageUrl ? (
            <div className="site-container relative z-10 -mt-20 sm:-mt-28 lg:-mt-32">
              <ViewTransition
                name={`news-image-${article.id}`}
                share="image-morph"
                default="none"
              >
                <figure className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border-[6px] border-[#fbfaf6] bg-slate-200 shadow-[0_38px_100px_-40px_rgb(7_31_50/65%)] sm:aspect-[16/9] sm:rounded-[2.5rem] sm:border-[10px]">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 1280px) 94vw, 1280px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/8" />
                </figure>
              </ViewTransition>
            </div>
          ) : null}

          <section className={`site-container pb-24 sm:pb-32 ${article.imageUrl ? "pt-14 sm:pt-20" : "pt-16 sm:pt-24"}`}>
            <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,44rem)] lg:justify-center lg:gap-16">
              <aside className="lg:sticky lg:top-32 lg:h-fit">
                <p className="font-mono text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Objavljeno
                </p>
                <p className="mt-2 font-black text-[#071f32]">
                  {formatDate(article.publishedAt) || "OŠ Drago Milović"}
                </p>
                <div className={`mt-6 h-1 w-12 rounded-full ${isEco ? "bg-[#43a978]" : "bg-[#158bd2]"}`} />
                <p className="mt-6 text-sm leading-6 text-slate-500">
                  Zvanična objava JU OŠ „Drago Milović“ Tivat.
                </p>
              </aside>

              <div className="min-w-0">
                {paragraphs.length > 0 ? (
                  <div className="article-copy space-y-7 text-[1.06rem] leading-[1.95] text-slate-700 sm:text-[1.16rem]">
                    {paragraphs.map((paragraph, index) => (
                      <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg leading-8 text-slate-500">
                    Sadržaj objave će uskoro biti dostupan.
                  </p>
                )}

                <div className="mt-14 border-t border-slate-200 pt-8">
                  <Link
                    href={basePath}
                    transitionTypes={["nav-back"]}
                    className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[#071f32] px-5 py-3.5 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
                  >
                    {isEco ? "Sve Eko objave" : "Sve novosti"}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </PageTransition>
  );
}
