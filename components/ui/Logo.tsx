import Link from "next/link";
import { Fish } from "lucide-react";
import { cn } from "@/lib/cn";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="#top"
      aria-label="Fish Factory — back to top"
      className="group flex items-center gap-3"
    >
      <span
        className={cn(
          "relative grid h-10 w-10 shrink-0 place-items-center rounded-full border shadow-sm transition-all duration-500 group-hover:rotate-6",
          inverted
            ? "border-cream/15 bg-cream/5 text-gold-light"
            : "border-ink/10 bg-white text-sea-700 group-hover:border-gold/60",
        )}
      >
        <Fish className="h-[21px] w-[21px]" strokeWidth={1.4} />
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold ring-2 ring-cream" />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-[22px] font-semibold leading-none tracking-[-0.015em]",
            inverted ? "text-cream" : "text-ink",
          )}
        >
          Fish Factory
        </span>
        <span
          className={cn(
            "mt-1 hidden whitespace-nowrap text-[8.5px] font-bold uppercase tracking-[0.3em] min-[360px]:block",
            inverted ? "text-cream/45" : "text-ink/45",
          )}
        >
          Riyadh · Est. 2014
        </span>
      </span>
    </Link>
  );
}
