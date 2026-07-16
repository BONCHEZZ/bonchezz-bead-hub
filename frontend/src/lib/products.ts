import bracelet from "@/assets/product-bracelet.jpg";
import necklace from "@/assets/product-necklace.jpg";
import watch from "@/assets/product-watch.jpg";
import charm from "@/assets/product-charm.jpg";
import waist from "@/assets/product-waist.jpg";
import anklet from "@/assets/product-anklet.jpg";
import love from "@/assets/product-love.jpg";
import keyholder from "@/assets/product-keyholder.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  colors: string[];
  inStock: boolean;
};

export const categories = [
  { slug: "bracelets", name: "Bracelets & Armbands", image: bracelet, count: 12 },
  { slug: "necklaces", name: "Necklaces", image: necklace, count: 8 },
  { slug: "watches", name: "Watches", image: watch, count: 5 },
  { slug: "phone-charms", name: "Phone Charms", image: charm, count: 9 },
  { slug: "waist-beads", name: "Waist Beads", image: waist, count: 7 },
];

export const products: Product[] = [
  {
    id: "crystal-bracelet",
    name: "Crystal Bracelet",
    price: 450,
    image: bracelet,
    category: "bracelets",
    description:
      "A dreamy stack of hand-strung pink crystal beads finished with a delicate gold-tone tassel. Handmade on campus in small batches.",
    rating: 4.8,
    reviews: 42,
    colors: ["Pink", "Rose", "Clear"],
    inStock: true,
  },
  {
    id: "pearl-necklace",
    name: "Pearl Necklace",
    price: 850,
    image: necklace,
    category: "necklaces",
    description:
      "Freshwater-style pearls threaded with a gold accent bead. Elegant, understated, and dorm-to-dinner ready.",
    rating: 4.9,
    reviews: 61,
    colors: ["Ivory", "Gold"],
    inStock: true,
  },
  {
    id: "rose-gold-watch",
    name: "Rose Gold Watch",
    price: 1800,
    image: watch,
    category: "watches",
    description:
      "A rose-gold face paired with a beaded band. Tells time and tells everyone you have taste.",
    rating: 4.7,
    reviews: 28,
    colors: ["Rose Gold"],
    inStock: true,
  },
  {
    id: "butterfly-charm",
    name: "Butterfly Phone Charm",
    price: 300,
    image: charm,
    category: "phone-charms",
    description:
      "A pink and purple beaded strap with a butterfly pendant. Snap it onto your case and go.",
    rating: 4.6,
    reviews: 54,
    colors: ["Pink", "Purple"],
    inStock: true,
  },
  {
    id: "rainbow-waist-beads",
    name: "Rainbow Waist Beads",
    price: 500,
    image: waist,
    category: "waist-beads",
    description:
      "Full-spectrum waist beads strung on strong nylon. Adjustable, layer-friendly, quietly powerful.",
    rating: 4.9,
    reviews: 73,
    colors: ["Rainbow"],
    inStock: true,
  },
  {
    id: "love-charm-bracelet",
    name: "Love Charm Bracelet",
    price: 550,
    image: love,
    category: "bracelets",
    description:
      "Pink and amethyst beads finished with two heart charms — one gold, one enamel purple.",
    rating: 4.8,
    reviews: 39,
    colors: ["Pink", "Purple", "Gold"],
    inStock: true,
  },
  {
    id: "elegant-anklet",
    name: "Elegant Anklet",
    price: 400,
    image: anklet,
    category: "bracelets",
    description:
      "Pale pink pearl-look beads on a fine gold-tone chain. The details do all the talking.",
    rating: 4.7,
    reviews: 22,
    colors: ["Pink", "Gold"],
    inStock: true,
  },
  {
    id: "beaded-key-holder",
    name: "Beaded Key Holder",
    price: 350,
    image: keyholder,
    category: "phone-charms",
    description: "A rainbow bead cluster on a sturdy clip. Never lose your hostel keys again.",
    rating: 4.5,
    reviews: 31,
    colors: ["Rainbow"],
    inStock: true,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
