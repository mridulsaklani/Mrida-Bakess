export type GalleryCategoryId = "all" | "shop" | "custom-cakes" | "signatures" | "pastries-bakes";

export interface GalleryPhotoItem {
  id: string;
  src: string;
  title: string;
  category: Exclude<GalleryCategoryId, "all">;
  caption: string;
  badge: string;
  aspect: "portrait" | "landscape" | "wide";
  objectPosition?: string;
  whatsappPrompt: string;
}

export const GALLERY_CATEGORIES: { id: GalleryCategoryId; label: string }[] = [
  { id: "all", label: "All Gallery" },
  { id: "custom-cakes", label: "Real Custom Cakes" },
  { id: "shop", label: "Mandi Shop & Café" },
  { id: "signatures", label: "Signature Cakes" },
  { id: "pastries-bakes", label: "Pastries & Tea Bakes" },
];

export const GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: "gal-doll-cake",
    src: "/images/cake-doll-rosette.jpg",
    title: "Princess Butterfly Rosette Doll Cake",
    category: "custom-cakes",
    caption:
      "Handcrafted 100% Pure Veg princess doll cake piped with pink buttercream rosettes, sky-blue bodice & pastel butterflies.",
    badge: "Real Bake · Kids Birthday",
    aspect: "portrait",
    objectPosition: "object-[50%_38%]",
    whatsappPrompt:
      "Hi Manu & Manisha! I saw the Princess Butterfly Rosette Doll Cake in your Gallery and would love to order a similar 100% Pure Veg cake.",
  },
  {
    id: "gal-shop-exterior",
    src: "/images/shop-exterior.jpg",
    title: "Mrida Bakess Storefront · Bagla, Dohandi",
    category: "shop",
    caption:
      "Our cheerful 100% Pure Veg bakehouse entrance near Domino's, Bagla, Dohandi, Mandi – 175021 — open daily 8 AM to 8 PM.",
    badge: "Mandi Storefront",
    aspect: "portrait",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Mrida Bakess! I'd like directions / timings for visiting your Bagla, Dohandi (Mandi) shop.",
  },
  {
    id: "gal-excavator-cake",
    src: "/images/cake-excavator-custom.jpg",
    title: "Mini Builder Excavator Birthday Cake",
    category: "custom-cakes",
    caption:
      "Mint-green whipped cream meadow, piped grass rims, rich chocolate crumble soil & yellow construction excavators.",
    badge: "Real Bake · Kids Hit",
    aspect: "portrait",
    objectPosition: "object-[50%_75%]",
    whatsappPrompt:
      "Hi Manu & Manisha! I'd love to book the Mini Builder Excavator Kids Birthday Cake (100% Pure Veg).",
  },
  {
    id: "gal-baby-shower",
    src: "/images/cake-baby-shower-reveal.jpg",
    title: "Girl? or Boy? Baby Shower Celebration Cake",
    category: "custom-cakes",
    caption:
      "Pastel split pink & sky-blue buttercream cake decorated with tiny baby footprints and rainbow confetti seam.",
    badge: "Real Bake · Baby Shower",
    aspect: "portrait",
    objectPosition: "object-[50%_58%]",
    whatsappPrompt:
      "Hi Mrida Bakess! I'd like to inquire about a custom 100% Pure Veg Baby Shower cake like the Pink & Blue design in your Gallery.",
  },
  {
    id: "gal-shop-evening",
    src: "/images/shop-evening-guests.jpg",
    title: "Evening Café Vibe & Pastry Counter",
    category: "shop",
    caption:
      "Mandi families & students enjoying fresh evening bakes under warm pendant lights beside our chilled showcase.",
    badge: "Dine-In Atmosphere",
    aspect: "wide",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Mrida Bakess! We'd love to visit your Bagla café this evening — checking what's fresh on the counter.",
  },
  {
    id: "gal-shop-sign",
    src: "/images/shop-signboard.jpg",
    title: "मृदा BAKES · 100% Pure Veg Emblem",
    category: "shop",
    caption:
      "Our illuminated Bagla shop signboard proudly displaying the मृदा Bakess seal and our 100% Pure Veg commitment.",
    badge: "100% Pure Veg",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt: "Hi Mrida Bakess! Connecting from your photo gallery.",
  },
  {
    id: "gal-botanical-tier",
    src: "/images/custom-cake-tier.jpg",
    title: "Pressed Botanical & Fig Two-Tier Cake",
    category: "custom-cakes",
    caption:
      "Manisha's ivory buttercream engagement two-tier accented with halved figs, dried Damascus roses & gold leaf.",
    badge: "Wedding & Engagement",
    aspect: "portrait",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Manisha & Manu! Please share pricing for a 2-tier botanical engagement cake (100% Pure Veg).",
  },
  {
    id: "gal-belgian-truffle",
    src: "/images/belgian-truffle-cake.jpg",
    title: "54% Belgian Dark Chocolate Truffle Cake",
    category: "signatures",
    caption:
      "Glossy pure couverture ganache over moist organic cocoa sponges crowned with chocolate curls and toasted hazelnuts.",
    badge: "Bestseller · From ₹580",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Mrida Bakess! I'd like to order a 100% Pure Veg Belgian Dark Chocolate Truffle Cake.",
  },
  {
    id: "gal-shop-counter",
    src: "/images/shop-display-counter.jpg",
    title: "Sunlit Café Tables & Chilled Cake Showcase",
    category: "shop",
    caption:
      "Neat boutique seating and refrigerated display counter stocked fresh every morning at 8 AM.",
    badge: "Bagla Bakehouse",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt: "Hi Mrida Bakess! Can I stop by to choose a cake from your counter?",
  },
  {
    id: "gal-vanilla-berry",
    src: "/images/vanilla-berry-cake.jpg",
    title: "Madagascar Vanilla Bean & Berry Cake",
    category: "signatures",
    caption:
      "Scalloped ivory vanilla cream topped with fresh strawberries, raspberries, figs & aromatic garden sage.",
    badge: "Bestseller · From ₹540",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Mrida Bakess! I'd love to order your Madagascar Vanilla Bean & Fresh Berry Cake.",
  },
  {
    id: "gal-founders",
    src: "/images/founders-bakery.jpg",
    title: "Manu (Naveen Thakur) & Manisha Thakur",
    category: "shop",
    caption:
      "Your hands-on bakers behind every custom sponge, pastry glaze, and birthday box leaving Mrida Bakess.",
    badge: "Meet The Bakers",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt: "Hello Manu & Manisha! Would love to book a custom cake with you.",
  },
  {
    id: "gal-pastries-flight",
    src: "/images/pastries-collection.jpg",
    title: "Chef's Assorted Gourmet Pastry Flight",
    category: "pastries-bakes",
    caption:
      "Belgian Truffle Ganache, Pistachio Rose Mille-Feuille, Passionfruit Berry Tart & Espresso Caramel Napoleon.",
    badge: "Counter Slices · From ₹85",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Mrida Bakess! I'd like to reserve an Assorted Pastry Flight box of 4.",
  },
  {
    id: "gal-shop-seating",
    src: "/images/shop-interior-seating.jpg",
    title: "Clean Botanical Dine-In Seating",
    category: "shop",
    caption:
      "Relaxed leafy interior frames and crisp cafe tables for catch-ups over brownies and cold drinks.",
    badge: "Cozy Interior",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt: "Hi Mrida Bakess! Checking today's cafe menu.",
  },
  {
    id: "gal-saffron-pistachio",
    src: "/images/berry-pistachio-cake.jpg",
    title: "Royal Saffron, Pistachio & Berry Cake",
    category: "signatures",
    caption:
      "Kashmiri saffron milk-soaked 100% Pure Veg sponge layered with cardamom malai cream & green pistachios.",
    badge: "Chef's Special",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Mrida Bakess! I'd like to order the Royal Saffron Pistachio Cake.",
  },
  {
    id: "gal-croissants",
    src: "/images/butter-croissants.jpg",
    title: "72-Hour Cultured Butter Croissants",
    category: "pastries-bakes",
    caption:
      "Crisp golden honeycombed layers pulled warm from Manu's morning oven at 8:30 AM daily.",
    badge: "Morning Batch · ₹95",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Mrida Bakess! Please save warm Cultured Butter Croissants for pickup.",
  },
  {
    id: "gal-tea-cake",
    src: "/images/pistachio-tea-cake.jpg",
    title: "Organic Pistachio & Rose Wholewheat Tea Loaf",
    category: "pastries-bakes",
    caption:
      "Stone-milled unbleached wheat loaf enriched with almond meal, cardamom, green pistachios & rose petals.",
    badge: "Whole Wheat · From ₹290",
    aspect: "landscape",
    objectPosition: "object-center",
    whatsappPrompt:
      "Hi Mrida Bakess! I'd like to order an Organic Pistachio & Rose Wholewheat Tea Cake.",
  },
];
