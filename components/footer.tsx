import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  { label: "O školi", href: "/about" },
  { label: "Novosti", href: "/news" },
  { label: "Eko škola", href: "/eco-school" },
  { label: "Galerija", href: "/gallery" },
  { label: "Dokumenta", href: "/documents" },
  { label: "Javne nabavke", href: "/public-procurements" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden bg-[#071f32] text-white">
      <div className="ink-grid">
        <div className="site-container py-14 sm:py-18">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_1fr]">
            <div>
              <Link
                href="/"
                transitionTypes={["nav-back"]}
                className="focus-ring inline-flex items-center gap-4 rounded-xl"
              >
                <span className="relative size-14 overflow-hidden rounded-2xl bg-white">
                  <Image
                    src="/images/logoOsDragoM.png"
                    alt=""
                    fill
                    sizes="56px"
                    className="scale-[1.55] object-cover"
                  />
                </span>
                <span>
                  <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-[#4ec5ee]">
                    JU Osnovna škola
                  </span>
                  <span className="mt-1 block text-xl font-black tracking-tight">
                    Drago Milović
                  </span>
                </span>
              </Link>
              <p className="text-pretty mt-6 max-w-sm leading-7 text-white/58">
                Škola znanja, prijateljstva i razvoja — u srcu Tivta od 1845.
                godine.
              </p>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f5c64d]">
                Istražite
              </p>
              <nav
                aria-label="Navigacija u podnožju"
                className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3"
              >
                {footerLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    transitionTypes={["nav-forward"]}
                    className="focus-ring rounded text-sm font-semibold text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f5c64d]">
                Kontakt
              </p>
              <div className="mt-5 space-y-3 text-sm text-white/65">
                <Link
                  href="/contact"
                  transitionTypes={["nav-forward"]}
                  className="focus-ring flex items-start gap-3 rounded transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[#4ec5ee]" />
                  Šetalište kapetana Marka Krstovića, Tivat
                </Link>
                <a
                  href="tel:+38232670550"
                  className="focus-ring flex items-center gap-3 rounded transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-[#4ec5ee]" />
                  032 670 550
                </a>
                <a
                  href="mailto:skola@os-dmilovic.edu.me"
                  className="focus-ring flex items-center gap-3 rounded transition-colors hover:text-white"
                >
                  <Mail className="size-4 text-[#4ec5ee]" />
                  skola@os-dmilovic.edu.me
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear} OŠ „Drago Milović“. Sva prava zadržana.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                transitionTypes={["nav-forward"]}
                className="focus-ring rounded transition-colors hover:text-white"
              >
                Prijava
              </Link>
              <a
                href="#main-content"
                className="focus-ring group inline-flex items-center gap-1.5 rounded transition-colors hover:text-white"
              >
                Na vrh
                <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <p className="mt-3 text-[0.625rem] tracking-wide text-white/22">
            Dizajn, razvoj i izvorni kod © {currentYear} N. O.
          </p>
        </div>
      </div>
    </footer>
  );
}
