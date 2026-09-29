"use client";

import { Suspense, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";

function getFirebaseErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return error instanceof Error ? error.message : "Došlo je do greške pri prijavi.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Email ili lozinka nijesu ispravni.";
    case "auth/invalid-email":
      return "Unesite ispravnu email adresu.";
    case "auth/user-disabled":
      return "Ovaj korisnički nalog je onemogućen.";
    case "auth/operation-not-allowed":
      return "Prijava emailom i lozinkom nije uključena u Firebase-u.";
    case "auth/too-many-requests":
      return "Previše pokušaja prijave. Pokušajte ponovo kasnije.";
    case "auth/network-request-failed":
      return "Mrežna greška. Provjerite internet konekciju.";
    case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
    case "auth/invalid-api-key":
      return "Firebase API ključ nije ispravan.";
    default:
      return `Prijava nije uspjela: ${error.code}`;
  }
}

function isSafeRedirectPath(path: string | null): path is string {
  return Boolean(path && path.startsWith("/") && !path.startsWith("//") && path !== "/login");
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071f32]">
      <div className="flex items-center gap-3 text-white">
        <Loader2 className="size-5 animate-spin text-[#4ec5ee]" />
        <span className="text-sm font-bold">Učitavanje...</span>
      </div>
    </main>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestedRedirect = searchParams.get("redirectTo");
  const redirectTo = isSafeRedirectPath(requestedRedirect) ? requestedRedirect : "/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace(redirectTo);
      router.refresh();
    } catch (error: unknown) {
      console.error("Firebase sign-in error:", error);
      setError(getFirebaseErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PageTransition>
      <main className="grid min-h-screen bg-[#fbfaf6] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-[#071f32] lg:block">
          <Image
            src="/images/ucionica.jpg"
            alt="Učenici OŠ Drago Milović u učionici"
            fill
            priority
            sizes="55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#071f32] via-[#071f32]/58 to-[#071f32]/15" />
          <div className="ink-grid absolute inset-0 opacity-20" aria-hidden="true" />

          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="focus-ring absolute left-8 top-8 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#071f32]/30 px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#071f32]"
          >
            <ArrowLeft className="size-3.5" />
            Nazad na sajt
          </Link>

          <div className="absolute inset-x-0 bottom-0 z-10 p-10 xl:p-14">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#f5c64d] px-3.5 py-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#071f32]">
              <GraduationCap className="size-3.5" />
              OŠ Drago Milović
            </p>
            <h1 className="text-balance mt-6 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white xl:text-6xl">
              Sadržaj škole, organizovan na jednom mjestu.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              Siguran pristup novostima, Eko aktivnostima, dokumentima i školskoj galeriji.
            </p>
          </div>
        </section>

        <section className="paper-grid relative flex min-h-screen items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="focus-ring absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-[#071f32] lg:hidden"
          >
            <ArrowLeft className="size-3.5" />
            Početna
          </Link>

          <div className="w-full max-w-md">
            <div className="flex size-14 items-center justify-center rounded-[1.25rem] bg-[#071f32] text-white shadow-[0_20px_40px_-24px_rgb(7_31_50/75%)]">
              <GraduationCap className="size-6 text-[#f5c64d]" />
            </div>
            <p className="mt-8 text-[0.63rem] font-black uppercase tracking-[0.18em] text-[#158bd2]">Administratorski pristup</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#071f32] sm:text-5xl">Dobro došli.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Prijavite se školskim nalogom da biste pristupili administraciji.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-[#071f32]">Email adresa</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ime@os-dmilovic.edu.me"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={isLoading}
                    className="h-13 rounded-xl border-slate-200 bg-white pl-11 shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor="password" className="font-bold text-[#071f32]">Lozinka</Label>
                  <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold text-slate-400">
                    <ShieldCheck className="size-3.5 text-[#43a978]" />
                    Siguran pristup
                  </span>
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Unesite lozinku"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isLoading}
                    className="h-13 rounded-xl border-slate-200 bg-white pl-11 shadow-sm"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              {error ? (
                <div role="alert" className="rounded-xl border border-[#ef513f]/20 bg-[#ef513f]/8 px-4 py-3 text-sm font-bold text-[#b93226]">
                  {error}
                </div>
              ) : null}

              <Button
                type="submit"
                size="lg"
                className="group h-13 w-full rounded-full bg-[#071f32] font-black text-white hover:bg-[#12354c]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Prijavljivanje...
                  </>
                ) : (
                  <>
                    Prijavi se
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Pristup je dozvoljen samo ovlašćenim korisnicima škole.
              </p>
            </form>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
