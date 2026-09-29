"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

const navigation = [
  { label: "Naslovna", href: "/" },
  { label: "O školi", href: "/about" },
  { label: "Novosti", href: "/news" },
  { label: "Eko škola", href: "/eco-school" },
  { label: "Galerija", href: "/gallery" },
  { label: "Dokumenta", href: "/documents" },
  { label: "Javne nabavke", href: "/public-procurements" },
  { label: "Kontakt", href: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="hidden bg-[#071f32] text-white lg:block">
        <div className="site-container flex h-9 items-center justify-between text-[0.72rem] font-medium tracking-wide">
          <div className="flex items-center gap-5 text-white/72">
            <span className="flex items-center gap-2">
              <Clock3 className="size-3.5 text-[#4ec5ee]" />
              Od 1845. uz generacije Tivćana
            </span>
            <span className="h-3 w-px bg-white/15" />
            <Link
              href="/contact"
              transitionTypes={["nav-forward"]}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <MapPin className="size-3.5 text-[#f5c64d]" />
              Šetalište kapetana Marka Krstovića, Tivat
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+38232670550"
              className="flex items-center gap-2 transition-colors hover:text-[#4ec5ee]"
            >
              <Phone className="size-3.5" />
              032 670 550
            </a>
            <a
              href="https://www.facebook.com/p/O%C5%A0-Drago-Milovi%C4%87-Tivat-61552056832474/"
              aria-label="Facebook stranica škole"
              target="_blank"
              rel="noreferrer"
              className="flex size-6 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-[#4ec5ee] hover:text-[#4ec5ee]"
            >
              <FaFacebookF className="size-2.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200/80 bg-[rgb(251_250_246/0.94)] backdrop-blur-xl">
        <div className="site-container flex h-[4.65rem] items-center justify-between gap-6">
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            onClick={() => setIsMenuOpen(false)}
            className="focus-ring group flex shrink-0 items-center gap-3 rounded-lg"
            aria-label="OŠ Drago Milović — početna"
          >
            <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-[0.9rem] bg-white shadow-[0_8px_26px_-14px_rgb(7_31_50/45%)] ring-1 ring-slate-200/80">
              <Image
                src="/images/logoOsDragoM.png"
                alt=""
                fill
                priority
                sizes="48px"
                className="scale-[1.55] object-cover object-center transition-transform duration-500 group-hover:scale-[1.65]"
              />
            </span>
            <span className="hidden sm:block">
              <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.23em] text-[#158bd2]">
                JU Osnovna škola
              </span>
              <span className="mt-0.5 block text-[1.12rem] font-black tracking-[-0.035em] text-[#071f32]">
                Drago Milović
              </span>
            </span>
          </Link>

          <nav
            aria-label="Glavna navigacija"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  transitionTypes={[item.href === "/" ? "nav-back" : "nav-forward"]}
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring relative rounded-full px-3 py-2 text-[0.78rem] font-bold transition-colors ${
                    active
                      ? "bg-[#071f32] text-white"
                      : "text-slate-600 hover:bg-sky-50 hover:text-[#071f32]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/login"
              transitionTypes={["nav-forward"]}
              className="focus-ring group hidden items-center gap-2 rounded-full bg-[#ef513f] px-4 py-2.5 text-xs font-black text-white shadow-[0_10px_24px_-12px_rgb(239_81_63/75%)] transition-all hover:-translate-y-0.5 hover:bg-[#da4132] lg:inline-flex"
            >
              Prijava
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button
              type="button"
              aria-label={isMenuOpen ? "Zatvori meni" : "Otvori meni"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="focus-ring flex size-11 items-center justify-center rounded-full bg-[#071f32] text-white xl:hidden"
            >
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[4.65rem] h-[calc(100dvh-4.65rem)] overflow-y-auto bg-[#071f32] text-white lg:top-[6.9rem] lg:h-[calc(100dvh-6.9rem)] xl:hidden"
          >
            <div className="ink-grid min-h-full px-5 pb-8 pt-6 sm:px-8">
              <nav aria-label="Mobilna navigacija" className="mx-auto max-w-2xl">
                {navigation.map((item, index) => {
                  const active = isActive(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduceMotion ? 0 : index * 0.035 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        transitionTypes={[
                          item.href === "/" ? "nav-back" : "nav-forward",
                        ]}
                        aria-current={active ? "page" : undefined}
                        className="focus-ring group flex items-center justify-between border-b border-white/10 py-4"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[0.65rem] text-[#4ec5ee]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-2xl font-bold tracking-tight ${
                              active ? "text-[#f5c64d]" : "text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                        </span>
                        <ArrowUpRight className="size-5 text-white/35 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                <a
                  href="tel:+38232670550"
                  className="focus-ring flex items-center gap-3 rounded-2xl bg-white/7 p-4 text-sm font-semibold"
                >
                  <Phone className="size-4 text-[#f5c64d]" />
                  032 670 550
                </a>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  transitionTypes={["nav-forward"]}
                  className="focus-ring flex items-center justify-between rounded-2xl bg-[#ef513f] p-4 text-sm font-bold"
                >
                  Administratorska prijava
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
