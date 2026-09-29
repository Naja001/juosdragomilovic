import Link from "next/link";
import { ArrowUpRight, CalendarDays, Download, FileText } from "lucide-react";

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  fileUrl: string;
  fileName: string;
}

interface DocumentListProps {
  documents: DocumentItem[];
  tone?: "blue" | "yellow";
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

export function DocumentList({ documents, tone = "blue" }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/60 px-6 py-20 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-[#158bd2]">
          <FileText className="size-6" />
        </span>
        <h2 className="mt-5 text-xl font-black tracking-tight text-[#071f32]">
          Trenutno nema dokumenata
        </h2>
      </div>
    );
  }

  const accent = tone === "yellow" ? "bg-[#f5c64d]" : "bg-[#158bd2]";

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white soft-shadow">
      {documents.map((item, index) => (
        <article
          key={item.id}
          className={`group grid gap-5 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8 ${
            index > 0 ? "border-t border-slate-200/80" : ""
          }`}
        >
          <div className="flex items-center gap-4 sm:block">
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-white ${accent}`}
            >
              <FileText className="size-5" />
            </span>
            <span className="font-mono text-[0.65rem] font-bold text-slate-300 sm:mt-3 sm:block sm:text-center">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="min-w-0">
            <h2 className="text-balance text-lg font-black leading-snug tracking-[-0.025em] text-[#071f32] sm:text-xl">
              {item.title}
            </h2>
            {item.description ? (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-400">
              {item.publishedAt ? (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-[#158bd2]" />
                  {formatDate(item.publishedAt)}
                </span>
              ) : null}
              {item.fileName ? <span className="truncate">{item.fileName}</span> : null}
            </div>
          </div>

          <Link
            href={item.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-[#071f32] transition-all hover:-translate-y-0.5 hover:border-[#158bd2] hover:text-[#158bd2]"
          >
            <Download className="size-4" />
            Preuzmi
            <ArrowUpRight className="size-3.5 opacity-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </article>
      ))}
    </div>
  );
}
