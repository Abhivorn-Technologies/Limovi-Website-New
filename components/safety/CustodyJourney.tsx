"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Scale, ClipboardCheck, FileCheck2, Truck, Undo2, Vault } from "lucide-react";
import { Reveal } from "@/components/home/primitives";

// The life of a piece of jewellery on LIMOVI, as the Master Customer &
// Platform Agreement describes it (custody, testing, insurance, delivery, return).
const steps = [
  { icon: Vault, title: "Handed over, still yours", body: "Jewellery held by LIMOVI or its Custodian stays your property. Custody is not a sale." },
  { icon: Scale, title: "Weighed and tested", body: "Gold may be weighed, tested, assayed and hallmark-checked." },
  { icon: ClipboardCheck, title: "Condition recorded", body: "Its condition is put on record at handover." },
  { icon: FileCheck2, title: "Insured before it travels", body: "Where insurance is required, it isn't released until it's covered by a LIMOVI-approved insurer." },
  { icon: Truck, title: "Verified delivery", body: "Delivered to a registered or authorised address. The recipient may be asked for ID or an OTP." },
  { icon: Undo2, title: "Returned and compared", body: "When it comes back, its condition is compared with the record." },
];

export function CustodyJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-lm-paper pb-24 pt-6 lg:pb-32 lg:pt-8">
      <div className="frame">
        <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-lm-blue">A piece of jewellery&apos;s journey on LIMOVI</p>

        <div ref={ref} className="relative mx-auto mt-10 max-w-3xl">
          <div className="absolute bottom-6 left-[27px] top-6 w-[3px] rounded-full bg-lm-line sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            style={{ height: reduce ? "100%" : fill }}
            className="absolute left-[27px] top-6 w-[3px] rounded-full bg-gradient-to-b from-lm-blue to-lm-gold sm:left-1/2 sm:-translate-x-1/2"
          />
          <ol className="space-y-8 sm:space-y-4">
            {steps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.title} className="relative grid grid-cols-[56px_1fr] items-center gap-5 sm:grid-cols-[1fr_56px_1fr]">
                  <Reveal i={0} className={`hidden sm:block ${right ? "sm:col-start-3" : "sm:col-start-1 sm:text-right"} sm:row-start-1`}>
                    <Card s={s} n={i + 1} />
                  </Reveal>
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border-4 border-white bg-lm-navy text-lm-gold shadow-lg sm:col-start-2 sm:row-start-1">
                    <s.icon size={22} />
                  </span>
                  <Reveal i={0} className="sm:hidden">
                    <Card s={s} n={i + 1} />
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Card({ s, n }: { s: (typeof steps)[number]; n: number }) {
  return (
    <div className="rounded-3xl border border-lm-line bg-white p-5 shadow-[0_20px_40px_-30px_rgba(11,27,58,0.5)] transition-shadow hover:shadow-[0_24px_50px_-24px_rgba(30,111,232,0.45)]">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-lm-blue">Step {n}</p>
      <p className="display mt-1 text-lg text-lm-navy">{s.title}</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-lm-muted">{s.body}</p>
    </div>
  );
}
