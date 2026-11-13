import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { getProduct, money, PRODUCTS } from "../data/products";
import { useStore } from "../store";
import ProductCard from "../components/ProductCard";
import { Stars } from "../components/ui";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, navigate } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];
  const suggestions = PRODUCTS.filter((p) => p.bestSeller && !wishlist.includes(p.id)).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-24">
      <div className="text-center mb-14">
        <p className="eyebrow text-teal mb-4">Saved for Later</p>
        <h1 className="font-serif text-5xl md:text-7xl font-light">Your <em className="italic text-deep">Wishlist</em></h1>
        <p className="text-charcoal/60 mt-4">{items.length} saved item{items.length !== 1 && "s"}</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <div className="h-20 w-20 mx-auto rounded-full bg-beige/60 grid place-items-center mb-6"><Heart size={28} strokeWidth={1.2} className="text-deep" /></div>
          <h2 className="font-serif text-3xl mb-3">Nothing saved yet</h2>
          <p className="text-charcoal/60 text-sm mb-8">Tap the heart on any product to save it here for later.</p>
          <button onClick={() => navigate("/shop")} className="btn btn-primary">Explore the Collection</button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <button onClick={() => items.forEach((p) => addToCart(p))} className="btn btn-outline !py-3">Add All to Bag</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {items.map((p) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex gap-5 bg-ivory p-4">
                  <button onClick={() => navigate(`/product/${p.id}`)} className="w-32 aspect-[4/5] overflow-hidden bg-beige shrink-0">
                    <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover hover:scale-105 transition duration-700" />
                  </button>
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="eyebrow !text-[9px] text-charcoal/50">{p.category}</p>
                      <button aria-label="Remove" onClick={() => toggleWishlist(p.id)} className="text-charcoal/40 hover:text-charcoal"><X size={16} /></button>
                    </div>
                    <h3 className="font-serif text-xl mt-1 leading-tight">{p.name}</h3>
                    <p className="text-xs text-charcoal/55 mt-1">{p.subtitle}</p>
                    <div className="mt-2"><Stars rating={p.rating} size={10} /></div>
                    <p className="text-sm mt-2">{money(p.price)}</p>
                    <button onClick={() => addToCart(p)} className="mt-auto btn btn-primary !py-3 !px-4 !text-[10px]"><ShoppingBag size={13} /> Add to Bag</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {suggestions.length > 0 && (
        <section className="mt-24">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-10">You might also love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
            {suggestions.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
