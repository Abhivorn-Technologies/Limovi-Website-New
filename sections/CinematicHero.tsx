"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLenis } from "lenis/react";
import Image from "next/image";

// ─── CUSTOM COLORFUL SVGS (Mimicking references) ──────────────────────────────

const CashSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    <defs>
      <g id="usdBundle">
        {/* Right Face (Pages) */}
        <polygon points="40,10 55,0 55,8 40,18" fill="#D6D6D6" stroke="#9E9E9E" strokeWidth="0.5" />
        <line x1="40" y1="12" x2="55" y2="2" stroke="#BDBDBD" strokeWidth="0.5" />
        <line x1="40" y1="14" x2="55" y2="4" stroke="#BDBDBD" strokeWidth="0.5" />
        <line x1="40" y1="16" x2="55" y2="6" stroke="#BDBDBD" strokeWidth="0.5" />

        {/* Left Face (Pages) */}
        <polygon points="0,10 40,10 40,18 0,18" fill="#F4F4F4" stroke="#9E9E9E" strokeWidth="0.5" />
        <line x1="0" y1="12" x2="40" y2="12" stroke="#BDBDBD" strokeWidth="0.5" />
        <line x1="0" y1="14" x2="40" y2="14" stroke="#BDBDBD" strokeWidth="0.5" />
        <line x1="0" y1="16" x2="40" y2="16" stroke="#BDBDBD" strokeWidth="0.5" />

        {/* Top Face */}
        <polygon points="0,10 15,0 55,0 40,10" fill="#E8EBCF" stroke="#8A9A70" strokeWidth="0.5" />
        
        {/* Projected Details (Matrix projects 100x45 rect onto 3D top face) */}
        <g transform="matrix(0.4, 0, -0.3333, 0.2222, 15, 0)">
          {/* Outer Border */}
          <rect x="3" y="3" width="94" height="39" fill="none" stroke="#2B462C" strokeWidth="1.5" rx="1" />
          <rect x="5" y="5" width="90" height="35" fill="none" stroke="#2B462C" strokeWidth="0.5" />
          
          {/* Center Portrait Circle */}
          <circle cx="50" cy="22.5" r="14" fill="#D9DEC0" stroke="#2B462C" strokeWidth="1" />
          <path d="M42,32 C42,16 58,16 58,32 Z" fill="#4B6349" opacity="0.8" />
          
          {/* Left and Right circular seals */}
          <circle cx="24" cy="22.5" r="7" fill="none" stroke="#2B462C" strokeWidth="1" />
          <circle cx="76" cy="22.5" r="7" fill="none" stroke="#1B5E20" strokeWidth="1" />
          
          {/* 100 Numbers in Corners */}
          <text x="6" y="13" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#2B462C">100</text>
          <text x="71" y="13" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#2B462C">100</text>
          <text x="6" y="41" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#2B462C">100</text>
          <text x="71" y="41" fontSize="11" fontWeight="900" fontFamily="sans-serif" fill="#2B462C">100</text>

          {/* Random decorative lines */}
          <line x1="33" y1="14" x2="67" y2="14" stroke="#2B462C" strokeWidth="0.5" />
          <line x1="33" y1="31" x2="67" y2="31" stroke="#2B462C" strokeWidth="0.5" />
        </g>

        {/* White Strap with Yellow Edges */}
        <polygon points="16,10 24,10 24,18 16,18" fill="#FFFFFF" stroke="#9E9E9E" strokeWidth="0.5" />
        <polygon points="16,10 24,10 39,0 31,0" fill="#F8F9FA" stroke="#9E9E9E" strokeWidth="0.5" />
        <line x1="16" y1="10" x2="31" y2="0" stroke="#FBC02D" strokeWidth="0.75" />
        <line x1="24" y1="10" x2="39" y2="0" stroke="#FBC02D" strokeWidth="0.75" />
        <line x1="16" y1="18" x2="16" y2="10" stroke="#FBC02D" strokeWidth="0.75" />
        <line x1="24" y1="18" x2="24" y2="10" stroke="#FBC02D" strokeWidth="0.75" />
      </g>
    </defs>

    {/* Stack Assembly (Messy Tumbling Pile) */}
    <g transform="translate(6, 38) rotate(-5) scale(0.9)">
      <use href="#usdBundle" />
    </g>
    <g transform="translate(12, 30) rotate(8) scale(0.9)">
      <use href="#usdBundle" />
    </g>
    <g transform="translate(4, 21) rotate(-12) scale(0.9)">
      <use href="#usdBundle" />
    </g>
    <g transform="translate(10, 12) rotate(4) scale(0.9)">
      <use href="#usdBundle" />
    </g>
  </svg>
);

const CoinsSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    <defs>
      <g id="scatteredCoin">
        {/* Side edge (ribbed) */}
        <path d="M-14,0 v5 c0,2.5 6,5 14,5 c8,0 14,-2.5 14,-5 v-5" fill="#F4C430" stroke="#0A1929" strokeWidth="1.5" />
        {/* Ribbing lines */}
        <line x1="-12" y1="2" x2="-12" y2="7" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="-8" y1="3" x2="-8" y2="8" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="-4" y1="4" x2="-4" y2="9" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="0" y1="4.5" x2="0" y2="9.5" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="4" y1="4" x2="4" y2="9" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="8" y1="3" x2="8" y2="8" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        <line x1="12" y1="2" x2="12" y2="7" stroke="#0A1929" strokeWidth="0.5" opacity="0.4" />
        {/* Top face */}
        <ellipse cx="0" cy="0" rx="14" ry="5" fill="#FFF176" stroke="#0A1929" strokeWidth="1.5" />
        <ellipse cx="0" cy="0" rx="10" ry="3" fill="none" stroke="#F4C430" strokeWidth="1" />
      </g>
    </defs>
    
    {/* Base Messy Pile */}
    <g transform="translate(20, 52) rotate(-15)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(44, 48) rotate(10)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(32, 56) rotate(-5)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(34, 44) rotate(5)">
      <use href="#scatteredCoin" />
    </g>

    {/* Falling/Tumbling Coins */}
    <g transform="translate(16, 28) rotate(-40)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(50, 20) rotate(30)">
      <use href="#scatteredCoin" />
    </g>
    <g transform="translate(32, 10) rotate(-15)">
      <use href="#scatteredCoin" />
    </g>
  </svg>
);

const GoldBarsSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    <defs>
      <g id="goldBar">
        {/* Base trapezoid (front face) */}
        <polygon points="4,12 36,12 40,24 0,24" fill="#F4C430" stroke="#0A1929" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Top face */}
        <polygon points="4,12 12,2 44,2 36,12" fill="#FFF176" stroke="#0A1929" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Side face */}
        <polygon points="36,12 44,2 48,12 40,24" fill="#D4AF37" stroke="#0A1929" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Metallic edge highlight */}
        <line x1="5" y1="13" x2="35" y2="13" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
        <line x1="37" y1="12" x2="43" y2="4" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      </g>
      <g id="goldBarEngraved">
        <use href="#goldBar" />
        {/* Engravings on Top Face */}
        {/* Stamp / Logo */}
        <circle cx="20" cy="7" r="2.5" fill="none" stroke="#D4AF37" strokeWidth="0.75" />
        <path d="M19,6 L21,8 M21,6 L19,8" stroke="#D4AF37" strokeWidth="0.5" />
        {/* Weight / Purity text representation */}
        <line x1="26" y1="6" x2="30" y2="6" stroke="#D4AF37" strokeWidth="1" />
        <line x1="26" y1="8" x2="34" y2="8" stroke="#D4AF37" strokeWidth="1" />
      </g>
    </defs>

    {/* Back Peeking Bar */}
    <g transform="translate(18, 14) rotate(-5)">
      <use href="#goldBar" />
    </g>
    
    {/* Front Base Bar */}
    <g transform="translate(-2, 32) rotate(10)">
      <use href="#goldBar" />
    </g>
    
    {/* Middle Bar */}
    <g transform="translate(14, 24) rotate(-15)">
      <use href="#goldBar" />
    </g>
    
    {/* Top Bar (Engraved) */}
    <g transform="translate(6, 6) rotate(5)">
      <use href="#goldBarEngraved" />
    </g>
  </svg>
);

const JewellerySVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    {/* Jhumkas on the left */}
    <g transform="translate(0, 16) scale(1.6)">
      {/* Top Earring */}
      <g transform="translate(0, 0)">
        <circle cx="6" cy="2" r="1.5" fill="#F4C430" />
        <path d="M2,8 Q6,4 10,8 Z" fill="#D4AF37" />
        <circle cx="4" cy="9" r="0.8" fill="#F4C430" />
        <circle cx="6" cy="10" r="0.8" fill="#F4C430" />
        <circle cx="8" cy="9" r="0.8" fill="#F4C430" />
      </g>
      {/* Bottom Earring */}
      <g transform="translate(12, 6)">
        <circle cx="6" cy="2" r="1.5" fill="#F4C430" />
        <path d="M2,8 Q6,4 10,8 Z" fill="#D4AF37" />
        <circle cx="4" cy="9" r="0.8" fill="#F4C430" />
        <circle cx="6" cy="10" r="0.8" fill="#F4C430" />
        <circle cx="8" cy="9" r="0.8" fill="#F4C430" />
      </g>
    </g>

    {/* Necklace on the right */}
    <g transform="translate(30, 16)">
      {/* Outer chain */}
      <path d="M0,0 Q10,40 16,40 Q22,40 32,0" fill="none" stroke="#F4C430" strokeWidth="1.25" strokeLinecap="round" />
      {/* Middle chain */}
      <path d="M3,0 Q10,34 16,34 Q22,34 29,0" fill="none" stroke="#D4AF37" strokeWidth="1.25" strokeLinecap="round" />
      {/* Inner chain */}
      <path d="M6,0 Q10,28 16,28 Q22,28 26,0" fill="none" stroke="#F4C430" strokeWidth="1.25" strokeLinecap="round" />
      {/* Diamond Pendant */}
      <g transform="translate(16, 40)">
        <polygon points="0,0 4,6 0,12 -4,6" fill="none" stroke="#F4C430" strokeWidth="1.5" strokeLinejoin="round" />
        <polygon points="0,2 2.5,6 0,10 -2.5,6" fill="#D4AF37" />
      </g>
    </g>
  </svg>
);

const DigitalGoldSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ overflow: "visible" }}>
    {/* Glowing background arrow (from image) */}
    <path d="M12,48 L32,28 L42,38 L60,10 M50,10 L60,10 L60,20" stroke="#F4C430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    
    {/* Phone Frame */}
    <g transform="translate(14, 2)">
      <rect x="0" y="0" width="36" height="60" rx="4" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
      {/* Notch */}
      <path d="M12,2.5 L12,4 Q12,6 14,6 L22,6 Q24,6 24,4 L24,2.5" fill="#D4AF37" />
    </g>

    {/* Floating Coin 1 (Back/Right) */}
    <g transform="translate(32, 28) rotate(15)">
      {/* Coin thickness */}
      <ellipse cx="0" cy="4" rx="16" ry="12" fill="#B8860B" />
      <path d="M-16,4 L-16,0 A16,12 0 0,0 16,0 L16,4 A16,12 0 0,1 -16,4" fill="#8B6508" />
      {/* Coin face */}
      <ellipse cx="0" cy="0" rx="16" ry="12" fill="#F4C430" stroke="#FFF176" strokeWidth="1" />
      {/* Inner ring */}
      <ellipse cx="0" cy="0" rx="13" ry="9" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="1,1" />
      {/* Rupee Symbol */}
      <text x="0" y="4" fontSize="14" fontWeight="900" fontFamily="sans-serif" fill="#8B6508" textAnchor="middle" transform="scale(1, 0.75)">₹</text>
    </g>

    {/* Floating Coin 2 (Front/Left) */}
    <g transform="translate(20, 42) rotate(-10)">
      {/* Coin thickness */}
      <ellipse cx="0" cy="5" rx="18" ry="14" fill="#B8860B" />
      <path d="M-18,5 L-18,0 A18,14 0 0,0 18,0 L18,5 A18,14 0 0,1 -18,5" fill="#8B6508" />
      {/* Ribbed edge lines */}
      <line x1="-16" y1="2" x2="-16" y2="7" stroke="#6B4E00" strokeWidth="0.5" />
      <line x1="-12" y1="4" x2="-12" y2="9" stroke="#6B4E00" strokeWidth="0.5" />
      <line x1="-8" y1="5" x2="-8" y2="10" stroke="#6B4E00" strokeWidth="0.5" />
      <line x1="-4" y1="5" x2="-4" y2="10" stroke="#6B4E00" strokeWidth="0.5" />
      <line x1="0" y1="5" x2="0" y2="10" stroke="#6B4E00" strokeWidth="0.5" />
      
      {/* Coin face */}
      <ellipse cx="0" cy="0" rx="18" ry="14" fill="#FFD700" stroke="#FFF8E7" strokeWidth="1" />
      {/* Inner ring */}
      <ellipse cx="0" cy="0" rx="14" ry="10.5" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="1.5,1.5" />
      {/* Glowing highlight */}
      <path d="M-12,-4 Q-6,-8 0,-6 Q-4,-2 -12,-4" fill="#FFFFFF" opacity="0.6" />
      {/* Rupee Symbol */}
      <text x="0" y="5" fontSize="18" fontWeight="900" fontFamily="sans-serif" fill="#6B4E00" textAnchor="middle" transform="scale(1, 0.75)">₹</text>
    </g>
  </svg>
);

// ─── CHAPTERS ─────────────────────────────────────────────────────────────────

const FRAGMENTS = [
  { label: "Digital Gold", Icon: DigitalGoldSVG },
  { label: "Cash",         Icon: CashSVG },
  { label: "Gold Coins",   Icon: CoinsSVG },
  { label: "Gold Bars",    Icon: GoldBarsSVG },
  { label: "Jewellery",    image: "/images/gold-haram.png" },
];

const STRATEGIES = [
  { title: "Investment Only",         desc: "Gold bars grow into a mountain." },
  { title: "Enroll & Experience",     desc: "Join and unlock luxury." },
  { title: "Investment & Experience", desc: "Grow wealth while you wear." },
  { title: "Experience Only",         desc: "Access luxury without ownership." },
];

const GATEWAYS = [
  { title: "Luxury Jewellery Cloud", href: "#jewellery-experience" },
  { title: "Instant Loan",           href: "#loans" },
  { title: "Instant Liquidity",      href: "#liquidity" },
  { title: "Gift Gold Ecosystem",    href: "#gift-gold" },
  { title: "Wealth Generation",      href: "#wealth" },
];

type Specimen = { tile: string; image?: string; alt: string; name: string; fact: string; fragments?: boolean };

const SPECIMENS: Specimen[] = [
  { tile: "#FFFFFF", image: "/images/gold-haram.png", alt: "Gold haram necklace", name: "Your gold", fact: "100% secure, in an insured gold vault" },
  { tile: "#FFFFFF", fragments: true, alt: "Digital gold, cash, gold coins, gold bars and jewellery", name: "Five kinds of gold", fact: "Held in five places, working in none" },
  { tile: "#FFFFFF", image: "/images/ChatGPT Image Jul 28, 2026, 11_54_39 AM.png", alt: "The Gold Balance sphere", name: "Gold Balance", fact: "One balance for every gram you own" },
  { tile: "#F6EFD6", image: "/images/jewellry.png", alt: "Gold jewellery set", name: "LIMOVI, the gold ecosystem", fact: "Investment at the centre, five gateways around it" },
];

function SpecimenTile({ s, size }: { s: Specimen; size: string }) {
  return (
    <div className="relative" style={{ width: size, height: size, background: s.tile, transition: "background-color 600ms ease" }}>
      {s.fragments ? (
        <div className="absolute inset-[9%] grid grid-cols-3 grid-rows-2 place-items-center gap-2">
          {FRAGMENTS.map((f, i) => (
            <motion.div
              key={f.label}
              className={`flex flex-col items-center gap-2 ${i === 3 ? "col-start-1" : ""} ${i >= 3 ? "translate-x-1/2" : ""}`}
              animate={{ y: [0, i % 2 ? 6 : -6, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-[min(7vw,96px)] aspect-square flex items-center justify-center">
                {f.image ? (
                  <Image src={f.image} alt="" width={96} height={96} className="w-full h-full object-contain" />
                ) : f.Icon ? (
                  <f.Icon size={64} />
                ) : null}
              </div>
              <span className="t-small font-medium text-[var(--color-ink)] whitespace-nowrap">{f.label}</span>
            </motion.div>
          ))}
        </div>
      ) : s.image ? (
        <Image
          src={s.image}
          alt={s.alt}
          fill
          sizes="(min-width: 1024px) 450px, 62vw"
          className="object-contain p-[12%] mix-blend-multiply"
          priority
        />
      ) : null}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export function CinematicHero() {
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let scrolled = false;
    const handleScroll = () => { scrolled = true; };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const timeout = setTimeout(() => {
      if (!scrolled && window.scrollY < 10) {
        if (lenis) {
          lenis.scrollTo(window.innerHeight * 0.96, { duration: 3.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          window.scrollTo({ top: window.innerHeight * 0.96, behavior: "smooth" });
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // The specimen on the colour field follows whichever chapter crosses the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.chapter));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    chapterRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const chapter = (i: number) => ({
    ref: (el: HTMLDivElement | null) => { chapterRefs.current[i] = el; },
    "data-chapter": i,
  });

  const s = SPECIMENS[active];

  return (
    <section id="ecosystem" className="relative bg-[var(--color-bg)]">
      <div className="lg:grid lg:grid-cols-2">

        {/* ── Left: the story, anchored low ── */}
        <div className="relative z-10">

          {/* Chapter 1: the title */}
          <div {...chapter(0)} className="flex flex-col">
            <div className="lg:hidden bg-[var(--color-field)] pt-[76px] h-[58svh] flex items-center justify-center">
              <SpecimenTile s={SPECIMENS[0]} size="min(62vw, 44svh)" />
            </div>
            <div className="lg:min-h-[100svh] flex flex-col justify-end px-[var(--margin)] lg:pr-16 pt-10 lg:pt-[96px] pb-14 lg:pb-[clamp(40px,7vh,72px)]">
              <h1 className="display t-title text-[var(--color-ink)] max-w-[17ch]" data-reveal style={{ ["--i" as string]: 1 }}>
                Gold that works beyond ownership.
              </h1>
              <p className="t-lead text-[var(--color-muted)] mt-6 max-w-[34ch]" data-reveal style={{ ["--i" as string]: 2 }}>
                India&apos;s first living gold ecosystem. Build wealth, experience luxury, unlock financial freedom.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-9" data-reveal style={{ ["--i" as string]: 3 }}>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-early-access-modal"))}
                  className="btn btn-accent group"
                >
                  Get Early Access
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <span className="flex items-center gap-2.5 text-[var(--color-ink)] font-medium">
                  <ShieldCheck size={20} className="text-[var(--color-field)]" />
                  100% secure, insured gold vault
                </span>
              </div>
            </div>
          </div>

          {/* Chapter 2: the problem */}
          <div {...chapter(1)} className="flex flex-col">
            <div className="lg:hidden order-2 px-[var(--margin)] pb-6">
              <SpecimenTile s={SPECIMENS[1]} size="min(100%, 52svh)" />
            </div>
            <div className="order-1 lg:min-h-[80svh] flex flex-col justify-end px-[var(--margin)] lg:pr-16 py-14 lg:pb-[clamp(40px,7vh,72px)]">
              <p className="t-lead text-[var(--color-muted)] max-w-[30ch]" data-reveal>
                You have gold assets. You have gold investments.
              </p>
              <h2 className="display t-head text-[var(--color-ink)] mt-4" data-reveal style={{ ["--i" as string]: 1 }}>
                But they&apos;re fragmented.
              </h2>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 t-lead text-[var(--color-ink)]" data-reveal style={{ ["--i" as string]: 2 }}>
                {FRAGMENTS.map((f) => (
                  <li key={f.label}>{f.label}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chapter 3: one balance, four strategies */}
          <div {...chapter(2)} className="flex flex-col">
            <div className="lg:hidden flex justify-end">
              <div className="bg-[var(--color-field)] w-[78%] aspect-square flex items-center justify-center">
                <SpecimenTile s={SPECIMENS[2]} size="74%" />
              </div>
            </div>
            <div className="lg:min-h-[100svh] flex flex-col justify-end px-[var(--margin)] lg:pr-16 py-14 lg:pb-[clamp(40px,7vh,72px)]">
              <h2 className="display t-head text-[var(--color-ink)]" data-reveal>
                Introducing Gold Balance.
              </h2>
              <p className="t-lead text-[var(--color-muted)] mt-6 max-w-[36ch]" data-reveal style={{ ["--i" as string]: 1 }}>
                Cash, digital gold, coins, bars and jewellery in one balance, held through the strategy that suits you.
              </p>
              <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-7">
                {STRATEGIES.map((st, i) => (
                  <div key={st.title} data-reveal style={{ ["--i" as string]: i + 2 }}>
                    <dt className="t-lead font-medium text-[var(--color-field)]">{st.title}</dt>
                    <dd className="t-body text-[var(--color-muted)] mt-1">{st.desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Chapter 4: five gateways */}
          <div {...chapter(3)} className="flex flex-col">
            <div className="lg:hidden px-[var(--margin)] pt-6">
              <div className="relative w-[64%] aspect-square">
                <Image src="/images/jewellry.png" alt="Gold jewellery set" fill sizes="64vw" className="object-contain" />
              </div>
            </div>
            <div className="lg:min-h-[90svh] flex flex-col justify-end px-[var(--margin)] lg:pr-16 py-14 lg:pb-[clamp(56px,10vh,112px)]">
              <h2 className="display t-head text-[var(--color-ink)]" data-reveal>
                Five powerful gateways.
              </h2>
              <ul className="mt-8">
                {GATEWAYS.map((g, i) => (
                  <li key={g.title} data-reveal style={{ ["--i" as string]: i + 1 }}>
                    <a href={g.href} className="group flex items-baseline justify-between gap-6 py-2.5 t-lead text-[var(--color-ink)] hover:text-[var(--color-field)] transition-colors">
                      <span>{g.title}</span>
                      <ArrowRight size={20} className="shrink-0 self-center transition-transform duration-200 group-hover:translate-x-1.5" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="t-body text-[var(--color-muted)] mt-6 max-w-[40ch]" data-reveal style={{ ["--i" as string]: 7 }}>
                All five draw on one Gold Balance, with investment at the centre.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: the specimen on its colour field (desktop) ── */}
        <div className="hidden lg:block relative">
          <div className="sticky top-0 h-[100svh] bg-[var(--color-field)] overflow-hidden flex items-center justify-center pt-[60px] pb-[40px]">
            <a href="#access-strategies" className="link absolute bottom-[clamp(28px,5vh,56px)] right-[var(--margin)] text-[var(--color-field-ink)] font-medium">
              Compare strategies
            </a>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.03, y: -12, transition: { duration: 0.25, ease: [0.55, 0.055, 0.675, 0.19] } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SpecimenTile s={s} size="min(47vw, calc(100svh - 196px))" />
                  <div className="mt-5 text-[var(--color-field-ink)]">
                    <p className="font-medium">{s.name}</p>
                    <p className="t-small text-[var(--color-field-muted)] mt-0.5">{s.fact}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Chapter position, carried by the specimen tile's neighbours */}
            <div className="absolute bottom-[clamp(36px,calc(5vh+8px),64px)] left-[var(--margin)] flex gap-2" aria-hidden>
              {SPECIMENS.map((_, i) => (
                <span key={i} className="h-[3px] w-10 transition-colors duration-500" style={{ background: i === active ? "#FFFFFF" : "rgba(255,255,255,0.35)" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
