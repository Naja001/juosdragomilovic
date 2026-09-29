"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="paper-grid flex min-h-screen items-center justify-center bg-[#fbfaf6] px-6 py-20">
      <div className="max-w-xl text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-rose-50 text-[#ef513f]">
          <AlertTriangle className="size-6" />
        </span>
        <h1 className="mt-7 text-4xl font-black tracking-[-0.05em] text-[#071f32]">
          Nešto nije prošlo kako treba.
        </h1>
        <p className="mt-4 leading-7 text-slate-600">
          Pokušajte ponovo. Ako se problem nastavi, vratite se na početnu stranicu.
        </p>
        <button
          type="button"
          onClick={reset}
          className="focus-ring mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-[#071f32] px-6 py-3.5 text-sm font-black text-white"
        >
          <RotateCcw className="size-4" />
          Pokušaj ponovo
        </button>
      </div>
    </main>
  );
}
