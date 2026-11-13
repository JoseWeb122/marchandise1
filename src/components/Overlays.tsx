import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Heart, Search, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, getProduct, money, PRODUCTS, type Product } from "../data/products";
import { useStore } from "../store";
import { QtySelector, Stars } from "./ui";

const FREE_SHIP = 100;

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateQty, removeFromCart, subtotal, cartCount, navigate, clearCart, showToast } = useStore();
  const remaining = Math.max(0, FREE_SHIP - subtotal);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => { if (!cartOpen) setCheckedOut(false); }, [cartOpen]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-ivory flex flex-col shadow-2xl"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-charcoal/10">
              <h2 className="font-serif text-2xl">Your Bag <span className="text-charcoal/40 text-lg">({cartCount})</span></h2>
              <button aria-label="Close cart" onClick={() => setCartOpen(false)} className="hover:rotate-90 transition duration-300"><X size={22} strokeWidth={1.4} /></button>
            </div>

            {checkedOut ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="h-16 w-16 rounded-full bg-teal text-ivory grid place-items-center mb-6"><Check size={28} /></motion.div>
                <h3 className="font-serif text-3xl mb-3">Thank you!</h3>
                <p className="text-sm text-charcoal/60 mb-8">This is a demo storefront — no payment was taken. Your order has been "placed" and your bag is now clear.</p>
                <button onClick={() => { setCartOpen(false); navigate("/shop"); }} className="btn btn-primary">Continue Shopping</button>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
                <div className="h-20 w-20 rounded-full bg-beige/60 grid place-items-center mb-6"><ShoppingBag size={28} strokeWidth={1.2} className="text-deep" /></div>
                <h3 className="font-serif text-3xl mb-3">Your bag is empty</h3>
                <p className="text-sm text-charcoal/60 mb-8">Discover something special — our newest arrivals are waiting for you.</p>
                <button onClick={() => { setCartOpen(false); navigate("/shop"); }} className="btn btn-primary">Start Shopping <ArrowRight size={14} /></button>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 bg-almond/70 border-b border-charcoal/5">
                  <p className="text-xs text-charcoal/70 mb-2">
                    {remaining > 0 ? <>You're <strong className="text-deep">{money(remaining)}</strong> away from complimentary shipping</> : <>✦ You've unlocked <strong className="text-deep">complimentary shipping</strong></>}
                  </p>
                  <div className="h-[3px] bg-beige rounded-full overflow-hidden">
                    <motion.div className="h-full bg-teal" initial={false} animate={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} transition={{ duration: 0.6 }} />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-6 divide-y divide-charcoal/10">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => {
                      const p = getProduct(item.id);
                      if (!p) return null;
                      return (
                        <motion.div key={item.key} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60, height: 0 }} className="flex gap-4 py-5">
                          <button onClick={() => { setCartOpen(false); navigate(`/product/${p.id}`); }} className="w-24 aspect-[4/5] bg-beige shrink-0 overflow-hidden">
                            <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                          </button>
                          <div className="flex-1 min-w-0 flex flex-col">
                            <div className="flex justify-between gap-2">
                              <div>
                                <h4 className="font-serif text-lg leading-tight">{p.name}</h4>
                                <p className="text-[11px] text-charcoal/50 mt-1">{[item.variant, item.size && `Size ${item.size}`].filter(Boolean).join(" · ") || p.subtitle}</p>
                              </div>
                              <button aria-label="Remove" onClick={() => removeFromCart(item.key)} className="text-charcoal/40 hover:text-charcoal transition h-fit"><Trash2 size={15} strokeWidth={1.4} /></button>
                            </div>
                            <div className="mt-auto flex items-end justify-between pt-3">
                              <QtySelector small value={item.qty} onChange={(n) => updateQty(item.key, n)} />
                              <span className="text-sm font-medium">{money(p.price * item.qty)}</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
                <div className="border-t border-charcoal/10 px-6 py-6 space-y-3 bg-ivory">
                  <div className="flex justify-between text-sm"><span className="text-charcoal/60">Subtotal</span><span className="font-medium">{money(subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-charcoal/60">Shipping</span><span>{remaining > 0 ? "Calculated at checkout" : "Free"}</span></div>
                  <button onClick={() => { clearCart(); setCheckedOut(true); showToast("Order placed — thank you!"); }} className="btn btn-primary w-full !py-4 mt-2">Checkout · {money(subtotal)}</button>
                  <button onClick={() => setCartOpen(false)} className="w-full text-[11px] tracking-[0.2em] uppercase text-charcoal/60 hover:text-charcoal py-1">Continue Shopping</button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, navigate } = useStore();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) { setTimeout(() => inputRef.current?.focus(), 150); }
    else setQ("");
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return PRODUCTS.filter((p) => `${p.name} ${p.subtitle} ${p.category} ${p.description}`.toLowerCase().includes(t));
  }, [q]);

  const go = (path: string) => { setSearchOpen(false); navigate(path); };
  const suggestions = ["Perfume", "Cologne", "Cashmere", "Earbuds", "Smartwatch", "Leather"];

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div className="fixed inset-0 z-50 bg-almond/97 backdrop-blur-xl overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <div className="mx-auto max-w-6xl px-5 md:px-10 pt-6 pb-20">
            <div className="flex justify-end">
              <button aria-label="Close search" onClick={() => setSearchOpen(false)} className="p-2 hover:rotate-90 transition duration-300"><X size={26} strokeWidth={1.3} /></button>
            </div>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6 }}>
              <p className="eyebrow text-teal mb-4">Search Wanda's</p>
              <div className="flex items-center gap-4 border-b border-charcoal/30 focus-within:border-teal transition pb-3">
                <Search size={26} strokeWidth={1.2} className="text-charcoal/50" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && results[0]) go(`/product/${results[0].id}`); }}
                  placeholder="Search fragrances, knitwear, gadgets…"
                  className="flex-1 bg-transparent font-serif text-3xl md:text-5xl font-light outline-none placeholder:text-charcoal/30"
                />
                {q && <button onClick={() => setQ("")} className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-charcoal">Clear</button>}
              </div>
            </motion.div>

            {!q.trim() ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-10 grid md:grid-cols-2 gap-10">
                <div>
                  <p className="eyebrow text-charcoal/50 mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button key={s} onClick={() => setQ(s)} className="px-4 py-2 border border-charcoal/15 text-sm hover:border-teal hover:text-teal transition">{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow text-charcoal/50 mb-4">Browse Categories</p>
                  <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.map((c) => (
                      <button key={c.id} onClick={() => go(`/shop/${c.id}`)} className="group relative h-24 overflow-hidden text-left">
                        <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                        <div className="absolute inset-0 bg-charcoal/35" />
                        <span className="absolute bottom-3 left-3 font-serif text-xl text-ivory">{c.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : results.length === 0 ? (
              <div className="mt-16 text-center">
                <h3 className="font-serif text-3xl mb-3">No results for "{q}"</h3>
                <p className="text-charcoal/60 text-sm mb-6">Try a different term — like "sweater", "fragrance" or "headphones" — or explore a category.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {CATEGORIES.map((c) => <button key={c.id} onClick={() => go(`/shop/${c.id}`)} className="btn btn-outline !py-3">{c.title}</button>)}
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <p className="text-xs text-charcoal/50 mb-5">{results.length} result{results.length > 1 ? "s" : ""}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
                  {results.map((p, i) => (
                    <motion.button key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} onClick={() => go(`/product/${p.id}`)} className="text-left group">
                      <div className="aspect-[4/5] overflow-hidden bg-beige"><img src={p.images[0]} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" /></div>
                      <p className="eyebrow !text-[9px] text-charcoal/50 mt-3">{p.category}</p>
                      <p className="font-serif text-lg leading-tight mt-1">{p.name}</p>
                      <p className="text-sm mt-1">{money(p.price)}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function QuickView() {
  const { quickView, setQuickView } = useStore();
  return (
    <AnimatePresence>
      {quickView && (
        <motion.div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={() => setQuickView(null)} />
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative bg-ivory w-full md:max-w-4xl max-h-[92vh] overflow-y-auto grid md:grid-cols-2"
          >
            <QuickViewBody product={quickView} onClose={() => setQuickView(null)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuickViewBody({ product: p, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart, toggleWishlist, inWishlist, navigate } = useStore();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [variant, setVariant] = useState(p.variants?.options[0]);
  const [size, setSize] = useState(p.sizes?.[2]);
  const wished = inWishlist(p.id);

  return (
    <>
      <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 z-10 h-9 w-9 rounded-full bg-ivory/90 grid place-items-center hover:rotate-90 transition"><X size={18} strokeWidth={1.4} /></button>
      <div className="relative bg-beige aspect-[4/5] md:aspect-auto md:min-h-[560px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img key={img} src={p.images[img]} alt={p.name} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 h-full w-full object-cover" />
        </AnimatePresence>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {p.images.map((_, i) => <button key={i} aria-label={`Image ${i + 1}`} onClick={() => setImg(i)} className={`h-1.5 rounded-full transition-all ${i === img ? "w-6 bg-ivory" : "w-1.5 bg-ivory/60"}`} />)}
        </div>
      </div>
      <div className="p-7 md:p-10 flex flex-col">
        <p className="eyebrow text-teal">{p.category}</p>
        <h3 className="font-serif text-4xl mt-3 leading-tight">{p.name}</h3>
        <p className="text-sm text-charcoal/55 mt-1">{p.subtitle}</p>
        <div className="mt-3"><Stars rating={p.rating} showValue reviews={p.reviews} /></div>
        <div className="flex items-baseline gap-3 mt-5">
          <span className="text-2xl">{money(p.price)}</span>
          {p.originalPrice && <span className="text-charcoal/40 line-through">{money(p.originalPrice)}</span>}
        </div>
        <p className="text-sm text-charcoal/70 leading-relaxed mt-5">{p.description}</p>

        {p.variants && (
          <div className="mt-6">
            <p className="eyebrow !text-[10px] text-charcoal/60 mb-2">{p.variants.label}: <span className="text-charcoal">{variant}</span></p>
            <div className="flex flex-wrap gap-2">
              {p.variants.options.map((o) => <button key={o} onClick={() => setVariant(o)} className={`px-3.5 py-2 text-xs border transition ${variant === o ? "border-teal bg-teal text-ivory" : "border-charcoal/20 hover:border-charcoal"}`}>{o}</button>)}
            </div>
          </div>
        )}
        {p.sizes && (
          <div className="mt-5">
            <p className="eyebrow !text-[10px] text-charcoal/60 mb-2">Size: <span className="text-charcoal">{size}</span></p>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`h-10 w-12 text-xs border transition ${size === s ? "border-teal bg-teal text-ivory" : "border-charcoal/20 hover:border-charcoal"}`}>{s}</button>)}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          <QtySelector value={qty} onChange={setQty} />
          <button onClick={() => { addToCart(p, qty, { variant, size }); onClose(); }} className="btn btn-primary flex-1 !px-4">Add to Bag</button>
          <button aria-label="Wishlist" onClick={() => toggleWishlist(p.id)} className="h-12 w-12 border border-charcoal/20 grid place-items-center hover:border-teal transition shrink-0">
            <Heart size={18} strokeWidth={1.4} className={wished ? "fill-teal text-teal" : ""} />
          </button>
        </div>
        <button onClick={() => { onClose(); navigate(`/product/${p.id}`); }} className="mt-6 text-[11px] tracking-[0.22em] uppercase link-underline self-start text-deep">View Full Details →</button>
      </div>
    </>
  );
}

export function Toast() {
  const { toast, setCartOpen } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast}
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] bg-charcoal text-ivory px-5 py-3.5 flex items-center gap-4 text-sm shadow-2xl max-w-[92vw]"
        >
          <Check size={16} className="text-teal shrink-0" />
          <span className="truncate">{toast}</span>
          {toast.includes("bag") && <button onClick={() => setCartOpen(true)} className="text-[10px] tracking-[0.2em] uppercase underline underline-offset-4 shrink-0">View Bag</button>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
