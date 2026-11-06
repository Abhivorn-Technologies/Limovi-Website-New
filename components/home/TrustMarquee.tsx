import { BadgeCheck } from "lucide-react";

const items = [
  "24K pure Gold Balance",
  "Live MCX gold rate",
  "RBI-regulated NBFC loan partners",
  "100% insured vault storage",
  "UIDAI-authorised digital KYC",
  "Razorpay / Cashfree payouts",
  "Aadhaar number never stored",
  "Settlement via IMPS / UPI",
];

export function TrustMarquee() {
  const row = [...items, ...items];
  return (
    <section aria-label="Why people trust LIMOVI" className="lm-marquee-wrap relative overflow-hidden border-y border-lm-line bg-white py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <ul className="lm-marquee flex w-max items-center gap-10" style={{ ["--speed" as string]: "45s" }}>
        {row.map((t, i) => (
          <li key={i} className="flex shrink-0 items-center gap-2.5 text-[15px] font-semibold text-lm-ink" aria-hidden={i >= items.length}>
            <BadgeCheck size={20} className="text-lm-blue" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
