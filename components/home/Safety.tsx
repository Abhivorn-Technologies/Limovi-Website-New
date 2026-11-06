"use client";

import { motion } from "framer-motion";
import { Vault, ScanFace, Landmark, LineChart, Lock, FileCheck2, Sparkle } from "lucide-react";
import { Reveal, SectionHead } from "./primitives";

const cards = [
  {
    icon: Vault,
    title: "Insured vault & shipping",
    body: "Every piece is held in a high-security vault and insured for its full gold value plus craftsmanship, including while it travels to and from you. You get tracking for every shipment.",
  },
  {
    icon: ScanFace,
    title: "Paperless, secure KYC",
    body: "PAN, Aadhaar OTP, AI face-match with liveness check, and penny-drop bank verification through a UIDAI-authorised partner. Your Aadhaar number is never stored.",
  },
  {
    icon: Landmark,
    title: "RBI-regulated lending",
    body: "Loans come only from RBI-licensed NBFC partners, capped at 75% loan-to-value. LIMOVI never lends directly, and your contract is with the NBFC.",
  },
  {
    icon: LineChart,
    title: "Transparent MCX pricing",
    body: "Gold is valued at the live 24K rate from MCX, India's largest commodity exchange. The rate is locked when you confirm, and charges are shown before you pay.",
  },
  {
    icon: Lock,
    title: "Bank-grade payments",
    body: "All money moves through PCI-DSS compliant gateways (Razorpay / Cashfree) over IMPS, RTGS and UPI, straight to your verified bank account.",
  },
  {
    icon: FileCheck2,
    title: "Compliance built in",
    body: "PMLA-aligned KYC and transaction monitoring, PAN-linked statements for tax filing, encrypted data storage and regular security audits.",
  },
];

export function Safety() {
  return (
    <section id="safety" className="relative overflow-hidden bg-lm-navy py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_50%_at_80%_0%,rgba(30,111,232,0.55),transparent),radial-gradient(40%_40%_at_0%_100%,rgba(242,185,43,0.25),transparent)]" />
      <div className="frame relative">
        <SectionHead
          light
          center
          eyebrow="Safety first"
          title={<>How we keep your gold <span className="text-lm-gold">safe</span></>}
          lead="Gold, lending and payments are all regulated in India. LIMOVI is designed around those rules from day one."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} i={i}>
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.08]">
                <motion.span
                  className="absolute right-6 top-6 text-lm-gold"
                  animate={{ rotate: [0, 90, 180], scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  aria-hidden
                >
                  <Sparkle size={16} fill="currentColor" />
                </motion.span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-lm-blue text-white transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <c.icon size={26} />
                </span>
                <h3 className="display mt-6 text-xl">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
