"use client";

import { useId, useState } from "react";

// Default 24K Gold Rate per Gram
const DEFAULT_GOLD_RATE = 14400;

const inr = (n: number) => `₹ ${Math.round(n).toLocaleString("en-IN")}`;

type Row = { label: string; value: string; tone?: "gold" | "green" | "blue" };

// ─── The itemised slip: rows, a heavy bar, then the one figure that matters ─────
function Receipt({ title, subtitle, rows, totalLabel, total, partner }: { title: string; subtitle: string; rows: Row[]; totalLabel: string; total: string; partner: Row }) {
  const tone = (t?: Row["tone"]) =>
    t === "gold" ? "text-[#8A6A0E]" : t === "green" ? "text-emerald-800" : t === "blue" ? "text-[var(--color-field)]" : "text-[var(--color-ink)]";
  return (
    <div
      className="relative w-full max-w-[400px] mx-auto bg-white text-[var(--color-ink)] px-7 pt-9 pb-16"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% calc(100% - 14px), 95% 100%, 90% calc(100% - 14px), 85% 100%, 80% calc(100% - 14px), 75% 100%, 70% calc(100% - 14px), 65% 100%, 60% calc(100% - 14px), 55% 100%, 50% calc(100% - 14px), 45% 100%, 40% calc(100% - 14px), 35% 100%, 30% calc(100% - 14px), 25% 100%, 20% calc(100% - 14px), 15% 100%, 10% calc(100% - 14px), 5% 100%, 0 calc(100% - 14px))",
      }}
    >
      <p className="text-center font-medium t-lead">{title}</p>
      <p className="text-center t-small text-[var(--color-muted)] mt-1">{subtitle}</p>
      <dl className="mt-8 space-y-3.5 tabular">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-4">
            <dt className="t-small text-[var(--color-muted)]">{r.label}</dt>
            <dd className={`t-small font-medium text-right ${tone(r.tone)}`}>{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="h-1 bg-[var(--color-ink)] mt-7" />
      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="t-small font-medium text-[var(--color-muted)] max-w-[12ch]">{totalLabel}</span>
        <span className="display t-lead tabular text-right leading-none">{total}</span>
      </div>
      <p className="t-small text-[var(--color-muted)] mt-6">
        {partner.label}: <span className={`font-medium ${tone(partner.tone)}`}>{partner.value}</span>
      </p>
    </div>
  );
}

function AmountSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  dark,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  dark?: boolean;
}) {
  const id = useId();
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="mt-10 max-w-[480px]">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium">{label}</label>
        <output htmlFor={id} className="t-lead font-medium tabular">{inr(value)}</output>
      </div>

      <div className="relative h-11 flex items-center mt-3">
        {/* Visible line bar track (background) */}
        <div
          className={`absolute inset-x-0 h-2 rounded-full pointer-events-none ${
            dark ? "bg-white/30" : "bg-[#BACBDC]"
          }`}
        />

        {/* Dynamic active filled line bar */}
        <div
          className={`absolute left-0 h-2 rounded-full pointer-events-none transition-[width] duration-75 ${
            dark
              ? "bg-[var(--color-accent)] shadow-[0_0_10px_rgba(212,175,55,0.6)]"
              : "bg-[var(--color-ink)]"
          }`}
          style={{ width: `${pct}%` }}
        />

        {/* Interactive native range slider */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`range w-full ${dark ? "range-on-field" : ""} relative z-10 !bg-transparent`}
        />
      </div>

      <div
        className={`flex justify-between t-small mt-2 tabular font-medium ${
          dark ? "text-[var(--color-field-muted)]" : "text-[var(--color-muted)]"
        }`}
      >
        <span>{inr(min)}</span>
        <span>{inr(max)}</span>
      </div>
    </div>
  );
}

export function InstantLoans() {
  const goldRate = DEFAULT_GOLD_RATE;
  const availableGrams = 50;

  const totalGoldValue = Math.round(availableGrams * goldRate);
  const maxLoanEligibility = Math.round(totalGoldValue * 0.75);

  const [requiredLoan, setRequiredLoan] = useState<number>(200000);
  const [requiredLiquidity, setRequiredLiquidity] = useState<number>(200000);

  // Loans: gold pledged in grams = loan amount / gold rate
  const safeLoanAmount = Math.min(requiredLoan, maxLoanEligibility);
  const goldPledgedGrams = (safeLoanAmount / goldRate).toFixed(2);
  const eligibleJewelleryGrams = Math.max(0, availableGrams - parseFloat(goldPledgedGrams)).toFixed(2);

  // Liquidity
  const goldLiquidatedGrams = (requiredLiquidity / goldRate).toFixed(2);
  const remainingGoldGrams = (availableGrams - parseFloat(goldLiquidatedGrams)).toFixed(2);

  return (
    <>
      {/* ── Instant Loans Section ── */}
      <section id="loans" className="section bg-[var(--color-field)] text-[var(--color-field-ink)] overflow-hidden">
        <div className="frame grid lg:grid-cols-12 gap-x-8 gap-y-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="display t-head" data-reveal>
              Digital &amp; physical gold backed loans.
            </h2>
            <p className="t-lead mt-6 max-w-[40ch]" data-reveal style={{ ["--i" as string]: 1 }}>
              Take a loan against your gold balance instantly without physical visits. We partner with RBI-regulated NBFCs as our primary lending rail.
            </p>
            <ul className="mt-6 space-y-2 t-body list-disc pl-5 marker:text-[var(--color-accent)]" data-reveal style={{ ["--i" as string]: 2 }}>
              <li>Enjoy jewellery experience worth value of remaining gold balance.</li>
              <li>Gold Loan + Jewellery Experience.</li>
            </ul>

            <div data-reveal style={{ ["--i" as string]: 3 }}>
              <AmountSlider
                label="Required gold loan amount"
                value={requiredLoan}
                min={10000}
                max={maxLoanEligibility}
                step={10000}
                onChange={setRequiredLoan}
                dark
              />
            </div>

            <div className="mt-14" data-reveal style={{ ["--i" as string]: 4 }}>
              <h3 className="t-lead font-medium">How your Gold converts to a Loan</h3>
              <ol className="mt-4 space-y-3 t-body list-decimal pl-5 text-[var(--color-field-muted)] marker:text-[var(--color-field-ink)] marker:font-medium">
                <li>Your <strong className="font-medium text-white">eligible Gold Balance</strong> is securely marked as collateral for the loan.</li>
                <li>Our NBFC partner calculates eligibility based on strict <strong className="font-medium text-white">RBI LTV (Loan-to-Value) limits</strong>.</li>
                <li>Funds move <strong className="font-medium text-white">directly from the regulated bank</strong> to your account. Your gold balance remains yours.</li>
              </ol>
            </div>
          </div>

          <div className="lg:col-start-8 lg:col-span-5" data-reveal style={{ ["--i" as string]: 2 }}>
            <Receipt
              title="Instant Loans"
              subtitle="Gold Collateral & Jewellery Experience Example"
              rows={[
                { label: "Available Gold Balance", value: `${availableGrams.toFixed(2)}g (24K)` },
                { label: "Today Gold Rate per Gram (24K)", value: inr(goldRate) },
                { label: "Total Gold Balance Value", value: inr(totalGoldValue) },
                { label: "Max. Loan Eligibility (75%)", value: inr(maxLoanEligibility), tone: "blue" },
                { label: "Gold Pledged", value: `${goldPledgedGrams}g (24K)`, tone: "gold" },
                { label: "Eligible Jewellery Experience", value: `Value up to ${eligibleJewelleryGrams}g (24K)`, tone: "green" },
              ]}
              partner={{ label: "Lending Partner", value: "RBI Regulated NBFC", tone: "blue" }}
              totalLabel="Required Gold Loan Amount"
              total={inr(safeLoanAmount)}
            />
          </div>
        </div>
      </section>

      {/* ── Instant Liquidity Section ── */}
      <section id="liquidity" className="section bg-[var(--color-surface-2)] overflow-hidden">
        <div className="frame grid lg:grid-cols-12 gap-x-8 gap-y-16 items-start">
          <div className="order-2 lg:order-1 lg:col-span-5" data-reveal style={{ ["--i" as string]: 2 }}>
            <Receipt
              title="Instant Liquidity"
              subtitle="Gold Liquidation Example"
              rows={[
                { label: "Available Gold Balance", value: `${availableGrams.toFixed(2)}g (24K)` },
                { label: "Today Gold Rate per Gram (24K)", value: inr(goldRate) },
                { label: "Total Gold Balance Value", value: inr(totalGoldValue) },
                { label: "Gold Liquidated", value: `${goldLiquidatedGrams}g (24K)`, tone: "gold" },
                { label: "Remaining Gold Balance", value: `${remainingGoldGrams}g (24K)`, tone: "green" },
                { label: "Settlement Rail", value: "IMPS / RTGS" },
              ]}
              partner={{ label: "Liquidity Partner", value: "LIMOVI", tone: "blue" }}
              totalLabel="Required Liquidity"
              total={inr(requiredLiquidity)}
            />
          </div>

          <div className="order-1 lg:order-2 lg:col-start-6 lg:col-span-7">
            <h2 className="display t-head text-[var(--color-ink)]" data-reveal>
              Instant liquidity on gold balances.
            </h2>
            <p className="t-lead text-[var(--color-ink)] mt-6 max-w-[40ch]" data-reveal style={{ ["--i" as string]: 1 }}>
              Liquidate your Gold Balance into transparent cash value instantly. Connected via secure IMPS/UPI banking APIs through certified payment gateways.
            </p>

            <div data-reveal style={{ ["--i" as string]: 2 }}>
              <AmountSlider
                label="Required liquidity"
                value={requiredLiquidity}
                min={10000}
                max={totalGoldValue}
                step={10000}
                onChange={setRequiredLiquidity}
              />
            </div>

            <div className="mt-14" data-reveal style={{ ["--i" as string]: 3 }}>
              <h3 className="t-lead font-medium text-[var(--color-ink)]">How your Gold converts to Cash</h3>
              <ol className="mt-4 space-y-3 t-body list-decimal pl-5 text-[var(--color-muted)] marker:text-[var(--color-ink)] marker:font-medium">
                <li>Select the exact <strong className="font-medium text-[var(--color-ink)]">Gold Balance</strong> you wish to liquidate from your balance.</li>
                <li>The equivalent cash value is locked in using <strong className="font-medium text-[var(--color-ink)]">transparent wholesale spot prices (MCX)</strong>.</li>
                <li>Cash is settled immediately via <strong className="font-medium text-[var(--color-ink)]">Razorpay/Cashfree IMPS rails</strong> directly to your bank.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
