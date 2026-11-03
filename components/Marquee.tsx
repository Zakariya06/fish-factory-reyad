const items = [
  "Daily Red Sea catch",
  "Charcoal-fired",
  "4.7 / 5 · 10,000+ reviews",
  "Al Olaya, Riyadh",
  "Valet parking",
  "Halal certified",
  "Private dining",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-ink py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.26em] text-cream/65"
              >
                <span className="px-7">{item}</span>
                <span aria-hidden="true" className="text-[8px] text-gold/80">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
