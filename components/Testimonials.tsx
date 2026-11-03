"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { Stars } from "@/components/ui/Stars";
import { useApp } from "@/components/AppProvider";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const reviews = [
  {
    quote:
      "The freshest seafood I've had in Riyadh. The lobster is worth every riyal, and the room feels like a five-star hotel without the stiffness.",
    name: "Reem A.",
    meta: "Google review · Al Olaya",
    initials: "RA",
    featured: false,
  },
  {
    quote:
      "Booked through the AI concierge in under a minute. Window table, oysters on arrival, zero friction. This is how dining should feel.",
    name: "Abdullah K.",
    meta: "Google review · Riyadh",
    initials: "AK",
    featured: true,
  },
  {
    quote:
      "We come every Friday and it has never missed. Fast, bright, beautifully plated — the sea bass is the best in the city.",
    name: "Lina S.",
    meta: "Google review · Riyadh",
    initials: "LS",
    featured: false,
  },
];

export function Testimonials() {
  const { openConcierge } = useApp();

  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden border-y border-ink/[0.06] bg-ivory/55 py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 texture opacity-[0.035]"
      />
      <div className="section-pad relative mx-auto max-w-[90rem]">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-sea-700">
                Guest love
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink"
            >
              A thousand tables,{" "}
              <em className="font-normal italic text-sea-700">one verdict.</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-4 rounded-2xl border border-ink/[0.08] bg-white/70 px-5 py-4 backdrop-blur-sm"
          >
            <p className="font-display text-[2.8rem] leading-none text-ink">
              {site.rating}
            </p>
            <div>
              <Stars starClassName="h-3.5 w-3.5" />
              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/45">
                {site.reviews} reviews
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease }}
              whileHover={{ y: -6 }}
              className={cn(
                "flex flex-col justify-between rounded-[1.75rem] border p-6 shadow-[0_20px_60px_-45px_rgba(11,37,40,0.4)] transition-shadow duration-500 sm:p-7",
                review.featured
                  ? "border-sea-800 bg-sea-800 text-cream shadow-lift md:-translate-y-4"
                  : "border-ink/[0.07] bg-white text-ink hover:shadow-soft",
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars starClassName="h-3 w-3" />
                  <Quote
                    className={cn(
                      "h-6 w-6",
                      review.featured ? "text-gold/50" : "text-gold/45",
                    )}
                    strokeWidth={1.2}
                  />
                </div>
                <blockquote
                  className={cn(
                    "mt-5 font-display text-[1.35rem] leading-[1.35] tracking-[-0.01em]",
                    review.featured ? "text-cream/90" : "text-ink/80",
                  )}
                >
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption
                className={cn(
                  "mt-7 flex items-center gap-3 border-t pt-5",
                  review.featured ? "border-cream/10" : "border-ink/[0.08]",
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full text-[10px] font-bold",
                    review.featured
                      ? "bg-gold text-ink"
                      : "bg-sea-100 text-sea-700",
                  )}
                >
                  {review.initials}
                </span>
                <span>
                  <span className="block text-[12px] font-bold">
                    {review.name}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block text-[9.5px] font-medium uppercase tracking-[0.1em]",
                      review.featured ? "text-cream/40" : "text-ink/40",
                    )}
                  >
                    {review.meta}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-3 text-center"
        >
          <p className="font-display text-xl text-ink/70">
            Join 10,000+ guests at Riyadh&apos;s favourite seafood table.
          </p>
          <button
            type="button"
            onClick={() => openConcierge("book")}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sea-700 transition-colors hover:text-ink"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-dark" />
            Book your table via AI
          </button>
        </motion.div>
      </div>
    </section>
  );
}
