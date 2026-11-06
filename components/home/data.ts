// Homepage facts. Every figure here comes from the LIMOVI client agreements
// published under /legal (Master Customer & Platform Agreement, the four
// strategy agreements, Digital Gold terms and Gold Liquidity terms).
// Do not add a figure that isn't in one of those documents.
export const EXPERIENCE_CHARGE = 0.009; // 0.9% of selected Jewellery value (Investment Only, Enrol & Experience)
export const OWNER_SHARE = 0.25; // Owner Benefit: 25% of qualifying Experience Charges

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
    name: "Jewellery Cloud",
    short: "Experience jewellery from the Jewellery Cloud, delivered to you and returned within 30 hours.",
    tone: "gold",
  },
  {
    id: "loans",
    name: "Gold Loan",
    short: "Apply for a gold loan through a lending partner. LIMOVI facilitates; the lender decides.",
    tone: "blue",
  },
  {
    id: "liquidity",
    name: "Gold Liquidity",
    short: "Sell eligible gold or jewellery and receive the proceeds in your verified bank account.",
    tone: "blue",
  },
  {
    id: "wealth",
    name: "Owner Benefit",
    short: "Earn 25% of qualifying Experience Charges when others experience your jewellery.",
    tone: "gold",
  },
  {
    id: "gift",
    name: "Gift Gold",
    short: "Gift an eligible Gold Balance to someone, once they complete KYC and accept.",
    tone: "blue",
  },
] as const;

export type GatewayId = (typeof gateways)[number]["id"];

export const strategies = [
  {
    name: "Investment Only",
    slug: "investment-only-strategy",
    tagline: "Build a Gold Balance and use it across LIMOVI's services.",
    min: "50g of 24K equivalent for services",
    points: [
      "Create a Gold Balance with money, Digital Gold, gold, coins, bars or jewellery",
      "Jewellery Experience at 0.9% of the selected jewellery's value",
      "Gold loan through a lending partner, Gold Liquidity and gifting",
      "No Owner Benefit just for holding a Gold Balance",
      "Exit with at least 15 days' notice",
    ],
  },
  {
    name: "Investment & Experience",
    slug: "investment-and-experience-strategy",
    tagline: "Invest once and own 22K jewellery you choose, with Experiences included.",
    min: "Investment equivalent to 50g of 24K gold",
    featured: true,
    points: [
      "80% of your investment goes to the jewellery you select",
      "Strategy Charge of 20% or 15% of the investment, by jewellery category",
      "2 free Experiences a year, then 0.5% of the jewellery's value",
      "25% Owner Benefit when others experience your jewellery",
      "Minimum strategy period of 2 years, exit with 15 days' notice",
    ],
  },
  {
    name: "Enrol & Experience",
    slug: "enrol-and-experience-strategy",
    tagline: "Enrol jewellery you already own and keep ownership.",
    min: "Jewellery worth 50g of 24K gold",
    points: [
      "Ownership of your jewellery stays with you",
      "Listed in the Jewellery Cloud for other customers to experience",
      "25% Owner Benefit on qualifying Experience Charges",
      "Experience jewellery against the Gold Balance your enrolment generates",
      "Withdraw your jewellery with 15 days' notice",
    ],
  },
  {
    name: "Experience Only",
    slug: "experience-only-strategy",
    tagline: "Experience jewellery without owning it, against Security.",
    min: "Security based on the jewellery's displayed value",
    points: [
      "Provide Security in money, physical gold or Digital Gold",
      "Pay the Experience Charges before you take the jewellery",
      "Return it by the date and time agreed for your booking",
      "Security returned or settled on the agreed basis",
      "No interest or return is paid on Security",
    ],
  },
];

export const comparisonRows: { label: string; values: (string | boolean)[] }[] = [
  {
    label: "Minimum",
    values: ["50g of 24K equivalent for services", "Investment equal to 50g of 24K", "Jewellery worth 50g of 24K", "Security based on displayed value"],
  },
  { label: "Jewellery you own", values: [false, "22K jewellery you select", "Your enrolled jewellery", false] },
  { label: "Jewellery Experience", values: [true, true, true, true] },
  {
    label: "Experience Charge",
    values: ["0.9% of jewellery value", "2 free a year, then 0.5%", "0.9% of jewellery value", "Shown before you confirm"],
  },
  { label: "Owner Benefit", values: [false, "25% of Experience Charges", "25% of Experience Charges", false] },
  { label: "Gold loan via lending partner", values: [true, true, true, false] },
  { label: "Gold Liquidity", values: [true, true, true, false] },
  { label: "Gift Gold Balance", values: [true, true, false, false] },
  { label: "Exit", values: ["15 days' notice", "After 2 years, 15 days' notice", "Withdraw with 15 days' notice", "Return the jewellery"] },
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
