import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Leaf, Package, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Newsletter } from "../components/Footer";
import { Reveal, SectionHeading } from "../components/ui";
import { CATEGORIES, PRODUCTS, px } from "../data/products";
import { useStore } from "../store";

const ease = [0.2, 0.7, 0.2, 1] as const;

function Hero() {
  const { navigate } = useStore();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const insets = [px(15096784, 400, 500), px(14641423, 400, 500), px(7417547, 400, 500)];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % insets.length), 4200); return () => clearInterval(t); }, [insets.length]);

  return (
    <section ref={ref} className="relative h-[calc(100svh-7.5rem)] min-h-[600px] overflow-hidden bg-beige">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <motion.img
          src="images/hero.jpg" alt="Perfume bottles, folded knitwear and wireless earbuds on travertine"
          initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2.2, ease }}
          className="h-full w-full object-cover object-[70%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-almond/95 via-almond/60 to-transparent md:via-almond/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-almond/70 via-transparent to-transparent md:hidden" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 h-full mx-auto max-w-[1440px] px-5 md:px-10 flex items-center">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9, ease }} className="eyebrow text-deep mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-deep" /> The New Season Edit
          </motion.p>
          <h1 className="font-serif font-light text-[3.2rem] leading-[0.98] sm:text-7xl lg:text-[6.5rem] text-charcoal">
            {["Everyday Essentials.", "Extraordinary Finds."].map((line, li) => (
              <span key={line} className="block overflow-hidden pb-2">
                <motion.span
                  className={`block ${li === 1 ? "italic text-deep" : ""}`}
                  initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.55 + li * 0.18, duration: 1.1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease }} className="mt-7 text-base md:text-lg text-charcoal/70 max-w-md leading-relaxed">
            Discover a thoughtfully curated collection of fragrances, fashion, electronics, and everyday favorites.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9, ease }} className="mt-10 flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate("/shop")} className="btn btn-primary">Explore Collection <ArrowRight size={14} /></button>
            <button onClick={() => navigate("/shop?filter=new")} className="btn btn-outline text-charcoal">Discover New Arrivals</button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6, duration: 1, ease }} className="hidden xl:block absolute right-10 bottom-10 z-10 w-44">
        <div className="relative aspect-[4/5] overflow-hidden bg-beige shadow-2xl">
          <AnimatePresence mode="popLayout">
            <motion.img key={i} src={insets[i]} alt="" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0 h-full w-full object-cover" />
          </AnimatePresence>
        </div>
        <p className="eyebrow !text-[9px] mt-3 text-charcoal/70">Curated Weekly · {String(i + 1).padStart(2, "0")}/03</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-charcoal/50">
        <span className="eyebrow !text-[9px]">Scroll</span>
        <motion.span animate={{ scaleY: [0, 1, 0], originY: 0 }} transition={{ repeat: Infinity, duration: 2.2 }} className="h-10 w-px bg-charcoal/40 origin-top" />
      </motion.div>
    </section>
  );
}

function Perks() {
  const items = [
    { icon: Package, t: "Complimentary Shipping", d: "On all orders over $100" },
    { icon: RotateCcw, t: "30-Day Returns", d: "Easy, free exchanges" },
    { icon: Sparkles, t: "Gift Wrapping", d: "Beautifully presented" },
    { icon: Leaf, t: "Thoughtfully Sourced", d: "Quality you can feel" },
  ];
  return (
    <section className="border-y border-charcoal/10 bg-ivory">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.t} className={`flex items-center gap-4 py-6 lg:py-7 ${i % 2 ? "pl-4 lg:pl-8" : "pr-4"} ${i > 0 ? "lg:border-l border-charcoal/10 lg:pl-8" : ""}`}>
            <it.icon size={22} strokeWidth={1.2} className="text-teal shrink-0" />
            <div><p className="text-xs md:text-sm font-medium">{it.t}</p><p className="text-[11px] md:text-xs text-charcoal/55">{it.d}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const { navigate } = useStore();
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <SectionHeading eyebrow="Shop by Category" title={<>Curated for <em className="italic text-deep">every</em> moment</>} />
        <Reveal><button onClick={() => navigate("/shop")} className="link-underline text-[11px] tracking-[0.22em] uppercase">View All Products</button></Reveal>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.1} className={i % 2 === 1 ? "lg:mt-16" : ""}>
            <button onClick={() => navigate(`/shop/${c.id}`)} className="group relative block w-full aspect-[3/4.4] overflow-hidden bg-beige text-left">
              <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[1.6s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
              <span className="absolute top-4 left-4 md:top-6 md:left-6 font-serif italic text-ivory/80 text-lg">0{i + 1}</span>
              <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6 text-ivory">
                <h3 className="font-serif text-2xl md:text-4xl tracking-[0.06em] uppercase font-light">{c.title}</h3>
                <p className="text-[11px] md:text-sm text-ivory/75 mt-1">{c.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase">
                  Explore
                  <span className="relative h-px w-6 bg-ivory transition-all duration-500 group-hover:w-14" />
                  <ArrowRight size={12} className="-ml-2 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const { navigate } = useStore();
  const tabs = [
    { id: "all", label: "Featured" },
    { id: "best", label: "Best Sellers" },
    { id: "sale", label: "On Sale" },
    { id: "rated", label: "Highest Rated" },
  ];
  const [tab, setTab] = useState("all");
  const list = useMemo(() => {
    const ids = ["ambre-nocturne", "cedar-smoke", "velvet-iris", "aura-pro-earbuds", "meridian-watch", "cloud-cashmere", "linen-shirt", "saddle-tote"];
    if (tab === "best") return PRODUCTS.filter((p) => p.bestSeller).slice(0, 8);
    if (tab === "sale") return PRODUCTS.filter((p) => p.originalPrice).slice(0, 8);
    if (tab === "rated") return [...PRODUCTS].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 8);
    return ids.map((id) => PRODUCTS.find((p) => p.id === id)!);
  }, [tab]);

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeading align="center" eyebrow="Featured Products" title={<>The pieces everyone's <em className="italic text-deep">talking about</em></>} />
        <div className="flex justify-center gap-2 md:gap-8 mt-10 mb-14 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`relative whitespace-nowrap px-3 py-2 text-[11px] tracking-[0.22em] uppercase transition ${tab === t.id ? "text-teal" : "text-charcoal/50 hover:text-charcoal"}`}>
              {t.label}
              {tab === t.id && <motion.span layoutId="tabline" className="absolute left-3 right-3 -bottom-0.5 h-px bg-teal" />}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
            {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </motion.div>
        </AnimatePresence>
        <div className="text-center mt-16">
          <button onClick={() => navigate("/shop")} className="btn btn-outline">Shop All Products</button>
        </div>
      </div>
    </section>
  );
}

function FashionEditorial() {
  const { navigate } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  return (
    <section ref={ref} className="grid lg:grid-cols-2 min-h-[85vh]">
      <div className="relative overflow-hidden min-h-[60vh] bg-beige">
        <motion.img style={{ y, scale: 1.18 }} src={px(14641438, 1200, 1500)} alt="Folded knit sweaters in warm neutral tones" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="relative flex items-center bg-almond px-6 sm:px-12 lg:px-20 py-20 overflow-hidden">
        <motion.span style={{ y: y2 }} className="absolute -right-6 top-10 font-serif italic text-[12rem] lg:text-[16rem] leading-none text-beige/70 select-none pointer-events-none">Knit</motion.span>
        <div className="relative max-w-lg">
          <Reveal><p className="eyebrow text-teal mb-6">The Fashion Edit</p></Reveal>
          <Reveal delay={0.1}><h2 className="font-serif text-5xl md:text-7xl font-light leading-[1]">Style That Feels <em className="italic text-deep">Like You.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="mt-8 text-charcoal/70 leading-relaxed text-lg">Discover everyday pieces that bring comfort, personality, and effortless style into your wardrobe.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex items-center gap-6">
              <button onClick={() => navigate("/shop/fashion")} className="btn btn-primary">Shop Fashion <ArrowRight size={14} /></button>
              <div className="hidden sm:flex -space-x-3">
                {[px(14641423, 120, 120), px(13889763, 120, 120), px(22441297, 120, 120)].map((s) => <img key={s} src={s} alt="" className="h-11 w-11 rounded-full object-cover border-2 border-almond" />)}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FragranceBanner() {
  const { navigate } = useStore();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="relative min-h-[80vh] overflow-hidden bg-charcoal grain flex items-center">
      <motion.img style={{ y, scale: 1.25 }} src="images/fragrance-banner.jpg" alt="Luxury perfume bottles on dark stone" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-l from-charcoal/90 via-charcoal/50 to-transparent" />
      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-5 md:px-10 flex justify-end">
        <div className="max-w-lg text-ivory py-20">
          <Reveal><p className="eyebrow text-beige/80 mb-6">The Fragrance Atelier</p></Reveal>
          <Reveal delay={0.1}><h2 className="font-serif text-5xl md:text-7xl font-light leading-[1]">Find Your <em className="italic">Signature</em> Scent.</h2></Reveal>
          <Reveal delay={0.2}><p className="mt-7 text-ivory/70 leading-relaxed text-lg">From luminous florals to smoky woods — perfumes and colognes composed to become part of your story.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-ivory/15 py-5 text-center">
              {[["Floral", "Velvet Iris"], ["Amber", "Ambre Nocturne"], ["Woody", "Cedar & Smoke"]].map(([f, n]) => (
                <div key={f}><p className="eyebrow !text-[9px] text-beige/70">{f}</p><p className="font-serif text-base md:text-lg mt-1">{n}</p></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}><button onClick={() => navigate("/shop/fragrances")} className="btn btn-light mt-10">Explore Fragrances <ArrowRight size={14} /></button></Reveal>
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  const { navigate } = useStore();
  const items = useMemo(() => [...PRODUCTS].sort((a, b) => a.added - b.added).slice(0, 10), []);
  const track = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const update = () => {
    const el = track.current; if (!el) return;
    setCanPrev(el.scrollLeft > 5);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
  };
  useEffect(() => { update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update); }, []);
  const scroll = (dir: number) => {
    const el = track.current; if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24) * 2, behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-end justify-between gap-6 mb-12">
          <SectionHeading eyebrow="Just Landed" title={<>New <em className="italic text-deep">Arrivals</em></>} />
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => navigate("/shop?filter=new")} className="hidden md:inline link-underline text-[11px] tracking-[0.22em] uppercase mr-4">View All</button>
            <button aria-label="Previous" disabled={!canPrev} onClick={() => scroll(-1)} className="h-12 w-12 rounded-full border border-charcoal/20 grid place-items-center hover:bg-teal hover:border-teal hover:text-ivory transition disabled:opacity-30 disabled:pointer-events-none"><ArrowLeft size={16} strokeWidth={1.4} /></button>
            <button aria-label="Next" disabled={!canNext} onClick={() => scroll(1)} className="h-12 w-12 rounded-full border border-charcoal/20 grid place-items-center hover:bg-teal hover:border-teal hover:text-ivory transition disabled:opacity-30 disabled:pointer-events-none"><ArrowRight size={16} strokeWidth={1.4} /></button>
          </div>
        </div>
        <div ref={track} onScroll={update} className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0">
          {items.map((p, i) => (
            <div key={p.id} data-card className="snap-start shrink-0 w-[68%] sm:w-[42%] md:w-[30%] lg:w-[23%]">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
        <div className="mt-10 h-px bg-charcoal/10 relative">
          <motion.div className="absolute left-0 top-0 h-px bg-teal" animate={{ width: `${20 + progress * 80}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  const { navigate } = useStore();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["30%", "-25%"]);
  return (
    <section ref={ref} className="bg-ivory py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 relative">
          <motion.div style={{ y: y1 }} className="relative aspect-[4/3] overflow-hidden bg-beige lg:w-[88%]">
            <img src="images/brand-story.jpg" alt="Wanda's boutique interior" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -bottom-10 right-0 w-[38%] aspect-[3/4] overflow-hidden border-[10px] border-ivory shadow-xl hidden sm:block">
            <img src={px(12572107, 500, 660)} alt="Leather bag and sunglasses" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
        <div className="lg:col-span-5 lg:pl-10">
          <Reveal><p className="eyebrow text-teal mb-6">Our Story</p></Reveal>
          <Reveal delay={0.1}><h2 className="font-serif text-5xl md:text-6xl font-light leading-[1.02]">More Than Just <em className="italic text-deep">Shopping.</em></h2></Reveal>
          <Reveal delay={0.2}><p className="mt-7 text-lg text-charcoal/70 leading-relaxed">From everyday essentials to little luxuries, discover products selected to bring something special to your daily life.</p></Reveal>
          <Reveal delay={0.25}><p className="mt-4 text-charcoal/60 leading-relaxed">Every item at Wanda's is hand-picked for its quality, design and the joy it brings — whether it's a scent that becomes your signature, a sweater you'll wear for years, or a gadget that simply makes life easier.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-charcoal/10 pt-8">
              {[["28k+", "Happy customers"], ["4.8★", "Average rating"], ["120+", "Curated finds"]].map(([n, l]) => (
                <div key={l}><p className="font-serif text-3xl md:text-4xl text-deep">{n}</p><p className="text-xs text-charcoal/55 mt-1">{l}</p></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}><button onClick={() => navigate("/shop")} className="btn btn-outline mt-10">Discover the Collection</button></Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "Ambre Nocturne is now my signature. I get compliments every single time I wear it.", n: "Olivia R.", p: "Ambre Nocturne" },
    { q: "The cashmere crewneck is unbelievably soft. Packaging felt like opening a gift.", n: "Marcus T.", p: "Cloud Cashmere Crewneck" },
    { q: "Fast shipping, beautiful curation and the Aura Pro earbuds sound incredible.", n: "Priya K.", p: "Aura Pro Earbuds" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % quotes.length), 5500); return () => clearInterval(t); }, [quotes.length]);
  return (
    <section className="py-24 md:py-28 text-center px-5">
      <p className="eyebrow text-teal mb-8">Kind Words</p>
      <div className="relative max-w-3xl mx-auto min-h-[200px] md:min-h-[170px]">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.6 }}>
            <p className="font-serif italic text-2xl md:text-4xl font-light leading-snug">"{quotes[i].q}"</p>
            <p className="mt-6 text-xs tracking-[0.2em] uppercase text-charcoal/60">{quotes[i].n} — <span className="text-deep">{quotes[i].p}</span></p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {quotes.map((_, k) => <button key={k} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-teal" : "w-1.5 bg-charcoal/20"}`} />)}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Perks />
      <Categories />
      <Featured />
      <FashionEditorial />
      <NewArrivals />
      <FragranceBanner />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </>
  );
}
