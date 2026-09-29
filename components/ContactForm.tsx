"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Greška pri slanju.");
      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Došlo je do greške.");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "h-13 rounded-2xl border-slate-200 bg-[#fbfaf6] px-4 text-base transition-all placeholder:text-slate-400 focus-visible:border-[#158bd2] focus-visible:ring-[#158bd2]/15";

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white soft-shadow">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#158bd2] via-[#4ec5ee] to-[#f5c64d]" />
      <form onSubmit={handleSubmit} className="relative space-y-6 p-6 sm:p-8 lg:p-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#158bd2]">
            Pišite nam
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[#071f32]">
            Pošaljite poruku
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-bold text-[#071f32]">
              Ime i prezime
            </Label>
            <Input id="name" name="name" placeholder="Vaše ime i prezime" required className={fieldClass} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-bold text-[#071f32]">
              E-mail adresa
            </Label>
            <Input id="email" name="email" type="email" placeholder="ime@email.com" required className={fieldClass} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-bold text-[#071f32]">
            Naslov poruke
          </Label>
          <Input id="subject" name="subject" placeholder="Unesite naslov poruke" required className={fieldClass} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-bold text-[#071f32]">
            Vaša poruka
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Napišite vašu poruku..."
            rows={7}
            required
            className="min-h-44 resize-y rounded-2xl border-slate-200 bg-[#fbfaf6] p-4 text-base transition-all placeholder:text-slate-400 focus-visible:border-[#158bd2] focus-visible:ring-[#158bd2]/15"
          />
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-bold">Poruka je uspješno poslata.</p>
                <p className="mt-1 text-emerald-700">Hvala što ste nas kontaktirali.</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 size-5 shrink-0" />
              {error}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="flex justify-end pt-1">
          <Button
            type="submit"
            disabled={loading}
            className="h-13 w-full rounded-full bg-[#ef513f] px-7 font-black text-white shadow-[0_14px_30px_-16px_rgb(239_81_63/80%)] transition-all hover:-translate-y-0.5 hover:bg-[#da4132] sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Slanje...
              </>
            ) : (
              <>
                Pošalji poruku
                <Send className="ml-2 size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
