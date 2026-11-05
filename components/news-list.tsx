import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";

export interface NewsListItem {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  imageUrl?: string;
}

interface NewsListProps {
  news: NewsListItem[];
  basePath?: "/news" | "/eco-school";
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

export default function NewsList({ news, basePath = "/news" }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/60 px-6 py-20 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-[#158bd2]">
          <Newspaper className="size-6" />
        </span>
        <h2 className="mt-5 text-xl font-black tracking-tight text-[#071f32]">
          Trenutno nema objavljenih vijesti
        </h2>
        <p className="mt-2 text-slate-500">Nove objave će se prikazati ovdje.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-x-5 gap-y-10">
      {news.map((item, index) => {
        const href = `${basePath}/${item.id}`;
        const imageUrl = item.imageUrl ?? "";
        const featured = index === 0;

        return (
          <article
            key={item.id}
            className={`group col-span-12 ${
              featured ? "" : "sm:col-span-6 lg:col-span-4"
            }`}
          >
            <div
              className={
                featured
                  ? "grid overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_28px_80px_-46px_rgb(7_31_50/45%)] lg:grid-cols-[1.36fr_0.74fr]"
                  : ""
              }
            >
              <Link
                href={href}
                transitionTypes={["nav-forward"]}
                className={`focus-ring block ${featured ? "min-h-80 lg:min-h-124" : "rounded-[1.6rem]"}`}
              >
                <ViewTransition
                  name={`news-image-${item.id}`}
                  share="image-morph"
                  default="none"
                >
                  <div
                    className={`relative overflow-hidden bg-slate-200 ${
                      featured ? "h-full min-h-80" : "aspect-16/11 rounded-[1.6rem]"
                    }`}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        priority={featured}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                        sizes={
                          featured
                            ? "(max-width: 1024px) 100vw, 64vw"
                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                      />
                    ) : (
                      <div className="paper-grid flex size-full items-center justify-center bg-[#e4f7fa]">
                        <Newspaper className="size-12 text-[#158bd2]/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-[#071f32]/35 via-transparent to-transparent opacity-70" />
                    <span className="absolute right-4 top-4 flex size-11 translate-y-1 items-center justify-center rounded-full bg-white text-[#071f32] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </ViewTransition>
              </Link>

              <div
                className={
                  featured
                    ? "flex flex-col justify-center p-7 sm:p-9 lg:p-10"
                    : "px-1 pt-5"
                }
              >
                <div className="flex flex-wrap items-center gap-3">
                  {featured ? (
                    <span className="rounded-full bg-[#ef513f] px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white">
                      Izdvojeno
                    </span>
                  ) : null}
                  {item.publishedAt ? (
                    <span className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.11em] text-slate-400">
                      <CalendarDays className="size-3.5 text-[#158bd2]" />
                      {formatDate(item.publishedAt)}
                    </span>
                  ) : null}
                </div>
                <h2
                  className={`text-balance font-black leading-[1.08] tracking-[-0.04em] text-[#071f32] transition-colors group-hover:text-[#158bd2] ${
                    featured
                      ? "mt-5 text-3xl sm:text-4xl lg:text-[2.7rem]"
                      : "mt-3 text-xl sm:text-2xl"
                  }`}
                >
                  <Link href={href} transitionTypes={["nav-forward"]}>
                    {item.title}
                  </Link>
                </h2>
                {item.excerpt ? (
                  <p
                    className={`mt-4 text-slate-600 ${
                      featured
                        ? "text-base leading-7 sm:text-lg sm:leading-8"
                        : "line-clamp-3 leading-7"
                    }`}
                  >
                    {item.excerpt}
                  </p>
                ) : null}
                {featured ? (
                  <Link
                    href={href}
                    transitionTypes={["nav-forward"]}
                    className="focus-ring mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-[#071f32] px-5 py-3 text-sm font-black text-white transition-transform hover:-translate-y-0.5"
                  >
                    Pročitaj objavu
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
