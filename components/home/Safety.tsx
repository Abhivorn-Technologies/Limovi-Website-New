"use client";

import { motion } from "framer-motion";
import { Vault, ScanFace, Landmark, LineChart, Lock, FileCheck2, Sparkle } from "lucide-react";
import { Reveal, SectionHead } from "./primitives";

// Each card summarises a clause of the Master Customer & Platform Agreement or
// the Privacy Policy (see /legal). Keep them in step with those documents.
const cards = [
  {
    icon: Vault,
    title: "Custody is not a sale",
    body: "Jewellery you hand to LIMOVI or its Custodian for enrolment, safekeeping or Experience stays yours. Neither may use, pledge or sell it except as your service terms allow.",
  },
  {
    icon: FileCheck2,
    title: "Insured before it travels",
    body: "Where insurance is required, jewellery isn't released for delivery until it's covered. Insurance is arranged through a LIMOVI-approved insurer.",
  },
  {
    icon: LineChart,
    title: "Purity and condition on record",
    body: "Gold and jewellery may be weighed, tested, assayed and hallmark-checked. Condition is recorded at handover and compared again when the piece comes back.",
  },
  {
    icon: ScanFace,
    title: "Verified delivery",
    body: "Jewellery goes to your registered address or another authorised location, and the recipient may be asked for ID, an OTP or other proof before handover.",
  },
  {
    icon: Landmark,
    title: "Loans from lending partners",
    body: "LIMOVI facilitates gold loans but isn't the lender. Your loan is with the Gold Loan Partner, whose documents set the amount, interest, tenure and loan-to-value.",
  },
  {
    icon: Lock,
    title: "Your data, protected",
    body: "Access controls, authentication, encryption where appropriate, security monitoring and incident response, with access limited to people who need it.",
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
          lead="LIMOVI’s agreements spell out who holds your jewellery, how it’s insured, who lends against it and how your data is handled."
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
