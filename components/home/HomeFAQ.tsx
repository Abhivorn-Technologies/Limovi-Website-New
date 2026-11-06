"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { Rays, Reveal } from "./primitives";

// Answers are drawn from the LIMOVI agreements published at /legal.
const faqs = [
  {
    q: "What is LIMOVI?",
    a: "LIMOVI Gold Ecosystem Private Limited runs a platform where your gold is recorded as a Gold Balance. Depending on your strategy, you can use it to experience jewellery from the Jewellery Cloud, apply for a gold loan through a lending partner, sell gold through Gold Liquidity, earn an Owner Benefit on your jewellery and gift gold.",
  },
  {
    q: "What is a Gold Balance?",
    a: "It's the electronic record LIMOVI keeps of your gold position under each strategy or service, with every credit, debit and adjustment backed by a transaction record. Where a rupee value is shown, it follows the pricing for that service and can move with the gold price. LIMOVI doesn't guarantee any minimum value or return.",
  },
  {
    q: "How much do I need to start?",
    a: "You can buy Digital Gold from ₹100. To use services under Investment Only, you need a Gold Balance of 50 grams of 24K equivalent. Investment & Experience needs an investment equivalent to 50 grams of 24K gold, and Enrol & Experience needs jewellery worth the same. Experience Only works differently: you provide Security based on the jewellery's displayed value.",
  },
  {
    q: "Why is KYC required?",
    a: "LIMOVI has to complete KYC, identity, ownership, source-of-funds and source-of-gold checks to comply with the law, including anti-money-laundering rules, and to prevent fraud. A strategy is activated only after KYC and verification are complete.",
  },
  {
    q: "Who gives the gold loan?",
    a: "A Gold Loan Partner, not LIMOVI. LIMOVI helps you apply and passes on your information. The amount, interest, tenure, loan-to-value, repayment and everything else about the loan are set by the lender's own documents, and you repay the lender directly.",
  },
  {
    q: "How does Gold Liquidity work?",
    a: "You request a sale, LIMOVI verifies the gold or jewellery, and the price is set by the applicable valuation. For jewellery under Enrol & Experience or Investment & Experience, that's the prevailing market price of 22K gold per gram on the net gold weight. Once you confirm, LIMOVI aims to credit your verified bank account within one hour, after TDS, GST, bank charges and other permitted deductions.",
  },
  {
    q: "How does the Owner Benefit work?",
    a: "Under Enrol & Experience and Investment & Experience, when another customer completes a qualifying Experience with your jewellery, you're entitled to 25% of the applicable Experience Charges, subject to charges, taxes and deductions. Nothing accrues just for enrolling, and no particular return is promised.",
  },
  {
    q: "How long can I keep jewellery during an Experience?",
    a: "Jewellery must be returned within 30 hours of delivery. Late return is charged at ₹100 an hour. Return is through a pickup arranged by LIMOVI or another authorised method, and the piece is inspected when it comes back.",
  },
  {
    q: "What if jewellery gets damaged while I have it?",
    a: "You're responsible for loss or damage while the jewellery is with you, except ordinary wear and tear allowed under the service terms, or where you show the cause wasn't your responsibility. Damage is assessed against the condition recorded at handover.",
  },
  {
    q: "Can I gift gold?",
    a: "Yes, where gifting is enabled. The recipient has to complete onboarding, KYC and acceptance. A gift becomes effective when the process is complete and is then irrevocable, except where the transaction terms or the law allow otherwise.",
  },
  {
    q: "How do I raise a complaint?",
    a: "Through customer support, email, the app or in writing. LIMOVI aims to acknowledge it within 4 to 6 business days and to resolve it within 15 days. If you're not satisfied, you can ask for it to be escalated to a senior officer.",
  },
];

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white pt-6 pb-24 lg:pt-8 lg:pb-32">
      <div className="frame grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[32px] bg-lm-navy p-7 text-white">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 text-white/10">
                <Rays className="lm-rays h-full w-full" count={24} hole={30} />
              </div>
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-lm-gold text-lm-navy">
                <MessageCircle size={22} />
              </span>
              <p className="display relative mt-5 text-2xl">Still curious?</p>
              <p className="relative mt-2 leading-relaxed text-white/75">
                Can&apos;t find your answer here? Write to the LIMOVI team, or read the full agreements on the Legal page.
              </p>
              <div className="relative mt-6 flex flex-col gap-2.5">
                <Link href="/contact" className="lm-btn lm-btn-gold">
                  Ask us something else
                </Link>
                <Link href="/legal" className="lm-btn border border-white/25 text-white hover:bg-white/10">
                  Read the agreements
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="space-y-3 lg:col-span-8">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} i={i} y={14}>
                <div className={`rounded-3xl border border-lm-line bg-white transition-shadow ${on ? "shadow-lg" : ""}`}>
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
