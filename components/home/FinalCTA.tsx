"use client";

import { ArrowRight } from "lucide-react";
import { Coin, Rays, Reveal } from "./primitives";
import { openEarlyAccess } from "./data";

export function FinalCTA() {
  return (
    <section className="bg-lm-paper px-3 py-16 sm:px-5 lg:py-24">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[40px] bg-lm-blue px-6 py-20 text-center text-white sm:px-12 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 text-white/10">
          <Rays className="lm-rays h-full w-full" count={44} hole={26} />
        </div>
        {[
          { s: 70, l: "8%", t: "18%", d: "5s" },
          { s: 48, l: "84%", t: "14%", d: "6s" },
          { s: 90, l: "80%", t: "64%", d: "7s" },
          { s: 40, l: "12%", t: "72%", d: "5.5s" },
        ].map((c, i) => (
          <div key={i} className="lm-bob absolute hidden sm:block" style={{ left: c.l, top: c.t, ["--d" as string]: c.d, ["--delay" as string]: `${i * 0.6}s` }}>
            <Coin size={c.s} label={i % 2 ? "₹" : "24K"} />
          </div>
        ))}
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="display text-[clamp(2.2rem,1.4rem+3.4vw,4.4rem)]">
              Your gold has been waiting. <span className="text-lm-gold">Let it work.</span>
            </h2>
          </Reveal>
          <Reveal i={1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              Join early and be among the first to experience jewellery, borrow, sell, earn and gift with one Gold Balance.
            </p>
          </Reveal>
          <Reveal i={2}>
            <button onClick={openEarlyAccess} className="lm-btn lm-btn-gold lm-shine mt-10 !min-h-[60px] !px-8 text-lg">
              Get Early Access <ArrowRight size={20} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
