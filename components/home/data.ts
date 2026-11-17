// Homepage facts. Every figure here comes from the LIMOVI client agreements
// published under /legal (Master Customer & Platform Agreement, the four
// strategy agreements, Digital Gold terms and Gold Liquidity terms).
// Do not add a figure that isn't in one of those documents.
export const EXPERIENCE_CHARGE = 0.009; // 0.9% of selected Jewellery value (Investment Only, Enrol & Experience)
export const OWNER_SHARE = 0.25; // Generate Wealth: 25% of qualifying Experience Charges

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
    name: "Generate Wealth",
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
      "No Generate Wealth earnings just for holding a Gold Balance",
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
      "Generate Wealth: 25% when others experience your jewellery",
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
      "Generate Wealth: 25% of qualifying Experience Charges",
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

// One colour per strategy, used wherever the four strategies appear.
export const strategyTheme: Record<string, { dot: string; band: string; soft: string; text: string; ring: string; hex: string }> = {
  "Investment Only": { dot: "bg-[#1E6FE8]", band: "bg-[#1E6FE8]", soft: "bg-[#E6F0FF]", text: "text-[#1E6FE8]", ring: "border-[#1E6FE8]", hex: "#1E6FE8" },
  "Investment & Experience": { dot: "bg-[#E0A21B]", band: "bg-[#F2B92B]", soft: "bg-[#FFF3D1]", text: "text-[#B97D06]", ring: "border-[#F2B92B]", hex: "#F2B92B" },
  "Enrol & Experience": { dot: "bg-[#10A37F]", band: "bg-[#10A37F]", soft: "bg-[#DDF6EE]", text: "text-[#0B7E62]", ring: "border-[#10A37F]", hex: "#10A37F" },
  "Experience Only": { dot: "bg-[#8B5CF6]", band: "bg-[#8B5CF6]", soft: "bg-[#EFE8FF]", text: "text-[#6D3FE0]", ring: "border-[#8B5CF6]", hex: "#8B5CF6" },
};

export const comparisonRows: { label: string; values: (string | boolean)[] }[] = [
  {
    label: "Minimum",
    values: ["50g of 24K equivalent for services", "Investment equal to 50g of 24K", "Jewellery worth 50g of 24K", "Security based on displayed value"],
  },
  { label: "Jewellery you own", values: [false, "22K jewellery you select", "Your enrolled jewellery", false] },
  { label: "Jewellery Experience", values: [true, true, true, true] },
  {
    label: "Experience Charge",
    values: ["0.9% of jewellery value", "2 free a year, then 0.5% of jewellery value", "0.9% of jewellery value", "0.9% of jewellery value"],
  },
  { label: "Generate Wealth", values: [false, "25% of Experience Charges", "25% of Experience Charges", false] },
  { label: "Gold loan via lending partner", values: [true, true, true, false] },
  { label: "Gold Liquidity", values: [true, true, true, false] },
  { label: "Gift Gold Balance", values: [true, true, false, false] },
  { label: "Exit policy", values: ["24K gold", "Jewellery or 24K gold", "Your jewellery", "Return the jewellery"] },
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

// Picture-led walkthrough shown when a strategy card is opened. Every step is
// taken from that strategy's agreement and Schedule 1 (see /legal).
export type JourneyStep = { img: string; photo?: boolean; title: string; text: string };
export const strategyJourneys: Record<string, { steps: JourneyStep[]; plan: [string, string][] }> = {
  "Investment Only": {
    steps: [
      { img: "/images/journey/digital_gold_icon.webp", title: "Add your gold", text: "Build a Gold Balance with money, Digital Gold, gold, coins, bars or jewellery." },
      { img: "/images/journey/icon_gold_balance.webp", title: "Reach 50g", text: "Once it reaches 50g of 24K equivalent, LIMOVI's services open up to you." },
      { img: "/images/journey/jewellery-minimal.webp", photo: true, title: "Experience jewellery", text: "Wear pieces from the Jewellery Cloud at 0.9% of the jewellery's value." },
      { img: "/images/journey/icon_invest.webp", title: "Loan, cash or gift", text: "Apply for a gold loan through a lending partner, sell through Gold Liquidity, or gift gold." },
    ],
    plan: [
      ["You start with", "A Gold Balance of 50g of 24K equivalent"],
      ["You earn", "No Generate Wealth just for holding a Gold Balance"],
      ["When you leave", "Exit with at least 15 days' notice, as 24K gold"],
    ],
  },
  "Investment & Experience": {
    steps: [
      { img: "/images/journey/icon_invest.webp", title: "Invest", text: "Invest an amount equivalent to 50g of 24K gold." },
      { img: "/images/journey/jewellery-wedding.webp", photo: true, title: "Own 22K jewellery", text: "80% goes to the 22K jewellery you choose. A Strategy Charge of 20% or 15% applies by category." },
      { img: "/images/journey/jewellery-temple.webp", photo: true, title: "Enjoy Experiences", text: "2 free Experiences a year, then 0.5% of the jewellery's value." },
      { img: "/images/journey/icon_wealth.webp", title: "Generate Wealth", text: "Earn 25% of the Experience Charges when others experience your jewellery." },
    ],
    plan: [
      ["You start with", "An investment equivalent to 50g of 24K gold"],
      ["You earn", "25% when others experience your jewellery"],
      ["When you leave", "After the 2-year minimum, with 15 days' notice, as jewellery or 24K gold"],
    ],
  },
  "Enrol & Experience": {
    steps: [
      { img: "/images/journey/bangles.webp", photo: true, title: "Enrol your jewellery", text: "Enrol jewellery you already own, worth 50g of 24K gold." },
      { img: "/images/journey/icon_vault.webp", title: "It stays yours", text: "LIMOVI or its Custodian holds it safely. Ownership stays with you." },
      { img: "/images/journey/jewellery-royal.webp", photo: true, title: "Listed in the Cloud", text: "Your piece is listed in the Jewellery Cloud for other customers to experience." },
      { img: "/images/journey/icon_wealth.webp", title: "Generate Wealth", text: "Earn 25% of qualifying Experience Charges, and experience other pieces against your Gold Balance." },
    ],
    plan: [
      ["You start with", "Jewellery worth 50g of 24K gold"],
      ["You earn", "25% of qualifying Experience Charges"],
      ["When you leave", "Withdraw your jewellery with 15 days' notice"],
    ],
  },
  "Experience Only": {
    steps: [
      { img: "/images/journey/necklace.webp", photo: true, title: "Pick and book", text: "Choose a piece from the Jewellery Cloud and book your dates." },
      { img: "/images/journey/icon_vault.webp", title: "Provide Security", text: "Based on the jewellery's displayed value, in money, physical gold or Digital Gold." },
      { img: "/images/journey/ear_piercing.webp", photo: true, title: "Pay and wear", text: "Pay the Experience Charges before you take the jewellery, then enjoy it." },
      { img: "/images/journey/icon_gold_balance.webp", title: "Return it", text: "Hand it back by the agreed date and time. Your Security is returned or settled on the agreed basis." },
    ],
    plan: [
      ["You start with", "Security based on the jewellery's displayed value"],
      ["You pay", "The Experience Charges, before you take the piece"],
      ["Good to know", "No interest or return is paid on Security"],
    ],
  },
};
