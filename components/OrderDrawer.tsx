"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Clock4,
  Fish,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { dishes, formatSAR } from "@/lib/menu";
import { useOverlay } from "@/lib/useOverlay";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function OrderDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    count,
    updateQty,
    removeItem,
    subtotal,
    openConcierge,
    addItem,
  } = useApp();

  useOverlay(cartOpen, closeCart);

  const suggestion = cart.length
    ? (dishes.find(
        (dish) => !cart.some((line) => line.dish.id === dish.id),
      ) ?? null)
    : null;

  const browseMenu = () => {
    closeCart();
    setTimeout(() => {
      document.getElementById("menu")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 320);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            key="order-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[3px]"
            aria-hidden="true"
          />
          <motion.aside
            key="order-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col overflow-hidden bg-cream shadow-2xl sm:rounded-l-[2rem]"
          >
            <div className="relative overflow-hidden border-b border-ink/[0.07] bg-white px-5 pb-5 pt-5 sm:px-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-gold-light/30 blur-2xl"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-sea-600">
                    <ShoppingBag className="h-3 w-3" strokeWidth={1.8} />
                    Your order
                    {count > 0
                      ? ` · ${count} ${count === 1 ? "item" : "items"}`
                      : ""}
                  </p>
                  <h2
                    id="order-title"
                    className="mt-2 font-display text-[2rem] leading-none tracking-[-0.02em] text-ink"
                  >
                    Ready when you are.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close your order"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-ink/25 hover:bg-cream"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hairline-grid opacity-40"
                />
                <div className="relative">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-ink/[0.08] bg-white text-sea-600 shadow-soft">
                    <Fish className="h-9 w-9" strokeWidth={1.2} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">
                    Your table is waiting.
                  </h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-[12.5px] leading-relaxed text-ink/50">
                    Add a plate or two from the menu — or ask the concierge for
                    tonight&apos;s recommendation.
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={browseMenu}
                      className="rounded-full bg-ink px-6 py-3.5 text-[11.5px] font-bold text-cream transition-colors hover:bg-sea-800"
                    >
                      Browse the menu
                    </button>
                    <button
                      type="button"
                      onClick={() => openConcierge()}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/[0.12] bg-white/70 px-6 py-3.5 text-[11.5px] font-semibold text-ink transition-colors hover:border-gold/60 hover:bg-white"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-gold-dark" />
                      Ask the concierge
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="concierge-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-5">
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {cart.map((line) => (
                      <motion.li
                        layout
                        key={line.dish.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          x: 40,
                          transition: { duration: 0.22 },
                        }}
                        className="flex gap-3.5 rounded-2xl border border-ink/[0.06] bg-white p-3"
                      >
                        <div className="relative h-[5.2rem] w-[5.2rem] shrink-0 overflow-hidden rounded-xl bg-ivory">
                          <Image
                            src={line.dish.image}
                            alt={line.dish.name}
                            fill
                            sizes="84px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-sea-600/70">
                                {line.dish.category}
                              </p>
                              <h3 className="mt-1 font-display text-[1.15rem] leading-tight text-ink">
                                {line.dish.name}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(line.dish.id)}
                              aria-label={`Remove ${line.dish.name}`}
                              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-ink/25 transition-colors hover:bg-coral/10 hover:text-coral"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                            <div className="flex items-center gap-0.5 rounded-full border border-ink/[0.08] bg-cream p-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(line.dish.id, line.qty - 1)
                                }
                                aria-label={`Decrease ${line.dish.name} quantity`}
                                className="grid h-6 w-6 place-items-center rounded-full text-ink/50 transition-colors hover:bg-white hover:text-ink"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[1.25rem] text-center text-[11px] font-bold text-ink">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQty(line.dish.id, line.qty + 1)
                                }
                                aria-label={`Increase ${line.dish.name} quantity`}
                                className="grid h-6 w-6 place-items-center rounded-full text-ink/50 transition-colors hover:bg-white hover:text-ink"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-[12px] font-bold text-ink">
                              SAR {formatSAR(line.dish.price * line.qty)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="mt-4 flex items-start gap-2 rounded-2xl border border-sea-700/10 bg-sea-50/70 px-4 py-3">
                  <Clock4
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sea-600"
                    strokeWidth={1.7}
                  />
                  <p className="text-[10.5px] leading-relaxed text-sea-800/70">
                    Ready for pickup at Al Olaya in about 25 minutes. Valet can
                    hold your car at the King Fahd Road entrance.
                  </p>
                </div>

                {suggestion && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/35">
                        A little extra?
                      </p>
                      <p className="flex items-center gap-1 text-[8.5px] font-semibold uppercase tracking-[0.1em] text-gold-dark">
                        <Sparkles className="h-3 w-3" />
                        Concierge pick
                      </p>
                    </div>
                    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white p-2.5">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ivory">
                        <Image
                          src={suggestion.image}
                          alt={suggestion.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-[1.05rem] leading-tight text-ink">
                          {suggestion.name}
                        </p>
                        <p className="mt-0.5 text-[9.5px] font-medium uppercase tracking-[0.08em] text-ink/40">
                          SAR {formatSAR(suggestion.price)} · {suggestion.badge}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addItem(suggestion)}
                        aria-label={`Add ${suggestion.name} to your order`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-cream transition-colors hover:bg-sea-800"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-ink/[0.08] bg-white/80 px-5 pb-5 pt-4 backdrop-blur sm:px-6">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                      Subtotal · VAT included
                    </p>
                    <p className="mt-1 font-display text-[2rem] leading-none text-ink">
                      <span className="mr-1 text-[11px] font-sans font-bold uppercase tracking-[0.08em] text-ink/40">
                        SAR
                      </span>
                      {formatSAR(subtotal)}
                    </p>
                  </div>
                  <p className="pb-1 text-[9px] font-medium uppercase tracking-[0.08em] text-ink/30">
                    {count} {count === 1 ? "plate" : "plates"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openConcierge("order")}
                  className="group mt-4 flex w-full items-center justify-between gap-3 rounded-full bg-ink px-5 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-sea-800 hover:shadow-lift"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-gold-light" />
                    <span>
                      <span className="block text-[12px] font-bold text-cream">
                        Send order via AI concierge
                      </span>
                      <span className="mt-0.5 block text-[9px] font-medium text-cream/45">
                        Confirm in seconds · no account needed
                      </span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-cream/50 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2.5 w-full rounded-full py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40 transition-colors hover:text-ink"
                >
                  Continue browsing
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
