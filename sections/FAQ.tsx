"use client";

import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    question: "How is digital gold stored and secured?",
    answer: "Every gram of digital gold is backed by 24K 99.99% pure physical gold, stored in highly secure, fully insured, SEBI-regulated vaults in partnership with Agumont gold."
  },
  {
    question: "Can I convert my digital gold to physical jewellery?",
    answer: "Yes! You can redeem your gold balance for physical coins, bars, or jewellery anytime."
  },
  {
    question: "How does the Instant Loan process work?",
    answer: "You can pledge your digital gold balance as collateral directly through the app. Our NBFC partners process the request instantly and funds are disbursed to your linked bank account within minutes, with no physical verification."
  },
  {
    question: "What is the Jewellery Cloud?",
    answer: "The Jewellery Cloud is a subscription or credit-based service where you can use your gold balance as value to experience luxury jewellery for special occassions without paying the full capital cost."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No. LIMOVI believes in 100% transparency. Any fees for storage, processing, or delivery are clearly stated before you confirm a transaction."
  }
];

const facts = [
  "Minimum Gold Balance: 50 grams of 24K gold",
  "Loans up to 75% LTV through RBI-regulated NBFCs",
  "Gold held in insured, SEBI-regulated vaults",
];

export function FAQ() {
  return (
    <section className="section bg-[var(--color-surface)] overflow-hidden">
      <div className="frame">
        <h2 className="display t-head text-[var(--color-ink)]" data-reveal>
          Frequently asked questions
        </h2>

        <div className="mt-12 grid lg:grid-cols-12 gap-x-8 gap-y-14">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <p className="t-lead text-[var(--color-ink)]" data-reveal>Everything you need to know about the LIMOVI ecosystem.</p>
            <ul className="mt-6 space-y-2 t-body text-[var(--color-ink)]" data-reveal style={{ ["--i" as string]: 1 }}>
              {facts.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-[0.6em] w-2 h-2 bg-[var(--color-accent)] shrink-0" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-1">
              {faqs.map((faq, i) => (
                <details key={faq.question} className="faq group" data-reveal style={{ ["--i" as string]: i + 2 }}>
                  <summary className="flex items-start justify-between gap-6 cursor-pointer list-none py-4 min-h-[44px] t-lead font-medium text-[var(--color-ink)] hover:text-[var(--color-field)] transition-colors">
                    <span>{faq.question}</span>
                    <span className="relative w-3 h-3 mt-[0.45em] shrink-0 transition-transform duration-300 group-open:rotate-180" aria-hidden>
                      <span className="absolute left-0 top-1/2 w-[9px] h-[2px] bg-current origin-right rotate-45 -translate-y-[1px]" />
                      <span className="absolute right-0 top-1/2 w-[9px] h-[2px] bg-current origin-left -rotate-45 -translate-y-[1px]" />
                    </span>
                  </summary>
                  <p className="pb-6 pr-8 t-body text-[var(--color-muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-early-access-modal"))}
                className="btn btn-accent w-full sm:w-auto"
              >
                Get Early Access
              </button>
              <Link href="/contact" className="link font-medium text-[var(--color-ink)]">Ask us something else</Link>
            </div>
          </div>

          {/* A tall picture with a square one laid over its corner */}
          <div className="lg:col-start-7 lg:col-span-6 order-1 lg:order-2 relative pb-16 lg:pb-20">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-black" data-reveal="open">
              <Image src="/images/jewellery-temple.png" alt="Temple gold jewellery" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute right-0 lg:right-auto lg:left-[-40px] bottom-0 w-[38%] lg:w-[34%] aspect-square overflow-hidden bg-black" data-reveal="open" style={{ ["--i" as string]: 2 }}>
              <Image src="/images/ear_piercing.png" alt="Gold jhumka earrings" fill sizes="20vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
