"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Anchor,
  ArrowDown,
  BadgeCheck,
  Clock4,
  Fish,
  MapPin,
  Shell,
  Sparkles,
  Star,
} from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { Stars } from "@/components/ui/Stars";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const avatars = [
  { initials: "RA", className: "bg-sea-200 text-sea-800" },
  { initials: "AK", className: "bg-gold-light text-gold-dark" },
  { initials: "LS", className: "bg-[#EADFD5] text-[#7A5540]" },
];

export function Hero() {
  const { openConcierge } = useApp();
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const iconParallax = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-16 h-[30rem] w-[30rem] rounded-full bg-sea-100/70 blur-3xl" />
        <div className="absolute -right-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-gold-light/35 blur-3xl" />
        <div className="absolute left-[38%] top-[28%] h-[26rem] w-[26rem] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute inset-0 texture opacity-[0.045]" />
        <div className="absolute right-0 top-24 hidden h-[520px] w-[520px] rounded-full border border-gold/15 lg:block" />
        <div className="absolute right-12 top-40 hidden h-[380px] w-[380px] rounded-full border border-sea-700/10 lg:block" />
      </div>

      <motion.div
        aria-hidden="true"
        style={{ y: reduceMotion ? 0 : iconParallax }}
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <div className="absolute left-[35%] top-[5%] hidden animate-float xl:block">
          <div className="grid h-16 w-16 place-items-center rounded-full border border-sea-700/10 bg-white/50 text-sea-700/25 blur-[0.2px] backdrop-blur-sm">
            <Fish className="h-7 w-7" strokeWidth={1.1} />
          </div>
        </div>
        <div className="absolute left-[46%] top-[13%] animate-float-slow">
          <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/20 bg-white/40 text-gold-dark/35 backdrop-blur-sm">
            <Shell className="h-5 w-5" strokeWidth={1.2} />
          </div>
        </div>
        <div className="absolute right-[2%] top-[22%] animate-float-slow">
          <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/20 bg-white/40 text-gold-dark/30 backdrop-blur-sm">
            <Anchor className="h-6 w-6" strokeWidth={1.1} />
          </div>
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
      >
        <span className="text-[8px] font-semibold uppercase tracking-[0.38em] text-ink/30 [writing-mode:vertical-rl]">
          Riyadh · 24.7136° N · 46.6753° E
        </span>
        <span className="h-20 w-px bg-ink/10" />
      </div>

      <div className="section-pad mx-auto grid max-w-[90rem] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <div className="relative z-10 max-w-[40rem]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-sea-700">
              Red Sea catch · Al Olaya, Riyadh
            </span>
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(3.35rem,6.6vw,6rem)] font-medium leading-[0.9] tracking-[-0.035em] text-ink">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.25, ease }}
              >
                The finest
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.38, ease }}
              >
                <em className="font-normal italic text-sea-700">catch</em>, in
                Riyadh.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.6, ease }}
            className="mt-6 max-w-[31rem] text-[15px] leading-[1.75] text-ink/60 sm:text-base"
          >
            Seafood without ceremony. A bright, contemporary dining room in the
            heart of Al Olaya, where the morning&apos;s catch meets charcoal
            fire and every plate is finished with intent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.72, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {avatars.map((avatar) => (
                  <span
                    key={avatar.initials}
                    className={`grid h-8 w-8 place-items-center rounded-full border-2 border-cream text-[9px] font-bold ${avatar.className}`}
                  >
                    {avatar.initials}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Stars starClassName="h-3 w-3" />
                  <span className="text-[13px] font-bold text-ink">4.7</span>
                  <span className="text-[11px] text-ink/40">/ 5</span>
                </div>
                <p className="mt-0.5 text-[10px] font-medium text-ink/45">
                  10,000+ Google reviews
                </p>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-ink/10 sm:block" />
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink/55">
              <BadgeCheck className="h-4 w-4 text-sea-600" strokeWidth={1.6} />
              Halal · Red Sea sourced
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.84, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#menu"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[13px] font-semibold text-cream shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-sea-800 hover:shadow-lift"
            >
              Explore menu
              <ArrowDown className="h-4 w-4 text-gold-light transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => openConcierge("book")}
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-ink/[0.12] bg-white/65 px-7 py-4 text-[13px] font-semibold text-ink backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:bg-white"
            >
              <Sparkles className="relative z-10 h-4 w-4 text-gold-dark transition-transform duration-500 group-hover:rotate-12" />
              <span className="relative z-10">Book via AI</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.05 }}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/40"
          >
            <span className="inline-flex items-center gap-1.5">
              <Clock4 className="h-3.5 w-3.5" strokeWidth={1.6} />
              Open today · 12pm – 1am
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.6} />
              10 min from Kingdom Centre
            </span>
            <span>Valet parking</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease }}
          className="relative z-10 mx-auto w-full max-w-[31rem] lg:mr-2"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[3.25rem] border border-gold/30 sm:-inset-5"
          />
          <motion.div
            style={{ y: reduceMotion ? 0 : imageParallax }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2.75rem] bg-ivory shadow-lift ring-1 ring-ink/[0.06]"
          >
            <Image
              src="/images/fishfactory-hero.jpg"
              alt="A tiered Fish Factory seafood platter of Red Sea lobster, langoustines, king prawns and oysters on ice"
              fill
              priority
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 60vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-cream">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.32em] text-cream/65">
                  Today&apos;s catch
                </p>
                <p className="mt-1.5 font-display text-[1.65rem] leading-none">
                  Red Sea plateau
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-cream/25 bg-cream/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                Chef&apos;s table
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -18, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="absolute left-3 top-7 w-[178px] rounded-2xl border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur-xl sm:-left-7 sm:w-[195px]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-ink/40">
                Live from the kitchen
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sea-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sea-500" />
              </span>
            </div>
            <p className="mt-2 font-display text-lg leading-tight text-ink">
              Fresh catch landed
            </p>
            <p className="mt-1 text-[10px] font-medium text-ink/45">
              Red Sea · 06:00 today
            </p>
          </motion.div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: 18, y: 14 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 1.25, ease }}
              className="absolute -right-1 bottom-[5.5rem] flex items-center gap-3 rounded-2xl border border-white/10 bg-ink/90 px-4 py-3 text-cream shadow-glow backdrop-blur-md sm:-right-6"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 bg-gold/10">
                <Star
                  className="h-4 w-4 text-gold"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
              <span>
                <span className="block text-[13px] font-semibold leading-none">
                  {`4.7 / 5`}
                </span>
                <span className="mt-1 block text-[9px] font-medium text-cream/55">
                  10,000+ guests
                </span>
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.a
        href="#menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mx-auto mt-14 hidden w-fit items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-ink/35 transition-colors hover:text-ink lg:flex"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full border border-ink/10">
          <ArrowDown className="h-3 w-3" />
        </span>
        Scroll to explore
        <span className="h-px w-10 bg-ink/15" />
      </motion.a>
    </section>
  );
}
