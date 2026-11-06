import { BadgeCheck } from "lucide-react";

// Each line is stated in the LIMOVI agreements published at /legal.
const items = [
  "Digital Gold backed by physical gold with MMTC-PAMP",
  "Buy Digital Gold from ₹100",
  "Ownership of enrolled jewellery stays with you",
  "Owner Benefit of 25% on qualifying Experience Charges",
  "Gold loans through lending partners",
  "Jewellery insured through a LIMOVI-approved insurer",
  "Sale proceeds paid to your verified bank account",
  "Every transaction backed by a transaction record",
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
