export type Category = "fragrances" | "electronics" | "fashion" | "accessories";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  added: number; // days ago (lower = newer)
  isNew?: boolean;
  bestSeller?: boolean;
  images: string[];
  description: string;
  variants?: { label: string; options: string[] };
  sizes?: string[];
  notes?: { top: string; heart: string; base: string };
  fragranceDetails?: { label: string; value: string }[];
  specs?: { label: string; value: string }[];
  features?: string[];
  material?: string;
  fit?: string;
}

export const px = (id: number, w = 900, h = 1100) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const CATEGORIES: { id: Category; title: string; subtitle: string; image: string; blurb: string }[] = [
  { id: "fragrances", title: "Fragrances", subtitle: "Perfumes & Colognes", image: "images/cat-fragrance.jpg", blurb: "Signature scents, layered with intention — from luminous florals to smoky woods." },
  { id: "electronics", title: "Electronics", subtitle: "Technology & Gadgets", image: "images/cat-electronics.jpg", blurb: "Beautifully engineered technology that fits seamlessly into everyday life." },
  { id: "fashion", title: "Fashion", subtitle: "Sweaters & Apparel", image: "images/cat-fashion.jpg", blurb: "Soft knits and easy layers designed for comfort, character, and longevity." },
  { id: "accessories", title: "Accessories", subtitle: "Everyday Essentials", image: px(12572107, 900, 1200), blurb: "Finishing touches in leather, silk, and gold — the details that make it yours." },
];

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const SCENT_SIZES = { label: "Size", options: ["30 ml", "50 ml", "100 ml"] };

export const PRODUCTS: Product[] = [
  // ——— FRAGRANCES ———
  {
    id: "ambre-nocturne", name: "Ambre Nocturne", subtitle: "Eau de Parfum", category: "fragrances",
    price: 148, rating: 4.9, reviews: 412, sold: 2310, added: 40, bestSeller: true,
    images: [px(15096784), px(27357173), px(16255099)],
    description: "A warm, enveloping amber that unfolds like candlelight at dusk. Resinous and golden, softened with vanilla and a whisper of saffron — made to linger on skin and cashmere alike.",
    variants: SCENT_SIZES,
    notes: { top: "Saffron, Pink Pepper, Bergamot", heart: "Amber, Jasmine Sambac, Labdanum", base: "Madagascan Vanilla, Sandalwood, Musk" },
    fragranceDetails: [{ label: "Concentration", value: "Eau de Parfum (18%)" }, { label: "Family", value: "Amber Oriental" }, { label: "Longevity", value: "8–10 hours" }, { label: "Sillage", value: "Moderate to strong" }],
  },
  {
    id: "velvet-iris", name: "Velvet Iris", subtitle: "Eau de Parfum — Women", category: "fragrances",
    price: 132, originalPrice: 165, rating: 4.8, reviews: 298, sold: 1840, added: 55, bestSeller: true,
    images: [px(27357173), px(15096784), px(37127787)],
    description: "Powdery iris wrapped in soft suede and pear blossom. Elegant, quiet, and impossibly refined — a modern classic for every day.",
    variants: SCENT_SIZES,
    notes: { top: "Pear Blossom, Mandarin", heart: "Orris Butter, Violet Leaf, Rose", base: "Suede, White Musk, Cashmere Wood" },
    fragranceDetails: [{ label: "Concentration", value: "Eau de Parfum (16%)" }, { label: "Family", value: "Floral Powdery" }, { label: "Longevity", value: "6–8 hours" }, { label: "Sillage", value: "Intimate" }],
  },
  {
    id: "cedar-smoke", name: "Cedar & Smoke", subtitle: "Cologne — Men", category: "fragrances",
    price: 118, rating: 4.7, reviews: 356, sold: 2050, added: 70, bestSeller: true,
    images: [px(30263576), px(16239693), px(7850600)],
    description: "Crisp Atlas cedar meets smoky vetiver and a bright citrus opening. Rugged, clean and quietly confident — the scent of a wool coat on a cold morning.",
    variants: SCENT_SIZES,
    notes: { top: "Grapefruit, Juniper, Cardamom", heart: "Atlas Cedar, Clary Sage", base: "Vetiver, Birch Smoke, Ambergris" },
    fragranceDetails: [{ label: "Concentration", value: "Eau de Cologne (8%)" }, { label: "Family", value: "Woody Aromatic" }, { label: "Longevity", value: "5–7 hours" }, { label: "Sillage", value: "Moderate" }],
  },
  {
    id: "noir-absolu", name: "Noir Absolu", subtitle: "Parfum — Men", category: "fragrances",
    price: 168, rating: 4.9, reviews: 187, sold: 960, added: 22,
    images: [px(16239693), px(30263576), px(7075055)],
    description: "Dark, sensual and magnetic. Black leather, oud and tonka bean create an intense evening fragrance with remarkable depth.",
    variants: { label: "Size", options: ["50 ml", "100 ml"] },
    notes: { top: "Black Pepper, Elemi", heart: "Leather, Oud, Patchouli", base: "Tonka Bean, Benzoin, Guaiac Wood" },
    fragranceDetails: [{ label: "Concentration", value: "Parfum (22%)" }, { label: "Family", value: "Leather Woody" }, { label: "Longevity", value: "10–12 hours" }, { label: "Sillage", value: "Strong" }],
  },
  {
    id: "golden-hour", name: "Golden Hour Elixir", subtitle: "Eau de Parfum — Women", category: "fragrances",
    price: 154, rating: 4.8, reviews: 96, sold: 520, added: 4, isNew: true,
    images: [px(37127787), px(27357173), px(16255112)],
    description: "Sun-warmed skin, honeyed neroli and glowing tuberose. Golden Hour captures the most flattering light of the day in a bottle.",
    variants: SCENT_SIZES,
    notes: { top: "Neroli, Blood Orange", heart: "Tuberose, Orange Blossom, Honey", base: "Benzoin, Blonde Woods, Musk" },
    fragranceDetails: [{ label: "Concentration", value: "Eau de Parfum (17%)" }, { label: "Family", value: "Floral Solar" }, { label: "Longevity", value: "7–9 hours" }, { label: "Sillage", value: "Moderate" }],
  },
  {
    id: "maison-rose", name: "Maison Rose", subtitle: "Eau de Toilette", category: "fragrances",
    price: 96, rating: 4.6, reviews: 241, sold: 1320, added: 90,
    images: [px(7075055), px(15096784), px(27357173)],
    description: "A fresh garden rose, dewy and green, brightened with lychee and grounded by soft cedar. Effortless and endlessly wearable.",
    variants: SCENT_SIZES,
    notes: { top: "Lychee, Green Leaves", heart: "Damask Rose, Peony", base: "Cedarwood, Clean Musk" },
    fragranceDetails: [{ label: "Concentration", value: "Eau de Toilette (10%)" }, { label: "Family", value: "Fresh Floral" }, { label: "Longevity", value: "4–6 hours" }, { label: "Sillage", value: "Light" }],
  },
  {
    id: "lune-blanche", name: "Lune Blanche", subtitle: "Extrait de Parfum — Unisex", category: "fragrances",
    price: 185, rating: 5.0, reviews: 58, sold: 310, added: 2, isNew: true,
    images: [px(7850600), px(16239693), px(37127787)],
    description: "Moonlit white florals over creamy sandalwood and mineral musk. A luminous, genderless extrait with a hypnotic, skin-close trail.",
    variants: { label: "Size", options: ["50 ml", "100 ml"] },
    notes: { top: "Aldehydes, Bergamot", heart: "White Jasmine, Gardenia, Ylang", base: "Sandalwood, Mineral Musk, Ambrette" },
    fragranceDetails: [{ label: "Concentration", value: "Extrait (25%)" }, { label: "Family", value: "White Floral Musk" }, { label: "Longevity", value: "12+ hours" }, { label: "Sillage", value: "Moderate" }],
  },

  // ——— ELECTRONICS ———
  {
    id: "aura-pro-earbuds", name: "Aura Pro", subtitle: "Wireless Noise-Cancelling Earbuds", category: "electronics",
    price: 179, originalPrice: 229, rating: 4.8, reviews: 1204, sold: 4820, added: 35, bestSeller: true,
    images: [px(7417547), px(8380417), px(34444233)],
    description: "Immersive sound in a pocket-sized pebble. Adaptive noise cancellation, crystal-clear calls and all-day comfort with a wireless charging case.",
    variants: { label: "Color", options: ["Ivory", "Charcoal", "Sage"] },
    specs: [{ label: "Battery", value: "8h (32h with case)" }, { label: "Connectivity", value: "Bluetooth 5.3" }, { label: "Water resistance", value: "IPX5" }, { label: "Charging", value: "USB-C & Qi wireless" }, { label: "Drivers", value: "11 mm dynamic" }],
    features: ["Adaptive active noise cancellation", "Transparency mode", "Spatial audio with head tracking", "Multipoint pairing"],
  },
  {
    id: "pulse-mini", name: "Pulse Mini", subtitle: "Everyday Wireless Earbuds", category: "electronics",
    price: 99, rating: 4.5, reviews: 640, sold: 2900, added: 80,
    images: [px(8380417), px(7417547), px(20573137)],
    description: "Lightweight, balanced and reliable. Pulse Mini delivers rich sound and seamless pairing for commutes, workouts and everything between.",
    variants: { label: "Color", options: ["White", "Black"] },
    specs: [{ label: "Battery", value: "6h (24h with case)" }, { label: "Connectivity", value: "Bluetooth 5.2" }, { label: "Water resistance", value: "IPX4" }, { label: "Weight", value: "4.2 g per bud" }],
    features: ["One-touch pairing", "Touch controls", "Fast charge: 10 min = 1 hour", "Built-in dual microphones"],
  },
  {
    id: "meridian-watch", name: "Meridian Series 2", subtitle: "Smartwatch", category: "electronics",
    price: 329, rating: 4.7, reviews: 512, sold: 1650, added: 28, bestSeller: true,
    images: [px(9142237), px(13007642), px(19961773)],
    description: "Brushed aluminium, a sapphire-coated display and the health insights you actually need. Meridian is a smartwatch that looks like jewellery.",
    variants: { label: "Case", options: ["41 mm Silver", "45 mm Silver", "45 mm Graphite"] },
    specs: [{ label: "Display", value: "1.9\" Always-On AMOLED" }, { label: "Battery", value: "Up to 4 days" }, { label: "Sensors", value: "Heart rate, SpO2, Temp" }, { label: "Water resistance", value: "5 ATM" }, { label: "GPS", value: "Dual-frequency" }],
    features: ["Sleep & recovery tracking", "Contactless payments", "120+ workout modes", "Interchangeable straps"],
  },
  {
    id: "halo-sport", name: "Halo Sport", subtitle: "Fitness Smartwatch", category: "electronics",
    price: 249, originalPrice: 289, rating: 4.6, reviews: 233, sold: 880, added: 6, isNew: true,
    images: [px(13007642), px(9142237), px(37735302)],
    description: "Built for movement. A featherlight case, soft-touch band and precise tracking that keeps up with every run, ride and stretch.",
    variants: { label: "Band", options: ["Cloud White", "Teal", "Sand"] },
    specs: [{ label: "Display", value: "1.6\" AMOLED" }, { label: "Battery", value: "Up to 7 days" }, { label: "Weight", value: "29 g" }, { label: "Water resistance", value: "10 ATM" }],
    features: ["Automatic workout detection", "Guided breathing", "Stress & energy score", "Smart notifications"],
  },
  {
    id: "sonora-headphones", name: "Sonora", subtitle: "Over-Ear Wireless Headphones", category: "electronics",
    price: 289, rating: 4.9, reviews: 174, sold: 610, added: 3, isNew: true,
    images: [px(33305814), px(210927), px(29483003)],
    description: "Plush protein-leather cushions, a lightweight frame and studio-grade sound. Sonora disappears on your head and transports you anywhere.",
    variants: { label: "Color", options: ["Almond", "Charcoal"] },
    specs: [{ label: "Battery", value: "40 hours (ANC on)" }, { label: "Drivers", value: "40 mm beryllium" }, { label: "Connectivity", value: "Bluetooth 5.3, 3.5 mm" }, { label: "Weight", value: "250 g" }],
    features: ["Hybrid noise cancellation", "Hi-Res wireless audio", "Foldable with travel case", "Auto pause on removal"],
  },
  {
    id: "studio-monitor", name: "Studio Monitor", subtitle: "Wired Reference Headphones", category: "electronics",
    price: 199, rating: 4.7, reviews: 389, sold: 1120, added: 120,
    images: [px(210927), px(33305814), px(20385203)],
    description: "Precise, honest sound for creators and listeners who care. Detachable cable, rotating ear cups and a frame built to last decades.",
    specs: [{ label: "Frequency", value: "5 Hz – 40 kHz" }, { label: "Impedance", value: "38 Ω" }, { label: "Cable", value: "Detachable 1.2 m / 3 m" }, { label: "Weight", value: "285 g" }],
    features: ["Closed-back design", "Swiveling ear cups", "Replaceable ear pads", "Includes carry pouch"],
  },
  {
    id: "dune-speaker", name: "Dune", subtitle: "Portable Bluetooth Speaker", category: "electronics",
    price: 139, rating: 4.6, reviews: 302, sold: 1430, added: 48,
    images: [px(11764413), px(15485973), px(374114)],
    description: "Room-filling 360° sound wrapped in a soft woven shell. Take Dune from the kitchen to the terrace to the beach.",
    variants: { label: "Color", options: ["Sand", "Stone", "Teal"] },
    specs: [{ label: "Battery", value: "16 hours" }, { label: "Output", value: "20 W" }, { label: "Water resistance", value: "IP67" }, { label: "Range", value: "30 m" }],
    features: ["360° sound", "Stereo pairing", "Built-in speakerphone", "USB-C fast charging"],
  },

  // ——— FASHION ———
  {
    id: "cloud-cashmere", name: "Cloud Cashmere Crewneck", subtitle: "Women's Sweater", category: "fashion",
    price: 198, rating: 4.9, reviews: 521, sold: 2600, added: 30, bestSeller: true,
    images: [px(14641423), px(14642651), px(5710046)],
    description: "Feather-soft Grade-A Mongolian cashmere in a relaxed crewneck silhouette. A forever piece you'll reach for every single day.",
    sizes: APPAREL_SIZES, variants: { label: "Color", options: ["Oat", "Ivory", "Dusty Teal"] },
    material: "100% Grade-A Mongolian cashmere, 12-gauge knit", fit: "Relaxed fit with dropped shoulders. True to size — size down for a closer fit.",
  },
  {
    id: "fisherman-cable", name: "Fisherman Cable Knit", subtitle: "Unisex Sweater", category: "fashion",
    price: 165, originalPrice: 210, rating: 4.8, reviews: 344, sold: 1780, added: 60, bestSeller: true,
    images: [px(13889763), px(14641438), px(28259752)],
    description: "A heritage cable knit in chunky merino-wool blend. Substantial, cozy and full of texture — made for crisp walks and slow weekends.",
    sizes: APPAREL_SIZES, variants: { label: "Color", options: ["Cream", "Stone", "Charcoal"] },
    material: "70% Merino wool, 30% recycled nylon", fit: "Classic fit, hip length. Ribbed cuffs and hem.",
  },
  {
    id: "oat-turtleneck", name: "Ribbed Turtleneck", subtitle: "Women's Knit", category: "fashion",
    price: 142, rating: 4.7, reviews: 88, sold: 420, added: 5, isNew: true,
    images: [px(14642651), px(14641423), px(13889763)],
    description: "A fine-ribbed turtleneck that layers beautifully under coats or stands alone with tailored trousers. Soft, stretchy, and polished.",
    sizes: APPAREL_SIZES, variants: { label: "Color", options: ["Oat", "Black", "Camel"] },
    material: "80% Merino wool, 20% cashmere", fit: "Slim fit with a fold-over neck. True to size.",
  },
  {
    id: "heritage-cardigan", name: "Heritage Knit Cardigan", subtitle: "Unisex Cardigan", category: "fashion",
    price: 178, rating: 4.6, reviews: 147, sold: 690, added: 45,
    images: [px(28259752), px(14641438), px(5710046)],
    description: "A generous button-front cardigan with horn-effect buttons and patch pockets. Your new favourite layer for every season.",
    sizes: APPAREL_SIZES, variants: { label: "Color", options: ["Biscuit", "Navy", "Moss"] },
    material: "60% Lambswool, 40% Alpaca", fit: "Oversized fit. Size down for a regular silhouette.",
  },
  {
    id: "linen-shirt", name: "Lightweight Linen Shirt", subtitle: "Men's Shirt", category: "fashion",
    price: 89, rating: 4.5, reviews: 203, sold: 1150, added: 7, isNew: true,
    images: [px(22441297), px(22441291), px(17293343)],
    description: "Breathable European linen with a softly washed hand. Effortless polish for warm days, beach dinners and everything in between.",
    sizes: ["S", "M", "L", "XL", "XXL"], variants: { label: "Color", options: ["Natural", "White", "Sage"] },
    material: "100% European flax linen, garment washed", fit: "Relaxed fit with a camp-inspired collar.",
  },
  {
    id: "sand-overshirt", name: "Relaxed Overshirt", subtitle: "Unisex Overshirt", category: "fashion",
    price: 95, originalPrice: 120, rating: 4.6, reviews: 119, sold: 640, added: 52,
    images: [px(22441291), px(7671168), px(22441297)],
    description: "A brushed cotton overshirt that works as a light jacket. Utility pockets, tonal buttons and a soft structure.",
    sizes: APPAREL_SIZES, variants: { label: "Color", options: ["Sand", "Olive"] },
    material: "100% Organic brushed cotton twill", fit: "Boxy, relaxed fit. Designed to layer.",
  },
  {
    id: "merino-layer", name: "Merino Layering Knit", subtitle: "Men's Sweater", category: "fashion",
    price: 128, rating: 4.7, reviews: 176, sold: 930, added: 75,
    images: [px(5710046), px(14641438), px(13889763)],
    description: "Ultra-fine merino that's light enough for layering and warm enough on its own. Temperature-regulating and naturally odour resistant.",
    sizes: APPAREL_SIZES, variants: { label: "Color", options: ["Ecru", "Graphite", "Forest"] },
    material: "100% Extra-fine Merino wool (17.5 micron)", fit: "Regular fit. True to size.",
  },

  // ——— ACCESSORIES ———
  {
    id: "saddle-tote", name: "Saddle Leather Tote", subtitle: "Full-Grain Leather Bag", category: "accessories",
    price: 245, rating: 4.9, reviews: 267, sold: 1210, added: 33, bestSeller: true,
    images: [px(12572107), px(30447366), px(18968986)],
    description: "Vegetable-tanned leather that develops a rich patina over time. Spacious enough for a laptop, elegant enough for dinner.",
    variants: { label: "Color", options: ["Cognac", "Chocolate", "Black"] },
    material: "Full-grain vegetable-tanned leather, cotton twill lining",
  },
  {
    id: "heritage-wallet", name: "Heritage Bifold Wallet", subtitle: "Embossed Leather", category: "accessories",
    price: 78, originalPrice: 95, rating: 4.7, reviews: 412, sold: 2240, added: 65,
    images: [px(8346474), px(7085799), px(7952556)],
    description: "A slim bifold in embossed Italian leather with six card slots and a full-length note compartment. Gift-boxed.",
    variants: { label: "Color", options: ["Brown", "Black"] },
    material: "Italian embossed calf leather",
  },
  {
    id: "gold-link-set", name: "Gold Link Jewelry Set", subtitle: "Necklace & Bracelet", category: "accessories",
    price: 120, rating: 4.8, reviews: 74, sold: 380, added: 1, isNew: true,
    images: [px(10581732), px(16255112), px(33471459)],
    description: "A delicate chain necklace and matching bracelet in 18k gold vermeil. Wear together or layer with your everyday pieces.",
    variants: { label: "Finish", options: ["18k Gold", "Sterling Silver"] },
    material: "18k gold vermeil over sterling silver, hypoallergenic",
  },
  {
    id: "silk-scarf", name: "Silk Print Scarf", subtitle: "Twill Silk Carré", category: "accessories",
    price: 68, rating: 4.6, reviews: 92, sold: 510, added: 18,
    images: [px(36455719), px(16255112), px(33471459)],
    description: "A hand-rolled silk twill carré with an artful botanical print. Tie it on a bag, in your hair or around your neck.",
    variants: { label: "Print", options: ["Botanica", "Riviera"] },
    material: "100% Mulberry silk twill, hand-rolled edges",
  },
  {
    id: "weekender-kit", name: "Weekender Travel Kit", subtitle: "Leather & Canvas", category: "accessories",
    price: 189, rating: 4.7, reviews: 133, sold: 470, added: 9, isNew: true,
    images: [px(5863541), px(30447366), px(12572107)],
    description: "Everything for a spontaneous escape: a leather dopp kit, passport holder and luggage tag, packed in a waxed canvas pouch.",
    material: "Waxed canvas, full-grain leather trims, brass hardware",
  },
  {
    id: "noir-card-wallet", name: "Noir Card Holder", subtitle: "Minimal Leather", category: "accessories",
    price: 58, rating: 4.5, reviews: 286, sold: 1630, added: 100,
    images: [px(7085799), px(8346474), px(7952556)],
    description: "A minimalist four-slot card holder in smooth black leather. Slips easily into a front pocket.",
    material: "Smooth Nappa leather",
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const money = (n: number) => `$${n.toFixed(2)}`;
