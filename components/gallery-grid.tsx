"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface GalleryGridProps {
  gallery: GalleryItem[];
}

export function GalleryGrid({ gallery }: GalleryGridProps) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const selectedItem = selectedIndex !== null ? gallery[selectedIndex] : null;

  const closeLightbox = useCallback(() => {
    const index = selectedIndex;
    setSelectedIndex(null);
    requestAnimationFrame(() => {
      if (index !== null) cardRefs.current[index]?.focus();
    });
  }, [selectedIndex]);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return current;
      return current === 0 ? gallery.length - 1 : current - 1;
    });
  }, [gallery.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return current;
      return current === gallery.length - 1 ? 0 : current + 1;
    });
  }, [gallery.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();

      if (event.key === "Tab" && dialogRef.current) {
        const controls = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (controls.length === 0) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, selectedIndex, showNext, showPrevious]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item, index) => {
          return (
            <motion.button
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : (index % 3) * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="focus-ring group relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-slate-200 text-left shadow-[0_22px_60px_-45px_rgb(7_31_50/50%)]"
              aria-label={`Otvori fotografiju ${index + 1}: ${item.title || "Fotografija iz galerije"}`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title || "Fotografija iz galerije"}
                fill
                loading={index < 3 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute right-4 top-4 flex size-10 translate-y-1 items-center justify-center rounded-full bg-white/92 text-[#071f32] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <Expand className="size-4" />
              </span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedItem && selectedIndex !== null ? (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title || "Pregled fotografije"}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-800/65 p-3 backdrop-blur-md sm:p-6 lg:p-10"
            onClick={closeLightbox}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(delta) < 45) return;
              if (delta > 0) showPrevious();
              else showNext();
            }}
          >
            <motion.div
              key={selectedItem.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid h-[min(88dvh,52rem)] w-full max-w-6xl grid-rows-[auto_1fr] overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#071f32]/95 text-white shadow-[0_34px_110px_-30px_rgb(2_12_21/85%)] sm:rounded-[2.25rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex min-h-16 items-center justify-between border-b border-white/10 px-5 sm:px-7">
                <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/55">
                  Galerija &nbsp;·&nbsp; {String(selectedIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    closeLightbox();
                  }}
                  className="focus-ring flex size-10 items-center justify-center rounded-full bg-white text-[#071f32] shadow-xl transition-transform hover:rotate-6"
                  aria-label="Zatvori galeriju"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <figure className="relative min-h-0 bg-[#03111c]">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title || "Fotografija iz galerije"}
                  fill
                  priority
                  className="object-contain p-2 sm:p-4"
                  sizes="(max-width: 1024px) 96vw, 1152px"
                />

                {gallery.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="focus-ring absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/65 text-white shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-white hover:text-[#071f32] sm:left-5 sm:size-12"
                      aria-label="Prethodna fotografija"
                    >
                      <ChevronLeft className="size-6" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="focus-ring absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/65 text-white shadow-lg backdrop-blur transition-all hover:scale-105 hover:bg-white hover:text-[#071f32] sm:right-5 sm:size-12"
                      aria-label="Sljedeća fotografija"
                    >
                      <ChevronRight className="size-6" />
                    </button>
                  </>
                ) : null}
              </figure>
            </motion.div>

          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
