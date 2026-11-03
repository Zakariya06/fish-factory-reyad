"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { Logo } from "@/components/ui/Logo";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { count, openCart, openConcierge } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-0 bg-ink/30 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>
      <div
        className={cn(
          "relative z-10 overflow-hidden bg-ink text-cream/70 transition-all duration-500",
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
        )}
      >
        <div className="section-pad mx-auto flex h-9 max-w-[90rem] items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Today&apos;s catch landed 06:00 · Red Sea
          </p>
          <div className="hidden items-center gap-5 text-[9px] font-semibold uppercase tracking-[0.2em] sm:flex">
            <span className="text-cream/90">4.7/5 · 10,000+ reviews</span>
            <span className="h-3 w-px bg-cream/15" />
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cream"
            >
              Al Olaya, Riyadh
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 border-b transition-all duration-500",
          scrolled || menuOpen
            ? "border-ink/[0.08] bg-cream/90 glass shadow-[0_10px_40px_-28px_rgba(11,37,40,0.4)]"
            : "border-transparent bg-cream/35 backdrop-blur-sm",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="section-pad mx-auto flex h-[72px] max-w-[90rem] items-center justify-between gap-6"
        >
          <Logo />

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/65 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-ink hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="mr-1 hidden items-center gap-2 text-[12px] font-semibold text-ink/65 transition-colors hover:text-ink xl:flex"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
              {site.phone}
            </a>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open your order${count > 0 ? `, ${count} items` : ""}`}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink transition-all hover:border-gold/50 hover:bg-white"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={`cart-${count}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                    className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-extrabold text-ink"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => openConcierge("book")}
              className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-[12px] font-semibold text-cream shadow-soft transition-all hover:-translate-y-0.5 hover:bg-sea-800 hover:shadow-lift sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-light transition-transform duration-500 group-hover:rotate-12" />
              Book via AI
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink lg:hidden"
            >
              {menuOpen ? (
                <X className="h-[18px] w-[18px]" />
              ) : (
                <Menu className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 overflow-hidden border-b border-ink/10 bg-cream shadow-soft lg:hidden"
          >
            <div className="section-pad mx-auto max-h-[calc(100svh-6.5rem)] max-w-[90rem] overflow-y-auto py-6">
              <div className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * index + 0.08 }}
                    className="flex items-center justify-between border-b border-ink/[0.07] py-4 font-display text-3xl text-ink"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-ink/30" />
                  </motion.a>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openConcierge("book");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-cream"
                >
                  <Sparkles className="h-4 w-4 text-gold-light" />
                  Book via AI
                </button>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/12 bg-white/70 px-6 py-4 text-sm font-semibold text-ink"
                >
                  <Phone className="h-4 w-4 text-sea-700" />
                  {site.phone}
                </a>
                <p className="pt-1 text-center text-[11px] text-ink/45">
                  {site.hours} · {site.shortAddress}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
