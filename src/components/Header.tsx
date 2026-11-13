import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "../store";

const NAV = [
  { label: "Home", path: "/" },
  { label: "Shop All", path: "/shop" },
  { label: "Fragrances", path: "/shop/fragrances" },
  { label: "Electronics", path: "/shop/electronics" },
  { label: "Fashion", path: "/shop/fashion" },
  { label: "Accessories", path: "/shop/accessories" },
];

export default function Header() {
  const { route, navigate, cartCount, setCartOpen, setSearchOpen, wishlist, showToast } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return route.page === "home";
    if (path === "/shop") return route.page === "shop" && !route.category;
    return route.page === "shop" && path === `/shop/${route.category}`;
  };

  const go = (p: string) => { setMobileOpen(false); navigate(p); };

  return (
    <>
      <div className="bg-deep text-ivory overflow-hidden">
        <div className="flex whitespace-nowrap py-2.5 animate-[marquee_40s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="eyebrow !text-[10px] !tracking-[0.35em] px-10 opacity-90">
              Discover Something Special — New Arrivals Just Dropped <span className="mx-8 opacity-50">✦</span> Complimentary Shipping Over $100
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? "bg-ivory/90 backdrop-blur-xl shadow-[0_1px_0_rgba(41,45,44,0.08)]" : "bg-almond"}`}>
        <div className={`mx-auto max-w-[1440px] px-5 md:px-10 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
          <div className="flex items-center gap-3 lg:hidden w-24">
            <button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="p-1 -ml-1">
              <Menu size={22} strokeWidth={1.4} />
            </button>
          </div>

          <button onClick={() => go("/")} className="text-center lg:text-left group">
            <span className="block font-serif text-2xl md:text-[1.9rem] tracking-[0.28em] font-medium leading-none">WANDA'S</span>
            <span className="block mt-1.5 text-[8px] md:text-[9px] tracking-[0.36em] text-teal font-medium">EVERYDAY FINDS. ELEVATED.</span>
          </button>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {NAV.map((n) => (
              <button
                key={n.path}
                onClick={() => go(n.path)}
                className={`link-underline text-[11px] tracking-[0.22em] uppercase transition-colors ${isActive(n.path) ? "active text-teal" : "text-charcoal hover:text-teal"}`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5 w-24 lg:w-auto justify-end">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-teal transition">
              <Search size={19} strokeWidth={1.4} />
            </button>
            <button aria-label="Account" onClick={() => showToast("Account sign-in is coming soon")} className="hidden md:block hover:text-teal transition">
              <User size={19} strokeWidth={1.4} />
            </button>
            <button aria-label="Wishlist" onClick={() => go("/wishlist")} className="relative hidden sm:block hover:text-teal transition">
              <Heart size={19} strokeWidth={1.4} />
              {wishlist.length > 0 && <span className="absolute -right-1.5 -top-1.5 h-4 min-w-4 px-1 rounded-full bg-charcoal text-ivory text-[9px] grid place-items-center">{wishlist.length}</span>}
            </button>
            <button aria-label="Shopping bag" onClick={() => setCartOpen(true)} className="relative hover:text-teal transition">
              <ShoppingBag size={19} strokeWidth={1.4} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="absolute -right-2 -top-2 h-[18px] min-w-[18px] px-1 rounded-full bg-teal text-ivory text-[9px] font-medium grid place-items-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[86%] max-w-sm bg-ivory lg:hidden flex flex-col"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-charcoal/10">
                <span className="font-serif text-2xl tracking-[0.28em]">WANDA'S</span>
                <button aria-label="Close menu" onClick={() => setMobileOpen(false)}><X size={22} strokeWidth={1.4} /></button>
              </div>
              <nav className="flex-1 px-6 py-8 flex flex-col">
                {NAV.map((n, i) => (
                  <motion.button
                    key={n.path}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => go(n.path)}
                    className={`text-left font-serif text-3xl py-3 border-b border-charcoal/5 ${isActive(n.path) ? "text-teal italic" : ""}`}
                  >
                    {n.label}
                  </motion.button>
                ))}
                <button onClick={() => go("/wishlist")} className="text-left font-serif text-3xl py-3">Wishlist ({wishlist.length})</button>
              </nav>
              <div className="p-6 border-t border-charcoal/10 text-xs text-charcoal/60 tracking-wide">
                Complimentary shipping on orders over $100 · 30-day returns
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
