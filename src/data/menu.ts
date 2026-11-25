import type { CategoryMeta, MenuCategoryId, MenuItem } from "@/types/bakery";

export const MENU_CATEGORIES: CategoryMeta[] = [
  {
    id: "cakes",
    name: "Signature Celebration Cakes",
    tagline: "Baked fresh for birthdays, anniversaries & family milestones",
    description:
      "Feather-light organic sponges layered with house-cooked fruit compotes, Belgian couverture ganache, and saffron-cardamom cream. Available in 500g, 1kg, and multi-tier celebrations.",
    heroImage: "/images/vanilla-berry-cake.jpg",
  },
  {
    id: "pastries",
    name: "Artisan Pastries & Tarts",
    tagline: "Daily counter slices, mille-feuilles & seasonal fruit tarts",
    description:
      "Individual indulgence portions crafted every morning for tea-time treats, spontaneous celebrations, and café cravings—rich in real butter and pure cocoa.",
    heroImage: "/images/pastries-collection.jpg",
  },
  {
    id: "tea-cakes",
    name: "Organic Tea Cakes & Muffins",
    tagline: "Wholesome wholegrain loaves, jaggery bakes & warm muffins",
    description:
      "Honest everyday loaves made with unbleached stone-ground wheat, organic jaggery or raw cane sugar, cold-pressed oils, roasted nuts, and cardamom.",
    heroImage: "/images/pistachio-tea-cake.jpg",
  },
  {
    id: "cookies-breads",
    name: "Cookies, Brownies & Croissants",
    tagline: "Crisp edges, fudgy centers & flaky laminated morning bakes",
    description:
      "Small-batch cookies, walnut dark-chocolate brownies, and 72-hour fermented butter croissants pulled warm from Manu's deck oven.",
    heroImage: "/images/butter-croissants.jpg",
  },
  {
    id: "hampers",
    name: "Gift Boxes & Festive Hampers",
    tagline: "Thoughtful eco-kraft hampers tied with ribbon for loved ones",
    description:
      "Curated tasting boxes mixing our bestselling cookies, brownies, tea loaves, and mini jars—perfect for housewarmings, festivals, and corporate gifting.",
    heroImage: "/images/cookies-muffins-tray.jpg",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // ==================== CELEBRATION CAKES ====================
  {
    id: "cake-belgian-truffle",
    slug: "belgian-dark-chocolate-truffle-cake",
    name: "Belgian Dark Chocolate Truffle Cake",
    hindiSubtitle: "54% कोको बेल्जियन ट्रफल केक",
    category: "cakes",
    shortDescription:
      "Deep, velvety 54% Belgian couverture ganache layered over moist organic cocoa sponge and toasted hazelnuts.",
    fullDescription:
      "Our undisputed crowd favourite crafted by Naveen (Manu). Three tender layers of rich cocoa sponge soaked lightly with espresso-vanilla syrup and finished in silky pure-chocolate truffle ganache—zero compound chocolate, zero artificial essence.",
    image: "/images/belgian-truffle-cake.jpg",
    imageAlt: "Whole Belgian dark chocolate truffle cake with chocolate curls and hazelnuts",
    variants: [
      { label: "500 g (Serves 5–6)", weightOrCount: "500g", priceInr: 580 },
      { label: "1 kg (Serves 10–12)", weightOrCount: "1kg", priceInr: 1080 },
      { label: "1.5 kg (Serves 16–18)", weightOrCount: "1.5kg", priceInr: 1580 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    isChefSpecial: true,
    isOrganicHighlight: true,
    prepNotice: "Ready same-day (4 hrs) or custom message pre-order",
    ingredients: [
      "54% Belgian Couverture Chocolate",
      "Organic Unbleached Flour",
      "Fresh Dairy Cream",
      "Roasted Hazelnuts",
      "Dutch-Processed Cocoa",
    ],
    tags: ["Bestseller", "100% Eggless", "Pure Couverture"],
    servingNote: "Best enjoyed at room temperature after 15 mins out of chill.",
  },
  {
    id: "cake-vanilla-berry-fig",
    slug: "madagascar-vanilla-berry-cream-cake",
    name: "Madagascar Vanilla Bean & Fresh Berry Cake",
    hindiSubtitle: "वनीला बीन और फ्रेश बेरी केक",
    category: "cakes",
    shortDescription:
      "Speckled real vanilla bean Swiss-style whipped cream over light sponge with fresh strawberry-fig compote.",
    fullDescription:
      "Hand-troweled by Manisha with delicate botanical swirls, this signature celebration cake pairs organic milk-soaked vanilla sponge with bright house-simmered berry compote, fresh figs, and crushed pistachios.",
    image: "/images/vanilla-berry-cake.jpg",
    imageAlt: "Vanilla bean buttercream layer cake topped with strawberries, raspberries, and fresh figs",
    variants: [
      { label: "500 g (Serves 5–6)", weightOrCount: "500g", priceInr: 540 },
      { label: "1 kg (Serves 10–12)", weightOrCount: "1kg", priceInr: 990 },
      { label: "1.5 kg (Serves 16–18)", weightOrCount: "1.5kg", priceInr: 1450 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    isOrganicHighlight: true,
    prepNotice: "Same-day fresh batch / 12 hrs for custom florals",
    ingredients: [
      "Real Madagascar Vanilla Pods",
      "Seasonal Strawberries & Figs",
      "Fresh Cultured Cream",
      "Organic Raw Cane Sugar",
    ],
    tags: ["Bestseller", "100% Eggless", "Fresh Fruit"],
    servingNote: "Keep refrigerated; bring out 10 mins before slicing.",
  },
  {
    id: "cake-pistachio-berry-rasmalai",
    slug: "royal-saffron-pistachio-berry-cake",
    name: "Royal Saffron, Pistachio & Berry Fusion Cake",
    hindiSubtitle: "केसर पिस्ता रॉयल मिल्क केक",
    category: "cakes",
    shortDescription:
      "Kashmiri kesar milk-soaked sponge layered with cardamom malai cream, roasted green pistachios, and fresh berries.",
    fullDescription:
      "A festive neighborhood sensation! Inspired by slow-simmered mithai flavors without excessive sweetness, finished with hand-crushed Iranian pistachios and organic berry jewels.",
    image: "/images/berry-pistachio-cake.jpg",
    imageAlt: "Artisan saffron pistachio cream cake garnished with fresh berries and crushed pistachios",
    variants: [
      { label: "500 g (Serves 5–6)", weightOrCount: "500g", priceInr: 620 },
      { label: "1 kg (Serves 10–12)", weightOrCount: "1kg", priceInr: 1150 },
      { label: "2 kg Celebration (Serves 22+)", weightOrCount: "2kg", priceInr: 2200 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    isChefSpecial: true,
    prepNotice: "12 hours advance notice recommended",
    ingredients: [
      "Kashmiri Saffron Threads",
      "Roasted Green Pistachios",
      "Green Cardamom",
      "Fresh Raspberries & Blueberries",
      "Cultured Cream",
    ],
    tags: ["Chef's Special", "100% Eggless", "Festive Hit"],
    servingNote: "Lightly chilled perfection; pairs wonderfully with masala chai.",
  },
  {
    id: "cake-botanical-two-tier",
    slug: "botanical-fig-rose-two-tier-cake",
    name: "Botanical Fig & Rose Two-Tier Celebration Cake",
    hindiSubtitle: "बोटैनिकल दो-मंज़िला सेलिब्रेशन केक",
    category: "cakes",
    shortDescription:
      "Manisha's signature textured ivory buttercream two-tier cake adorned with dried rose petals, figs & sage.",
    fullDescription:
      "Built for engagements, milestone birthdays, and intimate weddings. Choose two custom sponge pairings (such as Vanilla Berry + Belgian Truffle or Hazelnut Praline + Cardamom Rose) wrapped in silky low-sugar buttercream.",
    image: "/images/custom-cake-tier.jpg",
    imageAlt: "Two-tier ivory buttercream cake decorated with figs, dried roses, eucalyptus, and gold leaf",
    variants: [
      { label: "2 kg Two-Tier (Serves 20–24)", weightOrCount: "2kg", priceInr: 2350 },
      { label: "3 kg Two-Tier (Serves 32–36)", weightOrCount: "3kg", priceInr: 3400 },
      { label: "4 kg Grand Tier (Serves 45+)", weightOrCount: "4kg", priceInr: 4450 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isChefSpecial: true,
    isOrganicHighlight: true,
    prepNotice: "48 hours advance custom booking",
    ingredients: [
      "Cultured Pasture Butter",
      "Organic Rose Petals & Figs",
      "Edible Gold Leaf",
      "Madagascar Vanilla Bean",
    ],
    tags: ["Custom Tiered", "100% Eggless", "Wedding & Milestone"],
    servingNote: "Includes reinforced food-grade dowels & keepsake cake box.",
  },
  {
    id: "cake-classic-pineapple-orchard",
    slug: "caramelized-pineapple-orchard-cake",
    name: "Caramelized Pineapple & Vanilla Orchard Cake",
    hindiSubtitle: "फ्रेश पाइनएप्पल ऑर्चर्ड केक",
    category: "cakes",
    shortDescription:
      "Not your canned-syrup pineapple cake—slow-caramelized fresh pineapple chunks folded into cloud-soft cream.",
    fullDescription:
      "Honest, nostalgic, and surprisingly refined. Fresh seasonal pineapple simmered gently with raw cane sugar and vanilla bean, sandwiched between pillowy eggless vanilla layers at an everyday family price.",
    image: "/images/vanilla-berry-cake.jpg",
    imageAlt: "Fresh cream fruit layer cake with natural garnish",
    variants: [
      { label: "500 g (Serves 5–6)", weightOrCount: "500g", priceInr: 460 },
      { label: "1 kg (Serves 10–12)", weightOrCount: "1kg", priceInr: 860 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isOrganicHighlight: true,
    prepNotice: "Freshly frosted daily — 3 hrs notice",
    ingredients: [
      "Fresh Simmered Pineapple",
      "Organic Cane Sugar",
      "Unbleached Wheat Flour",
      "Fresh Dairy Whipped Cream",
    ],
    tags: ["Value Favourite", "100% Eggless"],
    servingNote: "Always keep refrigerated until celebration time.",
  },
  {
    id: "cake-opera-hazelnut",
    slug: "roasted-hazelnut-mocha-layer-cake",
    name: "Roasted Hazelnut & Espresso Opera Cake",
    hindiSubtitle: "हेज़लनट मोका लेयर केक",
    category: "cakes",
    shortDescription:
      "Almond-cocoa layers brushed with single-origin Chikmagalur espresso, praline crunch, and mirror chocolate glaze.",
    fullDescription:
      "Crafted for true chocolate and coffee lovers—balanced sweetness, crisp praline texture, and aromatic roasted coffee notes without heavy frosting.",
    image: "/images/chocolate-opera-slice.jpg",
    imageAlt: "Glossy chocolate espresso layered cake slice on cream ceramic plate",
    variants: [
      { label: "500 g (Serves 5–6)", weightOrCount: "500g", priceInr: 640 },
      { label: "1 kg (Serves 10–12)", weightOrCount: "1kg", priceInr: 1190 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isChefSpecial: true,
    prepNotice: "24 hours advance pre-order (100% Pure Veg)",
    ingredients: [
      "Single-Origin Espresso",
      "House Hazelnut Praline",
      "54% Dark Chocolate Glaze",
      "Almond Meal",
    ],
    tags: ["100% Pure Veg", "100% Eggless", "Coffee Lover"],
    servingNote: "Let stand 12 minutes before cutting cleanly with a warm knife.",
  },

  // ==================== PASTRIES & TARTS ====================
  {
    id: "pastry-belgian-truffle",
    slug: "belgian-truffle-ganache-pastry",
    name: "Belgian Truffle Ganache Pastry",
    hindiSubtitle: "बेल्जियन चॉकलेट पेस्ट्री",
    category: "pastries",
    shortDescription:
      "Four velvety layers of dark cocoa sponge and whipped ganache crowned with a hand-rolled cocoa truffle.",
    fullDescription:
      "Our #1 bakery counter slice. Deep chocolate flavor without cloying sugar, topped with a handmade dark truffle dusted in organic cocoa.",
    image: "/images/pastry-chocolate.jpg",
    imageAlt: "Dark Belgian chocolate truffle pastry slice topped with a handmade truffle",
    variants: [
      { label: "Single Slice (140g)", weightOrCount: "1 Slice", priceInr: 115 },
      { label: "Box of 4 Pastries", weightOrCount: "4 Slices", priceInr: 430 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    prepNotice: "Fresh on daily counter",
    ingredients: ["54% Belgian Chocolate", "Fresh Cream", "Organic Cocoa", "Unbleached Flour"],
    tags: ["Bestseller", "100% Eggless"],
    servingNote: "Serve slightly chilled or warm for 8 seconds for molten texture.",
  },
  {
    id: "pastry-pistachio-millefeuille",
    slug: "pistachio-rose-mille-feuille",
    name: "Pistachio Cardamom Rose Mille-Feuille",
    hindiSubtitle: "पिस्ता गुलाब क्रिस्प पेस्ट्री",
    category: "pastries",
    shortDescription:
      "Crisp all-butter puff pastry layered with pistachio pastry cream, crushed green pistachios & organic rose petals.",
    fullDescription:
      "A delicate marriage of French laminated puff pastry and Indian botanical aromatics—green cardamom, roasted pistachio diplomat cream, and edible Damascus rose petals.",
    image: "/images/pastry-pistachio.jpg",
    imageAlt: "Layered puff pastry filled with pistachio cream and topped with dried rose petals",
    variants: [
      { label: "Single Pastry", weightOrCount: "1 Piece", priceInr: 135 },
      { label: "Box of 4 Pastries", weightOrCount: "4 Pieces", priceInr: 510 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isChefSpecial: true,
    isOrganicHighlight: true,
    prepNotice: "Fresh morning batch (limited daily quantity)",
    ingredients: [
      "Cultured Butter Puff Pastry",
      "Roasted Pistachio Cream",
      "Edible Rose Petals",
      "Cardamom",
    ],
    tags: ["Chef's Special", "100% Eggless"],
    servingNote: "Enjoy the same day for peak crisp flaky layers.",
  },
  {
    id: "pastry-passionfruit-berry-tart",
    slug: "mango-passionfruit-berry-tartlet",
    name: "Tropical Passionfruit & Fresh Berry Tart",
    hindiSubtitle: "मैंगो-पैशनफ्रूट बेरी टार्ट",
    category: "pastries",
    shortDescription:
      "Shortcrust almond-butter shell filled with velvety passionfruit mango curd, fresh raspberries, and blueberries.",
    fullDescription:
      "Bright, tangy, and refreshing. Baked crisp in golden wholewheat-almond pastry shells and glazed naturally with passionfruit seeds and seasonal berries.",
    image: "/images/pastry-fruit-tart.jpg",
    imageAlt: "Golden tartlet filled with glossy passionfruit curd and topped with fresh berries and mint",
    variants: [
      { label: "Individual Tartlet", weightOrCount: "1 Tart", priceInr: 120 },
      { label: "Box of 4 Tartlets", weightOrCount: "4 Tarts", priceInr: 450 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isOrganicHighlight: true,
    prepNotice: "Fresh daily after 11:00 AM",
    ingredients: [
      "Passionfruit & Alphonso Curd",
      "Almond Shortcrust Shell",
      "Fresh Berries & Mint",
      "Pure Butter",
    ],
    tags: ["100% Eggless", "Seasonal Fruit"],
    servingNote: "Keep chilled; crisp crust stays tender for 24 hours.",
  },
  {
    id: "pastry-espresso-caramel",
    slug: "espresso-salted-caramel-napoleon",
    name: "Espresso & Salted Caramel Napoleon",
    hindiSubtitle: "एस्प्रेसो कैरामल नेपोलियन",
    category: "pastries",
    shortDescription:
      "Three caramelized puff pastry sheets piped with espresso mascarpone whip and drizzled with house caramel.",
    fullDescription:
      "Lighter than frosting, richer than a biscuit—airy coffee-kissed cream nestled between honey-baked caramelized pastry layers.",
    image: "/images/pastry-tiramisu.jpg",
    imageAlt: "Three-layer caramelized puff pastry napoleon with coffee cream and caramel drizzle",
    variants: [
      { label: "Single Napoleon", weightOrCount: "1 Piece", priceInr: 125 },
      { label: "Box of 4 Pieces", weightOrCount: "4 Pieces", priceInr: 470 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    prepNotice: "Freshly assembled twice daily",
    ingredients: [
      "Caramelized Butter Pastry",
      "Espresso Whipped Mascarpone",
      "Sea-Salt Caramel",
      "Cocoa Dust",
    ],
    tags: ["100% Eggless", "Café Favourite"],
    servingNote: "Best served chilled alongside black coffee or iced latte.",
  },
  {
    id: "pastry-chocolate-opera-slice",
    slug: "classic-dutch-chocolate-pastry-slice",
    name: "Classic Dutch Cocoa Layer Pastry",
    hindiSubtitle: "क्लासिक डच चॉकलेट स्लाइस",
    category: "pastries",
    shortDescription:
      "Everyday neighbourhood chocolate slice—light mocha cocoa sponge layered with silky chocolate cream.",
    fullDescription:
      "Created so every student, kid, and chocolate fan can treat themselves daily without breaking the bank—honest cocoa, soft crumb, and real dairy cream.",
    image: "/images/chocolate-opera-slice.jpg",
    imageAlt: "Classic glossy chocolate layered pastry slice",
    variants: [
      { label: "Single Slice", weightOrCount: "1 Slice", priceInr: 85 },
      { label: "Box of 4 Slices", weightOrCount: "4 Slices", priceInr: 320 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    prepNotice: "Available all day",
    ingredients: ["Dutch Cocoa", "Organic Flour", "Fresh Cream", "Raw Cane Sugar"],
    tags: ["Pocket Friendly", "100% Eggless"],
    servingNote: "Great after-school or post-dinner sweet fix.",
  },

  // ==================== TEA CAKES & MUFFINS ====================
  {
    id: "tea-pistachio-rose-almond",
    slug: "organic-pistachio-rose-tea-cake",
    name: "Organic Pistachio, Rose & Almond Tea Cake",
    hindiSubtitle: "पिस्ता बादाम ऑर्गेनिक टी केक",
    category: "tea-cakes",
    shortDescription:
      "Stone-milled wholewheat and almond tea loaf infused with cardamom, topped with crunchy green pistachios & rose.",
    fullDescription:
      "Zero refined maida, zero frosting—just fragrant, moist crumb enriched with cultured yogurt, almond meal, and organic rose-pistachio crust. Ideal for mindful morning tea.",
    image: "/images/pistachio-tea-cake.jpg",
    imageAlt: "Round golden pistachio and dried rose petal organic tea cake on ceramic plate",
    variants: [
      { label: "350 g Tea Loaf / Round", weightOrCount: "350g", priceInr: 290 },
      { label: "600 g Family Size", weightOrCount: "600g", priceInr: 490 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    isOrganicHighlight: true,
    prepNotice: "Baked fresh every morning (8:30 AM)",
    ingredients: [
      "Stone-Ground Whole Wheat",
      "California Almond Meal",
      "Crushed Green Pistachios",
      "Cardamom & Rose Petals",
    ],
    tags: ["100% Whole Wheat", "100% Eggless", "Low Sugar"],
    servingNote: "Stays fresh 4 days airtight at room temperature.",
  },
  {
    id: "tea-vanilla-jaggery-muffins",
    slug: "organic-jaggery-vanilla-crumb-muffins",
    name: "Organic Jaggery & Vanilla Crumb Muffins",
    hindiSubtitle: "गुड़ और वनीला होमस्टाइल मफ़िन्स",
    category: "tea-cakes",
    shortDescription:
      "Warm domed golden muffins sweetened gently with organic sugarcane jaggery and pure vanilla extract.",
    fullDescription:
      "Wholesome enough for kids' tiffin boxes and tender enough for evening chai. Baked without artificial rising agents or refined white sugar.",
    image: "/images/cookies-muffins-tray.jpg",
    imageAlt: "Golden baked vanilla jaggery muffins and cookies on a wooden bakery tray",
    variants: [
      { label: "Pack of 4 Muffins", weightOrCount: "4 Pcs", priceInr: 180 },
      { label: "Pack of 6 Muffins", weightOrCount: "6 Pcs", priceInr: 260 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isOrganicHighlight: true,
    prepNotice: "Warm batches daily at 10 AM & 4 PM",
    ingredients: ["Organic Jaggery", "Unbleached Flour", "Cold-Pressed Oil", "Pure Vanilla"],
    tags: ["Kids Favourite", "Jaggery Sweetened", "100% Eggless"],
    servingNote: "Warm 10 seconds before serving with butter or honey.",
  },
  {
    id: "tea-banana-walnut-jaggery",
    slug: "wholewheat-banana-walnut-jaggery-loaf",
    name: "Wholewheat Banana Walnut & Cinnamon Loaf",
    hindiSubtitle: "बनाना वॉलनट गुड़ टी लोफ़",
    category: "tea-cakes",
    shortDescription:
      "Ripe mashed hill bananas, crunchy Kashmiri walnuts, organic wholewheat, and warm Ceylon cinnamon.",
    fullDescription:
      "A comforting, naturally sweet tea cake that proves healthy baking never has to taste dry. Packed generously with roasted walnuts in every slice.",
    image: "/images/pistachio-tea-cake.jpg",
    imageAlt: "Artisanal nut-topped wholewheat organic loaf cake",
    variants: [
      { label: "350 g Loaf (8 slices)", weightOrCount: "350g", priceInr: 260 },
      { label: "600 g Loaf (14 slices)", weightOrCount: "600g", priceInr: 440 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isOrganicHighlight: true,
    prepNotice: "Daily fresh loaf batch",
    ingredients: [
      "Ripe Bananas",
      "Kashmiri Walnuts",
      "100% Whole Wheat",
      "Organic Jaggery & Cinnamon",
    ],
    tags: ["100% Whole Wheat", "No Refined Sugar", "100% Eggless"],
    servingNote: "Toast lightly in a pan with a dab of salted butter.",
  },

  // ==================== COOKIES, BROWNIES & CROISSANTS ====================
  {
    id: "treat-butter-croissants",
    slug: "french-cultured-butter-croissants",
    name: "72-Hour Cultured Butter Croissants",
    hindiSubtitle: "फ्रेंच बटर क्रोइसैन",
    category: "cookies-breads",
    shortDescription:
      "Shatteringly crisp golden honeycombed layers laminated over three days with pure cultured butter.",
    fullDescription:
      "Manu's pride from the deck oven! Fermented slowly for complex flavor and rolled with zero margarine or shortening—only pure butter and organic flour.",
    image: "/images/butter-croissants.jpg",
    imageAlt: "Stack of flaky golden cultured butter croissants on pale ceramic plate",
    variants: [
      { label: "Single Croissant", weightOrCount: "1 Pc", priceInr: 95 },
      { label: "Pair (2 Croissants)", weightOrCount: "2 Pcs", priceInr: 180 },
      { label: "Box of 4 Morning Croissants", weightOrCount: "4 Pcs", priceInr: 340 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    prepNotice: "Fresh out of oven at 8:30 AM daily",
    ingredients: ["Pure Cultured Butter", "Organic Bread Flour", "Wild Levain", "Sea Salt"],
    tags: ["100% Butter", "100% Eggless", "Morning Fresh"],
    servingNote: "Crisp up in an oven/air-fryer at 160°C for 3 minutes.",
  },
  {
    id: "treat-chocochip-walnut-cookies",
    slug: "dark-chocolate-chunk-oat-cookies",
    name: "Dark Chocolate Chunk & Roasted Oat Cookies",
    hindiSubtitle: "डार्क चॉकलेट ओट कुकीज़",
    category: "cookies-breads",
    shortDescription:
      "Crisp golden edges, soft chewy centers studded with real 54% dark chocolate chunks and toasted oats.",
    fullDescription:
      "Hand-scooped and baked on parchment with brown butter, rolled oats, and generous chunks of Belgian chocolate. No palm oil, ever.",
    image: "/images/cookies-muffins-tray.jpg",
    imageAlt: "Freshly baked dark chocolate chunk cookies and golden muffins on wooden tray",
    variants: [
      { label: "Box of 4 Jumbo Cookies", weightOrCount: "240g", priceInr: 220 },
      { label: "Tin of 8 Cookies", weightOrCount: "480g", priceInr: 410 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    isOrganicHighlight: true,
    prepNotice: "Fresh batches all day",
    ingredients: ["Brown Cultured Butter", "54% Chocolate Chunks", "Rolled Oats", "Muscovado Sugar"],
    tags: ["No Palm Oil", "100% Eggless", "Bestseller"],
    servingNote: "Store airtight for up to 10 days; microwave 6s for gooey centers.",
  },
  {
    id: "treat-fudgy-walnut-brownie",
    slug: "belgian-fudgy-walnut-brownies",
    name: "Belgian Couverture Fudgy Walnut Brownies",
    hindiSubtitle: "बेल्जियन फ़जी वॉलनट ब्राउनी",
    category: "cookies-breads",
    shortDescription:
      "Crinkly paper-thin tops giving way to dense, intensely chocolatey fudge centers and roasted walnuts.",
    fullDescription:
      "Melted real dark chocolate and cultured butter make these brownies unbelievably rich yet neatly portioned at honest prices.",
    image: "/images/pastry-chocolate.jpg",
    imageAlt: "Rich dark chocolate fudge squares dusted with cocoa",
    variants: [
      { label: "Box of 2 Squares", weightOrCount: "2 Pcs", priceInr: 170 },
      { label: "Box of 4 Squares", weightOrCount: "4 Pcs", priceInr: 320 },
      { label: "Celebration Slab (8 Pcs)", weightOrCount: "8 Pcs", priceInr: 620 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    prepNotice: "Fresh daily counter batch",
    ingredients: ["54% Belgian Chocolate", "Cultured Butter", "Kashmiri Walnuts", "Dutch Cocoa"],
    tags: ["Bestseller", "100% Eggless"],
    servingNote: "Serve warm with a scoop of vanilla ice cream.",
  },
  {
    id: "treat-pain-au-chocolat",
    slug: "pain-au-chocolat-croissant",
    name: "Double-Batons Pain au Chocolat",
    hindiSubtitle: "चॉकलेट क्रोइसैन",
    category: "cookies-breads",
    shortDescription:
      "Flaky laminated butter pastry wrapped around two rich dark chocolate batons baked to a deep amber sheen.",
    fullDescription:
      "Everything we love about our butter croissants paired with melted dark couverture batons inside.",
    image: "/images/butter-croissants.jpg",
    imageAlt: "Freshly laminated flaky golden butter pastry rolls",
    variants: [
      { label: "Single Piece", weightOrCount: "1 Pc", priceInr: 115 },
      { label: "Box of 4 Pieces", weightOrCount: "4 Pcs", priceInr: 430 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    prepNotice: "Baked fresh every morning",
    ingredients: ["Pure Cultured Butter", "54% Chocolate Batons", "Organic Flour"],
    tags: ["Morning Bake", "100% Eggless"],
    servingNote: "Warm gently for 2 minutes before biting in.",
  },

  // ==================== GIFT HAMPERS ====================
  {
    id: "hamper-mrida-tasting-box",
    slug: "mrida-signature-tasting-hamper",
    name: "Mrida Bakess Signature Artisan Tasting Box",
    hindiSubtitle: "मृदा सिग्नेचर गिफ्ट बॉक्स",
    category: "hampers",
    shortDescription:
      "A curated sampler of 2 Belgian Brownies, 2 Dark Chocochip Cookies, 1 Pistachio Tea Cake Slice & 2 Muffins.",
    fullDescription:
      "Designed for first-time guests, thank-you gifts, and cozy weekend evenings. Packed in eco-friendly kraft board tied with botanical twine and a handwritten note card.",
    image: "/images/cookies-muffins-tray.jpg",
    imageAlt: "Curated artisan bakery gift assortment of cookies, muffins, and brownies",
    variants: [
      { label: "Classic Tasting Box (7 Treats)", weightOrCount: "550g", priceInr: 560 },
      { label: "Grand Family Box (14 Treats)", weightOrCount: "1.1kg", priceInr: 1050 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isBestseller: true,
    isOrganicHighlight: true,
    prepNotice: "Packed fresh with 4 hrs notice",
    ingredients: [
      "Belgian Brownies",
      "Oat Chocolate Cookies",
      "Pistachio Rose Tea Cake",
      "Jaggery Muffins",
    ],
    tags: ["Gift Ready", "100% Eggless", "Best Value"],
    servingNote: "Includes ribbon wrap and personalized gift card.",
  },
  {
    id: "hamper-patisserie-pastry-flight",
    slug: "assorted-patisserie-pastry-flight",
    name: "Chef's Assorted Pastry Flight (Box of 4)",
    hindiSubtitle: "असॉर्टेड पेस्ट्री बॉक्स",
    category: "hampers",
    shortDescription:
      "One of each counter favourite: Belgian Truffle, Pistachio Rose Mille-Feuille, Berry Tart & Caramel Napoleon.",
    fullDescription:
      "Can't pick just one? Enjoy Manisha & Manu's four most-requested gourmet pastries side by side at special bundle pricing.",
    image: "/images/pastries-collection.jpg",
    imageAlt: "Four assorted artisan pastries on stoneware plates—chocolate, pistachio, berry tart, and caramel napoleon",
    variants: [
      { label: "Flight of 4 Signature Pastries", weightOrCount: "4 Pcs", priceInr: 450 },
      { label: "Party Flight of 8 Pastries", weightOrCount: "8 Pcs", priceInr: 860 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isChefSpecial: true,
    prepNotice: "Packed fresh daily until stock lasts",
    ingredients: [
      "Belgian Chocolate Truffle",
      "Pistachio Rose Cream",
      "Passionfruit Berry Tart",
      "Espresso Napoleon",
    ],
    tags: ["Save ₹45", "100% Eggless", "Dinner Host Gift"],
    servingNote: "Keep refrigerated until ready to plate and share.",
  },
  {
    id: "hamper-festive-royal-trunk",
    slug: "festive-organic-bake-hamper",
    name: "Festive Organic Mithai-Bakery Trunk",
    hindiSubtitle: "त्यौहार स्पेशल ऑर्गेनिक हैम्पर",
    category: "hampers",
    shortDescription:
      "Pistachio Rose Organic Tea Cake (350g), 4 Jaggery Muffins, 4 Oat Chocolate Cookies & 2 Fudgy Brownies.",
    fullDescription:
      "Thoughtful festive and Diwali/celebration gifting crafted with whole grains, saffron, jaggery, and pure cocoa—zero preservatives, zero refined shortcuts.",
    image: "/images/hero-spread.jpg",
    imageAlt: "Sunlit artisan bakery spread with cakes, croissants, pistachio tea cake, and pastries",
    variants: [
      { label: "Festive Keepsake Trunk", weightOrCount: "1.2kg", priceInr: 890 },
      { label: "Corporate Bulk (10+ Boxes each)", weightOrCount: "Per Box", priceInr: 790 },
    ],
    egglessAvailable: true,
    isPureEggless: true,
    isOrganicHighlight: true,
    prepNotice: "24 hrs notice (3 days for bulk gifting)",
    ingredients: [
      "Wholewheat Pistachio Rose Loaf",
      "Organic Jaggery Muffins",
      "Chocolate Oat Cookies",
      "Belgian Brownies",
    ],
    tags: ["Corporate & Festive", "100% Eggless", "Organic"],
    servingNote: "Custom ribbon color & brand message cards available for bulk orders.",
  },
];

export function getMenuItemBySlug(slug: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.slug === slug);
}

export function getMenuItemsByCategory(category: MenuCategoryId): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === category);
}

export function getFeaturedMenuItems(): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.isBestseller).slice(0, 6);
}
