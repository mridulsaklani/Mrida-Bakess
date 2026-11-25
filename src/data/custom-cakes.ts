import type { CakeTierRate, CustomCakeShowcase } from "@/types/bakery";

export const CUSTOM_CAKE_SHOWCASES: CustomCakeShowcase[] = [
  {
    id: "cc-excavator-builder",
    title: "Mini Builder Excavator Birthday Cake",
    occasion: "Baby Shower & Kids",
    flavor: "100% Pure Veg Dutch Cocoa & Vanilla Sponge",
    weightLabel: "1 kg – 1.5 kg Custom",
    startingPriceInr: 950,
    image: "/images/cake-excavator-custom.jpg",
    imagePosition: "object-[50%_75%]",
    description:
      "One of kids' most-requested creations from our Bagla bakehouse—pistachio-mint whipped cream meadow, chocolate crumble earth tracks, piped grass borders, and twin toy excavators.",
    isEggless: true,
  },
  {
    id: "cc-princess-doll",
    title: "Rosette Princess Butterfly Doll Cake",
    occasion: "Birthday",
    flavor: "Strawberry Cream & Madagascar Vanilla",
    weightLabel: "1.5 kg Sculpted Gown",
    startingPriceInr: 1380,
    image: "/images/cake-doll-rosette.jpg",
    imagePosition: "object-[50%_38%]",
    description:
      "Hand-piped baby pink buttercream rosettes swirling up into a sky-blue bodice, accented with edible pearls, delicate pastel butterflies, and custom child's name board.",
    isEggless: true,
  },
  {
    id: "cc-baby-shower-reveal",
    title: "Pink & Blue Gender Reveal Baby Shower Cake",
    occasion: "Baby Shower & Kids",
    flavor: "Caramelized Pineapple or Fresh Berry Cream",
    weightLabel: "1 kg – 1.5 kg Single Tier",
    startingPriceInr: 990,
    image: "/images/cake-baby-shower-reveal.jpg",
    imagePosition: "object-[50%_58%]",
    description:
      "Pastel pink and sky-blue split frosting adorned with dainty baby footprints, rainbow sprinkle seam, sugar pearls, and personalized 'Girl? Boy? Baby Shower' piping.",
    isEggless: true,
  },
  {
    id: "cc-botanical-wedding",
    title: "Pressed Botanical & Fig Two-Tier",
    occasion: "Wedding & Engagement",
    flavor: "Madagascar Vanilla Bean & Fresh Berry",
    weightLabel: "2.5 kg Two-Tier",
    startingPriceInr: 2850,
    image: "/images/custom-cake-tier.jpg",
    imagePosition: "object-center",
    description:
      "Textured low-sugar ivory buttercream layered with berry compote and adorned with halved figs, dried rose petals, eucalyptus, and subtle gold leaf—100% Pure Veg.",
    isEggless: true,
  },
  {
    id: "cc-belgian-milestone",
    title: "Dark Velvet Hazelnut Milestone Cake",
    occasion: "Anniversary",
    flavor: "54% Belgian Dark Chocolate Truffle",
    weightLabel: "1.5 kg Tall Tier",
    startingPriceInr: 1580,
    image: "/images/belgian-truffle-cake.jpg",
    imagePosition: "object-center",
    description:
      "Rich pure couverture ganache over three moist cocoa sponges, topped with hand-shaved Belgian curls and roasted hazelnuts.",
    isEggless: true,
  },
  {
    id: "cc-pistachio-festive",
    title: "Royal Kesar Pistachio Celebration",
    occasion: "Festive",
    flavor: "Saffron Cardamom Rasmalai Cream",
    weightLabel: "1 kg Single Tier",
    startingPriceInr: 1150,
    image: "/images/berry-pistachio-cake.jpg",
    imagePosition: "object-center",
    description:
      "Loved across Mandi for family pujas, parents' anniversaries, and housewarmings—delicately saffron-scented milk sponge with crushed green pistachios.",
    isEggless: true,
  },
];

export const CUSTOM_CAKE_TIER_RATES: CakeTierRate[] = [
  {
    tierName: "Single-Tier Classic",
    weightRange: "500 g – 1 kg",
    serves: "5 – 12 Guests",
    startingPriceInr: 550,
    includes: "100% Pure Veg sponge, custom cream palette, fresh garnish & handwritten topper card",
  },
  {
    tierName: "Kids Theme / Doll Cake",
    weightRange: "1 kg – 1.5 kg",
    serves: "12 – 18 Guests",
    startingPriceInr: 950,
    includes: "Custom character/toy theme, rosette gown or baby shower styling & custom board message",
  },
  {
    tierName: "Signature Two-Tier Cake",
    weightRange: "2 kg – 3 kg",
    serves: "22 – 36 Guests",
    startingPriceInr: 2350,
    includes: "Two customizable Pure Veg flavors, botanical styling, dowels & reinforced transport box",
  },
  {
    tierName: "Grand Wedding / Three-Tier",
    weightRange: "4 kg – 6 kg",
    serves: "45 – 75 Guests",
    startingPriceInr: 4450,
    includes: "Complimentary tasting box, bespoke color matching & local Mandi setup guidance",
  },
];

export const ESTIMATOR_FLAVORS = [
  { id: "vanilla-berry", label: "Madagascar Vanilla & Fresh Berry", ratePerKg: 990 },
  { id: "belgian-truffle", label: "54% Belgian Chocolate Truffle", ratePerKg: 1080 },
  { id: "kesar-pistachio", label: "Royal Saffron Pistachio Rasmalai", ratePerKg: 1150 },
  { id: "pineapple-orchard", label: "Caramelized Pineapple Cream", ratePerKg: 860 },
  { id: "hazelnut-mocha", label: "Roasted Hazelnut Mocha Praline", ratePerKg: 1190 },
];

export const ESTIMATOR_DESIGNS = [
  { id: "classic-floral", label: "Classic Whipped Cream & Berries", extraFeeInr: 0 },
  { id: "botanical-buttercream", label: "Textured Botanical & Dried Florals", extraFeeInr: 250 },
  { id: "theme-accent", label: "Kids Theme / Doll / Minimal Fondant Accents", extraFeeInr: 350 },
];
