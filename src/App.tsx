import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartDrawer, QuickView, SearchOverlay, Toast } from "./components/Overlays";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import { StoreProvider, useStore } from "./store";

function Router() {
  const { route } = useStore();
  const key = JSON.stringify(route);
  let page;
  if (route.page === "shop") page = <Shop category={route.category} filter={route.filter} />;
  else if (route.page === "product") page = <ProductPage id={route.id} />;
  else if (route.page === "wishlist") page = <Wishlist />;
  else page = <Home />;

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={route.page === "shop" ? "shop" : key}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {page}
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Header />
      <Router />
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <Toast />
    </StoreProvider>
  );
}
