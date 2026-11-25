import { MENU_ITEMS } from "@/data/menu";

export type ToppingStyle = "truffles" | "berries" | "pistachio-rose" | "pineapple" | "hazelnut";

export interface CakeFlavor3D {
  id: string;
  menuItemId: string;
  slug: string;
  shortName: string;
  fullName: string;
  hindiSubtitle: string;
  spongeColor: string;
  fillingColor: string;
  frostingColor: string;
  dripColor: string;
  accentColor: string;
  toppingStyle: ToppingStyle;
  description: string;
  startingPrice500g: number;
  price1kg: number;
  image: string;
}

function getMenuPrice(id: string, variantIdx: number, fallback: number): number {
  const item = MENU_ITEMS.find((entry) => entry.id === id);
  return item?.variants[variantIdx]?.priceInr ?? fallback;
}

function getMenuImage(id: string, fallback: string): string {
  return MENU_ITEMS.find((entry) => entry.id === id)?.image ?? fallback;
}

export const CAKE_FLAVORS_3D: CakeFlavor3D[] = [
  {
    id: "belgian-truffle",
    menuItemId: "cake-belgian-truffle",
    slug: "belgian-dark-chocolate-truffle-cake",
    shortName: "Belgian Truffle",
    fullName: "Belgian Dark Chocolate Truffle Cake",
    hindiSubtitle: "54% कोको बेल्जियन ट्रफल केक",
    spongeColor: "#4b291d",
    fillingColor: "#26120c",
    frostingColor: "#381c14",
    dripColor: "#1d0c07",
    accentColor: "#d9a441",
    toppingStyle: "truffles",
    description:
      "Three moist Dutch-cocoa sponges layered with 54% Belgian couverture ganache, roasted hazelnuts & cocoa-dusted truffles.",
    startingPrice500g: getMenuPrice("cake-belgian-truffle", 0, 580),
    price1kg: getMenuPrice("cake-belgian-truffle", 1, 1080),
    image: getMenuImage("cake-belgian-truffle", "/images/belgian-truffle-cake.jpg"),
  },
  {
    id: "vanilla-berry",
    menuItemId: "cake-vanilla-berry-fig",
    slug: "madagascar-vanilla-berry-cream-cake",
    shortName: "Vanilla Berry",
    fullName: "Madagascar Vanilla Bean & Fresh Berry Cake",
    hindiSubtitle: "वनीला बीन और फ्रेश बेरी केक",
    spongeColor: "#f3dec0",
    fillingColor: "#b82d46",
    frostingColor: "#fff8ec",
    dripColor: "#c83c56",
    accentColor: "#4c6b40",
    toppingStyle: "berries",
    description:
      "Speckled real vanilla bean cream over light 100% Pure Veg sponge with ruby strawberry-fig compote and garden berries.",
    startingPrice500g: getMenuPrice("cake-vanilla-berry-fig", 0, 540),
    price1kg: getMenuPrice("cake-vanilla-berry-fig", 1, 990),
    image: getMenuImage("cake-vanilla-berry-fig", "/images/vanilla-berry-cake.jpg"),
  },
  {
    id: "saffron-pistachio",
    menuItemId: "cake-pistachio-berry-rasmalai",
    slug: "royal-saffron-pistachio-berry-cake",
    shortName: "Kesar Pistachio",
    fullName: "Royal Saffron, Pistachio & Berry Fusion Cake",
    hindiSubtitle: "केसर पिस्ता रॉयल मिल्क केक",
    spongeColor: "#f0c762",
    fillingColor: "#d2e5b2",
    frostingColor: "#fcf0cb",
    dripColor: "#7da252",
    accentColor: "#d24d6c",
    toppingStyle: "pistachio-rose",
    description:
      "Kashmiri saffron milk sponge layered with cardamom malai cream, roasted green pistachios, and Damascus rose petals.",
    startingPrice500g: getMenuPrice("cake-pistachio-berry-rasmalai", 0, 620),
    price1kg: getMenuPrice("cake-pistachio-berry-rasmalai", 1, 1150),
    image: getMenuImage("cake-pistachio-berry-rasmalai", "/images/berry-pistachio-cake.jpg"),
  },
  {
    id: "pineapple-orchard",
    menuItemId: "cake-classic-pineapple-orchard",
    slug: "caramelized-pineapple-orchard-cake",
    shortName: "Pineapple Orchard",
    fullName: "Caramelized Pineapple & Vanilla Orchard Cake",
    hindiSubtitle: "फ्रेश पाइनएप्पल ऑर्चर्ड केक",
    spongeColor: "#f3cf80",
    fillingColor: "#e69a1e",
    frostingColor: "#fffcf3",
    dripColor: "#df9118",
    accentColor: "#b53c3c",
    toppingStyle: "pineapple",
    description:
      "House-caramelized fresh pineapple chunks folded into airy vanilla whipped cream—wholesome, light & pocket-friendly.",
    startingPrice500g: getMenuPrice("cake-classic-pineapple-orchard", 0, 460),
    price1kg: getMenuPrice("cake-classic-pineapple-orchard", 1, 860),
    image: getMenuImage("cake-classic-pineapple-orchard", "/images/vanilla-berry-cake.jpg"),
  },
  {
    id: "hazelnut-mocha",
    menuItemId: "cake-opera-hazelnut",
    slug: "roasted-hazelnut-mocha-layer-cake",
    shortName: "Hazelnut Mocha",
    fullName: "Roasted Hazelnut & Espresso Opera Cake",
    hindiSubtitle: "हेज़लनट मोका लेयर केक",
    spongeColor: "#784930",
    fillingColor: "#aa744a",
    frostingColor: "#8b593a",
    dripColor: "#26130c",
    accentColor: "#d9a441",
    toppingStyle: "hazelnut",
    description:
      "Single-origin espresso cocoa layers paired with house hazelnut praline crunch and glossy dark couverture glaze.",
    startingPrice500g: getMenuPrice("cake-opera-hazelnut", 0, 640),
    price1kg: getMenuPrice("cake-opera-hazelnut", 1, 1190),
    image: getMenuImage("cake-opera-hazelnut", "/images/chocolate-opera-slice.jpg"),
  },
];

export const LAYER_ANATOMY_LABELS = [
  { key: "dome", title: "Crystal Bakery Case", detail: "Glass cloche protecting counter freshness" },
  { key: "crown", title: "Hand-Piped Garnish Crown", detail: "Berries, rosettes, pistachios or Belgian truffles" },
  { key: "glaze", title: "Velvet Ganache Drip & Coat", detail: "Silky pure dairy cream or 54% couverture" },
  { key: "filling", title: "House-Simmered Filling", detail: "Fruit compote, truffle mousse or malai cream" },
  { key: "sponge", title: "100% Pure Veg Sponge", detail: "Unbleached organic flour, strictly eggless" },
  { key: "stand", title: "Turned Walnut Stand", detail: "Presented on gold/sage bakery cake board" },
];
