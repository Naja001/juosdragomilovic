import type { Metadata, Viewport } from "next";
import { Suspense } from "react";

import { PerformanceLayer } from "@/components/performance-layer";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "JU OŠ Drago Milović — Tivat",
    template: "%s | OŠ Drago Milović",
  },
  description:
    "Zvanična internet prezentacija JU Osnovne škole Drago Milović u Tivtu.",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#071f32",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr-Latn"
      data-scroll-behavior="smooth"
      className="antialiased"
    >
      <body className="min-h-dvh">
        {children}
        <Suspense fallback={null}>
          <PerformanceLayer />
        </Suspense>
      </body>
    </html>
  );
}
