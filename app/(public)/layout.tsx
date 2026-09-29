import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[200] -translate-y-20 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-xl transition-transform focus:translate-y-0"
      >
        Preskoči na sadržaj
      </a>
      <Navigation />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
}
