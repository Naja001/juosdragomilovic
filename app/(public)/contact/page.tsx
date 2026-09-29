import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { SectionReveal } from "@/components/section-reveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt podaci, lokacija i kontakt forma OŠ Drago Milović u Tivtu.",
};

const contactCards = [
  {
    label: "Adresa",
    value: "Šetalište kapetana Marka Krstovića",
    detail: "Tivat, Crna Gora",
    icon: MapPin,
    color: "bg-[#f5c64d]",
  },
  {
    label: "Telefon",
    value: "+382 32 670 550",
    href: "tel:+38232670550",
    detail: "+382 69 030 811",
    detailHref: "tel:+38269030811",
    icon: Phone,
    color: "bg-[#4ec5ee]",
  },
  {
    label: "E-mail",
    value: "skola@os-dmilovic.edu.me",
    href: "mailto:skola@os-dmilovic.edu.me",
    detail: "rukovodstvo@os-dmilovic.edu.me",
    detailHref: "mailto:rukovodstvo@os-dmilovic.edu.me",
    icon: Mail,
    color: "bg-[#ef513f] text-white",
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-[#fbfaf6]">
        <PageIntro
          eyebrow="Kontakt"
          title="Tu smo za vaša pitanja."
          description="Kontaktirajte nas telefonom, e-mailom ili nas posjetite u prostorijama OŠ „Drago Milović“ u Tivtu."
          icon={Mail}
          tone="coral"
          aside={
            <div className="space-y-2 text-sm font-bold text-white/70">
              <a href="tel:+38232670550" className="flex items-center gap-2 transition-colors hover:text-white">
                <Phone className="size-4 text-[#4ec5ee]" />
                +382 32 670 550
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-[#f5c64d]" />
                Tivat, Crna Gora
              </span>
            </div>
          }
        />

        <section className="relative z-10 -mt-7">
          <div className="site-container grid gap-4 md:grid-cols-3">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <SectionReveal key={card.label} delay={index * 0.06} className="h-full">
                  <article className="h-full rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-[0_25px_70px_-42px_rgb(7_31_50/45%)]">
                    <span className={`flex size-12 items-center justify-center rounded-2xl text-[#071f32] ${card.color}`}>
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-6 text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-400">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="mt-2 block break-words font-black text-[#071f32] transition-colors hover:text-[#158bd2]">
                        {card.value}
                      </a>
                    ) : (
                      <h2 className="mt-2 font-black text-[#071f32]">{card.value}</h2>
                    )}
                    {card.detailHref ? (
                      <a href={card.detailHref} className="mt-2 block break-words text-sm text-slate-500 transition-colors hover:text-[#158bd2]">
                        {card.detail}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-slate-500">{card.detail}</p>
                    )}
                  </article>
                </SectionReveal>
              );
            })}
          </div>
        </section>

        <section className="paper-grid py-20 sm:py-28">
          <div className="site-container grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionReveal className="lg:sticky lg:top-32">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ef513f]">Pišite nam</p>
              <h2 className="text-balance mt-4 text-4xl font-black leading-[1.03] tracking-[-0.045em] text-[#071f32] sm:text-5xl">
                Pošaljite nam poruku
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-slate-600">
                Za pitanja u vezi sa nastavom, upisom, dokumentacijom ili drugim informacijama, popunite kontakt formu.
              </p>
              <div className="mt-8 border-l-2 border-[#f5c64d] pl-5 text-sm leading-6 text-slate-500">
                Odgovor ćemo poslati na e-mail adresu koju unesete u formi.
              </div>
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <ContactForm />
            </SectionReveal>
          </div>
        </section>

        <section className="bg-white pt-20 sm:pt-24">
          <div className="site-container">
            <SectionReveal className="mb-9 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#158bd2]">Lokacija</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-[#071f32] sm:text-5xl">Pronađite nas</h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  OŠ „Drago Milović“ nalazi se na Šetalištu kapetana Marka Krstovića u Tivtu.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Osnovna+skola+Drago+Milovic+Tivat"
                target="_blank"
                rel="noreferrer"
                className="focus-ring group inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-[#071f32] transition-colors hover:border-[#158bd2] hover:text-[#158bd2]"
              >
                Otvori mapu
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </SectionReveal>
          </div>
          <div className="w-full overflow-hidden border-y border-slate-200 bg-slate-100">
            <iframe
              title="OŠ Drago Milović - lokacija"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.2590025468676!2d18.6968995833431!3d42.435751656837105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c317717f42d7b%3A0x5969d0ef0183681b!2sOsnovna%20%C5%A1kola%20Drago%20Milovi%C4%87!5e0!3m2!1ssr!2s!4v1786279725874!5m2!1ssr!2s"
              className="block h-[30rem] w-full border-0 lg:h-[36rem]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <section className="bg-[#158bd2] text-white">
          <div className="site-container flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#bdeef8]">OŠ Drago Milović</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] sm:text-3xl">Znanje, tradicija i zajedništvo.</h2>
            </div>
            <a
              href="mailto:skola@os-dmilovic.edu.me"
              className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-[#f5c64d] px-6 py-3.5 text-sm font-black text-[#071f32] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="size-4" />
              Pošalji e-mail
            </a>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
