// All homepage figures come from the LIMOVI Web App Product Documentation (v1.0, Aug 2026).
// The gold rate is the document's illustrative rate, not a live quote.
export const ILLUSTRATIVE_RATE = 14400; // ₹ per gram, 24K (MCX, illustrative)
export const MAX_LTV = 0.75;
export const EXPERIENCE_CHARGE = 0.009; // 0.9% of asset value per experience
export const OWNER_SHARE = 0.25; // 25% of the experience charge

export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");
export const grams = (n: number) => `${n.toFixed(2)}g`;

export const openEarlyAccess = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-early-access-modal"));
  }
};

export const gateways = [
  {
    id: "jewellery",
    name: "Luxury Jewellery Cloud",
    short: "Wear premium jewellery without buying every piece.",
    tone: "gold",
  },
  {
    id: "loans",
    name: "Instant Loans",
    short: "Borrow up to 75% of your gold value, fully digital.",
    tone: "blue",
  },
  {
    id: "liquidity",
    name: "Instant Liquidity",
    short: "Turn gold into cash at the live MCX rate, in minutes.",
    tone: "blue",
  },
  {
    id: "wealth",
    name: "Wealth Generation",
    short: "Earn a dividend every time your jewellery is experienced.",
    tone: "gold",
  },
  {
    id: "gift",
    name: "Gift Gold",
    short: "Gift gold that keeps working for the people you love.",
    tone: "blue",
  },
] as const;

export type GatewayId = (typeof gateways)[number]["id"];

export const strategies = [
  {
    name: "Investment Only",
    tagline: "Build long-term gold wealth, decide on jewellery later.",
    min: "50g of 24K gold",
    score: 4,
    points: [
      "Held as pure Gold Balance that moves with the market",
      "Jewellery Cloud access based on your balance",
      "Loans, liquidity and gifting available",
      "Exit as 24K gold or cash at prevailing rates",
    ],
  },
  {
    name: "Investment & Experience",
    tagline: "Invest once, own a piece you choose, pay zero making charges.",
    min: "50g of 24K gold",
    score: 5,
    best: true,
    points: [
      "80% becomes a jewellery piece of your choice",
      "20% is a one-time lifetime membership",
      "Lifetime Jewellery Cloud access and dividends",
      "Exit with your piece (14% making charge on exit) or as 24K gold",
    ],
  },
  {
    name: "Enroll & Experience",
    tagline: "Already own jewellery? Put it to work and keep ownership.",
    min: "Ornament worth 50g of 24K",
    score: 5,
    points: [
      "Your ornament stays 100% yours",
      "Earn 25% of the experience charge each time it's worn",
      "Lifetime cloud access, zero making charges on experiences",
      "Reclaim your ornament and exit any time",
    ],
  },
  {
    name: "Experience Only",
    tagline: "Premium jewellery access, without owning a piece.",
    min: "Gold Balance worth 50g of 24K",
    score: 3,
    points: [
      "Full catalogue access based on your balance",
      "Loans, liquidity and gifting available",
      "No dividends under this strategy",
      "Redeem as 24K gold or cash at onboarding rates",
    ],
  },
];

export const comparisonRows: { label: string; values: (string | boolean)[] }[] = [
  { label: "Minimum gold", values: ["50g", "50g", "Equiv. 50g", "Equiv. 50g"] },
  { label: "Physical jewellery ownership", values: ["Optional", "Chosen piece", "Enrolled piece", false] },
  { label: "Luxury Jewellery Cloud", values: [true, true, true, true] },
  { label: "Instant Loans", values: [true, true, true, true] },
  { label: "Instant Liquidity", values: [true, true, true, true] },
  { label: "Wealth Generation / Dividend", values: ["If enrolled", true, true, false] },
  { label: "Gift Gold", values: [true, true, true, true] },
  { label: "Zero making charges", values: [false, true, true, false] },
  { label: "Benefit score", values: ["4/5", "5/5", "5/5", "3/5"] },
];

export const luxuryPieces = [
  { name: "Royal Long Haram", src: "/images/long_haram.png" },
  { name: "Heritage Necklace", src: "/images/necklace.png" },
  { name: "Temple Jhumkas", src: "/images/ear_piercing.png" },
  { name: "Bridal Nose Ring", src: "/images/nose_piercing.png" },
  { name: "Bridal Wedding Set", src: "/images/jewellery-wedding.png" },
  { name: "Temple Set", src: "/images/jewellery-temple.png" },
  { name: "Heritage Bangles", src: "/images/bangles.png" },
];

export const lifestylePieces = [
  { name: "Pendant & Chain", src: "/images/minimal_pendant.png" },
  { name: "Classic Bracelet", src: "/images/minimal_bracelet.png" },
  { name: "Solitaire Studs", src: "/images/minimal_studs.png" },
  { name: "Subtle Nose Pin", src: "/images/minimal_nose_stud_v4.png" },
  { name: "Elegant Gold Ring", src: "/images/minimal_ring.png" },
  { name: "Diamond Solitaire", src: "/images/jewellery-diamond.png" },
];
