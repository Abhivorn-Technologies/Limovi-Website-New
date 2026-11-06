"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Gem,
  Gift,
  Landmark,
  TrendingUp,
  Check,
  Clock,
  ShieldCheck,
  Mail,
  Building2,
  UserCheck,
} from "lucide-react";
import { Coin, Reveal, SectionHead, Tween } from "./primitives";
import { EXPERIENCE_CHARGE, OWNER_SHARE, gateways, inr, type GatewayId } from "./data";

const icons: Record<GatewayId, typeof Gem> = {
  jewellery: Gem,
  loans: Landmark,
  liquidity: Banknote,
  wealth: TrendingUp,
  gift: Gift,
};

// overview = cards only, each linking to its tab on /services (used on the homepage)
export function Gateways({ overview = false }: { overview?: boolean }) {
  const [tab, setTab] = useState<GatewayId>("jewellery");

  const pick = (id: GatewayId) => {
    setTab(id);
    document.getElementById("gateway-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // /services#loans opens the Gold Loan tab, and so on
  useEffect(() => {
    if (overview) return;
    const id = window.location.hash.slice(1) as GatewayId;
    if (gateways.some((g) => g.id === id)) {
      const t = window.setTimeout(() => {
        setTab(id);
        document.getElementById("gateway-explorer")?.scrollIntoView({ block: "start" });
      }, 200);
      return () => window.clearTimeout(t);
    }
  }, [overview]);

  const cardClass = (tone: string) =>
    `group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] p-6 text-left transition-transform duration-300 hover:-translate-y-1 ${
      tone === "gold" ? "bg-lm-cream" : "bg-lm-sky"
    }`;

  return (
    <section id="gateways" className="bg-white py-24 lg:py-32">
      <div className="frame">
        <SectionHead
          center
          eyebrow="Five gateways"
          title={
            <>
              Everything your gold can do, <span className="text-lm-blue">in one place</span>
            </>
          }
          lead="Each one draws on your Gold Balance or entitlement, subject to the eligibility rules of your strategy."
        />

        {/* overview cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {gateways.map((g, i) => (
            <Reveal key={g.id} i={i} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              {overview ? (
                <Link href={`/services#${g.id}`} className={cardClass(g.tone)}>
                  <GatewayArt id={g.id} />
                  <h3 className="display mt-6 text-xl text-lm-navy sm:text-2xl">{g.name}</h3>
                  <p className="mt-2 text-lm-muted">{g.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-lm-blue">
                    How it works <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ) : (
                <button onClick={() => pick(g.id)} className={cardClass(g.tone)}>
                  <GatewayArt id={g.id} />
                  <h3 className="display mt-6 text-xl text-lm-navy sm:text-2xl">{g.name}</h3>
                  <p className="mt-2 text-lm-muted">{g.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-lm-blue">
                    How it works <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              )}
            </Reveal>
          ))}
        </div>

        {/* explorer */}
        {!overview && (
          <div id="gateway-explorer" className="scroll-mt-28 pt-20">
            <div
              className="no-scrollbar -mx-[var(--margin)] flex gap-2 overflow-x-auto px-[var(--margin)] pb-2 lg:mx-0 lg:justify-center lg:px-0"
              role="tablist"
            >
              {gateways.map((g) => {
                const Icon = icons[g.id];
                const on = tab === g.id;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(g.id)}
                    className={`relative flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[15px] font-bold transition-colors ${
                      on ? "text-white" : "bg-lm-sky text-lm-ink hover:bg-lm-sky-2"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="gw-pill"
                        className="absolute inset-0 rounded-full bg-lm-blue"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon size={18} className="relative" />
                    <span className="relative">{g.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {tab === "jewellery" && <JewelleryPanel />}
                  {tab === "loans" && <LoanPanel />}
                  {tab === "liquidity" && <LiquidityPanel />}
                  {tab === "wealth" && <WealthPanel />}
                  {tab === "gift" && <GiftPanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────── small illustrations on the overview cards ───────── */

function GatewayArt({ id }: { id: GatewayId }) {
  if (id === "jewellery")
    return (
      <div className="relative h-40 overflow-hidden rounded-2xl bg-white">
        <Image
          src="/images/gold-haram.png"
          alt=""
          fill
          sizes="(min-width:1024px) 40vw, 90vw"
          className="object-contain p-3 transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-lm-sky px-2.5 py-1 text-xs font-bold text-lm-blue">
          Return within 30 hrs
        </span>
      </div>
    );
  if (id === "loans")
    return (
      <div className="flex h-40 items-center justify-between gap-2 rounded-2xl bg-white px-5">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-lm-sky text-lm-blue">
            <UserCheck size={26} />
          </span>
          <p className="mt-2 text-xs font-bold text-lm-navy">LIMOVI facilitates</p>
        </div>
        <div className="relative mx-1 h-1 flex-1 overflow-hidden rounded-full bg-lm-sky">
          <motion.span
            className="absolute inset-y-0 w-1/3 rounded-full bg-lm-blue"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-lm-blue text-white">
            <Building2 size={26} />
          </span>
          <p className="mt-2 text-xs font-bold text-lm-navy">Partner lends</p>
        </div>
      </div>
    );
  if (id === "liquidity")
    return (
      <div className="flex h-40 items-center justify-between rounded-2xl bg-white px-5">
        <Coin size={56} />
        <div className="relative mx-2 h-1 flex-1 overflow-hidden rounded-full bg-lm-sky">
          <motion.span
            className="absolute inset-y-0 w-1/3 rounded-full bg-lm-blue"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Banknote size={26} />
        </span>
      </div>
    );
  if (id === "wealth")
    return (
      <div className="flex h-40 flex-col justify-center rounded-2xl bg-white p-5">
        <p className="text-sm text-lm-muted">Of each qualifying Experience Charge</p>
        <p className="display text-3xl text-lm-navy">25% to the owner</p>
        <div className="mt-3 h-3 rounded-full bg-lm-sky">
          <motion.span
            className="block h-full rounded-full bg-lm-gold"
            initial={{ width: 0 }}
            whileInView={{ width: "25%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </div>
    );
  return (
    <div className="relative grid h-40 place-items-center overflow-hidden rounded-2xl bg-white">
      <div className="relative">
        <span className="grid h-20 w-28 place-items-center rounded-xl bg-lm-blue text-white shadow-lg">
          <Mail size={30} />
        </span>
        <motion.div
          className="absolute -right-5 -top-5"
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Coin size={40} />
        </motion.div>
      </div>
    </div>
  );
}

/* ───────── shared panel parts ───────── */

function Panel({
  title,
  intro,
  steps,
  notes,
  children,
}: {
  title: string;
  intro: string;
  steps: string[];
  notes?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="lm-card p-6 sm:p-8">
        <h3 className="display text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] text-lm-navy">{title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-lm-muted">{intro}</p>
        <ol className="mt-6 space-y-3">
          {steps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="flex gap-3"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lm-sky text-sm font-bold text-lm-blue">
                {i + 1}
              </span>
              <span className="pt-0.5 text-lm-ink">{s}</span>
            </motion.li>
          ))}
        </ol>
        {notes && (
          <ul className="mt-6 space-y-2 rounded-2xl bg-lm-cream p-4">
            {notes.map((n) => (
              <li key={n} className="flex gap-2 text-[15px] text-lm-ink">
                <Check size={18} className="mt-0.5 shrink-0 text-lm-gold-deep" />
                {n}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="font-semibold text-white/85">{label}</span>
        <span className="display text-2xl text-white">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lm-range mt-3"
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      <span className="flex justify-between text-xs text-white/60">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </span>
    </label>
  );
}

function Calc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-lm-blue p-6 text-white sm:p-8">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" aria-hidden />
      <p className="relative text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">{title}</p>
      <div className="relative mt-5 space-y-6">{children}</div>
    </div>
  );
}

function Rows({ rows }: { rows: [string, React.ReactNode, string?][] }) {
  return (
    <dl className="divide-y divide-white/15 rounded-2xl bg-white/10">
      {rows.map(([k, v, cls]) => (
        <div key={k} className="flex items-center justify-between gap-4 px-4 py-3">
          <dt className="text-white/80">{k}</dt>
          <dd className={`font-bold tabular-nums ${cls ?? "text-white"}`}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function TermsCard({ title, rows, foot, href }: { title: string; rows: [string, string][]; foot?: string; href: string }) {
  return (
    <div className="lm-card p-6">
      <p className="font-bold text-lm-navy">{title}</p>
      <dl className="mt-4 divide-y divide-lm-line rounded-2xl bg-lm-sky/60">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <dt className="text-sm text-lm-muted">{k}</dt>
            <dd className="text-sm font-bold text-lm-navy sm:text-right">{v}</dd>
          </div>
        ))}
      </dl>
      {foot && <p className="mt-3 text-xs leading-relaxed text-lm-muted">{foot}</p>}
      <Link href={href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-lm-blue">
        Read the full terms <ArrowRight size={15} />
      </Link>
    </div>
  );
}

/* ───────── panels ───────── */

function JewelleryPanel() {
  return (
    <Panel
      title="Jewellery Cloud"
      intro="Experience jewellery without buying each piece. What you can pick depends on your strategy, your Gold Balance or entitlement, and the piece's category and availability."
      steps={[
        "Browse the Jewellery Cloud and select a piece.",
        "LIMOVI confirms the booking. Until then, a selection is a request, not a commitment.",
        "The piece is delivered to your registered address or another authorised location. The recipient may be asked for ID or an OTP.",
        "Its condition is recorded at handover.",
        "Return it within 30 hours of delivery, through a pickup arranged by LIMOVI or another authorised method.",
        "LIMOVI inspects it on return and compares it with the handover record.",
      ]}
      notes={[
        "Where insurance is required, it's arranged through a LIMOVI-approved insurer before delivery.",
        "You're responsible for the piece while it's with you, apart from permitted ordinary wear and tear.",
      ]}
    >
      <div className="lm-card overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/jewellery-wedding.png"
              alt="Bridal wedding set"
              fill
              sizes="(min-width:1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/minimal_pendant.png"
              alt="Pendant and chain"
              fill
              sizes="(min-width:1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <TermsCard
        title="Charges at a glance"
        href="/legal/investment-only-strategy#schedule-1"
        rows={[
          ["Experience Charge", "0.9% of the selected jewellery's value"],
          ["Service charge", "₹1,099 within 5 km, ₹1,299 within 10 km, ₹1,599 within 15 km, ₹1,999 within 20 km"],
          ["Return", "Within 30 hours of delivery"],
          ["Late return", "₹100 per hour"],
          ["Lifestyle jewellery", "Up to 55% of Gold Balance"],
          ["Lifestyle subscription", "1.1%, 0.9% or 0.7% of value a month for 1, 3 or 5 months, plus delivery"],
        ]}
        foot="From the Investment Only and Enrol & Experience schedules. Investment & Experience has its own terms, including 2 free Experiences a year and then 0.5% of the jewellery's value."
      />
    </Panel>
  );
}

function LoanPanel() {
  return (
    <Panel
      title="Gold Loan"
      intro="LIMOVI can help you apply for a gold loan, but the loan itself is between you and a Gold Loan Partner. LIMOVI is not the lender."
      steps={[
        "Check whether you're eligible for a gold loan on the platform.",
        "LIMOVI identifies a Gold Loan Partner and helps with your application.",
        "The lender decides the amount, interest, tenure, loan-to-value and repayment terms.",
        "You sign the lender's loan and security documents.",
        "You repay the lender directly, as its documents require.",
      ]}
      notes={[
        "Under Investment & Experience, Experience isn't available against balance used for a maximum loan. You can still experience against 25% of your remaining eligible Gold Balance.",
      ]}
    >
      <div className="relative overflow-hidden rounded-[28px] bg-lm-blue p-6 text-white sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" aria-hidden />
        <p className="relative text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">Who does what</p>
        <div className="relative mt-5 grid gap-4 sm:grid-cols-2">
          {[
            [
              "LIMOVI",
              [
                "Identifies or suggests a Gold Loan Partner",
                "Helps with your application",
                "Passes on your information and documents",
                "Provides the platform",
              ],
            ],
            [
              "Gold Loan Partner",
              [
                "Approves and gives the loan",
                "Sets interest, tenure and loan-to-value",
                "Holds the security",
                "Collects repayment",
              ],
            ],
          ].map(([who, list]) => (
            <div key={who as string} className="rounded-2xl bg-white/10 p-4">
              <p className="display text-lg">{who as string}</p>
              <ul className="mt-3 space-y-2">
                {(list as string[]).map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-white/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-lm-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href="/legal/master-customer-agreement#22-gold-loan-facilitation"
          className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-white"
        >
          Read clause 22 of the Master Agreement <ArrowRight size={15} />
        </Link>
      </div>
    </Panel>
  );
}

function LiquidityPanel() {
  return (
    <Panel
      title="Gold Liquidity"
      intro="Need money rather than a loan? Sell eligible gold, Gold Balance or jewellery through LIMOVI, and the proceeds go to your registered, verified bank account."
      steps={[
        "Request a sale on the platform. You can sell all of it or part of it.",
        "LIMOVI verifies your title and the gold, including its weight and purity.",
        "The price comes from the applicable valuation. For jewellery under Enrol & Experience or Investment & Experience, it's the prevailing market price of 22K gold per gram on the net gold weight.",
        "You see the price per gram, weight and total value. Once you confirm, the sale is binding.",
        "LIMOVI aims to credit your bank account within one hour of confirmation.",
      ]}
      notes={[
        "A sale is final: you stop owning the quantity sold.",
        "Prices move, so a price you saw earlier isn't binding until the sale is confirmed.",
      ]}
    >
      <div className="relative overflow-hidden rounded-[28px] bg-lm-blue p-6 text-white sm:p-8">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" aria-hidden />
        <p className="relative text-sm font-bold uppercase tracking-[0.12em] text-lm-gold">How your payout is worked out</p>
        <div className="relative mt-5 space-y-6">
          <Rows
            rows={[
              ["Applicable price × accepted weight", "Sale value"],
              ["Less TDS and GST", "−"],
              ["Less statutory deductions", "−"],
              ["Less bank and other permitted charges", "−"],
              ["Paid to your verified bank account", "Net Sale Consideration", "text-lm-gold"],
            ]}
          />
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
            <Clock className="shrink-0 text-lm-gold" />
            <p className="text-sm text-white/85">
              LIMOVI aims to credit you within one hour of confirmation, once verification, processing and banking steps are
              complete.
            </p>
          </div>
          <Link
            href="/legal/gold-liquidity-and-sale-terms"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white"
          >
            Read the Gold Liquidity terms <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </Panel>
  );
}

function WealthPanel() {
  const [value, setValue] = useState(500000);
  const charge = value * EXPERIENCE_CHARGE;
  const benefit = charge * OWNER_SHARE;
  return (
    <Panel
      title="Owner Benefit"
      intro="Under Enrol & Experience and Investment & Experience, your jewellery can be listed in the Jewellery Cloud. When another customer completes a qualifying Experience with it, you earn an Owner Benefit."
      steps={[
        "Enrol jewellery you own, or acquire jewellery under Investment & Experience.",
        "LIMOVI lists it in the Jewellery Cloud with photos, description, weight, purity and availability. Your identity isn't shown to other customers.",
        "Another customer selects it and completes a qualifying Experience.",
        "You're entitled to 25% of the applicable Experience Charges.",
        "Your Experience history and Owner Benefit records are available in your account.",
      ]}
      notes={[
        "Nothing accrues just for enrolling. The benefit is subject to charges, taxes, deductions, reconciliation and settlement.",
        "LIMOVI doesn't promise any particular return.",
      ]}
    >
      <Calc title="Owner Benefit example">
        <Slider
          label="Value of your jewellery"
          min={100000}
          max={2000000}
          step={10000}
          value={value}
          onChange={setValue}
          format={inr}
        />
        <Rows
          rows={[
            ["Experience Charge (0.9%)", <Tween key="c" value={charge} format={inr} />],
            ["Your Owner Benefit (25%)", <Tween key="b" value={benefit} format={inr} />, "text-lm-gold"],
          ]}
        />
        <p className="text-xs text-white/60">
          Per qualifying Experience, before charges, taxes and deductions. Uses the 0.9% Experience Charge in the Enrol &amp;
          Experience schedule.
        </p>
      </Calc>
    </Panel>
  );
}

function GiftPanel() {
  const [opened, setOpened] = useState(false);
  return (
    <Panel
      title="Gift Gold"
      intro="Where gifting is enabled, you can gift an eligible Gold Balance to another person, who can then use it on LIMOVI."
      steps={[
        "Choose the eligible Gold Balance you want to gift.",
        "Complete the verification and authentication LIMOVI asks for.",
        "The recipient completes onboarding, KYC and acceptance.",
        "The gift takes effect once the process is complete.",
      ]}
      notes={["A completed gift can't be reversed, except where the transaction terms or the law allow it."]}
    >
      <div className="lm-card relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden bg-lm-cream p-8 text-center">
        <button onClick={() => setOpened((v) => !v)} className="group relative" aria-label="Open the gift">
          <div className="relative h-40 w-60">
            <motion.div
              className="absolute left-1/2 top-4 z-0 w-48 -translate-x-1/2 rounded-xl bg-white p-4 text-left shadow-lg"
              animate={{ y: opened ? -110 : 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-lm-blue">For Ananya</p>
              <p className="display mt-1 text-2xl text-lm-navy">2.00g</p>
              <p className="text-xs text-lm-muted">Gold Balance · &ldquo;Happy birthday!&rdquo;</p>
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 z-10 h-32 rounded-2xl bg-lm-blue shadow-xl" />
            <motion.div
              className="absolute inset-x-0 top-8 z-20 h-0 origin-top"
              style={{
                borderLeft: "120px solid transparent",
                borderRight: "120px solid transparent",
                borderTop: "70px solid var(--color-lm-blue-deep)",
              }}
              animate={{ rotateX: opened ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2">
              <Coin size={44} />
            </div>
          </div>
        </button>
        <p className="mt-10 font-bold text-lm-navy">{opened ? "A gift they can use on LIMOVI." : "Tap the envelope"}</p>
        <div className="mt-6 grid w-full max-w-sm grid-cols-3 gap-2 text-xs">
          {[
            [ShieldCheck, "Recipient KYC"],
            [Check, "Accepted"],
            [Gift, "Gift complete"],
          ].map(([Icon, t]) => {
            const I = Icon as typeof Gem;
            return (
              <div
                key={t as string}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 font-semibold text-lm-ink"
              >
                <I size={18} className="text-lm-blue" />
                {t as string}
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
