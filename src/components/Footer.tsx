import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useStore } from "../store";
import { Reveal } from "./ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function useSubscribe() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return setError("Please enter your email address.");
    if (!EMAIL_RE.test(email.trim())) return setError("Please enter a valid email address.");
    setError("");
    setDone(true);
  };
  return { email, setEmail: (v: string) => { setEmail(v); setError(""); }, error, done, submit, reset: () => { setDone(false); setEmail(""); } };
}

export function Newsletter() {
  const s = useSubscribe();
  return (
    <section className="relative bg-deep text-ivory overflow-hidden grain">
      <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full border border-ivory/10" />
      <div className="absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full border border-ivory/10" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 py-24 md:py-32 text-center">
        <Reveal>
          <p className="eyebrow text-beige/80 mb-5">The Wanda's Letter</p>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-[1.05]">A Little Something Special, <em className="italic">Delivered.</em></h2>
          <p className="mt-6 text-ivory/70 max-w-lg mx-auto">Be the first to discover new arrivals, exclusive finds, and special offers.</p>
        </Reveal>
        <Reveal delay={0.15}>
          <AnimatePresence mode="wait">
            {s.done ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 inline-flex flex-col items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-teal grid place-items-center"><Check size={22} /></div>
                <p className="font-serif text-2xl">Welcome to Wanda's.</p>
                <p className="text-sm text-ivory/70">We've sent a little welcome gift to <strong>{s.email}</strong> — enjoy 10% off your first order.</p>
                <button onClick={s.reset} className="text-[11px] tracking-[0.2em] uppercase underline underline-offset-4 text-ivory/60 mt-2">Use another email</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={s.submit} noValidate className="mt-10 max-w-lg mx-auto">
                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-0 sm:border ${s.error ? "sm:border-red-300" : "sm:border-ivory/30"} sm:focus-within:border-ivory transition`}>
                  <input
                    type="email" value={s.email} onChange={(e) => s.setEmail(e.target.value)} placeholder="Your email address"
                    aria-label="Email address"
                    className="flex-1 bg-transparent px-5 py-4 outline-none placeholder:text-ivory/40 border border-ivory/30 sm:border-0"
                  />
                  <button type="submit" className="btn btn-light !py-4">Subscribe <ArrowRight size={14} /></button>
                </div>
                {s.error && <p className="text-left text-xs text-red-200 mt-2">{s.error}</p>}
                <p className="text-[11px] text-ivory/40 mt-4">By subscribing you agree to receive marketing emails. Unsubscribe anytime.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

const Social = ({ d, label }: { d: string; label: string }) => (
  <a href="#" onClick={(e) => e.preventDefault()} aria-label={label} className="h-10 w-10 rounded-full border border-ivory/20 grid place-items-center hover:bg-teal hover:border-teal transition">
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d={d} /></svg>
  </a>
);

export default function Footer() {
  const { navigate, showToast } = useStore();
  const s = useSubscribe();
  const info = (t: string) => showToast(t);

  const cols = [
    { title: "Shop", links: [["Shop All", () => navigate("/shop")], ["Fragrances", () => navigate("/shop/fragrances")], ["Electronics", () => navigate("/shop/electronics")], ["Fashion", () => navigate("/shop/fashion")], ["Accessories", () => navigate("/shop/accessories")], ["New Arrivals", () => navigate("/shop?filter=new")]] },
    { title: "Customer Care", links: [["Help & FAQ", () => info("Our care team replies within 24 hours")], ["Shipping Information", () => info("Free standard shipping on orders over $100 · 2–5 business days")], ["Returns & Exchanges", () => info("Free returns and exchanges within 30 days")], ["Order Tracking", () => info("Order tracking is available in your account")], ["Gift Cards", () => info("Digital gift cards coming soon")], ["My Wishlist", () => navigate("/wishlist")]] },
  ] as const;

  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-3xl tracking-[0.28em] text-ivory">WANDA'S</p>
            <p className="text-[9px] tracking-[0.36em] text-teal mt-2">EVERYDAY FINDS. ELEVATED.</p>
            <p className="mt-6 text-sm leading-relaxed text-ivory/60 max-w-sm">A thoughtfully curated destination for fragrances, fashion, technology and the little luxuries that make every day feel a bit more special.</p>
            <div className="flex gap-3 mt-8">
              <Social label="Instagram" d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
              <Social label="Pinterest" d="M12 2a10 10 0 00-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.1-4.6 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1 0-2-.5-2.4-1.2l-.6 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1012 2z" />
              <Social label="TikTok" d="M16.6 5.8A4.3 4.3 0 0115.5 3h-3.1v12.4a2.6 2.6 0 11-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 00-.8-.1 5.7 5.7 0 105.7 5.7V9a7.4 7.4 0 004.3 1.4V7.3a4.3 4.3 0 01-3.2-1.5z" />
              <Social label="Facebook" d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0022 12z" />
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <p className="eyebrow text-ivory mb-5">{c.title}</p>
              <ul className="space-y-3 text-sm">
                {c.links.map(([label, fn]) => (
                  <li key={label}><button onClick={fn} className="text-ivory/60 hover:text-ivory transition text-left">{label}</button></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-4">
            <p className="eyebrow text-ivory mb-5">Stay in Touch</p>
            <ul className="space-y-3 text-sm text-ivory/60 mb-8">
              <li className="flex items-center gap-3"><Mail size={15} className="text-teal" /> hello@wandas.shop</li>
              <li className="flex items-center gap-3"><Phone size={15} className="text-teal" /> +1 (555) 214-8890 · Mon–Sat 9–6</li>
              <li className="flex items-center gap-3"><MapPin size={15} className="text-teal" /> 128 Linden Street, Brooklyn, NY</li>
            </ul>
            {s.done ? (
              <p className="text-sm text-ivory flex items-center gap-2"><Check size={16} className="text-teal" /> You're subscribed — welcome!</p>
            ) : (
              <form onSubmit={s.submit} noValidate>
                <div className="flex border-b border-ivory/30 focus-within:border-teal transition">
                  <input value={s.email} onChange={(e) => s.setEmail(e.target.value)} type="email" placeholder="Email for news & offers" aria-label="Email" className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-ivory/40" />
                  <button aria-label="Subscribe" className="px-2 hover:text-teal transition"><ArrowRight size={18} /></button>
                </div>
                {s.error && <p className="text-xs text-red-300 mt-2">{s.error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row gap-4 justify-between text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Wanda's. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <span>Privacy Policy</span><span>Terms of Service</span><span>Accessibility</span>
            <span className="flex gap-2">
              {["VISA", "MC", "AMEX", "PAY"].map((x) => <span key={x} className="border border-ivory/20 px-1.5 py-0.5 text-[9px] tracking-wider">{x}</span>)}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
