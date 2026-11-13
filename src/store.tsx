import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./data/products";

export interface CartItem {
  key: string;
  id: string;
  qty: number;
  variant?: string;
  size?: string;
}

export type Route =
  | { page: "home" }
  | { page: "shop"; category?: string; filter?: string }
  | { page: "product"; id: string }
  | { page: "wishlist" };

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, "");
  const [path, query] = h.split("?");
  const params = new URLSearchParams(query || "");
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "shop") return { page: "shop", category: parts[1], filter: params.get("filter") || undefined };
  if (parts[0] === "product" && parts[1]) return { page: "product", id: parts[1] };
  if (parts[0] === "wishlist") return { page: "wishlist" };
  return { page: "home" };
}

interface Store {
  route: Route;
  navigate: (path: string) => void;
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (p: Product, qty?: number, opts?: { variant?: string; size?: string }) => void;
  updateQty: (key: string, qty: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(parseHash);
  const [cart, setCart] = useState<CartItem[]>(() => load("wandas-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() => load("wandas-wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => localStorage.setItem("wandas-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("wandas-wishlist", JSON.stringify(wishlist)), [wishlist]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout((window as unknown as { __t?: number }).__t);
    (window as unknown as { __t?: number }).__t = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const navigate = useCallback((path: string) => {
    const target = "#" + path;
    if (window.location.hash === target) window.scrollTo({ top: 0, behavior: "smooth" });
    else window.location.hash = path;
  }, []);

  const addToCart: Store["addToCart"] = useCallback(
    (p, qty = 1, opts = {}) => {
      const variant = opts.variant ?? p.variants?.options[0];
      const size = opts.size ?? (p.sizes ? p.sizes[Math.min(2, p.sizes.length - 1)] : undefined);
      const key = [p.id, variant, size].filter(Boolean).join("|");
      setCart((c) => {
        const ex = c.find((i) => i.key === key);
        if (ex) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        return [...c, { key, id: p.id, qty, variant, size }];
      });
      showToast(`${p.name} added to your bag`);
    },
    [showToast]
  );

  const updateQty = (key: string, qty: number) =>
    setCart((c) => (qty <= 0 ? c.filter((i) => i.key !== key) : c.map((i) => (i.key === key ? { ...i, qty } : i))));
  const removeFromCart = (key: string) => setCart((c) => c.filter((i) => i.key !== key));
  const clearCart = () => setCart([]);

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((w) => {
        const has = w.includes(id);
        const p = getProduct(id);
        showToast(has ? `Removed ${p?.name} from wishlist` : `Saved ${p?.name} to wishlist`);
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [showToast]
  );

  const { cartCount, subtotal } = useMemo(() => {
    let count = 0, sub = 0;
    for (const i of cart) {
      const p = getProduct(i.id);
      if (!p) continue;
      count += i.qty;
      sub += p.price * i.qty;
    }
    return { cartCount: count, subtotal: sub };
  }, [cart]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || searchOpen || quickView ? "hidden" : "";
  }, [cartOpen, searchOpen, quickView]);

  const value: Store = {
    route, navigate, cart, cartCount, subtotal, addToCart, updateQty, removeFromCart, clearCart,
    wishlist, toggleWishlist, inWishlist: (id) => wishlist.includes(id),
    cartOpen, setCartOpen, searchOpen, setSearchOpen, quickView, setQuickView, toast, showToast,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
