import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { money, type Product } from "../data/products";
import { useStore } from "../store";
import { Stars } from "./ui";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, inWishlist, setQuickView, navigate } = useStore();
  const wished = inWishlist(product.id);
  const onSale = product.originalPrice && product.originalPrice > product.price;
  const pct = onSale ? Math.round((1 - product.price / product.originalPrice!) * 100) : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-beige/50 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-0"
        />
        <img
          src={product.images[1] ?? product.images[0]}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 scale-105 transition-all duration-[1.2s] ease-out group-hover:opacity-100 group-hover:scale-100"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {onSale && <span className="bg-deep text-ivory text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">Sale −{pct}%</span>}
          {product.isNew && <span className="bg-ivory text-charcoal text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">New</span>}
          {product.bestSeller && !onSale && !product.isNew && <span className="bg-ivory/90 text-deep text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">Best Seller</span>}
        </div>

        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className="absolute right-3 top-3 h-9 w-9 grid place-items-center rounded-full bg-ivory/90 backdrop-blur hover:bg-ivory transition"
        >
          <motion.span key={String(wished)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
            <Heart size={16} strokeWidth={1.5} className={wished ? "fill-teal text-teal" : "text-charcoal"} />
          </motion.span>
        </button>

        <div className="absolute inset-x-3 bottom-3 flex gap-2 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={(e) => { e.stopPropagation(); setQuickView(product); }}
            className="flex-1 h-10 bg-ivory/95 backdrop-blur text-charcoal text-[10px] tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:bg-ivory transition"
          >
            <Eye size={14} strokeWidth={1.5} /> <span className="hidden sm:inline">Quick View</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="flex-1 h-10 bg-teal text-ivory text-[10px] tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:bg-deep transition"
          >
            <ShoppingBag size={14} strokeWidth={1.5} /> <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      <div className="pt-4 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow !text-[9px] text-charcoal/50">{product.category}</p>
          <Stars rating={product.rating} size={10} />
        </div>
        <h3 className="font-serif text-xl leading-tight cursor-pointer hover:text-deep transition" onClick={() => navigate(`/product/${product.id}`)}>
          {product.name}
        </h3>
        <p className="text-xs text-charcoal/55">{product.subtitle}</p>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className={`text-sm font-medium ${onSale ? "text-deep" : ""}`}>{money(product.price)}</span>
          {onSale && <span className="text-xs text-charcoal/40 line-through">{money(product.originalPrice!)}</span>}
        </div>
      </div>
    </motion.article>
  );
}
