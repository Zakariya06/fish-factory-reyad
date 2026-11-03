"use client";

import {
  ArrowUpRight,
  Clock4,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Stars } from "@/components/ui/Stars";
import { useApp } from "@/components/AppProvider";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  const { openConcierge } = useApp();

  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-sea-600/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full border border-gold/10" />
        <div className="absolute inset-0 texture opacity-[0.04]" />
      </div>

      <div className="section-pad relative mx-auto max-w-[90rem] pb-8 pt-14 lg:pt-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.1fr]">
          <div className="max-w-xs">
            <Logo inverted />
            <p className="mt-5 text-[12.5px] leading-[1.8] text-cream/45">
              The finest catch in Riyadh, charcoal-fired and plated with intent.
              A bright, modern seafood house in the heart of Al Olaya.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <Stars starClassName="h-3 w-3" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-cream/45">
                {site.rating}/5 · {site.reviews} reviews
              </span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/55 transition-colors hover:text-gold-light"
              >
                Instagram
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="h-3 w-px bg-cream/15" />
              <a
                href={site.x}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/55 transition-colors hover:text-gold-light"
              >
                X
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-light/70">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[12.5px] text-cream/55 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => openConcierge("book")}
                  className="text-[12.5px] text-cream/55 transition-colors hover:text-cream"
                >
                  Reservations
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-light/70">
              Visit us
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70"
                  strokeWidth={1.6}
                />
                <a
                  href={site.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] leading-relaxed text-cream/55 transition-colors hover:text-cream"
                >
                  {site.address}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock4
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70"
                  strokeWidth={1.6}
                />
                <span className="text-[12px] text-cream/55">{site.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-light/70">
              Contact
            </h3>
            <a
              href={site.phoneHref}
              className="mt-5 flex items-center gap-2 font-display text-[1.45rem] leading-none text-cream transition-colors hover:text-gold-light"
            >
              <Phone className="h-4 w-4 text-gold/70" strokeWidth={1.6} />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block text-[12.5px] text-cream/50 transition-colors hover:text-cream"
            >
              {site.email}
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-cream/50 transition-colors hover:text-cream"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.7} />
              WhatsApp us
            </a>
            <button
              type="button"
              onClick={() => openConcierge("book")}
              className="mt-6 flex w-full items-center justify-between gap-3 rounded-full border border-cream/15 px-4 py-3 text-[11px] font-semibold text-cream/80 transition-all hover:border-gold/40 hover:bg-cream/[0.04] hover:text-cream"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-gold-light" />
                Book via AI concierge
              </span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-14 select-none text-center font-display text-[clamp(3.5rem,11vw,9rem)] leading-[0.8] tracking-[-0.04em] text-cream/[0.045]"
        >
          FISH FACTORY
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-cream/10 pt-6 text-[9px] font-semibold uppercase tracking-[0.14em] text-cream/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Fish Factory. All rights reserved.</p>
          <p className="text-cream/40">{site.shortAddress} · Kingdom of Saudi Arabia</p>
          <p>Crafted with care in Riyadh</p>
        </div>
      </div>
    </footer>
  );
}
