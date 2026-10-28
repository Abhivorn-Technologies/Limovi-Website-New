"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, BadgeCheck, Percent, Coins, Lock } from "lucide-react";
import Image from "next/image";
import { useLenis } from "lenis/react";

interface JewelleryItem {
  id: number;
  name: string;
  category: string;
  image: string;
  accent: string;
  purity?: string;
  balanceReq?: string;
  makingSavings?: string;
  description?: string;
}

const celebrationCollections: JewelleryItem[] = [
  { id: 1, name: "Royal Long Haram",    category: "Traditional",       image: "/images/long_haram.png",     accent: "#E8A020", purity: "22K / 24K BIS Hallmarked", balanceReq: "50g+ Gold Balance", makingSavings: "18% Saved on Making Charges", description: "A magnificent royal long haram handcrafted for weddings and grand heritage celebrations." },
  { id: 2, name: "Heritage Necklace",   category: "Signature",         image: "/images/necklace.png",       accent: "#D4AF37", purity: "22K Fine Gold", balanceReq: "40g+ Gold Balance", makingSavings: "15% Saved on Making Charges", description: "Exquisite signature temple necklace showcasing intricate traditional Indian artistry." },
  { id: 3, name: "Bridal Nose Ring",    category: "Bridal",            image: "/images/nose_piercing.png",  accent: "#9b2c2c", purity: "22K Certified Gold", balanceReq: "15g+ Gold Balance", makingSavings: "20% Saved on Making Charges", description: "Ornate bridal nath/nose ring crafted with precision for sacred wedding rituals." },
  { id: 4, name: "Temple Jhumkas",     category: "Heritage",          image: "/images/ear_piercing.png",   accent: "#b7791f", purity: "22K Antique Gold", balanceReq: "25g+ Gold Balance", makingSavings: "16% Saved on Making Charges", description: "Classic heritage temple jhumkas featuring authentic gold bead detailing." },
  { id: 5, name: "Bridal Wedding Set",  category: "Grand Collection",  image: "/images/jewellery-wedding.png",accent: "#ed8936", purity: "22K/24K Royal Gold", balanceReq: "100g+ Gold Balance", makingSavings: "22% Saved on Making Charges", description: "Complete grand bridal ensemble for brides wanting the ultimate royal luxury experience." },
];

const dailyCollections: JewelleryItem[] = [
  { id: 1, name: "Pendant & Chain",     category: "Minimalist", image: "/images/minimal_pendant_v2.png",   accent: "#D4AF37", purity: "22K Everyday Gold", balanceReq: "10g+ Gold Balance", makingSavings: "14% Saved on Making Charges", description: "Sleek minimalist gold pendant designed for daily elegance and effortless styling." },
  { id: 2, name: "Classic Bracelet",    category: "Classic",    image: "/images/minimal_bracelet_v2.png",  accent: "#D4AF37", purity: "22K Fine Gold", balanceReq: "15g+ Gold Balance", makingSavings: "12% Saved on Making Charges", description: "Timeless handcrafted gold bracelet featuring a smooth comfortable fit." },
  { id: 3, name: "Solitaire Studs",     category: "Everyday",   image: "/images/minimal_studs_v2.png",     accent: "#D4AF37", purity: "18K / 22K Fine Gold", balanceReq: "10g+ Gold Balance", makingSavings: "14% Saved on Making Charges", description: "Chic everyday solitaire gold ear studs for office, leisure, and daily wear." },
  { id: 4, name: "Subtle Nose Pin",     category: "Subtle",     image: "/images/minimal_nose_stud_v4.png", accent: "#D4AF37", purity: "22K Handcrafted", balanceReq: "5g+ Gold Balance", makingSavings: "15% Saved on Making Charges", description: "Delicate handcrafted nose pin offering subtle modern elegance." },
  { id: 5, name: "Elegant Gold Ring",  category: "Elegance",   image: "/images/minimal_ring_v2.png",      accent: "#D4AF37", purity: "22K Certified Gold", balanceReq: "8g+ Gold Balance", makingSavings: "14% Saved on Making Charges", description: "Modern polished gold band designed for stackable or solo everyday luxury." },
];

const AUTO_INTERVAL = 2500; // ms

function normalizeOffset(raw: number, N: number): number {
  let o = ((raw % N) + N) % N;
  if (o > Math.floor(N / 2)) o -= N;
  return o;
}

function PieceModal({ item, onClose }: { item: JewelleryItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  const specs = [
    { icon: BadgeCheck, label: "Purity", value: item.purity },
    { icon: Percent, label: "Limovi Privilege", value: item.makingSavings },
    { icon: Coins, label: "Access Level", value: item.balanceReq },
    { icon: Lock, label: "Vaulting", value: "100% BIS Certified" },
  ];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-[rgba(7,17,31,0.82)] overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg my-auto max-h-[88vh] overflow-y-auto bg-[var(--color-deep)] text-[var(--color-deep-ink)] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          data-lenis-prevent="true"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-11 h-11 bg-white text-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-tile)] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="relative w-full aspect-square bg-black">
            <Image src={item.image} alt={item.name} fill sizes="512px" className="object-cover" priority />
          </div>

          <div className="p-6 sm:p-8">
            <p className="t-small font-medium text-[var(--color-accent)]">{item.category}</p>
            <h3 className="display t-lead mt-2">{item.name}</h3>
            <p className="t-body text-[var(--color-deep-muted)] mt-3">{item.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-2">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#12233A] p-4 flex items-start gap-3">
                  <Icon className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <div>
                    <dt className="t-small text-[var(--color-deep-muted)]">{label}</dt>
                    <dd className="t-small font-medium mt-0.5">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function CarouselSlider({
  collections,
  title,
  subtitle,
  isMobile,
  onViewPiece,
  isModalOpen,
}: {
  collections: JewelleryItem[];
  title: string;
  subtitle: string;
  isMobile: boolean;
  onViewPiece: (item: JewelleryItem) => void;
  isModalOpen: boolean;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const N = collections.length;

  const step = isMobile ? 220 : 330;
  const activeW = isMobile ? 290 : 400;
  const activeH = isMobile ? 400 : 520;
  const normalW = isMobile ? 180 : 270;
  const normalH = isMobile ? 280 : 400;

  const prev = useCallback(() => setActive((a) => (a - 1 + N) % N), [N]);
  const next = useCallback(() => setActive((a) => (a + 1) % N), [N]);

  useEffect(() => {
    if (paused || isModalOpen) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, isModalOpen, next]);

  return (
    <div className="mt-20 lg:mt-24">
      {/* ── Carousel title and controls ── */}
      <div className="frame flex items-end justify-between gap-6 mb-10" data-reveal>
        <div>
          <h3 className="display t-head text-[var(--color-ink)]">{title}</h3>
          <p className="t-body text-[var(--color-muted)] mt-3 max-w-[44ch]">{subtitle}</p>
        </div>
        <div className="hidden sm:flex gap-2 shrink-0">
          <button
            onClick={prev}
            className="w-12 h-12 bg-[var(--color-ink)] text-white flex items-center justify-center hover:bg-[var(--color-field)] active:scale-95 transition-[background-color,transform] duration-200 cursor-pointer"
            aria-label={`Previous ${title} piece`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-12 h-12 bg-[var(--color-ink)] text-white flex items-center justify-center hover:bg-[var(--color-field)] active:scale-95 transition-[background-color,transform] duration-200 cursor-pointer"
            aria-label={`Next ${title} piece`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Spotlight carousel ── */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{ height: activeH + 24, maxWidth: "100vw" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {collections.map((item, i) => {
          const offset = normalizeOffset(i - active, N);
          const absOff = Math.abs(offset);
          const isActive = offset === 0;

          const opacity = absOff > 2 ? 0 : 1;
          const zIndex = 20 - absOff * 5;
          const w = isActive ? activeW : normalW;
          const h = isActive ? activeH : normalH;
          const xOffset = offset * step;
          const filter = isActive ? "brightness(1)" : "brightness(0.55)";

          return (
            <motion.div
              key={item.id}
              onClick={() => setActive(i)}
              animate={{ opacity, zIndex, filter, x: xOffset, width: w, height: h }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 left-1/2 cursor-pointer overflow-hidden bg-black"
              style={{
                translateY: "-50%",
                translateX: "-50%",
                width: w,
                height: h,
                willChange: "transform, opacity, width, height",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes={`${activeW}px`}
                className="object-cover"
                priority={absOff <= 1}
              />
              {/* Neutral scrim so the caption reads over the photograph */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 42%)" }}
              />
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 w-full p-6 sm:p-7 flex items-end justify-between gap-4"
                style={{ visibility: isActive ? "visible" : "hidden" }}
                aria-hidden={!isActive}
              >
                <div>
                  <span className="t-small font-medium" style={{ color: "#F2D27A" }}>{item.category}</span>
                  <h4 className="t-lead font-medium text-white mt-1 leading-tight">{item.name}</h4>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewPiece(item);
                  }}
                  tabIndex={isActive ? 0 : -1}
                  className="btn btn-paper !min-h-[44px] !px-5 shrink-0"
                >
                  View
                </button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Position indicators ── */}
      <div className="flex justify-center gap-1 mt-8">
        {collections.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-6 flex items-center cursor-pointer px-1"
            aria-label={`Show ${item.name}`}
            aria-current={i === active}
          >
            <span
              className="block h-[3px] transition-[width,background-color] duration-300"
              style={{ width: i === active ? 32 : 14, background: i === active ? "var(--color-ink)" : "#B9C4D2" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function JewelleryCloud() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<JewelleryItem | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (selectedPiece !== null) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [selectedPiece, lenis]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="jewellery-experience" className="section relative bg-[var(--color-bg)] overflow-hidden">
      {/* ── The statement, with the object laid over the type ── */}
      <div className="relative">
        <div className="frame relative">
          <h2 className="display t-display text-[var(--color-ink)] whitespace-nowrap leading-[0.88]" data-reveal>
            Experience<br />luxury.
          </h2>
          <p className="display t-display text-[var(--color-muted)] leading-[0.88] mt-[0.12em]" data-reveal style={{ ["--i" as string]: 1 }}>
            Unlock more<br />from your gold.
          </p>

        </div>

        <div className="frame mt-10 lg:mt-4 grid lg:grid-cols-12 gap-x-8 gap-y-6 items-center">
          <div className="lg:col-span-6 relative aspect-square w-[78%] sm:w-[60%] lg:w-[82%] ml-auto lg:ml-0 -mr-[6vw] lg:mr-0 rotate-[-5deg]" data-reveal="open">
            <Image
              src="/images/minimal_pendant_v2.png"
              alt="Gold pendant on a fine chain"
              fill
              sizes="(min-width: 1024px) 45vw, 78vw"
              className="object-contain mix-blend-multiply scale-110"
            />
          </div>
          <p className="lg:col-start-7 lg:col-span-6 t-lead text-[var(--color-ink)] max-w-[46ch]" data-reveal>
            Your <strong className="font-medium text-[var(--color-field)]">Gold Balance</strong> opens the door to the LIMOVI Jewellery Cloud. As your eligible Gold Balance grows, so can your access to a wider range of jewellery experiences, from everyday elegance to grand celebrations. Explore premium collections for different moments without having to purchase a new piece every time.
          </p>
        </div>
      </div>

      <div id="heritage-collection">
        <CarouselSlider
          collections={celebrationCollections}
          title="Luxury Jewellery"
          subtitle="Exquisitely crafted for weddings and significant life milestones."
          isMobile={isMobile}
          onViewPiece={setSelectedPiece}
          isModalOpen={selectedPiece !== null}
        />
      </div>

      <div id="minimalist-elegance">
        <CarouselSlider
          collections={dailyCollections}
          title="Lifestyle Jewellery"
          subtitle="Refined jewellery for every moment."
          isMobile={isMobile}
          onViewPiece={setSelectedPiece}
          isModalOpen={selectedPiece !== null}
        />
      </div>

      {/* Piece Details Modal */}
      <PieceModal item={selectedPiece} onClose={() => setSelectedPiece(null)} />
    </section>
  );
}
