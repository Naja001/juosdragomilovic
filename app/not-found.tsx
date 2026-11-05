import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="paper-grid flex min-h-screen items-center justify-center bg-[#fbfaf6] px-6 py-20">
      <div className="max-w-xl text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#e4f7fa] text-[#158bd2]">
          <Compass className="size-6" />
        </span>
        <p className="font-editorial mt-8 text-8xl italic leading-none text-[#158bd2]">404</p>
        <h1 className="mt-6 text-4xl font-black tracking-tighter text-[#071f32]">
          Ova stranica nije pronađena.
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Moguće je da je adresa promijenjena ili sadržaj više nije dostupan.
        </p>
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="focus-ring mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-[#071f32] px-6 py-3.5 text-sm font-black text-white"
        >
          <ArrowLeft className="size-4" />
          Nazad na početnu
        </Link>
      </div>
    </main>
  );
}
