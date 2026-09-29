"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ROUTES_TO_WARM = [
  "/about",
  "/news",
  "/eco-school",
  "/gallery",
  "/documents",
  "/public-procurements",
  "/contact",
];

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

export function PerformanceLayer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const reduceMotion = useReducedMotion();
  const [isNavigating, setIsNavigating] = useState(false);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (target.target === "_blank" || target.hasAttribute("download")) return;

      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (target.getAttribute("href")?.startsWith("#")) return;

      setIsNavigating(true);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      safetyTimer.current = setTimeout(() => setIsNavigating(false), 8000);
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
    };
  }, []);

  useEffect(() => {
    const finishTimer = setTimeout(() => setIsNavigating(false), reduceMotion ? 0 : 620);
    return () => clearTimeout(finishTimer);
  }, [pathname, reduceMotion, searchKey]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") {
      return;
    }

    let cancelled = false;
    let idleHandle: number | undefined;
    let fallbackHandle: ReturnType<typeof setTimeout> | undefined;

    const warmRoutes = () => {
      let routeIndex = 0;

      const warmNext = () => {
        if (cancelled || routeIndex >= ROUTES_TO_WARM.length) return;
        router.prefetch(ROUTES_TO_WARM[routeIndex]);
        routeIndex += 1;

        if ("requestIdleCallback" in window) {
          idleHandle = window.requestIdleCallback(warmNext, { timeout: 1800 });
        } else {
          fallbackHandle = setTimeout(warmNext, 180);
        }
      };

      warmNext();
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.warn("Service worker nije mogao biti pokrenut:", error);
      });
    }

    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(warmRoutes, { timeout: 2400 });
    } else {
      fallbackHandle = setTimeout(warmRoutes, 1000);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (fallbackHandle) clearTimeout(fallbackHandle);
    };
  }, [router]);

  return (
    <AnimatePresence>
      {isNavigating ? (
        <motion.div
          aria-live="polite"
          aria-label="Učitavanje nove stranice"
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[180] flex justify-center pt-4"
        >
          <div className="relative overflow-hidden rounded-full border border-white/12 bg-[#071f32]/95 px-5 py-3 text-white shadow-[0_18px_55px_-22px_rgb(7_31_50/85%)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="font-editorial text-lg italic text-[#f5c64d]">DM</span>
              <span className="text-[0.62rem] font-black uppercase tracking-[0.17em] text-white/75">
                Otvaramo stranicu
              </span>
            </div>
            <motion.span
              className="absolute inset-x-0 bottom-0 h-1 origin-left bg-[#4ec5ee]"
              initial={{ scaleX: 0.08 }}
              animate={{ scaleX: 0.92 }}
              transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
