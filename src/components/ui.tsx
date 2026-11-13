import { motion } from "framer-motion";
import { Minus, Plus, Star } from "lucide-react";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className = "", y = 30 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stars({ rating, size = 12, showValue = false, reviews }: { rating: number; size?: number; showValue?: boolean; reviews?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.2}
            className={i <= Math.round(rating) ? "fill-teal text-teal" : "text-beige fill-beige"}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-charcoal/60">{rating.toFixed(1)}{reviews !== undefined && ` · ${reviews} reviews`}</span>}
    </div>
  );
}

export function QtySelector({ value, onChange, small = false }: { value: number; onChange: (n: number) => void; small?: boolean }) {
  const h = small ? "h-8" : "h-12";
  return (
    <div className={`inline-flex items-center border border-charcoal/20 ${h}`}>
      <button aria-label="Decrease" onClick={() => onChange(Math.max(1, value - 1))} className={`${small ? "w-8" : "w-11"} h-full grid place-items-center hover:bg-beige/50 transition`}>
        <Minus size={small ? 12 : 14} />
      </button>
      <span className={`${small ? "w-7 text-xs" : "w-10 text-sm"} text-center tabular-nums`}>{value}</span>
      <button aria-label="Increase" onClick={() => onChange(value + 1)} className={`${small ? "w-8" : "w-11"} h-full grid place-items-center hover:bg-beige/50 transition`}>
        <Plus size={small ? 12 : 14} />
      </button>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, align = "left", children }: { eyebrow: string; title: ReactNode; align?: "left" | "center"; children?: ReactNode }) {
  return (
    <Reveal className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      <p className="eyebrow text-teal mb-4">{eyebrow}</p>
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-charcoal">{title}</h2>
      {children && <div className="mt-5 text-charcoal/65 leading-relaxed">{children}</div>}
    </Reveal>
  );
}
