import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Package, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import ProductCard from "../components/ProductCard";
import { QtySelector, Reveal, Stars } from "../components/ui";
import { CATEGORIES, getProduct, money, PRODUCTS } from "../data/products";
import { useStore } from "../store";

function Accordion({ title, children, open: initial = false }: { title: string; children: ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(initial);
  return (
    <div className="border-b border-charcoal/10">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-5 text-left">
        <span className="eyebrow text-charcoal">{title}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
            <div className="pb-6 text-sm text-charcoal/70 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage({ id }: { id: string }) {
  const { navigate, addToCart, toggleWishlist, inWishlist } = useStore();
  const p = getProduct(id);
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => { setImg(0); setQty(1); setVariant(p?.variants?.options[0]); setSize(undefined); setSizeError(false); }, [id, p]);

  if (!p) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
        <h1 className="font-serif text-5xl mb-4">Product not found</h1>
        <p className="text-charcoal/60 mb-8">This item may have moved or sold out.</p>
        <button onClick={() => navigate("/shop")} className="btn btn-primary">Back to Shop</button>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.id === p.category)!;
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const wished = inWishlist(p.id);

  const add = () => {
    if (p.sizes && !size) { setSizeError(true); return; }
    addToCart(p, qty, { variant, size });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-6 pb-4">
        <p className="eyebrow !text-[10px] text-charcoal/50">
          <button onClick={() => navigate("/")} className="hover:text-charcoal">Home</button><span className="mx-2">/</span>
          <button onClick={() => navigate(`/shop/${cat.id}`)} className="hover:text-charcoal">{cat.title}</button><span className="mx-2">/</span>
          <span className="text-charcoal">{p.name}</span>
        </p>
      </div>

      <section className="mx-auto max-w-[1440px] px-5 md:px-10 pb-20 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 md:w-20 shrink-0">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} className={`relative aspect-[4/5] w-20 overflow-hidden transition ${i === img ? "ring-1 ring-teal ring-offset-2 ring-offset-almond" : "opacity-60 hover:opacity-100"}`}>
                <img src={src} alt={`${p.name} view ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-beige group cursor-zoom-in">
            <AnimatePresence mode="wait">
              <motion.img
                key={img}
                src={p.images[img].replace("w=900&h=1100", "w=1300&h=1600")}
                alt={p.name}
                initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
              />
            </AnimatePresence>
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {p.originalPrice && <span className="bg-deep text-ivory text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">Sale</span>}
              {p.isNew && <span className="bg-ivory text-charcoal text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">New Arrival</span>}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
          <p className="eyebrow text-teal">{cat.title}{p.bestSeller && " · Best Seller"}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light mt-3 leading-[1.05]">{p.name}</h1>
          <p className="text-charcoal/60 mt-2">{p.subtitle}</p>
          <div className="mt-4"><Stars rating={p.rating} size={13} showValue reviews={p.reviews} /></div>
          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-3xl font-light">{money(p.price)}</span>
            {p.originalPrice && <><span className="text-charcoal/40 line-through">{money(p.originalPrice)}</span><span className="text-xs text-deep bg-teal/15 px-2 py-0.5">Save {money(p.originalPrice - p.price)}</span></>}
          </div>
          <p className="mt-6 text-charcoal/75 leading-relaxed">{p.description}</p>

          {p.notes && (
            <div className="mt-8 grid grid-cols-3 border border-charcoal/10 divide-x divide-charcoal/10 bg-ivory">
              {(["top", "heart", "base"] as const).map((k) => (
                <div key={k} className="p-4">
                  <p className="eyebrow !text-[9px] text-teal">{k} notes</p>
                  <p className="text-xs mt-2 leading-relaxed">{p.notes![k]}</p>
                </div>
              ))}
            </div>
          )}

          {p.variants && (
            <div className="mt-8">
              <p className="eyebrow !text-[10px] text-charcoal/60 mb-3">{p.variants.label}: <span className="text-charcoal">{variant}</span></p>
              <div className="flex flex-wrap gap-2">
                {p.variants.options.map((o) => (
                  <button key={o} onClick={() => setVariant(o)} className={`px-4 py-2.5 text-xs border transition ${variant === o ? "border-teal bg-teal text-ivory" : "border-charcoal/20 hover:border-charcoal"}`}>{o}</button>
                ))}
              </div>
            </div>
          )}

          {p.sizes && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <p className={`eyebrow !text-[10px] ${sizeError ? "text-red-700" : "text-charcoal/60"}`}>{sizeError ? "Please select a size" : <>Size: <span className="text-charcoal">{size ?? "Select"}</span></>}</p>
                <span className="text-[11px] underline underline-offset-4 text-charcoal/60">Size Guide</span>
              </div>
              <motion.div animate={sizeError ? { x: [0, -6, 6, -4, 4, 0] } : {}} transition={{ duration: 0.4 }} className="flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button key={s} onClick={() => { setSize(s); setSizeError(false); }} className={`h-11 w-14 text-xs border transition ${size === s ? "border-teal bg-teal text-ivory" : "border-charcoal/20 hover:border-charcoal"}`}>{s}</button>
                ))}
              </motion.div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <QtySelector value={qty} onChange={setQty} />
            <button onClick={add} className="btn btn-primary flex-1">Add to Bag · {money(p.price * qty)}</button>
            <button aria-label="Wishlist" onClick={() => toggleWishlist(p.id)} className="h-12 w-12 border border-charcoal/20 grid place-items-center hover:border-teal transition shrink-0">
              <Heart size={18} strokeWidth={1.4} className={wished ? "fill-teal text-teal" : ""} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8 text-center">
            {[[Package, "Free shipping over $100"], [RotateCcw, "30-day free returns"], [ShieldCheck, "Secure checkout"]].map(([Icon, t]) => {
              const I = Icon as typeof Package;
              return <div key={t as string} className="flex flex-col items-center gap-2 text-[11px] text-charcoal/60"><I size={18} strokeWidth={1.2} className="text-teal" />{t as string}</div>;
            })}
          </div>

          <div className="mt-8 border-t border-charcoal/10">
            {p.fragranceDetails && (
              <Accordion title="Fragrance Details" open>
                <dl className="grid grid-cols-2 gap-y-3">
                  {p.fragranceDetails.map((d) => <div key={d.label} className="contents"><dt className="text-charcoal/50">{d.label}</dt><dd className="text-charcoal">{d.value}</dd></div>)}
                </dl>
              </Accordion>
            )}
            {p.specs && (
              <Accordion title="Specifications" open>
                <dl className="divide-y divide-charcoal/5">
                  {p.specs.map((d) => <div key={d.label} className="flex justify-between py-2.5"><dt className="text-charcoal/50">{d.label}</dt><dd className="text-charcoal text-right">{d.value}</dd></div>)}
                </dl>
              </Accordion>
            )}
            {p.features && (
              <Accordion title="Features">
                <ul className="space-y-2">{p.features.map((f) => <li key={f} className="flex gap-3"><span className="text-teal">✦</span>{f}</li>)}</ul>
              </Accordion>
            )}
            {(p.material || p.fit) && (
              <Accordion title={p.category === "fashion" ? "Material & Fit" : "Materials"} open={p.category === "fashion"}>
                {p.material && <p><span className="text-charcoal">Material:</span> {p.material}</p>}
                {p.fit && <p className="mt-2"><span className="text-charcoal">Fit:</span> {p.fit}</p>}
                {p.sizes && <p className="mt-2"><span className="text-charcoal">Available sizes:</span> {p.sizes.join(", ")}</p>}
                {p.category === "fashion" && <p className="mt-2"><span className="text-charcoal">Care:</span> Hand wash cold or dry clean. Dry flat.</p>}
              </Accordion>
            )}
            <Accordion title="Shipping & Returns">
              Complimentary standard shipping on orders over $100 (2–5 business days). Express delivery available at checkout. Free returns and exchanges within 30 days of delivery{p.category === "fragrances" ? " — fragrances must be unopened." : "."}
            </Accordion>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <Reveal className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow text-teal mb-3">You May Also Like</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light">Related <em className="italic text-deep">Finds</em></h2>
              </div>
              <button onClick={() => navigate(`/shop/${cat.id}`)} className="link-underline text-[11px] tracking-[0.22em] uppercase hidden sm:block">View All {cat.title}</button>
            </Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
              {related.map((r, i) => <ProductCard key={r.id} product={r} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
