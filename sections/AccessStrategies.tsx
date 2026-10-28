"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Gem, Sparkles, CheckCircle2, XCircle, X, ChevronRight, Infinity as InfinityIcon } from "lucide-react";

const InvestmentGrowthIcon = ({ className, size = 24, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path d="M23 2h-7l3.3 3.3-7.6 7.6-4.3-4.3-5.7 5.7 1.4 1.4 4.3-4.3 4.3 4.3 9-9L23 9V2Z" />
    <ellipse cx="5" cy="18" rx="3" ry="1.5" />
    <path d="M2 18.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <ellipse cx="12" cy="15" rx="3" ry="1.5" />
    <path d="M9 15.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M9 18v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5V18c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <ellipse cx="19" cy="12" rx="3" ry="1.5" />
    <path d="M16 12.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M16 15v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5V15c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
    <path d="M16 17.5v1.5c0 .8 1.3 1.5 3 1.5s3-.7 3-1.5v-1.5c0 .8-1.3 1.5-3 1.5s-3-.7-3-1.5z" />
  </svg>
);

type Benefit = { label: string; desc: React.ReactNode; eligible: boolean };

interface Plan {
  id: string;
  name: string;
  tagline: string;
  shortDesc: string;
  icon: any;
  accent: string;
  entryLabel: string;
  entryDetail: React.ReactNode;
  exitPolicy: React.ReactNode;
  fee: string;
  feeLabel: string;
  highlight: boolean;
  benefits: Benefit[];
}

const PLANS: Plan[] = [
  {
    id: "investment-only",
    name: "Investment Only",
    tagline: "Pure capital appreciation backed by 24K gold.",
    shortDesc: "Build long-term wealth with the flexibility to access luxury whenever you choose.",
    icon: InvestmentGrowthIcon,
    accent: "#D4AF37",
    entryLabel: "Investment",
    entryDetail: "Minimum 50 grams 24K gold for Limovi membership benefits.",
    exitPolicy: "Redeem your gold balance as pure 24K gold or equivalent funds at prevailing market rates.",
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee per-experience",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Cloud", 
        desc: (
          <div className="mt-2 space-y-3">
            <div>
              <div className="font-bold text-[var(--color-ink)]">A. Luxury Jewellery Experience</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[var(--color-muted)]">
                <li>Experience Charges: 0.9% of selected jewellery value per-experience.</li>
                <li>Service Charges: ₹1,099 per-experience.</li>
                <li>Value Unlock: Save 14% on making charges per-experience.</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-[var(--color-ink)]">B. Lifestyle Jewellery Subscription</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[var(--color-muted)]">
                <li>Experience Charges: 1.1% of selected jewellery value per-month.</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 7% on making charges per-experience.</li>
              </ul>
            </div>
          </div>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ol className="list-[upper-alpha] list-outside ml-4 mt-2 space-y-2.5 font-bold text-[var(--color-ink)]">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5 font-normal">Maximum loan eligibility (75% LTV)</div>
            </li>
            <li>
              <div className="font-bold text-[var(--color-ink)]">Gold Loan + Luxury Jewellery Cloud</div>
              <div className="text-[var(--color-muted)] mt-0.5 font-normal">= Gold loan of &lt;50% of gold balance value + luxury jewellery experience worth 25% of gold balance value.</div>
            </li>
          </ol>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5">Liquidity Amount Equivalent to the gold balance value.</div>
              
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Gift Gold Ecosystem", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5">Minimum gold balance to unlock the Limovi Gold Ecosystem is 50 grams 24K gold.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { label: "Wealth Generation", desc: "Not eligible — Holds pure 24K gold investment", eligible: false },
    ],
  },
  {
    id: "investment-experience",
    name: "Investment & Experience",
    tagline: "The complete luxury membership — zero experience charges.",
    shortDesc: "Invest once, experience luxury, and unlock additional earning potential.",
    icon: Sparkles,
    accent: "#D4AF37",
    entryLabel: "Investment",
    entryDetail: (
      <ul className="list-disc list-outside ml-3.5 space-y-0.5">
        <li>Minimum 50 grams 24K gold for Limovi membership benefits.</li>
        <li>Convert 80% of your investment into jewellery of your choice (includes gold weight rate + stone rate + GST = 80%), zero-making charge.</li>
        <li>20% membership fee = lifetime Luxury Jewellery Cloud access + 14% making charge coverage.</li>
      </ul>
    ),
    exitPolicy: (
      <ul className="list-disc list-outside ml-3.5 space-y-0.5">
        <li>Redeem your gold balance as pure 24K gold subject to a 14% making charge deduction on the selected ornament.</li>
        <li>Exit with the selected ornament.</li>
      </ul>
    ),
    fee: "₹1,499",
    feeLabel: "service fee per-experience · 0% fee on 1st two experiences",
    highlight: true,
    benefits: [
      { 
        label: "Luxury Jewellery Cloud", 
        desc: (
          <div className="mt-2 space-y-3">
            <div>
              <div className="font-bold text-[var(--color-ink)]">A. Luxury Jewellery Experience</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[var(--color-muted)]">
                <li>Experience Charges: Zero for first two experiences every year (0.5% of selected jewellery value from 3rd experience).</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 14% on making charges per-experience.</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-[var(--color-ink)]">B. Lifestyle Jewellery Subscription</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[var(--color-muted)]">
                <li>Experience Charges: 1.1% of selected jewellery value per-month.</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 7% on making charges per-experience.</li>
              </ul>
            </div>
          </div>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ol className="list-[upper-alpha] list-outside ml-4 mt-2 space-y-2.5 font-bold text-[var(--color-ink)]">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5 font-normal">Maximum loan eligibility (75% LTV)</div>
            </li>
            <li>
              <div className="font-bold text-[var(--color-ink)]">Gold Loan + Luxury Jewellery Cloud</div>
              <div className="text-[var(--color-muted)] mt-0.5 font-normal">= Gold loan of &lt;50% of gold balance value + luxury jewellery experience worth 25% of gold balance value.</div>
            </li>
          </ol>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5">Liquidity Amount Equivalent to the gold balance value.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Gift Gold Ecosystem", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5">Minimum gold balance to unlock the Limovi Gold Ecosystem is 50 grams 24K gold.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Wealth Generation", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              
              <div className="text-[var(--color-muted)] mt-0.5">Turn your jewellery into an earning asset by receiving 25% of its experience value on every experience by others.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
    ],
  },
  {
    id: "enrol-experience",
    name: "Enroll & Experience",
    tagline: "Bring your existing jewellery. Wear new. Earn in return.",
    shortDesc: "Keep your treasured jewellery exactly as it is. Experience unlimited designer jewellery, earn passive income from your enrolled pieces, and save significantly on remodelling and making charges.",
    icon: InfinityIcon,
    accent: "#D4AF37",
    entryLabel: "Investment",
    entryDetail: "Unlock lifetime Limovi membership benefits by enrolling your existing ornament worth the equivalent of 50 grams 24K gold.",
    exitPolicy: "Reclaim your enrolled ornament and seamlessly exit the Limovi Gold Ecosystem.",
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee per-experience · earn 25% back",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Cloud", 
        desc: (
          <div className="mt-2 space-y-3">
            <div>
              <div className="font-bold text-[var(--color-ink)]">A. Luxury Jewellery Experience</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[var(--color-muted)]">
                <li>Experience Charges: 0.9% of selected jewellery value per-experience.</li>
                <li>Service Charges: ₹1,099 per-experience.</li>
                <li>Value Unlock: Save 14% on making charges per-experience.</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-[var(--color-ink)]">B. Lifestyle Jewellery Subscription</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[var(--color-muted)]">
                <li>Experience Charges: 1.1% of selected jewellery value per-month.</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 7% on making charges per-experience.</li>
              </ul>
            </div>
          </div>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ol className="list-[upper-alpha] list-outside ml-4 mt-2 space-y-2.5 font-bold text-[var(--color-ink)]">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5 font-normal">Maximum loan eligibility (75% LTV)</div>
            </li>
            <li>
              <div className="font-bold text-[var(--color-ink)]">Gold Loan + Luxury Jewellery Cloud</div>
              <div className="text-[var(--color-muted)] mt-0.5 font-normal">= Gold loan of &lt;50% of gold balance value + luxury jewellery experience worth 25% of gold balance value.</div>
            </li>
          </ol>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5">Liquidity Amount Equivalent to the gold balance value.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Gift Gold Ecosystem", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5">Minimum gold balance to unlock the Limovi Gold Ecosystem is 50 grams 24K gold.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { 
        label: "Wealth Generation", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              
              <div className="text-[var(--color-muted)] mt-0.5">Turn your jewellery into an earning asset by receiving 25% of its experience value on every experience by others.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
    ],
  },
  {
    id: "experience-only",
    name: "Experience Only",
    tagline: "Short-duration access. Pure luxury on demand.",
    shortDesc: "Access premium jewellery whenever you need it—without ownership",
    icon: Gem,
    accent: "#4DA3FF",
    entryLabel: "Investment",
    entryDetail: "Unlock a world of Limovi benefits with a gold balance valued at 50 grams 24K gold.",
    exitPolicy: "Redeem your gold balance as pure 24K gold or equivalent funds at onboarding market rates.",
    fee: "0.9%",
    feeLabel: "of jewellery value + ₹1,099 service fee per-experience",
    highlight: false,
    benefits: [
      { 
        label: "Luxury Jewellery Cloud", 
        desc: (
          <div className="mt-2 space-y-3">
            <div>
              <div className="font-bold text-[var(--color-ink)]">A. Luxury Jewellery Experience</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[var(--color-muted)]">
                <li>Experience Charges: 0.9% of selected jewellery value per-experience.</li>
                <li>Service Charges: ₹1,099 per-experience.</li>
                <li>Value Unlock: Save 14% on making charges per-experience.</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-[var(--color-ink)]">B. Lifestyle Jewellery Subscription</div>
              <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-[var(--color-muted)]">
                <li>Experience Charges: 1.1% of selected jewellery value per-month.</li>
                <li>Service Charges: ₹1,499 per-experience.</li>
                <li>Value Unlock: Save 7% on making charges per-experience.</li>
              </ul>
            </div>
          </div>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Loans", 
        desc: (
          <ol className="list-[upper-alpha] list-outside ml-4 mt-2 space-y-2.5 font-bold text-[var(--color-ink)]">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5 font-normal">Maximum loan eligibility (75% LTV)</div>
            </li>
            <li>
              <div className="font-bold text-[var(--color-ink)]">Gold Loan + Luxury Jewellery Cloud</div>
              <div className="text-[var(--color-muted)] mt-0.5 font-normal">= Gold loan of &lt;50% of gold balance value + luxury jewellery experience worth 25% of gold balance value.</div>
            </li>
          </ol>
        ), 
        eligible: true 
      },
      { 
        label: "Instant Liquidity", 
        desc: (
          <ul className="list-disc list-outside ml-4 mt-2 space-y-2.5">
            <li>
              <div className="text-[var(--color-muted)] mt-0.5">Liquidity Amount Equivalent to the gold balance value.</div>
            </li>
          </ul>
        ), 
        eligible: true 
      },
      { label: "Gift Gold Ecosystem", desc: "Not eligible — Experience Only strategy does not qualify for Gift Gold Ecosystem", eligible: false },
      { label: "Wealth Generation", desc: "Not eligible — Experience Only strategy does not qualify for Wealth Generation", eligible: false },
    ],
  },
];

import { useLenis } from "lenis/react";

const Tick = ({ ok }: { ok: boolean }) =>
  ok ? (
    <CheckCircle2 size={20} className="text-emerald-700 shrink-0" aria-label="Eligible" />
  ) : (
    <XCircle size={20} className="text-[#8795A8] shrink-0" aria-label="Not eligible" />
  );

export function AccessStrategies() {
  const [activePlan, setActivePlan] = useState<number | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (activePlan !== null) {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        document.body.style.overflow = "hidden";
        lenis?.stop();
      } else {
        // On desktop, scroll the panel into view smoothly
        setTimeout(() => {
          const panel = document.getElementById("desktop-plan-details");
          if (panel) {
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [activePlan, lenis]);

  const toggle = (i: number) => setActivePlan(activePlan === i ? null : i);
  const colBg = (p: Plan) => (p.highlight ? "bg-white" : "");

  return (
    <section id="access-strategies" className="section bg-[var(--color-surface)] relative z-40 overflow-hidden">
      <div className="frame">
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-6 items-end mb-14">
          <h2 className="lg:col-span-7 display t-head text-[var(--color-ink)]" data-reveal>
            Choose your strategy.
          </h2>
          <p className="lg:col-span-5 t-body text-[var(--color-muted)] max-w-[46ch]" data-reveal style={{ ["--i" as string]: 1 }}>
            Select the access strategy that best fits your lifestyle and financial goals. Each option offers a tailored mix of ecosystem benefits and wealth-building opportunities.
          </p>
        </div>

        {/* ── Desktop: one honest comparison table ── */}
        <div className="hidden lg:block" data-reveal style={{ ["--i" as string]: 2 }}>
          <table className="w-full border-collapse text-left t-small">
            <caption className="sr-only">Access strategies compared</caption>
            <thead>
              <tr className="align-bottom">
                <th scope="col" className="w-[16%] pb-6 pr-6" />
                {PLANS.map((p) => (
                  <th key={p.id} scope="col" className={`w-[21%] px-5 pt-6 pb-6 font-normal align-top ${colBg(p)}`}>
                    <span className="block t-lead font-medium text-[var(--color-ink)] leading-tight">{p.name}</span>
                    {p.highlight && <span className="block font-medium text-[#8A6A0E] mt-1">Best value</span>}
                    <span className="block text-[var(--color-muted)] mt-2">{p.shortDesc}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[var(--color-ink)]">
              <tr className="border-t border-[var(--color-surface-2)] align-top">
                <th scope="row" className="py-5 pr-6 font-medium">Investment required</th>
                {PLANS.map((p) => (
                  <td key={p.id} className={`px-5 py-5 ${colBg(p)}`}>{p.entryDetail}</td>
                ))}
              </tr>
              <tr className="border-t border-[var(--color-surface-2)] align-top">
                <th scope="row" className="py-5 pr-6 font-medium">Exit policy</th>
                {PLANS.map((p) => (
                  <td key={p.id} className={`px-5 py-5 ${colBg(p)}`}>{p.exitPolicy}</td>
                ))}
              </tr>
              <tr className="border-t border-[var(--color-surface-2)] align-top">
                <th scope="row" className="py-5 pr-6 font-medium">Charges</th>
                {PLANS.map((p) => (
                  <td key={p.id} className={`px-5 py-5 ${colBg(p)}`}>
                    <span className="block display t-lead tabular">{p.fee}</span>
                    <span className="block text-[var(--color-muted)] mt-1">{p.feeLabel}</span>
                  </td>
                ))}
              </tr>
              {PLANS[0].benefits.map((b, bi) => (
                <tr key={b.label} className="border-t border-[var(--color-surface-2)]">
                  <th scope="row" className="py-4 pr-6 font-medium">{b.label}</th>
                  {PLANS.map((p) => (
                    <td key={p.id} className={`px-5 py-4 ${colBg(p)}`}>
                      <Tick ok={p.benefits[bi].eligible} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-[var(--color-surface-2)]">
                <th scope="row" className="py-6 pr-6" />
                {PLANS.map((p, i) => (
                  <td key={p.id} className={`px-5 py-6 ${colBg(p)}`}>
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={activePlan === i}
                      aria-controls="desktop-plan-details"
                      className={`btn w-full !min-h-[48px] !px-4 justify-between group ${activePlan === i ? "btn-ink" : p.highlight ? "btn-accent" : "btn-paper"}`}
                    >
                      <span>Explore Strategy</span>
                      <ChevronRight size={18} className={`transition-transform duration-300 ${activePlan === i ? "rotate-90" : "group-hover:translate-x-1"}`} />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Phone: one block per plan ── */}
        <div className="lg:hidden grid md:grid-cols-2 gap-x-3 gap-y-2">
          {PLANS.map((p, i) => {
            const eligibleCount = p.benefits.filter(b => b.eligible).length;
            return (
              <div key={p.id} className={`py-6 ${p.highlight ? "bg-white px-5" : "md:px-5"}`} data-reveal style={{ ["--i" as string]: i }}>
                <h3 className="t-lead font-medium text-[var(--color-ink)]">{p.name}</h3>
                {p.highlight && <p className="font-medium text-[#8A6A0E] t-small mt-0.5">Best value</p>}
                <p className="t-small text-[var(--color-muted)] mt-2">{p.shortDesc}</p>
                <div className="mt-4 t-small text-[var(--color-ink)] space-y-3">
                  <div><span className="block font-medium">Investment required</span>{p.entryDetail}</div>
                  <div><span className="block font-medium">Exit policy</span>{p.exitPolicy}</div>
                </div>
                <div className="flex items-center gap-1.5 mt-4">
                  {p.benefits.map((b) => <Tick key={b.label} ok={b.eligible} />)}
                  <span className="t-small font-medium text-[var(--color-ink)] ml-1">{eligibleCount}/5 benefits</span>
                </div>
                <button onClick={() => toggle(i)} className="btn btn-ink w-full mt-5 justify-between">
                  <span>Explore Strategy</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })}
        </div>

        <AnimatePresence>
          {activePlan !== null && (
            <motion.div
              id="desktop-plan-details"
              key={"desktop-panel-" + activePlan}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block mt-6 bg-white scroll-mt-24"
            >
              <div className="flex items-start justify-between gap-6 px-8 pt-8 pb-6">
                <div>
                  <h3 className="display t-lead text-[var(--color-ink)]">{PLANS[activePlan].name}</h3>
                  <p className="t-body text-[var(--color-muted)] mt-2 max-w-[60ch]">{PLANS[activePlan].tagline} {PLANS[activePlan].shortDesc}</p>
                </div>
                <button
                  onClick={() => setActivePlan(null)}
                  className="w-11 h-11 bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer shrink-0"
                  aria-label="Close strategy details"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2 px-2 pb-2">
                {PLANS[activePlan].benefits.map((b) => (
                  <div key={b.label} className="p-6 bg-[var(--color-surface)] flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Tick ok={b.eligible} />
                      <span className="font-medium text-[var(--color-ink)] leading-tight">{b.label}</span>
                    </div>
                    <div className="t-small text-[var(--color-muted)]">{b.desc}</div>
                    {!b.eligible && (
                      <span className="t-small font-medium text-red-800">Not eligible</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activePlan !== null && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePlan(null)}
                className="fixed inset-0 z-50 bg-[rgba(7,17,31,0.55)] lg:hidden"
              />

              <motion.div
                key={"sheet-" + activePlan}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-0 left-0 right-0 z-50 flex flex-col lg:hidden bg-white shadow-[0_-20px_50px_rgba(7,17,31,0.25)]"
                style={{ height: "85vh", maxHeight: "85vh" }}
                role="dialog"
                aria-modal="true"
                aria-label={PLANS[activePlan].name}
              >
                <div className="flex items-start justify-between gap-4 px-5 pt-6 pb-4 flex-shrink-0">
                  <div>
                    <h3 className="t-lead font-medium text-[var(--color-ink)]">{PLANS[activePlan].name}</h3>
                    <p className="t-small text-[var(--color-muted)] mt-1">{PLANS[activePlan].shortDesc}</p>
                  </div>
                  <button
                    onClick={() => setActivePlan(null)}
                    className="w-11 h-11 bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-ink)] flex-shrink-0"
                    aria-label="Close strategy details"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div
                  className="overflow-y-scroll flex-1 min-h-0 px-5 pb-8 space-y-2"
                  style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
                  data-lenis-prevent="true"
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  {PLANS[activePlan].benefits.map((b) => (
                    <div key={b.label} className="flex items-start gap-3 p-4 bg-[var(--color-surface)]">
                      <div className="mt-0.5"><Tick ok={b.eligible} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className={`font-medium ${b.eligible ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"}`}>{b.label}</span>
                          {!b.eligible && <span className="t-small font-medium text-red-800">Not eligible</span>}
                        </div>
                        <div className="t-small text-[var(--color-muted)] mt-1">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
