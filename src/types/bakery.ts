export type MenuCategoryId =
  | "cakes"
  | "pastries"
  | "tea-cakes"
  | "cookies-breads"
  | "hampers";

export type DietaryBadge = "100% Eggless" | "Eggless Option" | "Organic Grain" | "Nut-Free Option";

export interface MenuVariant {
  label: string;
  weightOrCount: string;
  priceInr: number;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  hindiSubtitle?: string;
  category: MenuCategoryId;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  variants: MenuVariant[];
  egglessAvailable: boolean;
  isPureEggless: boolean;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  isOrganicHighlight?: boolean;
  prepNotice: string;
  ingredients: string[];
  tags: string[];
  servingNote: string;
}

export interface CategoryMeta {
  id: MenuCategoryId;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
}

export interface CustomCakeShowcase {
  id: string;
  title: string;
  occasion: "Birthday" | "Wedding & Engagement" | "Anniversary" | "Baby Shower & Kids" | "Festive";
  flavor: string;
  weightLabel: string;
  startingPriceInr: number;
  image: string;
  imagePosition?: string;
  description: string;
  isEggless: boolean;
}

export interface CakeTierRate {
  tierName: string;
  weightRange: string;
  serves: string;
  startingPriceInr: number;
  includes: string;
}

export interface FounderProfile {
  name: string;
  knownAs?: string;
  role: string;
  specialty: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  occasion: string;
  cityArea: string;
  quote: string;
  rating: number;
  orderedItem: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Ordering" | "Quality & Pure Veg" | "Pricing & Delivery";
}

export interface OrderLineItem {
  itemId: string;
  slug: string;
  name: string;
  image: string;
  variantLabel: string;
  unitPriceInr: number;
  quantity: number;
  eggless: boolean;
  cakeNote?: string;
}
