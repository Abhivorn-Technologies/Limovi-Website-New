"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, SectionHead } from "./primitives";

const faqs = [
  {
    q: "What is LIMOVI?",
    a: "LIMOVI is India's first 360° gold asset ecosystem. Instead of keeping gold idle in a locker, you hold it as a Gold Balance that you can use to experience luxury jewellery, take instant loans, convert to cash, earn dividends and gift to loved ones.",
  },
  {
    q: "What is a Gold Balance?",
    a: "It's the total gold on your account, measured in grams of 24K gold. It includes gold you've invested, jewellery you've enrolled and gold you've been gifted. It's valued at the live MCX rate. Gold pledged for a loan is shown separately, and the rest is your Available Gold Balance.",
  },
  {
    q: "How much do I need to start?",
    a: "Every strategy starts from the equivalent of 50 grams of 24K gold. Depending on the strategy, that can be gold you invest or jewellery you already own and enroll.",
  },
  {
    q: "Why is KYC required, and how long does it take?",
    a: "KYC is required by Indian regulations (RBI, SEBI and anti-money-laundering rules) before any gold or financial transaction. It's fully digital: personal details, PAN, Aadhaar OTP, a live selfie and a ₹1 penny-drop bank check. You can save and resume at any step.",
  },
  {
    q: "Is my Aadhaar stored?",
    a: "No. Your Aadhaar number is never stored on LIMOVI servers. Only a masked version (for example XXXX-XXXX-5678) is kept for reference.",
  },
  {
    q: "How much can I borrow against my gold?",
    a: "Up to 75% of your gold's value, as per RBI loan-to-value rules. Loans are given by RBI-regulated NBFC partners and paid straight to your bank. Your gold is released once you've repaid in full.",
  },
  {
    q: "What's the difference between a loan and liquidity?",
    a: "A loan keeps your gold (it's pledged and returned after repayment). Liquidity sells it: the gold is permanently converted to cash at the live MCX spot rate, usually within 30 minutes.",
  },
  {
    q: "How are dividends calculated?",
    a: "When another member experiences your enrolled jewellery, an experience charge of 0.9% of the piece's gold value applies. You receive 25% of that charge. For a 50g piece at ₹14,400/g, that's ₹1,620 per experience. Dividends are paid monthly or quarterly.",
  },
  {
    q: "What if jewellery gets damaged while I'm wearing it?",
    a: "All pieces are insured from the moment they leave the vault until they're back and inspected. Minor cleaning is free. For significant damage, repair costs above the insurance cover may be deducted from your Gold Balance. Theft or accidents are covered by insurance.",
  },
  {
    q: "What happens if a gold gift isn't accepted?",
    a: "The recipient has 30 days to accept. If they don't, the reserved gold automatically returns to your balance.",
  },
];

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-lm-sky py-24 lg:py-32">
      <div className="frame grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="FAQs" title="Questions, answered" lead="Everything you need to know before you start." />
          <Reveal i={3}>
            <Link href="/contact" className="lm-btn lm-btn-ghost mt-8">
              Ask us something else
            </Link>
          </Reveal>
        </div>
        <div className="space-y-3 lg:col-span-8">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} i={i} y={14}>
                <div className={`rounded-3xl bg-white transition-shadow ${on ? "shadow-lg" : ""}`}>
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    aria-expanded={on}
                  >
                    <span className="text-lg font-bold text-lm-navy">{f.q}</span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        on ? "rotate-45 bg-lm-blue text-white" : "bg-lm-sky text-lm-blue"
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 leading-relaxed text-lm-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
