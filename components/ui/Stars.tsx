import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function Stars({
  className,
  starClassName,
  label = "Rated 4.7 out of 5",
}: {
  className?: string;
  starClassName?: string;
  label?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("flex items-center gap-[3px] text-gold", className)}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn("h-3.5 w-3.5", starClassName)}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}
