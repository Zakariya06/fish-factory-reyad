"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock4,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { site } from "@/lib/site";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Visit() {
  const { openConcierge } = useApp();

  return (
    <section id="visit" className="scroll-mt-24 py-20 lg:py-28">
      <div className="section-pad mx-auto max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="grid overflow-hidden rounded-[2.5rem] border border-ink/[0.07] bg-white shadow-soft lg:grid-cols-[1.02fr_0.98fr]"
        >
          <div className="p-7 sm:p-10 lg:p-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-sea-700">
                Find us
              </span>
            </div>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,4.6vw,3.7rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink">
              In the heart of{" "}
              <em className="font-normal italic text-sea-700">Al Olaya.</em>
            </h2>
            <p className="mt-5 max-w-md text-[13.5px] leading-[1.8] text-ink/55">
              Ten minutes from Kingdom Centre, with valet at the King Fahd Road
              entrance. Lunch, late dinners and everything in between — seven
              days a week.
            </p>

            <div className="mt-8 space-y-5 border-t border-ink/[0.08] pt-7">
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/[0.08] bg-cream text-sea-700 transition-colors group-hover:border-gold/50">
                  <MapPin className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                    Address
                  </span>
                  <span className="mt-1 block max-w-xs text-[12.5px] font-medium leading-relaxed text-ink/75 transition-colors group-hover:text-ink">
                    {site.address}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/[0.08] bg-cream text-sea-700">
                  <Clock4 className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                    Opening hours
                  </span>
                  <span className="mt-1 block text-[12.5px] font-medium text-ink/75">
                    {site.hours}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-ink/40">
                    Kitchen closes at 12:30 AM · Valet until 1:30 AM
                  </span>
                </span>
              </div>

              <a href={site.phoneHref} className="group flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/[0.08] bg-cream text-sea-700 transition-colors group-hover:border-gold/50">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                    Reservations
                  </span>
                  <span className="mt-1 block font-display text-[1.35rem] font-medium leading-none text-ink transition-colors group-hover:text-sea-700">
                    {site.phone}
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openConcierge("book")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[12px] font-bold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-sea-800"
              >
                <Sparkles className="h-4 w-4 text-gold-light transition-transform duration-500 group-hover:rotate-12" />
                Book via AI
              </button>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/[0.12] px-6 py-3.5 text-[12px] font-semibold text-ink transition-colors hover:border-ink/30 hover:bg-cream"
              >
                <Navigation className="h-3.5 w-3.5" strokeWidth={1.8} />
                Get directions
              </a>
            </div>
          </div>

          <div className="relative min-h-[390px] overflow-hidden bg-[#E9F1ED] lg:min-h-[620px]">
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute inset-0 hairline-grid opacity-80" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.85),transparent_60%)]" />
              <div className="absolute -right-20 top-8 h-64 w-64 rounded-[46%] border border-sea-300/40 bg-sea-200/40" />
              <div className="absolute -bottom-16 -left-10 h-60 w-60 rounded-[44%] bg-sea-200/35" />
              <div className="absolute left-1/2 top-0 h-full w-[74px] -translate-x-1/2 rotate-[16deg] bg-white/60 shadow-[0_0_0_1px_rgba(11,37,40,0.045)]" />
              <div className="absolute left-0 top-[44%] h-[13px] w-full -rotate-[7deg] bg-white/65" />
              <div className="absolute left-0 top-[24%] h-[5px] w-full rotate-[24deg] bg-white/50" />
              <div className="absolute left-[18%] top-0 h-full w-[3px] rotate-[-12deg] bg-ink/[0.06]" />
              <div className="absolute bottom-[16%] right-0 h-[4px] w-full rotate-[4deg] bg-ink/[0.05]" />
              <span className="absolute left-[56%] top-[22%] -rotate-[72deg] text-[8px] font-bold uppercase tracking-[0.3em] text-ink/25">
                King Fahd Road
              </span>
              <span className="absolute bottom-[22%] left-[16%] text-[8px] font-bold uppercase tracking-[0.3em] text-ink/20">
                Al Olaya District
              </span>
              <span className="absolute right-6 top-6 text-[8px] font-semibold uppercase tracking-[0.2em] text-ink/30">
                24.7136° N · 46.6753° E
              </span>
            </div>

            <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 -m-5 animate-pulse-ring rounded-full border border-gold/40" />
              <span className="absolute inset-0 -m-5 rounded-full bg-gold/10" />
              <span className="relative grid h-14 w-14 place-items-center rounded-full border-[5px] border-white bg-ink text-gold shadow-lift">
                <MapPin className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="absolute left-1/2 top-full mt-3 w-max -translate-x-1/2 rounded-full border border-ink/[0.08] bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-ink shadow-sm backdrop-blur">
                Fish Factory
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute inset-x-5 bottom-5 flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur-xl sm:right-8 sm:left-auto sm:w-[260px]"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sea-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sea-500" />
                </span>
                <span className="text-[8.5px] font-bold uppercase tracking-[0.16em] text-sea-700">
                  Open now · until 1 AM
                </span>
              </div>
              <p className="font-display text-lg leading-tight text-ink">
                Al Olaya, Riyadh
              </p>
              <p className="text-[10.5px] leading-relaxed text-ink/45">
                Valet entrance on King Fahd Road. 10 minutes from Kingdom
                Centre.
              </p>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="group mt-1 flex items-center justify-between rounded-xl bg-ink px-3.5 py-2.5 text-[10px] font-bold text-cream transition-colors hover:bg-sea-800"
              >
                Open in Google Maps
                <ArrowUpRight className="h-3.5 w-3.5 text-gold-light transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
