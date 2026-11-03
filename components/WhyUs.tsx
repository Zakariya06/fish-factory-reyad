"use client";

import { motion, type Variants } from "framer-motion";
import {
  BadgeCheck,
  Flame,
  MapPin,
  Phone,
  Sparkles,
  Timer,
  Waves,
} from "lucide-react";
import { Stars } from "@/components/ui/Stars";
import { useApp } from "@/components/AppProvider";
import { site } from "@/lib/site";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const features = [
  {
    icon: Waves,
    metric: "06:00",
    title: "The daily catch",
    copy: "Hand-picked from Red Sea boats at dawn, on ice and in our kitchen by noon. Nothing sits, nothing waits.",
  },
  {
    icon: Flame,
    metric: "Josper",
    title: "Charcoal-fired",
    copy: "A Spanish Josper oven and saffron butter give every lobster, prawn and fillet its signature smoke.",
  },
  {
    icon: Timer,
    metric: "20 min",
    title: "Fast by design",
    copy: "A lunch built for Riyadh. Order ahead through our concierge and your table is served without the wait.",
  },
  {
    icon: MapPin,
    metric: "Al Olaya",
    title: "In the heart of the city",
    copy: "Minutes from Kingdom Centre with valet at the door, private dining, and a terrace made for evenings.",
  },
];

const trustBadges = [
  "Halal certified",
  "Red Sea sourced",
  "Valet parking",
  "Private dining",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

export function WhyUs() {
  const { openConcierge } = useApp();

  return (
    <section id="why" className="scroll-mt-24 py-16 lg:py-24">
      <div className="section-pad mx-auto max-w-[90rem]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-12 text-cream shadow-lift sm:px-10 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -right-24 -top-32 h-[32rem] w-[32rem] rounded-full border border-cream/[0.06]" />
            <div className="absolute -right-10 -top-16 h-[24rem] w-[24rem] rounded-full border border-gold/[0.12]" />
            <div className="absolute -bottom-40 left-1/3 h-[26rem] w-[26rem] rounded-full bg-sea-600/25 blur-3xl" />
            <div className="absolute inset-0 texture opacity-[0.05]" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold-light/80">
                  Why Fish Factory
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.08, ease }}
                className="mt-4 font-display text-[clamp(2.5rem,4.5vw,3.8rem)] font-medium leading-[0.98] tracking-[-0.03em]"
              >
                Riyadh&apos;s table for the{" "}
                <em className="font-normal italic text-gold-light">
                  finest catch.
                </em>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-5 text-[13.5px] leading-[1.8] text-cream/55"
              >
                No freezer shortcuts, no theatre. Just a bright room, a serious
                kitchen and seafood handled with the respect it deserves. It is
                why 10,000+ guests keep coming back.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mt-8 flex items-center gap-4 border-t border-cream/10 pt-7"
              >
                <p className="font-display text-[3.2rem] leading-none text-cream">
                  {site.rating}
                </p>
                <div>
                  <Stars
                    starClassName="h-3.5 w-3.5"
                    label={`Rated ${site.rating} out of 5`}
                  />
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/45">
                    {site.reviews} guest reviews
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.28 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={() => openConcierge("book")}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[12px] font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Sparkles className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12" />
                  Reserve with AI
                </button>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 px-6 py-3.5 text-[12px] font-semibold text-cream/80 transition-colors hover:border-cream/35 hover:text-cream"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {site.phone}
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.article
                    key={feature.title}
                    variants={item}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-cream/10 bg-cream/[0.045] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-gold/25 hover:bg-cream/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-gold/20 bg-gold/[0.08] text-gold-light transition-transform duration-500 group-hover:scale-105">
                        <Icon className="h-5 w-5" strokeWidth={1.4} />
                      </span>
                      <span className="rounded-full border border-cream/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-cream/40">
                        {feature.metric}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.55rem] leading-tight text-cream">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-[12px] leading-[1.7] text-cream/50">
                      {feature.copy}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-cream/10 pt-6"
          >
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-cream/45"
              >
                <BadgeCheck
                  className="h-3.5 w-3.5 text-gold/80"
                  strokeWidth={1.6}
                />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
