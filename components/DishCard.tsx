"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { formatSAR, type Dish } from "@/lib/menu";
import { cn } from "@/lib/cn";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function DishCard({ dish, index }: { dish: Dish; index: number }) {
  const { addItem, cart } = useApp();
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const qty = cart.find((line) => line.dish.id === dish.id)?.qty ?? 0;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAdd = () => {
    addItem(dish);
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1600);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.55, delay: index * 0.05, ease }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-ink/[0.07] bg-white shadow-[0_18px_50px_-34px_rgba(11,37,40,0.28)] transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
        {dish.badge && (
          <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-[8.5px] font-bold uppercase tracking-[0.16em] text-ink/70 shadow-sm backdrop-blur">
            {dish.badge}
          </span>
        )}
        <AnimatePresence>
          {qty > 0 && (
            <motion.span
              key={`qty-${qty}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 480, damping: 24 }}
              className="absolute right-4 top-4 grid h-7 min-w-7 place-items-center rounded-full bg-ink px-2 text-[10px] font-bold text-cream shadow-lg"
            >
              {qty} in order
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-sea-600/75">
              {dish.category}
            </p>
            <h3 className="mt-1.5 font-display text-[1.6rem] leading-none tracking-[-0.015em] text-ink">
              {dish.name}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-ink/35">
              SAR
            </p>
            <p className="mt-0.5 font-display text-[1.5rem] leading-none text-ink">
              {formatSAR(dish.price)}
            </p>
          </div>
        </div>

        <p className="mt-3 text-[12.5px] leading-relaxed text-ink/55">
          {dish.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <span className="max-w-[9rem] text-[8.5px] font-medium uppercase leading-relaxed tracking-[0.08em] text-ink/35">
            {dish.detail}
          </span>
          <motion.button
            type="button"
            onClick={handleAdd}
            whileTap={{ scale: 0.93 }}
            aria-label={`Add ${dish.name} to your order`}
            className={cn(
              "relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-4 py-2.5 text-[10.5px] font-bold transition-colors duration-300",
              added
                ? "bg-sea-600 text-cream"
                : "bg-ink text-cream hover:bg-sea-800",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -7 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                  Add to order
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {added && (
          <motion.span
            key="float-plus"
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -28, scale: 1 }}
            exit={{ opacity: 0, y: -45, scale: 0.9 }}
            transition={{ duration: 0.7, ease }}
            aria-hidden="true"
            className="pointer-events-none absolute bottom-16 right-6 rounded-full bg-gold px-2.5 py-1 text-[10px] font-extrabold text-ink shadow-glow"
          >
            +1
          </motion.span>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
