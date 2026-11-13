import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "../data/products";
import { useStore } from "../store";

const MAX_PRICE = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 10) * 10;
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest" },
  { id: "best", label: "Best Selling" },
];

export default function Shop({ category, filter }: { category?: string; filter?: string }) {
  const { navigate } = useStore();
  const cat = CATEGORIES.find((c) => c.id === category);
  const [price, setPrice] = useState(MAX_PRICE);
  const [best, setBest] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [rated, setRated] = useState(false);
  const [sale, setSale] = useState(false);
  const [sort, setSort] = useState("featured");
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    setBest(filter === "best");
    setIsNew(filter === "new");
    setRated(filter === "rated");
    setSale(filter === "sale");
    if (filter === "new") setSort("newest");
  }, [filter, category]);

  const list = useMemo(() => {
    let l = PRODUCTS.filter((p) => (!cat || p.category === cat.id) && p.price <= price);
    if (best) l = l.filter((p) => p.bestSeller);
    if (isNew) l = l.filter((p) => p.isNew || p.added <= 10);
    if (rated) l = l.filter((p) => p.rating >= 4.8);
    if (sale) l = l.filter((p) => p.originalPrice);
    const s = [...l];
    if (sort === "price-asc") s.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") s.sort((a, b) => b.price - a.price);
    if (sort === "newest") s.sort((a, b) => a.added - b.added);
    if (sort === "best") s.sort((a, b) => b.sold - a.sold);
    return s;
  }, [cat, price, best, isNew, rated, sale, sort]);

  const active = [best && "Best Sellers", isNew && "New Arrivals", rated && "Highest Rated", sale && "On Sale", price < MAX_PRICE && `Under $${price}`].filter(Boolean) as string[];
  const reset = () => { setPrice(MAX_PRICE); setBest(false); setIsNew(false); setRated(false); setSale(false); };
  const counts = (id?: Category) => PRODUCTS.filter((p) => !id || p.category === id).length;

  const Toggle = ({ label, on, set }: { label: string; on: boolean; set: (v: boolean) => void }) => (
    <button onClick={() => set(!on)} className="flex items-center justify-between w-full py-2 text-sm group">
      <span className={on ? "text-charcoal" : "text-charcoal/65 group-hover:text-charcoal"}>{label}</span>
      <span className={`h-5 w-9 rounded-full relative transition ${on ? "bg-teal" : "bg-beige"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-ivory shadow transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
      </span>
    </button>
  );

  const Filters = (
    <div className="space-y-10">
      <div>
        <p className="eyebrow text-charcoal mb-4">Category</p>
        <ul className="space-y-1">
          {[{ id: undefined, title: "Shop All" }, ...CATEGORIES].map((c) => {
            const on = (c.id ?? undefined) === (cat?.id ?? undefined);
            return (
              <li key={c.title}>
                <button onClick={() => { setDrawer(false); navigate(c.id ? `/shop/${c.id}` : "/shop"); }} className={`flex justify-between w-full py-1.5 text-sm transition ${on ? "text-teal" : "text-charcoal/65 hover:text-charcoal"}`}>
                  <span className="flex items-center gap-2">{on && <span className="h-1 w-1 rounded-full bg-teal" />}{c.title}</span>
                  <span className="text-xs text-charcoal/40">{counts(c.id as Category | undefined)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="eyebrow text-charcoal mb-4">Price Range</p>
        <input type="range" min={50} max={MAX_PRICE} step={10} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full" aria-label="Maximum price" />
        <div className="flex justify-between text-xs text-charcoal/60 mt-2"><span>$0</span><span className="text-charcoal font-medium">Up to ${price}</span></div>
        <div className="flex flex-wrap gap-2 mt-4">
          {[100, 150, 200].map((v) => <button key={v} onClick={() => setPrice(v)} className={`px-3 py-1.5 text-xs border transition ${price === v ? "border-teal text-teal" : "border-charcoal/15 hover:border-charcoal/40"}`}>Under ${v}</button>)}
        </div>
      </div>
      <div>
        <p className="eyebrow text-charcoal mb-3">Refine</p>
        <Toggle label="Best Sellers" on={best} set={setBest} />
        <Toggle label="New Arrivals" on={isNew} set={setIsNew} />
        <Toggle label="Highest Rated (4.8+)" on={rated} set={setRated} />
        <Toggle label="On Sale" on={sale} set={setSale} />
      </div>
      {active.length > 0 && <button onClick={reset} className="text-[11px] tracking-[0.2em] uppercase underline underline-offset-4 text-charcoal/60 hover:text-charcoal">Clear all filters</button>}
    </div>
  );

  return (
    <div>
      <section className="relative h-[42vh] min-h-[300px] overflow-hidden bg-beige">
        <AnimatePresence mode="wait">
          <motion.img
            key={cat?.id ?? "all"}
            src={cat?.image ?? "images/hero.jpg"}
            alt={cat?.title ?? "Shop all"}
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/25 to-charcoal/10" />
        <div className="relative z-10 h-full mx-auto max-w-[1440px] px-5 md:px-10 flex flex-col justify-end pb-10 md:pb-14 text-ivory">
          <p className="eyebrow text-ivory/75 mb-3">
            <button onClick={() => navigate("/")} className="hover:text-ivory">Home</button> <span className="mx-2">/</span> {cat ? <><button onClick={() => navigate("/shop")} className="hover:text-ivory">Shop</button><span className="mx-2">/</span>{cat.title}</> : "Shop All"}
          </p>
          <motion.h1 key={cat?.id ?? "all"} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-serif text-5xl md:text-7xl font-light">
            {cat ? cat.title : filter === "new" ? "New Arrivals" : "Shop All"}
          </motion.h1>
          <p className="mt-3 text-ivory/80 max-w-lg text-sm md:text-base">{cat?.blurb ?? "Every curated find in one place — fragrances, fashion, technology and the details in between."}</p>
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-almond/95 backdrop-blur border-b border-charcoal/10">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button onClick={() => setDrawer(true)} className="lg:hidden flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase">
              <SlidersHorizontal size={15} strokeWidth={1.4} /> Filters {active.length > 0 && <span className="h-4 w-4 rounded-full bg-teal text-ivory text-[9px] grid place-items-center">{active.length}</span>}
            </button>
            <p className="text-xs text-charcoal/55 hidden sm:block">{list.length} product{list.length !== 1 && "s"}</p>
            <div className="hidden md:flex gap-2 overflow-x-auto no-scrollbar">
              {active.map((a) => <span key={a} className="text-[11px] bg-beige/70 px-2.5 py-1 whitespace-nowrap">{a}</span>)}
            </div>
          </div>
          <label className="relative flex items-center gap-2 text-xs shrink-0">
            <span className="text-charcoal/55 hidden sm:inline">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none bg-transparent pr-6 py-2 outline-none cursor-pointer font-medium" aria-label="Sort products">
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-0 pointer-events-none" />
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-12 md:py-16 grid lg:grid-cols-[240px_1fr] gap-12">
        <aside className="hidden lg:block sticky top-36 self-start">{Filters}</aside>
        <div>
          {list.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="font-serif text-3xl mb-3">No products match these filters</h3>
              <p className="text-charcoal/60 text-sm mb-8">Try widening your price range or removing a filter.</p>
              <button onClick={reset} className="btn btn-primary">Reset Filters</button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-12">
              {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-charcoal/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
            <motion.aside initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "tween", duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }} className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-ivory lg:hidden flex flex-col rounded-t-2xl">
              <div className="flex justify-between items-center px-6 h-16 border-b border-charcoal/10">
                <p className="font-serif text-2xl">Filters</p>
                <button aria-label="Close filters" onClick={() => setDrawer(false)}><X size={22} strokeWidth={1.4} /></button>
              </div>
              <div className="overflow-y-auto px-6 py-8 flex-1">{Filters}</div>
              <div className="p-5 border-t border-charcoal/10"><button onClick={() => setDrawer(false)} className="btn btn-primary w-full">Show {list.length} Products</button></div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
