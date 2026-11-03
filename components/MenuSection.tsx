"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, Sparkles, Users } from "lucide-react";
import { DishCard } from "@/components/DishCard";
import { useApp } from "@/components/AppProvider";
import {
  dishes,
  featuredPlatter,
  formatSAR,
  menuCategories,
  type MenuFilter,
} from "@/lib/menu";
import { cn } from "@/lib/cn";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function MenuSection() {
  const { addItem, cart, openConcierge } = useApp();
  const [filter, setFilter] = useState<MenuFilter>("All");
  const [platterAdded, setPlatterAdded] = useState(false);
  const platterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const platterQty =
    cart.find((line) => line.dish.id === featuredPlatter.id)?.qty ?? 0;

  const filtered = useMemo(
    () =>
      filter === "All"
        ? dishes
        : dishes.filter((dish) => dish.category === filter),
    [filter],
  );

  const handleAddPlatter = () => {
    addItem({
      id: featuredPlatter.id,
      name: featuredPlatter.name,
      description: featuredPlatter.description,
      price: featuredPlatter.price,
      image: featuredPlatter.image,
      category: "Signature",
      detail: featuredPlatter.detail,
      badge: "For the table",
    });
    setPlatterAdded(true);
    if (platterTimer.current) clearTimeout(platterTimer.current);
    platterTimer.current = setTimeout(() => setPlatterAdded(false), 1600);
  };

  return (
    <section id="menu" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="section-pad mx-auto max-w-[90rem]">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-sea-700">
                The menu · صيد اليوم
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="mt-4 font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.035em] text-ink"
            >
              Crafted from{" "}
              <em className="font-normal italic text-sea-700">
                today&apos;s catch.
              </em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-sm text-[13.5px] leading-[1.8] text-ink/55 lg:pb-2"
          >
            Small plates, raw bar and charcoal-fired signatures. Every price is
            in SAR and includes VAT — add a plate and our concierge will handle
            the rest.
          </motion.p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-b border-ink/[0.08] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Filter the menu"
            className="no-scrollbar flex items-center gap-2 overflow-x-auto"
          >
            {menuCategories.map((category) => {
              const active = filter === category;
              const count =
                category === "All"
                  ? dishes.length
                  : dishes.filter((dish) => dish.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(category)}
                  className={cn(
                    "relative shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 sm:px-5",
                    active
                      ? "border-transparent text-cream"
                      : "border-ink/[0.09] bg-white/60 text-ink/55 hover:border-ink/20 hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="menu-filter-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                  <span
                    className={cn(
                      "relative z-10 ml-1.5 text-[8px]",
                      active ? "text-cream/50" : "text-ink/30",
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => openConcierge()}
            className="inline-flex w-fit items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sea-700 transition-colors hover:text-ink"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold-dark" />
            Ask the concierge
          </button>
        </div>

        <motion.div
          layout
          className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((dish, index) => (
              <DishCard key={dish.id} dish={dish} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease }}
          className="group mt-6 grid overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white shadow-[0_24px_70px_-45px_rgba(11,37,40,0.35)] md:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[380px]">
            <Image
              src={featuredPlatter.image}
              alt="The Fish Factory tiered seafood platter for the table"
              fill
              sizes="(max-width: 768px) 100vw, 52vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
            <span className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/85 px-3.5 py-1.5 text-[8.5px] font-bold uppercase tracking-[0.18em] text-ink/70 backdrop-blur">
              The centerpiece
            </span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-dark">
              <Users className="h-3.5 w-3.5" strokeWidth={1.8} />
              {featuredPlatter.serves} · available daily
            </p>
            <h3 className="mt-4 font-display text-[clamp(2rem,3.2vw,2.9rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              {featuredPlatter.name}
            </h3>
            <p className="mt-4 max-w-md text-[13px] leading-[1.8] text-ink/55">
              {featuredPlatter.description}
            </p>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-5 border-t border-ink/[0.08] pt-6">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-ink/35">
                  SAR · VAT included
                </p>
                <p className="mt-1 font-display text-[2.4rem] leading-none text-ink">
                  {formatSAR(featuredPlatter.price)}
                </p>
                {platterQty > 0 && (
                  <p className="mt-1.5 text-[10px] font-semibold text-sea-600">
                    {platterQty} in your order
                  </p>
                )}
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handleAddPlatter}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[11.5px] font-bold transition-colors duration-300",
                  platterAdded
                    ? "bg-sea-600 text-cream"
                    : "bg-ink text-cream hover:bg-sea-800",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {platterAdded ? (
                    <motion.span
                      key="platter-added"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" strokeWidth={2.4} />
                      Platter added
                    </motion.span>
                  ) : (
                    <motion.span
                      key="platter-add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.4} />
                      Add platter to order
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
