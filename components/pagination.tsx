import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/news",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const itemClass =
    "focus-ring inline-flex size-11 items-center justify-center rounded-full border text-sm font-black transition-all";

  return (
    <nav
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
      aria-label="Stranice sadržaja"
    >
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          transitionTypes={["nav-back"]}
          className={`${itemClass} border-slate-200 bg-white text-[#071f32] hover:-translate-x-0.5 hover:border-[#158bd2]`}
          aria-label="Prethodna stranica"
        >
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span
          className={`${itemClass} cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300`}
          aria-hidden="true"
        >
          <ChevronLeft className="size-4" />
        </span>
      )}

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            transitionTypes={[page < currentPage ? "nav-back" : "nav-forward"]}
            aria-current={isActive ? "page" : undefined}
            className={`${itemClass} ${
              isActive
                ? "border-[#071f32] bg-[#071f32] text-white shadow-lg"
                : "border-slate-200 bg-white text-[#071f32] hover:border-[#158bd2] hover:text-[#158bd2]"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          transitionTypes={["nav-forward"]}
          className={`${itemClass} border-slate-200 bg-white text-[#071f32] hover:translate-x-0.5 hover:border-[#158bd2]`}
          aria-label="Sljedeća stranica"
        >
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span
          className={`${itemClass} cursor-not-allowed border-slate-200 bg-slate-100 text-slate-300`}
          aria-hidden="true"
        >
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}
